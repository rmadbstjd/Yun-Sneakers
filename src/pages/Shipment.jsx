import React,{useState} from 'react';
import styles from './css/Shipment.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import AddShip from '../components/AddShip';
const Shipment = () => {
    const couponArr = ['선택안함','Welcome 5% 할인 쿠폰', '10만원 이상 구매 시 10% 할인 쿠폰', '20만원 이상 구매 시 20% 할인 쿠폰'];
    const paymentArr = ['신용/체크카드', '네이버페이', '카카오페이', '토스', '삼성페이', '페이코', 'SSG 페이', '휴대폰 결제', '무통장 입금'];
    const cardArr = ['NH카드', '수협카드', '삼성카드', '우체국카드', 'BC카드', '전북카드', '우리카드', '현대카드', '롯데카드'];
    const [showCoupon, setShowCoupon] = useState(false);
    const [newShip, setNewShip] = useState(false);
    const [coupon, setCoupon] = useState('선택안함');
    const [card, setCard] = useState('카드사를 선택해주세요.');
    const [showCard, setShowCard] = useState(false);
    const showCouponBox = () => {
        setShowCoupon((prev) => !prev);
    };
    const clickCoupon = (item) => {
        console.log("item",item);
        setCoupon(item);
        setShowCoupon(false);   
    };
    const clickCard = (item) => {
        setCard(item);
        setShowCard(false);
    };
    const clickShip = (state) => {
        if(state ==='new') setNewShip(true);
        else setNewShip(false);
    };
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.horizonLine}></div>  
                <div className={styles.shipInfoContainer}>
                    <div className={styles.infoTitle}>배송 정보</div>
                    
                    <div className={styles.infoSelectContainer}>
                        <div className={newShip===false?styles.leftSelectBox1 : styles.leftSelectBox2} onClick={() =>clickShip('old')}>
                                기존 배송지
                        </div>
                        <div className={newShip===false?styles.rightSelectBox1:styles.rightSelectBox2} onClick={() =>clickShip('new')}>
                                신규 입력
                        </div>
                        <div className={styles.horizonLine3}></div>                        
                    </div>
                    {
                        newShip===false?<div className={styles.showOldBox}> 
                            <p className={styles.oldBoxP1}>
                            등록된 배송지가 없습니다.
                            </p>
                            <p className={styles.oldBoxP2}>
                                배송지를 신규입력 해주세요.
                            </p>
                            </div>:<AddShip/>
                    }       
                </div>

                <div className={styles.couponContainer}>
                    <div className={styles.horizonLine}></div>  
                    <div className={styles.couponTitle}>쿠폰 / 마일리지</div>
                    <div className={styles.horizonLine2}></div>
                    <div className={styles.bonusCouponContainer}>
                        <div className={styles.couponLeftBox}>
                            보너스 쿠폰
                        </div>
                        <div className={styles.couponRightBox} onClick={showCouponBox}>
                            <div className={styles.default} >
                                    {coupon}
                            </div>                          
                            <IoIosArrowDown className={styles.down}/>
                        </div>                     
                    </div>
                    <div className={styles.test}> { showCoupon && couponArr.map((item,index) => <div className={styles.coupon} onClick={() => clickCoupon(item)} key={index}>{item}</div>)}</div>
                    <div className={styles.brandCouponContainer}>
                        <div className={styles.couponLeftBox}>
                                브랜드 쿠폰
                        </div>
                        <div className={styles.brandCouponRightBox}>
                                적용 가능한 쿠폰이 없습니다.
                        </div>
                    </div>
                    <div className={styles.horizonLine}></div> 
                </div>
                
                <div className={styles.paymentContainer}>
                    
                    <div className={styles.infoTitle}>결제 방법</div>
                    <div className={styles.horizonLine2}></div>
                    <div className={styles.cardContainer}>
                        {paymentArr.map(item => <div className={item==='신용/체크카드'?styles.firstCard:styles.card}>{item}</div>)}
                    </div>
                    <div className={styles.selectCard} onClick={() =>setShowCard((prev) =>!prev)}>
                        {card}
                        <IoIosArrowDown className={styles.cardDown}/>
                    </div>
                    <div className={styles.modal}>{showCard && cardArr.map((item) => <div className={styles.cardItem} onClick={() =>clickCard(item)}>{item}</div>)}</div>
                </div>
            </div>  
            <div className={styles.rightContainer}>
                4
            </div>
        </div>
    );
};

export default Shipment;