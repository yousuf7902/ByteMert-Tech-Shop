import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, fetchAllProducts } from "../../Redux/slices/productsSlice";
import UserSideBar from "../../components/UserSideBar/UserSideBar";
import { backend_url } from "../../server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProductListPage = () => {
    const dispatch = useDispatch();
    const [productAdd, setProductAdd] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const { allProducts } = useSelector((state) => state.products);
    const navigate = useNavigate();
    
    const uniqueCategories = [...new Set(allProducts.map((item) => item.category))];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const filteredProducts = allProducts.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "" || product.category === selectedCategory)
        );
    });


    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [productAdd]);

    const createProductHandler = () => {
        setProductAdd(!productAdd);
    };

    const [image, setImage] = useState(null);
    const [productData, setProductData] = useState({
        name: "",
        price: 0,
        brand: "",
        category: "",
        countInStock: 0,
        description: "",
    });


    const handleImages = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(value === ' '){
            setNewCategory(true);
        }
        else{
            setProductData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newFormData = new FormData();
        newFormData.append("file", image);
        for (const key in productData) {
            newFormData.append(key, productData[key]);
        }

        dispatch(createProduct(newFormData)).then(() => {
            toast.success("Product create successfully");
        });
        setProductData({
            name: "",
            price: 0,
            brand: "",
            category: "",
            countInStock: 0,
            description: "",
        });

        setImage(null);
        setNewCategory(false);

        // Reset file input
        if (e.target.querySelector('input[type="file"]')) {
            e.target.querySelector('input[type="file"]').value = "";
        }
    };

    const productEditHandler = (p_id) => {
        navigate(`${p_id}/edit`);
    };

    const productDeleteHandler = (p_id) => {
        dispatch(deleteProduct(p_id)).then(() => {
            toast.success("Product delete successfully");
            window.location.reload();
        });
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 grid grid-cols-5 gap-5 min-h-screen">
            <div className="col-span-1">
                <UserSideBar />
            </div>
            <div className="col-span-4 my-8 mr-5">
                {productAdd ? (
                    <>
                        <div className="flex flex-col gap-5 items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-center text-blue-900">
                                Create Product
                            </h2>
                            <button
                                type="button"
                                className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                onClick={createProductHandler}
                            >
                                Product List
                            </button>
                        </div>
                        <div className="w-[60%] mx-auto shadow-md rounded bg-white">
                            <form
                                onSubmit={handleSubmit}
                                className=" mx-auto p-5 divide-y divide-gray-200"
                            >
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col gap-2">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={productData.name}
                                            onChange={handleChange}
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
                                            value={productData.price}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="file-input">Upload Image:</label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="file-input"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleImages}
                                            className="py-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Brand</label>
                                        <input
                                            type="text"
                                            name="brand"
                                            value={productData.brand}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Brand name"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Category</label>
                                        <select
                                            name="category"
                                            value={productData.category}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            required={!newCategory}
                                        >
                                            <option value="">Select a category</option>
                                            {uniqueCategories.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                            <option value=" ">+ Add new category</option>
                                        </select>
                                        {newCategory && (
                                            <div className="flex mt-2">
                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={productData.category}
                                                    onChange={handleChange}
                                                    className="px-4 py-2 
                                                    border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                    placeholder="New category name"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Count In Stock</label>
                                        <input
                                            type="number"
                                            name="countInStock"
                                            value={productData.countInStock}
                                            onChange={handleChange}
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
                                            value={productData.description}
                                            onChange={handleChange}
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
                ) : (
                    <>
                        {" "}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-center text-blue-900">
                                Product List
                            </h2>
                            <button
                                type="button"
                                className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                                onClick={createProductHandler}
                            >
                                Create Product
                            </button>
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <div className="w-1/3">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="w-1/3">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Categories</option>
                                    {uniqueCategories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto shadow-lg rounded-lg h-[100vh]">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-blue-900 text-white">
                                        <th className="py-3 px-4 text-center">Image</th>
                                        <th className="py-3 px-4 text-center">Name</th>
                                        <th className="py-3 px-4 text-center">Price</th>
                                        <th className="py-3 px-4 text-center">Category</th>
                                        <th className="py-3 px-4 text-center">Brand</th>
                                        <th className="py-3 px-4 text-center">In Stock</th>
                                        <th className="py-3 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, index) => (
                                        <tr
                                            key={product.id}
                                            className={
                                                product.countInStock > 0
                                                    ? index % 2 === 0
                                                        ? "bg-gray-100 text-blue-900 font-semibold"
                                                        : "bg-white text-blue-900 font-semibold"
                                                    : "bg-red-200 text-blue-900 font-semibold"
                                            }
                                        >
                                            <td className="py-2 px-4 text-center">
                                                <img
                                                    src={`${backend_url}${product.image}`}
                                                    alt={product.name}
                                                    className="w-[50px] h-[50px] object-cover rounded-full border-2 border-blue-900 mx-auto"
                                                />
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {product.name}
                                            </td>
                                            <td className="py-2 px-4 text-center font-semibold text-green-600">
                                                {product.price}{" "}
                                                <span className="text-xl sm:text-xl ml-1 text-center">
                                                    ৳
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {product.category}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {product.brand}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {product.countInStock ? (
                                                    <span className="inline-block px-4 py-2 text-xs font-bold text-green-900 bg-green-200 rounded-full">
                                                        {product.countInStock}
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm mr-2 hover:bg-blue-600 transition duration-300"
                                                    onClick={() => productEditHandler(product._id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition duration-300"
                                                    onClick={() =>
                                                        productDeleteHandler(product._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProductListPage;
