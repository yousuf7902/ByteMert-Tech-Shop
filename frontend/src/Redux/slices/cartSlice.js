import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "COD" };

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                existItem.qty += item.qty;
            } else {
                state.cartItems.push(item);
            }

            //calculate items price
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );

            //calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 2000 ? 0 : 50);

            //calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        },
        updateCart: (state, action) => {
            //const { _id, qty } = action.payload;
            console.log(action.payload)
            const itemToUpdate = state.cartItems.find((item) => item._id ===action.payload. _id);

            if (itemToUpdate) {
                itemToUpdate.qty = action.payload.qty;

                // Recalculate prices
                state.itemsPrice = addDecimals(
                    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
                );
                state.shippingPrice = addDecimals(state.itemsPrice > 2000 ? 0 : 50);
                state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(
                    2
                );

                // Save to localStorage
                localStorage.setItem("cart", JSON.stringify(state));
            } else {
                state.totalPrice = action.payload.discountPrice;
                // Save to localStorage
                localStorage.setItem("cart", JSON.stringify(state));
                console.log(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            const _id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item._id !== _id);

            // Recalculate prices
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
            state.shippingPrice = addDecimals(state.itemsPrice > 2000 ? 0 : 50);
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(state));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

export const {
    addToCart,
    updateCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
