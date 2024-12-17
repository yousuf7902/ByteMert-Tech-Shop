import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet, Navigate} from "react-router-dom"

const PrivateRoute = () => {
    const {isAuthenticated}=useSelector(state => state.users);

  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}</>;
}

export default PrivateRoute
