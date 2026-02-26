# product-crud

Technology Used:
HTML
CSS/BOOTSTRAP
JS

Features:
Product Management system where product contains following attributes.
ProductId
ProductName
Image
Price
Description


This application allow user to create new product,
update existing product and user able to filter product by product id and able to sort it by productId, Product Name and Price. 
localStorage is used to storing product.


const searchInput = document.getElementById("search");

const debouncedSearch = debounce(function () {
    filterById(searchInput.value);
}, 500);

searchInput.addEventListener("input", debouncedSearch);



function renderFilteredProducts(arr_obj) {

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
            <td><button class="btn btn-warning" onclick="showProductForm(1,${obj.id})">Edit</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${obj.id})">Delete</button></td>
        `;

        product_el.appendChild(tr_el);
    });
}



function filterById(searchValue) {

    let products = getProducts();

    if (!searchValue) {
        showProductList();
        return;
    }

    let filtered = products.filter(prod =>
        prod.id.toString().includes(searchValue)
    );

    renderFilteredProducts(filtered);
}



function debounce(callback, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}