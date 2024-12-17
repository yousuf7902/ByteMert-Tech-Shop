import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Redux/slices/cartSlice";
import axios from "axios";
import CheckoutStpes from "../components/CheckoutSteps/CheckoutStpes";

const ShippingPage = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [number, setNumber] = useState(shippingAddress.number || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, number, city, postalCode, country }));
        navigate("/payment");
    };
    return (
        <div className="min-h-[70vh] bg-gray-50 flex flex-col justify-center items-center sm:px-6">
            <CheckoutStpes step1/>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-8 text-center 400px:text-2xl sm:text-3xl font-extrabold text-blue-900">
                    Shipping Details
                </h2>
            </div>

            <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md 400px:w-11/12 400px:px-2">
                <div className="bg-white py-8 px-4 shadow-md border sm:rounded-lg sm:px-10">
                    {/* Shipping Form starts here....*/}
                    <form action="" className="space-y-4" onSubmit={submitHandler}>
                        {/* Mobile phone */}
                        <div>
                            <label
                                htmlFor="number"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Mobile Number:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="number"
                                    required
                                    placeholder="Enter your mobile number..."
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>
                        {/* Address area */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Address:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Enter your address..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>
                        {/* City area */}
                        <div>
                            <label
                                htmlFor="city"
                                className="block text-lg font-medium text-blue-800"
                            >
                                City:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    placeholder="Enter your city..."
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>
                        {/* Post Code area */}
                        <div>
                            <label
                                htmlFor="postalCode"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Postal Code:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="postalCode"
                                    required
                                    placeholder="Enter postal code..."
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>
                        {/* Country area */}
                        <div>
                            <label
                                htmlFor="country"
                                className="block text-lg font-medium text-blue-800"
                            >
                                Country:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    placeholder="Enter country name..."
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                />
                            </div>
                        </div>

                        {/* Submit Button area */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-900 hover:bg-blue-800 mt-4"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
