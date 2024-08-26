import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { clearUpdatedItems } from '../../Redux/slices/orderSlice';

const CheckoutStpes = ({step1, step2, step3}) => {
    const dispatch =useDispatch();
  return (
      <>
          <nav class="flex mt-10 mb-5" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-2 md:space-x-5 rtl:space-x-reverse">
                  <li class="inline-flex items-center">
                      {step1 ? (
                          <Link
                              to="/shipping"
                              className="bg-blue-900 px-4 py-2 rounded-full text-white font-semibold"
                          >
                              Shipping
                          </Link>
                      ) : (
                          <Link
                              className="bg-blue-200 px-4 py-2 rounded-full text-blue-700 font-semibold cursor-not-allowed"
                              disabled
                          >
                              Shipping
                          </Link>
                      )}
                  </li>
                  <FaArrowRight size={25} className="text-blue-900" />
                  <li class="inline-flex items-center">
                      {step2 ? (
                          <Link
                              to="/payment"
                              className="bg-blue-900 px-4 py-2 rounded-full text-white font-semibold"
                          >
                              Payment
                          </Link>
                      ) : (
                          <Link
                              className="bg-blue-200 px-4 py-2 rounded-full text-blue-700 font-semibold cursor-not-allowed"
                              disabled
                          >
                              Payment
                          </Link>
                      )}
                  </li>
                  <FaArrowRight size={25} className="text-blue-900" />
                  <li class="inline-flex items-center">
                      {step3 ? (
                          <Link
                              to="/placeorder"
                              className="bg-blue-900 px-4 py-2 rounded-full text-white font-semibold"
                          >
                              Place Order
                          </Link>
                      ) : (
                          <Link
                              className="bg-blue-200 px-4 py-2 rounded-full text-blue-700 font-semibold cursor-not-allowed"
                              disabled
                          >
                              Place Order
                          </Link>
                      )}
                  </li>
              </ol>
          </nav>
      </>
  );
}

export default CheckoutStpes
