import React from 'react';
import styles from './css/SizeMordal.module.css';
import useStore from '../store';
const SizeMordal = ({setSizeShow,size}) => {
    const {setSize} = useStore();
    const closeShow = () => {
        setSizeShow((prev) => !prev);
    }
    const clickSize = (item) => {
        
        setSize(item);
        setSizeShow((prev) => !prev);
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

export default SizeMordal;