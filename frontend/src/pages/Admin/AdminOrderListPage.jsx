import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/UserSideBar/UserSideBar";
import {
    FaShoppingBag,
    FaCalendarAlt,
    FaDollarSign,
    FaBox,
    FaCreditCard,
    FaSearch,
    FaCheck,
    FaCross,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Redux/slices/orderSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminOrderListPage = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

    const { allOrders } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const filteredData =
        userId === null ? allOrders : allOrders.filter((order) => order.user._id === userId);
    console.log(filteredData);


    const [searchQuery, setSearchQuery, filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const orderPerPage = 10;

    const lastOrderIndex = orderPerPage * currentPage;
    const firstOrderIndex = lastOrderIndex - orderPerPage;
    const currentOrder = filteredData?.slice(firstOrderIndex, lastOrderIndex);
    const totalPages = Math.ceil(filteredData?.length / orderPerPage);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const filteredOrders = filteredData?.filter(
        (order) =>
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.orderStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.tranId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const viewHandler = (order_id) => {
        navigate(`/order-success/${order_id}`);
    };

    return (
        <div className="bg-white grid grid-cols-5 gap-5 h-[120vh]">
            <div className="col-span-1">
                <UserSideBar />
            </div>
            <div className="col-span-4 my-8 mr-5">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900 flex items-center">
                    <FaShoppingBag className="mr-4" />
                    All Orders<span className="ml-2">({filteredData?.length})</span>
                </h1>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="px-4 py-2 border rounded-lg w-full md:w-1/3"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-800 text-white text-center">
                                <tr>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Order No:
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        User Email
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Paid
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 py-3  text-sm font-semibold uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-center">
                                {searchQuery === ""
                                    ? currentOrder?.map((order, index) => (
                                          <tr
                                              key={order._id}
                                              className="hover:bg-indigo-50 transition duration-150 text-blue-800 font-bold"
                                          >
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm">
                                                      {firstOrderIndex + index + 1}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm">{order._id}</div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm">{order.user?.email}</div>
                                              </td>

                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      <FaCalendarAlt className="mr-2 text-blue-700" />
                                                      {order.createdAt.substring(0, 10)}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      <span>{order.totalPrice.toFixed(2)}</span>
                                                      <span className="text-xl sm:text-xl ml-1 text-center">
                                                          ৳
                                                      </span>
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      {order.isPaid ? (
                                                          <span>
                                                              <FaCheck
                                                                  size={20}
                                                                  className="text-green-600"
                                                              />
                                                          </span>
                                                      ) : (
                                                          <span>
                                                              <ImCross
                                                                  size={20}
                                                                  className="text-red-600"
                                                              />
                                                          </span>
                                                      )}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      <FaCreditCard className="mr-2 text-blue-700" />
                                                      {order.paymentMethod}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <span
                                                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                          order.orderStatus === "Delivered"
                                                              ? "bg-green-300 text-green-800"
                                                              : order.orderStatus ===
                                                                "Out-For-Delivery"
                                                              ? "bg-orange-300 text-orange-800"
                                                              : order.orderStatus === "Confirmed"
                                                              ? "bg-yellow-300 text-yellow-800"
                                                              : order.orderStatus === "Canceled"
                                                              ? "bg-red-300 text-red-800"
                                                              : "bg-pink-300 text-pink-800"
                                                      }`}
                                                  >
                                                      {order.orderStatus}
                                                  </span>
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                  <button
                                                      type="button"
                                                      className="text-blue-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-full transition duration-150"
                                                      onClick={() => viewHandler(order._id)}
                                                  >
                                                      View Details
                                                  </button>
                                              </td>
                                          </tr>
                                      ))
                                    : filteredOrders?.map((order, index) => (
                                          <tr
                                              key={order._id}
                                              className="hover:bg-indigo-50 transition duration-150 text-blue-800 font-bold"
                                          >
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm">
                                                      {firstOrderIndex + index + 1}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm">{order._id}</div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm">{order.user.email}</div>
                                              </td>

                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      <FaCalendarAlt className="mr-2 text-blue-700" />
                                                      {order.createdAt.substring(0, 10)}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      <span>{order.totalPrice.toFixed(2)}</span>
                                                      <span className="text-xl sm:text-xl ml-1 text-center">
                                                          ৳
                                                      </span>
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      {order.isPaid ? (
                                                          <span>
                                                              <FaCheck
                                                                  size={20}
                                                                  className="text-green-600"
                                                              />
                                                          </span>
                                                      ) : (
                                                          <span>
                                                              <ImCross
                                                                  size={20}
                                                                  className="text-red-600"
                                                              />
                                                          </span>
                                                      )}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-500 flex items-center justify-center">
                                                      <FaCreditCard className="mr-2 text-blue-700" />
                                                      {order.paymentMethod}
                                                  </div>
                                              </td>
                                              <td className="px-4 py-4 whitespace-nowrap">
                                                  <span
                                                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                  <button
                                                      type="button"
                                                      className="text-blue-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-full transition duration-150"
                                                      onClick={() => viewHandler(order._id)}
                                                  >
                                                      View Details
                                                  </button>
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                        </table>
                        {filteredOrders?.length === 0 && (
                            <div className="p-4 text-center text-gray-500">No orders found.</div>
                        )}
                    </div>
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
        </div>
    );
};

export default AdminOrderListPage;
