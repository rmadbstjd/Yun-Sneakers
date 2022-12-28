import React,{useEffect, useState} from 'react';
import styles from './css/SizeMordal.module.css';
import useStore from '../store';
const SizeMordal = ({setSizeShow,size}) => {
    const [sizes, setSizes] = useState([]);
    useEffect(() => {
        setSizes(size.split(','));
    }, []); 
    const {setSize} = useStore();
    const closeShow = () => {
        setSizeShow((prev) => !prev);
    }
    const clickSize = (item) => {
        
        setSize(item);
        setSizeShow((prev) => !prev);
    }
    sizes && console.log("사이즈",sizes);
    return (
        <div className={styles.mordal}>
            <div className={styles.sizeContainer}>
                <div className={styles.name}>Size</div>
                {sizes && sizes.map((item) =>(<div onClick={() =>{clickSize(item)}}className={styles.sizeBox}>{item}</div>))}
                </div>
            
                 <button className={styles.close} onClick={closeShow}>
                    X
                </button>
        </div>
    );
};

export default SizeMordal;