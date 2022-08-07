## 1. TypeScript란 무엇인가?

### 3종류의 JavaScript

- ES5(ECMAScript 5) : 웹 브라우저에서 동작하는 표준 JS
- ESNext : 2015년부터 매년 새로운 버전을 발표하는 '새로운 JS'
  - 2015년에 발표된 ES6 버전에서 큰 변화가 있었기 때문에 '새로운 JavaScript'라는 뜻에서 'ESNext'라고 함
  - 또한 이 때부터 ECMAScript 공식 버전 표기법이 바뀌어서, 'ECMAScript 2015(ES2015)'라고 표기하게 됨
- TypeScript : ESNext에 타입 기능을 추가한 것

<br>

### transpile

- ESNext JS 코드는 Babel이라는 transpiler를 거치면 ES5 JS 코드로 변환됨
- 이와 유사하게 TypeScript 코드는 TypeScript compiler(TSC)라는 transpiler를 통해 ES5 JS 코드로 변환됨
- transpiler : 어떤 언어로 쓰인 코드를 다른 언어로 된 코드로 바꿔주는 프로그램
  - text로 된 코드를 binary 코드로 바꿔주는 compiler와 구분하기 위해서 생긴 용어
  - 그러나 compile과 transpile은 '뭔가를 또다른 무엇으로 바꿔준다'는 관점에서 큰 차이가 없으므로,<br>최근에는 둘을 구분하지 않는 경향이 있음
