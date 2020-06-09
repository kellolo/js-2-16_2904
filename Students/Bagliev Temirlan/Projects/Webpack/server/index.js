let fs = require('fs');
let express = require('express');
let server = express();
server.use(express.json());

let catalogDB = './server/db/catalog.json'
let cartDB = './server/db/cart.json'

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }else{
            console.log('Error read file')
        }
    })
})

server.get('/cart', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }else{
            console.log('Error read file')
        }
    })
})

server.post('/cart', (req, res)=>{
     fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            let arr = cart.getCartWithObj(data, req.body);
            
            cart.changeSum(arr);
            cart.changeCount(arr);
            
            writeTo(JSON.stringify(arr, null, ' '), cartDB, res);
        } else {
            console.log('Error read file')
        }
    })
})

server.put('/cart', (req, res)=>{
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {
            let arr = cart.getModifiedCart(data, req.body);

            cart.changeSum(arr);
            cart.changeCount(arr);

            writeTo(JSON.stringify(arr, null, ' '), cartDB, res)
        } else {
            console.log('Error read file')
        }
    })
})

server.delete('/cart', (req, res)=>{
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if (!err) {   
            let arr = cart.getCartWithoutObj(data, req.body);

            cart.changeSum(arr);
            cart.changeCount(arr);

            writeTo(JSON.stringify(arr, null, ' '), cartDB, res)
        } else {
            console.log('Error read file')
        }
    })
})


server.listen(8080, () => { console.log('server listen @ 8080...') })

function writeTo (arr, file, res) {
    fs.writeFile(file, arr, (err) => {
        if (!err) {
            res.send ('{"result": 1}')
        } else {
            res.sendStatus (500, '{"result": 0}')
        }
    })
}

let cart = {
    getCartWithObj(data, obj){
        let arr = JSON.parse(data);
        arr.contents.push(obj);
        return arr
    },
    getModifiedCart(data, obj){
        let arr = JSON.parse(data);
        let product = arr.contents.find(product => product.id_product === obj.id_product);
        product.quantity = obj.quantity;
        return arr
    },
    getCartWithoutObj(data, obj){
        let arr = JSON.parse(data);
        let product = arr.contents.find(product => product.id_product === obj.id_product);
        arr.contents.splice(arr.contents.indexOf(product), 1); 
        return arr 
    },
    changeSum(arr){
        arr.amount = arr.contents.reduce((sum, item)=> sum += +item.price * +item.quantity, 0)
    },
    changeCount(arr){
        arr.countGoods = arr.contents.reduce((count, item)=> count +=  +item.quantity, 0)
    },
}
