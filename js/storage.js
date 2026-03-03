import { PRODUCT_KEY } from "./model.js";

export function getProducts() {
    return JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
}

export function generateId() {
    let productArray = getProducts();
    if (productArray.length == 0) return 1;
    return (Number(productArray[productArray.length - 1].id) + 1);
}

export function getIndex(id, parray) {
    let index = parray.findIndex((prod) => {
        if (prod.id === id) {
            return true;
        }
    });

    if (index == -1) {
        throw new Error("Item To be Updated is not Stored!");
    }
    return index;
}