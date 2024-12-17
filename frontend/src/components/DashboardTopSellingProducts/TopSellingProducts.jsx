import React from "react";
import { Link } from "react-router-dom";

const TopSellingProducts = ({ data }) => {
    console.log(data);
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-900">Top Selling Products</h2>
            <div className="divide-y divide-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                                Sold
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data &&
                            data.map((product, index) => (
                                <tr
                                    key={product._id || index}
                                    className={index % 2 === 0 ? "bg-white" : "bg-blue-100"}
                                >
                                    <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600 tracking-wider">
                                        <Link to={`/admin/productslist/${product._id}/edit`}>{product.name}</Link>
                                    </td>
                                    <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600 tracking-wider">
                                        {product.countInStock}
                                    </td>
                                    <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600 tracking-wider">
                                        {product.totalSell}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSellingProducts;
