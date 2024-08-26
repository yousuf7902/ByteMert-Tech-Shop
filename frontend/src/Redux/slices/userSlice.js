import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
    isAuthenticated: localStorage.getItem("authenticated")
        ? JSON.parse(localStorage.getItem("authenticated"))
        : false,
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    allUsers: [],
};

export const fetchGetAllUsers = createAsyncThunk("users/getAllUsers", async () => {
    const res = await axios.get(`${server}/users/all-users`, {
        withCredentials: true,
    });
    return res.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (u_id) => {
    await axios.delete(`${server}/users/${u_id}`, {
        withCredentials: true,
    });
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("authenticated", JSON.stringify(true));
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logoutUser: (state, actions) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            localStorage.removeItem("authenticated");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("orders");
            localStorage.removeItem("cart");
        },
        updateUser: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                ...action.payload,
            };
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllUsers.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = action.payload;
            })
            .addCase(fetchGetAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export const { saveUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
