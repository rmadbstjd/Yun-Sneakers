import React,{useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import ProductLikeCard from '../components/ProductLikeCard';
import styles from '../components/css/ShowProducts.module.css';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';
const Products = () => {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate('/');
    };
    const {like,likeDeletes} =useStore();
    const [count, setCount] = useState(0);
    const {isLoading, error, data:product} = useQuery([count,likeDeletes], () => (like.getLikeProduct()));
    
    useEffect(() => {
        product && setCount(product.length);
    }, [product])


    
    return (
        <div className={styles.container}>
           
            <div className={styles.productsContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                
                 <div className={styles.contentContainer}>
                    <div className={styles.title}>Products ( {count} )</div>
                     <div className={styles.horizonLine2}></div>
                 </div>
                    
               
                {product && product.map(product => product.map( product => <ProductLikeCard  setCount ={setCount}product={product} key={product.id} />))}
                {product && product.length===0?
                <div className={styles.noneProductContainer}>
                    <div className={styles.noneProduct}>
                        <div className={styles.span}>좋아요를 누른 상품이 없습니다.</div>
                        <div className={styles.mainBtn} onClick={goToMain}>CONTINUE SHOPPING </div>
                    </div>
                    
                </div>:null}
            </div>

        </div>
    );
};

export default Products;