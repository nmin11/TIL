## Redux

Rudux는 JavaScript 앱들의 예측 가능한 state container이다.  
상태 관리 라이브러리라고도 부른다.  
여기서 state이 무엇인지에 대해 이해하기 위해서 props와 state를 비교해가며 이해하는 작업이 필요하다.

</br>

## Props

properties의 줄임말이다.  
컴포넌트 간에 무언가를 주고 받을 때는 props를 이용해야 한다.  
소통하는 방식은 부모에서 자식으로만 보낼 수 있다.  
자식 컴포넌트에서 받은 부모의 값은 변경이 불가능하다.  
만약 값을 변경하고자 한다면 부모 컴포넌트에서 값을 다시 내려줘야 한다.

```javascript
<ChatMessages message={message} currentMember={member} />
```

</br>

## State

컴포넌트 안에서 데이터를 주고받는 방식이다.  
전달받은 값을 변경할 수 있으며, 값이 변경될 때 re-render 작업이 일어난다.

```javascript
state = {
  message: "",
  attachFile: undefined,
  openMenu: false,
};
```

Redux에 대해 다시 이야기해보자면, Redux는 이러한 state를 관리하는 tool이라고 생각하면 된다.  
사실 Redux는 Learning Curve가 높지만 자주 사용하다보면 익숙해질 것이다.
