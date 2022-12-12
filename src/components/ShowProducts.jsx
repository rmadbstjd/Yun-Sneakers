import React from 'react';
import { getProducts } from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import ProductCard from './ProductCard';
import styles from './css/ShowProducts.module.css';
const ShowProducts = () => {
    const {isLoading, error, data:products} = useQuery([], () => (getProducts()));
    return (
        <div className={styles.container}>
            <div className={styles.productsContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {products && products.map(product => <ProductCard product={product} key={product.id}/>)}
            </div>

        </div>
    );
};

export default ShowProducts;