import React, { useEffect, useState } from 'react'
import { fetchGetAllUsers } from '../../Redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../Redux/slices/orderSlice';

const RecentCustomers = ({data}) => {
  return (
      <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-blue-900">Recent Customers</h2>
          </div>
          <div className="divide-y divide-gray-200">
              <table className="w-full">
                  <thead className="bg-gray-50">
                      <tr>
                          <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                              Name
                          </th>
                          <th className="px-4 py-2 text-left text-base font-semibold text-blue-900 uppercase tracking-wider">
                              Email
                          </th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.map((customer, index)=> (
                        <tr className={index % 2 ? "bg-blue-100" : "bg-white"}>
                            <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600 tracking-wider">
                                {customer.user.name}
                            </td>
                            <td className="px-4 py-2 text-left text-sm font-semibold text-blue-600  tracking-wider">
                                {customer.user.email}
                            </td>
                        </tr>
                    ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default RecentCustomers

