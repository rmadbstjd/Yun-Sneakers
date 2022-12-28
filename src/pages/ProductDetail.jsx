import React, {useState,useEffect} from 'react';
import useStore from '../store';
import styles from './css/ProductDetail.module.css';
import SizeMordal from '../components/SizeMordal';
import HorizonLine from '../components/HorizonLine';
import {BsArrowDownCircle} from 'react-icons/bs';
import {useQuery} from '@tanstack/react-query';
import {getSimilarProducts,addOrUpdateToCart } from '../api/firebase';
import {useParams} from 'react-router-dom';
import CartMordal from '../components/CartMordal';
import {BsHeart} from 'react-icons/bs';
import {FaHeart} from 'react-icons/fa';
const ProductDetail = () => {
    const [, updateState]= useState();
    const [sizeShow, setSizeShow] = useState(false);
    const [cartShow, setCartShow] = useState(false);
    
    const [test, setTest] = useState(null);
    const {size,setInitSize, setWillAddProduct, plusProductCount,product,like} = useStore();
    
    const email = localStorage.getItem('email');
    const [productInfo, setProductInfo] = useState('');
    const [addProduct, setAddProduct] = useState({
    });   
    const {id} = useParams();
    
    
    const showSize = () => {
        setSizeShow((prev) => !prev);
        
    };
    const clickToCart = () => {
        plusProductCount();
        setCartShow((prev) => !prev);
        setTimeout(setCartShow,3000);
        if(!size) {
            alert("사이즈를 선택해주세요!");
            return;
        }
        
        setAddProduct({id : productInfo[2],url : productInfo[3], title: productInfo[6], description:productInfo[1], category : productInfo[0], price: productInfo[4], size:size});
        
        
    };
    const clickToLike = () => {
        like.pushLike(productInfo.product.id);
        setTest((prev) => !prev);
    };
    useEffect(() => {
        const fetchData = async()=>{
           
            setProductInfo((await product.getProductInfo(id)));
            }
            
            
            fetchData();
            setInitSize();
            
    },[id]);
    useEffect(() => {
        addProduct && setWillAddProduct(addProduct);
        addProduct  && addOrUpdateToCart(email.split('.')[0], addProduct);
    },[addProduct]);
    useEffect(() => {
        const fetchData = async() => {
            productInfo && setTest(await like.isLike(productInfo.product.id));
        }
        
        fetchData();
        
    },[productInfo]);
    
    console.log("테스트",test);
    return (
        
        <div>
            <div className={styles.container}>
            <div className={styles.productContainer}>
                
                <div className={styles.img}style={{backgroundImage:"url("+`${ productInfo && productInfo.product.image}`+")"}}></div>
                

                <div className={styles.infoContainer}>
                    <div className={styles.category}>{productInfo && productInfo.product.category}</div>
                    <div>
                        <div>{productInfo[6]}</div>
                        <div className={styles.description}>{productInfo && productInfo.product.description}</div>
                    </div>
                    
                    <div>
                    <div className={styles.sizeContainer}>
                        <div className={styles.size}>사이즈</div>
                        <div className= {styles.test} onClick={showSize}>
                            {size===''?<div className={styles.sizeBtn}>사이즈 선택</div>:<div className={styles.sizeNum}>{size}</div> }
                            <div className={styles.circle}><BsArrowDownCircle size={20}/></div>  
                        </div>                           
                        
                        {sizeShow && <SizeMordal sizeShow={sizeShow} setSizeShow ={setSizeShow} size={productInfo && productInfo.product.size}></SizeMordal>}
                        
                     </div>
                     <HorizonLine/>
                    </div>
                   
                     <div className={styles.price}>{productInfo && productInfo.product.price}원</div>
                     {cartShow && <CartMordal cartShow={cartShow} setCartShow ={setCartShow}></CartMordal>}
                     
                     <div className={styles.cartContainer}>
                        <div className={styles.addBtn} onClick={clickToCart}>장바구니에 추가</div>
                        <div className={styles.heartContainer}> {test===false?<BsHeart className={styles.heart} onClick={clickToLike}/>:test===true?<FaHeart className={styles.heart} onClick={clickToLike}/>:null}</div>
                    </div>
                        
                     
                </div>
                
            </div>
                
            </div>

        </div>
    );
};

export default ProductDetail;