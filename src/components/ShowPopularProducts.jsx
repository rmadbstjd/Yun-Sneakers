import React from 'react';

import {useQuery} from '@tanstack/react-query';
import ProductCard from './ProductCard';
import styles from './css/ShowPopularProducts.module.css';
import useStore from '../store';

const ShowProducts = () => {
    const {product} = useStore();
    const {isLoading, error, data:products} = useQuery([], () => (product.getProducts()));
    

  
    
   
    return (
        <div className={styles.container}>
        
            <div className={styles.productsContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div className={styles.popular}>인기순</div>
                {products && products.map(product => <ProductCard product={product} key={product.id} />)}
                <div className={styles.moreContainer}>
                    <div className={styles.more}>더보기</div>
                </div>
            </div>

        </div>
    );
};

export default ShowProducts;