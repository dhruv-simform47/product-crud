const prod_key = "products";

function getProducts() {
    return JSON.parse(localStorage.getItem(prod_key)) || [];
}

function saveProducts(arr) {
    localStorage.setItem(prod_key, JSON.stringify(arr));
}

function getIndex(id, parray) {
    let pos = parray.findIndex((prod) => prod.id === id);
    if (pos == -1) throw new Error("Item To be Updated is not Stored!");
    return pos;
}

function generateId() {
    let p_array = getProducts();
    if (p_array.length == 0) return 1;
    return Number(p_array[p_array.length - 1].id) + 1;
}

export { getProducts, saveProducts, getIndex, generateId };