import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import usersReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";


const Store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer,
        cart: cartReducer,
        orders: orderReducer
    },
    
});

export default Store;
