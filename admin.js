//check if already logged in as admin when page is loaded
window.addEventListener('load', () => {
    const lsLog = localStorage.getItem("logged");
    const logged = JSON.parse(lsLog);

    if (logged === true) {
        form.style.display = "none";
        createBtn();
        adminBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    }
});

// global variables used in different functions
const form = document.querySelector("form");
const adminBtn = document.querySelector(".btnAdm");
const prodBG = document.querySelector(".products");

document.querySelector(".login").addEventListener('click', logIn);
document.querySelector(".btnAdm").addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList == "fas fa-sign-out-alt") {
        localStorage.setItem("logged", false);

        const btn = document.querySelector(".create");
        adminBtn.innerHTML = '<i class="far fa-user">';
        form.style.display = "flex";
        btn.style.display = "none";
    };
});

// function to check if input value matches stored admin creds
function logIn(e) {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const ls = localStorage.getItem("admin");
    const adminCred = JSON.parse(ls);

    // check if input username and password matches stored admin cred
    if (username === adminCred.username && password === adminCred.password) {
        form.style.display = "none";
        localStorage.setItem("logged", true);
        createBtn();
        adminBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    } else {
        alert("Not authorized or wrong username or password");
    };
};

// function create button for create product form
function createBtn() {
    const btn = document.createElement("button");
    const btnHolder = document.querySelector(".btnHolder")

    btn.classList.add("create");
    btn.textContent = "Create product";
    btnHolder.append(btn);
    document.querySelector(".create").addEventListener('click', createProd);
};

// function to create form for product information
function createProd() {
    const div = document.querySelector(".products");

    // create form for input fields
    const form = document.createElement("form");
    form.classList.add("prodForm");

    // create labels for input fields
    const labelName = document.createElement("label");
    labelName.setAttribute("for", "prodName");
    labelName.textContent = "Product Name";
    const labelUrl = document.createElement("label");
    labelUrl.setAttribute("for", "imgUrl");
    labelUrl.textContent = "Image URL";
    const labelDesc = document.createElement("label");
    labelDesc.setAttribute("for", "prodDesc");
    labelDesc.textContent = "Product Description";
    const labelPrice = document.createElement("label");
    labelPrice.setAttribute("for", "prodDesc");
    labelPrice.textContent = "Sales price";
    const labelInv = document.createElement("label");
    labelInv.setAttribute("for", "prodDesc");
    labelInv.textContent = "Inventory";

    // create all input fields
    const prodName = document.createElement("input");
    prodName.classList.add("prodName");
    const prodDesc = document.createElement("input");
    prodDesc.classList.add("prodDesc");
    const prodImg = document.createElement("button");
    prodImg.classList.add("getImg");
    prodImg.textContent = "Get product image";
    const imgUrl = document.createElement("input");
    imgUrl.classList.add("imgUrl");
    const prodPrice = document.createElement("input");
    prodPrice.classList.add("prodPrice");
    prodPrice.setAttribute("type", "number");
    const prodInv = document.createElement("input");
    prodInv.classList.add("prodInv");
    const prodBtn = document.createElement("button");
    prodBtn.classList.add("prodBtn");
    prodBtn.textContent = "OK";

    form.append(prodImg, labelUrl, imgUrl, labelName, prodName, labelDesc, prodDesc, labelPrice, prodPrice, labelInv, prodInv, prodBtn);
    div.appendChild(form);

    document.querySelector(".prodBtn").addEventListener('click', saveProduct);
    document.querySelector(".getImg").addEventListener('click', getProdImg);
};

// function to save created product to localStorage
function saveProduct(e) {
    e.preventDefault();

    // check if stored ID to prevent duplicates when input later
    let id;
    if (localStorage.getItem("id") === null) {
        id = 0;
    } else {
        id = JSON.parse(localStorage.getItem("id"));
    }

    const name = document.querySelector(".prodName").value;
    const desc = document.querySelector(".prodDesc").value;
    const img = document.querySelector(".imgUrl").value;
    const price = document.querySelector(".prodPrice").value;
    const invent = document.querySelector(".prodInv").value

    const product = {
        id: id,
        name: name,
        desc: desc,
        img: img,
        price: price,
        inv: invent
    }

    // check if alreade stored products
    let products;
    if (localStorage.getItem("products") === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products));

    // save id to localStorage
    id++;
    localStorage.setItem("id", JSON.stringify(id));

    prodBG.style.backgroundImage = "none";

    // reset input fields in form
    document.querySelector(".prodForm").reset();
};

// function to fetch product image from unsplash
async function getProdImg(e) {
    e.preventDefault();
    const response = await fetch('https://api.unsplash.com/photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw&orientation=portrait')
    response.json()
        .then(res => {
            document.querySelector(".imgUrl").value = `${res.urls.small}`
            prodBG.style.backgroundImage = `url(${res.urls.small})`;
        });
};