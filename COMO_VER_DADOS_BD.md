# 📊 Como Visualizar os Dados do Banco de Dados - KittyHub

**Versão:** 1.0.0  
**Data:** 25 de Outubro de 2025  
**Sistema:** Windows 10/11

---

## 📋 Índice

1. [Método 1: Usando pgAdmin (Recomendado)](#método-1-usando-pgadmin-recomendado)
2. [Método 2: Usando o Prompt de Comando (psql)](#método-2-usando-o-prompt-de-comando-psql)
3. [Método 3: Usando DBeaver](#método-3-usando-dbeaver)
4. [Estrutura das Tabelas](#estrutura-das-tabelas)
5. [Comandos SQL Úteis](#comandos-sql-úteis)

---

## Método 1: Usando pgAdmin (Recomendado)

pgAdmin é uma interface gráfica que vem com PostgreSQL. É a forma mais fácil de visualizar os dados.

### 1.1 Abrir pgAdmin

1. Pressione **Win + R**
2. Digite: `pgAdmin 4`
3. Pressione **Enter**

Ou procure por **pgAdmin 4** no Menu Iniciar do Windows.

Uma janela do navegador deve abrir automaticamente (geralmente em `http://localhost:5050`).

### 1.2 Fazer Login

1. Se pedir email e senha, use:
   - **Email:** postgres@pgadmin.org (ou o email que você configurou)
   - **Senha:** admin (ou a senha que você configurou)

2. Clique em **"Login"**

### 1.3 Conectar ao Servidor PostgreSQL

1. No painel esquerdo, você deve ver **"Servers"**
2. Se não houver nenhum servidor listado, clique com botão direito em **"Servers"**
3. Selecione **"Create"** > **"Server"**
4. Na aba **"General"**:
   - **Name:** PostgreSQL (ou qualquer nome)
5. Na aba **"Connection"**:
   - **Host name/address:** localhost
   - **Port:** 5432
   - **Username:** postgres
   - **Password:** postgres123 (a senha que você criou)
6. Clique em **"Save"**

### 1.4 Visualizar o Banco de Dados

1. Expanda **"Servers"** > **"PostgreSQL"** (ou o nome que você deu)
2. Expanda **"Databases"**
3. Clique em **"kittyhub"**
4. Expanda **"Schemas"** > **"public"** > **"Tables"**

Você deve ver as tabelas:
- **contacts** - Dados de contato do formulário
- **comments** - Comentários dos projetos

### 1.5 Visualizar os Dados

1. Clique com botão direito em **"contacts"**
2. Selecione **"View/Edit Data"** > **"All Rows"**

Uma tabela deve aparecer mostrando todos os contatos que foram enviados!

**Colunas que você verá:**
- **id** - Número único do contato
- **name** - Nome da pessoa
- **email** - Email da pessoa
- **message** - Mensagem enviada
- **created_at** - Data e hora que foi enviado

### 1.6 Visualizar Comentários

1. Clique com botão direito em **"comments"**
2. Selecione **"View/Edit Data"** > **"All Rows"**

Você verá todos os comentários dos projetos!

**Colunas que você verá:**
- **id** - Número único do comentário
- **project_id** - ID do projeto comentado
- **name** - Nome de quem comentou
- **email** - Email de quem comentou
- **text** - Texto do comentário
- **created_at** - Data e hora do comentário

---

## Método 2: Usando o Prompt de Comando (psql)

Se preferir usar o terminal, você pode usar o psql (cliente PostgreSQL).

### 2.1 Abrir o Prompt de Comando

1. Pressione **Win + R**
2. Digite: `cmd`
3. Pressione **Enter**

### 2.2 Conectar ao Banco de Dados

Na janela preta, digite:

```bash
psql -U postgres -d kittyhub
```

Pressione **Enter** e digite a senha quando pedir (postgres123).

**Resultado esperado:**
```
psql (15.0)
Type "help" for help.

kittyhub=#
```

### 2.3 Ver Todos os Contatos

Digite:

```sql
SELECT * FROM contacts;
```

Pressione **Enter**

Você verá uma tabela com todos os contatos!

**Exemplo de resultado:**
```
 id |    name    |      email      |        message         |     created_at
----+------------+-----------------+------------------------+-------------------
  1 | João Silva | joao@email.com  | Ótimo projeto!         | 2025-10-25 19:06
  2 | Maria      | maria@email.com | Muito bom mesmo!       | 2025-10-25 19:10
```

### 2.4 Ver Todos os Comentários

Digite:

```sql
SELECT * FROM comments;
```

Pressione **Enter**

### 2.5 Ver Apenas Contatos Recentes

Para ver apenas os últimos 5 contatos (mais recentes primeiro):

```sql
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;
```

### 2.6 Ver Contatos de um Email Específico

Para procurar contatos de um email específico:

```sql
SELECT * FROM contacts WHERE email = 'seu@email.com';
```

### 2.7 Contar Quantos Contatos Existem

```sql
SELECT COUNT(*) FROM contacts;
```

### 2.8 Sair do psql

Digite:

```sql
\q
```

Pressione **Enter**

---

## Método 3: Usando DBeaver

DBeaver é um programa mais avançado para gerenciar bancos de dados.

### 3.1 Baixar DBeaver

1. Acesse: **https://dbeaver.io/download/**
2. Clique em **"Windows"**
3. Escolha **"Installer"** (recomendado)
4. Clique em **"Download"**

### 3.2 Instalar DBeaver

1. Abra o arquivo `.exe` que foi baixado
2. Clique em **"Next"** várias vezes
3. Clique em **"Install"**
4. Clique em **"Finish"**

### 3.3 Conectar ao PostgreSQL

1. Abra o DBeaver
2. Clique em **"Database"** > **"New Database Connection"**
3. Escolha **"PostgreSQL"** e clique em **"Next"**
4. Preencha os dados:
   - **Server Host:** localhost
   - **Port:** 5432
   - **Database:** kittyhub
   - **Username:** postgres
   - **Password:** postgres123
5. Clique em **"Test Connection"** para verificar
6. Clique em **"Finish"**

### 3.4 Visualizar os Dados

1. No painel esquerdo, expanda **"PostgreSQL"** > **"kittyhub"** > **"public"** > **"Tables"**
2. Clique em **"contacts"**
3. Na aba **"Data"** você verá todos os contatos
4. Clique em **"comments"** para ver os comentários

---

## Estrutura das Tabelas

### Tabela: contacts

Armazena os dados do formulário de contato da página inicial.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | ID único do contato (auto-incrementado) |
| name | VARCHAR(255) | Nome da pessoa |
| email | VARCHAR(255) | Email da pessoa |
| message | TEXT | Mensagem enviada |
| created_at | TIMESTAMP | Data e hora do envio |

**Exemplo de registro:**
```
id: 1
name: João Silva
email: joao@email.com
message: Gostaria de saber mais sobre seus serviços
created_at: 2025-10-25 19:06:00
```

### Tabela: comments

Armazena os comentários dos projetos na galeria.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT | ID único do comentário |
| project_id | VARCHAR(50) | ID do projeto comentado |
| name | VARCHAR(255) | Nome de quem comentou |
| email | VARCHAR(255) | Email de quem comentou |
| text | TEXT | Texto do comentário |
| created_at | TIMESTAMP | Data e hora do comentário |

**Exemplo de registro:**
```
id: 1761419428683
project_id: project-1
name: Ana Silva
email: ana@example.com
text: Excelente projeto! Muito bem executado.
created_at: 2025-10-25 19:11:00
```

---

## Comandos SQL Úteis

Aqui estão alguns comandos SQL que você pode usar no psql para consultar os dados.

### Ver Todos os Contatos

```sql
SELECT * FROM contacts;
```

### Ver Todos os Comentários

```sql
SELECT * FROM comments;
```

### Ver Últimos 10 Contatos (Mais Recentes Primeiro)

```sql
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
```

### Ver Contatos de um Email Específico

```sql
SELECT * FROM contacts WHERE email = 'joao@email.com';
```

### Ver Contatos que Contêm uma Palavra na Mensagem

```sql
SELECT * FROM contacts WHERE message LIKE '%saudações%';
```

### Contar Quantos Contatos Existem

```sql
SELECT COUNT(*) as total_contatos FROM contacts;
```

### Contar Quantos Comentários Existem

```sql
SELECT COUNT(*) as total_comentarios FROM comments;
```

### Ver Comentários de um Projeto Específico

```sql
SELECT * FROM comments WHERE project_id = 'project-1';
```

### Ver Contatos de um Dia Específico

```sql
SELECT * FROM contacts WHERE DATE(created_at) = '2025-10-25';
```

### Ver Contatos Ordenados por Data (Mais Antigos Primeiro)

```sql
SELECT * FROM contacts ORDER BY created_at ASC;
```

### Deletar um Contato (Cuidado!)

```sql
DELETE FROM contacts WHERE id = 1;
```

### Deletar Todos os Contatos (Muito Cuidado!)

```sql
DELETE FROM contacts;
```

### Ver a Estrutura da Tabela

```sql
\d contacts
```

---

## 🎯 Resumo Rápido

| Método | Facilidade | Recomendação |
|--------|-----------|--------------|
| **pgAdmin** | ⭐⭐⭐⭐⭐ Muito Fácil | ✅ Melhor para iniciantes |
| **psql** | ⭐⭐⭐ Médio | ✅ Bom para linha de comando |
| **DBeaver** | ⭐⭐⭐⭐ Fácil | ✅ Melhor para profissionais |

---

## 🔍 Testando os Dados

### 1. Envie um Contato

1. Acesse **http://localhost:3000**
2. Clique em **"Contato"**
3. Preencha o formulário:
   - Nome: Seu Nome
   - Email: seu@email.com
   - Mensagem: Uma mensagem de teste
4. Clique em **"Enviar"**

### 2. Visualize no Banco de Dados

Usando pgAdmin:
1. Abra pgAdmin
2. Vá até **Servers** > **PostgreSQL** > **Databases** > **kittyhub** > **Schemas** > **public** > **Tables** > **contacts**
3. Clique com botão direito e selecione **"View/Edit Data"** > **"All Rows"**
4. Você verá o contato que acabou de enviar!

Ou usando psql:
1. Abra o Prompt de Comando
2. Digite: `psql -U postgres -d kittyhub`
3. Digite: `SELECT * FROM contacts ORDER BY created_at DESC LIMIT 1;`
4. Você verá o último contato enviado!

---

## ✅ Checklist

- [ ] Consegui visualizar a tabela de contatos
- [ ] Consegui visualizar a tabela de comentários
- [ ] Consegui enviar um contato e vê-lo no banco de dados
- [ ] Consegui enviar um comentário e vê-lo no banco de dados

---

## 🎉 Parabéns!

Agora você sabe como visualizar todos os dados que estão sendo salvos no banco de dados do KittyHub!

---

**Versão:** 1.0.0  
**Última atualização:** 25 de Outubro de 2025

