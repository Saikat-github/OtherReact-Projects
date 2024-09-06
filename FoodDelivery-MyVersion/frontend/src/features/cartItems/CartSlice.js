import { createSlice } from "@reduxjs/toolkit"
import { food_list } from "../../assets/assets"

const initialState = {
    cartItems: {},
    showSignUp: false,
    totalAmt: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (!state.cartItems[action.payload]) {
                state.cartItems = { ...state.cartItems, [action.payload]: 1 }
            } else {
                state.cartItems = { ...state.cartItems, [action.payload]: state.cartItems[action.payload] + 1 }
            }
            let amt = 0;
            for (const item in state.cartItems) {
                if (state.cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    amt += itemInfo.price * state.cartItems[item];
                }
            }
            state.totalAmt = amt
        },
        removeFromCart: (state, action) => {
            state.cartItems = { ...state.cartItems, [action.payload]: state.cartItems[action.payload] - 1 };
            let amt = 0;
            for (const item in state.cartItems) {
                if (state.cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    amt += itemInfo.price * state.cartItems[item];
                }
            }
            state.totalAmt = amt
        },
        // getTotalAmt: (state,action) => {
        //     let totalAmt = 0;
        //     for(const item in state.cartItems) {
        //         if(state.cartItems[item]>0) {
        //             let itemInfo = food_list.find((product) => product._id === item);
        //             state.totalAmt = itemInfo.price * state.cartItems[item];
        //         } 
        //     }
        //     console.log(state.totalAmt);
        //     return totalAmt;
        // },
        setShowLogin: (state, action) => {
            state.showSignUp = !state.showSignUp;
        }
    }
})

export const { addToCart, removeFromCart, getTotalAmt, setShowLogin } = cartSlice.actions;

export default cartSlice.reducer;