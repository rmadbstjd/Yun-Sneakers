import React,{useState,useEffect} from 'react';
import styles from './css/CartProduct.module.css';
import { removeFromCart } from '../api/firebase';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';

const CartProduct = ({item, boolean, setBoolean}) => {
    const [productCount,setProductCount] = useState(item.quantity);   
    const {cart,setDeletes,setChange} = useStore();
    const navigate = useNavigate();

    useEffect(() => {

        if(boolean==='plus'){
                    
            cart.updateCart(item.productId,item.size,productCount);
            setChange((prev) => !prev);         
        }
        else if(boolean==='minus'){
           
            cart.updateCart(item.productId,item.size,productCount);
            setChange((prev) => !prev);               
        }
    }, [productCount]);
    const email = localStorage.getItem('email');
    const plus = () => {
        if(productCount >=10) {
            alert("최대 구매 갯수는 10개입니다.");
            return;
        }
        setProductCount((prev) => prev + 1);
        setBoolean('plus');
        
    }
    const minus =  () => {
        if(productCount<=1) {
            return;
        }
        setProductCount((prev) => prev - 1);
        setBoolean('minus');
        
    }
    const deleteProduct = () => {
        removeFromCart(email.split('.')[0], item.id);       
        
        cart.deleteCart(item.productId,item.size);
        setDeletes((prev) =>!prev);
    };

    const goToDetail = () => {
        navigate(`/products/${item.productId}`);
    };
    return (
        <div className={styles.container}>
            
            

            <div className={styles.real}>
                <div className={styles.infoContainer}>
                    <div className={styles.img}style={{backgroundImage:"url("+`${item.image}`+")"}} onClick={goToDetail}></div>
                    <div className={styles.infoContent}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.description}>{item.description}</div>
                        
                        <div className={styles.size}>[사이즈] {item.size}</div>
                        <div className={styles.price}>{item.price}원</div>
                    </div>
                </div>
                <div className={styles.real2}>
                    <div className={styles.quantity}>
                            <div className={styles.quantityContent}>
                                <div className={styles.minus} onClick={minus}>-</div>
                                <div className={styles.count}>{productCount}</div>
                                <div className={styles.plus} onClick={plus}>+</div>
                            </div>
                            
                    </div>
                    <div className={styles.deleteContainer}>
                        <div className={styles.delete} onClick={deleteProduct}>
                                삭제하기
                        </div>
                    </div>
                </div>

            </div>
                <div className={styles.horizonLine2}></div>
        </div>
    );    
};

export default CartProduct;