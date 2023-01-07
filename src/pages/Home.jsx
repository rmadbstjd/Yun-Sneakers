import React,{useEffect} from 'react';
import ShowProducts from '../components/ShowProducts';
import ShowPopularProducts from '../components/ShowPopularProducts';
import styles from './css/Home.module.css';

const Home = () => {
    
    
   
    return (
        <div className={styles.container}>
            
            <div className={styles.imgContainer}>
                <div style={{backgroundImage:"url(https://res.cloudinary.com/dtw1xfagx/image/upload/v1672987124/homeimg_nrshhh.jpg)"}}className={styles.img}>Premium Shoes for you</div>
                
            </div>

            
            <div className={styles.productsContainer}>
            
                <div className={styles.productContainer}>
                    
                    <ShowProducts/>
                    <ShowPopularProducts/>
                </div>
            </div>                          
        </div>
    );
};

export default Home;