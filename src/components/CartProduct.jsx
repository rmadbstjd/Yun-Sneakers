import React,{useState,useEffect} from 'react';
import styles from './css/CartProduct.module.css';
import { removeFromCart } from '../api/firebase';
import useStore from '../store';
const CartProduct = ({item}) => {
    
    const [count,setCount] = useState(1);
    const {plusTotalCount, minusTotalCount,deleteTotalCount,plusTotalPrice,minusTotalPrice} = useStore();
    
    const email = localStorage.getItem('email');
    const plus = () => {
        if(count >=10) {
            alert("최대 구매 갯수는 10개입니다.");
            return;
        }
        setCount((prev) => prev + 1);
        plusTotalCount();
        console.log("오잉",item.price)
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
        
    };
    
    return (
        <div className={styles.container}>
            
            <div  className={styles.img}style={{backgroundImage:"url("+`${item.url}`+")"}}></div>
            <div className={styles.infoContainer}>
                <div className={styles.description}>{item.description}</div>
                <div>{item.title}</div>
                <div className={styles.size}>{item.size}</div>
                <div>{item.price}원</div>
            </div>
            <div className={styles.quantity}>
                    <div className={styles.minus} onClick={minus}>─</div>
                    <div className={styles.count}>{count}</div>
                    <div className={styles.plus} onClick={plus}>┼</div>
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