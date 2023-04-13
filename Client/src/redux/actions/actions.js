import axios from "axios";
import { GET_USER, GET_ALL_PRODUCTS, ADD_TO_CART } from "./actions-types";

export function getUser() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/auth/me")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: GET_USER, payload: json });
      });
  };
}

export function getAllProducts() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/products")
      .then((res) => res.data)
      .then((json) => {
        dispatch({ type: GET_ALL_PRODUCTS, payload: json });
      });
  };
}

export function addToCart(product) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/cart", product)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: ADD_TO_CART, payload: json });
      });
  };
}
