import decode from "jwt-decode";
import axios from "axios";

import { SET_CURRENT_USER } from "./actionTypes";

import instance from "./instance";

// function returns a function that recievs dispatch
// this func will be called in the redux/index.js
export const checkForExpiredToken = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    const currentTime = Date.now() / 1000;

    //decode token and get user information
    const user = decode(token);
    //chek token expiration
    if (user.exp >= currentTime) {
      //setAuthHeader
      setAuthHeader(token);
      //set the user
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
    } else {
      dispatch(logout());
    }
  }
};

const setLocalToken = token => {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
};

const setAuthHeader = token => {
  // we add the condition if token to know if
  // the user is logged or Not, if he is logged out we should delete the headers
  if (token) instance.defaults.headers.Authorization = `jwt ${token}`;
  else delete instance.defaults.headers.Authorization;
}; // cal this after successful login and signup

export const login = userData => async dispatch => {
  try {
    const res = await instance.post("/login/", userData);
    const { token } = res.data;
    setAuthHeader(token);
    setLocalToken(token);
    const user = decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

export const signup = userData => async dispatch => {
  try {
    const res = await instance.post("/signup/", userData);
    const { token } = res.data;
    setAuthHeader(token);
    setLocalToken(token);
    const user = decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

export const logout = () => {
  setAuthHeader(null);
  setLocalToken(null);
  return {
    type: SET_CURRENT_USER,
    payload: null
  };
};
