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

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    
    // Create contacts table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    client.release();
    console.log('✓ Database initialized');
  } catch (err) {
    console.error('✗ Database initialization error:', err);
  }
}

// Routes

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Create contact
app.post('/api/contacts', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Nome, email e mensagem são obrigatórios',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Email inválido',
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
      [name, email, message]
    );

    res.json({
      success: true,
      id: result.rows[0].id,
      message: 'Contato salvo com sucesso!',
    });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao salvar contato',
    });
  }
});

// API: Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      contacts: result.rows,
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar contatos',
    });
  }
});


// --- COMMENTS API ---

// Listar comentários por projeto: GET /api/comments?projectId=galeria
app.get('/api/comments', async (req, res) => {
  try {
    const projectId = String(req.query.projectId || '').trim();
    if (!projectId) return res.status(400).json({ success: false, error: 'projectId é obrigatório' });

    const { rows } = await pool.query(
      'SELECT id, project_id, name, email, text, created_at FROM comments WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );

    res.json({ success: true, comments: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: 'Erro ao listar comentários' });
  }
});

// Criar comentário: POST /api/comments
// Body: { projectId, name, email, text }
app.post('/api/comments', async (req, res) => {
  try {
    const { projectId, name, email, text } = req.body || {};
    if (!projectId || !name || !email || !text) {
      return res.status(400).json({ success: false, error: 'projectId, name, email, text são obrigatórios' });
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
    console.error(e);
    res.status(500).json({ success: false, error: 'Erro ao salvar comentário' });
  }
});

// Opcional: deletar comentário
app.delete('/api/comments/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ success: false, error: 'id inválido' });

    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: 'Erro ao deletar comentário' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  initializeDatabase();
});

