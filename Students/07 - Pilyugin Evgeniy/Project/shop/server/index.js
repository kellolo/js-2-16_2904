const express = require('express');

let reader = require('./Utils/reader');
let writer = require('./Utils/writer');

let serviceCatalog = require('./Services/catalog');
let serviceBasket = require('./Services/basket');
let logger = require('./Services/logger');

let server = express();
server.use(express.json());

const pathsFiles = {
    catalog: '/catalog',
    basket: '/basket'
}

server.get(pathsFiles.catalog, (req, res) => {
    reader(pathsFiles.catalog)
        .then(data => {
            res.send(JSON.stringify(data));
        });
});

server.get(pathsFiles.basket, (req, res) => {
    reader(pathsFiles.basket)
        .then(data => {
            res.send(JSON.stringify(data));
        });
});

server.post(pathsFiles.catalog, (req, res) => {
    reader(pathsFiles.catalog)
        .then(data => JSON.parse(data))
        .then(json => {
            let {newCatalog, idAddedItem} = serviceCatalog.add(json, req.body);
            writer(pathsFiles.catalog, newCatalog)
                .then(status => {
                    status ? res.json({ newItemId: idAddedItem }) : res.sendStatus(500);
                    logger.addLogs('Товар добавлен в каталог', req.body.name);
                });
        });
});

server.post(pathsFiles.basket, (req, res) => {
    reader(pathsFiles.basket)
        .then(data => JSON.parse(data))
        .then(json => {
            let {newBasket} = serviceBasket.add(json, req.body);
            writer(pathsFiles.basket, newBasket)
                .then(status => {
                    status ? res.json({ status: 1 }) : res.sendStatus(500);
                    logger.addLogs('Товар добавлен в корзину', req.body.name);
                });
        });
});

server.delete(pathsFiles.basket, (req, res) => {
    reader(pathsFiles.basket)
        .then(data => JSON.parse(data))
        .then(json => {
            let {newBasket} = serviceBasket.delete(json, req.body);
            writer(pathsFiles.basket, newBasket)
                .then(status => {
                    status ? res.json({ status: 1 }) : res.sendStatus(500);
                    logger.addLogs('Товар удален из корзины', req.body.name);
                });
        });
});

server.listen(3000, () => {
    console.log('Server is running at port 3000')
});