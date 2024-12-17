import React, { useEffect } from "react";
import Categories from "../components/Categories/Categories";
import LatestProducts from "../components/LatestProducts/LatestProducts";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import BestSellingProducts from "../components/BestSellingProducts.js/BestSellingProducts";
import SliderProducts from "../components/SliderProducts/SliderProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../Redux/slices/productsSlice";
import { getMyOrders } from "../Redux/slices/orderSlice";

export default function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(getMyOrders());
    }, []);

    return (
        <div>
            <SliderProducts />
            <Categories />
            <LatestProducts />
            <BestSellingProducts />
            <FeaturedProducts />
        </div>
    );
}
