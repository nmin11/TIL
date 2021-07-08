2021 / 07 / 07

# What is React?

프론트엔드 개발을 위한 JavaScript 오픈소스 라이브러리이다.  
리액트는 선언형이고, 컴포넌트 기반이고, 다양한 곳에서 활용할 수 있다는 특징이 있다.

</br>

## 선언형 (Declarative)

리액트는 한 페이지를 보여주기 위해 HTML / CSS / JS 로 나눠서 적기 보다는 하나의 파일에 명시적으로 작성할 수 있게 JSX를 활용한 선언형 프로그래밍을 지향한다.

</br>

## 컴포넌트 기반 (Component-Based)

리액트는 하나의 기능 구현을 위해 여러 종류의 코드를 묶어둔 컴포넌트를 기반으로 개발한다.  
컴포넌트로 분리하면 서로 독립적이고 재사용 가능하기 때문에, 기능 자체에 집중하여 개발할 수 있다.

</br>

## 범용성 (Learn Once, Write Anywhere)

리액트는 JavaScript 프로젝트 어디에든 유용하게 적용될 수 있다.  
Facebook에서 관리되어 안정적이고, 가장 유명하며, 리액트 네이티브 모바일도 가능하다.

</br>
</br>

# JSX

JSX는 JavaScript XML의 줄임말로 문자열도 아니고 HTML도 아니다.  
리액트에서 UI를 구성할 때 사용하는 문법으로 **JavaScript를 확장한 문법** 이다.  
이 문법을 이용해서 리액트 엘리먼트를 만들 수 있다.

</br>

JSX는 브라우저가 바로 실행할 수 없다.  
따라서 브라우저가 이해할 수 있는 JavaScript 코드로 변환을 해주어야 하는데, 이 때 이용하는 것이 **Babel** 이다.  
Babel은 JSX를 브라우저가 이해할 수 있는 JavaScript로 컴파일한다.  
컴파일 후, 컴파일된 JavaScript를 브라우저가 읽고 화면에 렌더링한다.

</br>

리액트에서는 DOM과 다르게 CSS, JSX 문법만을 가지고 웹 애플리케이션을 개발할 수 있다.  
즉, 컴포넌트 하나를 구현하기 위해서 필요한 파일이 줄어들었고, 한눈에 컴포넌트를 확인할 수 있게 되었다.  
JSX를 사용하면 JavaScript만으로 markup 형태의 코드를 작성하여 DOM에 배치할 수 있게 되는 것이다.  
한 가지 주의할 점은 JSX는 HTML처럼 생겼지만 HTML이 아니기 때문에 Babel을 통한 컴파일 과정이 필요하다는 점이다.

</br>

다음 코드는 JSX 없이 리액트를 구현한 예시와 JSX를 활용하여 리액트를 구현한 예시이다.

```javascript
function App() {
  const user = {
    firstName: "React",
    lastName: "JSX Activity",
  };

  function formatName(user) {
    return user.firstName + " " + user.lastName;
  }

  // JSX 없이 활용한 React
  return React.createElement("h1", null, `Hello, ${formatName(user)}!`);

  // JSX 를 활용한 React
  return <h1>Hi, {formatName(user)}!</h1>;
}

export default App;
```

이처럼 JSX를 활용하면 코드의 복잡성을 줄이고 이해하기 쉽게 만들 수 있다.

</br>

## JSX 규칙

1. 하나의 엘리먼트 안에 모든 엘리먼트가 포함  
   JSX에서 여러 엘리먼트를 작성하고자 하는 경우, opening tag와 closing tag로 감싸주어야 한다.

```javascript
<div>
  <div>
    <h1>Hello</h1>
  </div>
  <div>
    <h2>World</h2>
  </div>
</div>
```

2. CSS class 속성을 지정하려면 class 대신 className으로 표기해야 한다.  
   class로 작성하게 된다면 리액트에서 이를 HTML 클래스 속성 대신 JavaScript 클래스로 받아들인다.

```javascript
<div className="greeting">Hello!</div>
```

3. JSX에서 JavaScript를 쓰고자 한다면 꼭 중괄호{}를 이용해야 한다.  
   사용하지 않으면 일반 텍스트로 인식한다.

