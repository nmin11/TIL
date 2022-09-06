※ 제로초님의 [웹 게임을 만들며 배우는 React에 TypeScript 적용하기](https://www.inflearn.com/course/react-typescript-webgame) 강의를 들으며 정리한 내용입니다.

<br>

## React + TypeScript 기본적인 참고 사항

### TypeScript와 Webpack

- TS는 자체적으로 ES3 ~ ES5까지 컴파일 지원
- 따라서 Babel을 반드시 사용할 필요는 없지만 사용하는 경우도 있긴 있음
- 그러므로 TS와 Webpack을 연결해주면 됨
- 강의에서는 ts-loader를 사용해서 TS와 Webpack 연결

### TypeScript에서 라이브러리를 설치 시 참고해야 할 유형들

1. 아예 TS로 만들어져서 알아서 TS를 지원하는 친구들 (redux)
2. `d.ts` 파일을 제공해서 TS 정의가 필요 없는 친구들 (axios)
3. JS로 만들어져서 TS 지원이 안되는 친구들 (react / react-dom)<br>→ DefinitleyTyped 라는 커뮤니티에서 지원해줄 수 있으니 찾아볼 것<br>ex) @types/react

### tsconfig.json 설정

```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES5", "ES2015", "DOM"],
    "jsx": "react"
  }
}
```

- `strict` 값을 true로 주지 않으면 TS를 사용하는 의미가 퇴색됨
- `lib`에서는 만약 배열의 include 기능을 사용하고 싶다면 ES2016 도 추가해줘야 함
  - 편하게 사용하려면 2015 ~ 2020 다 적용해두는 것이 좋음
- `esModuleInterop` 옵션으로 import 구문을 단순화할 순 있지만 제로초님은 사용하지 않고 명시하는 것을 추천

### class는 권장되지 않음

- React에서도 공식적으로 추천하지 않음
- 신규 프로젝트는 Hooks로 만드는 것을 추천
- class는 설계가 까다로움

### 라이브러리의 TS 지원

- node_modules 디렉토리에서 해당 라이브러리 디렉토리를 찾아서 `.d.ts` 파일이 있는지 확인할 것

<br>

## React + TypeScript 팁

### useRef

- 화면에 영향을 주지 않는 것들은 `ref`로 만듦
- initialValue에 따라 type definition이 달라짐
  - readonly 타입이 되지 않도록 적절한 초기값 설정이 중요함
  - 제네릭과 매개변수의 형태를 잘 참조해서 선언해주는 것이 좋음

### never[]

- 빈 배열 `[]`은 TS에서 에러의 주범
- `number[]`와 같이 타입을 지정했다 하더라도 초기값을 `[]`와 같이 주면 에러 발생
- 타입을 명시해서 지정할 것

### timeout 에러

- TS는 Node의 timeout인지, 브라우저의 timeout인지 모르기 때문에 확실히 지정해줘야 함

### 타입 추론 활용

- `typeof` `keyof`는 연속적으로 사용하는 경우가 많음
- 반복 사용하다 보면 타입이 어떻게 되었는지 헷갈릴 때가 있는데, 마우스를 호버해서 꼭 살펴볼 것

### Reducer

- 흩어져 있는 State 들을 하나의 State 로 관리
- Redux 에서도 쓰이는 개념
- `useReducer`는 Redux 의 축소 버전

```ts
const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  ...
}
```

※ 초기 state 값을 받아서 action 실행

```ts
const [state, dispatch] = useReducer<Reducer<ReducerState, ReducerActions>>(
  reducer,
  initialState
);
const { tableData, turn, winner, recentCall } = state;
```

### ReactNode

- HTML 형식으로 짜여 있는 부분들은 ReactNode
- 그 안에 ReactChild, ReactText 등의 하위 타입들이 존재

<br>

## Redux

### 사용 이유

- useReducer와 Context API가 합쳐져 있기 때문
  - 추가적으로 middleware 기능 제공
- 따라서 Context API와 Redux 사이에서 고민 중일 때는 middleware 사용 여부를 먼저 생각해볼 것

<br>

## MobX

### MobX와 Redux

- MobX는 자동으로 처리해주는 부분들이 많아서 Redux에 비해 코드가 간결함
- 대신 Redux는 세부적으로 설정 가능한 부분들이 많음

### userObserver / observable

- observable 안에 포함하고 있는 값들이 변경하면 작동하는 방식
