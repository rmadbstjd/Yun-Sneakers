import React, {useState,useEffect} from 'react';
import useStore from '../store';
import styles from './css/ProductDetail.module.css';
import SizeMordal from '../components/SizeMordal';
import HorizonLine from '../components/HorizonLine';
import {BsArrowDownCircle} from 'react-icons/bs';
import {useQuery} from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import SimilarProducts from '../components/SimilarProducts';
import { getProductInfo,getSimilarProducts,addOrUpdateToCart } from '../api/firebase';
import {useParams} from 'react-router-dom';
import CartMordal from '../components/CartMordal';
const ProductDetail = () => {
    const [sizeShow, setSizeShow] = useState(false);
    const [cartShow, setCartShow] = useState(false);
    const {isLoading, error, data:products} = useQuery([sizeShow], () => (getSimilarProducts()));
    const {size,setInitSize, setWillAddProduct, plusProductCount,product} = useStore();
    const email = localStorage.getItem('email');
    const [productInfo, setProductInfo] = useState('');
    const [addProduct, setAddProduct] = useState({
    });
    const test = [];
    for(let i = 0; i<=4; i++) {
        products && test.push(products[i]);
    }
   
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
    },[addProduct])
    
    
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
                     <div className={styles.addBtn} onClick={clickToCart}>장바구니에 추가</div>
                </div>
                
            </div>
                
            </div>
            <div className={styles.p}>
                <div className={styles.p2}>유사한 상품들</div>
            </div>
           <div className={styles.similarContainer}>
                <div className={styles.shoesContainer}>
                    {test && test.map((item) => <SimilarProducts  className={styles.shoes}key={item.id} products={item}/>)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;