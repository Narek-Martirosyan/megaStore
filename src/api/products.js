import axios from "./index";

export const getProducts = async () => {
    return await axios.get("products");
}

export const createProduct = async (data) => {
    return await axios.post("products", data);
}

export const deleteProduct = async (id) => {
    return await axios.delete(`products/${id}`);
}

export const editProducts = async (id, data) => {
    return await axios.post(`products/${id}`, data);
}