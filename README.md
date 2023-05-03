<h1>Yun's Neakers</h1>

 ⭐현재 서비스 중인 URL : https://yunsneakers.netlify.app/
 
 📋 프로젝트 기간
 2022.12.05 ~ 현재 계속 업데이트중
 
 ✅ 업데이트 예정 기능
 * 기존에 작성된 Javascript를 Typescript로 변환
 * 반응형 웹 디자인
 
# 주요기능
* 회원가입 / 로그인 
* 상품 검색
* 상품 좋아요
* 상품 필터링
* 장바구니
* 결제
* 리뷰 작성
* Q&A 작성
* 마이 페이지
* 백 오피스 

# 기술 스택
### 1. Front-End
<div display="flex"><img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/react--query-FF4154?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/zustand-yellow?style=for-the-badge&logo=&logo=zustand&Color=black">
<img src="https://img.shields.io/badge/emotion-green?style=for-the-badge&logo=&logo=emotion&Color=black">
</div>

### 2. Back-end
<div display="flex">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/mongoose-339933?style=for-the-badge&logo=mongoose&logoColor=white">
<img src="https://img.shields.io/badge/JWT Token-000000?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white">
</div>

### 3. Tools
<div display="flex">
<img src="https://img.shields.io/badge/AWS EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
<img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=white">
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
</div>

# 아키텍쳐

