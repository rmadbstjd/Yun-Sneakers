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
    const {size,setInitSize, setWillAddProduct, plusProductCount} = useStore();
    const email = localStorage.getItem('email');
    const [product, setProduct] = useState('');
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
        
        setAddProduct({id : product[2],url : product[3], title: product[6], description:product[1], category : product[0], price: product[4], size:size});
        
        
    }; 
    useEffect(() => {
        const fetchData = async()=>{
            setProduct((await getProductInfo(id)));
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
                           
                        
                        {sizeShow && <SizeMordal sizeShow={sizeShow} setSizeShow ={setSizeShow} size={product[5]}></SizeMordal>}
                        
                     </div>
                     <HorizonLine/>
                    </div>
                    
                     <div className={styles.price}>{product[4]}원</div>
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
                    {products && products.map((item) => <SimilarProducts key={item.id} products={item}/>)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;