const fs = require('fs').promises;

module.exports = async function(path) {
    return await fs.readFile(`./server/db${path}.json`, 'utf-8');
}