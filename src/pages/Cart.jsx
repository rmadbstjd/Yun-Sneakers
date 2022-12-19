import React, {useEffect, useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import useStore from '../store';
import { getCart } from '../api/firebase';
import CartProduct from '../components/CartProduct';
import styles from './css/Cart.module.css';

const Cart =  () => {
    const {initTotalCount, initTotalPrice, totalPrice} = useStore();
    const [product, setProduct] = useState('');
    const [zz, setZZ] = useState(0);
    const email = localStorage.getItem('email');
    const isLogin = localStorage.getItem('email');
    useEffect(() => {
        const loadData = async() => {
            
            setProduct(await getCart(email.split('.')[0]));
            
            
        }
        
        loadData();
 

    },[]);
    useEffect(() => {
        if(product .length === 0) {
            
            initTotalCount(0);
        }
        product && product.map(item => setZZ((prev) => prev + item.price ));
        product && initTotalCount(product.length);
        
    },[product])
    useEffect(() => {
        product && initTotalPrice(zz);
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
               
                
                {product && product.map(item => <CartProduct  key ={item.id}item ={item}/>)}
            <div className={styles.payContainer}>
                <div className={styles.productPrice}>
                    <div>상품 총액</div>
                    <div>{totalPrice}원</div>
                    
                </div>
                <div className={styles.deliveryPrice}>
                    배송비
                </div>
                <div className={styles.lastPrice}>
                    총 결제 금액
                </div>
            </div>
            </div>
        </div>
    );
};

export default Cart;