import axios from "axios";

axios.defaults.baseURL = "https://localhost:5001";
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return null;
  }
);

const requestPersonalizado = {
  get: (url) => {
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  post: (url, body) => {
    return axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  put: (url, body) => {
    return axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  delete: (url) => {
    return axios.delete(url);
  },
};

export default requestPersonalizado;
