import React,{useState} from 'react';
import ShowProducts from '../components/ShowProducts';
import styles from './css/Home.module.css';
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai';
import useStore from '../store';
const Home = () => {
    const [count, setCount] = useState(0);
    const {last} = useStore();
    const plusCount = () => {
        if(last) {
            
            return ;
        }
        
        setCount(count + 3);
    }
    const minusCount = () => {
        if(count <=0){
            return;
        }
        setCount(count - 3);
    }
    return (
        <div className={styles.container}>
            
            <div className={styles.imgContainer}>
                <div style={{backgroundImage:"url(https://cdn.pixabay.com/photo/2017/09/09/11/52/t-shirts-2731768_960_720.jpg)"}}className={styles.img}>Premium Shoes for you</div>
                
            </div>
            <div className={styles.arrowContainer1}>
                <div className={styles.arrowContainer2}>
                    <AiOutlineArrowLeft size={30} onClick ={minusCount}/>
                    <AiOutlineArrowRight size={30} onClick={plusCount}/>
                </div>
            </div>
            
            
         <ShowProducts count={count} setCount={setCount}/>
                          
        </div>
    );
};

export default Home;