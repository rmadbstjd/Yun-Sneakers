import React,{useState} from 'react';
import styles from './css/AddShip.module.css';
import {IoIosArrowDown} from 'react-icons/io';
const AddShip = () => {
    const requestArr = ['배송시 요청사항을 선택해 주세요', '부재시 문앞에 놓아주세요', '부재시 경비실에 맡겨 주세요.', '부재시 전화 또는 문자 주세요', '택배함에 넣어 주세요.', '직접입력'];
    const [showRequest, setShowRequest] = useState(false);
    const [request, setRequest] = useState('배송시 요청사항을 선택해 주세요');
    const clickRequest = (item) => {
        console.log("item",item);
        setRequest(item);
        setShowRequest(false);   
    };
    const showRequestBox = () => {
        setShowRequest((prev) => !prev);
    };
    return (
        <div className={styles.container}>
            <div className={styles.first}>
                <div className={styles.left}>
                    배송지명
                </div>               
                <input type ="text" className={styles.deliveryAddress}></input>                
            </div>
            <div className={styles.first}>
                <div className={styles.left}>
                    수령인
                </div>               
                <input type ="text" className={styles.deliveryAddress}></input>               
            </div>
            <div className={styles.addressContainer}>
                <div className={styles.addressLeft}>
                    배송지
                </div>               
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <input type ="text" className={styles.addressNumber}></input>
                        <div className={styles.searchBtn}>우편변호 검색</div> 
                    </div>
                    <div className={styles.addressInfo}>테스트</div>
                    <input type ="text" placeholder="상세 주소 입력" className={styles.moreInfo}></input>
                </div>
                    
            </div>
            <div className={styles.phoneNumberContainer}>
                <div className={styles.left}>
                    연락처
                </div>
                <input type="text" className={styles.number}></input>
                -
                <input type="text" className={styles.number}></input>
                -
                <input type="text" className={styles.number}></input>
            </div>
            <div className={styles.checkBoxContainer}>
                <input type="checkbox" className={styles.checkbox}/>
                <div>기본 배송지로 설정</div>
                
            </div>
            <div className={styles.requestBox} onClick={showRequestBox}>{request} <IoIosArrowDown/></div>
            <div className={styles.test}> { showRequest && requestArr.map((item,index) => <div className={styles.request} onClick={() => clickRequest(item)} key={index}>{item}</div>)}</div>
            <div>

            </div>
        </div>
    );
};

export default AddShip;