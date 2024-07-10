// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../components/cart/cartSlice';  // Adjust the import path as necessary

const store = configureStore({
  reducer: {
    cart: cartReducer, // Ensure this matches what you're using in your selector
  },
});

export default store;
