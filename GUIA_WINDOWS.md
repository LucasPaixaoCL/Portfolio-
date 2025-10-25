# 🪟 Guia Completo para Windows - KittyHub

**Versão:** 1.0.0  
**Data:** 25 de Outubro de 2025  
**Sistema Operacional:** Windows 10/11

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Passo 1: Instalar Git](#passo-1-instalar-git)
3. [Passo 2: Instalar Node.js e npm](#passo-2-instalar-nodejs-e-npm)
4. [Passo 3: Instalar pnpm](#passo-3-instalar-pnpm)
5. [Passo 4: Instalar PostgreSQL](#passo-4-instalar-postgresql)
6. [Passo 5: Clonar o Repositório](#passo-5-clonar-o-repositório)
7. [Passo 6: Criar Banco de Dados](#passo-6-criar-banco-de-dados)
8. [Passo 7: Configurar .env](#passo-7-configurar-env)
9. [Passo 8: Instalar Dependências](#passo-8-instalar-dependências)
10. [Passo 9: Rodar o Servidor](#passo-9-rodar-o-servidor)
11. [Passo 10: Acessar a Aplicação](#passo-10-acessar-a-aplicação)

---

## 🔧 Pré-requisitos

Você vai precisar de:

- Windows 10 ou Windows 11
- Acesso à internet
- Permissões de administrador
- Um editor de texto (Notepad, VS Code, etc.)
- Um navegador web (Chrome, Firefox, Edge, etc.)

---

## Passo 1: Instalar Git

Git é necessário para clonar o repositório do GitHub.

### 1.1 Baixar Git

1. Acesse: **https://git-scm.com/download/win**
2. O download deve começar automaticamente
3. Se não começar, clique em "Click here to download manually"

### 1.2 Executar o Instalador

1. Abra a pasta **Downloads** (geralmente em `C:\Users\SeuUsuario\Downloads`)
2. Procure pelo arquivo `Git-2.x.x-64-bit.exe` (o número da versão pode variar)
3. Clique com o botão direito e selecione **"Executar como administrador"**

### 1.3 Seguir as Instruções

1. Clique em **"Next"** várias vezes
2. Quando chegar em "Choosing the default editor used by Git", deixe como está
3. Quando chegar em "Configuring the line ending conversions", deixe como está
4. Clique em **"Install"**
5. Clique em **"Finish"**

### 1.4 Verificar Instalação

1. Pressione **Win + R** (abre "Executar")
2. Digite `cmd` e pressione **Enter**
3. Na janela preta que abrir, digite:

```bash
git --version
```

4. Pressione **Enter**

**Resultado esperado:** Você deve ver algo como `git version 2.42.0.windows.1`

---

## Passo 2: Instalar Node.js e npm

Node.js é o ambiente JavaScript que o KittyHub usa.

### 2.1 Baixar Node.js

1. Acesse: **https://nodejs.org/**
2. Você verá dois botões grandes:
   - **LTS** (recomendado) - versão estável
   - **Current** - versão mais nova
3. Clique em **LTS** (por exemplo, v20.x.x)
4. Clique no botão **Windows Installer (.msi)** para 64-bit

### 2.2 Executar o Instalador

1. Abra a pasta **Downloads**
2. Procure pelo arquivo `node-v20.x.x-x64.msi`
3. Clique com o botão direito e selecione **"Executar como administrador"**

### 2.3 Seguir as Instruções

1. Clique em **"Next"** na primeira tela
2. Aceite o contrato de licença (marque a caixa) e clique **"Next"**
3. Deixe o local de instalação padrão e clique **"Next"**
4. Deixe as opções padrão e clique **"Next"**
5. Na tela "Tools for Native Modules", deixe desmarcado e clique **"Next"**
6. Clique em **"Install"**
7. Pode ser que peça permissão de administrador - clique **"Sim"**
8. Clique em **"Finish"**

### 2.4 Verificar Instalação

1. Pressione **Win + R**
2. Digite `cmd` e pressione **Enter**
3. Digite:

```bash
node --version
```

4. Pressione **Enter**

**Resultado esperado:** Você deve ver algo como `v20.10.0`

5. Agora verifique o npm:

```bash
npm --version
```

6. Pressione **Enter**

**Resultado esperado:** Você deve ver algo como `10.2.3`

---

## Passo 3: Instalar pnpm

pnpm é um gerenciador de pacotes mais rápido que npm.

### 3.1 Abrir o Prompt de Comando

1. Pressione **Win + R**
2. Digite `cmd` e pressione **Enter**

### 3.2 Instalar pnpm

Na janela preta, digite:

```bash
npm install -g pnpm
```

Pressione **Enter** e aguarde a instalação (pode levar 1-2 minutos).

### 3.3 Verificar Instalação

Na mesma janela, digite:

```bash
pnpm --version
```

Pressione **Enter**

**Resultado esperado:** Você deve ver algo como `8.10.5`

---

## Passo 4: Instalar PostgreSQL

PostgreSQL é o banco de dados do KittyHub.

### 4.1 Baixar PostgreSQL

1. Acesse: **https://www.postgresql.org/download/windows/**
2. Clique em **"Download the installer"**
3. Escolha a versão mais recente (ex: PostgreSQL 15)
4. Clique em **"Download"**

### 4.2 Executar o Instalador

1. Abra a pasta **Downloads**
2. Procure pelo arquivo `postgresql-15.x-x64.exe` (o número pode variar)
3. Clique com o botão direito e selecione **"Executar como administrador"**

### 4.3 Seguir as Instruções - Parte 1

1. Clique em **"Next"** na primeira tela
2. Deixe o local de instalação padrão e clique **"Next"**
3. Deixe os componentes padrão e clique **"Next"**
4. Deixe o diretório de dados padrão e clique **"Next"**

### 4.4 Seguir as Instruções - Parte 2 (IMPORTANTE)

Agora você vai criar uma **senha para o usuário postgres**:

1. Na tela "Password", digite uma senha que você vai lembrar
   - **Exemplo:** `postgres123`
   - Anote essa senha em um lugar seguro!
2. Digite a mesma senha novamente em "Retype password"
3. Clique **"Next"**

### 4.5 Seguir as Instruções - Parte 3

1. Deixe a porta como **5432** (padrão)
2. Deixe o locale como **[Default locale]**
3. Clique **"Next"**
4. Clique **"Next"** novamente
5. Clique em **"Install"**
6. Aguarde a instalação (pode levar alguns minutos)
7. **Desmarque** a caixa "Stack Builder" (não é necessário)
8. Clique em **"Finish"**

### 4.6 Verificar Instalação

1. Pressione **Win + R**
2. Digite `cmd` e pressione **Enter**
3. Digite:

```bash
psql --version
```

4. Pressione **Enter**

**Resultado esperado:** Você deve ver algo como `psql (PostgreSQL) 15.0`

---

## Passo 5: Clonar o Repositório

### 5.1 Criar uma Pasta para o Projeto

1. Abra o **Explorador de Arquivos** (Windows Explorer)
2. Navegue até a **Área de Trabalho** (Desktop)
3. Clique com o botão direito em um espaço vazio
4. Selecione **"Novo"** > **"Pasta"**
5. Digite o nome: `Projetos`
6. Pressione **Enter**

### 5.2 Abrir o Prompt de Comando na Pasta

1. Abra a pasta `Projetos` que você acabou de criar
2. Clique na barra de endereço (onde mostra o caminho)
3. Limpe tudo e digite: `cmd`
4. Pressione **Enter**

Uma janela preta deve abrir.

### 5.3 Clonar o Repositório

Na janela preta, digite:

```bash
git clone https://github.com/LucasPaixaoCL/Portfolio-.git
```

Pressione **Enter** e aguarde (pode levar alguns segundos).

**Resultado esperado:** Você deve ver mensagens como:
```
Cloning into 'Portfolio-'...
remote: Enumerating objects: ...
```

### 5.4 Entrar na Pasta do Projeto

Na mesma janela, digite:

```bash
cd Portfolio-
```

Pressione **Enter**

**Resultado esperado:** O caminho na janela deve mudar para algo como:
```
C:\Users\SeuUsuario\Desktop\Projetos\Portfolio->
```

---

## Passo 6: Criar Banco de Dados

### 6.1 Abrir o PostgreSQL

1. Pressione **Win + R**
2. Digite: `psql -U postgres`
3. Pressione **Enter**
4. Digite a senha que você criou no Passo 4.4
5. Pressione **Enter**

**Resultado esperado:** Você deve ver algo como:
```
psql (15.0)
Type "help" for help.

postgres=#
```

### 6.2 Criar o Banco de Dados

Na janela do psql, digite:

```sql
CREATE DATABASE kittyhub;
```

Pressione **Enter**

**Resultado esperado:** Você deve ver:
```
CREATE DATABASE
```

### 6.3 Verificar se o Banco foi Criado

Digite:

```sql
\l
```

Pressione **Enter**

Você deve ver uma lista com `kittyhub` incluído.

### 6.4 Sair do PostgreSQL

Digite:

```sql
\q
```

Pressione **Enter**

Você voltará ao prompt de comando normal.

---

## Passo 7: Configurar .env

O arquivo `.env` armazena as configurações sensíveis do projeto.

### 7.1 Abrir o Bloco de Notas

1. Pressione **Win + R**
2. Digite: `notepad`
3. Pressione **Enter**

Uma janela em branco vai abrir.

### 7.2 Adicionar as Configurações

Copie e cole o seguinte texto:

```env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/kittyhub
PORT=3000
NODE_ENV=development
```

**IMPORTANTE:** Se você usou uma senha diferente no Passo 4.4, substitua `postgres123` pela sua senha.

### 7.3 Salvar o Arquivo

1. Pressione **Ctrl + S**
2. Na janela que abrir:
   - **Nome do arquivo:** `.env`
   - **Tipo de arquivo:** Todos os arquivos (*)
   - **Local:** Navegue até `Desktop\Projetos\Portfolio-`
3. Clique em **"Salvar"**

**Importante:** O arquivo DEVE se chamar `.env` (com o ponto na frente).

### 7.4 Verificar se o Arquivo foi Criado

1. Abra o Explorador de Arquivos
2. Navegue até `Desktop\Projetos\Portfolio-`
3. Você deve ver um arquivo chamado `.env`

---

## Passo 8: Instalar Dependências

### 8.1 Abrir o Prompt de Comando na Pasta do Projeto

1. Abra o Explorador de Arquivos
2. Navegue até `Desktop\Projetos\Portfolio-`
3. Clique na barra de endereço
4. Limpe e digite: `cmd`
5. Pressione **Enter**

### 8.2 Instalar as Dependências

Na janela preta, digite:

```bash
pnpm install
```

Pressione **Enter** e aguarde (pode levar 2-5 minutos).

**Resultado esperado:** Você deve ver mensagens de progresso e, ao final:
```
added 150 packages in 2m 30s
```

---

## Passo 9: Rodar o Servidor

### 9.1 Iniciar o Servidor

Na mesma janela do Prompt de Comando, digite:

```bash
pnpm start
```

Pressione **Enter**

**Resultado esperado:** Você deve ver mensagens como:
```
Server running on http://localhost:3000
Database connected successfully
```

**Se ver um erro de conexão com o banco de dados:**

1. Verifique se a senha no `.env` está correta
2. Verifique se o PostgreSQL está rodando (pode abrir o Services do Windows)
3. Verifique se o banco de dados `kittyhub` foi criado

### 9.2 Manter o Servidor Rodando

**NÃO feche essa janela!** O servidor precisa estar rodando para acessar a aplicação.

Se quiser usar o terminal para outras coisas, abra outra janela do Prompt de Comando.

---

## Passo 10: Acessar a Aplicação

### 10.1 Abrir o Navegador

1. Abra seu navegador favorito (Chrome, Firefox, Edge, etc.)
2. Na barra de endereço, digite: `http://localhost:3000`
3. Pressione **Enter**

### 10.2 Você Deve Ver

- ✅ Página inicial do KittyHub
- ✅ Menu de navegação (Home, Galeria, Sobre Mim, Contato)
- ✅ Botão de toggle Light/Dark Theme (ícone de lua)
- ✅ Formulário de contato

### 10.3 Testar as Funcionalidades

**Teste 1: Formulário de Contato**
1. Clique em "Contato" no menu
2. Preencha os campos:
   - Nome: Seu nome
   - Email: seu@email.com
   - Mensagem: Uma mensagem de teste
3. Clique em "Enviar"
4. Você deve ver uma mensagem de sucesso

**Teste 2: Galeria de Projetos**
1. Clique em "Galeria" no menu
2. Você deve ver 6 projetos
3. Clique em um projeto para ver os comentários
4. Preencha o formulário de comentário e clique em "Enviar Comentário"

**Teste 3: Tema Escuro**
1. Clique no ícone de lua no canto superior direito
2. A página deve mudar para o tema escuro com tons de roxo

**Teste 4: Página Sobre Mim**
1. Clique em "Sobre Mim" no menu
2. Você deve ver informações sobre a carreira

---

## 🎯 Resumo do que foi Feito

| Passo | O que foi instalado | Verificação |
|-------|-------------------|-------------|
| 1 | Git | `git --version` |
| 2 | Node.js e npm | `node --version` e `npm --version` |
| 3 | pnpm | `pnpm --version` |
| 4 | PostgreSQL | `psql --version` |
| 5 | Repositório clonado | Pasta `Portfolio-` criada |
| 6 | Banco de dados | `CREATE DATABASE kittyhub` |
| 7 | Arquivo .env | Arquivo `.env` criado |
| 8 | Dependências | `pnpm install` executado |
| 9 | Servidor rodando | `pnpm start` executado |
| 10 | Aplicação acessível | http://localhost:3000 funciona |

---

## 🐛 Troubleshooting para Windows

### Problema: "git is not recognized"

**Solução:**
1. Reinicie o Prompt de Comando
2. Se ainda não funcionar, reinicie o Windows

### Problema: "node is not recognized"

**Solução:**
1. Reinicie o Prompt de Comando
2. Se ainda não funcionar, reinstale Node.js

### Problema: "pnpm is not recognized"

**Solução:**
```bash
npm install -g pnpm
```

### Problema: "ECONNREFUSED" ao conectar no banco de dados

**Solução:**

1. Verifique se PostgreSQL está rodando:
   - Pressione **Win + R**
   - Digite: `services.msc`
   - Procure por "postgresql-x64-15" (o número pode variar)
   - Clique com botão direito e selecione "Iniciar"

2. Verifique se a senha no `.env` está correta

3. Verifique se o banco de dados foi criado:
   ```bash
   psql -U postgres
   \l
   \q
   ```

### Problema: "Port 3000 already in use"

**Solução:**

1. Abra o arquivo `.env`
2. Mude `PORT=3000` para `PORT=3001`
3. Salve o arquivo
4. Reinicie o servidor
5. Acesse `http://localhost:3001`

### Problema: Esqueci a Senha do PostgreSQL

**Solução:**

1. Pressione **Win + R**
2. Digite: `services.msc`
3. Procure por "postgresql-x64-15"
4. Clique com botão direito e selecione "Parar"
5. Abra o Prompt de Comando como administrador
6. Digite:
   ```bash
   psql -U postgres
   ```
7. Se não pedir senha, você conseguiu acessar
8. Digite:
   ```sql
   ALTER USER postgres WITH PASSWORD 'nova_senha';
   \q
   ```
9. Atualize o `.env` com a nova senha

### Problema: "Cannot find module"

**Solução:**
1. Abra o Prompt de Comando na pasta do projeto
2. Delete a pasta `node_modules`:
   ```bash
   rmdir /s /q node_modules
   ```
3. Reinstale as dependências:
   ```bash
   pnpm install
   ```

---

## ✅ Checklist Final

Antes de considerar tudo pronto:

- [ ] Git instalado
- [ ] Node.js instalado
- [ ] npm instalado
- [ ] pnpm instalado
- [ ] PostgreSQL instalado
- [ ] Banco de dados `kittyhub` criado
- [ ] Arquivo `.env` criado com as configurações corretas
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Servidor rodando (`pnpm start`)
- [ ] Navegador acessando `http://localhost:3000`
- [ ] Formulário de contato funcional
- [ ] Comentários salvando
- [ ] Tema escuro/claro funcionando

---

## 🎉 Parabéns!

Seu KittyHub está pronto para usar no Windows!

Você pode agora:
- ✅ Editar o conteúdo das páginas
- ✅ Adicionar novos projetos à galeria
- ✅ Personalizar as cores e temas
- ✅ Fazer deploy em produção

---

**Versão:** 1.0.0  
**Última atualização:** 25 de Outubro de 2025  
**Sistema:** Windows 10/11

