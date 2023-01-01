import React,{useState,useEffect} from 'react';
import styles from './css/CartProduct.module.css';
import { removeFromCart } from '../api/firebase';
import useStore from '../store';
const CartProduct = ({item,setState}) => {
    console.log("테스트",item);
    const [count,setCount] = useState(item.quantity);
    const {plusTotalCount, minusTotalCount,deleteTotalCount,plusTotalPrice,minusTotalPrice, minusProductCount, cart} = useStore();
    useEffect(() => {
        cart.updateCart(item.productId,item.size,count);
    }, [count])
    const email = localStorage.getItem('email');
    const plus = () => {
        if(count >=10) {
            alert("최대 구매 갯수는 10개입니다.");
            return;
        }
        setCount((prev) => prev + 1);
        plusTotalCount();
        plusTotalPrice(item.price);
        
    }
    const minus =  () => {
        if(count<=1) {
            return;
        }
        setCount((prev) => prev - 1);
        minusTotalCount();
        minusTotalPrice(item.price);
        
    }
    const deleteProduct = () => {
        removeFromCart(email.split('.')[0], item.id);
        deleteTotalCount(count);
        minusTotalPrice(count * item.price);
        setState((prev) =>!prev);
        minusProductCount();
        cart.deleteCart(item.productId,item.size);
    };
    
    return (
        <div className={styles.container}>
            
            
            <div className={styles.infoContainer}>
                <div className={styles.img}style={{backgroundImage:"url("+`${item.image}`+")"}}></div>
                <div className={styles.infoContent}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.description}>{item.description}</div>
                    
                    <div className={styles.size}>[사이즈] {item.size}</div>
                    <div className={styles.price}>{item.price}원</div>
                </div>
            </div>
            <div className={styles.quantity}>
                    <div className={styles.quantityContent}>
                        <div className={styles.minus} onClick={minus}>-</div>
                        <div className={styles.count}>{count}</div>
                        <div className={styles.plus} onClick={plus}>+</div>
                    </div>
                    
            </div>
            <div className={styles.deleteContainer}>
                <div className={styles.delete} onClick={deleteProduct}>
                        삭제하기
                </div>
            </div>
        </div>
    );    
};

export default CartProduct;