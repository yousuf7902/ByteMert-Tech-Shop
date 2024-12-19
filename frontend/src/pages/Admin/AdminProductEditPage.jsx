import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../Redux/slices/productsSlice";
import { toast } from "react-toastify";

const AdminProductEditPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({});
    const { id } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    useEffect(() => {
        dispatch(fetchProductById(id)).then((data) => setProductData(data.payload));
    }, [dispatch, id]);

    useEffect(() => {
        if (productData) {
            setName(productData.name);
            setPrice(productData.price);
            setImage(productData.image);
            setBrand(productData.brand);
            setCategory(productData.category);
            setCountInStock(productData.countInStock);
            setDescription(productData.description);
        }
    }, [productData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProduct = {
            id,
            name,
            price,
            brand,
            category,
            description,
            countInStock,
        };
        dispatch(updateProduct(updatedProduct))
            .then(() => {
                toast.success("Product Edited");
            })
            .then(() => {
                navigate("/admin/productslist");
                window.location.reload();
            });
    };

    const goBackHandler = () => {
        navigate("/admin/productslist");
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-center text-blue-900 p-5">Update Product</h2>
            <div className="flex items-center justify-center w-[75%] mx-auto mb-6">
                <button
                    type="button"
                    className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                    onClick={goBackHandler}
                >
                    Go Back
                </button>
            </div>

            <div className="w-[60%] mx-auto shadow-md rounded bg-white my-8">
                <form onSubmit={handleSubmit} className=" mx-auto p-5 divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="flex flex-col gap-2">
                            <label>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="Product name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="0.00"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="Brand name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="Product category"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Count In Stock</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="0"
                                required
                                min="0"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="Product description"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="pt-4 flex items-center  justify-center space-x-4">
                        <button
                            className="bg-blue-900 flex justify-center items-center w-[35%] text-white px-4 py-3 rounded-md focus:outline-none"
                            type="submit"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminProductEditPage;
