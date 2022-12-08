import React, {useEffect, useState} from 'react';
import {AiOutlineShopping, AiOutlineShoppingCart} from 'react-icons/ai';
import {BsFillPencilFill} from 'react-icons/bs';
import styles from './css/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { login, logout, adminUser } from './../api/firebase';
import useStore from '../store';
const Navbar = () => {
    const navigate = useNavigate();
    
    const [token, setToken] = useState('');
    const [admin ,setAdmin] = useState('');
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        
        
    },[token,admin]);
    const handleLogin = async() => {
        await login();
        const email = localStorage.getItem('email');
        if(email) {
            localStorage.setItem("admin",(await adminUser(localStorage.getItem('email'))));
        };    
        window.location.replace('/');
    };
    const handleLogout = () => {
        logout();
        localStorage.clear();
        setToken('');
        
    };
    
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.navbarContainer}>
                    <div className={styles.navbarLeftContainer} onClick={() =>{navigate('/')}}>
                        <AiOutlineShopping size={45}/>
                        <div className={styles.shopName}>Yun's Shop</div>
                    </div>
                    <div className={styles.navbarRightContainer} >
                        <div onClick={() =>{navigate('/products')}} className={styles.products}>Products</div>
                        {token?<AiOutlineShoppingCart  className={styles.cartImg} size={40} onClick={() =>{navigate('/cart')}}/>:null}
                        {token&& localStorage.getItem('admin') === 'true'?<BsFillPencilFill size={28} className={styles.pencilImg} onClick={() =>{navigate('/new')}}/>:null}
                        {token?<div style={{backgroundImage:"url("+`${localStorage.getItem('img')}`+")"}} className={styles.userImg}></div>:null}
                        {token?<div className={styles.name}>{localStorage.getItem('name')}</div>:null}
                        {!token?<button onClick ={handleLogin} className={styles.button}>Login</button>:<button onClick={handleLogout} className={styles.button}>Logout</button>}
                    
                    </div>
               
                </div>
                
               
            </div>

            
         </div>
    );
};

export default Navbar;