const express = require('express');
const fs = require('fs');

const server = express();
server.use(express.json());

server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});
server.get('/cart', (req, res) => {
    fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});
server.listen(3000, () => {
    console.log('Server 3000 is running');
    
})