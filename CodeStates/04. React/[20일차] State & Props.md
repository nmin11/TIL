2021 / 07 / 12

## State & Props Intro

### State

- 살면서 변할 수 있는 값
- 컴포넌트의 사용 중 컴포넌트 내부에서 변할 수 있는 값

</br>

### Props

- 외부로부터 전달받은 값

</br>

# Props

## props의 특징

- 컴포넌트의 속성(property)을 의미한다.  
  성별이나 이름처럼 변하지 않는 **외부로부터 전달받은 값**으로, 웹 애플리케이션에서 해당 컴포넌트가 가진 속성에 해당한다.
- 부모 컴포넌트로부터 전달받은 값이다.  
  React 컴포넌트는 JavaScript 함수와 클래스로 props를 함수의 전달인자(argument)처럼 전달받아 이를 기반으로 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.  
  따라서, 컴포넌트가 최초 렌더링될 때에 화면에 출력하고자 하는 데이터를 담은 초기값으로 사용할 수 있다.
- **객체 형태**이다.  
  props로 어떤 타입의 값이라도 넣어서 전달할 수 있도록 props는 객체의 형태를 가진다.
- 읽기 전용이다.  
  props는 외부로부터 전달받은 후 변하지 않는 값이다.  
  그래서 props는 함부로 변경될 수 없는 읽기 전용(read-only) 객체가 되었다.

</br>

## How to use props

1. 하위 컴포넌트에 전달하고자 하는 값(data)과 속성을 정의한다.
2. props를 이용하여 정의된 값과 속성을 전달한다.
3. 전달받은 props를 렌더링한다.

```javascript
function Parent() {
  return (
    <div className="parent">
      <h1>I'm the parent</h1>
      <Child text={"I'm the eldest child"} />
      <Child />
    </div>
  );
}

function Child(props) {
  console.log("props : ", props);
  return (
    <div className="child">
      <p>{props.text}</p>
    </div>
  );
}

export default Parent;
```

또 다른 방법으로 태그 사이에 value를 넣어 전달할 수 있다.  
이 경우 props.children을 이용해서 해당 value 접근하여 사용할 수 있다.

```javascript
function Parent() {
  return (
    <div className="parent">
      <h1>I'm the parent</h1>
      <Child>I'm the eldest child</Child>
    </div>
  );
}

function Child(props) {
  return (
    <div className="child">
      <p>{props.children}</p>
    </div>
  );
}

export default Parent;
```

</br>

### props를 활용한 또다른 예제

```javascript
const App = () => {
  const itemOne = "React를";
  const itemTwo = "배우고 있습니다.";

  return (
    <div className="App">
      <Learn text1={itemOne} />
      <Learn text2={itemTwo} />
    </div>
  );
};

const Learn = (props) => {
  return (
    <div className="Learn">
      <span>{props.text1}</span> <span>{props.text2}</span>
    </div>
  );
};

export default App;
```

</br>
</br>

# State

## 애플리케이션의 "상태"

다음 코드는 체크박스를 예시로 state를 활용한 방법이다.

```javascript
import React, { useState } from "react";
import "./styles.css";

function CheckboxExample() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="App">
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      <span>{isChecked ? "Checked!!" : "Unchecked"}</span>
    </div>
  );
}

export default CheckboxExample;
```

위와 같이 컴포넌트 내에서 변할 수 있는 값, 즉 상태는 React state로 다뤄야 한다.

</br>

## State hook, useState

React에서는 state를 다루는 방법 중 하나로 useState라는 특별한 함수를 제공한다.  
useState를 사용하기 위해서 다음과 같이 import를 해야 한다.

```javascript
import React, { useState } from "react";
```

이후에 useState를 컴포넌트 안에서 호출한다.  
useState를 호출한다는 것은 "state"라는 변수를 선언하는 것과 같으며, 변수의 이름은 마음대로 지정할 수 있다.  
일반적인 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 함수가 끝나도 사라지지 않는다.  
useState를 이해하기 쉽게 풀자면 이렇다.

```javascript
const [state 저장 변수, state 갱신 함수] = useState(상태 초기 값);
```

이 state 변수에 저장된 값을 사용하려면 JSX 엘리먼트 안에서 직접 불러서 사용하면 된다.  
이에 해당하는 예시는 다음과 같다.

```javascript
<span>{isChecked ? "Checked!!" : "Unchecked"}</span>
```

</br>

### state 갱신하기

state를 갱신하려면 useState를 할당할 때 사용했던 state 갱신 함수를 호출한다.  
state 갱신 함수가 호출되면 호출된 결과에 따라 state 저장 변수가 갱신되며, React는 새로운 state 저장 변수를 컴포넌트에 넘겨서 해당 컴포넌트를 다시 렌더링한다.

### state hook 사용 시 주의점

