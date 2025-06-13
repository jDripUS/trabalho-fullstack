# Back-end TecStore

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Configure o banco MySQL (usuário, senha, banco `tecstore`).
3. Rode o servidor:
   ```
   node server.js
   ```

## Endpoints

- `GET /usuarios` - Lista usuários
- `POST /usuarios` - Cadastra usuário
- `PUT /usuarios/:id` - Atualiza usuário
- `DELETE /usuarios/:id` - Remove usuário

## Observações

- O servidor usa MySQL local.
- O front-end consome as rotas do back-end em `http://localhost:3000`.
