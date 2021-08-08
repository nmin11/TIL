2021 / 07 / 09

# SPA (Single Page Application)

## SPA의 등장 배경

전통적인 웹 사이트는 페이지 이동 시 매번 페이지 전체를 불러와야 했다.  
하지만 SPA는 업데이트가 필요한 부분만 새로 불러올 수 있다.  
웹 사이트가 복잡해지고 애플리케이션의 형태를 가지게 되면서, 사용자와 서비스 사이의 상호작용 증가는 트래픽 증가와 사용자 경험의 저하를 야기했다.  
따라서 1990년대 후반에, HTML 문서 전체가 아니라 업데이트에 필요한 데이터만 받아서 JavaScript가 이 데이터를 조작하여 HTML 요소를 생성하고 화면에 보여주는 방식이 개발되었다.

</br>

## SPA의 개념

서버로부터 완전한 새로운 페이지를 대신 갱신에 필요한 데이터만 받아서 이를 기준으로 현재 페이지를 업데이트함으로써 사용자와 소통하는 웹 애플리케이션이나 웹 사이트

</br>

## SPA의 장점

- 사용자와의 Interaction에 빠르게 반응한다.
- 서버 과부하 문제가 현저하게 줄어든다.
- 전체 페이지를 렌더링할 필요가 없기에 더 나은 유저 경험을 제공한다.

</br>

## SPA의 단점

- JavaScript 파일의 크기가 크다.
- 첫 화면 로딩 시간이 길다.
- 검색 엔진은 HTML의 자료를 분석하지만 SPA는 JavaScript를 주로 사용하기 때문에 검색 엔진이 적절하게 동작하지 못한다.

=> SPA에서도 검색 엔진 최적화에 대응할 수 있도록 검색 엔진이 발전하고 있어서, 검색 엔진에 대한 단점은 사라지고 있는 추세이다.

</br>
</br>

# Router

SPA는 하나의 페이지를 가지고 있지만 사실 한 종류의 화면만 사용하지 않는다.  
예를 들어 Twittler와 같은 SPA를 만들 때, 메인 트윗 페이지, 알림 페이지, 마이 트윗 페이지 등의 화면이 필요할 수 있다.  
이 때 화면에 따라 **"주소"** 가 달라질 것이다.  
이렇게 다른 주소에 따라 다른 뷰를 보여주는 과정을 "경로에 따라 변경한다"라는 의미로 **Routing** 이라고 한다.  
리액트 자체에는 이 기능이 내장되어 있지 않다.  
우리가 직접 주소마다 다른 뷰를 보여줘야 한다.  
이런 번거로움을 줄이면서 라우팅을 사용하기 위해 **React Router** 라는 라이브러리를 가장 많이 사용한다.

</br>

## React Router 주요 컴포넌트

크게 3가지의 주요 컴포넌트를 가진다.  
라우터 역할을 하는 **BrowserRouter** , 경로를 매칭해주는 **Switch** 와 **Route** , 그리고 경로를 변경하는 역할을 하는 **Link** 가 있다.  
이 컴포넌트들을 사용하기 위해서 React Router 라이브러리에서 따로 불러와야 한다.  
다음 명령어를 통해 불러올 수 있다.

```javascript
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
```

import는 필요한 모듈을 불러오는 역할로 destructuring assignment(비구조화 할당)와 비슷하게 이용할 수 있다.  
react-router 설치 방법은 간단하다.

```
$ npx create-react-app route-sample
$ cd route-sample
$ npm install react-router-dom
```

</br>

### BrowserRouter

