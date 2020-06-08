let fs = require('fs');
let writer = require('./writer');
let fileUrl = './server/db/logger.json';
let moment = new Date(); //require('moment');
module.exports = (action, itemName) => {
    fs.readFile(fileUrl, 'utf-8', (err, data) => {
        if (!err) {
            let log = JSON.stringify({
                //time: moment().format('DD MM YYYY, h:mm:ss'),
                time: Date.now().format('DD MM YYYY, h:mm:ss'),
                product: itemName,
                action : action
            }, null, ' ');
            console.log(log);
            // let logs = JSON.parse(data);
            // logs.push(log);
            //
            // writer(fileUrl, logs);

        }
    })

};