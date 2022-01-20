import checkLocalStorage from '../modules/checkSaved.js';
window.addEventListener('load', getProducts);

//function to load products from localStorage
function getProducts() {
    const ls = localStorage.getItem("products");
    const savedProducts = JSON.parse(ls);

    checkLocalStorage();

    // loop products and create html and show on site
    savedProducts.forEach(element => {

        const div = document.createElement("div");
        div.setAttribute("id", `div${element.id}`);
        div.classList.add("prodDiv")

        const img = document.createElement("img");
        img.setAttribute("src", `${element.img}`);
        img.classList.add("prodImg");

        const h1 = document.createElement("h1");
        h1.innerText = element.name;

        const descP = document.createElement("p");
        descP.innerText = element.desc;

        const span = document.createElement("span");
        span.innerText = `${element.price}:-`;

        const buyBtn = document.createElement("button")
        buyBtn.classList.add("buyBtn");
        buyBtn.innerText = "Add to cart";

        const wishlistBtn = document.createElement("button");
        wishlistBtn.setAttribute("id", `${element.id}`);
        wishlistBtn.classList.add("wlBtn");
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';

        const br = document.createElement("br");

        div.append(img, h1, descP, span, br, buyBtn, wishlistBtn);
        const productPage = document.querySelector(".productsPage");
        productPage.appendChild(div);
    });
    checkInventory(savedProducts);
    document.querySelector(".productsPage").addEventListener("click", checkWlOrShop);
};

//function to check event and send to specific function
function checkWlOrShop(e) {
    if (e.target.classList == 'far fa-heart') {
        saveToWishlist(e);
    }
    if (e.target.classList == 'buyBtn') {
        putInShopcart(e);
    }
};

// fucntion to save product to wishlist
function saveToWishlist(e) {
    const lsProd = localStorage.getItem("products");
    const products = JSON.parse(lsProd);

    const targetProd = e.target.parentElement.id; //id att leta efter i array
    // console.log("target element id: ", targetProd);

    const prodInd = products.findIndex(x => x.id == targetProd);
    // console.log("index of targeted element: ", prodInd);
    // console.log("LS stored products", products);

    const wlItem = products.slice(prodInd, prodInd + 1);
    const newWLProd = wlItem[0];
    const object = newWLProd;

    const wishItem = {
        id: object.id,
        name: object.name,
        desc: object.desc,
        img: object.img,
        price: object.price,
        inv: object.inv
    }

    // check if products already in wishlist and save to wishlist localStorage
    let wishlist;
    if (localStorage.getItem("wishlist") === null) {
        wishlist = [];
    } else {
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
    }

    wishlist.push(wishItem);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    const wishListItmBtn = e.target.parentElement;
    wishListItmBtn.classList.toggle("heart");
    const wishListBtn = document.querySelector(".wishBtn");
    wishListBtn.style.color = "red";
};

//function to check if product are low in stock
function checkInventory(item) {
    item.forEach(e => {
        if (e.inv <= 5) {
            const lowStock = document.createElement("span");
            lowStock.innerText = "Low in stock";
            lowStock.classList.add("lsTag");
            document.getElementById(`div${e.id}`).appendChild(lowStock);
        };
    });
};

// function to put product in shoppingCart and localStorage
function putInShopcart(e) {
    const prodId = e.target.nextElementSibling.id;

    const lsProd = localStorage.getItem("products");
    const products = JSON.parse(lsProd);

    const prodIndex = products.findIndex(x => x.id == prodId);
    const itemBuy = products.slice(prodIndex, prodIndex + 1);
    const itemHolder = itemBuy[0];
    const object = itemHolder;

    const shopItem = {
        id: object.id,
        name: object.name,
        desc: object.desc,
        img: object.img,
        price: object.price,
        inv: object.inv
    }

    // check if already prodcts in shoppingCart
    let shoppingCart;
    if (localStorage.getItem("shoppingCart") === null) {
        shoppingCart = [];
    } else {
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    shoppingCart.push(shopItem);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
};