BrowserRouter는 웹 애플리케이션에서 HTML5의 [History API](https://developer.mozilla.org/ko/docs/Web/API/History_API) 를 사용해서 페이지를 새로고침하지 않고도 주소를 변경할 수 있는 역할을 해준다.  
아래와 같이 ReactDOM의 렌더 단계인 index.js에 넣어서 활용할 수도 있다.  
이처럼 BrowserRouter가 상위에 작성되어 있어야 Route 컴포넌트를 사용할 수 있다.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
```

</br>

### Switch, Route

경로를 매칭해주는 역할을 하는 컴포넌트이다.

</br>

#### Switch

Switch 컴포넌트는 여러 Route를 감싸서 그 중 경로가 일치하는 단 하나의 라우터만 렌더링을 시켜주는 역할을 한다.  
Switch를 사용하지 않으면 매칭되는 모든 요소를 렌더링한다.

</br>

#### Route

Route 컴포넌트는 path 속성을 지정하여 해당 path에 어떤 컴포넌트를 보여줄지 정한다.  
Link 컴포넌트가 정해주는 URL 경로와 일치하는 경우에만 작동된다.

</br>

### Link

경로를 연결해주는 역할을 하는 컴포넌트이다.  
페이지 전환을 통해 페이지를 새로 불러오지 않고 애플리케이션을 그대로 유지하면서 HTML5 History API를 이용해 페이지의 주소만 변경해준다.  
ReactDOM으로 렌더를 시키면 Link 컴포넌트는 a 태그로 바뀌는 모습을 볼 수 있다.

</br>
</br>

이렇게 알게 된 React Router의 주요 컴포넌트들을 활용해서 다음과 같이 App.js를 간단하게 구현해 볼 수 있다.

```javascript
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">MyPage</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <MyPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

</br>

### Home 컴포넌트 Route에만 존재하는 exact는 무엇일까?

React router 특성상 exact 속성이 없으면 해당 경로로 시작하는 중복된 Route 컴포넌트를 모두 보여준다.  
exact는 주어진 경로와 정확히 일치해야만 지정된 Route 컴포넌트를 보여주는 역할을 한다.

</br>
</br>

# Sprint - React Twittler SPA

Sprint 과제로 저번에도 했던 Twittler를 SPA 버전으로 업그레이드해보는 작업을 했다.  
주된 과제 내용은 버튼 클릭 시 Switch 컴포넌트를 활용해서 Route 컴포넌트들을 바꾸는 작업을 해보았다.  
거기다 추가적으로, Advanced Challenge에서는 잘 몰랐던 기능들을 구현해보기도 했다.  
오늘의 TIL에서는 내가 잘 몰랐던 부분들에 대해서 집중적으로 정리해보고자 한다.

</br>

## BrowserRouter에 이름 붙이기

BrowswerRouter는 다소 긴 이름을 가지고 있다.  
하지만 import할 때 이름을 달아주면 줄여서 사용할 수도 있다.  
이 방법이 DB에서 데이터를 가져올 때 컬럼에 별명을 지어주는 방식과 같아서 신기했다.

```javascript
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
```

</br>

## history를 이용해서 뒤로가기 버튼 만들기

useHistory() 메소드를 이용해서 브라우저의 뒤로가기 버튼을 따로 만들어 줄 수도 있다.

```javascript
const Sidebar = () => {
  const history = useHistory();

  return (
    <section>
      <Link to="/">
        <i className="far fa-comment-dots"></i>
      </Link>
      <Link to="/about">
        <i className="far fa-question-circle"></i>
      </Link>
      <Link to="/mypage">
        <i className="far fa-user"></i>
      </Link>
      <i className="fas fa-long-arrow-alt-left" onClick={() => {history.goBack();}}>
    </section>
  );
};

export default Sidebar;
```

useHistory()메소드를 사용하는 hitory라는 변수를 지정하고 특정 버튼에 onClick 이벤트로 goBack() 메소드를 다시 호출해주는 방식이다.

</br>

## NavLink 컴포넌트로 Active한 스타일 적용하기

```css
.navActive {
  border-radius: 50%;
  background-color: #e0ffff;
}
```

```javascript
const Sidebar = () => {
  const history = useHistory();

  return (
    <section>
      <NavLink to="/" activeClassName="navActive">
        <i className="far fa-comment-dots"></i>
      </NavLink>
      <NavLink to="/about" activeClassName="navActive">
        <i className="far fa-question-circle"></i>
      </NavLink>
      <NavLink to="/mypage" activeClassName="navActive">
        <i className="far fa-user"></i>
      </NavLink>
      <i className="fas fa-long-arrow-alt-left" onClick={() => {history.goBack();}}>
    </section>
  );
};

export default Sidebar;
```

위와 같이 적용하면 NavLink 컴포넌트의 to에 적혀있는 URL과 현재 URL이 같다면, 지정해둔 CSS가 작용한다.
