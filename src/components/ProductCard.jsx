import React from 'react';
import styles from './css/ProductCard.module.css';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
const ProductCard = ({product}) => {
 
    const {setCurrentProduct} = useStore();
    const navigate = useNavigate();
    const goToDetail = () => {
       
        setCurrentProduct(product);
       
        navigate(`/products/${product.id}`)
    }
   
    return (
        <div className={styles.card} onClick={goToDetail}>
            <img className={styles.img}src={product.image}></img>
            <div>{product.category}</div>
            <div className={styles.info}>
                <p>{product.description} </p>
                <p>{product.price}원</p>
            </div>
            
            
        </div>
    );  
};

export default ProductCard;