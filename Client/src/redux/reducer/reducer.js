import { GET_USER, GET_ALL_PRODUCTS, ADD_TO_CART } from "../actions/actions-types";

const initialState = {
  user: {},
  allProducts: [],
  cart: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}
