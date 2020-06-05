let fs = require('fs');

module.exports = async function(fileUrl, data) {
    try {
        await fs.writeFile(fileUrl, JSON.stringify(data, null, ' '), err => null);
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
};