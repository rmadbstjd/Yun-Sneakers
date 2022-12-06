import React from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
const ProtectedRoute = () => {
    const navigate = useNavigate();
    let isLogin = localStorage.getItem('email');
    if(!isLogin) {
        console.log("태스트1");
        return <Navigate to="/"></Navigate>
    }
    else {
        return <Navigate to ="/cart"/>
    }
    


};

export default ProtectedRoute;