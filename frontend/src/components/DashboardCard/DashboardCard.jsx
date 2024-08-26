import React from 'react'

const DashboardCard = ({ title, value, bgColor = "bg-white", textColor = "text-blue-900" }) => (
    <div
        className={`${bgColor} ${textColor} rounded-lg shadow-lg p-3 flex items-center justify-center transform hover:scale-105 transition-transform duration-300`}
    >
        <div className="border-2 rounded-lg  border-blue-900 w-full h-full text-center p-3">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export default DashboardCard
