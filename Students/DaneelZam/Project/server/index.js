let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let server = express();
server.use(express.json());
server.use(bodyParser.json());

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

server.post('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            const basket = JSON.parse(data);
            const goods = Object.assign({}, req.body, {"product_quantity": 1});
            basket.push(goods);
            fs.writeFile('./server/db/basket.json', JSON.stringify(basket), (err) => {
                if (!err) {
                    res.send(basket);
                } else {
                    console.log(err)
                }
            })
        }
    });
});

server.put('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            const basket = JSON.parse(data);
            const goods = req.body;
            let id = goods.id_product;
            let find = this.basket.find(element => +element.id_product === +id);
            find.product_quantity++;
            fs.writeFile('./server/db/basket.json', JSON.stringify(basket), (err) => {
                if (!err) {
                    res.send(basket);
                } else {
                    console.log(err)
                }
            })
        }
    });
});


server.listen(3000, () => {
    console.log('Server is running at port 3000')
});