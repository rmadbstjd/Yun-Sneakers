import React,{useState,useEffect} from 'react';
import styles from './css/SearchPage.module.css';
import {useQuery} from '@tanstack/react-query';
import ProductLikeCard from '../components/ProductLikeCard';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';
import {GrClose} from 'react-icons/gr';
import {TbArrowsUpDown} from 'react-icons/tb';
import Toggle from '../components/Toggle';
import Side from '../components/Side';
const SearchPage = () => {
    const {product,sort} = useStore();
    const [query,setQuery] = useSearchParams();
    const [toggle, setToggle] = useState(false);   
    const searchQuery= query.get('keyword')|| "null";
    const searchSort= query.get('sort')|| "null"; 
    const [result, setResult] = useState(searchQuery);
    const {error, isLoading, data:products} = useQuery([searchQuery,searchSort], () => product.search(searchQuery,searchSort));
    const navigate = useNavigate();
    const submitKeyword = (e) => {        
        e.preventDefault();    
        navigate(`/search?keyword=${result}&sort=${sort}`);
    };
    const closeSearch = () => {        
        setResult('');       
    };
    useEffect(() => {
        setResult(searchQuery);
    },[searchQuery]);
    const clickToSort = (e) => {
        e.stopPropagation();
        setToggle((prev) =>!prev);   
    };
    const handleChange = (e) => {        
        setResult(e.target.value);     
    };
    return (
        <div className={styles.container} onClick={() => setToggle(false)}>          
            <div className={styles.productsContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                
                <div className={styles.contentContainer}>
                    
                    <div className={styles.searchContainer}>
                        <form className={styles.searchContent} onSubmit={(e)=>submitKeyword(e)}>
                            
                                <input type="text" value={result} placeholder="브랜드명, 모델명" onChange={(e) =>handleChange(e)} className={styles.searchBar} autoFocus/>                                                    
                                <GrClose className={styles.close} onClick={closeSearch}/>
                        </form>
                        <div className={styles.horizonLine}></div>                   
                    </div>
                                    
                </div> 

                <div className={styles.sortContainer}>
                            <div className={styles.sort} onClick={clickToSort}>{sort==='popular'?'인기순':'최신순'}</div>
                            <TbArrowsUpDown className={styles.toggleIcon} onClick={clickToSort}/>
                            {toggle && <Toggle setToggle={setToggle}/>}
                </div>  
                
                <div className={styles.content}>
                        <Side/>
                        <div className={styles.products}>
                            {products && products.map(product => <ProductLikeCard none={'none'}product={product} key={product.id} />)}
                        </div>
                </div>               
            </div>
        </div>
    );
};

export default SearchPage;