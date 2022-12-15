import React,{useEffect, useSyncExternalStore} from 'react';
import { getProducts, infinity } from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import ProductCard from './ProductCard';
import styles from './css/ShowProducts.module.css';
import useStore from '../store';
let newProducts = [];
const ShowProducts = ({count}) => {
    const {last,setLast} = useStore();
    const {isLoading, error, data:products} = useQuery([], () => (getProducts()));
    newProducts = products && products.slice(count,count+3);
    useEffect(() => {
       
        if(newProducts && newProducts.length <=2) {

            setLast(true);
            
        }
        else {
            setLast(false);
        }
    },[count]);
  
    
   
    return (
        <div className={styles.container}>
            <div className={styles.productsContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {newProducts && newProducts.map(product => <ProductCard product={product} key={product.id} />)}
            </div>

        </div>
    );
};

export default ShowProducts;