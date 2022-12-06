import React from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
const NewProducts = () => {
    let isAdmin = localStorage.getItem('admin');
    if(isAdmin !=='true') {
        console.log("어드민",isAdmin);
        return <Navigate to="/" replace></Navigate>
    }
    
    return (
        <div>
            Make a New Product
        </div>
    );
};

export default NewProducts;