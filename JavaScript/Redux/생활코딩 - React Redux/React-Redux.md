## 개념

- React를 React 답게! Redux를 Redux 답게!
- container component와 presentational component 분리

❖ [공식홈페이지](https://react-redux.js.org/)

<br>

## index.js에 Provider 설정

```js
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

- Provider로 감싸줘야 함
- Redux의 store를 공급해주는 역할
- React 프로젝트의 모든 컴포넌트는 store를 사용할 수 있게 됨

<br>

## connect()() 함수

- connect()를 실행하면 반환되는 값이 함수
- connect()는 `mapStateToProps`와 `mapDipatchToProps` 인자를 사용
  - `mapStateToProps` : Redux의 state를 React의 props로 매핑
    - Redux에서 store의 값이 변경될 때마다 호출되도록 약속된 함수
    - Redux의 state를 인자로 받도록 약속되어 있음
  - `mapDispatchToProps` : Redux의 dipatch를 React의 props로 매핑
    - `store.dispatch`라는 API가 공급됨
- 반환된 함수를 재실행해야 하는데, 여기에는 wrapping된 컴포넌트를 인자로 넣을 것
  - presentational component를 인자로 전달
- 내부적으로 컴포넌트가 렌더링될 때 subscribe를 해주고, 꺼질 때 unsubscribe도 해주기 때문에 효율적
- [connect.js explained](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e)

<br>

## useSelector & useDispatch

- connect 메소드의 2가지 인자가 분리된 함수
- 용도에 알맞게 한 가지 씩만 활용 가능
