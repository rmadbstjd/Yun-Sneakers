import React,{useState,useEffect} from 'react';
import styles from './css/ProductCard.module.css';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
const ProductCard = ({product}) => {
    const [state,setState] = useState();
    useEffect(() => {
        if(product.length ===undefined) {
            setState(product);
        }
        else if (product.length===1) {
            setState(product[0]);
        }
    },[])
   
    const {setCurrentProduct} = useStore();
    const navigate = useNavigate();
    const goToDetail = () => {
       
        setCurrentProduct(state);
       
        navigate(`/products/${state.id}`)
    }
   state && console.log("테스트",state);
    return (
        <div className={styles.card} onClick={goToDetail}>
            <img className={styles.img}src={state && state.image}></img>
            <div>{state && state.category}</div>
            <div className={styles.info}>
                <p>{state && state.description} </p>
                <p>{state && state.price}원</p>
            </div>
            
            
        </div>
    );  
};

export default ProductCard;