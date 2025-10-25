# Guia de Configuração - Landing Page

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 18+)
   - Download: https://nodejs.org/
   - Verificar: `node --version`

2. **PostgreSQL** (banco de dados)
   - Download: https://www.postgresql.org/download/
   - Verificar: `psql --version`

3. **pnpm** (gerenciador de pacotes - opcional, pode usar npm)
   - Instalar: `npm install -g pnpm`
   - Verificar: `pnpm --version`

## 🔧 Passo a Passo

### 1. Criar Banco de Dados

Abra o terminal e conecte ao PostgreSQL:

```bash
psql -U postgres
```

Crie o banco de dados:

```sql
CREATE DATABASE landing_page;
\q
```

### 2. Clonar/Preparar o Projeto

```bash
cd landing_page
```

### 3. Instalar Dependências

```bash
pnpm install
```

Ou com npm:

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/landing_page
PORT=3000
NODE_ENV=development
```

**Importante:** Substitua `sua_senha` pela senha do PostgreSQL que você definiu durante a instalação.

### 5. Iniciar o Servidor

**Modo desenvolvimento (com auto-reload):**

```bash
pnpm dev
```

**Modo produção:**

```bash
pnpm start
```

Você verá uma mensagem como:

```
🚀 Server running on http://localhost:3000
✓ Database initialized
```

### 6. Acessar a Página

Abra seu navegador e acesse:

```
http://localhost:3000
```

## 🐛 Solução de Problemas

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se PostgreSQL está rodando
2. Confirme a senha no arquivo `.env`
3. Verifique se o banco de dados foi criado:
   ```bash
   psql -U postgres -l | grep landing_page
   ```

### Erro: "Port 3000 already in use"

**Solução:** Mude a porta no arquivo `.env`:

```env
PORT=3001
```

### Erro: "Module not found"

**Solução:** Reinstale as dependências:

```bash
rm -rf node_modules
pnpm install
```

### Erro: "Cannot find psql command"

**Solução:** PostgreSQL não está instalado ou não está no PATH. Instale PostgreSQL novamente.

## 📝 Estrutura de Arquivos

```
landing_page/
├── public/
│   ├── index.html      ← Página HTML principal
│   └── app.js          ← JavaScript do cliente
├── server.js           ← Servidor Express
├── package.json        ← Dependências do projeto
├── .env                ← Variáveis de ambiente (não commitado)
├── .gitignore          ← Arquivos ignorados pelo git
├── README.md           ← Documentação principal
└── SETUP.md            ← Este arquivo
```

## 🚀 Próximos Passos

1. **Personalizar a página:** Edite `public/index.html`
2. **Modificar estilos:** Use classes do Tailwind CSS
3. **Adicionar funcionalidades:** Edite `server.js` para adicionar novos endpoints
4. **Deploy:** Veja a seção de Deploy no README.md

## 📞 Comandos Úteis

```bash
# Iniciar servidor em desenvolvimento
pnpm dev

# Iniciar servidor em produção
pnpm start

# Instalar nova dependência
pnpm add nome-do-pacote

# Remover dependência
pnpm remove nome-do-pacote

# Conectar ao banco de dados
psql -U postgres landing_page

# Ver contatos salvos
SELECT * FROM contacts ORDER BY created_at DESC;
```

## ✅ Checklist de Configuração

- [ ] Node.js instalado (versão 18+)
- [ ] PostgreSQL instalado e rodando
- [ ] Banco de dados `landing_page` criado
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Arquivo `.env` criado com `DATABASE_URL`
- [ ] Servidor iniciado (`pnpm dev`)
- [ ] Página acessível em `http://localhost:3000`
- [ ] Formulário funcional (teste enviando um contato)

---

**Pronto para começar! 🎉**

