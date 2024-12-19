import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/UserSideBar/UserSideBar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import RecentOrders from "../../components/DashboardRecentOrders/RecentOrders";
import RecentCustomers from "../../components/DashboardRecentCustomer/RecentCustomers";
import TopSellingProducts from "../../components/DashboardTopSellingProducts/TopSellingProducts";
import { getAllOrders } from "../../Redux/slices/orderSlice";
import { fetchAllProducts, fetchProductsByName } from "../../Redux/slices/productsSlice";
import { fetchGetAllUsers } from "../../Redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/Logo.png";

const AdminDashboardPage = () => {
    const { allUsers } = useSelector((state) => state.users);
    const { allProducts } = useSelector((state) => state.products);
    const { allOrders } = useSelector((state) => state.orders);
    const [customers, setCustomers] = useState();
    const [topProducts, setTopProducts] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(fetchAllProducts());
        dispatch(fetchGetAllUsers());
        dispatch(getAllOrders()).then((res) => setCustomers(res.payload.slice(0, 5)));
        dispatch(fetchProductsByName("best-selling")).then((res) =>
            setTopProducts(res.payload.slice(0, 5))
        );
    }, [dispatch]);

    const selles = allOrders?.filter((order) => order.orderStatus === "Delivered");
    const earnings = selles?.reduce((acc, item) => acc + item.itemsPrice, 0);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-[120vh]">
            <div className="max-w-8xl mx-auto flex space-x-5">
                <div>
                    <UserSideBar />
                </div>
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={logo}
                            alt="logo"
                            className=" w-28 h-16 sm:w-[280px] sm:h-[100px]"
                        />
                        <h1 className="text-[40px] text-blue-900 font-bold italic pb-10">DASHBOARD</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <DashboardCard title="Earning" value={`${earnings} ৳`} />
                        <DashboardCard title="Total Selles" value={selles?.length} />
                        <DashboardCard title="Total Products" value={allProducts.length} />
                        <DashboardCard title="Total Users" value={allUsers.length} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <RecentOrders data={allOrders} />
                        </div>
                        <div className="space-y-8">
                            <RecentCustomers data={customers} />
                            <TopSellingProducts data={topProducts} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminDashboardPage;
