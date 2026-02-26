import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";
import wishlistReducer from "./WishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  }
});

export default store;
