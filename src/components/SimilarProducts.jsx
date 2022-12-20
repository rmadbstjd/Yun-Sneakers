import React from 'react';
import styles from './css/SimilarProducts.module.css';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
import { getProductInfo,getSimilarProducts } from '../api/firebase';
const SimilarProducts = ({products}) => {
  
    const {setCurrentProduct} = useStore();
    const navigate = useNavigate();
    const goToDetail = () => {
        setCurrentProduct(products);
        getProductInfo(products.id);
        navigate(`/products/${products.id}`)
    };
    return (
        <div className={styles.product} onClick={goToDetail}>
            <div className={styles.img}style={{backgroundImage:"url("+`${products.image}`+")"}}></div>
            <div className={styles.title}>{products.title}</div>
            <div>{products.price}원</div>
        </div>
    );
};

export default SimilarProducts;