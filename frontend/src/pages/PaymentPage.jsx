import React, { useEffect, useState } from "react";
import CheckoutStpes from "../components/CheckoutSteps/CheckoutStpes";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { clearCartItems, savePaymentMethod } from "../Redux/slices/cartSlice";
import { clearOrderItems, getOrderById, onlinePayment, placeOrder } from "../Redux/slices/orderSlice";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const { cartItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = useSelector(
        (state) => state.cart
    );

    const { placedOrder, paymentUrl } = useSelector((state) => state.orders);

    const orderData = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (paymentMethod) {
            dispatch(savePaymentMethod(paymentMethod));

            if (paymentMethod === "COD") {
                dispatch(placeOrder(orderData));
                dispatch(clearCartItems());
                navigate("/placeorder");
            } else if (paymentMethod === "OnlinePayment") {
                dispatch(placeOrder(orderData));
                dispatch(clearCartItems());
            }
        }
    }, [paymentMethod, dispatch, paymentUrl, navigate]);

    useEffect(() => {
        if (placedOrder && paymentMethod === "OnlinePayment") {
            dispatch(onlinePayment(placedOrder._id));
            dispatch(clearOrderItems());
        }
    }, [placedOrder]);

    const cashOnHandler = () => {
        setPaymentMethod("COD");
    };

    const onlinePaymentHandler = () => {
        setPaymentMethod("OnlinePayment");
    };

    return (
        <div className="bg-gray-100 py-6 flex flex-col items-center justify-center sm:py-8">
            <CheckoutStpes step1 step2 />
            <div className="relative py-3 sm:max-w-xl sm:mx-auto my-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-light-blue-400 shadow-lg transform -skew-y-6 sm:skew-y-3 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold text-center mb-8 text-blue-900">
                            Choose Payment Method
                        </h1>
                        <div className="space-y-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-3 text-white bg-blue-900 hover:bg-blue-800 rounded-md font-medium md:py-4 md:text-lg"
                                onClick={cashOnHandler}
                            >
                                Cash on Delivery
                            </button>
                            <button
                                type="submit"
                                className="w-full px-4 py-3 text-white bg-blue-900 hover:bg-blue-800 rounded-md font-medium md:py-4 md:text-lg"
                                onClick={onlinePaymentHandler}
                            >
                                Online Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
