window.addEventListener('load', getWishlist);

function getWishlist() {
    const ls = localStorage.getItem("wishlist");
    const savedProducts = JSON.parse(ls);

    //make wishlist button red if products in it
    if (localStorage.getItem("wishlist") !== null) {
        const wishListBtn = document.querySelector(".wishBtn");
        wishListBtn.style.color = "red";
    }

    savedProducts.forEach(element => {
        console.log(element);
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
        // const wishlistBtn = document.createElement("button");
        // wishlistBtn.setAttribute("id", `${element.id}`);
        // wishlistBtn.classList.add("wlBtn");
        // wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
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
    document.querySelector(".wlMain").addEventListener("click", removeItem);
}

function removeItem(e) {
    console.log(e);
    const element = e.target.parentElement;
    console.log(element);
    const ls = localStorage.getItem("wishlist");
    const savedProducts = JSON.parse(ls);

    const index = savedProducts.findIndex(x => x.id == e.target.parentElement.id)
    console.log(index);

    const newWL = savedProducts.splice(index, 1);
    console.log(newWL);
    console.log(savedProducts)
    localStorage.setItem("wishlist", JSON.stringify(savedProducts));
    element.remove();
}