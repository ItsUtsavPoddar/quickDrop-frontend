import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_API,
});

export default api;
