import React, { useEffect, useState } from "react";
import products, { brandingData } from "../../static/products";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";

const Categories = () => {
    const { allProducts } = useSelector((state) => state.products);
    const [isCopy, setIsCopy] = useState(false);
    const uniqueCategories = [...new Set(allProducts.map((item) => item.category))].slice(0, 10);
    const navigate = useNavigate();

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

    const handleCopy = (coupon) => {
        navigator.clipboard.writeText(coupon);
        setIsCopy(true);

        setTimeout(() => {
            setIsCopy(false);
        }, 3000);
    };

    return (
        <>
            <div className="w-[90%] lg:w-[85%] mx-auto text-blue-900 text-center m-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-[95%] sm:w-[90%] lg:w-[90%] mx-auto my-6 sm:my-8 lg:my-10">
                    <div className="col-span-3 flex justify-center items-center gap-3 ">
                        {brandingData &&
                            brandingData.map((brand) => (
                                <div className="flex justify-center items-center gap-3 border-2 border-blue-800 p-5 rounded-lg bg-white shadow-md">
                                    {brand.icon}
                                    <div>
                                        <h3 className="font-bold text-xs sm:text-[12px] md:text-[16px] mb-[5px]">
                                            {brand.title}
                                        </h3>
                                        <p className="text-center text-xs md:text-sm">
                                            {brand.Description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="col-span-1">
                        <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 border-2 border-blue-800 ">
                            <h1 className="text-2xl font-bold p-2">Grab a Coupon!</h1>
                            <p className="mb-4 text-blue-900">
                                {filteredCoupons?.length === 0 ? (
                                    <>No coupons available at this time.</>
                                ) : (
                                    <>
                                        Use the coupon code below to get a special discount on your
                                        next purchase.
                                    </>
                                )}
                            </p>
                            <div className="flex items-center justify-between text-blue-900">
                                {!filteredCoupons || filteredCoupons.length === 0 ? (
                                    <>
                                        <div className="bg-gray-200 px-4 py-2 rounded-lg">
                                            <span className="font-bold text-blue-900">
                                                &#128549;
                                            </span>
                                        </div>
                                        <button
                                            className="bg-blue-300 text-white font-bold py-2 px-4 rounded-lg"
                                            disabled
                                        >
                                            Copy
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-gray-200 px-4 py-2 rounded-lg">
                                            <span className="font-bold text-blue-900">
                                                {filteredCoupons[0].coupon}
                                            </span>
                                        </div>
                                        <button
                                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg"
                                            onClick={() => handleCopy(filteredCoupons[0].coupon)}
                                        >
                                            {isCopy ? "Copied" : "Copy"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold p-5">Featured Category</h1>
                <p className="font-semibold ">Get Your Desired Product from Featured Category!</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-10 gap-5 items-center mt-10 px-6 mx-auto">
                    {uniqueCategories &&
                        uniqueCategories.map((category) => {
                            const handleSubmit = (category) => {
                                navigate(`/products?category=${category}`);
                            };
                            return (
                                <div
                                    className="bg-white py-8 border-2 border-blue-800 rounded-3xl text-center cursor-pointer ease-in duration-200 hover:bg-blue-900 hover:text-white"
                                    key={category}
                                    onClick={() => handleSubmit(category)}
                                >
                                    <h5 className="font-semibold text-md lg:text-md">{category}</h5>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Categories;
