import React, { useEffect, useState } from "react";
import UserSideBar from "../components/UserSideBar/UserSideBar";
import axios from "axios";
import { server } from "../server";



const UserCouponPage = () => {
    const [coupons, setCoupons] = useState();
    const fetchCoupons = async () => {
        const res = await axios.get(`${server}/users/coupons`, {
            withCredentials: true,
        });
        setCoupons(res.data);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const currentDate = new Date();

    const filteredCoupons = coupons?.filter(
        (coupon) => coupon.expiryDate >= currentDate.toISOString()
    );




    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-[120vh]">
            <div className="max-w-8xl mx-auto flex space-x-5">
                <div>
                    <UserSideBar />
                </div>
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <h1 className="text-2xl font-bold mb-4 text-blue-800">Your Coupons</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-blue-800">
                        {filteredCoupons &&
                            filteredCoupons?.map((coupon) => (
                                <div
                                    key={coupon._id}
                                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200"
                                >
                                    <h2 className="text-xl font-bold mb-2">{coupon.coupon}</h2>
                                    <p className="mb-1 text-lg font-semibold">
                                        {coupon.discount}% off all items
                                    </p>
                                    <p className="text-sm">
                                        Expires: {coupon.expiryDate.slice(0, 10)}
                                    </p>
                                </div>
                            ))}
                    </div>
                    {filteredCoupons?.length === 0 && (
                        <h1 className="text-2xl font-bold text-blue-800 bg-white p-6 text-center rounded-lg">
                            Sorry...You have no discount coupons
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCouponPage;
