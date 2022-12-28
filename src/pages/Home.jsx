import React from 'react';
import ShowProducts from '../components/ShowProducts';
import ShowPopularProducts from '../components/ShowPopularProducts';
import styles from './css/Home.module.css';
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai';

const Home = () => {

    

    return (
        <div className={styles.container}>
            
            <div className={styles.imgContainer}>
                <div style={{backgroundImage:"url(https://cdn.pixabay.com/photo/2017/09/09/11/52/t-shirts-2731768_960_720.jpg)"}}className={styles.img}>Premium Shoes for you</div>
                
            </div>

            
            <div className={styles.productsContainer}>
            
                <div className={styles.productContainer}>
                    
                    <ShowProducts/>
                    
                </div>
            </div>                          
        </div>
    );
};

export default Home;