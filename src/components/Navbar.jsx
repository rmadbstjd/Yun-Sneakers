import React, {useEffect, useState} from 'react';
import {AiOutlineShopping, AiOutlineShoppingCart} from 'react-icons/ai';
import {BsFillPencilFill} from 'react-icons/bs';
import styles from './css/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { login, logout } from './../api/firebase';
import useStore from '../store';
const Navbar = () => {
    const navigate = useNavigate();
    const {user,setUser} = useStore();
    const [token, setToken] = useState('');
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        console.log("실행됨???");
        
    },[token]);
    const handleLogin = () => {
        login().then(user=>setUser(user));
        
        
    };
    const handleLogout = () => {
        logout().then(user => setUser(user));
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
                    <AiOutlineShoppingCart  className={styles.cartImg} size={40} onClick={() =>{navigate('/cart')}}/>
                    <BsFillPencilFill size={28} className={styles.pencilImg} onClick={() =>{navigate('/new')}}/>
                    {token?<div style={{backgroundImage:"url("+`${localStorage.getItem('img')}`+")"}} className={styles.userImg}></div>:null}
                    {token?<div className={styles.name}>{localStorage.getItem('name')}</div>:null}
                    {!token?<div onClick ={handleLogin}>Login</div>:<div onClick={handleLogout}>Logout</div>}
                    
               </div>
               
                </div>
                
               
            </div>
            <div className={styles.container}>
           <div style={{backgroundImage:"url(https://cdn.pixabay.com/photo/2017/09/09/11/52/t-shirts-2731768_960_720.jpg)"}}className={styles.img}>Shop With Us</div>
            </div>
            
         </div>
    );
};

export default Navbar;