// import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("cart")) || [];

// const Cartslice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     add(state, action) {
//       const item = state.find(i => i._id === action.payload._id);

//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }

//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     remove(state, action) {
//       const index = state.findIndex(i => i._id === action.payload);
//       if (index !== -1) state.splice(index, 1);

//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     incrementQty(state, action) {
//       const item = state.find(i => i._id === action.payload);
//       if (item) item.quantity += 1;

//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     decrementQty(state, action) {
//       const item = state.find(i => i._id === action.payload);
//       if (item && item.quantity > 1) item.quantity -= 1;

//       localStorage.setItem("cart", JSON.stringify(state));
//     }
//   }
// });

// export const { add, remove, incrementQty, decrementQty } = Cartslice.actions;
// export default Cartslice.reducer;
import { createSlice } from "@reduxjs/toolkit";

// User ID mujab data fetch karva mate function
const getCartFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user._id) {
    // Jo user login hoy to 'cart_USERID' vali key check karo
    return JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
  }
  return []; // Jo login na hoy to empty cart
};

const Cartslice = createSlice({
  name: "cart",
  initialState: getCartFromStorage(), // Dynamic initial state
  reducers: {
    add(state, action) {
      const item = state.find(i => i._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      
      // User specific key ma save karo
      const user = JSON.parse(localStorage.getItem("user"));
      if(user) localStorage.setItem(`cart_${user._id}`, JSON.stringify(state));
    },

    remove(state, action) {
      const newState = state.filter(i => i._id !== action.payload);
      
      const user = JSON.parse(localStorage.getItem("user"));
      if(user) localStorage.setItem(`cart_${user._id}`, JSON.stringify(newState));
      return newState;
    },

    // Aa rite j incrementQty ane decrementQty ma pan `cart_${user._id}` vaparvu
    
    // EK NAVO REDUCER: Logout vakhate cart clear karva mate
    clearCart(state) {
      return [];
    }
  }
});

export const { add, remove, incrementQty, decrementQty, clearCart } = Cartslice.actions;
export default Cartslice.reducer;