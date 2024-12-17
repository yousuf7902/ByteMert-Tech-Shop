import React from "react";
import logo from "../../img/Logo.png";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterSquare,
    AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="bg-blue-900 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-around gap-[2.5rem] sm:gap-[5rem] sm:text-center lg:px-[2rem] px-[3rem] py-8">
                <ul className="text-center sm:text-start flex sm:block flex-col items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ filter: "brightness(0) invert(1)" }}
                        className="w-[10.5rem] h-[5.5rem]"
                    />
                    <p className=" font-semibold text-md px-2">
                        Explore our tech wonderland - your next gadget gem is just a click away!
                    </p>
                    <div className="flex items-center mt-[15px] ml-1">
                        <AiFillFacebook size={30} className=" cursor-pointer rounded-full" />
                        <AiFillInstagram
                            size={30}
                            className="ml-[10px] cursor-pointer rounded-full"
                        />
                        <AiFillYoutube
                            size={30}
                            className="ml-[10px] cursor-pointer rounded-full"
                        />
                        <AiFillTwitterSquare
                            size={30}
                            className="ml-[10px] cursor-pointer rounded-full"
                        />
                    </div>
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="text-xl font-semibold tracking-[0.25rem] lg:tracking-[0.4rem]">
                        STAY CONNECTED
                    </h1>
                    <p className="text-center sm:text-start text-lg font-bold mt-5 mb-3">
                        ByteMart Ltd
                    </p>
                    <span>
                        Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square, Dhaka 1000
                    </span>
                    <h3 className="text-lg font-bold my-2">Email:</h3>

                    <Link href="#" className="text-lg font-semibold text-blue-200">
                        byteMart@gmail.com
                    </Link>
                </ul>
            </div>

            <div className="text-center p-2">
                <span className="font-semibold text-md">
                    &copy; 2024 ByteMert. All rights reserved
                </span>
            </div>
        </div>
    );
};

export default Footer;
