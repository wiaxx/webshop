window.addEventListener('load', getShopCart);

function getShopCart() {
    const ls = localStorage.getItem("shoppingCart");
    const shopCart = JSON.parse(ls);

    const h2 = document.querySelector("h2");
    if (localStorage.getItem("shoppingCart") !== null) {
        h2.style.display = "none";
    }

    shopCart.forEach(element => {
        console.log(element);
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
        // const buyBtn = document.createElement("button")
        // buyBtn.classList.add("buyBtn");
        // buyBtn.innerText = "Add to cart";
        // const wishlistBtn = document.createElement("button");
        // wishlistBtn.setAttribute("id", `${element.id}`);
        // wishlistBtn.classList.add("wlBtn");
        // wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        const remove = document.createElement("button");
        remove.innerText = "x";
        remove.classList.add("removeBtn");
        const br = document.createElement("br");

        contentDiv.append(h1, descP, span);
        div.append(img, contentDiv, remove);
        const cartPage = document.querySelector(".shopping");
        cartPage.appendChild(div);
    })
};
