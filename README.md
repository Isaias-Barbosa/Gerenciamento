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
3. Inicie o servidor:
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

## Funcionalidades
- Login com Google (OAuth)
- Planejamento de refeições (CRUD)
- Compartilhamento em redes sociais

## Observações
- Configure as variáveis de ambiente do Google OAuth no backend (`GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`).
- O backend aceita requisições do frontend local.
# Gerenciamento
