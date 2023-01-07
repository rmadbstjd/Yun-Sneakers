import React,{useState,useEffect} from 'react';
import styles from './css/Side.module.css';
import {useQuery} from '@tanstack/react-query';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import {useSearchParams} from 'react-router-dom';
const Side = () => {
    const [query] = useSearchParams();
    const {product,sort} = useStore();
    const {isLoading, error, data : brands} = useQuery(['test'], () =>product.getBrandsName());
    const [showBrand,setShowBrand] = useState(false);
    const searchQuery= query.get('keyword')|| "null";
    const [checkedList, setCheckedList] = useState([searchQuery]);
    const navigate = useNavigate();
   
    const clickToBrand = () => {
        setShowBrand((prev) => !prev);
    };
    const onChecked = (e) => {
        if(e.target.checked === true) {
          
            setCheckedList([...checkedList,e.target.value]);
        }
        else {
            setCheckedList(checkedList.filter(el =>el !== e.target.value));
        }
    };
   
    useEffect(() => {

       navigate(`/search?keyword=${searchQuery}&sort=${sort}&collectionName=${checkedList}`);
    },
    [checkedList])
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
                
                    {brands && brands.map((item,index) =><div className={styles.item} key={index}><label className={styles.itemName} > <input type="checkbox" checked={checkedList.includes(item)?true:false}value={item} onChange={e =>onChecked(e)}/>{item}</label></div>)}
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