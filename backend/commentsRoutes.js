const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const COMMENTS_PATH = path.join(__dirname, 'comentarios.json');

// GET all comments
router.get('/', (req, res) => {
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler comentários.' });
    res.json(JSON.parse(data));
  });
});

// GET last N comments
router.get('/last/:n', (req, res) => {
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler comentários.' });
    const all = JSON.parse(data);
    const n = parseInt(req.params.n, 10) || 10;
    res.json(all.slice(-n).reverse());
  });
});

// PUT edit comment
router.put('/:id', express.json(), (req, res) => {
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler comentários.' });
    let all = JSON.parse(data);
    const idx = all.findIndex(c => c.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Comentário não encontrado.' });
    all[idx] = { ...all[idx], ...req.body };
    fs.writeFile(COMMENTS_PATH, JSON.stringify(all, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Erro ao salvar comentário.' });
      res.json(all[idx]);
    });
  });
});

// DELETE comment
router.delete('/:id', (req, res) => {
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler comentários.' });
    let all = JSON.parse(data);
    const idx = all.findIndex(c => c.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Comentário não encontrado.' });
    const removed = all.splice(idx, 1);
    fs.writeFile(COMMENTS_PATH, JSON.stringify(all, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Erro ao salvar comentário.' });
      res.json(removed[0]);
    });
  });
});

module.exports = router;
