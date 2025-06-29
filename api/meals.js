const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho absoluto para o meals.json
const mealsPath = path.join(__dirname, '../backend/meals.json');

// GET /api/meals - retorna todos os pratos
router.get('/meals', (req, res) => {
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

module.exports = router;
