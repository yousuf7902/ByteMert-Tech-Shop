/* import React from "react";
import { Link, useNavigate } from "react-router-dom";

const RecentOrders = ({ data }) => {
    const showRecentOrders = data.slice(0, 15);
    const navigate = useNavigate()
    
    const viewAllHandler = () =>{
        navigate("/admin/orderslist");
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold text-blue-900">Recent Orders</h2>
                <button
                    className="px-2 py-1 rounded text-white bg-blue-900 hover:bg-blue-500 transition-colors"
                    onClick={viewAllHandler}
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Payment
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {showRecentOrders &&
                            showRecentOrders.map((order, index) => (
                                //console.log(order._id)
                                <tr className={index % 2 ? "bg-blue-100" : "bg-white"}>
                                    <Link to="">
                                        <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600 tracking-wider">
                                            {order.user?.name}
                                        </td>
                                        <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600  tracking-wider">
                                            {order.totalPrice}
                                        </td>
                                        <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600  tracking-wider">
                                            {order.paymentMethod}
                                        </td>
                                        <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600  tracking-wider">
                                            {order.orderStatus}
                                        </td>
                                    </Link>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default RecentOrders;
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const RecentOrders = ({ data }) => {
    const showRecentOrders = data.slice(0, 15);
    const navigate = useNavigate();

    const viewAllHandler = () => {
        navigate("/admin/orderslist");
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold text-blue-900">Recent Orders</h2>
                <button
                    className="px-2 py-1 rounded text-white bg-blue-900 hover:bg-blue-500 transition-colors"
                    onClick={viewAllHandler}
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Payment
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {showRecentOrders &&
                            showRecentOrders.map((order, index) => (
                                <tr
                                    key={order._id}
    
                                >
                                    <td colSpan="4" className="p-0">
                                        <Link
                                            to={`/order-success/${order._id}`}
                                            className="block hover:bg-blue-200"
                                        >
                                            <div className="grid grid-cols-4 px-4 py-2">
                                                <span className="text-left text-sm font-semibold text-blue-600 tracking-wider">
                                                    {order.user?.name}
                                                </span>
                                                <span className="text-left text-sm font-semibold text-blue-600 tracking-wider">
                                                    {order.totalPrice}
                                                </span>
                                                <span className="text-left text-sm font-semibold text-blue-600 tracking-wider">
                                                    {order.paymentMethod}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 text-xs w-[35%] text-center leading-5 font-semibold rounded-full ${
                                                        order.orderStatus === "Delivered"
                                                            ? "bg-green-300 text-green-800"
                                                            : order.orderStatus ===
                                                              "Out-For-Delivery"
                                                            ? "bg-orange-300 text-orange-800"
                                                            : order.orderStatus === "Confirmed"
                                                            ? "bg-yellow-300 text-yellow-800"
                                                            : "bg-red-300 text-red-800"
                                                    }`}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;