![image](https://user-images.githubusercontent.com/58474431/225018981-7227cb09-6e75-456f-b39f-955932cd8f12.png)

# ERD 설계

![yunsneakersERD](https://user-images.githubusercontent.com/58474431/235035329-35b0175b-fa8d-46d2-9b1e-e64fe96b7287.jpg)


# 기술적 의사결정
### 1. 세션 기반 로그인 vs 토큰 기반 인증
<br/>
세션의 큰 단점으로는 확장성 , 서버의 과부하 등이 있다.
<br/>
세션의 경우, 확장하기위해서는 일반적인 서버 확장 방식으로 스케일 업이 아닌 스케일 아웃을 사용하는데,
<br/>
이 때 세션 불일치 문제가 발생하게 되며,
이를 해결하기 위해 Sticky Session이나 Session Clustering 같은 작업을 별도로 해주어야 한다.
<br/>
반면에 토큰 기반 인증은 서버가 직접 인증 방식을 저장하지 않고, 클라이언트가 저장하기 때문에 이러한 문제로부터 자유롭다.
<br/>
또한 세션 기반 인증 방식은 세션 데이터를 서버가 직접 저장하고, 관리하기 때문에 사용자가 많아질수록 서버의 부담이 증가되나,
<br/>
토큰 기반 인증은 인증 데이터를 직접 갖고 있기 때문에 사용자가 아무리 많아져도 서버의 부담이 증가하지 않는다.
</br>
따라서 나의 프로젝트에 대입해봤을 때, 실제 서비스를 목적으로 만든 것이 아닌 학습용으로 만들다보니 서버도 한 개만 사용하고
<br/>
유저가 서버에 부담을 줄 정도로 늘어나지 않으므로 세션 기반 로그인을 고려하였으나,
<br/>
최근 이러한 문제들로 인해 점점 많은 회사에서 토큰 기반 인증을 사용하려고 하는 추세이고, 
<br/>
이전 프로젝트에서도 토큰 기반 인증을 사용했는데 Access Token만 구현하고 Refresh Token은 사용하지 못한 점이 아쉬워서
<br/>
이번에는 Access Token + Refresh Token을 사용한 토큰 기반 방식을 사용하려고 한다.
<br/>

### 2. SQL vs NO SQL
<br/>
사실 이 부분에 대해서 고민을 많이 하였고 어느 데이터베이스가 내 프로젝트에 적합한지 검색도 많이 해보았다.
<br/>
NO SQL를 선택하게된 가장 큰 이유는 MVP를 구성하고 DB 스키마 설계를 잘 하더라도,
<br/>
막상  들어가면 예상치 못한 상황으로 수정해야 할 스키마도 많고, 프로젝트를 만들면서 부족한 기능이나
<br/>
추가하고 싶은 기능들이 많을 것 같아서 변경 및 확장될 가능성이 높기 때문에 NO SQL인 Mongo DB를 선택하게 됐다.
<br/> 

### 3. 상태 관리 라이브러리

서비스의 규모가 커질수록 관리해야할 state가 많아지고 props drilling을 방지하기 위해 상태 관리 라이브러리를 사용하려고 한다.
<br/>
대표적인 Client state 관리 라이브러리인 Redux, Redux-toolkit, zustand를 고려해봤다.
각각의 장단점을 살펴보면,
<br/>
Redux의 경우, 검증된 신뢰성이 높은 라이브러리이고 Redux DevTools를 이용해 디버깅적인 측면에서 효율적이다.
<br/>
다만, 작은 상태 하나를 변경하려고 해도, actions, reducer, type 등 보일러 플레이트 코드를 작성해야 하는 번거로움이 있다.
<br/>
또한 비동기 처리를 하려고 할 때, redux-saga, redux-thunk와 같은 미들웨어를 추가적으로 설치하여 사용해야한다.
<br/>
<br/>
Redux-toolkit의 경우, Redux의 단점으로 생각되는 보일러 플레이트 코드를 줄여준다.
또한 redux Devtools, immer, reselect 등 여러가지 기능들이 내장되어 있어서 패키지의 의존성을 줄여줄 수 있다.
<br/>
단점으로는 zustand와 비교하여 Redux-toolkit의 경우 11.8MB라는 큰 사이즈를 갖고 있다.
<br/>
<br/>
Zustand의 경우, 동작을 이해하기 위해 알아야하는 코드의 양이 매우 적어서 이해하기 쉽다.
<br/>
Redux를 축소화시킨 느낌으로 187KB라는 압도적으로 작은 사이즈를 갖고 있으며, 작은 크기에 맞게 간단한게 설정하여 사용할 수 있고,
<br/>
subscribe 기능을 사용하면 자주 렌더링 되는 항목에 대해서 렌더링을 유발하지 않고 Redux Tools를 사용할 수 있어 디버깅에도 매우 용이하다.
<br/>
각각의 라이브러리들을 비교해봤을때 프로젝트의 규모에 비해 Redux 및 Redux-toolkit을 사용하기엔 많이 무겁고,
<br/>불필요한 기능들이 많이 내장되어있다고 판단하여 Zustand를 사용하기로 결정하였다.

마지막으로, 
<br/>
Zustand가 본연의 역할에 충실할 수 있도록 서버 데이터 상태 관리 라이브러리인 React-Query를 사용하여 클라이언트 데이터와 서버 데이터를 분리하려고 한다.
<br/>
서버 데이터 상태 관리 라이브러리를 사용함으로써 얻는 장점으로 크게 3가지가 있을 수 있다.
<br/>
서버와의 통신 과정에서 로딩 상태, 에러 여부 등을 컴포넌트 내부에서 직접 상태를 작성하여 관리하지 않아도 되고,
<br/>
자동 데이터 캐싱을 통해 서버에게 가하는 부담을 줄일 수 있다.
<br/>마지막으로 일정 시간이 지나거나, 데이터의 변동이 생겼을 때 캐싱된 데이터를 삭제하고,다시 데이터를 받아와 최신의 상태로 유지한다는 점이다.

### 4. 페이지네이션(Pagination) VS 무한스크롤(Infinite Scroll)

사용자가 상품을 검색했을 때, 매번 상품 전체를 가져오게 되면 등록된 상품의 갯수가 많아질수록 비용도 많이 들고, 시간도 오래 걸릴 수 있다.
<br/>
따라서 상품 전체를 한 번에 보여주는 것이 아닌 정해진 몇 개만 보여주고, 추가적인 요청마다 상품을 더 보여주면 비용도 줄일 수 있고 시간도 줄일 수 있다.
<br/>
이러한 방법으로 크게 페이지네이션과 비교적 최신에 나온 무한스크롤이 있다.
<br/>
각각의 장단점을 비교해보면,
<br/>
<br/>
페이지네이션(Pagination)의 장점
1) 사용자의 의도에 맞게 페이지를 넘길 수 있다.
2) 특정 항목의 위치를 대략적으로 파악할 수 있다.

페이지네이션(Pagination)의 단점
1) 추가적인 작업을 필요로 한다.
2) 한 페이지에 매우 제한된 내용을 보여준다.

무한 스크롤(Infinite Scroll)의 장점
1) 스크롤링은 클릭하는 것 보다 더 나은 사용자 경험을 제공한다.
2) 모바일에 최적화가 되어있다.

무한 스크롤(Infinite Scroll)의 단점
1) 페이지의 성능이 느려진다.
2) 특정 항목 검색 및 원래의 위치로 되돌아오기가 힘들다.
3) 푸터(Footer)를 찾기 어려워진다.

