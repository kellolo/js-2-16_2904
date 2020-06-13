const fs = require('fs');
const cart = require('./cart');
const logger = require('./logger');

/**
 * обновили словарь
 * @type {{add: *, change: *, remove: *}}
 */
const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove,
};

/**
 * подключили логгер
 * @param req
 * @param res
 * @param action
 * @param file
 */
const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            const { name, newCart } = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    console.log(name);
                    logger(name, action);
                    res.send('{"result": 1}');
                }
            })
        }
    });
};

module.exports = handler;
