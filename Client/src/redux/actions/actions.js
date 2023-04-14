import axios from "axios";
import {
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CLEAR_DETAIL,
  ADD_TO_CART,
  ALL_FILTERS,
} from "./actions-types";

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

export function getProductDetail(id) {
  return async function (dispatch) {
    let productId = await axios.get(`http://localhost:3001/products/${id}`);

    return dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: productId.data,
    });
  };
}

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

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
  const queryParams = [];
  if (payload.brand !== "") {
    queryParams.push(`brand=${payload.brand}`);
  }
  if (payload.category !== "") {
    queryParams.push(`category=${payload.category}`);
  }
  const queryString = queryParams.join("&");

  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/products?${queryString}`);
    return dispatch({
      type: ALL_FILTERS,
      payload: {
        response: response.data,
        condition: { brand: payload.brand, category: payload.category },
      },
    });
  };
}
