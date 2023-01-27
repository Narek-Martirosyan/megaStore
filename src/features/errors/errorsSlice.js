import { createSlice } from '@reduxjs/toolkit';

export const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
        imageError: "",
        priceError: "",
        categoryError: "",
        titleError: "",
        descriptionError: ""
    },
    reducers: {
        changeImageError: (state, { payload }) => {
            state.imageError = payload;
        },
        changePriceError: (state, { payload }) => {
            state.priceError = payload
        },
        changeCategoryError: (state, { payload }) => {
            state.categoryError = payload
        },
        changeTitleError: (state, { payload }) => {
            state.titleError = payload
        },
        changeDescriptionError: (state, { payload }) => {
            state.descriptionError = payload
        }
    },
})

export const {
    changeImageError,
    changePriceError,
    changeCategoryError,
    changeTitleError,
    changeDescriptionError
} = errorsSlice.actions

export const imageErrorProvider = state => state.errors.imageError;
export const priceErrorProvider = state => state.errors.priceError;
export const categoryErrorProvider = state => state.errors.categoryError;
export const titleErrorProvider = state => state.errors.titleError;
export const descriptionErrorProvider = state => state.errors.descriptionError;

export default errorsSlice.reducer;