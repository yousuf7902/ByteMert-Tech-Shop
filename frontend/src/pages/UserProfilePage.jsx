import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar/UserSideBar";
import { FaEdit, FaSave, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../server";
import axios from "axios";
import { updateUser } from "../Redux/slices/userSlice";


const UserProfilePage = () => {
    const [edit, setEdit] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: "",
        email:"",
        address: "",
        phoneNumber: "",
        image: null,
        city: "",
        postalCode: ""
    });

    const { userInfo } = useSelector((state) => state.users);
    const { shippingAddress } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(userInfo.avatar.url)

    useEffect(() => {
        setUserProfile({
            name: userInfo?.name,
            address: shippingAddress.address,
            email: userInfo?.email,
            number: shippingAddress.number,
            image: `${backend_url}/images/${userInfo.avatar?.url}`,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
        });
    }, [userInfo, shippingAddress]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            try {
                await axios.put(
                    "https://bytemert-tech-shop.onrender.com/api/v2/users/profile",
                    userProfile,
                    {
                        withCredentials: true,
                    }
                );
                dispatch(updateUser(userProfile))
            } catch (error) {
                console.error(
                    "Error updating profile:",
                    error.response ? error.response.data : error.message
                );
            }
        }
        setEdit(!edit);
    };

    return (
        <div className="bg-white grid grid-cols-5">
            <div className="col-span-1">
                <UserSideBar />
            </div>
            <div className="col-span-4 my-8 mr-5">
                <div className="grid mx-4 rounded-3xl bg-white border-blue-500">
                    <div className="w-[90%] mx-auto border-[3px] border-blue-900 bg-white rounded-3xl overflow-hidden">
                        <div className="bg-blue-900 px-6 py-4">
                            <h2 className="text-3xl font-extrabold text-white text-center">
                                User Profile
                            </h2>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="text-center">
                                    {userProfile.image !== " " ? (
                                        <img
                                            src={userProfile.image}
                                            alt="User"
                                            className="w-32 h-32 p-1 rounded-full mx-auto border-4 border-blue-900 shadow-lg"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-32 h-32 text-blue-900 mx-auto" />
                                    )}
                                </div>
                                <div className="space-y-4 w-[90%] mx-auto">
                                    <div className="flex flex-col sm:flex-row items-center justify-around">
                                        <div className="w-full sm:w-[46%] mb-4 sm:mb-0">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="name"
                                            >
                                                Name
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border ${
                                                    edit ? "border-blue-500" : "border-gray-300"
                                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                                    edit ? "bg-white" : "bg-gray-200"
                                                }`}
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={userProfile.name}
                                                onChange={(e) =>
                                                    setUserProfile({
                                                        ...userProfile,
                                                        name: e.target.value,
                                                    })
                                                }
                                                readOnly={!edit}
                                            />
                                        </div>
                                        <div className="w-full sm:w-[46%]">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border border-gray-300
                                                rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-200
                                                `}
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={userInfo?.email}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-around">
                                        <div className="w-full sm:w-[46%] mb-4 sm:mb-0">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="address"
                                            >
                                                Address
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border ${
                                                    edit ? "border-blue-500" : "border-gray-300"
                                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                                    edit ? "bg-white" : "bg-gray-200"
                                                }`}
                                                id="address"
                                                type="text"
                                                name="address"
                                                value={userProfile.address}
                                                onChange={(e) =>
                                                    setUserProfile({
                                                        ...userProfile,
                                                        address: e.target.value,
                                                    })
                                                }
                                                readOnly={!edit}
                                            />
                                        </div>
                                        <div className="w-full sm:w-[46%]">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="phoneNumber"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border ${
                                                    edit ? "border-blue-500" : "border-gray-300"
                                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                                    edit ? "bg-white" : "bg-gray-200"
                                                }`}
                                                id="phoneNumber"
                                                type="tel"
                                                name="phoneNumber"
                                                value={userProfile.number}
                                                onChange={(e) =>
                                                    setUserProfile({
                                                        ...userProfile,
                                                        phoneNumber: e.target.value,
                                                    })
                                                }
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-around">
                                        <div className="w-full sm:w-[46%] mb-4 sm:mb-0">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="city"
                                            >
                                                City
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border ${
                                                    edit ? "border-blue-500" : "border-gray-300"
                                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                                    edit ? "bg-white" : "bg-gray-200"
                                                }`}
                                                id="address"
                                                type="text"
                                                name="address"
                                                value={userProfile.city}
                                                onChange={(e) =>
                                                    setUserProfile({
                                                        ...userProfile,
                                                        city: e.target.value,
                                                    })
                                                }
                                                readOnly={!edit}
                                            />
                                        </div>
                                        <div className="w-full sm:w-[46%]">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="postalCode"
                                            >
                                                Postal Code
                                            </label>
                                            <input
                                                className={`w-full px-3 py-2 border ${
                                                    edit ? "border-blue-500" : "border-gray-300"
                                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                                    edit ? "bg-white" : "bg-gray-200"
                                                }`}
                                                id="phoneNumber"
                                                type="tel"
                                                name="phoneNumber"
                                                value={userProfile.postalCode}
                                                onChange={(e) =>
                                                    setUserProfile({
                                                        ...userProfile,
                                                        postalCode: e.target.value,
                                                    })
                                                }
                                                readOnly={!edit}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    {edit ? (
                                        <button
                                            className="flex items-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                                            type="submit"
                                        >
                                            <FaSave className="mr-2" />
                                            Save Changes
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex items-center bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            <FaEdit className="mr-2" />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
