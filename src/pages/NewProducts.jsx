import React,{useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import { addProduct } from '../api/firebase';
import { uploadImage } from '../api/upload';
import styles from './css/NewProducts.module.css';
import useStore from '../store';
const NewProducts = () => {
    const {product, setProduct} = useStore();
    const [file, setFile] = useState('');
    let isAdmin = localStorage.getItem('admin');
    
    if(isAdmin !=='true') {
        console.log("어드민",isAdmin);
        return <Navigate to="/" replace></Navigate>
    }
    
    const onChange = (e) => {
        const {name ,value, files} = e.target;
        setFile(files && files[0]);
        
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        const url =await uploadImage(file);
        addProduct(product,url);
            
       
    };
    const onChangeProduct = (e,column) => {
        const row = e.target.value;
        setProduct(column,row);
    };
    return (
        <div className={styles.container}>
                
                <div className={styles.formContainer}>
                    
                        
                    
                <div className={styles.btnContainer}>
                    <div>새로운 제품 등록</div>
                    
                    <div>
                        <button onClick={onSubmit}>등록하기</button>
                        <button>취소하기</button>
                    </div>
                    
                </div>
                {file && <img className={styles.img}src={URL.createObjectURL(file)}></img>}
                    <div className={styles.form}>
                        <div>
                            <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='file'
                            required
                            onChange={onChange}>
                            
                            </input>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder="제품명"
                        onChange={(e) =>onChangeProduct(e,'title')}>
                        
                        </input>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder="가격"
                        onChange={(e) =>onChangeProduct(e,'price')}>

                        </input>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder="카테고리"
                        onChange={(e) =>onChangeProduct(e,'category')}>

                        </input>
                    </div>
                    <div className={styles.form}>
                        <input type="text"
                        placeholder="제품설명"
                        onChange={(e) =>onChangeProduct(e,'description')}>

                        </input>
                    </div>
                    <div className={styles.form}> 
                        <input type="text"
                        placeholder="사이즈(,로 구분해주세요)"
                        onChange={(e) =>onChangeProduct(e,'size')}>

                        </input>
                    </div>
                    
                </div>
                
        </div>
    );
};

export default NewProducts;