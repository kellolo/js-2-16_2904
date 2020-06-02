// let a = 'hello';

// console.log(a);

// let comp = require('./some');

// console.log(comp.a * comp.b)

let { a, b } = require('./some');
console.log(a + b);

let fs = require('fs');
let moment = require('moment');

let path = require('path');

fs.readFile('./server/file.txt', 'utf-8', (err, data) => {
    if (!err) {
        let a = 'Прочитано: ' + data;

        console.log(a);

        let arr = [];

        fs.readFile('./server/logs/logs.json', 'utf-8', (err, data) => {
            if (!err) {
                arr = JSON.parse(data);
                let log = {
                    data: data,
                    time: moment().format("DD MM YYYY, h:mm:ss")
                };

                arr.push(log);
                fs.writeFile(path.join(__dirname, 'logs', 'logs.json'), JSON.stringify(arr, null, ' '), err => { 
                    console.log(err)
                })
            }
        })
    } else {
        console.log(err)
    }
})