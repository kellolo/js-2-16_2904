module.exports = {
    add(catalog, item) {
        item.id = Date.now() + '';
        catalog.push(item);
        return { newCatalog: catalog, idAddedItem: item.id };
    }
}