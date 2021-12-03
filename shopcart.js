import checkLocalStorage from './modules/checkSaved.js';

window.addEventListener('load', getShopCart);

let totalSum = 0;

// function to show products in shop cart from localStorage
function getShopCart() {
    const ls = localStorage.getItem("shoppingCart");
    const shopCart = JSON.parse(ls);

    const wishListBtn = document.querySelector(".wishBtn");
    const shopCartBtn = document.querySelector(".cart");
    const h2 = document.querySelector("h2");

    if (localStorage.getItem("shoppingCart") !== null) {
        h2.style.display = "none";
    };

    checkLocalStorage();
    //make wishlist button red if products in it
    // if (localStorage.getItem("wishlist") === "[]") {
    //     wishListBtn.style.color = "black";
    // } else {
    //     wishListBtn.style.color = "red";
    // };
    // // make shoppingcart green if products in it
    // if (localStorage.getItem("shoppingCart") == "[]") {
    //     shopCartBtn.style.color = "black";
    // } else {
    //     shopCartBtn.style.color = "rgb(99, 158, 99)";
    // };

    shopCart.forEach(element => {
        const div = document.createElement("div");
        div.setAttribute("id", `${element.id}`);
        div.classList.add("scDiv")

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

        const remove = document.createElement("button");
        remove.innerText = "x";
        remove.classList.add("removeBtn");

        const br = document.createElement("br");

        contentDiv.append(h1, descP, span);
        div.append(img, contentDiv, remove);
        const cartPage = document.querySelector(".shopping");
        cartPage.appendChild(div);

        totalSum += Number(element.price);
    });

    const orderBtn = document.createElement("button");
    orderBtn.classList.add("placeOrder");
    orderBtn.innerText = "Continue with order";
    document.querySelector(".total").appendChild(orderBtn);

    const totProd = document.querySelector(".totprod");
    totProd.innerText = `Total products: ${shopCart.length}`;

    const totSum = document.querySelector(".sum");
    totSum.innerText = `Total sum: ${totalSum}:-`;

    document.querySelector(".shopping").addEventListener('click', removeItem);
    document.querySelector(".placeOrder").addEventListener('click', placeOrder);
};

// function to remove item from shopCart and change tot items and sum
function removeItem(e) {
    const element = e.target.parentElement;

    const ls = localStorage.getItem("shoppingCart");
    const savedProducts = JSON.parse(ls);

    const index = savedProducts.findIndex(x => x.id == e.target.parentElement.id)

    const shopItem = savedProducts.splice(index, 1);
    // console.log(shopItem);
    // console.log(savedProducts)
    // console.log(shopItem[0].price);

    const totProd = document.querySelector(".totprod");
    totProd.innerText = `Total products: ${savedProducts.length}`;

    totalSum -= Number(shopItem[0].price);
    const totSum = document.querySelector(".sum");
    totSum.innerText = `Total sum: ${totalSum}:-`;

    localStorage.setItem("shoppingCart", JSON.stringify(savedProducts));
    element.remove();
};

function placeOrder() {

};