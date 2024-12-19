import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCart } from "../Redux/slices/cartSlice";
import { backend_url, server } from "../server";
import { toast } from "react-toastify";
import axios from "axios";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.users);
    const { cartItems, itemsPrice, shippingPrice, totalPrice } = cart;
    const [discountField, setDiscountField] = useState({
        coupon: "",
        totalPrice: totalPrice,
        isUsed: false,
    });
    
    const [discountPrice, setDiscountPrice] = useState("");
    const [isUsed, setIsUsed] = useState(false);

    const increment = (item) => {
        dispatch(updateCart({ _id: item._id, qty: item.qty + 1 }));
    };

    const decrement = (item) => {
        if (item.qty > 1) {
            dispatch(updateCart({ _id: item._id, qty: item.qty - 1 }));
        }
    };

    const removeItem = (item) => {
        dispatch(removeFromCart(item._id));
    };

    const shoppingHandler = () => {
        navigate("/");
    };

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate("/shipping");
        } else {
            navigate("/login?redirect=/shipping");
        }
    };

    const handleInputChange = (e) => {
        console.log(e.target.value)
        setDiscountField({
            coupon: e.target.value,
            totalPrice,
            isUsed: true,
        });
    };

    const discountHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/users/coupons/apply`, discountField, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success("Congratulations Coupon applied");
                setDiscountPrice(res.data.discountPrice.toFixed(2));
                dispatch(updateCart({ discountPrice: String(res.data.discountPrice.toFixed(2)) }));
                setIsUsed(true);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message);
        }
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        setIsUsed(false);
        dispatch(updateCart({ 
            discountPrice: String(itemsPrice > 2000 ? Number(itemsPrice).toFixed(2) : (Number(itemsPrice) + 50).toFixed(2))
          }));
        setDiscountField({
            coupon: "",
            totalPrice: totalPrice,
            isUsed: false,
        })
    }


    return (
        <>
            {cartItems.length === 0 ? (
                <div className="h-full px-4 py-20 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <div className="max-w-xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                            {/* Illustration */}
                            <div className="w-full sm:w-2/5 p-4 flex items-center justify-center bg-indigo-50">
                                <svg
                                    className="w-32 h-32 sm:w-40 sm:h-40 text-blue-900"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
                                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                                    Your cart is empty
                                </h1>
                                <p className="text-sm sm:text-base text-blue-700 mb-4">
                                    Looks like you haven't added anything yet. Start shopping to
                                    fill it with amazing products!
                                </p>
                                <button
                                    className="bg-blue-900 text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={shoppingHandler}
                                >
                                    Start Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="h-min-screen py-20 bg-gradient-to-br from-blue-100 to-indigo-100">
                    <h1 class="mb-10 text-center text-3xl font-bold text-blue-900">Cart Items</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div class="rounded-lg md:w-2/3">
                            {cartItems.map((item) => (
                                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <img
                                        src={`${backend_url}/images/${item.image}`}
                                        alt="product-image"
                                        class="w-full rounded-lg sm:w-40"
                                    />
                                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div class="mt-5 sm:mt-0 ">
                                            <h2 class="text-lg font-bold  text-blue-800">
                                                {item?.name}
                                            </h2>
                                            <p class="mt-1 text-sm text-blue-700 font-semibold">
                                                Quantity: X {item.qty}
                                            </p>
                                        </div>
                                        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center">
                                                <button
                                                    className="px-3 sm:px-4 py-1 text-white rounded bg-blue-900 shadow-lg hover:bg-blue-800 transition-colors duration-300 disabled:bg-blue-300"
                                                    onClick={() => decrement(item)}
                                                    disabled={item.qty <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 sm:px-4">{item.qty}</span>
                                                <button
                                                    className="px-3 sm:px-4 py-1 text-white rounded bg-blue-900 shadow-lg hover:bg-blue-800 transition-colors duration-300 disabled:bg-blue-300"
                                                    onClick={() => increment(item)}
                                                    disabled={item.qty >= item.countInStock}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div class="flex items-center justify-center space-x-5">
                                                <p class="text-base text-blue-700 font-bold">
                                                    {(item.price * item.qty).toFixed(2)}
                                                    <span className="text-xl sm:text-2xl md:text-3xl ml-1 text-center">
                                                        ৳
                                                    </span>
                                                </p>
                                                <div
                                                    className="bg-slate-600 text-white p-1 rounded-full"
                                                    onClick={() => removeItem(item)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="h-6 w-6 cursor-pointer duration-150 hover:h-5 hover:w-5"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <!-- Sub total --> */}
                        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div class="mb-2 text-blue-700 font-bold">
                                <p className="mb-3">Subtotal:</p>
                                <div className="flex justify-between items-center flex-col gap-3">
                                    {cartItems.map((item) => (
                                        <div className="w-full px-[10px] py-[5px] shadow-md ">
                                            <h1>
                                                {item.name?.length < 25
                                                    ? item.name
                                                    : item.name?.slice(0, 20) + "..."}
                                            </h1>
                                            <div className="flex items-center justify-between">
                                                <p>X {item.qty}</p>
                                                <p>
                                                    {(item.price * item.qty).toFixed(2)}
                                                    <span className="text-xl sm:text-2xl md:text-3xl ml-1 text-center">
                                                        ৳
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Coupon Field */}
                                <div className="mt-10 mb-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full py-2 pl-3 pr-24 text-sm border-2 border-blue-200 rounded-md focus:outline-none focus:border-blue-500"
                                            placeholder="Enter coupon code"
                                            value={discountField.coupon}
                                            onChange={handleInputChange}
                                        />
                                        {isUsed ? ( <button
                                            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1 text-sm text-white bg-blue-900 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            onClick={cancelHandler}
                                        >
                                            X
                                        </button>) : (<button
                                            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1 text-sm text-white bg-blue-900 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            onClick={discountHandler}
                                        >
                                            Apply
                                        </button>)}
                                    </div>
                                    <p className="mt-1 text-xs text-blue-600">
                                        Enter a valid coupon code to get a discount
                                    </p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center text-blue-700 font-bold mt-5">
                                <p class="text-lg font-bold">Shipping</p>
                                <p>
                                    {shippingPrice}
                                    <span className="text-xl sm:text-2xl md:text-3xl ml-1 text-center">
                                        ৳
                                    </span>
                                </p>
                            </div>
                            <hr class="my-4" />
                            <div class="flex justify-between text-blue-700">
                                <p class="text-lg font-bold">Total</p>
                                <div class="">
                                    <p class="mb-1 text-lg font-bold">
                                        {isUsed ? discountPrice : totalPrice } BDT
                                    </p>
                                </div>
                            </div>
                            <button
                                class="mt-6 w-full rounded-md bg-blue-900 py-1.5 font-medium text-blue-50 hover:bg-blue-800"
                                onClick={checkoutHandler}
                            >
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartPage;
