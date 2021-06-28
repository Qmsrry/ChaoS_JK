import axios from "axios";
import store from "@/store";
import { Modal } from "antd";
import { getToken } from "@/utils/auth";
import { logout } from "@/store/actions";

//创建一个axios示例
const service = axios.create({
  baseURL: 'http://' + process.env.REACT_APP_BASE_API, // api 的 base_url
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getState().user.token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error); // for debug
    const { status, data } = error.response;
    if (!status)
    {
      return Promise.reject("出错了，请重试");
    }
    if (status === 401) {
      Modal.confirm({
        title: "确定登出?",
        content:
          "您的Token已失效，请重新登录",
        okText: "重新登录",
        cancelText: "取消",
        onOk() {
          let token = store.getState().user.token;
          store.dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
    if (status === 403) {
      Modal.confirm({
        title: "确定登出?",
        content:
          "您的Token已失效，请重新登录",
        okText: "重新登录",
        cancelText: "取消",
        onOk() {
          let token = store.getState().user.token;
          store.dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
    return Promise.reject(data.message);
  }
);

export default service;
