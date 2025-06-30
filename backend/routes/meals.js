// Rotas para gerenciamento de refeições
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const MEALS_PATH = path.join(__dirname, '../meals.json');

let meals = [];
let propagandaIds = [];

function saveMealsToFile() {
  fs.writeFileSync(MEALS_PATH, JSON.stringify(meals, null, 2), 'utf-8');
}
function loadMealsFromFile() {
  if (fs.existsSync(MEALS_PATH)) {
    meals = JSON.parse(fs.readFileSync(MEALS_PATH, 'utf-8'));
  }
}

// Carrega refeições ao iniciar
loadMealsFromFile();

router.get('/', (req, res) => {
  res.json(meals);
});

router.post('/', (req, res) => {
  const meal = req.body;
  // Garante que os campos novos existam
  meal.description = meal.description || '';
  meal.date = meal.date || '';
  meal.ingredients = meal.ingredients || [];
  meal.price = meal.price || '';
  meal.image = meal.image || '';
  meals.push(meal);
  saveMealsToFile();
  res.status(201).json(meal);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  meals = meals.filter(m => m.id !== id);
  saveMealsToFile();
  res.status(204).end();
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = meals.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).end();
  meals[idx] = { ...meals[idx], ...req.body };
  saveMealsToFile();
  res.json(meals[idx]);
});

// Rotas para propaganda
router.get('/propaganda', (req, res) => {
  res.json({ propagandaIds });
});

router.put('/propaganda', (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids deve ser um array' });
  propagandaIds = ids;
  res.json({ propagandaIds });
});

// Nova rota para marcar/desmarcar propaganda em cada prato
router.put('/propaganda/set', (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids deve ser um array' });
  meals = meals.map(m => ({ ...m, isPropaganda: ids.includes(m.id) }));
  propagandaIds = ids;
  saveMealsToFile();
  res.json({ propagandaIds });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const meal = meals.find(m => String(m.id) === id); // compara como string

  if (!meal) {
    return res.status(404).json({ error: 'Prato não encontrado' });
  }

  res.json(meal);
});

module.exports = router;
