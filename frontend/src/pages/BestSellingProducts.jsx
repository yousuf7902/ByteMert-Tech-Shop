import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchProductsByName } from "../Redux/slices/productsSlice";

const BestSellingProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("Default");
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { bestSellingProducts, isLoading, isError, error } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsByName("best-selling"));
        dispatch(fetchAllProducts());
    }, [dispatch]);

    useEffect(() => {
        let sorted = [...bestSellingProducts].slice(0, 25);
        if (sortBy === "Price Low to High") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price High to Low") {
            sorted.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(sorted);
        setCurrentPage(1);
    }, [bestSellingProducts, sortBy]);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Change page
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleShowChange = (e) => {
        setProductsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="w-[75%] sm:w-[80%] mx-auto my-12 text-blue-900 text-center">
            <div>
                <h1 className="text-3xl font-bold tracking-[0.1rem] p-5">Best Selling Products</h1>
                <p className="font-semibold mb-8">Get Your Desired Products from here!</p>
            </div>
            <div className="flex justify-between items-center my-6 font-bold">
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <label className="mr-2">Sort By:</label>
                        <select
                            className="border rounded px-2 py-1 bg-white"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="Default">Default</option>
                            <option value="Price Low to High">Price Low to High</option>
                            <option value="Price High to Low">Price High to Low</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Show:</label>
                        <select
                            className="border rounded px-2 py-1 bg-white"
                            value={productsPerPage}
                            onChange={handleShowChange}
                        >
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[35px] w-full">
                {currentProducts &&
                    currentProducts.map((product) => (
                        <ProductCard productData={product} key={product._id} />
                    ))}
            </div>

            <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border bg-blue-900 text-white disabled:bg-gray-300"
                >
                    Previous
                </button>
                <div className="px-3 py-1 border bg-white text-blue-900">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border bg-blue-900 text-white disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BestSellingProducts;
