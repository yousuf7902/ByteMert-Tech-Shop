import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/UserSideBar/UserSideBar";
import { server } from "../../server";
import axios from "axios";

const AdminCouponPage = () => {
    const [coupons, setCoupons] = useState();

    const [newCoupon, setNewCoupon] = useState({ code: "", discount: "", expiryDate: "" });

    const fetchCoupons = async () => {
        const res = await axios.get(`${server}/users/coupons`, {
            withCredentials: true,
        });
        setCoupons(res.data);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleInputChange = (e) => {
        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${server}/users/coupons/new`, newCoupon, {
            withCredentials: true,
        });
        setNewCoupon({ code: "", discount: "", expiryDate: "" });
        fetchCoupons();
    };

    const deleteCoupon = async (id) => {
        await axios.delete(`${server}/users/coupons/${id}`, {
            withCredentials: true,
        })
        fetchCoupons();
    };

    return (
        <div className="bg-white grid grid-cols-5 gap-5 h-[120vh]">
            <div className="col-span-1">
                <UserSideBar />
            </div>
            <div className="col-span-4 my-8 mr-5">
                <h1 className="text-3xl font-bold mb-6 text-blue-900">Coupon Management</h1>

                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-900">Create New Coupon</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="code"
                            value={newCoupon.code}
                            onChange={handleInputChange}
                            placeholder="Coupon Code"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            name="discount"
                            value={newCoupon.discount}
                            onChange={handleInputChange}
                            placeholder="Discount (%)"
                            className="p-2 border rounded"
                            required
                            min="1"
                            max="100"
                        />
                        <input
                            type="date"
                            name="expiryDate"
                            value={newCoupon.expiryDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="my-5 bg-blue-900 flex justify-center items-center w-[20%] text-white px-4 py-3 rounded-md focus:outline-none"
                    >
                        Create Coupon
                    </button>
                </form>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr className="bg-blue-900 text-white">
                                <th className="py-3 px-4 text-left">No.</th>
                                <th className="py-3 px-4 text-left">Code</th>
                                <th className="py-3 px-4 text-left">Discount</th>
                                <th className="py-3 px-4 text-left">Expiry Date</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons?.map((coupon, index) => (
                                <tr
                                    key={coupon.id}
                                    className="bg-gray-100 text-blue-900 font-semibold"
                                >
                                    <td className="py-3 px-4">{index+1}</td>
                                    <td className="py-3 px-4">{coupon.coupon}</td>
                                    <td className="py-3 px-4">{coupon.discount}%</td>
                                    <td className="py-3 px-4">{coupon.expiryDate.slice(0, 10)}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => deleteCoupon(coupon._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCouponPage;
