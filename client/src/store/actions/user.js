import * as types from "../action-types";
import { reqUserInfo } from "@/api/user";

export const getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo(token)
      .then((response) => {
        const { data } = response;
        if (data.status === 0) {
          const userInfo = data.userInfo;
          dispatch(setUserInfo(userInfo));
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserToken = (token) => {
  // const e = {
  //   type: types.USER_SET_USER_TOKEN,
  //   token,
  // };
  // console.log(e);
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
  };
};

export const setUserInfo = (userInfo) => {
  // const res = {
  //   type: types.USER_SET_USER_INFO,
  //   ...userInfo,
  // };
  // console.log(res);
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo,
  };
};

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER,
  };
};
