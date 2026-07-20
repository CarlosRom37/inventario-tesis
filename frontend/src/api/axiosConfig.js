import axios from "axios";

const api = axios.create({
    baseURL: "https://inventario-tesis.onrender.com/api"
});

export default api;