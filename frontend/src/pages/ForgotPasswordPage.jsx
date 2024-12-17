import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            `${server}/users/forgot-password`,
            {
                email,
                password,
            },
            { withCredentials: true }
        ).then((res)=>{
            toast.success(res.data.message);
            navigate("/login")
        }).catch((err)=>{
            toast.error(err.response.data.message);
            setEmail("");
            setPassword("");
        });
    };

    return (
        <div>
            <div className="min-h-[70vh] bg-gray-50 flex flex-col justify-center items-center sm:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-2 text-center 400px:text-2xl sm:text-3xl font-extrabold text-blue-900">
                        Change your password
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md 400px:w-11/12 400px:px-2">
                    <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
                        {/* Registration Form starts here....*/}
                        <form action="" className="space-y-4" onSubmit={handleSubmit}>
                            {/* Email area */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-lg font-medium text-blue-800"
                                >
                                    Email Address:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                    />
                                </div>
                            </div>
                            {/* Password area */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-lg font-medium text-blue-800"
                                >
                                    Reset Password:
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        type={visible ? "text" : "password"}
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full p-2 border border-gray-400
                                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-blue-800 focus:border-blue-800 focus:border-2 sm:text-lg"
                                    />
                                    {visible ? (
                                        <AiOutlineEye
                                            className="absolute right-2 top-3 cursor-pointer"
                                            size={25}
                                            onClick={() => setVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="absolute right-2 top-3 cursor-pointer"
                                            size={25}
                                            onClick={() => setVisible(true)}
                                        />
                                    )}
                                </div>
                            </div>
                           
                            {/* Submit Button area */}
                            <div>
                                <button
                                    type="submit"
                                    className="grout relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-900 hover:bg-blue-800 mt-4"
                                >
                                    Password Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
