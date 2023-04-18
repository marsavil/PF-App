import axios from "axios";
import {
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CLEAR_DETAIL,
  ADD_TO_CART,
  ALL_FILTERS,
} from "./actions-types";
import qs from "query-string"; // importar la biblioteca query-string

// const API_URL = "http://localhost:3001";
const API_URL = "https://pf-app-production.up.railway.app";

export const getUser = (user) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(API_URL + "/user/login/log", user);
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
  const params = {
    brand: payload.brand || null, 
    category: payload.category || null,
    search: payload.search || null,
  };

  // construir la URL de consulta usando query-string
  const query = `${API_URL}/products?${qs.stringify(params)}`;

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
