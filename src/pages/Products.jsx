import React,{} from 'react';
import {useQuery} from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import styles from '../components/css/ShowProducts.module.css';
import useStore from '../store';
const Products = () => {
    const {like} =useStore();
    const {isLoading, error, data:products} = useQuery([], () => (like.getLikeProduct()));

    
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