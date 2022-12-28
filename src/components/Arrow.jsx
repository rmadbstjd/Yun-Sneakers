import React from 'react';
import styles from './css/Arrow.module.css';
import {AiOutlineLeft,AiOutlineRight } from 'react-icons/ai';
const Arrow = ({currentPage, setCurrentPage}) => {
    
    const plusCurrent =  () => {
        if(currentPage >=4) {
            return;
        }

        setCurrentPage((prev) => prev+1);
    };
    const minusCurrent =  () => {
        if(currentPage <=1) {
            return;
        }
        setCurrentPage((prev) => prev-1);
    };
    return (
        <div className={styles.container}>
            <div className={styles.size}>
                <div className={currentPage===1?styles.Noleft:styles.left} onClick ={minusCurrent}>
                        <AiOutlineLeft/>
                </div>
                    <div className={styles.in}>
                        <div className={styles.current}> {currentPage} &nbsp; </div> &nbsp;/ &nbsp;4
                    </div>
                <div className={currentPage===4?styles.NoRight:styles.right} onClick={plusCurrent}>
                    <AiOutlineRight/>
                </div> 
            </div>
              
        </div>
    );
};

export default Arrow;