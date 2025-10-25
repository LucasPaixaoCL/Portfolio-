# 🚀 Guia Completo de Instalação - KittyHub

**Versão:** 1.0.0  
**Data:** 25 de Outubro de 2025  
**Repositório:** https://github.com/LucasPaixaoCL/Portfolio-

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Passo 1: Clonar o Repositório](#passo-1-clonar-o-repositório)
3. [Passo 2: Instalar Node.js e npm](#passo-2-instalar-nodejs-e-npm)
4. [Passo 3: Instalar pnpm](#passo-3-instalar-pnpm)
5. [Passo 4: Instalar PostgreSQL](#passo-4-instalar-postgresql)
6. [Passo 5: Criar Banco de Dados](#passo-5-criar-banco-de-dados)
7. [Passo 6: Configurar Variáveis de Ambiente](#passo-6-configurar-variáveis-de-ambiente)
8. [Passo 7: Instalar Dependências do Projeto](#passo-7-instalar-dependências-do-projeto)
9. [Passo 8: Iniciar o Servidor](#passo-8-iniciar-o-servidor)
10. [Passo 9: Acessar a Aplicação](#passo-9-acessar-a-aplicação)
11. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

Antes de começar, você precisa ter:

- Um computador com Windows, macOS ou Linux
- Acesso à internet
- Terminal/Prompt de Comando
- Permissões de administrador (para instalar softwares)
- Conta no GitHub (opcional, mas recomendado)

---

## Passo 1: Clonar o Repositório

### 1.1 Abra o Terminal/Prompt de Comando

**Windows:** Pressione `Win + R`, digite `cmd` e pressione Enter  
**macOS:** Pressione `Cmd + Space`, digite `terminal` e pressione Enter  
**Linux:** Abra o terminal (Ctrl + Alt + T)

### 1.2 Navegue até a pasta onde deseja clonar o projeto

```bash
# Exemplo: criar uma pasta "Projetos" na área de trabalho
cd Desktop
mkdir Projetos
cd Projetos
```

### 1.3 Clone o repositório

```bash
git clone https://github.com/LucasPaixaoCL/Portfolio-.git
```

### 1.4 Navegue até a pasta do projeto

```bash
cd Portfolio-
```

**Resultado esperado:** Você deve estar dentro da pasta do projeto com todos os arquivos visíveis.

---

## Passo 2: Instalar Node.js e npm

Node.js é o ambiente de execução JavaScript. npm é o gerenciador de pacotes.

### 2.1 Baixe o Node.js

Acesse: https://nodejs.org/

Escolha a versão **LTS (Long Term Support)** - é a mais estável.

### 2.2 Execute o instalador

- **Windows:** Clique no arquivo `.msi` e siga as instruções
- **macOS:** Clique no arquivo `.pkg` e siga as instruções
- **Linux:** Use o gerenciador de pacotes (veja abaixo)

#### Para Linux (Ubuntu/Debian):

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2.3 Verifique a instalação

```bash
node --version
npm --version
```

**Resultado esperado:** Você deve ver números de versão (ex: v18.17.0 e 9.6.7)

---

## Passo 3: Instalar pnpm

pnpm é um gerenciador de pacotes mais rápido e eficiente que npm.

### 3.1 Instale o pnpm globalmente

```bash
npm install -g pnpm
```

### 3.2 Verifique a instalação

```bash
pnpm --version
```

**Resultado esperado:** Você deve ver um número de versão (ex: 8.10.5)

---

## Passo 4: Instalar PostgreSQL

PostgreSQL é o banco de dados que o KittyHub usa.

### 4.1 Baixe o PostgreSQL

Acesse: https://www.postgresql.org/download/

Escolha seu sistema operacional e baixe a versão mais recente.

### 4.2 Execute o instalador

#### Windows:

1. Clique no arquivo `.exe`
2. Siga as instruções do instalador
3. **Importante:** Anote a senha que você criar para o usuário `postgres`
4. Deixe a porta padrão como `5432`
5. Conclua a instalação

#### macOS:

1. Clique no arquivo `.dmg`
2. Arraste o PostgreSQL para a pasta Applications
3. Abra o PostgreSQL e siga as instruções
4. Anote a senha do usuário `postgres`

#### Linux (Ubuntu/Debian):

```bash
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
```

### 4.3 Verifique a instalação

```bash
psql --version
```

**Resultado esperado:** Você deve ver a versão do PostgreSQL (ex: psql (PostgreSQL) 15.0)

---

## Passo 5: Criar Banco de Dados

### 5.1 Abra o psql (cliente PostgreSQL)

#### Windows:

1. Pressione `Win + R`
2. Digite `psql -U postgres`
3. Pressione Enter
4. Digite a senha que você criou durante a instalação

#### macOS/Linux:

```bash
sudo -u postgres psql
```

### 5.2 Crie o banco de dados

Dentro do psql, execute:

```sql
CREATE DATABASE kittyhub;
```

**Resultado esperado:** Você deve ver a mensagem `CREATE DATABASE`

### 5.3 Verifique se o banco foi criado

```sql
\l
```

Você deve ver `kittyhub` na lista de bancos de dados.

### 5.4 Saia do psql

```sql
\q
```

---

## Passo 6: Configurar Variáveis de Ambiente

As variáveis de ambiente armazenam informações sensíveis como a conexão com o banco de dados.

### 6.1 Crie o arquivo `.env`

Na pasta raiz do projeto (Portfolio-), crie um arquivo chamado `.env`

### 6.2 Adicione as configurações

Abra o arquivo `.env` com um editor de texto (Notepad, VS Code, etc.) e adicione:

```env
# Banco de Dados PostgreSQL
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/kittyhub

# Porta do Servidor
PORT=3000

# Ambiente
NODE_ENV=development
```

**Importante:** Substitua `sua_senha` pela senha que você criou para o usuário `postgres`.

### 6.3 Salve o arquivo

Certifique-se de que o arquivo está salvo na pasta raiz do projeto.

**Exemplo de estrutura:**
```
Portfolio-/
├── .env          ← Arquivo criado aqui
├── public/
├── server.js
├── package.json
└── ...
```

---

## Passo 7: Instalar Dependências do Projeto

### 7.1 Abra o terminal na pasta do projeto

```bash
cd Portfolio-
```

### 7.2 Instale as dependências

```bash
pnpm install
```

**O que acontece:** O pnpm vai baixar todos os pacotes necessários (express, pg, dotenv, etc.)

**Tempo esperado:** 2-5 minutos, dependendo da sua internet

**Resultado esperado:** Você deve ver mensagens de progresso e, ao final, algo como:
```
added 150 packages in 2m
```

---

## Passo 8: Iniciar o Servidor

### 8.1 Inicie o servidor

```bash
pnpm start
```

**Resultado esperado:** Você deve ver mensagens como:
```
Server running on http://localhost:3000
Database connected successfully
```

**Se ver um erro de conexão com o banco de dados:**

1. Verifique se o PostgreSQL está rodando
2. Verifique se a senha no `.env` está correta
3. Verifique se o banco de dados `kittyhub` foi criado

### 8.2 Modo desenvolvimento (com auto-reload)

Se quiser que o servidor reinicie automaticamente quando você fizer mudanças:

```bash
pnpm dev
```

---

## Passo 9: Acessar a Aplicação

### 9.1 Abra seu navegador

Acesse: **http://localhost:3000**

### 9.2 Você deve ver:

- ✅ Página inicial do KittyHub
- ✅ Menu de navegação (Home, Galeria, Sobre Mim, Contato)
- ✅ Botão de toggle Light/Dark Theme
- ✅ Formulário de contato funcional

### 9.3 Teste as funcionalidades

**Formulário de Contato:**
1. Clique em "Contato" no menu
2. Preencha os campos (Nome, Email, Mensagem)
3. Clique em "Enviar"
4. Você deve ver uma mensagem de sucesso

**Galeria de Projetos:**
1. Clique em "Galeria" no menu
2. Veja os projetos listados
3. Clique em um projeto para ver os comentários
4. Adicione um comentário para testar

**Tema Escuro:**
1. Clique no ícone de lua no header
2. A página deve mudar para o tema escuro com tons de roxo

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'express'"

**Solução:**
```bash
pnpm install
```

### Erro: "ECONNREFUSED" ao conectar no banco de dados

**Causas e Soluções:**

1. **PostgreSQL não está rodando**

   **Windows:**
   - Abra "Serviços" (Services)
   - Procure por "PostgreSQL"
   - Clique com botão direito e selecione "Iniciar"

   **macOS:**
   - Abra o PostgreSQL.app
   - Clique em "Start Server"

   **Linux:**
   ```bash
   sudo systemctl start postgresql
   ```

2. **Senha incorreta no `.env`**

   - Verifique se a senha está correta
   - Se esqueceu a senha, você pode resetá-la (veja abaixo)

3. **Banco de dados não foi criado**

   ```bash
   psql -U postgres
   CREATE DATABASE kittyhub;
   \q
   ```

### Erro: "Port 3000 already in use"

**Solução:** Mude a porta no `.env`:

```env
PORT=3001
```

Depois acesse: http://localhost:3001

### Erro: "pnpm: command not found"

**Solução:**
```bash
npm install -g pnpm
```

### Esqueci a senha do PostgreSQL

**Windows/macOS/Linux:**

1. Abra o terminal como administrador
2. Execute:

```bash
psql -U postgres
```

3. Se pedir senha e você não sabe, execute (no terminal, não no psql):

**Windows:**
```bash
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -h localhost
```

**macOS/Linux:**
```bash
sudo -u postgres psql
```

4. Dentro do psql, execute:

```sql
ALTER USER postgres WITH PASSWORD 'nova_senha';
\q
```

5. Atualize o `.env` com a nova senha

---

## ✅ Checklist Final

Antes de considerar tudo pronto, verifique:

- [ ] Node.js instalado (`node --version`)
- [ ] pnpm instalado (`pnpm --version`)
- [ ] PostgreSQL instalado (`psql --version`)
- [ ] Banco de dados `kittyhub` criado
- [ ] Arquivo `.env` criado com as configurações corretas
- [ ] Dependências instaladas (`pnpm install` executado)
- [ ] Servidor rodando (`pnpm start`)
- [ ] Navegador acessando http://localhost:3000
- [ ] Formulário de contato funcional
- [ ] Comentários salvando no banco de dados
- [ ] Tema escuro/claro funcionando

---

## 📞 Suporte

Se encontrar problemas não listados acima:

1. Verifique se todos os pré-requisitos estão instalados
2. Tente deletar a pasta `node_modules` e executar `pnpm install` novamente
3. Reinicie o PostgreSQL
4. Reinicie o servidor

---

## 🎉 Parabéns!

Seu KittyHub está pronto para usar! Você pode agora:

- ✅ Editar o conteúdo das páginas
- ✅ Adicionar novos projetos à galeria
- ✅ Personalizar as cores e temas
- ✅ Integrar com seu próprio domínio
- ✅ Fazer deploy em produção

---

**Versão:** 1.0.0  
**Última atualização:** 25 de Outubro de 2025

