import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import useStore from '../store';
import {useQuery} from '@tanstack/react-query';
import CartProduct from '../components/CartProduct';
import styles from './css/Cart.module.css';
import {useNavigate} from 'react-router-dom';
const Cart =  () => {
    const navigate = useNavigate();
    const {cart} = useStore();
    const [state,setState] = useState(false);
    const {isLoading, error, data:cartProducts} = useQuery(["1"], () => cart.getCartsTest());
    cartProducts && console.log("cartsProducts",cartProducts.success);
    const isLogin = localStorage.getItem('email');
    const goToMain = () => {
        navigate('/');
    };
    if(!isLogin) {
        
        return <Navigate to="/" replace></Navigate>
    }
    if(cartProducts === null) {
        return <div className={styles.nullContainer}>
                    <div className={styles.nullContent}>
                        <div className={styles.horizonLine}></div>
                        <div className={styles.nullText}>장바구니에 담은 상품이 없습니다.</div>
                        <div className={styles.nullBoxContainer}>
                            <div  onClick={goToMain}className={styles.nullBox}>CONTINUE SHOPPING</div>
                         </div>
                         <div className={styles.horizonBottomLine}></div>
                    </div>
                    
                    
                </div>
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
                {cartProducts && cartProducts.products.map(item => <CartProduct  key ={item.id}item ={item} setState={setState} />)}
                
                <div className={styles.payContainer}>
                <div className={styles.productPrice}>
                    <div className={styles.name}>상품 총액</div>
                    
                    <div className={styles.name2}>원</div>
                    
                </div>
                <div className={styles.symbol}> + </div>
                <div className={styles.deliveryPrice}>
                <div className={styles.name}>배송비</div>
                <div className={styles.name2}>3000원</div>
                </div>
                <div className={styles.symbol}>  = </div>
                <div className={styles.lastPrice}>
                <div className={styles.name}>총 결제 금액</div>
                <div className={styles.name2}>{3000}원</div>
                </div>
            </div>
            
            </div>
        </div>
    );
};

export default Cart;