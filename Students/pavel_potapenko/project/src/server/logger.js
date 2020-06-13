const moment = require('moment');
const fs = require('fs');
const path = require('path');

/**
 * Используем path дабы избежать проблем с относительными путями до файлов. Делаем их абсолютными.
 */
const statsJSON = path.resolve(__dirname, './db/stats.json');

const logger = (name, action) => {
  fs.readFile(statsJSON, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const stat = JSON.parse(data);
      stat.push({
        time: moment().format('DD MMM YYYY, h:mm:ss a'),
        prod_name: name,
        action: action,
      });
      fs.writeFile(statsJSON, JSON.stringify(stat, null, 4), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  })
};

module.exports = logger;
