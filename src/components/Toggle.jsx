import React from 'react';
import styles from './css/Toggle.module.css';
import useStore from '../store';
import {useNavigate} from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';
const Toggle = ({setToggle}) => {
    const navigate = useNavigate();
    const{setSortNew, setSortPopular,text} = useStore();
    const [query] = useSearchParams();
    
    const searchQuery= query.get('keyword')|| "null";
    const clickToSort = (sort) => {
        if(sort ==='popular') {
            setSortPopular();
            sessionStorage.setItem("sort",'popular');
        }
        else {
            setSortNew();
            sessionStorage.setItem("sort",'new');
        }
        navigate(`/search?keyword=${searchQuery}&sort=${sort}`);
    };
    return (
        <div className={styles.container}  onClick ={() =>setToggle(false)}>
            <div className={styles.content} onClick={() =>clickToSort('popular')}>
                <div className={styles.title}>인기순</div>
                <div className={styles.desc}>좋아요 갯수를 기준으로 정렬합니다.</div>
            </div>
            <div className={styles.content} onClick={() =>clickToSort('new')}>
            <div className={styles.title}>최신순</div>
                <div className={styles.desc}>상품을 등록한 시간 기준으로 정렬합니다.</div>
            </div>
            
        </div>
    );
};

export default Toggle;