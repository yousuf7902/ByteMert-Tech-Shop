import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/Logo.png";
import products from "../../static/products";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/slices/cartSlice";
import { backend_url } from "../../server";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState("");
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated, userInfo } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const {allProducts} = useSelector(state => state.products);

    useEffect(() => {
        dispatch(addToCart);
    }, [dispatch]);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const fillteredData =
            allProducts &&
            allProducts.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase())
            );

        setSearchData(fillteredData);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setSearchData([]);
    };

    const handleSearchResultClick = (productName) => {
        clearSearch();
        navigate(`/products/${productName}`);
    };

    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    const cartHandler = () => {
        navigate("/shopping-cart");
    };

    return (
        <>
            <div className="w-[96%] mx-auto">
                <div className="hidden 800px:h-[100px] 800px:flex 800px:justify-start 800px:gap-10 items-center 1000px:justify-between 800px:px-6 800px:pt-3">
                    <div className="">
                        <Link to="/">
                            <img src={logo} alt="logo" className=" w-28 h-16 sm:w-44 sm:h-20" />
                        </Link>
                    </div>

                    {/* Search bar is here */}
                    <div className="800px:w-[50%] 1000px:w-[42%] flex">
                        <input
                            type="text"
                            placeholder="Search your product..."
                            className="px-3 py-  placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:border-2 sm:text-lg font-semibold text-blue-900 800px:w-full 1000px:w-full"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <AiOutlineSearch
                            className="text-white cursor-pointer p-2 bg-blue-900 "
                            size={45}
                        />
                        {searchTerm && searchTerm.length !== 0 ? (
                            <div className="absolute h-[40vh] overflow-y-scroll bg-slate-200 shadow-sm-2 z-[9] p-4 800px:w-[25.5rem] 1000px:w-[40.9rem] top-[5.2rem]">
                                {searchData &&
                                    searchData.map((i, index) => {
                                        const d = i.name;
                                        const product_name = d.replace(/\s+/g, "-");
                                        return (
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    handleSearchResultClick(product_name)
                                                }
                                                className="w-full flex items-start-py-3 mb-3 border border-gray-300 cursor-pointer"
                                            >
                                                <img
                                                    src={`${backend_url}${i.image}`}
                                                    alt="no pic"
                                                    className="w-[50px] h-[50px] mr-[10px]"
                                                />
                                                <h1>{i.name}</h1>
                                            </div>
                                        );
                                    })}
                            </div>
                        ) : null}
                    </div>

                    {/* Cart and Login area */}
                    <div className="flex gap-1">
                        <div className={`${styles.normalFlex}`}>
                            {!userInfo?.isAdmin && (
                                <div className="relative cursor-pointer mr-[15px] font-bold">
                                    <AiOutlineShoppingCart
                                        size={52}
                                        className="text-blue-900 bg-gray-200 p-3 rounded-full border-2 border-blue-900 shadow-md transition ease-linear hover:bg-blue-900 hover:text-white"
                                        onClick={cartHandler}
                                    />
                                    <span className="absolute top-[-8px] right-[-7px] text-sm text-white px-2 py-1 rounded-full bg-blue-900 text-center">
                                        {cartItems.length}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.normalFlex}`}>
                            <div className="relative cursor-pointer mr-[15px] font-bold">
                                {isAuthenticated ? (
                                    userInfo.isAdmin ? (
                                        <Link to="/admin">
                                            <div className="">
                                                <RxAvatar
                                                    size={52}
                                                    className="text-blue-900 bg-gray-200 p-3 rounded-full shadow-md border-2 border-blue-900 transition ease-linear hover:bg-blue-900 hover:text-white"
                                                />
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link to="/users/profile">
                                            <div className="">
                                                <img
                                                    src={`${backend_url}${userInfo.avatar?.url}`}
                                                    className="w-[52px] h-[52px] text-blue-900 rounded-full shadow-md border-2 border-blue-900 p-[2px]"
                                                />
                                            </div>
                                        </Link>
                                    )
                                ) : (
                                    <Link to="/login">
                                        <CgProfile
                                            size={52}
                                            className="text-blue-900 bg-gray-200 p-3 rounded-full shadow-md border-2 border-blue-900 transition ease-linear hover:bg-blue-900 hover:text-white"
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`${
                    active === true ? "shadow-sm fixed top-0 left-0 z-30" : null
                } transition hidden 800px:flex item-center justify-center w-full bg-blue-900 `}
            >
                <div
                    className={`${styles.section} relative ${styles.normalFlex} 1000px:justify-between 800px:justify-center`}
                >
                    {/* Categories sections */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className="relative hidden h-[55px] mt-[10px] w-[250px] 1000px:block">
                            <BiMenuAltLeft
                                size={40}
                                className="absolute top-3 left-2 text-blue-900"
                            />
                            <button
                                className={`h-[100%] w-full flex justify-between items-center pl-[3.1rem] bg-white rounded-t-lg text-blue-900 font-bold text-[1.4rem] select-none`}
                            >
                                Categories
                            </button>

                            <IoIosArrowDown
                                size={32}
                                className="absolute top-4 right-2 cursor-pointer text-blue-900 font-bold"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            {dropDown ? (
                                <DropDown productData={allProducts} setDropDown={setDropDown} />
                            ) : null}
                        </div>
                    </div>
                    {/* Nav items */}
                    <div className={`${styles.normalFlex} p-5 1000px:p-0`}>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
