import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../server";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import {
    changeOrderStatus,
    clearOrderItems,
    clearUpdatedItems,
    getAllOrders,
} from "../Redux/slices/orderSlice";

const OrderSuccessPage = () => {
    const [details, setDetails] = useState({});
    const { placedOrder, updatedOrder } = useSelector((state) => state.orders);
    const { userInfo } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useParams();
    const [currentStatus, setCurrentStatus] = useState(details.orderStatus);
    const { toPDF, targetRef } = usePDF({ filename: "order-invoice.pdf" });

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (placedOrder === null && updatedOrder !== null) {
                    const res = await axios.get(`${server}/orders/${updatedOrder?._id}`, {
                        withCredentials: true,
                    });
                    setDetails(res.data);
                } else if (updatedOrder === null && placedOrder !== null) {
                    const res = await axios.get(`${server}/orders/${placedOrder?._id}`, {
                        withCredentials: true,
                    });
                    setDetails(res.data);
                } else {
                    const res = await axios.get(`${server}/orders/${_id}`, {
                        withCredentials: true,
                    });
                    setDetails(res.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchOrderDetails();
    }, [placedOrder?._id]);

    useEffect(() => {
        dispatch(
            changeOrderStatus({
                _id,
                currentStatus,
            })
        );
    }, [currentStatus]);

    const shopMoreHandler = () => {
        dispatch(clearOrderItems());
        dispatch(clearUpdatedItems());
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-10 py-16">
            <div className="max-w-6xl w-full bg-white rounded-xl shadow-md p-8">
                <div ref={targetRef}>
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
                        Order Invoice
                    </h2>
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="w-[75%]">
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <p className="text-gray-600">
                                    Order{" "}
                                    <span className="font-medium text-gray-800">
                                        {details?._id}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Shipping</h3>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Name:</span>{" "}
                                        {details.user?.name}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Email:</span>{" "}
                                        {details.user?.email}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Address:</span>{" "}
                                        {details.shippingAddress?.address},{" "}
                                        {details.shippingAddress?.city}
                                        {"-"}
                                        {details.shippingAddress?.postalCode}
                                    </p>
                                    <p className="text-gray-600">
                                        Order Status:
                                        <span
                                            className={`px-2 inline-block rounded-2xl leading-5 font-semibold  ${
                                                details.orderStatus === "Delivered"
                                                    ? " text-green-800"
                                                    : details.orderStatus === "Out-For-Delivery"
                                                    ? " text-orange-500"
                                                    : details.orderStatus === "Confirmed"
                                                    ? " text-yellow-600"
                                                    : details.orderStatus === "Canceled"
                                                    ? "text-red-800"
                                                    : "text-pink-500"
                                            }`}
                                        >
                                            {details.orderStatus}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">
                                    Payment Method
                                </h3>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Method: </span>
                                        {details.paymentMethod}
                                    </p>
                                    {details.isPaid ? (
                                        <>
                                            <span className="text-gray-600">Payment Status:</span>
                                            <p className="text-green-700 p-2 font-bold inline-block rounded-2xl">
                                                Done
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-gray-600">Payment Status:</span>
                                            <p className="text-red-700 p-2 font-semibold inline-block rounded-2xl">
                                                Due
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">
                                    Order Items <span>({details.orderItems?.length})</span>
                                </h3>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Product Name</th>
                                                <th className="text-center py-2">Quantity</th>
                                                <th className="text-right py-2">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.orderItems?.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b last:border-b-0 bg-white rounded-md shadow-md"
                                                >
                                                    <td className="p-3">
                                                        {index + 1}
                                                        {". "}
                                                        {item.name}
                                                    </td>
                                                    <td className="text-center p-3">{item.qty}</td>
                                                    <td className="text-right p-3">
                                                        {item.price.toFixed(2)}{" "}
                                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                                            ৳
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <h3 className="text-xl font-medium text-gray-800 mb-2">
                                Order Summary
                            </h3>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex justify-between items-center text-gray-800 font-medium mb-2">
                                    <p>Items Price</p>
                                    <p>
                                        {details.itemsPrice}{" "}
                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                            ৳
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-gray-800 font-medium mb-2">
                                    <p>Shipping</p>
                                    <p>
                                        {details.shippingPrice}{" "}
                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                            ৳
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-center text-gray-800 font-bold mt-4 pt-4 border-t border-gray-300">
                                    <p>Total</p>
                                    <p>
                                        {details.totalPrice}{" "}
                                        <span className="text-xl sm:text-2xl ml-1 text-center">
                                            ৳
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] mx-auto">
                    {_id !== undefined ? (
                        <div className="flex flex-col gap-5 items-center justify-around mt-6">
                            {userInfo && userInfo.isAdmin ? (
                                <>
                                    <div className="mb-2 p-8 bg-blue-200 w-full">
                                        <h1 className="text-lg font-semibold mb-2 text-center">
                                            Change Order Status
                                        </h1>
                                        <select
                                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                            value={currentStatus}
                                            onChange={(e) => setCurrentStatus(e.target.value)}
                                        >
                                            <option value={details.orderStatus}>
                                                {details.orderStatus}
                                            </option>
                                            {details.orderStatus !== "Pending" && (
                                                <option value="Pending">Pending</option>
                                            )}
                                            {details.orderStatus !== "Confirmed" && (
                                                <option value="Confirmed">Confirmed</option>
                                            )}
                                            {details.orderStatus !== "Canceled" && (
                                                <option value="Canceled">Canceled</option>
                                            )}
                                            {details.orderStatus !== "Out-For-Delivery" && (
                                                <option value="Out-For-Delivery">
                                                    Out-For-Delivery
                                                </option>
                                            )}
                                            {details.orderStatus !== "Delivered" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>
                                    <Link
                                        to="/admin/orderslist"
                                        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                    >
                                        Go Back
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                        onClick={() => toPDF()}
                                    >
                                        Download PDF
                                    </button>
                                    <Link
                                        to="/users/profile/my-orders"
                                        className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                    >
                                        Go Back
                                    </Link>
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="w-full mt-6 bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                            onClick={shopMoreHandler}
                        >
                            Shop More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
