import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      //mutating the state
      // state.items.push(action.payload);

      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex === -1) {
        const tempItem = { ...action.payload, amount: 1 };
        state.items.push(tempItem);
        toast.success(`${action.payload.name} added to the cart`, {
          position: "bottom-left",
        });
      } else {
        state.items[itemIndex].amount = state.items[itemIndex].amount + 1;
        toast.info(`Increased ${state.items[itemIndex].name} quantity`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("items", JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const newCartItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = newCartItems;
      localStorage.setItem("items", JSON.stringify(state.items));

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    increase: (state, { payload }) => {
      const itemIndex = state.items.findIndex((item) => item.id === payload.id);
      state.items[itemIndex].amount = state.items[itemIndex].amount + 1;
    },

    decrease: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.items[itemIndex].amount > 1) {
        state.items[itemIndex].amount = state.items[itemIndex].amount - 1;

        toast.info(`${action.payload.name} decreased cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.items[itemIndex].amount === 1) {
        const newCartItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items = newCartItems;

        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items.length = 0;

      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("items", JSON.stringify(state.items));
    },

    getTotals: (state, action) => {
      let { total, quantity } = state.items.reduce(
        (cartTotal, item) => {
          const { price, defaultPrice, amount } = item;
          const itemTotal =
            (price / 100) * amount || (defaultPrice / 100) * amount;

          cartTotal.total += itemTotal;
          cartTotal.quantity += amount;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totalAmount = total;
      state.totalQuantity = quantity;
    },
  },
});

//console.log(cartSlice);
export const {
  addToCart,
  removeItem,
  increase,
  decrease,
  clearCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;

// if (itemIndex === -1) {
//   state.items.push(action.payload);
// } else {
//   return state.items.map((item, i) => {
//     {
//       itemIndex === i ? { ...item, amount: item.amount + 1 } : item;
//     }
//   });
// }
// (state.items[itemIndex].amount += 1)
// { ...item, amount: item.amount + action.amount }
