let express = require('express');
let fs = require('fs');

let writer = require('./Utils/writer');
let logger = require('./Utils/logger');
let catalogServices = require('./Services/catalog');
let basketServices = require('./Services/basket');

let server = express();
server.use(express.json()); //popozje



server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});

server.get('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});



server.post('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            let { newCatalog, idNewItem } = catalogServices.add(JSON.parse(data), req.body);
            writer('./server/db/catalog.json', newCatalog)
                .then(status => {
                    if (status) {
                        res.json({ id: idNewItem });
                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

server.post('/basket/', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            let { newBasket} = basketServices.add(JSON.parse(data), req.body);
            writer('./server/db/basket.json', newBasket)
                .then(status => {
                    if (status) {
                        res.json({ status: 1 });
                        logger('add', req.body.product_name);

                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

server.put('/basket/:id', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            let { newBasket, name } = basketServices.change(JSON.parse(data), req.params.id, req.body.amount);
            writer('./server/db/basket.json', newBasket)
                .then(status => {
                    if (status) {
                        res.json({ status: 1 });
                        logger('change', name);
                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

server.delete('/basket/:id', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            let { newBasket, name } = basketServices.delete(JSON.parse(data), req.params.id);
            writer('./server/db/basket.json', newBasket)
                .then(status => {
                    if (status) {
                        res.json({ status: 1 });
                        logger('remove', name);
                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running at port 3000')
});