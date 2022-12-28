import React,{useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import ProductCard from './ProductCard';
import styles from './css/ShowProducts.module.css';
import useStore from '../store';

import Arrow from './Arrow';
const ShowProducts = () => {
    const {product} = useStore();
    const [currentPage, setCurrentPage] = useState(1);
    const {isLoading, error, data:products} = useQuery([currentPage],() => ( product.getProducts(currentPage)));
    
 
    return (
        <div className={styles.container}>
        
            <div className={styles.productsContainer}>
 
                <div className={styles.new}>최신순</div>
                
                {products && products.map(product => <ProductCard product={product} key={product.id} />)}
                <div className={styles.moreContainer}>
                    <div className={styles.more}>
                        <Arrow currentPage ={currentPage} setCurrentPage ={setCurrentPage}/>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default ShowProducts;