React 컴포넌트는 state가 변경되면 새롭게 호출되고 리렌더링된다.

</br>
</br>

# 이벤트 처리

React의 이벤트 처리 방식은 DOM의 이벤트 처리 방식과 유사하다.  
단, 몇 가지 문법에서의 차이가 있다.

- React에서 이벤트는 소문자 대신 camelCase를 사용한다.
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 처리 함수를 전달한다.

이러한 차이점을 뚜렷하게 표현하자면 다음과 같다.

```javascript
//HTML의 이벤트 처리 방식
<button onclick="handleEvent()">Event</button>

//React의 이벤트 처리 방식
<button onClick={handleEvent}>Event</button>
```

</br>

## onChange

input, textarea, select와 같은 Form 엘리먼트는 사용자의 입력값을 제어하는 데 사용된다.  
React에서는 이러한 **변경될 수 있는 입력값**을 일반적으로 **컴포넌트의 state**로 관리하고 업데이트한다.  
onChange 이벤트가 발생하면 e.target.value를 통해 이벤트 객체에 담겨있는 input 값을 읽어올 수 있다.  
이렇게 불러온 값을 setState를 통해 새로운 state로 갱신한다.

</br>

## onClick

사용자가 클릭을 했을 때 발생하는 이벤트이다.  
button이나 a 태그와 같이 주로 사용자의 행동에 따라 애플리케이션이 반응해야 할 때 자주 사용하는 이벤트이다.  
다음은 input 창에 이름을 입력하고 버튼을 누를 경우 입력한 이름을 alert 창으로 띄우는 예제이다.

```javascript
function NameForm() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleChange}></input>
      <button onClick={alert(name)}>Button</button>
      <h1>{name}</h1>
    </div>
  );
}
```

위와 같이 onClick 이벤트에 alert(name) 함수를 바로 호출하면 컴포넌트가 렌더링될 때 함수 자체가 아닌 함수 호출의 결과가 onClick에 적용된다.  
때문에 버튼을 클릭할 때가 아닌, 컴포넌트가 렌더링될 때에 alert이 실행되고 따라서 그 결과인 undefined가 onClick에 적용되어서 클릭했을 때 아무런 결과도 일어나지 않는다.  
따라서 onClick 이벤트에 함수를 전달할 때는 함수를 호출하는 것이 아니라 리턴문 안에서 함수를 정의하거나 리턴문 외부에서 함수를 정의 후 이벤트에 함수 자체를 전달해야 한다.  
단, 두가지 방법 모두 arrow function을 활용해야 해당 컴포넌트가 가진 state에 함수들이 접근할 수 있다.

```javascript
//리턴문 안에서 직접 정의
<button onClick={() => alert(name)}>Button</button>;

//리턴문 외부 함수 활용
const handleClick = () => {
  alert(name);
};

<button onClick={handleClick}>Button</button>;
```

</br>

## select 태그 예제

```javascript
import React, { useState } from "react";
import "./styles.css";

function SelectExample() {
  const [choice, setChoice] = useState("apple");

  const fruits = ["apple", "orange", "pineapple", "strawberry", "grape"];
  const options = fruits.map((fruit) => {
    return <option value={fruit}>{fruit}</option>;
  });

  const handleFruit = (event) => {
    // drop down 목록에서 선택된 과일로 현재의 state 가 업데이트 되도록
    // 함수를 완성하세요.
    setChoice(event.target.value);
  };

  return (
    <div className="App">
      <select onChange={handleFruit}>
        {/* drop down 목록을 열어 과일을 선택할 수 있도록 select tag 를 완성하세요 */}
        {options}
      </select>
      <h3>You choose "{choice}"</h3>
    </div>
  );
}

export default SelectExample;
```

</br>

## 팝업창 예제

```javascript
import React, { useState } from "react";
import "./styles.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    // Pop up 의 open/close 상태에 따라
    // 현재 state 가 업데이트 되도록 함수를 완성하세요.
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <h1>Fix me to open Pop Up</h1>
      {/* 버튼을 클릭했을 때 Pop up 의 open/close 가 작동하도록
          button tag를 완성하세요. */}
      <button className="open" onClick={togglePopup}>
        Open me
      </button>
      {showPopup ? (
        <div className="popup">
          <div className="popup_inner">
            <h2>Success!</h2>
            <button className="close" onClick={togglePopup}>
              Close me
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
```

</br>

## 화살표 함수를 활용해서 input의 value를 복사하는 예제

```javascript
import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="App">
      <div>{username}</div>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="여기는 인풋입니다."
        className="tweetForm__input--username"
      ></input>
      <div>{msg}</div>
      <textarea
        placeholder="여기는 텍스트 영역입니다."
        className="tweetForm__input--message"
        onChange={(event) => setMsg(event.target.value)}
      ></textarea>
    </div>
  );
}
```
