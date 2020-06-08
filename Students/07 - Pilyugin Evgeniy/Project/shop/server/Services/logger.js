const moment = require('moment');
const fs = require('fs').promises;

module.exports = {
    addLogs(text, name) {
        let url = `./server/Logs/logs.json`;
        let log = {};

        log.time = moment().format('DD MM YYYY, h:mm:ss');
        log.text = text;
        log.itemName = name;

        fs.readFile(url, 'utf-8')
            .then(data => JSON.parse(data))
            .then(json => {
                json.push(log);
                fs.writeFile(url, JSON.stringify(json, null, 2), 'utf-8');
            });
    }
}