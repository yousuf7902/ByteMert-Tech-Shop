import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, saveUser } from "../../Redux/slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo, isAuthenticated } = useSelector((state) => state.users);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/users/login`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Login Successful...");
                dispatch(saveUser(res.data.user));
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response)
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
                        Login to your account
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
                                    Password:
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
                            {/* Forgot and remember me area */}
                            <div
                                className={`${styles.normalFlex} justify-between 400px:flex-col sm:flex-row`}
                            >
                                <div className={`${styles.normalFlex} mt-2`}>
                                    <input
                                        type="checkbox"
                                        name="remember-me"
                                        id="remember-me"
                                        className="h-4 w-4 border text-blue-950 focus:ring-blue-950 border-blue-950 bg-blue-950"
                                        required
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-500 font-bold"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm mt-2">
                                    <Link to={"/forgot-password"}
                                        className="font-semibold text-blue-600 hover:text-blue-400"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            {/* Submit Button area */}
                            <div>
                                <button
                                    type="submit"
                                    className="grout relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-900 hover:bg-blue-800 mt-4"
                                >
                                    Log In
                                </button>
                            </div>
                            {/* Sign up link area */}
                            <div className={`${styles.normalFlex} w-full`}>
                                <h4>Not have any account?</h4>
                                <Link to="/sign-up" className="text-blue-600 font-semibold ml-2">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
