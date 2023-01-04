import React,{useState,useEffect} from 'react';
import styles from './css/Search.module.css';
import {GrClose} from 'react-icons/gr';
const Search = ({setShowSearch}) => {
    const [text, setText] = useState("");
    //const {keyword} = useParams();
    /*useEffect(() => {
        
        setText(keyword || '');
        
        
    }, [keyword]);*/
    const submitKeyword = (e) => {
        console.log("Text",text);
        e.preventDefault();
        
        //navigate(`/videos/${text}`);
    };
    const closeSearch = () => {
        setShowSearch((prev) => !prev);
    };
  
    return (
        <div className={styles.container}>
                 <div className={styles.searchContainer}>
                    <form className={styles.searchContent} onSubmit={(e)=>submitKeyword(e)}>
                        
                            <input type="text" value={text} placeholder="브랜드명, 모델명" onChange={(e) =>setText(e.target.value) } className={styles.searchBar}/>
                                                
                        <GrClose className={styles.close} onClick={closeSearch}/>
                    </form>
                    <div className={styles.horizonLine}></div>
                   
                </div>
                
                
        </div>
    );
};

export default Search;