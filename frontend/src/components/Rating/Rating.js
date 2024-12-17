import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, text }) => {
    return (
        <div className="flex items-center justify-between">
            <div className='flex gap-[8px] text-yellow-400'>
                <span>
                    {rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
                <span>
                    {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
                <span>
                    {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
                <span>
                    {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
                <span>
                    {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
            </div>
            <div>
                <span className="font-semibold px-2">{text ? text : null}</span>
            </div>
        </div>
    );
};

export default Rating
