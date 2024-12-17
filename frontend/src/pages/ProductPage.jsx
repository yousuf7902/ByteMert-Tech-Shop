import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating/Rating";
import { addToCart } from "../Redux/slices/cartSlice";
import { createReview, fetchAllProducts } from "../Redux/slices/productsSlice";
import { backend_url } from "../server";
import { all } from "axios";

const ProductPage = () => {
    const { allProducts, isLoading, isError, error } = useSelector((state) => state.products);
    const { userInfo } = useSelector((state) => state.users);
    const { allOrders } = useSelector((state) => state.orders);
    const { name } = useParams();
    const originalName = name.replace(/-/g, " ");
    const [qty, setQty] = useState(1);
    const [checkStock, setCheckStock] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = allProducts.find((p) => p.name === originalName);
    const { _id, image, price, countInStock, rating, reviews, description } = product || {};

    const [productRating, setProductRating] = useState(0);
    const [comments, setComments] = useState("");

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, []);

    useEffect(() => {
        if (qty > countInStock) {
            setCheckStock(true);
        } else {
            setCheckStock(false);
        }
    }, [qty, countInStock]);

    const reviewCheck =
        allOrders?.filter((order) => order.orderItems.find((item) => item.product === _id)) || [];
    const userReviewCheck = reviews?.find((review) => review.user === userInfo?._id) || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const increment = () => {
        if (qty < countInStock) {
            setQty(qty + 1);
        } else {
            setCheckStock(true);
        }
    };

    const decrement = () => {
        if (qty > 1) setQty(qty - 1);
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/shopping-cart");
    };

    const reviewHandler = (e) => {
        e.preventDefault();

        const review = {
            _id,
            productRating,
            comments,
        };

        dispatch(createReview(review));
        setProductRating(0);
        setComments("");

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    return (
        <div className="w-[80%] sm:w-[75%] lg:w-[82%] mx-auto my-8 sm:my-6 md:my-8 lg:my-12 bg-white p-6 rounded-lg shadow-md">
            <Link
                to="/"
                className="inline-block px-3 py-2 sm:px-4 md:px-5 sm:py-2 md:py-3 rounded-md bg-blue-900 text-white font-semibold text-sm sm:text-base transition-colors duration-300 hover:bg-blue-800"
            >
                Go Back
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-10 my-6 sm:my-8 md:my-10">
                <div className="order-2 mt-5 sm:order-1 sm:mt-0 lg:col-span-2">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
                        <img
                            src={`${backend_url}${image}`}
                            alt={product.name}
                            className="w-full sm:w-[250px] md:w-[300px] lg:w-[350px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[300px] rounded object-cover"
                        />
                        <div className="flex flex-col space-y-4 sm:space-y-3 md:space-y-4 text-base sm:text-lg md:text-xl text-blue-900 font-semibold">
                            <h1 className="text-center sm:text-left">{product.name}</h1>
                            <hr className="border-t-2 border-blue-200" />
                            <div>
                                <Rating rating={rating} text={`${product.numReviews} reviews`} />
                            </div>
                            <hr className="border-t-2 border-blue-200" />
                            <p className="text-center sm:text-left">
                                Price: {price}
                                <span className="text-xl sm:text-2xl md:text-3xl ml-1">৳</span>
                            </p>
                            <hr className="border-t-2 border-blue-200" />
                            <span>Product Description: </span>
                            <p className="text-start text-base font-normal">{description}</p>
                        </div>
                    </div>
                </div>
                <div className="order-1 sm:order-2 border-4 h-[30vh] sm:h-fit border-blue-100 flex flex-col space-y-3 sm:space-y-4 md:space-y-5 p-4 sm:p-5 text-base sm:text-lg md:text-xl text-blue-900 font-semibold rounded-lg">
                    <div className="flex justify-between items-center">
                        <span>Price: </span>
                        <p>
                            {price} <span className="text-xl sm:text-2xl md:text-3xl ml-1">৳</span>
                        </p>
                    </div>
                    <hr className="border-t-2 border-blue-200" />
                    <div className="flex justify-between items-center">
                        <span>Status: </span>
                        <span
                            className={`text-sm sm:text-base font-semibold ${
                                countInStock === 0
                                    ? "text-red-600"
                                    : countInStock < 10
                                    ? "text-orange-600"
                                    : "text-green-600"
                            }`}
                        >
                            {countInStock === 0
                                ? "Out of stock"
                                : countInStock < 10
                                ? "Low Stock"
                                : "In Stock"}
                        </span>
                    </div>
                    {!userInfo?.isAdmin && (
                        <>
                            <hr className="border-t-2 border-blue-200" />
                            <div className="flex justify-between items-center">
                                <span>Quantity: </span>
                                <div className="flex items-center">
                                    <button
                                        className="px-3 sm:px-4 py-1 text-white rounded bg-blue-900 shadow-lg hover:bg-blue-800 transition-colors duration-300 disabled:bg-blue-300"
                                        onClick={decrement}
                                        disabled={qty <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-3 sm:px-4">{qty}</span>
                                    <button
                                        className="px-3 sm:px-4 py-1 text-white rounded bg-blue-900 shadow-lg hover:bg-blue-800 transition-colors duration-300 disabled:bg-blue-300"
                                        onClick={increment}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <hr className="border-t-2 border-blue-200" />
                            {checkStock && (
                                <p className="text-red-600 m-0 p-0 text-center text-sm sm:text-base">
                                    Maximum available stock: {countInStock}
                                </p>
                            )}
                            <button
                                className="w-[80%] mx-auto mt-6 sm:mt-8 py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300"
                                disabled={countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="w-[90%] mx-auto flex flex-col justify-center items-center gap-10 mt-[100px] mb-10">
                <div className="w-[65%] space-y-3">
                    <h1 className="p-3 rounded-md bg-blue-900 text-white text-xl font-semibold">
                        Reviews ({`${product.numReviews}`})
                    </h1>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div className=" text-blue-900 border border-blue-200 rounded text-lg font-semibold px-4 py-2">
                                <h1>{review.name}</h1>
                                <Rating rating={review.rating} />
                                <span>{review.createdAt.substring(0, 10)}</span>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <h1 className="p-3 rounded-md bg-blue-200 text-blue-900 text-xl font-semibold">
                            No Reviews
                        </h1>
                    )}
                </div>
                {!userInfo?.isAdmin && reviewCheck.length > 0 && userReviewCheck.length === 0 && (
                    <div className="w-[75%]">
                        <h1 className="p-3 rounded-md bg-blue-900 text-white text-xl font-semibold">
                            Write your review
                        </h1>
                        {userInfo ? (
                            <form onSubmit={reviewHandler} className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="p-2 rounded-md bg-blue-200 my-3">
                                        Rating
                                    </label>
                                    <select
                                        className="w-[25%] p-2 border border-blue-200"
                                        value={productRating}
                                        onChange={(e) => setProductRating(e.target.value)}
                                    >
                                        <option value=" ">Select...</option>
                                        <option value="1">Poor</option>
                                        <option value="2">Fair</option>
                                        <option value="3">Good</option>
                                        <option value="4">Very Good</option>
                                        <option value="5">Excellent</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="p-2 rounded-md bg-blue-200 my-3">
                                        Comments
                                    </label>
                                    <textarea
                                        className="border border-blue-500 p-2"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <h1 className="p-3 rounded-md bg-blue-200 text-blue-900 text-xl font-semibold mt-3">
                                Please log in to write your review
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
