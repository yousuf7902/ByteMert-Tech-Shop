import { server } from "../../server";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allProducts: [],
    selectedProduct: null,
    latestProducts: [],
    bestSellingProducts: [],
    featuredProducts: [],
    sliderProducts: [],
    productReviews: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts", async () => {
    const response = await axios.get(`${server}/products`);
    return response.data;
});

export const fetchProductsByName = createAsyncThunk("products/fetchProductByName", async (name) => {
    const response = await axios.get(`${server}/products/${name}`);
    return response.data;
});

export const fetchSliderProducts = createAsyncThunk("products/fetchSliderProducts", async () => {
    const response = await axios.get(`${server}/products/slider/top`, {
        withCredentials: true,
    });
    return response.data;
});

export const fetchFeaturedProducts = createAsyncThunk("products/fetchFeatured", async () => {
    const response = await axios.get(`${server}/products/homepage/featured`, {
        withCredentials: true,
    });
    return response.data;
});

export const createProduct = createAsyncThunk("products/create-product", async (createOrder) => {
    await axios.post(`${server}/products`, createOrder, {
        withCredentials: true,
    });
});

export const updateProduct = createAsyncThunk("products/update-product", async (data) => {
    await axios.put(`${server}/products/${data.id}`, data, {
        withCredentials: true,
    });
});

export const fetchProductById = createAsyncThunk("products/getProductById", async (p_id) => {
    const response = await axios.get(`${server}/products/product/${p_id}`, {
        withCredentials: true,
    });
    return response.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (p_id) => {
    await axios.delete(`${server}/products/product/${p_id}`,{
        withCredentials:true
    });
});

export const createReview = createAsyncThunk("products/create-review", async (data) => {
    const response = await axios.post(`${server}/products/${data._id}/reviews`, data, {
        withCredentials: true,
    });

    return response.data;
    
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allProducts = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(fetchProductsByName.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchProductsByName.fulfilled, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    if (action.meta.arg === "latest-products") {
                        state.latestProducts = action.payload;
                    } else if (action.meta.arg === "best-selling") {
                        state.bestSellingProducts = action.payload;
                    }
                } else {
                    state.selectedProduct = action.payload;
                }
            })
            .addCase(fetchProductsByName.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(fetchSliderProducts.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchSliderProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sliderProducts = action.payload;
            })
            .addCase(fetchSliderProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featuredProducts = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
        /* .addCase(createReview.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productReviews = action.payload;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            }); */
    },
});

export default productsSlice.reducer;
