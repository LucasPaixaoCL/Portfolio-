import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
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

// Database setup
let db = null;
let usePostgres = false;
let pool = null;

// Initialize database
async function initializeDatabase() {
  // Try PostgreSQL first
  if (process.env.DATABASE_URL) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      
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
      
      // Create comments table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          project_id VARCHAR(50) NOT NULL,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(320) NOT NULL,
          text TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      client.release();
      usePostgres = true;
      console.log('✓ Connected to PostgreSQL');
      return;
    } catch (err) {
      console.warn('⚠ PostgreSQL connection failed, using SQLite:', err.message);
    }
  }

  // Fallback to SQLite
  db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      console.error('✗ SQLite error:', err);
      return;
    }
    
    // Create contacts table
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create comments table
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✓ Using SQLite (in-memory database)');
  });
}

// Routes

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve other HTML files
app.get('/galeria.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'galeria.html'));
});

app.get('/sobre.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
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
    if (usePostgres) {
      const result = await pool.query(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
        [name, email, message]
      );
      res.json({
        success: true,
        id: result.rows[0].id,
        message: 'Contato salvo com sucesso!',
      });
    } else {
      db.run(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        function(err) {
          if (err) {
            console.error('Error saving contact:', err);
            return res.status(500).json({
              success: false,
              error: 'Erro ao salvar contato',
            });
          }
          res.json({
            success: true,
            id: this.lastID,
            message: 'Contato salvo com sucesso!',
          });
        }
      );
    }
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
    if (usePostgres) {
      const result = await pool.query(
        'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
      );
      res.json({
        success: true,
        contacts: result.rows,
      });
    } else {
      db.all(
        'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC',
        (err, rows) => {
          if (err) {
            console.error('Error fetching contacts:', err);
            return res.status(500).json({
              success: false,
              error: 'Erro ao buscar contatos',
            });
          }
          res.json({
            success: true,
            contacts: rows || [],
          });
        }
      );
    }
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar contatos',
    });
  }
});

// API: Create comment
app.post('/api/comments', async (req, res) => {
  const { project_id, name, email, text } = req.body;

  // Validation
  if (!project_id || !name || !email || !text) {
    return res.status(400).json({
      success: false,
      error: 'Todos os campos são obrigatórios',
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
    if (usePostgres) {
      const result = await pool.query(
        'INSERT INTO comments (project_id, name, email, text) VALUES ($1, $2, $3, $4) RETURNING id',
        [project_id, name, email, text]
      );
      res.json({
        success: true,
        id: result.rows[0].id,
        message: 'Comentário salvo com sucesso!',
      });
    } else {
      db.run(
        'INSERT INTO comments (project_id, name, email, text) VALUES (?, ?, ?, ?)',
        [project_id, name, email, text],
        function(err) {
          if (err) {
            console.error('Error saving comment:', err);
            return res.status(500).json({
              success: false,
              error: 'Erro ao salvar comentário',
            });
          }
          res.json({
            success: true,
            id: this.lastID,
            message: 'Comentário salvo com sucesso!',
          });
        }
      );
    }
  } catch (err) {
    console.error('Error saving comment:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao salvar comentário',
    });
  }
});

// API: Get comments for a project
app.get('/api/comments/:project_id', async (req, res) => {
  const { project_id } = req.params;

  try {
    if (usePostgres) {
      const result = await pool.query(
        'SELECT id, name, email, text, created_at FROM comments WHERE project_id = $1 ORDER BY created_at DESC',
        [project_id]
      );
      res.json({
        success: true,
        comments: result.rows,
      });
    } else {
      db.all(
        'SELECT id, name, email, text, created_at FROM comments WHERE project_id = ? ORDER BY created_at DESC',
        [project_id],
        (err, rows) => {
          if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).json({
              success: false,
              error: 'Erro ao buscar comentários',
            });
          }
          res.json({
            success: true,
            comments: rows || [],
          });
        }
      );
    }
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar comentários',
    });
  }
});

// API: Delete comment
app.delete('/api/comments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (usePostgres) {
      await pool.query('DELETE FROM comments WHERE id = $1', [id]);
      res.json({
        success: true,
        message: 'Comentário deletado com sucesso!',
      });
    } else {
      db.run('DELETE FROM comments WHERE id = ?', [id], function(err) {
        if (err) {
          console.error('Error deleting comment:', err);
          return res.status(500).json({
            success: false,
            error: 'Erro ao deletar comentário',
          });
        }
        res.json({
          success: true,
          message: 'Comentário deletado com sucesso!',
        });
      });
    }
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao deletar comentário',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: usePostgres ? 'PostgreSQL' : 'SQLite',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  initializeDatabase();
});

