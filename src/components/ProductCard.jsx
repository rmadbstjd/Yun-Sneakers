import React,{useState,useEffect} from 'react';
import styles from './css/ProductCard.module.css';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
import {HiHeart} from 'react-icons/hi';
const ProductCard = ({product}) => {
    const [state,setState] = useState();
    useEffect(() => {
        if(product.length ===undefined) {
            setState(product);
        }
        else if (product.length===1) {
            setState(product[0]);
        }
    },[])
   
    const {setCurrentProduct} = useStore();
    const navigate = useNavigate();
    const goToDetail = () => {
       
        setCurrentProduct(state);
       
        navigate(`/products/${state.id}`)
    }
    
    return (
        <div className={styles.card} onClick={goToDetail}>
            <img className={styles.img}src={state && state.image}></img>
            <div className={styles.categoryContainer}>
                <div className={styles.category}>{state && state.category}</div>
                
            </div>
            <div className={styles.info}>
                <div>{state && state.description} </div>
                <div className={styles.name}>{state && state.name}</div>
                <div className={styles.priceContainer}>
                    <div className={styles.price}>{state && state.price}원</div>
                    <div className={styles.heartContainer}><HiHeart className={styles.heart}/><div className={styles.num}>{state && state.likeNum}</div>
                </div>
                </div>
            </div>
            
            
        </div>
    );  
};

export default ProductCard;