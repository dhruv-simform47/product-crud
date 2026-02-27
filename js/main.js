import {
    showProductList,
    togglePage,
    previewFile,
    fillEditform,
    addProduct,
    editProduct,
    deleteProduct,
    getSorted
} from "./ui.js";

import { getProducts } from "./storage.js";
import { debounce } from "./utils.js";


document.getElementById("btnCancel").addEventListener("click",()=> {
    showProductList();
});


document.getElementById("btnNewProduct").addEventListener("click",()=> {
    showProductForm(0);
});



document.getElementById("btnShowProduct").addEventListener("click",()=> {
    showProductList();
});

document.addEventListener("DOMContentLoaded", () => {
    showProductList();
});

window.showProductForm = function (flag, editid = 0) {
    const pTitle = document.getElementById("pTitle");
    const btnSubmit = document.getElementById("btnSubmit");
    document.getElementById("productForm").reset();

    if (flag === 0) {
        pTitle.innerText = "Add Product Form";
        btnSubmit.onclick = function () { addProduct(); };
        btnSubmit.classList.remove("btn-secondary");
        btnSubmit.classList.add("btn-success");
        btnSubmit.innerText = "Add";
        document.querySelector(".preview").style.display = "none";
    } else {
        pTitle.innerText = "Edit Product Form";
        btnSubmit.onclick = function () { editProduct(editid); };
        btnSubmit.classList.remove("btn-success");
        btnSubmit.classList.add("btn-info");
        btnSubmit.innerText = "Update";
        fillEditform(editid);
    }

    togglePage();

    const fileInput = document.getElementById("prodImage");
    fileInput.addEventListener("change", () => {
        previewFile(fileInput);
    });
};

window.deleteProduct = deleteProduct;

const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
    const product_array = getProducts();
    const svalue = this.value;
    const sorted_array = getSorted(product_array, svalue);
    showProductList(sorted_array);
});

function getFilltered(searchId) {
    if (searchId == "") {
        showProductList();
    } else {
        const prod_array = getProducts();
        const newarray = prod_array.filter(prod => searchId == prod.id);
        showProductList(newarray);
    }
}

const schedular = debounce(getFilltered, 1000);

const searchFilter = document.getElementById("searchFilter");

searchFilter.addEventListener("keyup", function (e) {
    schedular(e.target.value);
});