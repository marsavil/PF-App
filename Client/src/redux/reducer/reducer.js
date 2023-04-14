import { GET_USER, GET_ALL_PRODUCTS, ADD_TO_CART, ALL_FILTERS } from "../actions/actions-types";

const initialState = {
  user: {},
  allProducts: [],
  cart: [],
  filteredProducts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    case ALL_FILTERS:
      if (action.payload.condition === "brand") {
        return { ...state, allProducts: action.payload.response };
      } else if (action.payload.condition === "category") {
        return { ...state, allProducts: action.payload.response };
      } else if (action.payload.condition === "all") {
        return { ...state, allProducts: action.payload.response };
      }
    default:
      return state;
  }
}
