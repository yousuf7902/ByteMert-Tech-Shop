import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

export default function DropDown(props) {
    const { productData, setDropDown } = props;
    const navigate = useNavigate();

    const uniqueCategories = [...new Set(productData.map((item) => item.category))];

    const submitHandle = (category) => {
        navigate(`/products?category=${category}`);
        setDropDown(false);
        //window.location.reload();
    };

    return (
        <div className="w-[251px] bg-blue-900 absolute z-30 rounded-b-md shadow-sm">
            {productData &&
                uniqueCategories.map((category, index) => (
                    <div
                        key={index}
                        className={`${styles.normalFlex} justify-start pl-4 border-b-2 border-white hover:bg-blue-800`}
                        onClick={() => submitHandle(category)}
                    >
                        <h1 className="text-white p-1 cursor-pointer select-none text-lg font-semibold text-center ">
                            {category}
                        </h1>
                    </div>
                ))}
        </div>
    );
}
