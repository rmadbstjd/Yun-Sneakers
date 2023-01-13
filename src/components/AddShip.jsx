import React,{useState} from 'react';
import styles from './css/AddShip.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import PostButton from '../components/PostButton';
import PopupPostCode from './PopupPostCode';
import PopupDom from './PopupDom';
import useStore from '../store';
const AddShip = () => {
    const requestArr = ['배송시 요청사항을 선택해 주세요', '부재시 문앞에 놓아주세요', '부재시 경비실에 맡겨 주세요.', '부재시 전화 또는 문자 주세요', '택배함에 넣어 주세요.', '직접입력'];
    const [showRequest, setShowRequest] = useState(false);
    const [request, setRequest] = useState('배송시 요청사항을 선택해 주세요');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [numInput1, setNumInput1] = useState('');
    const [numInput2, setNumInput2] = useState('');
    const [numInput3, setNumInput3] = useState('');
    const {number, info} = useStore();

    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    const clickRequest = (item) => {
        console.log("item",item);
        setRequest(item);
        setShowRequest(false);   
    };
    const showRequestBox = () => {
        setShowRequest((prev) => !prev);
    };
    const checkNumber = (e,place) => {
        const { value } = e.target;
        const onlyNumber = value.replace(/[^0-9]/g, '');
        if(place ==='first'){
            if(onlyNumber.length >=4) return;
            setNumInput1(onlyNumber);
            
        }
        else if(place ==='second') {
            if(onlyNumber.length >=5) return;
            setNumInput2(onlyNumber);
        }
        else if(place ==='last') {
            if(onlyNumber.length >=5) return;
            setNumInput3(onlyNumber);
        }
        
    };
    return (
        <div className={styles.container}>
            <div className={styles.first}>
                <div className={styles.left}>
                    배송지명
                </div>               
                <input type ="text" className={styles.deliveryAddress} maxLength={10}></input>                
            </div>
            <div className={styles.first}>
                <div className={styles.left}>
                    수령인
                </div>               
                <input type ="text" className={styles.deliveryAddress} maxLength={10}></input>               
            </div>
            <div className={styles.addressContainer}>
                <div className={styles.addressLeft}>
                    배송지
                </div>               
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <div className={styles.addressNumber}>{number}</div>
                        <div className={styles.searchButton} onClick={() =>setIsPopupOpen((prev) =>!prev)}>우편 번호 검색</div>
                    </div>
                    <div id='popupDom'>
                    {isPopupOpen && (
                        <PopupDom>
                            <PopupPostCode onClose={closePostCode} />
                        </PopupDom>
                    )}
                </div>
                    <div className={styles.addressInfo}>{info}</div>
                    <input type ="text" placeholder="상세 주소 입력" className={styles.moreInfo}></input>
                </div>
                    
            </div>
            <div className={styles.phoneNumberContainer}>
                <div className={styles.left}>
                    연락처
                </div>
               
                <input type="text"  value={numInput1}onChange={(e) => checkNumber(e,'first')}className={styles.number} />
                
                -
                <input type="number" value={numInput2}onChange={(e) => checkNumber(e,'second')} className={styles.number}></input>
                -
                <input type="number" value={numInput3}onChange={(e) => checkNumber(e,'last')} className={styles.number}></input>
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