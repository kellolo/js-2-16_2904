const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');

const server = express();
server.use(express.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });


server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {            
            res.send(data);
        }
    });
});

server.get('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {            
            res.send(data);
        }
    });
});

server.post('/addBasket', urlencodedParser, (req, res) => {
    fs.readFile('./server/db/addBasket.json', 'utf-8', (err, data) => {
        if (!err) {            
            res.send(data);
        } else {
            console.log('error in reading addBasket.json');
        }
    });
});

server.post('/deleteFromBasket', urlencodedParser, (req, res) => {
    fs.readFile('./server/db/deleteFromBasket.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log('error in reading deleteFromBasket.json');
        }
    });
});

// server.put();
// server.delete();

server.listen(3000, () => {
    console.log('Server is running at port 3000');
});