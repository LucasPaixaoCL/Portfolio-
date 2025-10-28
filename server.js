import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Static (absoluto)
app.use(express.static(path.join(__dirname, 'public')));

// ===== Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== Pool PG (corrige problema de senha com @ quando usar URL)
let pool;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false } // habilite se seu provedor exigir SSL
  });
} else {
  pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'kittyhub01',
  });
}

// ===== Init DB (cria contacts e comments)
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        project_id VARCHAR(120) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comments_project_id ON comments(project_id);
      CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
    `);

    await client.query('COMMIT');
    console.log('✓ Database initialized');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('✗ Database initialization error:', err.message, err.stack);
  } finally {
    client.release();
  }
}

// ===== Rotas páginas
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== API Contacts
app.post('/api/contacts', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Nome, email e mensagem são obrigatórios' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ success: false, error: 'Email inválido' });
  }
  try {
    const r = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
      [String(name).trim(), String(email).trim(), String(message).trim()]
    );
    res.json({ success: true, id: r.rows[0].id, message: 'Contato salvo com sucesso!' });
  } catch (err) {
    console.error('Error saving contact:', err.message, err.stack);
    res.status(500).json({ success: false, error: 'Erro ao salvar contato' });
  }
});

app.get('/api/contacts', async (_req, res) => {
  try {
    const r = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
    );
    res.json({ success: true, contacts: r.rows });
  } catch (err) {
    console.error('Error fetching contacts:', err.message, err.stack);
    res.status(500).json({ success: false, error: 'Erro ao buscar contatos' });
  }
});

// ===== API Comments
// GET /api/comments?projectId=galeria
app.get('/api/comments', async (req, res) => {
  try {
    const projectId = String(req.query.projectId || '').trim();
    if (!projectId) {
      return res.status(400).json({ success: false, error: 'projectId é obrigatório' });
    }
    const { rows } = await pool.query(
      'SELECT id, project_id, name, email, text, created_at FROM comments WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    res.json({ success: true, comments: rows });
  } catch (e) {
    console.error('GET /api/comments error:', e.message, e.stack);
    res.status(500).json({ success: false, error: 'Erro ao listar comentários' });
  }
});

// POST /api/comments  { projectId, name, email, text }
app.post('/api/comments', async (req, res) => {
  try {
    const { projectId, name, email, text } = req.body || {};
    if (!projectId || !name || !email || !text) {
      return res.status(400).json({ success: false, error: 'projectId, name, email, text são obrigatórios' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return res.status(400).json({ success: false, error: 'Email inválido' });
    }

    const q = `
      INSERT INTO comments (project_id, name, email, text)
      VALUES ($1, $2, $3, $4)
      RETURNING id, project_id, name, email, text, created_at
    `;
    const { rows } = await pool.query(q, [
      String(projectId).trim(),
      String(name).trim(),
      String(email).trim(),
      String(text).trim()
    ]);

    res.status(201).json({ success: true, comment: rows[0] });
  } catch (e) {
    console.error('POST /api/comments error:', e.message, e.stack);
    res.status(500).json({ success: false, error: 'Erro ao salvar comentário' });
  }
});

// DELETE /api/comments/:id
app.delete('/api/comments/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ success: false, error: 'id inválido' });
    }
    const r = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    res.json({ success: true, deleted: r.rowCount });
  } catch (e) {
    console.error('DELETE /api/comments error:', e.message, e.stack);
    res.status(500).json({ success: false, error: 'Erro ao deletar comentário' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  initializeDatabase().catch(console.error);
});
