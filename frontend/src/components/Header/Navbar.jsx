import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ active }) {
    const handleClick = () => {
        setTimeout(() => {
            window.location.reload();
        }, 0);
    };

    return (
        <div className={`${styles.normalFlex}`}>
            <div className="flex text-white text-xl font-semibold 1300px:gap-14 gap-8 pr-5">
                <Link to="/" onClick={handleClick}>
                    Home
                </Link>
                <Link to="/products">Products</Link>
                <Link to="/products/latest-products">Latest Products</Link>
                <Link to="/products/best-selling">Best Selling</Link>
            </div>
        </div>
    );
}
