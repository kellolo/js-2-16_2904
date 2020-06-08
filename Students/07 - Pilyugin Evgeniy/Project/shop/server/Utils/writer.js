let fs = require('fs').promises;

module.exports = async function (path, data) {
    try {
        await fs.writeFile(`./server/db${path}.json`, JSON.stringify(data, null, 2));
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}