import { createSlice } from "@reduxjs/toolkit";

// User specific wishlist fetch karva mate
const getWishlistFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user._id) {
    return JSON.parse(localStorage.getItem(`wishlist_${user._id}`)) || [];
  }
  return [];
};

const Wishlistslice = createSlice({
  name: "wishlist",
  initialState: getWishlistFromStorage(),
  reducers: {
    addToWishlist(state, action) {
      const itemExists = state.find(i => i._id === action.payload._id);
      if (!itemExists) {
        state.push(action.payload);
      }
      
      const user = JSON.parse(localStorage.getItem("user"));
      if(user) {
        localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(state));
      }
    },

    removeFromWishlist(state, action) {
      const newState = state.filter(i => i._id !== action.payload);
      
      const user = JSON.parse(localStorage.getItem("user"));
      if(user) {
        localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(newState));
      }
      return newState;
    },

    clearWishlist(state) {
      return [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = Wishlistslice.actions;
export default Wishlistslice.reducer;