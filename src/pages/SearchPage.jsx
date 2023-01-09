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
    const {product,sort,initSort} = useStore();
    const [query,setQuery] = useSearchParams();
    const [toggle, setToggle] = useState(false);
    const sessionSort = sessionStorage.getItem("sort");
    const sessionBrand = sessionStorage.getItem("brand");
    const searchQuery= query.get('keyword')|| "null";
    const searchSort= sessionSort || query.get('sort')|| "null";
    console.log("테스트",searchSort);
    
    const priceOrder = query.get('priceOrder') || undefined;
    let collectionName = query.get('collectionName') || undefined; 
    const [result, setResult] = useState(searchQuery);
    let {error, isLoading, data : products} = useQuery([searchQuery,searchSort,collectionName,priceOrder], () => product.search(searchQuery,searchSort,collectionName,priceOrder));  
    const navigate = useNavigate();
    const submitKeyword = (e) => {        
        e.preventDefault();    
        navigate(`/search?keyword=${result}&sort=${sessionSort || sort}$collectionName=${collectionName}&priceOrder=${priceOrder}`);
    };
    const closeSearch = () => {        
        setResult('');       
    };
    useEffect(() => {
        setResult(searchQuery);
        products && initSort(sessionSort);
       
    },[searchQuery,searchSort]);
    
    const clickToSort = (e) => {
        e.stopPropagation();
        setToggle((prev) =>!prev);   
    };
    const handleChange = (e) => {        
        setResult(e.target.value);     
    };
    products && console.log("products");
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
                            <div className={styles.sort} onClick={clickToSort}>{sessionSort==='new'?'최신순':'인기순'}</div>
                            <TbArrowsUpDown className={styles.toggleIcon} onClick={clickToSort}/>
                            {toggle && <Toggle setToggle={setToggle}/>}
                </div>  
                
                <div className={styles.content}>
                        <Side/>
                        <div className={styles.products}>
                            {products && products.products.map((product,index) => product.map((product,index) =><ProductLikeCard none={'none'}product={product} key={index} />))}
                        </div>
                </div>               
            </div>
        </div>
    );
};

export default SearchPage;