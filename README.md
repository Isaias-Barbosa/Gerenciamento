# Meal Planner - App de Planejamento de Refeições

Este projeto é um app fullstack para planejamento de refeições, com frontend em React (Vite) e backend em Node.js/Express. Inclui autenticação OAuth e compartilhamento em redes sociais.

## Como rodar o projeto

### Backend
1. Vá para a pasta `backend`:
   ```sh
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Crie um arquivo `.env` na pasta `backend` com as variáveis do Google OAuth:
   ```env
   GOOGLE_CLIENT_ID=seu_client_id
   GOOGLE_CLIENT_SECRET=seu_client_secret
   SESSION_SECRET=sua_session_secret
   ```
4. Inicie o servidor:
   ```sh
   npm start
   ```

### Frontend
1. Na raiz do projeto, instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o frontend:
   ```sh
   npm run dev
   ```

Acesse o frontend em http://localhost:5173 e o backend em http://localhost:5000.

### API
A API REST roda junto com o backend Express. Endpoints principais:

- `GET /api/meals` — Lista todas as refeições
- `POST /api/meals` — Cria uma nova refeição
- `PUT /api/meals/:id` — Edita uma refeição
- `DELETE /api/meals/:id` — Remove uma refeição
- `GET /api/menuExecutivo` — Lista menus executivos
- `POST /api/menuExecutivo` — Cria menu executivo

Para testar a API, use ferramentas como Postman ou Insomnia, ou consuma via frontend já integrado.

## Funcionalidades
- Login com Google (OAuth)
- Planejamento de refeições (CRUD)
- Compartilhamento em redes sociais

## Observações
- Configure as variáveis de ambiente do Google OAuth no backend (`GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`).
- O backend aceita requisições do frontend local (`http://localhost:5173`).
- Em produção, ajuste os redirects do OAuth e CORS para o domínio do frontend.
# Gerenciamento
