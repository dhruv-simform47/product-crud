import {
  renderProductList,
  toggleProductView,
  previewProductImage,
  populateEditForm,
  addProduct,
  editProduct,
  deleteProduct,
  sortProducts,
} from "./ui.js";

import { getProducts } from "./storage.js";
import { debounce } from "./utils.js";

document.getElementById("btnCancel").addEventListener("click", () => {
  renderProductList();
});

document.getElementById("btnNewProduct").addEventListener("click", () => {
  showProductForm(0);
});

document.getElementById("btnShowProduct").addEventListener("click", () => {
  renderProductList();
});

document.addEventListener("DOMContentLoaded", () => {
  renderProductList();
});

//this handle the new product button and edit button

window.showProductForm = function (flag, editid = 0) {
  const productTitle = document.getElementById("pTitle");
  const btnSubmit = document.getElementById("btnSubmit");
  document.getElementById("productForm").reset();

  if (flag === 0) {
    productTitle.innerText = "Add Product Form";
    btnSubmit.onclick = function () {
      addProduct();
    };
    btnSubmit.classList.remove("btn-secondary");
    btnSubmit.classList.add("btn-success");
    btnSubmit.innerText = "Add";
    document.querySelector(".preview").style.display = "none";
  } else {
    productTitle.innerText = "Edit Product Form";
    btnSubmit.onclick = function () {
      editProduct(editid);
    };
    btnSubmit.classList.remove("btn-success");
    btnSubmit.classList.add("btn-info");
    btnSubmit.innerText = "Update";
    populateEditForm(editid);
  }

  toggleProductView();

  const fileInput = document.getElementById("prodImage");
  fileInput.addEventListener("change", () => {
    previewProductImage(fileInput);
  });
};

window.deleteProduct = deleteProduct;

//sorting function

const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
  const products = getProducts();
  const sortOption = this.value;
  const sortedProducts = sortProducts(products, sortOption);
  renderProductList(sortedProducts);
});

//filter function
function getFilltered(searchId) {
  if (searchId == "") {
    renderProductList();
  } else {
    const products = getProducts();
    const productList = products.filter((prod) => searchId == prod.id);

    if (productList.length > 0) {
      renderProductList(productList);
    } else {
      window.alert("No data for id:  " + searchId);
    }
  }
}

const schedular = debounce(getFilltered, 1000);

const searchFilter = document.getElementById("searchFilter");

searchFilter.addEventListener("keyup", function (e) {
  schedular(e.target.value);
});
