const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();
const path = require('path');

/**
 * Используем path дабы избежать проблем с относительными путями до файлов. Делаем их абсолютными.
 */
const cartJSONPath = path.resolve(__dirname, './db/userCart.json');

router.get('/', (req, res) => {
    fs.readFile(cartJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    handler(req, res, 'add', cartJSONPath);
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', cartJSONPath);
});
/**
 * Добавили роут для удаления товара
 */
router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', cartJSONPath);
});
module.exports = router;
