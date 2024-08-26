import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : {
          allOrders: [],
          placedOrder: null,
          updatedOrder: null,
          paymentStatus: "Pending",
          isLoading: false,
          isError: false,
          error: null,
      };

export const placeOrder = createAsyncThunk("orders/create-order", async (orderData) => {
    try {
        const res = await axios.post(`${server}/orders/placeorder`, orderData, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
    }
});

export const onlinePayment = createAsyncThunk("orders/online-payment", async (order_id) => {
    try {
        const response = await axios.post(`${server}/orders/online-payment`, order_id, {
            withCredentials: true,
        });

        window.location.replace(response.data.url);

        return response.data.updateOrder;
    } catch (error) {
        console.log("Error response:", error.response.data);
    }
});

export const getMyOrders = createAsyncThunk("orders/myorders", async () => {
    try {
        const res = await axios.get(`${server}/orders/myorders`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
    }
});

export const getOrderById = createAsyncThunk("orders/getOrderById", async (o_id) => {
    try {
        const res = await axios.get(`${server}/orders/${o_id}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

export const getAllOrders = createAsyncThunk("orders/getAllOrders", async () => {
    try {
        const res = await axios.get(`${server}/orders`,{
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

export const changeOrderStatus = createAsyncThunk("orders/changeOrderStatus", async(orderDetails) => {
    try{
         await axios.put(`${server}/orders/${orderDetails._id}`, orderDetails, {
            withCredentials: true,
        });
    }
    catch(error){
        console.log(error)
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        statusOfPayment: (state) => {
            state.paymentStatus = "Payment Done";
        },
        clearOrderItems: (state, action) => {
            state.placedOrder = null;
            localStorage.setItem("orders", JSON.stringify(state));
        },
        clearUpdatedItems: (state, action) => {
            state.updatedOrder = null;
            localStorage.setItem("orders", JSON.stringify(state));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.placedOrder = action.payload;
                localStorage.setItem("orders", JSON.stringify(state));
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(getMyOrders.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allOrders = action.payload;
                localStorage.setItem("orders", JSON.stringify(state));
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(onlinePayment.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(onlinePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updatedOrder = action.payload;
                localStorage.setItem("orders", JSON.stringify(state));
            })
            .addCase(onlinePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(getAllOrders.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allOrders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export const { statusOfPayment, clearOrderItems, clearUpdatedItems } = orderSlice.actions;
export default orderSlice.reducer;
