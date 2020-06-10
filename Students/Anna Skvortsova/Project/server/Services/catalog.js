module.exports = {
    add(catalog, item) {
        item.id_product = Date.now() + '';
        catalog.push(item);
        return { newCatalog: catalog, idNewItem: item.id_product };
    }
}