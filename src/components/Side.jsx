import React,{useState} from 'react';
import styles from './css/Side.module.css';
import {useQuery} from '@tanstack/react-query';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
const Side = () => {
    const {product,sort} = useStore();
    const {isLoading, error, data : brands} = useQuery(['test'], () =>product.getBrandsName());
    const [showBrand,setShowBrand] = useState(false);
    const navigate = useNavigate();
    const clickToBrand = () => {
        setShowBrand((prev) => !prev);
    };
    console.log("테스트",brands);
    
    return (
        <div className={styles.container}>
            <div className={styles.filter}>필터</div>
            <div className={styles.brandContainer} onClick={clickToBrand}>
                <div className={styles.brandNavbar}>
                    브랜드
                </div>
                 
                {showBrand ===false?<AiOutlinePlus className={styles.plus}/>:<AiOutlineMinus className={styles.plus}/>}
             
            </div>
            {!showBrand && <div className={styles.horizonLine2}></div>}
                <div className={showBrand===true?styles.brandContentIsBlock:styles.brandContentIsNone}>
                
                    {brands && brands.map((item) =><div className={styles.item}onClick={() =>navigate(`/search?keyword=${item}&sort=${sort}`)}><div className={styles.itemName}>{item}</div></div>)}
                    <div className={styles.horizonLine2}></div> 
                </div>
            <div className={styles.sizeContainer}>사이즈</div>
            <div className={styles.horizonLine2}></div>  
            <div className={styles.priceContainer}>가격</div>
            <div className={styles.horizonLine2}></div>  
        </div>
    );
};

export default Side;