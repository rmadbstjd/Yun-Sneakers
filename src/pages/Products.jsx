import React from 'react';
import ShowProducts from '../components/ShowProducts';
import { getProducts, infinity } from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import styles from '../components/css/ShowProducts.module.css';


const Products = () => {
    const {isLoading, error, data:products} = useQuery([], () => (getProducts()));
    return (
        <div className={styles.container}>
            <div className={styles.productsContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {products && products.map(product => <ProductCard product={product} key={product.id} />)}
            </div>

        </div>
    );
};

export default Products;