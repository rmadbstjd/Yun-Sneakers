import React from 'react';
import styles from './css/Mordal.module.css';
import useStore from '../store';
const Mordal = ({show,setShow,size}) => {
    const {setSize} = useStore();
    const closeShow = () => {
        setShow((prev) => !prev);
    }
    const clickSize = (item) => {
        
        setSize(item);
        setShow((prev) => !prev);
    }
    
    return (
        <div className={styles.mordal}>
            <div className={styles.sizeContainer}>
                <div className={styles.name}>사이즈</div>
                {size && size.map((item) =>(<div onClick={() =>{clickSize(item)}}className={styles.sizeBox}>{item}</div>))}
                </div>
            
                 <button className={styles.close} onClick={closeShow}>
                    X
                </button>
        </div>
    );
};

export default Mordal;