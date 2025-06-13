# TecStore - Projeto Fullstack

## Descrição

Projeto fullstack de uma loja online de tecnologia, desenvolvido para fins acadêmicos. Inclui front-end responsivo, back-end em Node.js/Express e banco de dados MySQL.

## Estrutura

- `/front` — Front-end (HTML, CSS, JS, Bootstrap)
- `/back` — Back-end (Node.js, Express, MySQL)
- `create_db.sql` — Script para criação do banco e tabela de usuários

## Como rodar

### 1. Banco de Dados

- Instale o MySQL Server.
- Execute o script `back/create_db.sql` no MySQL Workbench para criar o banco e a tabela.

### 2. Back-end

```bash
cd back
npm install
node server.js
```
O servidor rodará em `http://localhost:3000`.

### 3. Front-end

- Abra o arquivo `front/index.html` no navegador **ou** use o Live Server do VSCode.

## Funcionalidades

- Cadastro, login, listagem, edição e remoção de usuários (CRUD)
- Dashboard com estatísticas
- Listagem de produtos via API pública (FakeStore API)
- Design responsivo e componentes reutilizáveis

## Testes

- Endpoints testados via Postman
- Integração front-end/back-end validada

## Integrantes

- [Nome 1]
- [Nome 2]
- [Nome 3]

---

**Obs:** Para mais detalhes do front-end, veja o `front/README.md`.  
Para detalhes do back-end, veja o `back/README.md` (se desejar criar um).
