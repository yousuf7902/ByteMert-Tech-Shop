import React, { useState } from "react";
import UserSideBar from "../components/UserSideBar/UserSideBar";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { updateUser } from "../Redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.users);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword === confirmPassword) {
            const updateData = {
                currentPassword,
                newPassword,
                email: userInfo.email,
            };
            try {
                await axios.put(
                    "http://localhost:8080/api/v2/users/profile/change-password?",
                    updateData,
                    {
                        withCredentials: true,
                    }
                );
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } catch (error) {
                console.error(
                    "Error updating profile:",
                    error.response ? error.response.data : error.message
                );
            }
        }
        // Handle password change logic here
    };

    return (
        <div className="bg-white grid grid-cols-1 lg:grid-cols-5">
            <div className="hidden lg:block lg:col-span-1">
                <UserSideBar />
            </div>
            <div className="col-span-1 lg:col-span-4 my-12 mx-4 lg:mr-5">
                <div className="max-w-2xl mx-auto">
                    <div className="border-[3px] border-blue-900 bg-white rounded-3xl overflow-hidden">
                        <div className="bg-blue-900 px-6 py-4">
                            <h2 className="text-3xl font-extrabold text-white text-center">
                                Change Password
                            </h2>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="currentPassword"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                id="currentPassword"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() =>
                                                    setShowCurrentPassword(!showCurrentPassword)
                                                }
                                            >
                                                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="newPassword"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                id="newPassword"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="flex items-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <FaLock className="mr-2" />
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
