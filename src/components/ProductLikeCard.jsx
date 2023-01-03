import React,{} from 'react';
import styles from './css/ProductLikeCard.module.css';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
import {HiHeart} from 'react-icons/hi';
import {AiFillCloseSquare} from 'react-icons/ai';


const ProductLikeCard = ({product,setCount}) => {
    const {like,setLikeDeletes} = useStore();
    
   
    const navigate = useNavigate();
    
    const clickDelete = (e) => {        
        e.stopPropagation();       
        
        product && like.pushLike(product.id);
        setLikeDeletes((prev) =>!prev);
        setCount((prev) =>prev -1);
    };
    const goToDetail = () => {
        
        navigate(`/products/${product.id}`);
       
    }
   
    
    return (
        <div className={styles.card} onClick={goToDetail}>
            <AiFillCloseSquare className={styles.deleteButton} onClick={clickDelete}/>
            <img className={styles.img}src={product && product.image}></img>
            
            <div className={styles.infoContainer}>
                <div className={styles.categoryContainer}>
                    <div className={styles.category}>{product && product.category}</div>
                </div>
                <div className={styles.info}>
                    <div>{product && product.description} </div>
                    <div className={styles.name}>{product && product.name}</div>
                    <div className={styles.priceContainer}>
                        <div className={styles.price}>{product && product.price}원</div>
                        <div className={styles.heartContainer}><HiHeart className={styles.heart}/><div className={styles.num}>{product && product.likeNum}</div>
                    </div>
                    </div>
                </div>
            </div>
          
            
            
        </div>
    );  
};

export default ProductLikeCard;