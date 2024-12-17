import React, { useEffect} from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByName } from "../../Redux/slices/productsSlice";

const BestSellingProducts = () => {
    const { bestSellingProducts , isLoading, isError, error} = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsByName("best-selling"));
    }, [dispatch]);

    const showProducts= bestSellingProducts.slice(0, 4);

    return (
        <div className="w-[75%] sm:w-[80%] mx-auto my-12 text-blue-900 text-center">
            <h1 className="text-3xl font-bold tracking-[0.1rem] p-5">Best Selling Products</h1>
            <p className="font-semibold mb-8">Get Your Desired Product from latest products!</p>
            <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[35px] w-full">
                {showProducts.map((product) => (
                    <ProductCard productData={product} key={product._id} />
                ))}
            </div>
        </div>
    );
};

export default BestSellingProducts;
