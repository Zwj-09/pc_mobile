import axios from "axios";

let instance = axios.create({
  baseURL: "https://video.hifotobooth.com",
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

//响应拦截器的添加
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default instance;
