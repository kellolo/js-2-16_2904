let express = require('express');
let fs = require('fs');
let moment = require('moment');

let server = express();
server.use(express.json());

const logger = (text) => {
    text = moment().format('DD-MM-yyyy hh:mm:ss ') + text + '\n\r';
    fs.appendFile('./server/log/log.txt', text, 'utf-8', (err) => {
        if(err) throw err;
    });
}

server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
            logger('load catalog completed (get)');
        } else {
            res.send(`{"result":"${err}"}`);
            logger('error from load catalog (get)');
        }
    });
});

server.get('/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
            logger('load basket completed (get)');
        } else {
            res.send(`{"result":"${err}"}`);
            logger('error from load basket (get)');
        }
    });
});

server.post('/basket', (req, res) => {
    let url = './server/db/basket.json';
    fs.readFile(url, 'utf-8', (err, data) => {
        if (!err) {
            let d = JSON.parse(data);
            let index = d.findIndex(elem => elem.id === req.body.id);
            if (index !== -1) {
                d[index].counter += 1;
            } else {
                d.push(Object.assign({}, req.body, { counter: 1 }));
            }
            fs.writeFile(url, JSON.stringify(d, null, 2), (err) => {
                if (!err) {
                    fs.readFile('./server/db/result.json', 'utf-8', (err, data) => {
                        if (!err) {
                            res.send(data);
                            logger(`write from item id:${req.body.id} in ${url}  completed (add)`);
                        }
                    });
                } else {
                    res.send(`{"result":"${err}"}`);
                    logger(`error write from ${url} (add)`);
                }
            });
        } else {
            res.send(`{"result":"${err}"}`);
            logger(`error read from ${url} (add)`);
        }
    });
});

server.delete('/basket', (req, res) => {
    let url = './server/db/basket.json';
    fs.readFile(url, 'utf-8', (err, data) => {
        if(!err) {
            let d = JSON.parse(data);
            let index = d.findIndex(elem => elem.id === req.body.id);
            if (index !== -1) {
                if(d[index].counter > 1) {
                    d[index].counter -= 1;
                } else {
                    d.splice(index, 1);
                }
                fs.writeFile(url, JSON.stringify(d, null, 2), (err) => {
                    if (!err) {
                        fs.readFile('./server/db/result.json', 'utf-8', (err, data) => {
                            if (!err) {
                                res.send(data);
                                logger(`delete item id:${req.body.id} in ${url} completed (delete)`);
                            }
                        });
                    } else {
                        res.send(`{"result":"${err}"}`);
                        logger(`error write from ${url} (delete)`);
                    }
                });
            }
        } else {
            res.send(`{"result":"${err}"}`);
            logger(`error read from ${url} (delete)`);
        }
    });
});

// server.put();

server.listen(3000, () => {
    console.log('Server is running at port 3000')
});
