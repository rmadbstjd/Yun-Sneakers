<h1>Yun's Neakers</h1>

# 주요기능
### 1. 로그인
* Access Token + Refresh Token을 이용한 로그인 인증
* 상품 검색
* 상품 필터링
* 장바구니
* 결제
* 리뷰 작성
* 마이 페이지

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

# 기술적 의사결정

* 세션 기반 로그인 vs 토큰 기반 인증
<br/>
세션의 큰 단점으로 확장성 , 서버의 과부하 등이 있다.
확장성으로는 일반적인 서버 확장 방식으로 스케일 업이 아닌 스케일 아웃을 사용하는데, 이 때 세션 불일치 문제가 발생하는데
이를 해결하기 위해 Sticky Session이나 Session Clustering 같은 작업을 별도로 해주어야 한다.
토큰 기반 인증은 서버가 직접 인증 방식을 저장하지 않고, 클라이언트가 저장하기 때문에 이러한 문제로부터 자유롭다.
또한 세션 기반 인증 방식은 세션 데이터를 서버가 직접 저장하고, 관리하기 때문에 사용자가 많아질수록 서버의 부담이 증가되나
토큰 기반 인증은 인증 데이터를 직접 갖고 있기 때문에 사용자가 아무리 많아져도 서버의 부담이 증가하지 않는다.
나의 프로젝트에 대입해봤을 때, 실제 서비스를 목적으로 만든 것이 아닌 학습용으로 만들다보니 서버도 한 개만 사용하고,
사용자가 서버에 부담을 줄 정도로 늘어나지 않으므로 세션 기반 로그인을 고려했으나 최근 이러한 문제들로 인해
점점 토큰 기반 인증을 사용하려고 하는 추세이고, 이전 프로젝트에서도 토큰 기반 인증을 사용했는데 Access Token만 구현하고
Refresh Token은 사용하지 못한 점이 아쉬워서 이번에는 Access Token + Refresh Token을 사용한 토큰 기반 방식을 사용하려고 한다.
<br/>

* SQL vs NO SQL
<br/>
사실 이 부분에 대해서 고민을 많이 하였고 어느 데이터베이스가 내 프로젝트에 적합한지 검색도 많이 해보았다. 
NO SQL를 선택하게된 가장 큰 이유는 MVP를 구성하고 DB 스키마 설계를 잘 하더라도,
막상 개발에 들어가면 예상치 못한 상황으로 수정해야 할 스키마도 많고, 프로젝트를 만들면서 부족한 기능이나 추가하고 싶은 기능들이 많을 것 같아서
변경 및 확장될 가능성이 높기 때문에 NO SQL를 선택하게 됐다.
<br/> 

* 상태 관리 라이브러리

서비스의 규모가 커질수록 관리해야할 state가 많아지고 props drilling을 방지하기 위해 상태 관리 라이브러리를 사용하려고 한다.
대표적인 Client state 관리 라이브러리인 Redux, Redux-toolkit, zustand를 고려해봤다.
각각의 장단점을 살펴보면
Redux의 경우, 검증된 신뢰성이 높은 라이브러리이고 Redux DevTools를 이용해 디버깅적인 측면에서 효율적이다.
다만, 작은 상태 하나를 변경하려고 해도, actions, reducer, type 등 보일러 플레이트 코드를 작성해야 하는 번거로움이 있다.
또한 비동기 처리를 하려고 할 때, redux-saga, redux-thunk와 같은 미들웨어를 추가적으로 설치하여 사용해야한다.

Redux-toolkit의 경우, Redux의 단점으로 생각되는 보일러 플레이트 코드를 줄여준다.
또한 redux Devtools, immer, reselect 등 여러가지 기능들이 내장되어 있어서 패키지의 의존성을 줄여줄 수 있다.
단점으로는 zustand와 비교하여 Redux-toolkit의 경우 11.8MB라는 큰 사이즈를 갖고 있다.

Zustand의 경우, 동작을 이해하기 위해 알아야하는 코드의 양이 매우 적어서 이해하기 쉽다.
Redux를 축소화시킨 느낌으로 187KB라는 압도적으로 작은 사이즈를 갖고 있으며, 작은 크기에 맞게 간단한게 설정하여 사용할 수 있고,
subscribe 기능을 사용하면 자주 렌더링 되는 항목에 대해서 렌더링을 유발하지 않고 Redux Tools를 사용할 수 있어 디버깅에도 매우 용이하다.

각각의 라이브러리들을 비교해봤을때 프로젝트의 규모에 비해 Redux 및 Redux-toolkit을 사용하기엔 많이 무겁고 불필요한 기능들이 많이 내장되어있다고 판단하여
Zustand를 사용하기로 결정하였다.

마지막으로, Zustand가 본연의 역할에 충실할 수 있도록 서버 데이터 상태 관리 라이브러리인 React-Query를 사용하여 클라이언트 데이터와 서버 데이터를 분리하려고 한다.
서버 데이터 상태 관리 라이브러리를 사용함으로써 얻는 장점으로 크게 3가지가 있을 수 있다.
서버와의 통신 과정에서 로딩 상태, 에러 여부 등을 컴포넌트 내부에서 직접 상태를 작성하여 관리하지 않아도 되고,
자동 데이터 캐싱을 통해 서버에게 가하는 부담을 줄일 수 있다. 마지막으로 일정 시간이 지나거나, 데이터의 변동이 생겼을 때 캐싱된 데이터를 삭제하고,
다시 데이터를 받아와 최신의 상태로 유지한다는 점이다.
또한 프로젝트에서 무한 스크롤의 기능을 구현할 계획이었는데 리액트 쿼리의 useInfiniteQuery() 기능을 통해 무한스크롤을 쉽게 구현할 수 있다는 장점이 있다.
<br/>
