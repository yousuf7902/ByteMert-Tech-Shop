import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderProducts } from "../../Redux/slices/productsSlice";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";

const SliderProducts = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { sliderProducts } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSliderProducts());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderProducts.length);
        }, 4500);

        return () => clearInterval(interval);
    }, [sliderProducts.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + sliderProducts.length) % sliderProducts.length
        );
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderProducts.length);
    };

    return (
        <div className="relative w-[90%] md:w-[80%] mx-auto md:my-16 shadow-lg flex items-center gap-5">
            <div className="h-64 overflow-hidden rounded-lg md:h-[480px]">
                {sliderProducts.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <img
                            src={`${backend_url}/images/${slide.image}`}
                            className="absolute block w-full h-full object-fill"
                            alt={slide.name}
                        />{" "}
                        <Link to={`/products/${slide.name}`}>
                            <div className="text-white text-2xl py-2 px-10 rounded-md flex items-center justify-between font-semibold bg-blue-900 absolute inset-x-0 bottom-0 z-20">
                                <span>{slide.name}</span>
                                <span>
                                    Price: {slide.price}
                                    <span className="text-xl sm:text-3xl ml-1 text-center">৳</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {sliderProducts.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                        aria-current={index === currentSlide}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-0 left-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={goToPrevSlide}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <FaArrowCircleLeft size={40} className="text-blue-600" />
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={goToNextSlide}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <FaArrowCircleRight size={40} className="text-blue-600" />
                </span>
            </button>
        </div>
    );
};

export default SliderProducts;
