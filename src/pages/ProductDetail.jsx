import React, {useState} from 'react';
import useStore from '../store';
import styles from './css/ProductDetail.module.css';
import Mordal from '../components/Mordal';
const ProductDetail = () => {

    const {currentProduct} = useStore();
    const [show, setShow] = useState(false);
    const showSize = () => {
        setShow((prev) => !prev);
    };
    console.log("show",show);
    return (

        <div className={styles.container}>
            <div className={styles.productContainer}>
                <div>
                    <div className={styles.img}style={{backgroundImage:"url("+`${currentProduct.url}`+")"}}></div>
                </div>

                <div className={styles.infoContainer}>
                    <p>{currentProduct.category}</p>
                    <p>{currentProduct.title}</p>
                    <p>{currentProduct.description}</p>
                    <div className={styles.sizeContainer}>
                        <div>사이즈</div>
                        <div  className={styles.sizeBtn}onClick={showSize}>모든 사이즈</div>
                        {show && <Mordal show={show} setShow ={setShow}></Mordal>}
                     </div>
                     <div className={styles.addBtn}>장바구니에 추가</div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;