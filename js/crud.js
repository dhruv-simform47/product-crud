import { Product } from "./product.js";
import { getProducts, saveProducts, getIndex, generateId } from "./storage.js";
import { showProductList } from "./ui.js";

function addProduct() {

    let prod_array = getProducts();
    const id = generateId();

    const inp_name = document.getElementById("prodName").value.trim();
    const inp_desc = document.getElementById("prodDesc").value.trim();
    const img_string = document.getElementById("imgView").getAttribute("src");
    const inp_Price = document.getElementById("prodPrice").value.trim();

    if (!inp_name || !inp_desc || !inp_Price || !img_string) {
        alert("All fields are Required!");
        return;
    }

    const new_product = new Product(id, inp_name, inp_desc, img_string, inp_Price);
    prod_array.push(new_product);
    saveProducts(prod_array);
    showProductList();
}

function editProduct(id) {

    let product_array = getProducts();
    let pos = getIndex(id, product_array);

    product_array[pos].name = document.getElementById("prodName").value;
    product_array[pos].desc = document.getElementById("prodDesc").value;
    product_array[pos].price = document.getElementById("prodPrice").value;
    product_array[pos].image = document.getElementById("imgView").getAttribute("src");

    saveProducts(product_array);
    showProductList();
}

function deleteProduct(id) {

    let result = confirm("Are you sure you want to delete?");
    if (result) {
        let product_array = getProducts();
        let pos = getIndex(id, product_array);
        product_array.splice(pos, 1);
        saveProducts(product_array);
    }
    showProductList();
}

export { addProduct, editProduct, deleteProduct };