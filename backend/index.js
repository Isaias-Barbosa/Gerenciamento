require('dotenv').config();// Backend básico Express para gerenciamento de refeições e OAuth
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const mealRoutes = require('./routes/meals');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/meals', mealRoutes);

// Rota para retornar o usuário autenticado
app.get('/auth/user', (req, res) => {
  res.json({ user: req.user || null });
});

app.get('/', (req, res) => res.send('API do Gerenciamento de Refeições'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));

// No final das rotas do Express (server.js)
import path from 'path';
app.use(express.static(path.join(process.cwd(), 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});