이러한 특징들을 이번 프로젝트에 대입해봤을 때 무한 스크롤은 끊임없이 사용자가 직접 컨텐츠를 생성하는 소셜 미디어 사이트에 적합하다고 판단하였고,
<br/>
상품의 검색 측면에선 페이지네이션이 온라인 쇼핑몰에 적합하다고 생각하여 페이지네이션을 사용하기로 하였습니다.

### 5. 웹 컴포넌트 스타일링 관리 CSS Module vs CSS-in-JS
<br/>
먼저 CSS Module과 CSS-in-JS를 비교해보면,
<br/>
CSS-in-CSS의 장점으로 CSS 모듈 안에서 클래스를 만들면 자동으로 고유한 클래스 네임을 만들어 Scope를 지역적으로 제한할 수 있으며,
<br/>
컴포넌트별 CSS 관리의 편리함 등이 있고,
<br/>
단점으로는 동적인 클래스 명을 작성하게 될 때 결과가 좋지 않다는 것과, 별도로 많은 css 파일을 만들어 관리해야 하는 것이다.
<br/>
CSS-in-JS는 Javascript를 통해 CSS를 제어하는 것이므로 자바스크립트를 사용함으로써 다양한 장점을 갖을 수 있다.
<br/>
우선 JS와 CSS의 상태 공유, 미사용 코드 검출 용이, CSS 우선 순위 이슈 해결 등 다양한 장점이 있지만,
<br/>
아직 초보 개발자인 나에겐 JS와 CSS의 상태 공유가 가능하다는 점이 크게 다가왔다.
<br/>CSS-in-JS를 몰랐던 때에는 Props를 활용한 조건부 스타일링을 하고 싶을 때 마다 클래스를 여러 개 생성하여 조건에 따라 클래스네임을 부여했는데,
<br/>
CSS-in-JS를 알게 된 후로는 더욱 간단하게 조건부 스타일링을 처리할 수 있게 되었다.
<br/>
단점으로는, 러닝 커브와 별도의 라이브러리를 설치해야하므로 번들 크기가 커진다는 점,
<br/>
인터랙티브한 웹 페이지의 경우 CSS 파일을 따로 관리하는 방법에 비해 느린 성능을 보여준다는 점이다.
<br/>
이 둘의 장단점을 비교하여 종합해봤을 때, CSS-in-JS의 단점은 이번 프로젝트에 크게 영향이 없을 것으로 판단하여 CSS-in-JS를 채택하였다.

# 웹 사이트의 성능을 개선하기 위한 노력
웹 사이트의 성능을 측정하기 위해 LightHouse를 사용하였고 측정 결과, 매우 좋지 않았다.
<br/>
<h3>처음 측정 결과</h3>

