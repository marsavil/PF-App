import axios from "axios";
import {
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CLEAR_DETAIL,
  ADD_TO_CART,
  ALL_FILTERS,
} from "./actions-types";

const API_URL = "http://localhost:3001";

export const getUser = (user) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(API_URL + "/user/login/log", user);
      return dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error while fetching user:", error);
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(API_URL + "/user", user);
      return dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error while creating user:", error);
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(API_URL + "/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error while fetching all products:", error);
    }
  };
};

export function getProductDetail(id) {
  return async function (dispatch) {
    try {
      let productId = await axios.get(API_URL + `/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productId.data,
      });
    } catch (error) {
      console.error("Error while fetching product detail:", error);
    }
  };
}

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(API_URL + "/cart", product);
      return dispatch({
        type: ADD_TO_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error while adding to cart:", error);
    }
  };
};

export function allFilters(payload) {
  let query = `${API_URL}/products`;

  if (payload.brand !== "") {
    query += `?brand=${payload.brand}`;
    if (payload.category !== "") query += `&category=${payload.category}`;
    if (payload.search !== "") query += `&search=${payload.search}`;
  } else if (payload.category !== "") {
    query += `?category=${payload.category}`;
    if (payload.search !== "") query += `&search=${payload.search}`;
  } else if (payload.search !== "") {
    query += `?search=${payload.search}`;
  }

  return async (dispatch) => {
    try {
      const response = await axios.get(query);
      return dispatch({
        type: ALL_FILTERS,
        payload: {
          response: response.data,
          condition: payload,
        },
      });
    } catch (error) {
      console.error("Error while applying filters:", error);
    }
  };
}
