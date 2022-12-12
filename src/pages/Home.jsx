import React from 'react';
import ShowProducts from '../components/ShowProducts';
import styles from './css/Home.module.css';
const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <div style={{backgroundImage:"url(https://cdn.pixabay.com/photo/2017/09/09/11/52/t-shirts-2731768_960_720.jpg)"}}className={styles.img}>Premium Shoes for you</div>
            </div>
         <ShowProducts/>
                          
        </div>
    );
};

export default Home;