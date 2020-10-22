import {initialWindowMetrics} from 'react-native-safe-area-context';

const cartItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const product = action.payload;
      const notProduct = state.filter((item) => item.id != product.id);
      return [...notProduct, product];
    case 'INCREASE_CART_QTY':
      const item = {...action.payload, qty: action.payload.qty + 1};
      return state.map((cartItems) =>
        cartItems.id == item.id ? item : cartItems,
      );
    case 'DECREASE_CART_QTY':
      if (action.payload.qty > 0) {
        const product = {...action.payload, qty: action.payload.qty - 1};
        return state.map((cartItems) =>
          cartItems.id == product.id ? product : cartItems,
        );
      }
      break;
    case 'REMOVE_FROM_CART':
      return state.filter((cartItems, index) => index !== action.payload);
    default:
      return state;
  }
};

export default cartItems;
