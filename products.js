window.addEventListener('load', getProducts);

// localStorage.setItem("wishlist", true)

//function to load products from localStorage
function getProducts() {
    const ls = localStorage.getItem("products");
    const savedProducts = JSON.parse(ls);

    //make wishlist button red if products in it
    if (localStorage.getItem("wishlist") === "[]") {
        const wishListBtn = document.querySelector(".wishBtn");
        wishListBtn.style.color = "black";
    } else {
        const wishListBtn = document.querySelector(".wishBtn");
        wishListBtn.style.color = "red";
    }

    savedProducts.forEach(element => {
        // console.log(element);
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
}

function checkWlOrShop(e) {
    if (e.target.classList == 'far fa-heart') {
        saveToWishlist(e);
    }
    if (e.target.classList == 'buyBtn') {
        putInShopcart(e);
    }
}


// let test = [];

function saveToWishlist(e) {
    console.log(e.target)
    const lsProd = localStorage.getItem("products");
    const products = JSON.parse(lsProd);

    console.log(e.target.parentElement);
    const targetProd = e.target.parentElement.id; //id att leta efter i array
    console.log("target element id: ", targetProd);

    const prodInd = products.findIndex( x => x.id == targetProd);
    console.log("index of targeted element: ", prodInd);
    console.log("LS stored products", products);
    
    const wlItem = products.slice(prodInd, prodInd+1);
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
    console.log(wishItem);


    let test;
    if (localStorage.getItem("wishlist") === null) {
        test = [];
    } else {
        test = JSON.parse(localStorage.getItem("wishlist"));
    }

    test.push(wishItem);
    console.log(test);
    localStorage.setItem("wishlist", JSON.stringify(test));

    const wishListItmBtn = e.target.parentElement;
    wishListItmBtn.classList.toggle("heart");
    const wishListBtn = document.querySelector(".wishBtn");
    wishListBtn.style.color = "red";

    // saveToLocalStorage(wishItem);
    // let wishList;
    // if (localStorage.getItem("wishlist" === null)){
    //     wishList = [];
    // } else {
    //     wishList = JSON.parse(localStorage.getItem("wishlist"));
    // }
    // wishList.push("test");
    // localStorage.setItem('wishlist', JSON.stringify(wishList));
}

//function to check if product are low in stock
function checkInventory(item) {
    item.forEach( e => {
        if(e.inv <= 5){
            const lowStock = document.createElement("span");
            lowStock.innerText = "Low in stock";
            lowStock.classList.add("lsTag");
            document.getElementById(`div${e.id}`).appendChild(lowStock);
        }
    })
}


function putInShopcart(e) {
    console.log(e.target);
    console.log(e);
    console.log(e.target.nextElementSibling.id);

    const index = e.target.nextElementSibling.id;

    const lsProd = localStorage.getItem("products");
    const products = JSON.parse(lsProd);

    const prodInd = products.findIndex( x => x.id == index);
    const itemBuy = products.slice(prodInd, prodInd+1);
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
    console.log(shopItem);

    let shoppingCart;
    if (localStorage.getItem("shoppingCart") === null){
        shoppingCart = [];
    } else {
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    shoppingCart.push(shopItem);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

}