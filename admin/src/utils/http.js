import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "/";

const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000
});

http.defaults.headers.common = {
  "Content-Type": "application/json; charset=UTF-8",
  token: localStorage.getItem('token')
};

http.interceptors.response.use(
  response => {
    const { data = {} } = response;
    if (data.code !== "0000") {
      return Promise.reject(data);
    }
    return data;
  },
  err => {
    let { response = {} } = err;
    return Promise.reject(response);
  }
);

export default {
  post(url, data, config) {
    return http({
      method: "post",
      url,
      data,
      ...config
    });
  },
  get(url, params, config) {
    return http({
      method: "get",
      url,
      params,
      ...config
    });
  }
};
