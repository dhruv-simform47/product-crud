

function showProductForm(flag, editid = 0) {
    const pTitle = document.getElementById("pTitle")
    const btnSubmit = document.getElementById("btnSubmit");
    document.getElementById("productForm").reset();

    if (flag === 0) {
        pTitle.innerText = "Add Product Form";
        btnSubmit.onclick=function () { addProduct(); };
        btnSubmit.classList.remove("btn-secondary");
        btnSubmit.classList.add("btn-success");
        btnSubmit.innerText = "Add";
        document.querySelector(".preview").style.display = "none"

    }
    else {
        pTitle.innerText = "Edit Product Form";
        btnSubmit.onclick=function () {  editProduct(editid); };
       
        btnSubmit.classList.remove("btn-success");
        btnSubmit.classList.add("btn-info");
        btnSubmit.innerText = "Update"; const prodForm = document.getElementById("productForm");
        fillEditform(editid);
    }


    togglePage();


    const fileInput = document.getElementById("prodImage");

    fileInput.addEventListener("change", () => {
        previewFile(fileInput);
    });

}


function fillEditform(editid) {
    const prod_array = getProducts();
    let pos = getIndex(editid, prod_array);

    document.getElementById("prodName").value = prod_array[pos].name;
    document.getElementById("prodDesc").value = prod_array[pos].desc;
    document.getElementById("prodPrice").value = prod_array[pos].price;
    document.querySelector(".preview").style.display = "block";
    document.getElementById("imgView").src = prod_array[pos].image;


}
function showProductList(newarray=null) {
    let arr_obj;
    if(newarray == null)
    {
    arr_obj = getProducts();
}
else{
arr_obj=newarray;
}

    let product_el = document.getElementById("prodItems");


    product_el.innerHTML = "";
    arr_obj.forEach(obj => {
        let tr_el = document.createElement("tr");


        tr_el.innerHTML = `
            <td scope="row">${obj.id}</td>
            
        <td> ${obj.name}</td>
        <td>${obj.desc}</td>
        <td> <img src="${obj.image}" alt="" id="imgView" class="object-fit-cover" style="height:80px"> </td>
        <td id="pPrice">${obj.price} $</td>
        <td id="pEdit"><button id="btnEdit" class="btn btn-warning" onclick="showProductForm(1,${obj.id})" >Edit</button></td>
        <td id="pDelete"><button id="btnDelete" class="btn btn-danger" onclick="deleteProduct(${obj.id})">Delete</button></td>
            `;
        tr_el.classList.add("table-light");
        product_el.appendChild(tr_el);
    });
    document.getElementById("productForm").style.display = "block";
    togglePage();


}


function togglePage() {
    const productform=document.getElementById("productForm");
    if(productform.style.display=="none" || productform.style.display=="")
       {
            document.getElementById("btnNewProduct").style.display = "none";
            document.getElementById("productList").style.display = "none";
            document.getElementById("productForm").style.display = "block";

      
      }      else{
          document.getElementById("btnNewProduct").style.display = "block";
            document.getElementById("productForm").style.display = "none";
            document.getElementById("productList").style.display = "block";

    }
}




function previewFile(fileInput) {
    const preview = document.querySelector("#imgView");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // convert image file to base64 string
        preview.src = reader.result;
        console.log(reader.result);

        document.querySelector(".preview").style.display = "block";


    });

    if (file) {
        reader.readAsDataURL(file);
    }
}


const prod_key = "products"
class Product {
    constructor(id, name, desc, image, price) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.price = price;
    }




}
function getProducts() {
    return JSON.parse(localStorage.getItem(prod_key)) || [];

}
function generateId() {
    let p_array = getProducts();
    if (p_array.length == 0) return 1;
    return (Number(p_array[p_array.length - 1].id) + 1);
}
function addProduct() {
    prod_array = getProducts();   //here we have array of products objects
    const id = generateId();
    console.log(id);
    const inp_name = document.getElementById("prodName").value;
    const inp_desc = document.getElementById("prodDesc").value;
    const img_string = document.getElementById("imgView").getAttribute("src");

    const inp_Price = document.getElementById("prodPrice").value;

    if( !inp_name || !inp_desc || !inp_Price || !img_string)
    {
        console.log("no values");
        alert("All fields are Required!");
    }
    else{

    const new_product = new Product(id, inp_name, inp_desc, img_string, inp_Price);
    prod_array.push(new_product);
    //data save back to the storage
    localStorage.setItem(prod_key, JSON.stringify(prod_array));
    console.log(localStorage.getItem(prod_key));
    showProductList();
    }
}


function getIndex(id, parray) {
    let pos = parray.findIndex((prod) => {
        if (prod.id === id) {
            return true;
        }
    });

    console.log(pos);
    if (pos == -1) {
        throw new Error("Item To be Updated is not Stored!");
    }
    return pos;
}
//Future: use of flag to know page is reloaded or not to reduce calling getProducts every time for product_array
function editProduct(id) {
    product_array = getProducts();
    const inp_name = document.getElementById("prodName").value;
    const inp_desc = document.getElementById("prodDesc").value;

    const inp_Price = document.getElementById("prodPrice").value;

    if( !inp_name || !inp_desc || !inp_Price )
    {
        console.log("no values");
        alert("All fields are Required!");
    }
    else{
    let pos = getIndex(id, product_array);
    product_array[pos].name = document.getElementById("prodName").value;
    product_array[pos].desc = document.getElementById("prodDesc").value;
    product_array[pos].price = document.getElementById("prodPrice").value;
    product_array[pos].image = document.getElementById("imgView").getAttribute("src");

    localStorage.setItem(prod_key, JSON.stringify(product_array));
    console.log("updated....");
showProductList();    
}
    



}
function deleteProduct(id) {
     let result=confirm("Are you sure you want to delete?");
     if(result)
     {
    product_array = getProducts();
    let pos = getIndex(id, product_array);
    product_array.splice(pos, 1);
    localStorage.setItem(prod_key, JSON.stringify(product_array));
    console.log("element deleted");
}
   showProductList();
}




const sortSelect=document.getElementById("sortSelect");

const search=document.getElementById("search");


sortSelect.addEventListener("change",function(){
const product_array=getProducts();
const svalue=this.value;
const sorted_array=getSorted(product_array,svalue);
showProductList(sorted_array);
});




function getSorted(product_array,svalue)
{
    let sorted_array;
    switch (svalue)
    {
        case "id-asc":
            sorted_array=product_array.toSorted((a,b)=> a.id - b.id);
            break;

        case "id-desc":
            sorted_array=product_array.toSorted((a,b)=> b.id - a.id);
            break;

        case "name-asc":
            sorted_array=product_array.toSorted((a,b)=> a.name.localeCompare(b.name));
            break;

        case "name-desc":
            sorted_array=product_array.toSorted((a,b)=> b.name.localeCompare(a.name));
            break;

        case "price-asc":
            sorted_array=product_array.toSorted((a,b)=> a.price - b.price);
            break;

        case "price-desc":
            sorted_array=product_array.toSorted((a,b)=> b.price - a.price);
            break;
    }
    return sorted_array;
}

