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
window.addEventListener('load', setAdminStorage);

function setAdminStorage() {
    const adminCred = {username: "Admin", password: "password"};
    if (localStorage.getItem("admin") === null) {
        localStorage.setItem("admin", JSON.stringify(adminCred));
    }
    if (localStorage.getItem("wishlist") === "[]") {
        const wishListBtn = document.querySelector(".wishBtn");
        wishListBtn.style.color = "black";
    } else {
        const wishListBtn = document.querySelector(".wishBtn");
        wishListBtn.style.color = "red";
    }
}