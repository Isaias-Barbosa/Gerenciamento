const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cors = require('cors');

// Caminho absoluto para o meals.json
const mealsPath = path.join(__dirname, '../backend/meals.json');

// Ative CORS (para desenvolvimento)
router.use(cors());

// GET /api/meals - retorna todos os pratos
router.get('/api/meals', (req, res) => {
  fs.readFile(mealsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler meals.json' });
    }
    try {
      const meals = JSON.parse(data);
      res.json(meals);
    } catch (e) {
      res.status(500).json({ error: 'JSON inválido em meals.json' });
    }
  });
});

// GET /api/meals/:id - retorna um prato pelo id
// Rota para prato por ID
router.get('/api/meals/:id', (req, res) => {
  fs.readFile(mealsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler meals.json' });
    try {
      const meals = JSON.parse(data);
      const meal = meals.find(m => String(m.id) === String(req.params.id));
      if (!meal) return res.status(404).json({ error: 'Prato não encontrado' });
      res.json(meal);
    } catch {
      res.status(500).json({ error: 'JSON inválido em meals.json' });
    }
  });
});

module.exports = router;
