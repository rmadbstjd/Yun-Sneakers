import React, {useEffect, useState} from 'react';

import {BsFillPencilFill,BsFillCartFill} from 'react-icons/bs';
import {GiConverseShoe} from 'react-icons/gi';
import {FiSearch} from 'react-icons/fi';
import {BsHeartFill} from 'react-icons/bs';
import {FaUser} from 'react-icons/fa';
import styles from './css/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { login, logout, adminUser } from './../api/firebase';
import Search from '../components/Search';
import useStore from '../store';
import {useQuery} from '@tanstack/react-query';
const Navbar = () => {
    const navigate = useNavigate();
    const {productCount,cartCount,initCartCount,plusCartCount,setText,cart} = useStore();

    const [token, setToken] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [admin] = useState('');
    const {isLoading, error, data:cartProducts} = useQuery([], () => cart.getCartsTest());
    useEffect(() => {
        if(cartProducts){
            initCartCount();
            plusCartCount(cartProducts.products.length);
        }
        setToken(localStorage.getItem("token"));
    },[token,admin,cartProducts]);
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
    const clickToSearch = () => {
        setText(null);
        setShowSearch((prev) => !prev);
        
    };
    console.log("테스트",cartProducts && cartProducts.products.length);
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.navbarContainer}>
                    <div className={styles.navbarLeftContainer} onClick={() =>{navigate('/')}}>
                        <GiConverseShoe size={45}/>
                        <div className={styles.shopName}>Yun's Premium Sneakers</div>
                    </div>
                    <div className={styles.navbarRightContainer} >
                        <FaUser className={styles.mypageImg}/>
                        <div onClick={() =>{navigate('/mypage')}} className={styles.mypage}>MY PAGE</div>
                        <BsHeartFill className={styles.heartImg}/>
                        <div onClick={() =>{navigate('/products')}} className={styles.products}>MY LIKE</div>
                        {token?<BsFillCartFill className={styles.cartImg} size={20} onClick={() =>{navigate('/cart')}}/>:null}
                        {token?<div className={styles.shoppingBag} onClick={() =>{navigate('/cart')}} >SHOPPING BAG</div>:null}
                        {<div className={styles.count}>{cartCount}</div>}
                        {token&& localStorage.getItem('admin') === 'true'?<BsFillPencilFill size={28} className={styles.pencilImg} onClick={() =>{navigate('/new')}}/>:null}
                        <FiSearch className={styles.search} onClick={clickToSearch}/>
                        {!token?<button onClick ={handleLogin} className={styles.button}>Login</button>:<button onClick={handleLogout} className={styles.button}>Logout</button>}

                    </div>               
                </div>               
            </div>
            {showSearch&& <Search setShowSearch={setShowSearch}/>}
        </div>
    );
};

export default Navbar;