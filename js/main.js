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

document.getElementById("btnCancel").addEventListener("click", () => {
    showProductList();
});


document.getElementById("btnNewProduct").addEventListener("click", () => {
    showProductForm(0);
});

document.getElementById("btnShowProduct").addEventListener("click", () => {
    showProductList();
});

document.addEventListener("DOMContentLoaded", () => {
    showProductList();
});

//this handle the new product button and edit button 

window.showProductForm = function (flag, editid = 0) {
    const PROD_TITLE = document.getElementById("pTitle");
    const BTNSUBMIT = document.getElementById("btnSubmit");
    document.getElementById("productForm").reset();

    if (flag === 0) {
        PROD_TITLE.innerText = "Add Product Form";
        BTNSUBMIT.onclick = function () { addProduct(); };
        BTNSUBMIT.classList.remove("btn-secondary");
        BTNSUBMIT.classList.add("btn-success");
        BTNSUBMIT.innerText = "Add";
        document.querySelector(".preview").style.display = "none";
    } else {
        PROD_TITLE.innerText = "Edit Product Form";
        BTNSUBMIT.onclick = function () { editProduct(editid); };
        BTNSUBMIT.classList.remove("btn-success");
        BTNSUBMIT.classList.add("btn-info");
        BTNSUBMIT.innerText = "Update";
        fillEditform(editid);
    }

    togglePage();

    const fileInput = document.getElementById("prodImage");
    fileInput.addEventListener("change", () => {
        previewFile(fileInput);
    });
};

window.deleteProduct = deleteProduct;

//sorting function

const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
    const PRODUCT_ARRAY = getProducts();
    const svalue = this.value;
    const sorted_array = getSorted(PRODUCT_ARRAY, svalue);
    showProductList(sorted_array);
});

//filter function
function getFilltered(searchId) {
    if (searchId == "") {
        showProductList();
    } else {
        const PRODUCT_ARRAY = getProducts();
        const newarray = PRODUCT_ARRAY.filter(prod => searchId == prod.id);

        if (newarray.length > 0) {
            showProductList(newarray);
        } else {
            window.alert("No data for id:  "+ searchId);
        }
    }
}

const SCHEDULAR = debounce(getFilltered, 1000);

const searchFilter = document.getElementById("searchFilter");

searchFilter.addEventListener("keyup", function (e) {
    SCHEDULAR(e.target.value);
});