import axios from "axios";
import { GET_USER, GET_ALL_PRODUCTS, ADD_TO_CART, ALL_FILTERS } from "./actions-types";

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

export function allFilters(payload) {
  if (payload.brand !== "") {
    return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/products/brand?brand=${payload.brand}`);
      return dispatch({
        type: ALL_FILTERS,
        payload: { response: response.data, condition: "brand" },
      });
    };
  } else if (payload.category !== "") {
    return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/products/category?category=${payload.category}`);
      return dispatch({
        type: ALL_FILTERS,
        payload: { response: response.data, condition: "category" },
      });
    };
  } else {
    return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/products`);
      return dispatch({
        type: ALL_FILTERS,
        payload: { response: response.data, condition: "all" },
      });
    };
  }
}
