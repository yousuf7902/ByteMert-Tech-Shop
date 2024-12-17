/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
    isAuthenticated: false,
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    isLoading: false,
    isError:false
};

export const fetchUser = createAsyncThunk("user/fetchUser", async ({email, password})=> {
    const res = await axios.post(`${server}/users/login`,
        {
            email,
            password,
        },
        { withCredentials: true }
    );
    return res.data;
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
         builder
             .addCase(fetchUser.pending, (state) => {
                 state.isLoading = true;
             })
             .addCase(fetchUser.fulfilled, (state, action) => {
                 state.isAuthenticated = true;
                 state.isLoading = false;
                 state.userInfo = action.payload;
                 localStorage.setItem("userInfo", JSON.stringify(action.payload));
             })
             .addCase(fetchUser.rejected, (state, action) => {
                 state.isLoading = false;
                 state.isError = action.payload;
                 state.isAuthenticated = false;
             });
    }
} );


export default userSlice.reducer;


 */