import axios from "axios";

const instance = axios.create({
    baseURL: "https://reactback.madison.am/api/v1/"
});

instance.interceptors.response.use(result => {
    return result;
}, error => {
    console.log(error);

    throw error;
});

export default instance