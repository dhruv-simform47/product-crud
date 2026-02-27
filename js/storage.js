import { prod_key } from "./model.js";

export function getProducts() {
    return JSON.parse(localStorage.getItem(prod_key)) || [];
}

export function generateId() {
    let p_array = getProducts();
    if (p_array.length == 0) return 1;
    return (Number(p_array[p_array.length - 1].id) + 1);
}

export function getIndex(id, parray) {
    let pos = parray.findIndex((prod) => {
        if (prod.id === id) {
            return true;
        }
    });

    if (pos == -1) {
        throw new Error("Item To be Updated is not Stored!");
    }
    return pos;
}