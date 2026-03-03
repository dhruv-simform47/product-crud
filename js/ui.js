import { Product } from "./model.js";
import { getProducts, generateId, getIndex } from "./storage.js";

export function toggleProductView() {
  const productForm = document.getElementById("productForm");
  if (productForm.style.display == "none" || productForm.style.display == "") {
    document.getElementById("btnNewProduct").style.display = "none";
    document.getElementById("productList").style.display = "none";
    document.getElementById("searchFilter").style.display = "none";
    document.getElementById("productForm").style.display = "block";
    document.getElementById("btnShowProduct").style.display="block";
  } else {
    document.getElementById("productForm").style.display = "none";
    document.getElementById("btnShowProduct").style.display="none";
    document.getElementById("btnNewProduct").style.display = "block";
    document.getElementById("productList").style.display = "block";
    document.getElementById("searchFilter").style.display = "block";
  }
}

export function previewProductImage(fileInput) {
  const preview = document.querySelector("#imgView");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    preview.src = reader.isConfirmed;
    document.querySelector(".preview").style.display = "block";
  });

  if (file) {
    reader.readAsDataURL(file);
  }
}

export function populateEditForm(editid) {
  const products = getProducts();
  let index = getIndex(editid, products);

  document.getElementById("prodName").value = products[index].name;
  document.getElementById("prodDesc").value = products[index].desc;
  document.getElementById("prodPrice").value = products[index].price;
  document.querySelector(".preview").style.display = "block";
  document.getElementById("imgView").src = products[index].image;
}

export function renderProductList(productList = null) {
  let products;
  if (productList == null) {
    products = getProducts();
  } else {
    products = productList;
  }

  let productTableBody = document.getElementById("prodItems");
  productTableBody.innerHTML = "";    

  products.forEach((obj) => {
    let tableRow = document.createElement("tr");  

    tableRow.innerHTML = `
            <td scope="row">${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.desc}</td>
            <td><img src="${obj.image}" class="object-fit-cover" style="height:80px"></td>
            <td>${obj.price} $</td>
               <td id="pEdit"><button id="btnEdit" class="btn btn-warning" onclick="showProductForm(1,${obj.id})" >Edit</button></td>
        <td id="pDelete"><button id="btnDelete" class="btn btn-danger" onclick="deleteProduct(${obj.id})">Delete</button></td>
            `;

    tableRow.classList.add("table-light");
    productTableBody.appendChild(tableRow);
  });

  document.getElementById("productForm").style.display = "block";
  toggleProductView();
}

export function addProduct() {
  let products = getProducts();
  const id = generateId();

  const inp_name = document.getElementById("prodName").value;
  const inp_desc = document.getElementById("prodDesc").value;
  const img_string = document.getElementById("imgView").getAttribute("src");
  const inp_Price = document.getElementById("prodPrice").value;

  if (!inp_name || !inp_desc || !inp_Price || !img_string) {
    alert("All fields are Required!");
  } else {
    const new_product = new Product(
      id,
      inp_name,
      inp_desc,
      img_string,
      inp_Price,
    );
    products.push(new_product);
    localStorage.setItem("products", JSON.stringify(products));
    renderProductList();
  }
}

export function editProduct(id) {
  let products = getProducts();

  const inp_name = document.getElementById("prodName").value;
  const inp_desc = document.getElementById("prodDesc").value;
  const inp_Price = document.getElementById("prodPrice").value;
  const inp_image = document.getElementById("prodImage").files[0];
  if (!inp_name || !inp_desc || !inp_Price) {
    alert("All fields are Required!");
  } else {
    let index = getIndex(id, products);
    products[index].name = inp_name;
    products[index].desc = inp_desc;
    products[index].price = inp_Price;
    if (inp_image) {
      products[index].image = document
        .getElementById("imgView")
        .getAttribute("src");
      console.log(products);
    }

    localStorage.setItem("products", JSON.stringify(products));
    renderProductList();
  }
}

export function deleteProduct(id) {
  let isConfirmed = confirm("Are you sure you want to delete?");
  if (isConfirmed) {
    let products = getProducts();
    let index = getIndex(id, products);
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
  renderProductList();
}

export function sortProducts(products, sortOption) {
  let sortedProducts;
  switch (sortOption) {
    case "id-asc":
      sortedProducts = products.toSorted((a, b) => a.id - b.id);
      break;
    case "id-desc":
      sortedProducts = products.toSorted((a, b) => b.id - a.id);
      break;
    case "name-asc":
      sortedProducts = products.toSorted((a, b) =>
        a.name.localeCompare(b.name),
      );
      break;
    case "name-desc":
      sortedProducts = products.toSorted((a, b) =>
        b.name.localeCompare(a.name),
      );
      break;
    case "price-asc":
      sortedProducts = products.toSorted((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts = products.toSorted((a, b) => b.price - a.price);
      break;
    default:
      sortedProducts = products;
  }
  return sortedProducts;
}
