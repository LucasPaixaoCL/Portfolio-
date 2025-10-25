# Portfolio - Seu Portfólio Digital

Um portfólio digital simples, bonito e funcional com **HTML, CSS (Tailwind), JavaScript vanilla, Node.js/Express e PostgreSQL**.

## 🌟 Características

- ✅ Página inicial responsíva com design profissional
- ✅ Seção Hero com Call-to-Action
- ✅ Seção de Benefícios (3 cards)
- ✅ Formulário de Contato com validação
- ✅ Integração com PostgreSQL para armazenar contatos
- ✅ API REST simples
- ✅ Design mobile-first e responsivo

## 📋 Pré-requisitos

- **Node.js** (versão 18+)
- **npm** ou **pnpm**
- **PostgreSQL** (banco de dados)

## 🚀 Como Rodar

### 1. Instalar Dependências

```bash
pnpm install
```

Ou com npm:

```bash
npm install
```

### 2. Configurar Banco de Dados

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/landing_page
PORT=3000
NODE_ENV=development
```

**Importante:** Crie o banco de dados PostgreSQL antes:

```bash
createdb landing_page
```

### 3. Iniciar o Servidor

**Modo desenvolvimento (com auto-reload):**

```bash
pnpm dev
```

**Modo produção:**

```bash
pnpm start
```

### 4. Acessar a Página

Abra seu navegador e acesse:

```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
landing_page/
├── public/
│   ├── index.html      # Página HTML principal
│   └── app.js          # JavaScript do cliente
├── server.js           # Servidor Express
├── package.json        # Dependências
├── .env                # Variáveis de ambiente (não commitado)
├── .env.example        # Exemplo de variáveis
└── README.md           # Este arquivo
```

## 🔧 Endpoints da API

### Criar Contato

**POST** `/api/contacts`

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "message": "Olá, gostaria de mais informações..."
}
```

**Resposta (sucesso):**

```json
{
  "success": true,
  "id": 1,
  "message": "Contato salvo com sucesso!"
}
```

**Resposta (erro):**

```json
{
  "success": false,
  "error": "Nome, email e mensagem são obrigatórios"
}
```

### Listar Contatos

**GET** `/api/contacts`

**Resposta:**

```json
{
  "success": true,
  "contacts": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "message": "Olá, gostaria de mais informações...",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ]
}
```

## 🛠️ Personalização

### Alterar Título

Edite `public/index.html`:

```html
<title>Seu Título Aqui</title>
```

E no header:

```html
<div class="text-2xl font-bold text-slate-900">Seu Nome</div>
```

### Alterar Cores

Use as classes do Tailwind CSS em `public/index.html`:

- `bg-blue-600` → Mude para `bg-red-600`, `bg-green-600`, etc.
- `text-slate-900` → Mude para outras cores

### Adicionar Seções

Adicione novas seções no HTML entre o hero e o footer:

```html
<section class="py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Seu conteúdo aqui -->
  </div>
</section>
```

## 📊 Banco de Dados

A tabela `contacts` é criada automaticamente ao iniciar o servidor:

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Para ver os contatos salvos, conecte ao PostgreSQL:

```bash
psql landing_page
SELECT * FROM contacts ORDER BY created_at DESC;
```

## 🚨 Troubleshooting

### Erro: "Cannot connect to database"

- Verifique se PostgreSQL está rodando
- Confirme a `DATABASE_URL` no arquivo `.env`
- Verifique se o banco de dados foi criado

### Erro: "Port 3000 already in use"

Mude a porta no `.env`:

```env
PORT=3001
```

### Erro: "Module not found"

Reinstale as dependências:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📦 Dependências

- **express** - Framework web
- **pg** - Driver PostgreSQL
- **body-parser** - Parser de requisições
- **dotenv** - Variáveis de ambiente

## 🎨 Design

- **Tailwind CSS** - Framework CSS utilitário
- **Font Awesome** - Ícones
- **Design responsivo** - Mobile-first

## 📝 Licença

Este projeto é fornecido como está, sem garantias.

---

**Desenvolvido com ❤️ usando HTML, CSS, JavaScript e Node.js**

