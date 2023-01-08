import React from 'react';
import styles from './css/Search.module.css';
import {GrClose} from 'react-icons/gr';
import {useNavigate} from 'react-router-dom';
import useStore from '../store';
const Search = ({setShowSearch}) => {
    const navigate = useNavigate();
    const {text, setText} = useStore();

    const submitKeyword = (e) => {
        e.preventDefault();
        
        navigate(`/search?keyword=${text}`);
        setShowSearch((prev) => !prev);
    };  
    const closeSearch = () => {
        setShowSearch((prev) => !prev);
        localStorage.setItem("result",'');
        setText('');
    };
    const handleChange = (e) => {
        setText(e.target.value);
    };
    return (
        <div className={styles.container}>
                 <div className={styles.searchContainer}>
                    <form className={styles.searchContent} onSubmit={(e)=>submitKeyword(e)}>
                        
                            <input type="text" value={text} placeholder="브랜드명, 모델명" onChange={(e) =>handleChange(e)} className={styles.searchBar}  autoFocus/>
                                                
                        <GrClose className={styles.close} onClick={closeSearch}/>
                    </form>
                    <div className={styles.horizonLine}></div>
                   
                </div>
                
                
        </div>
    );
};

export default Search;