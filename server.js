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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  initializeDatabase();
});

