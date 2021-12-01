window.addEventListener('load', () => {
    const form = document.querySelector("form");
    const adminBtn = document.querySelector(".btnAdm");
    const lsLog = localStorage.getItem("logged");
    const logged = JSON.parse(lsLog);

    if (logged === true) {
        form.style.display = "none";
        createBtn();
        adminBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        // let loggedIn = 60;
        // setTimeout(() => {
        //     localStorage.setItem("logged", false);
        //     adminBtn.innerHTML = '<i class="far fa-user">';
        //     loggedIn * 6000;
        // })
    }
});


document.querySelector(".login").addEventListener('click', logIn);
// document.querySelector(".btnAdm").addEventListener('click', (e) => {
//     e.preventDefault();
//     if (localStorage.getItem("logged") === true) {
//         console.log("falsk");
//         localStorage.setItem("logged", false);
//         adminBtn.innerHTML = '<i class="far fa-user">';
//     }
// });

function logIn(e) {
    e.preventDefault();

    const form = document.querySelector("form");
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const ls = localStorage.getItem("admin");
    const adminCred = JSON.parse(ls);
    const lsLog = localStorage.getItem("logged");
    const logged = JSON.parse(lsLog);
    const adminBtn = document.querySelector(".btnAdm");

    if (username === adminCred.username && password === adminCred.password) {
        form.style.display = "none";
        localStorage.setItem("logged", true);
        createBtn();
        adminBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    }
    // else if (logged === true) {
    //     localStorage.setItem("logged", false)
    else {
        alert("Not authorized");
        localStorage.setItem("logged", false);
    }
}

function createBtn() {
    const btn = document.createElement("button");
    const prodList = document.querySelector(".products")

    btn.classList.add("create");
    btn.textContent = "Create product";
    prodList.appendChild(btn);
    document.querySelector(".create").addEventListener('click', createProd);
}


function createProd() {
    const div = document.querySelector(".products");

    const form = document.createElement("form");
    form.classList.add("prodForm");


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

    const prodName = document.createElement("input");
    prodName.classList.add("prodName");
    const prodDesc = document.createElement("input");
    prodDesc.classList.add("prodDesc");
    // const prodImg = document.createElement("input");
    // prodImg.setAttribute("type", "file");
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
}

// const products = [];


function saveProduct(e) {
    e.preventDefault();
    console.log("hej");

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

    let products;
    if (localStorage.getItem("products") === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products));

    id++;
    localStorage.setItem("id", JSON.stringify(id));

    document.querySelector(".prodForm").reset();
}

async function getProdImg(e) {
    e.preventDefault();
    const response = await fetch('https://api.unsplash.com/photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw')
    response.json()
        .then(res => {
            console.log(res)
            document.querySelector(".imgUrl").value = `${res.urls.small}`
            document.querySelector(".products").style.backgroundImage = `url(${res.urls.small})`;
        });
}