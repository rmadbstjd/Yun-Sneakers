import React from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
const Cart = () => {
    let isLogin = localStorage.getItem('email');
    if(!isLogin) {
        console.log("태스트1");
        return <Navigate to="/" replace></Navigate>
    }
    return (
        <div>
            Cart Page
        </div>
    );
};

export default Cart;