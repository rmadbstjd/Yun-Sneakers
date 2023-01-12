import React,{useState} from 'react';
import styles from './css/Shipment.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import AddShip from '../components/AddShip';
const Shipment = () => {
    const couponArr = ['선택안함','Welcome 5% 할인 쿠폰', '10만원 이상 구매 시 10% 할인 쿠폰', '20만원 이상 구매 시 20% 할인 쿠폰'];
    const [showCoupon, setShowCoupon] = useState(false);
    const [newShip, setNewShip] = useState(false);
    const [coupon, setCoupon] = useState('선택안함');
    const showCouponBox = () => {
        setShowCoupon((prev) => !prev);
    };
    const clickCoupon = (item) => {
        console.log("item",item);
        setCoupon(item);
        setShowCoupon(false);   
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
                    <div className={styles.horizonLine2}></div>
                    <div className={styles.infoSelectContainer}>
                        <div className={styles.leftSelectBox} onClick={() =>clickShip('old')}>
                                기존 배송지
                        </div>
                        <div className={styles.rightSelectBox} onClick={() =>clickShip('new')}>
                                신규 입력
                        </div>
                        
                    </div>
                    {
                        newShip===false?<div> 기존 배송지 </div>:<AddShip/>
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
                           
                            <IoIosArrowDown/>
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
                </div>
                
                <div className={styles.paymentContainer}>
                        3
                </div>
            </div>  
            

            <div className={styles.rightContainer}>
                4
            </div>
        </div>
    );
};

export default Shipment;