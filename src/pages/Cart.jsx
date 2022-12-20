import React, {useEffect, useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import useStore from '../store';
import {useQuery} from '@tanstack/react-query';
import { getProducts,getCart } from '../api/firebase';
import CartProduct from '../components/CartProduct';
import styles from './css/Cart.module.css';

const Cart =  () => {
    const [state,setState] = useState(false);
    const {isLoading, error, data:cartProducts} = useQuery(["1",state], () => (getCart(email.split('.')[0])));
    const {initTotalCount, initTotalPrice, totalPrice} = useStore();
    const [zz, setZZ] = useState(0);
    const email = localStorage.getItem('email');
    const isLogin = localStorage.getItem('email');
    
    useEffect(() => {
        
        
            initTotalCount(0);
            setZZ(0);
        
        
       
        
        cartProducts && cartProducts.map(item => setZZ((prev) => prev + item.price ));
        cartProducts && initTotalCount(cartProducts.length);
        console.log("테스트"<cartProducts);

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
            { cartProducts && 
                <div className={styles.payContainer}>
                <div className={styles.productPrice}>
                    <div>상품 총액</div>
                    <div>{totalPrice}원</div>
                    
                </div>
                <div className={styles.deliveryPrice}>
                    <div>배송비</div>
                    <div>3000원</div>
                </div>
                <div className={styles.lastPrice}>
                    <div>총 결제 금액</div>
                    <div>{totalPrice + 3000}</div>
                </div>
            </div>
            }
            </div>
        </div>
    );
};

export default Cart;