![image](https://user-images.githubusercontent.com/58474431/235327949-47b8e9b0-773c-41a9-8a07-6cdaf743829e.png)

성능이 가장 좋지 못하였고, 다음으로는 접근성이 좋지 못하였다.
<br/>
이유를 살펴보니 크게 두 가지로 나눌 수 있었다.
<br/>
1. react-icons

![image](https://user-images.githubusercontent.com/58474431/235327979-4e3e6750-38cb-4ca1-a74d-bd22842de182.png)

<br/>
react-icons는 icon 종류별로 구분되어 있으며, 종류별로 하나의 js파일에 아이콘 전체를 포함하고 있다.
<br/>
빌드 시 react-icons라이브러리의 모든 파일이 포함되기 때문에 chunk 사이즈가 커지게 된다.
<br/>
이러한 이유로 인해 react-icons 에서는 @react-icons/all-files 라는 별도의 라이브러리를 제공하고 있었다.
<br/>
@react-icons/all-files 라이브러리는 아이콘 별로 자바스크립트 파일을 별도로 가지고 있기 때문에,
<br/>
빌드 시 트리쉐이킹 방식(필요 없는 코드를 제거하여 번들의 크기나 번들링의 시간을 줄여주는 방식)으로 더 적은 크기의 chunk를 만들 수 있다.
예를 들어,
<br/>
기존 코드

![image](https://user-images.githubusercontent.com/58474431/235305762-605c997d-822f-4f56-8e1d-4b3157877ead.png)

<br/>
수정된 코드 

![image](https://user-images.githubusercontent.com/58474431/235305716-39be2398-5406-42b4-96cc-1e2b78c39302.png)

2.이미지 태그에 alt 속성이 존재하지 않음

![image](https://user-images.githubusercontent.com/58474431/235328018-a137ad09-eb37-4bd5-9d7b-5cf3161b2bb2.png)

<h3>개선 결과</h3>
<br/>

![image](https://user-images.githubusercontent.com/58474431/235330666-f9c2ade5-c7f5-4ec8-9731-b0448cf17782.png)


<br/>
alt 속성을 추가하는 것은 접근성을 높이기 이전에
<br/>
이미지를 보지 못하여 스크린리더를 이용하는 시각 장애인이나 이미지를 불러오지 못하여 엑스박스가
<br/>
발생할 경우를 고려하여 반드시 필요한 속성이다.
<br/>
기본적인 것을 지키지 못한 것에 대해 반성하며 이미지 태그에 alt 속성을 추가하였다.
<br/>

# 주요 기능

### 1. 회원가입 및 로그인 기능 
<br/>
유저가 입력 양식에 맞게 입력하였을 때 회원가입 및 로그인 버튼을 활성화시키는 기능을 추가함으로써 UI를 향상시키도록 노력하였다.

<br/>

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/58474431/232307697-cd366e7a-3f0c-47c6-8184-7b70c22727c8.gif)

### 2. 상품 검색 기능
<br/>

자동완성, 최근 검색어, 추천 검색어 기능 등을 통해 사용자 경험을 향상시킬 수 있도록 하였다.
<br/>
1) 자동완성 기능

![ezgif com-video-to-gif (16)](https://user-images.githubusercontent.com/58474431/232942748-4233de5b-9e53-490e-881f-a30ba7251baf.gif)

2) 최근 검색어 기능

![ezgif com-video-to-gif (17)](https://user-images.githubusercontent.com/58474431/232943328-1c1b080e-34d0-4e6a-8882-d82b29a5526d.gif)

3) 추천 검색어 기능

![ezgif com-video-to-gif (18)](https://user-images.githubusercontent.com/58474431/232944361-3b7a6ffa-5485-401c-b01d-3e58c6923331.gif)


### 3. 상품 필터링 기능
<br/>

![ezgif com-video-to-gif (14)](https://user-images.githubusercontent.com/58474431/232766185-7bdeaf65-5a0e-4438-81a7-a15e389bb676.gif)


### 4. 상품 좋아요 기능
<br/>
관심이 있는 상품에 좋아요 버튼을 누를 수 있으며, 유저가 좋아요를 누른 상품들을 한 번에 보여주는 기능을 제공하여 편의성을 제공하였다.   

![ezgif com-video-to-gif (15)](https://user-images.githubusercontent.com/58474431/232810748-079b2bf2-8a0a-4d7b-a057-48b234026e4a.gif)



### 5. 상품 장바구니 기능
<br/>


![ezgif com-video-to-gif (19)](https://user-images.githubusercontent.com/58474431/233791668-0aeafb08-45c1-42b8-85cf-45a0a2a475b5.gif)

### 6. 상품 결제 기능
<br/>

![ezgif com-video-to-gif (7)](https://user-images.githubusercontent.com/58474431/232446884-7efe0b5a-bd02-4680-b51e-b218f33c6291.gif)

### 7. 상품 리뷰 기능
<br/>

![ezgif com-video-to-gif (8)](https://user-images.githubusercontent.com/58474431/232450094-68cd5ee6-a5dc-4a0e-b295-307cd02f9e05.gif)

### 8. 상품 Q&A 기능
<br/>

![ezgif com-video-to-gif (9)](https://user-images.githubusercontent.com/58474431/232452338-9cb40ba3-ed26-40cc-9ad7-a3c9ee442657.gif)

### 9. 백 오피스 기능

1) 상품 추가 기능
<br/>

![ezgif com-video-to-gif (11)](https://user-images.githubusercontent.com/58474431/232519347-1dc24145-51b9-408d-9fda-b2661c78fca2.gif)



2) 상품 수정 및 삭제 기능
<br/>

![ezgif com-video-to-gif (12)](https://user-images.githubusercontent.com/58474431/232531014-35233f8e-664c-4ad7-9506-af57b35229ed.gif)


3) Q&A 답변 기능
<br/>

![ezgif com-video-to-gif (13)](https://user-images.githubusercontent.com/58474431/232555087-3ce94720-6c5a-441d-856a-25107bd71fbf.gif)



