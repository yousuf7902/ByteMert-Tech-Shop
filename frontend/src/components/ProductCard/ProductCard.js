import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/slices/cartSlice";
import { backend_url } from "../../server";

const ProductCard = (data) => {
    const { name, image, _id, price, countInStock } = data.productData;
    const productName = name.replace(/\s+/g, " ");
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const {allProducts} = useSelector(state => state.products);
    const {userInfo } = useSelector((state) => state.users);
     
    const cartHandler = () => {
        const product = allProducts.find((p) => p.name === productName);
        dispatch(addToCart({ ...product, qty:1 }));
    }

    return (
        <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-3  relative cursor-pointer text-blue-900 transition-all duration-300 ease-in hover:translate-y-1.5">
            <div className="flex justify-end"></div>
            <Link to={`/products/${productName}`}>
                <img
                    src={`${backend_url}/images/${image}`}
                    alt={_id}
                    className="w-full h-[200px] object-full border-2 rounded-lg border-blue-200"
                />
            </Link>
            <Link to={`/products/${productName}`}>
                <h4 className="py-3 font-semibold text-start">
                    <span className="hidden sm:inline">
                        {name.length > 30 ? name.slice(0, 30) + "..." : name}
                    </span>
                    <span className="inline sm:hidden ">{name}</span>
                </h4>
            </Link>

            <div className="py-2">
                <Rating
                    rating={data.productData.rating}
                    text={`${data.productData.numReviews} reviews`}
                />
            </div>

            <div className="flex justify-between items-center mt-2">
                <h4>
                    {price && countInStock > 0 ? (
                        <div className="font-semibold">
                            <span className="text-2xl">{price}</span>
                            <span className="text-3xl ml-1">৳</span>
                        </div>
                    ) : (
                        <div className="font-semibold text-red-600">
                            <del className="text-2xl">{price}</del>
                            <span className="text-3xl ml-1">৳</span>
                        </div>
                    )}
                </h4>
                <h4 className="px-2 text-xl">
                    {countInStock === 0 ? (
                        <span className="text-red-600 text-base font-semibold">Out of stock</span>
                    ) : countInStock < 10 ? (
                        <div>
                            <span className="text-red-600 text-base font-semibold pr-2">
                                Low Stock
                            </span>
                            <span className="text-xl font-semibold">{countInStock}</span>
                        </div>
                    ) : (
                        <div>
                            <span className="text-green-600 text-base font-semibold pr-2">
                                In Stock
                            </span>
                            <span className="text-xl font-semibold">{countInStock}</span>
                        </div>
                    )}
                </h4>
            </div>

            {/* Side options */}
            {!userInfo?.isAdmin && (
                <div>
                    {countInStock > 0 ? (
                        <AiOutlineShoppingCart
                            size={40}
                            className="cursor-pointer absolute top-[20px] right-[20px] text-white p-[8px] bg-blue-900 rounded-full hover:bg-blue-700"
                            onClick={cartHandler}
                            title="Add to cart"
                        />
                    ) : (
                        <AiOutlineShoppingCart
                            size={40}
                            className="absolute top-[20px] right-[20px] text-white p-[8px] bg-blue-300 rounded-full"
                            disabled
                            title="Add to cart"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCard;
