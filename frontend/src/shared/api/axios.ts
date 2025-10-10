import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const data = err.response?.data;
    const message =
      (data?.message?.message || data?.message || err.message) ?? "Ошибка сервера";
    const normalized = { message, statusCode: err.response?.status ?? 500 };
    return Promise.reject(normalized);
  }
);


export default api;