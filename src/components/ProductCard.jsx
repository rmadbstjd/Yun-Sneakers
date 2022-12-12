import React from 'react';
import styles from './css/ProductCard.module.css';
const ProductCard = ({product}) => {
    console.log("product",product);
    return (
        <div className={styles.card}>
            <img className={styles.img}src={product.image}></img>
            <div>{product.category}</div>
            <div className={styles.info}>
                <p>{product.title} </p>
                <p>{product.price}₩</p>
            </div>
            
            
        </div>
    );  
};

export default ProductCard;