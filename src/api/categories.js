import axios from "./index";

export const getCategories = async () => {
    return await axios.get("categories");
}

export const addCategories = async (data) => {
    return await axios.post("categories", data);
}

export const editCategory = async (id, data) => {
    return await axios.post(`categories/${id}`, data);
}

export const deleteCategory = async (id) => {
    return await axios.delete(`categories/${id}`);
}