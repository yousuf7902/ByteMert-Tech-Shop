import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
    LoginPage,
    SignupPage,
    ActivationPage,
    HomePage,
    ProductPage,
    ProductsPage,
    LatestProducts,
    BestSellingProducts,
    CartPage,
    UserProfilePage,
    ShippingPage,
    PaymentPage,
    PlaceOrderPage,
    ChangePasswordPage,
    OrderSuccessPage,
    UserOrdersPage,
    AdminOrderListPage,
    AdminDashboardPage,
    AdminProductListPage,
    AdminUserListPage,
    AdminProductEditPage,
    AdminCouponPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Redux/store.js";
import { loadUser } from "./Redux/actions/user.js";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";
import UserCouponPage from "./pages/UserCouponPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

const Main = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/order-success" && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
                <Route path="/activation/:activation_token" element={<ActivationPage />} />
                <Route path="/products/:name" element={<ProductPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/latest-products" element={<LatestProducts />} />
                <Route path="/products/best-selling" element={<BestSellingProducts />} />
                <Route path="/shopping-cart" element={<CartPage />} />

                <Route path="" element={<PrivateRoute />}>
                    <Route path="/users/profile" element={<UserProfilePage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/placeorder" element={<PlaceOrderPage />} />
                    <Route path="users/profile/my-orders" element={<UserOrdersPage />} />
                    <Route path="/users/profile/change-password" element={<ChangePasswordPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/order-success/:_id" element={<OrderSuccessPage />} />
                    <Route path="/users/profile/my-coupons" element={<UserCouponPage />} />
                </Route>

                <Route path="" element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/orderslist" element={<AdminOrderListPage />} />
                    <Route path="/admin/productslist" element={<AdminProductListPage />} />
                    <Route path="/admin/productslist/:id/edit" element={<AdminProductEditPage />} />
                    <Route path="/admin/userslist" element={<AdminUserListPage />} />
                    <Route path="/admin/allcoupons" element={<AdminCouponPage />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {location.pathname !== "/users/profile" &&
                location.pathname !== "/order-success" &&
                location.pathname !== "/users/profile/my-orders" &&
                location.pathname !== "/admin" &&
                location.pathname !== "/admin/orderslist" &&
                location.pathname !== "/admin/productslist" &&
                location.pathname !== "/admin/userslist" &&
                location.pathname !== "/admin/allcoupons" && <Footer />}
        </>
    );
};

const App = () => {
    useEffect(() => {
        Store.dispatch(loadUser());
    }, []);
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
};

export default App;
