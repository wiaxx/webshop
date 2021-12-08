// function to check if products is in wishlist or shopping cart
function checkLocalStorage() {
    const wishListBtn = document.querySelector(".wishBtn");
    const shopCartBtn = document.querySelector(".cart");

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

export default checkLocalStorage;