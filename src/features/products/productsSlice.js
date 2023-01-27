import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: {
            all: [],
            filteredProducts: [],
            homes: [],
            cars: [],
            notebookes: [],
            TV: []
        },
        categories: [],
        filteredCategories: [],
        favorites: [],
        favoritesID: [],
        cart: [],
        cartID: []
    },
    reducers: {
        changeCategories: (state, { payload }) => {
            state.categories = payload;
            state.filteredCategories = payload;
        },
        changeFilteredCategories: (state, { payload }) => {
            state.filteredCategories = state.categories
            .filter(c =>
                c.title.toLowerCase().search(payload.toLowerCase()) !== -1 ||
                c.description.toLowerCase().search(payload.toLowerCase()) !== -1
            );
        },
        changeProducts: (state, { payload }) => {
            state.products.all = payload;
            state.products.filteredProducts = payload;
            state.products.homes = payload.filter(product => product.category.title === "Տներ");
            state.products.cars = payload.filter(product => product.category.title === "Ավտոմեքենաներ");
            state.products.notebookes = payload.filter(product => product.category.title === "Նոութբուքեր");
            state.products.TV = payload.filter(product => product.category.title === "Հեռուստացույց");
        },
        changeFilteredProducts: (state, { payload }) => {
            state.products.filteredProducts = state.products.all
                .filter(p =>
                    p.category.title.toLowerCase().search(payload.toLowerCase()) !== -1 ||
                    p.title.toLowerCase().search(payload.toLowerCase()) !== -1 ||
                    p.description.toLowerCase().search(payload.toLowerCase()) !== -1
                );
        },
        changeFavorites: (state) => {
            state.favorites = JSON.parse(localStorage.getItem("favorite"));
        },
        changeFavoritesID: (state) => {
            state.favoritesID = JSON.parse(localStorage.getItem("favoriteID"));
        },
        changeCart: (state) => {
            state.cart = JSON.parse(localStorage.getItem("cart"));
        },
        changeCartID: (state) => {
            state.cartID = JSON.parse(localStorage.getItem("cartID"));
        }
    },
})

export const {
    changeCategories,
    changeProducts,
    changeFavorites,
    changeFavoritesID,
    changeCart,
    changeCartID,
    changeFilteredProducts,
    changeFilteredCategories
} = productsSlice.actions

export const homeProvider = state => state.products.products.homes;
export const carProvider = state => state.products.products.cars;
export const notebookeProvider = state => state.products.products.notebookes;
export const tvProvider = state => state.products.products.TV;
export const favoriteIDProvider = state => state.products.favoritesID;
export const favoritesProvider = state => state.products.favorites;
export const cartIDProvider = state => state.products.cartID;
export const cartProvider = state => state.products.cart;
export const categoriesProvider = state => state.products.categories;
export const productsProvider = state => state.products.products.all;
export const filteredProductsProvider = state => state.products.products.filteredProducts;
export const filteredCategoriesProvider = state => state.products.filteredCategories;


export default productsSlice.reducer