const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho absoluto para o meals.json
const mealsPath = path.join(__dirname, '../backend/comentarios.json');

// GET /api/meals - retorna todos os pratos
router.get('/api/comments', (req, res) => {
  fs.readFile(mealsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler comentarios.json' });
    }
    try {
      const meals = JSON.parse(data);
      res.json(meals);
    } catch (e) {
      res.status(500).json({ error: 'JSON inválido em comentarios.json' });
    }
  });
});

module.exports = router;
