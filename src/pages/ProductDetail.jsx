import React, {useState,useEffect} from 'react';
import useStore from '../store';
import styles from './css/ProductDetail.module.css';
import Mordal from '../components/Mordal';
import HorizonLine from '../components/HorizonLine';
import {BsArrowDownCircle} from 'react-icons/bs';
import {useQuery} from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import SimilarProducts from '../components/SimilarProducts';
import { getProductInfo,getSimilarProducts } from '../api/firebase';
import {useParams} from 'react-router-dom';
const ProductDetail = () => {
    const [show, setShow] = useState(false);
    const {isLoading, error, data:products} = useQuery([show], () => (getSimilarProducts()));
    const {currentProduct,size,setInitSize} = useStore();
    const [product, setProduct] = useState('');
    const {id} = useParams();

    const showSize = () => {
        setShow((prev) => !prev);
    };
    
    useEffect(() => {
        const fetchData = async()=>{
            setProduct((await getProductInfo(id)));
            }
            
            
            fetchData();
            setInitSize();
            
    },[id]);

  
    return (
        
        <div>
            <div className={styles.container}>
            <div className={styles.productContainer}>
                <div>
                    <div className={styles.img}style={{backgroundImage:"url("+`${product[3]}`+")"}}></div>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.category}>{product[0]}</div>
                    <div>
                        <div>{product[6]}</div>
                        <div className={styles.description}>{product[1]}</div>
                    </div>
                    
                    <div>
                    <div className={styles.sizeContainer}>
                        <div className={styles.size}>사이즈</div>
                        <div className= {styles.test} onClick={showSize}>
                            {size===''?<div className={styles.sizeBtn}>사이즈 선택</div>:<div className={styles.sizeNum}>{size}</div> }
                            <div className={styles.circle}><BsArrowDownCircle size={20}/></div>  
                        </div>
                           
                        
                        {show && <Mordal show={show} setShow ={setShow} size={product[5]}></Mordal>}
                     </div>
                     <HorizonLine/>
                    </div>
                    
                     <div className={styles.price}>{product[4]}원</div>
                     
                     <div className={styles.addBtn}>장바구니에 추가</div>
                </div>
                
            </div>
                
            </div>
            <div className={styles.p}>
                <div className={styles.p2}>유사한 상품들</div>
            </div>
           <div className={styles.similarContainer}>
                <div className={styles.shoesContainer}>
                    {products && products.map((item) => <SimilarProducts key={item.id} products={item}/>)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;