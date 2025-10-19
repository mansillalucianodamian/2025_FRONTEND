import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext.jsx";

const AuthMiddleware = () => {
    const { isLogged } = useContext(AuthContext)
    if (isLogged) {
        return <Outlet />
    }
    else {
        return <Navigate to={"/login"} />
    }
};
export default AuthMiddleware;