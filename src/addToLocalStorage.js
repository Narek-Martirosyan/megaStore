import store from "./app/store";
import { changeCartID, changeFavorites, changeCart, changeFavoritesID } from "./features/products/productsSlice";


export const onStarClick = (product) => {
    let localfav = JSON.parse(localStorage.getItem("favorite"));

    if (localfav === null) {
        localStorage.setItem("favorite", JSON.stringify([product]));
        localStorage.setItem("favoriteID", JSON.stringify([product.id]));
    } else {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        let favoriteID = JSON.parse(localStorage.getItem("favoriteID"));
        if (favoriteID.includes(product.id)) {
            favorite = favorite.filter(prod => prod.id !== product.id);
            favoriteID = favoriteID.filter(id => id !== product.id)
            localStorage.setItem("favorite", JSON.stringify(favorite));
            localStorage.setItem("favoriteID", JSON.stringify(favoriteID));
        } else {
            favorite.push(product);
            favoriteID.push(product.id);
            localStorage.setItem("favorite", JSON.stringify(favorite));
            localStorage.setItem("favoriteID", JSON.stringify(favoriteID));
        }
    }
    store.dispatch(changeFavoritesID());
    store.dispatch(changeFavorites());
}

export const onCartClick = (product) => {
    let localCart = JSON.parse(localStorage.getItem("cart"));

    if (localCart === null) {
        localStorage.setItem("cart", JSON.stringify([product]));
        localStorage.setItem("cartID", JSON.stringify([product.id]));
    } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let cartID = JSON.parse(localStorage.getItem("cartID"));
        if (cartID.includes(product.id)) {
            cart = cart.filter(prod => prod.id !== product.id);
            cartID = cartID.filter(id => id !== product.id)
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("cartID", JSON.stringify(cartID));
        } else {
            cart.push(product);
            cartID.push(product.id);
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("cartID", JSON.stringify(cartID));
        }
    }

    store.dispatch(changeCart());
    store.dispatch(changeCartID());
}