```javascript
function App() {
    const name = 'Josh Perez';

    return {
        <div>
            Hello, {name}!
        </div>
    };
}
```

4. 사용자 정의 컴포넌트는 대문자로 시작한다.  
   소문자로 시작하게 되면 일반적인 HTML 엘리먼트로 인식하게 된다.  
   대문자로 작성한 JSX 컴포넌트를 따로 사용자 정의 컴포넌트라고 부른다.

```javascript
function Hello() {
  return <div>Hello!</div>;
}

function HelloWorld() {
  return <Hello />;
}
```

5. 조건부 렌더링은 if문 대신 삼항연산자를 이용해야 한다.

```javascript
<div>{1 + 1 === 2 ? <p>정답</p> : <p>오답</p>}</div>
```

6. 여러 개의 HTML 엘리먼트를 표시할 때 map() 함수를 사용한다.  
   map() 함수를 사용할 때는 반드시 "key" JSX 속성을 넣어야 한다.

```javascript
const posts = [
    {id: 1, title: 'Good Morning', content: 'Such a nice day'}
    {id: 2, title: 'React is funny', content: 'Yeah, really'}
];

function Blog() {
    const content = posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {content}
        </div>
    );
}
```

</br>

## map을 이용한 반복

위쪽의 6번 규칙에서도 잠시 살펴보았지만 map을 이용하면 배열 속 객체들을 반복적으로 렌더링할 수 있다.  
map의 특성을 다시 떠올려보자면, 배열 각 요소를 특정 논리(함수)에 의해 다른 요소로 지정하는 것이라고 할 수 있다.  
아래와 같이 간단하게 활용할 수 있다.

```javascript
const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React via npm." },
  {
    id: 3,
    title: "reusable component",
    content: "render easy with reusable component.",
  },
  // ...
  { id: 100, title: "I just got hired!", content: "OMG!" },
];

function Blog() {
  const postToElement = (post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  const blogs = posts.map(postToElement);

  return <div className="post-wrapper">{blogs}</div>;
}
```

return문 안에 map 메소드를 사용할 수도 있다.  
JSX를 사용하면 중괄호 안에 모든 표현식을 포함할 수 있기 때문에 map 메소드의 결과를 return문 안에 인라인으로 처리할 수 있다.  
코드 가독성을 위해 변수로 추출할지 아니면 인라인에 넣을지는 개발자가 판단해야 할 몫이다.

</br>

## key 속성

key 속성값은 가능하면 데이터에서 제공하는 id를 할당해야 한다.  
key 속성값은 id와 마찬가지로 변하지 않고, 예상 가능하며, 유일해야 하기 때문이다.  
고유한 id가 없는 경우에만 배열 인덱스를 넣어서 해결할 수 있지만 이는 최후의 수단으로만 사용한다.

</br>

## Component

정의 : 하나의 기능 구현을 위한 여러 종류의 코드 묶음 / UI를 구성하는 필수 요소

</br>

모든 리액트 애플리케이션은 최소 한 개의 컴포넌트를 가지고 있으며, 이 컴포넌트는 애플리케이션 내부적으로는 근원(root)이 되는 역할을 한다.  
이 최상위 컴포넌트는 근원의 역할을 하므로 다른 자식 컴포넌트를 가질 수 있다.  
이러한 계층적 구조를 트리 구조로 형상화할 수 있다.  
그리고 각각의 컴포넌트는 각자 고유의 기능을 가지고 있으면서 UI의 한 부분을 담담하고 있다.  
이러한 컴포넌트들을 한데 모아 복잡한 UI를 구성할 수도 있고, 최종적으로는 복잡한 어플리케이션을 만들 수 있다.

</br>
</br>

# Create React App

Create Reat App은 리액트 SPA를 쉽고 빠르게 개발할 수 있도록 만들어진 툴 체인이다.  
설치 방법은 간단하다.  
터미널을 열어서 설치하고 싶은 폴더에 간 다음, npx create-react-app (프로젝트 이름) 이라고 명령어를 입력하면 맨 마지막에 happy hacking! 이라는 문구와 함께 설치가 완료된다.
