import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { join, dirname } from 'path';

import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Meals ---
const mealsPath = join(__dirname, 'backend/meals.json');
app.get('/api/meals', (req, res) => {
  fs.readFile(mealsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler meals.json' });
    try {
      const meals = JSON.parse(data);
      res.json(meals);
    } catch (e) {
      res.status(500).json({ error: 'JSON inválido em meals.json' });
    }
  });
});

// --- Comentários ---
const commentsPath = join(__dirname, 'backend/comentarios.json');
app.get('/api/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler comentarios.json' });
    try {
      const comments = JSON.parse(data);
      res.json(comments);
    } catch (e) {
      res.status(500).json({ error: 'JSON inválido em comentarios.json' });
    }
  });
});
app.get('/api/comments/last/:n', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler comentarios.json' });
    try {
      const allComments = JSON.parse(data);
      const n = parseInt(req.params.n, 10) || 10;
      res.json(allComments.slice(-n).reverse());
    } catch (e) {
      res.status(500).json({ error: 'JSON inválido em comentarios.json' });
    }
  });
});

// --- Menus Executivos ---
const menuExecutivoPath = join(__dirname, 'backend/menuExecutivo.json');

app.get('/api/menuExecutivo', (req, res) => {
  fs.readFile(menuExecutivoPath, 'utf8', (err, data) => {
    if (err) return res.json([]);
    try {
      const menus = JSON.parse(data);
      res.json(menus);
    } catch (e) {
      res.json([]);
    }
  });
});

app.post('/api/menuExecutivo', (req, res) => {
  fs.readFile(menuExecutivoPath, 'utf8', (err, data) => {
    let menus = [];
    if (!err) {
      try { menus = JSON.parse(data); } catch {}
    }
    menus.unshift(req.body);
    fs.writeFile(menuExecutivoPath, JSON.stringify(menus, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Erro ao salvar menu' });
      res.json(menus);
    });
  });
});

app.delete('/api/menuExecutivo/:id', (req, res) => {
  fs.readFile(menuExecutivoPath, 'utf8', (err, data) => {
    let menus = [];
    if (!err) {
      try { menus = JSON.parse(data); } catch {}
    }
    menus = menus.filter(m => m.id !== req.params.id);
    fs.writeFile(menuExecutivoPath, JSON.stringify(menus, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Erro ao excluir menu' });
      res.json(menus);
    });
  });
});

// Servir o frontend buildado (dist) pelo Express
app.use(express.static(join(__dirname, 'dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
