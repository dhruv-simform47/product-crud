import { getProducts } from "./storage.js";
import { addProduct, editProduct, deleteProduct } from "./crud.js";

let currentSort = "";

function showProductForm(flag, editid = 0) {

    const pTitle = document.getElementById("pTitle");
    const btnSubmit = document.getElementById("btnSubmit");
    document.getElementById("productForm").reset();

    if (flag === 0) {
        pTitle.innerText = "Add Product Form";
        btnSubmit.onclick = function () { addProduct(); };
        btnSubmit.className = "mt-5 mb-4 px-5 btn btn-success border border-dotted";
        btnSubmit.innerText = "Add";
        document.querySelector(".preview").style.display = "none";
    }
    else {
        pTitle.innerText = "Edit Product Form";
        btnSubmit.onclick = function () { editProduct(editid); };
        btnSubmit.className = "mt-5 mb-4 px-5 btn btn-info border border-dotted";
        btnSubmit.innerText = "Update";
        fillEditform(editid);
    }

    togglePage();

    const fileInput = document.getElementById("prodImage");
    fileInput.onchange = function () { previewFile(fileInput); };
}

function fillEditform(editid) {

    const prod_array = getProducts();
    let pos = prod_array.findIndex(p => p.id === editid);

    document.getElementById("prodName").value = prod_array[pos].name;
    document.getElementById("prodDesc").value = prod_array[pos].desc;
    document.getElementById("prodPrice").value = prod_array[pos].price;
    document.querySelector(".preview").style.display = "block";
    document.getElementById("imgView").src = prod_array[pos].image;
}

function showProductList() {

    let arr_obj = getProducts();

    if (currentSort) {
        const [field, order] = currentSort.split("-");
        arr_obj.sort((a, b) => {
            if (field === "name")
                return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            if (field === "price")
                return order === "asc" ? a.price - b.price : b.price - a.price;
            return order === "asc" ? a.id - b.id : b.id - a.id;
        });
    }

    let product_el = document.getElementById("prodItems");
    product_el.innerHTML = "";

    arr_obj.forEach(obj => {

        let tr_el = document.createElement("tr");

        tr_el.innerHTML = `
            <td>${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.desc}</td>
            <td><img src="${obj.image}" style="height:80px"></td>
            <td>${obj.price}</td>
            <td><button class="btn btn-warning editBtn" data-id="${obj.id}">Edit</button></td>
            <td><button class="btn btn-danger deleteBtn" data-id="${obj.id}">Delete</button></td>
        `;

        product_el.appendChild(tr_el);
    });

    togglePage();
}

function togglePage() {

    const productform = document.getElementById("productForm");

    if (productform.style.display == "none" || productform.style.display == "") {
        document.getElementById("btnNewProduct").style.display = "none";
        document.getElementById("productList").style.display = "none";
        document.getElementById("productForm").style.display = "block";
    }
    else {
        document.getElementById("btnNewProduct").style.display = "block";
        document.getElementById("productForm").style.display = "none";
        document.getElementById("productList").style.display = "block";
    }
}

function previewFile(fileInput) {

    const preview = document.querySelector("#imgView");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        preview.src = reader.result;
        document.querySelector(".preview").style.display = "block";
    };

    if (file) reader.readAsDataURL(file);
}

function setSort(value) {
    currentSort = value;
    showProductList();
}

export { showProductForm, showProductList, deleteProduct, setSort };