import { Product } from "./model.js";
import { getProducts, generateId, getIndex } from "./storage.js";

export function togglePage() {
    const productform = document.getElementById("productForm");
    if (productform.style.display == "none" || productform.style.display == "") {
        document.getElementById("btnNewProduct").style.display = "none";
        document.getElementById("productList").style.display = "none";
        document.getElementById("productForm").style.display = "block";
    } else {
        document.getElementById("btnNewProduct").style.display = "block";
        document.getElementById("productForm").style.display = "none";
        document.getElementById("productList").style.display = "block";
    }
}

export function previewFile(fileInput) {
    const preview = document.querySelector("#imgView");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result;
        document.querySelector(".preview").style.display = "block";
    });

    if (file) {
        reader.readAsDataURL(file);
    }
}

export function fillEditform(editid) {
    const prod_array = getProducts();
    let pos = getIndex(editid, prod_array);

    document.getElementById("prodName").value = prod_array[pos].name;
    document.getElementById("prodDesc").value = prod_array[pos].desc;
    document.getElementById("prodPrice").value = prod_array[pos].price;
    document.querySelector(".preview").style.display = "block";
    document.getElementById("imgView").src = prod_array[pos].image;
}

export function showProductList(newarray = null) {
    let arr_obj;
    if (newarray == null) {
        arr_obj = getProducts();
    } else {
        arr_obj = newarray;
    }

    let product_el = document.getElementById("prodItems");
    product_el.innerHTML = "";

    arr_obj.forEach(obj => {
        let tr_el = document.createElement("tr");

        tr_el.innerHTML = `
            <td scope="row">${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.desc}</td>
            <td><img src="${obj.image}" class="object-fit-cover" style="height:80px"></td>
            <td>${obj.price} $</td>
               <td id="pEdit"><button id="btnEdit" class="btn btn-warning" onclick="showProductForm(1,${obj.id})" >Edit</button></td>
        <td id="pDelete"><button id="btnDelete" class="btn btn-danger" onclick="deleteProduct(${obj.id})">Delete</button></td>
            `;
        

        tr_el.classList.add("table-light");
        product_el.appendChild(tr_el);
    });

    document.getElementById("productForm").style.display = "block";
    togglePage();
}

export function addProduct() {
    let prod_array = getProducts();
    const id = generateId();

    const inp_name = document.getElementById("prodName").value;
    const inp_desc = document.getElementById("prodDesc").value;
    const img_string = document.getElementById("imgView").getAttribute("src");
    const inp_Price = document.getElementById("prodPrice").value;

    if (!inp_name || !inp_desc || !inp_Price || !img_string) {
        alert("All fields are Required!");
    } else {
        const new_product = new Product(id, inp_name, inp_desc, img_string, inp_Price);
        prod_array.push(new_product);
        localStorage.setItem("products", JSON.stringify(prod_array));
        showProductList();
    }
}

export function editProduct(id) {
    let product_array = getProducts();

    const inp_name = document.getElementById("prodName").value;
    const inp_desc = document.getElementById("prodDesc").value;
    const inp_Price = document.getElementById("prodPrice").value;
    const inp_image=document.getElementById("prodImage").files[0];
    if (!inp_name || !inp_desc || !inp_Price) {
        alert("All fields are Required!");
    } else {
        let pos = getIndex(id, product_array);
        product_array[pos].name = inp_name;
        product_array[pos].desc = inp_desc;
        product_array[pos].price = inp_Price;
        if(inp_image)
        { 
            product_array[pos].image = document.getElementById("imgView").getAttribute("src");
        }
        

        localStorage.setItem("products", JSON.stringify(product_array));
        showProductList();
    }
}

export function deleteProduct(id) {
    let result = confirm("Are you sure you want to delete?");
    if (result) {
        let product_array = getProducts();
        let pos = getIndex(id, product_array);
        product_array.splice(pos, 1);
        localStorage.setItem("products", JSON.stringify(product_array));
    }
    showProductList();
}

export function getSorted(product_array, svalue) {
    let sorted_array;
    switch (svalue) {
        case "id-asc":
            sorted_array = product_array.toSorted((a, b) => a.id - b.id);
            break;
        case "id-desc":
            sorted_array = product_array.toSorted((a, b) => b.id - a.id);
            break;
        case "name-asc":
            sorted_array = product_array.toSorted((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            sorted_array = product_array.toSorted((a, b) => b.name.localeCompare(a.name));
            break;
        case "price-asc":
            sorted_array = product_array.toSorted((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sorted_array = product_array.toSorted((a, b) => b.price - a.price);
            break;
    }
    return sorted_array;
}