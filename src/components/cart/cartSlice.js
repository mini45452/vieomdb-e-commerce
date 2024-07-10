import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload);
      console.log(action);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ id: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    decreaseQuantity: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload);
      if (state.items[existingIndex].quantity > 1) {
        state.items[existingIndex].quantity -= 1;
      } else {
        state.items.splice(existingIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

// Export each action
export const { addItem, removeItem, decreaseQuantity, clearCart } = cartSlice.actions;

// Export the reducer as default
export default cartSlice.reducer;
