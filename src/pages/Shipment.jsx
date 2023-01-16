import React,{useState, useEffect} from 'react';
import styles from './css/Shipment.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import AddShip from '../components/AddShip';
import {useQuery} from '@tanstack/react-query';
import useStore from '../store';
import ShipAddress from '../components/ShipAddress';
const Shipment = () => {
    const {cart, shipPlaceName, shipReceiver, number,numInput1,numInput2,numInput3,card,setCard} = useStore();
    const {isLoading, error, data : products} = useQuery(['test'], () =>cart.getCartsTest());
    const couponArr = ['선택안함','Welcome 5% 할인 쿠폰', '10만원 이상 구매 시 10% 할인 쿠폰', '20만원 이상 구매 시 20% 할인 쿠폰'];
    const paymentArr = ['신용/체크카드', '네이버페이', '카카오페이', '토스', '삼성페이', '페이코', 'SSG 페이', '휴대폰 결제', '무통장 입금'];
    const cardArr = ['NH카드', '수협카드', '삼성카드', '우체국카드', 'BC카드', '전북카드', '우리카드', '현대카드', '롯데카드'];
    const budgetArr = ['일시불','2개월','3개월','4개월','5개월','6개월','7개월','8개월','9개월','10개월','11개월','12개월'];
    const [showCoupon, setShowCoupon] = useState(false);
    const [newShip, setNewShip] = useState(false);
    const [newShip2, setNewShip2] = useState(false);
    const [coupon, setCoupon] = useState('선택안함');
    const [couponPrice, setCouponPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);  
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [budgetAccount,setBudgetAccount] = useState('일시불');
    const [showBudgetAccount1, setShowBudgetAccount1] = useState(false);
    const [showBudgetAccount2, setShowBudgetAccount2] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const showCouponBox = () => {
        setShowCoupon((prev) => !prev);
    };
    const clickCoupon = (item) => {
       
        setCoupon(item);
        setShowCoupon(false);   
    };
    const clickCard = (item) => {
        setCard(item);
        setShowCard(false);
        setShowBudgetAccount1(true);
    };
    const clickBudget = (item) => {
        setBudgetAccount(item);
        setShowBudgetAccount2(false);
    };
    const clickShip = (state) => {
        if(state ==='new') setNewShip(true);
        else setNewShip(false);
    };
    const test = () => {
        setShowCard((prev) =>!prev);
        if(showBudgetAccount1)setShowBudgetAccount1(false);
    };
    const check = (some) => {
        if(some ==='all'){
            if(checkAll ===false) {
                setCheckAll(true);
                setCheck1(true);
                setCheck2(true);
                setCheck3(true);
            }
            else {
                setCheckAll(false);
                setCheck1(false);
                setCheck2(false);
                setCheck3(false);
            }
        return;
        }
        else if(some ==='1') setCheck1((prev) => !prev);
        else if(some ==='2') setCheck2((prev) => !prev);
        else if(some ==='3') setCheck3((prev) => !prev);
        
    };
    const onValidate = () => {
        if(!shipPlaceName) alert("배송지명을 입력하세요!");
        else if(!shipReceiver) alert("수령인을 입력하세요!");
        else if(!number) alert("우편 번호를 입력하세요!");
        else if(!numInput1 || !numInput2 || !numInput3) alert("핸드폰 번호를 입력해주세요!");
        else if(card==='카드사를 선택해주세요.') alert("카드사를 입력해주세요!");
        else if(!checkAll) alert("약관 동의를 해주세요!");
    };
    useEffect(() => {
        if(products) {
            for(let i = 0; i<products.products.length; i++) {               
                let newPrice = Number(products.products[i].price * products.products[i].quantity );
                setPrice((prev) => prev + newPrice);  
                setCount((prev) => prev + products.products[i].quantity);
            }
            
        }
        
    },[products]);

    useEffect(() => {
        switch(coupon){
        case '선택안함' :
            setCouponPrice(0);
            break;
        case 'Welcome 5% 할인 쿠폰' :
            setCouponPrice(price / 10 / 2);
            break;
        case '10만원 이상 구매 시 10% 할인 쿠폰':
            if(price < 100000) break;
            setCouponPrice(price / 10);
            break;
        case '20만원 이상 구매 시 20% 할인 쿠폰':
            if(price < 200000) break;
            setCouponPrice(price / 5);
            break;
        default :
        break;
        }
        
    },
    [coupon]);
    useEffect(() => {
        if(check1 ===true && check2 ===true && check3 ===true) setCheckAll(true);
        else {
            setCheckAll(false);
        }   
        
    },[check1,check2,check3])
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
                    {newShip ===false?<ShipAddress/>:<AddShip/>}
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
                    <div className={styles.test}> { showCoupon && couponArr.map((item,index) => <div className={styles.coupon} onClick={() => clickCoupon(item)} key={index}>&nbsp;&nbsp;{item}</div>)}</div>
                    <div className={styles.brandCouponContainer}>
                        <div className={styles.couponLeftBox}>
                                브랜드 쿠폰
                        </div>
                        <div className={styles.brandCouponRightBox}>
                                &nbsp;&nbsp;&nbsp;적용 가능한 쿠폰이 없습니다.
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
                    <div className={styles.selectCard} onClick={test}>
                        <div className={styles.cardTitle}>{card}</div>
                        <IoIosArrowDown className={styles.cardDown}/>
                    </div>
                    <div className={styles.modal}>{showCard && cardArr.map((item) => <div className={styles.cardItem} onClick={() =>clickCard(item)}>{item}</div>)}</div>
                    {showBudgetAccount1 && 
                    <div className={styles.selectBudget} onClick={() =>setShowBudgetAccount2((prev) =>!prev)}>
                        <div className={styles.cardTitle}>{budgetAccount}</div>
                        <IoIosArrowDown className={styles.cardDown}/>
                    </div>
                    }
                    {showBudgetAccount2 &&
                        <div className={styles.modal}>{budgetArr.map((item) => <div className={styles.cardItem} onClick={() =>clickBudget(item)}>{item}</div>)}</div>
                    }
                </div>
            </div>  
            <div className={styles.rightContainer}>
                <div className={styles.title}>주문 상품 정보 / 총 {count}개</div>
                <div className={styles.productsContainer}>
                        {products && products.products.map(item => 
                        <div className={styles.productContent}>
                            <img className={styles.productImage} src={item.image}></img>
                            <div className={styles.productInfo}>
                                <div className={styles.category}>{item.category}</div>
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.priceContainer}>
                                    <div className={styles.price}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 /</div>
                                    <div className={styles.quantity}>&nbsp;수량 {item.quantity}개</div>                                    
                                </div>
                                <div className={styles.size}>옵션 : [SIZE] {item.size}</div>
                                
                            </div>
                        </div>)}
                </div>
                <div className={styles.InfoContainer}>
                    <div className={styles.infoPriceContainer}>
                        <div>총 상품금액</div>
                        <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                    </div>
                    <div className={styles.infoCouponContainer}>
                        <div>쿠폰 사용</div>
                        <div>- {couponPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                    </div>
                    <div className={styles.infoDeliveryChargeContainer}>
                        <div>배송비</div>
                        <div>+ 0원</div>
                    </div>
                    <div className={styles.infoTotalPriceContainer}>
                        <div>총 결제금액</div>
                        <div>{(price - couponPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                    </div>
                    <div className={styles.horizonLine4}></div> 
                </div>
                
                <div className={styles.checkBoxContainer}>
                    <div className={styles.checkBoxContent}>
                    <input type="checkbox" className={styles.checkBox} onChange={() =>check('all')} checked={checkAll}></input>
                    <div className={styles.checkBoxLetter}>주문 내역을 확인했으며, 아래 내용에 모두 동의합니다.</div>
                    </div>
                    <div className={styles.checkBoxContent}>                   
                    <input type="checkbox" className={styles.checkBox}  onChange={() =>check('1')}checked={check1}></input>
                    <div className={styles.checkBoxLetter2}>(필수) 개인정보 수집/이용 동의</div>
                    </div>
                    <div className={styles.checkBoxContent}>
                    <input type="checkbox" className={styles.checkBox} onChange={() =>check('2')} checked={check2}></input>
                    <div className={styles.checkBoxLetter2}>(필수) 개인정보 제3자 제공 동의</div>
                    </div>
                    <div className={styles.checkBoxContent}>
                    <input type="checkbox" className={styles.checkBox} onChange={() =>check('3')}checked={check3}></input>
                    <div className={styles.checkBoxLetter2}>(필수) 결제대행 서비스 이용약관 (주)KG이니시스</div>
                    </div>
                    
                    
                </div>
                <div className={styles.paymentBtn} onClick={onValidate}>CHECK OUT</div>
            </div>
        </div>
    );
};

export default Shipment;