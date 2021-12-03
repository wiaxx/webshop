/*
async function loadImg() {
    //let response = await fetch("https://api.unsplash.com/collections/FEhwX6_vudM/photos?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw")
    let response = await fetch('https://api.unsplash.com/photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw')
    console.log(response);
    response.json()
    .then( res => {
        console.log(res);
        // let productsHolder = document.querySelector(".products");
        // let img = document.createElement("img");
        // img.setAttribute("src", `url('${res.urls.small}')`)
        // productsHolder.appendChild(img);
        document.querySelector(".products").style.backgroundImage = `url(${res.urls.small})`;
    });
};

loadImg();
*/
// set admin credentials in localStorage when page is loaded
window.addEventListener('load', setAdminStorage);

function setAdminStorage() {
    const adminCred = { username: "Admin", password: "password" };
    const wishListBtn = document.querySelector(".wishBtn");
    const shopCartBtn = document.querySelector(".cart");

    if (localStorage.getItem("admin") === null) {
        localStorage.setItem("admin", JSON.stringify(adminCred));
    }
    // if wishlist is empty, make the heart black else red
    if (localStorage.getItem("wishlist") === "[]") {
        wishListBtn.style.color = "black";
    } else {
        wishListBtn.style.color = "red";
    }
    // if shoppingcart is empty, make black else green
    if (localStorage.getItem("shoppingCart") == "[]") {
        shopCartBtn.style.color = "black";
    } else {
        shopCartBtn.style.color = "rgb(99, 158, 99)";
    };
};