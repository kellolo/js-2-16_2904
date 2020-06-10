module.exports = {
    add(catalog, goods){
        goods.id_product = Date.now()+'';
        catalog.push(goods);
        return { newCatalog: catalog, idNewGoods: goods.id_product};
    }
}