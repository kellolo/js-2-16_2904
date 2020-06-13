const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter);

/**
 * Используем path дабы избежать проблем с относительными путями до файлов. Делаем их абсолютными.
 */
const catalogJSONPath = path.resolve(__dirname, './db/products.json');

app.get('/api/products', (req, res) => {
    fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));
            // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
