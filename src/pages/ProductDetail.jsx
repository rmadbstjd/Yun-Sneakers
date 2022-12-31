import React, {useState,useEffect} from 'react';
import useStore from '../store';
import styles from './css/ProductDetail.module.css';

import SizeMordal from '../components/SizeMordal';
import HorizonLine from '../components/HorizonLine';
import {BsArrowDownCircle} from 'react-icons/bs';
import {useQuery} from '@tanstack/react-query';
import {addOrUpdateToCart } from '../api/firebase';
import {useParams} from 'react-router-dom';
import CartMordal from '../components/CartMordal';
import HeartModal from '../components/HeartModal';
import {BsHeart} from 'react-icons/bs';
import {FaHeart} from 'react-icons/fa';
import SimilarProducts from '../components/SimilarProducts';
const ProductDetail = () => {
    
    const [sizeShow, setSizeShow] = useState(false);
    const [cartShow, setCartShow] = useState(false);
    
    const [test, setTest] = useState(null);
    const [heartShow, setHeartShow] = useState(test);
    const {size,setInitSize, setWillAddProduct, plusProductCount,product,like,cart} = useStore();
    
    const email = localStorage.getItem('email');
    const [productInfo, setProductInfo] = useState('');
    const [addProduct, setAddProduct] = useState({
    });   
    const {id} = useParams();
    const showSize = () => {
        setSizeShow((prev) => !prev);
    };
    const {data} = useQuery([], () =>product.getProductInfo(id));
    const products = data && data.product;
    const category = data && data.product.category;
    console.log("프러덕트",products);
    const {isLoading, error, data : similars} = useQuery(["similar",id],() => product.getSimilarProducts(category,id), 
    {refetchOnMount : 'alaways',
     enabled : !!category});
    const clickToCart = () => {
        if(!size) {
            alert("사이즈를 선택해주세요!");
            return;
        }
        plusProductCount();
        setCartShow((prev) => !prev);
        setTimeout(setCartShow,3000);
        cart.addCart(products,size)
        
        //setAddProduct({id : productInfo[2],url : productInfo[3], title: productInfo[6], description:productInfo[1], category : productInfo[0], price: productInfo[4], size:size});
        
        
    };
    const clickToHeart = () => {
        //처음 화면에 딱 왔을 때 하트 boolean
        console.log("테스트",test);
        if(!test) {
            setHeartShow((prev) =>!prev);
            setTimeout(setHeartShow,2000);
        }
        
    }
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
                            {size===''?<div className={styles.sizeBtn}>사이즈</div>:<div className={styles.sizeNum}>{size}</div> }
                            <div className={styles.circle}><BsArrowDownCircle size={20}/></div>  
                        </div>                           
                        
                        {sizeShow && <SizeMordal sizeShow={sizeShow} setSizeShow ={setSizeShow} size={productInfo && productInfo.product.size}></SizeMordal>}
                        
                     </div>
                     <HorizonLine/>
                    </div>
                   
                     <div className={styles.price}>{productInfo && productInfo.product.price}원</div>
                     {cartShow && <CartMordal cartShow={cartShow} setCartShow ={setCartShow}></CartMordal>}
                     {heartShow && <HeartModal heartShow={heartShow} setHeartShow ={setHeartShow}></HeartModal>}
                     <div className={styles.cartContainer}>
                        <div className={styles.addBtn} onClick={clickToCart}>장바구니에 추가</div>
                        
                        <div className={test===true?styles.heartContainer2:styles.heartContainer1} onClick={clickToHeart}> {test===false?<BsHeart className={styles.heart1} onClick={clickToLike}/>:test===true?<FaHeart className={styles.heart2} onClick={clickToLike}/>:null}</div>
                    </div>
                       
                    </div>
                    
            </div>
                
            </div>
            <div className={styles.p}>
                         <div className={styles.p2}><span className={styles.category2}>{category}</span>의 다른 상품</div>
                    </div>
                    <div className={styles.similarContainer}>
                    <div className={styles.shoesContainer}>
                        {similars && similars.map((item) => <SimilarProducts key={item.id} products={item}/>)}
                    </div>
                </div>  
        </div>
    );
};

export default ProductDetail;