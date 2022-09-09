## store

- Redux의 핵심
- 모든 정보가 저장되는 곳

<br>

## state

- store 안에 있는 실제 정보
- state에 직접 접속하는 것은 금지되어 있음 → 누군가를 통해서 접속해야 함

<br>

## reducer

- store를 만들 때 가장 먼저 reducer라는 함수를 만들어서 공급해줘야 함
- Redux에서 가장 어려운 친구!
- reducer 함수 작성이 곧 Redux를 만드는 일이라고 해도 과언이 아님

```js
function reducer(oldState, action) {}
const store = Redux.createStore(reducer);
```

<br>

## render

- UI를 만들어주는 역할을 하는, 개발자가 짜야 할 코드
- 언제나 현재 state를 반영한 UI를 렌더링

<br>

## store의 창고 직원들 (함수들)

- 이 함수들과 render가 어떻게 협력하는지를 살펴봐야 함
- `getState`
  - store에서 값을 가져와서 render에게 전해줌
- `subscribe`
  - store의 state 값이 바뀔 때마다 render 함수를 호출하게 해줌
  - render 함수만 잘 만들면 state 값들이 바뀔 때마다 UI가 새롭게 갱신됨
- `dispatch`
  - action 객체를 전달 받음 → action의 타입에 따라 작업 진행
  - reducer를 호출해서 state 값을 변경
    - reducer 호출시 현재의 state와 action 객체, 2개의 값을 전달
  - 변경 이후 subscribe 함수를 이용해서 render 함수 호출
  - render 함수가 호출되면 getState를 통해 화면을 갱신
- `reducer`
  - dispatch로부터 현재 state와 action을 받았을 때, 둘을 조합하여 새로운 state 값을 만들어내서 반환
  - state 가공자

※ getState 예시

```js
function render() {
  const state = store.getState();
  document.querySelector('#app')innerHTML = `<h1>WEB</h1>`
}
```

※ action 객체가 dispatch로 전달되는 예시

```html
<form
  onsubmit="store.dispatch({type: 'create', payload:{title: title, desc: desc}});"
></form>
```

※ dispatch가 reducer를 호출하는 예시

```js
function reducer(state, action) {
  if (action.type === 'create') {
    let newContents = oldState.contents.concat();
    let newMaxId = oldState.maxId + 1;
    newContents.push({id: newMaxId, title: action.payload});

    return Object.assign({}, state, {
      contents: newContents,
      maxId: newMaxId,
      mode: 'read',
      selectedId: newMaxId
    });
  }
  ...
}
```
