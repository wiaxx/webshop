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
import checkLocalStorage from './modules/checkSaved.js';

// set admin credentials in localStorage when page is loaded
window.addEventListener('load', setAdminStorage);

function setAdminStorage() {
    const adminCred = { username: "Admin", password: "password" };

    if (localStorage.getItem("admin") === null) {
        localStorage.setItem("admin", JSON.stringify(adminCred));
    }
    checkLocalStorage();
};

// Change from default prefered color scheme to the other
document.querySelector(".darklgh").addEventListener("click", () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches === true) {
        document.body.classList.toggle("light-theme");
    } else {
        document.body.classList.toggle("dark-theme");
    };
});