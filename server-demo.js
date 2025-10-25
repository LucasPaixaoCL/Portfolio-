import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dados em memória (apenas para demo)
let contacts = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    message: 'Olá! Gostaria de mais informações sobre seus serviços.',
    created_at: new Date('2025-01-15T10:30:00Z'),
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    message: 'Excelente landing page! Gostaria de saber mais sobre os planos.',
    created_at: new Date('2025-01-14T14:20:00Z'),
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
    message: 'Tenho interesse em contratar seus serviços.',
    created_at: new Date('2025-01-13T09:15:00Z'),
  },
];

let nextId = 4;

// Dados de comentários em memória
let comments = {};

// Routes

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Create contact
app.post('/api/contacts', (req, res) => {
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

  // Criar novo contato
  const newContact = {
    id: nextId++,
    name,
    email,
    message,
    created_at: new Date(),
  };

  contacts.push(newContact);

  res.json({
    success: true,
    id: newContact.id,
    message: 'Contato salvo com sucesso!',
  });
});

// API: Get all contacts
app.get('/api/contacts', (req, res) => {
  res.json({
    success: true,
    contacts: contacts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  });
});

// API: Create comment
app.post('/api/comments', (req, res) => {
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

  // Initialize project comments if needed
  if (!comments[project_id]) {
    comments[project_id] = [];
  }

  // Create new comment
  const newComment = {
    id: Date.now(),
    project_id,
    name,
    email,
    text,
    created_at: new Date(),
  };

  comments[project_id].push(newComment);

  res.json({
    success: true,
    id: newComment.id,
    message: 'Comentário salvo com sucesso!',
  });
});

// API: Get comments for a project
app.get('/api/comments/:project_id', (req, res) => {
  const { project_id } = req.params;
  const projectComments = comments[project_id] || [];

  res.json({
    success: true,
    comments: projectComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  });
});

// API: Delete comment
app.delete('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  const commentId = parseInt(id);

  // Find and delete comment
  for (const projectId in comments) {
    const index = comments[projectId].findIndex(c => c.id === commentId);
    if (index !== -1) {
      comments[projectId].splice(index, 1);
      return res.json({
        success: true,
        message: 'Comentário deletado com sucesso!',
      });
    }
  }

  res.status(404).json({
    success: false,
    error: 'Comentário não encontrado',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: 'In-Memory (Demo)',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Demo mode: Dados armazenados em memória`);
  console.log(`✓ Database: Não é necessário PostgreSQL para esta demo`);
  console.log(`\n📋 Rotas disponíveis:`);
  console.log(`  POST   /api/contacts - Criar contato`);
  console.log(`  GET    /api/contacts - Listar contatos`);
  console.log(`  POST   /api/comments - Criar comentário`);
  console.log(`  GET    /api/comments/:project_id - Listar comentários`);
  console.log(`  DELETE /api/comments/:id - Deletar comentário`);
  console.log(`  GET    /api/health - Status do servidor\n`);
});

