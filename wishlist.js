// const checkLS = require('./checkSaved');

window.addEventListener('load', getWishlist);

// function to loop products from localStorage and show on site
function getWishlist() {
    const ls = localStorage.getItem("wishlist");
    const savedProducts = JSON.parse(ls);

    const shopCartBtn = document.querySelector(".cart");

    //make wishlist button red if products in it
    if (localStorage.getItem("wishlist") !== null) {
        const wishListBtn = document.querySelector(".wishBtn");
        wishListBtn.style.color = "red";
    }
    // if shoppingcart is empty, make black else green
    if (localStorage.getItem("shoppingCart") == "[]") {
        shopCartBtn.style.color = "black";
    } else {
        shopCartBtn.style.color = "rgb(99, 158, 99)";
    };

    // checkLS.checkLocalStorage();

    savedProducts.forEach(element => {
        const div = document.createElement("div");
        div.setAttribute("id", `${element.id}`);
        div.classList.add("wlDiv")

        const img = document.createElement("img");
        img.setAttribute("src", `${element.img}`);
        img.classList.add("prodImg");

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("contentDiv");

        const h1 = document.createElement("h1");
        h1.innerText = element.name;

        const descP = document.createElement("p");
        descP.innerText = element.desc;

        const span = document.createElement("span");
        span.innerText = `${element.price}:-`;

        const buyBtn = document.createElement("button")
        buyBtn.classList.add("buyBtn");
        buyBtn.innerText = "Add to cart";

        const remove = document.createElement("button");
        remove.innerText = "x";
        remove.classList.add("removeBtn");

        const br = document.createElement("br");

        contentDiv.append(h1, descP, span);
        div.append(img, contentDiv, buyBtn, remove);
        const wishlistPage = document.querySelector(".wlMain");
        wishlistPage.appendChild(div);
    });
    // checkInventory(savedProducts);
    document.querySelector(".wlMain").addEventListener("click", checkShopOrDel);
}

//function to check event and send to specific function
function checkShopOrDel(e) {
    if (e.target.classList == 'removeBtn') {
        removeItem(e);
    }
    if (e.target.classList == 'buyBtn') {
        putInShopcart(e);
    }
};

// function to remove item from wishlist and localStorage
function removeItem(e) {
    const element = e.target.parentElement;
    // console.log(element);
    const ls = localStorage.getItem("wishlist");
    const savedProducts = JSON.parse(ls);

    const index = savedProducts.findIndex(x => x.id == e.target.parentElement.id)
    // console.log(index);

    const newWL = savedProducts.splice(index, 1);
    // console.log(newWL);
    // console.log(savedProducts)
    localStorage.setItem("wishlist", JSON.stringify(savedProducts));
    element.remove();
};

// function to put product in shoppingCart and localStorage
function putInShopcart(e) {
    console.log(e);
    const prodId = e.target.parentElement.id;
    console.log(prodId);

    const lsProd = localStorage.getItem("wishlist");
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