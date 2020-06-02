let express = require('express');
let fs = require('fs');

let server = express();
server.use(express.json()); //popozje

server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});

// server.get('/basket', (req, res) => {
//     fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
//         if (!err) {
//             res.send(data);
//         }
//     })
// });

// server.post();
// server.put();
// server.delete();

server.listen(3000, () => {
    console.log('Server is running at port 3000')
});