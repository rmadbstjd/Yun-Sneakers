import React from 'react';
import styles from './css/Mordal.module.css';
const Mordal = ({show,setShow}) => {
    const closeShow = () => {
        setShow((prev) => !prev);
    }
    return (
        <div className={styles.mordal}>
            <button className={styles.close} onClick={closeShow}>
                X
            </button>
        </div>
    );
};

export default Mordal;