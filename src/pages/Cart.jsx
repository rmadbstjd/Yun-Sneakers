import React, {useEffect, useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import useStore from '../store';
import {useQuery} from '@tanstack/react-query';
import { getProducts,getCart } from '../api/firebase';

import CartProduct from '../components/CartProduct';
import styles from './css/Cart.module.css';

const Cart =  () => {
    const {initTotalCount, initTotalPrice, totalPrice,cart} = useStore();
    const [state,setState] = useState(false);
    const {isLoading, error, data:cartProducts} = useQuery(["1",state], () => (getCart(email.split('.')[0])));

    const [zz, setZZ] = useState(0);
    const email = localStorage.getItem('email');
    const isLogin = localStorage.getItem('email');
    
    useEffect(() => {
        
            cart.addCart();
            initTotalCount(0);
            setZZ(0);
        
        
       
        
        cartProducts && cartProducts.map(item => setZZ((prev) => prev + item.price ));
        cartProducts && initTotalCount(cartProducts.length);
       

    },[cartProducts]);
    useEffect(() => {
        
        cartProducts && initTotalPrice(zz);
    },[zz])
    if(!isLogin) {
        
        return <Navigate to="/" replace></Navigate>
    }
    
    return (
        <div className={styles.container}>
            
            <div className={styles.productsContainer}>
                <div className={styles.menuContainer}>
                    <div className={styles.text}>Order / Payment</div>
                   
                </div>
                <div className={styles.test}>
                    <div className={styles.menu}>
                        <div>상품명(옵션)</div>
                        <div>수량</div>
                        <div>주문관리</div>
                    </div>
                </div>
               
                
                {cartProducts && cartProducts.map(item => <CartProduct  key ={item.id}item ={item} setState={setState}/>)}
             
                <div className={styles.payContainer}>
                <div className={styles.productPrice}>
                    <div className={styles.name}>상품 총액</div>
                    
                    <div className={styles.name2}>{totalPrice}원</div>
                    
                </div>
                <div className={styles.symbol}> + </div>
                <div className={styles.deliveryPrice}>
                <div className={styles.name}>배송비</div>
                <div className={styles.name2}>3000원</div>
                </div>
                <div className={styles.symbol}>  = </div>
                <div className={styles.lastPrice}>
                <div className={styles.name}>총 결제 금액</div>
                <div className={styles.name2}>{totalPrice + 3000}원</div>
                </div>
            </div>
            
            </div>
        </div>
    );
};

export default Cart;