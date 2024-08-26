import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStpes from "../components/CheckoutSteps/CheckoutStpes";
import { useNavigate, useParams } from "react-router-dom";
import { clearOrderItems, placeOrder } from "../Redux/slices/orderSlice";
import { clearCartItems } from "../Redux/slices/cartSlice";
import axios from "axios";
import { backend_url, server } from "../server";

const PlaceOrderPage = () => {
    const { placedOrder, updatedOrder } = useSelector((state) => state.orders);

    const [details, setDetails] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (placedOrder === null) {
                    const res = await axios.get(`${server}/orders/${updatedOrder?._id}`, {
                        withCredentials: true,
                    });
                    setDetails(res.data);
                } else {
                    const res = await axios.get(`${server}/orders/${placedOrder?._id}`, {
                        withCredentials: true,
                    });
                    setDetails(res.data);
                }

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchOrderDetails();
    }, [updatedOrder, placedOrder,setDetails]);

    

    const placeOrderHandler = () => {
        navigate("/order-success");
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <CheckoutStpes step1 step2 step3 step4 />
            </div>
            <div className="container mx-auto pt-5 pb-10 px-5 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    <div className="md:col-span-2 space-y-6">
                        <section className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold text-blue-900 mb-2">Shipping</h2>
                            <p className="text-blue-700">
                                Address: {details.shippingAddress?.address},{" "}
                                {details.shippingAddress?.city}
                                {"-"}
                                {details.shippingAddress?.postalCode}
                            </p>
                        </section>

                        <section className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                                Payment Method
                            </h2>
                            <p className="text-blue-700">Method: {details?.paymentMethod}</p>
                        </section>

                        <section className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                                Order Items
                            </h2>
                            <div className="space-y-4">
                                {details?.orderItems &&
                                    details?.orderItems.map((item) => (
                                        <div className="flex items-center justify-center space-x-4">
                                            <img
                                                src={`${backend_url}${item.image}`}
                                                alt="Logitech Mouse"
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-blue-900">
                                                    {item.name}
                                                </h3>
                                                <p className="text-blue-700">
                                                    {item.qty} x {item.price}
                                                    <span className="text-xl sm:text-2xl ml-1 text-center">
                                                        ৳
                                                    </span>{" "}
                                                    = {(item.price * item.qty).toFixed(2)}
                                                    <span className="text-xl sm:text-2xl ml-1 text-center">
                                                        ৳
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    </div>

                    <div className="md:col-span-1 space-y-6">
                        <section className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-blue-900 mb-2">
                                Payment Status
                            </h2>
                            {details.isPaid ? (
                                <p className="text-green-700 text-lg font-semibold">Paid</p>
                            ) : (
                                <p className="text-red-600 text-lg font-semibold">Not Paid</p>
                            )}
                        </section>
                        <section className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center font-semibold text-blue-700">
                                    <span>Items:</span>
                                    <span>
                                        {details?.itemsPrice}
                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                            ৳
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-between items-center font-semibold text-blue-700">
                                    <span>Shipping:</span>
                                    <span>
                                        {details?.shippingPrice}
                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                            ৳
                                        </span>
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-lg text-blue-700 font-semibold mt-4 pt-2 border-t-2 border-blue-300">
                                    <span>Total:</span>
                                    <span>
                                        {details?.totalPrice}
                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                            ৳
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="w-full mt-6 bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderPage;
