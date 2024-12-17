import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { FaListUl } from "react-icons/fa6";
import { CiLogout, CiUnlock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/slices/userSlice";
import { backend_url } from "../../server";
import { FaBars } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { RiCoupon3Line } from "react-icons/ri";
import { RiCoupon3Fill } from "react-icons/ri";

const UserSideBar = () => {
    const { userInfo } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    return (
        <div className="flex h-screen">
            {/* Hamburger button for small and medium screens */}
            <button
                className="md:hidden fixed top-4 left-4 z-30 p-2 bg-blue-900 text-white rounded-md"
                onClick={toggleSidebar}
            >
                <FaBars size={24} />
            </button>

            {/* Sidebar */}

            {userInfo.isAdmin ? (
                <aside
                    className={`z-20 flex-shrink-0 w-64 sm:w-72 md:w-80 px-3 sm:px-4 md:px-5 overflow-y-auto bg-gradient-to-br from-blue-100 to-indigo-100 shadow-md drop-shadow-xl transition-all duration-300 ease-in-out ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 fixed md:static h-[120vh]`}
                >
                    <div>
                        <div className="text-blue-900">
                            <div className="flex py-4 sm:py-5 md:py-6 items-center justify-center"></div>
                            <div className="flex flex-col items-center justify-center">
                                {userInfo.avatar?.url ? (
                                    <img
                                        className="p-1 h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] rounded-full object-cover mr-2 border-4 border-blue-900"
                                        src={`${backend_url}${userInfo.avatar.url}`}
                                        alt="User Avatar"
                                    />
                                ) : (
                                    <div className="p-1 h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] rounded-full mr-2 border-4 border-blue-900 bg-gray-200 flex items-center justify-center">
                                        <RxAvatar className="h-full w-full text-gray-500" />
                                    </div>
                                )}
                                <p className="font-bold text-lg sm:text-xl text-blue-900 mt-3 sm:mt-4 md:mt-5 text-center">
                                    {userInfo?.name}
                                </p>
                            </div>
                            <div className="text-blue-900 text-lg sm:text-xl font-semibold flex flex-col justify-center items-center">
                                <ul className="mt-6 sm:mt-7 md:mt-8 ml-2 sm:ml-3 md:ml-4 leading-8 sm:leading-9 md:leading-10 w-full">
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link to="/admin" className="flex items-center">
                                            <CgProfile
                                                size={24}
                                                className="sm:text-[26px] md:text-[30px]"
                                            />
                                            <span className="ml-2">Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link
                                            to="/admin/productslist"
                                            className="flex items-center"
                                        >
                                            <MdProductionQuantityLimits
                                                size={25}
                                                className="sm:text-[22px] md:text-[25px]"
                                            />
                                            <span className="ml-3">Products</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link to="/admin/orderslist" className="flex items-center">
                                            <FaListUl
                                                size={20}
                                                className="sm:text-[22px] md:text-[25px]"
                                            />
                                            <span className="ml-3">All Orders</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link to="/admin/userslist" className="flex items-center">
                                            <LuUsers2
                                                size={25}
                                                className="sm:text-[22px] md:text-[25px]"
                                            />
                                            <span className="ml-3">All Users</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link to="/admin/allcoupons" className="flex items-center">
                                            <RiCoupon3Line
                                                size={25}
                                                className="sm:text-[22px] md:text-[25px]"
                                            />
                                            <span className="ml-3">Coupons</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link
                                            to="/users/profile/change-password"
                                            className="flex items-center"
                                        >
                                            <CiUnlock
                                                size={25}
                                                className="sm:text-[26px] md:text-[30px]"
                                            />
                                            <span className="ml-2">Change Password</span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="w-full mt-4 sm:mt-5 flex items-center">
                                    <button
                                        className="w-[85%] mx-auto px-3 sm:px-4 py-1 sm:py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-start flex items-center gap-2"
                                        onClick={logoutHandler}
                                    >
                                        <CiLogout
                                            size={20}
                                            className="sm:text-[22px] md:text-[25px]"
                                        />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            ) : (
                <aside
                    className={`z-20 flex-shrink-0 w-64 sm:w-72 md:w-80 px-3 sm:px-4 md:px-5 overflow-y-auto bg-gradient-to-br from-blue-100 to-indigo-100 shadow-md drop-shadow-xl transition-all duration-300 ease-in-out ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 fixed md:static h-full`}
                >
                    <div>
                        <div className="text-blue-900">
                            <div className="flex py-4 sm:py-5 md:py-6 items-center justify-center">
                                <div className="text-center text-lg sm:text-xl">
                                    <p className="font-bold italic">USER DASHBOARD</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    className="p-1 h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] rounded-full object-cover mr-2 border-4 border-blue-900"
                                    src={`${backend_url}${userInfo.avatar?.url}`}
                                    alt="User"
                                />
                                <p className="font-bold text-lg sm:text-xl text-blue-900 mt-3 sm:mt-4 md:mt-5 text-center">
                                    {userInfo?.name}
                                </p>
                            </div>
                            <div className="text-blue-900 text-lg sm:text-xl font-semibold flex flex-col justify-center items-center">
                                <ul className="mt-6 sm:mt-7 md:mt-8 ml-2 sm:ml-3 md:ml-4 leading-8 sm:leading-9 md:leading-10 w-full">
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link to="/users/profile" className="flex items-center">
                                            <CgProfile
                                                size={24}
                                                className="sm:text-[26px] md:text-[30px]"
                                            />
                                            <span className="ml-2">Profile</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link
                                            to="/users/profile/my-orders"
                                            className="flex items-center"
                                        >
                                            <FaListUl
                                                size={20}
                                                className="sm:text-[22px] md:text-[25px]"
                                            />
                                            <span className="ml-3">Orders</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link
                                            to="/users/profile/my-coupons"
                                            className="flex items-center"
                                        >
                                            <RiCoupon3Fill
                                                size={20}
                                                className="sm:text-[22px] md:text-[25px]"
                                            />
                                            <span className="ml-3">Coupons</span>
                                        </Link>
                                    </li>
                                    <li className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-white rounded-md">
                                        <Link
                                            to="/users/profile/change-password"
                                            className="flex items-center"
                                        >
                                            <CiUnlock
                                                size={24}
                                                className="sm:text-[26px] md:text-[30px]"
                                            />
                                            <span className="ml-2">Change Password</span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="w-full mt-4 sm:mt-5 flex items-center">
                                    <button
                                        className="w-[85%] mx-auto px-3 sm:px-4 py-1 sm:py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-start flex items-center gap-2"
                                        onClick={logoutHandler}
                                    >
                                        <CiLogout
                                            size={20}
                                            className="sm:text-[22px] md:text-[25px]"
                                        />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            )}

            {/* Overlay for small and medium screens when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default UserSideBar;
