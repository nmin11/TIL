## 1. TypeScript 프로젝트 만들기

- TS는 기본적으로 ESNext JS 문법을 포함하고 있지만 JS와는 완전히 다른 언어
- 그렇기 때문에 JS로 개발된 라이브러리들을 사용하려면 추가적으로 `@types/`를 앞에 붙여야 됨
  - 예를 들어 `chance` `ramda` 같은 JS 라이브러리들은 TS에서 `@types/chance` `@types/ramda`와 같이 사용
  - `@types/`가 앞에 붙는 라이브러리들은 항상 `index.d.ts`라는 이름의 파일을 사용하며 코드를 검증
  - TS는 웹 브라우저나 Node.js의 기본 타입들도 알지 못하므로 `@types/node`를 설치해줘야 함

<br>

## 2. module 이해하기

- TS에서는 index.ts와 같은 소스 파일을 **module**이라고 부름
- 이렇게 하는 이유는 코드 관리 및 유지보수를 편하게 하고, 모듈마다 고유한 기능을 구현하기 위함
- 이러한 작업을 **modulization**이라고 부름
- 어떤 module에 어떤 내용이 있는지를 알게 하도록 `export`와 `import`라는 키워드 제공

<br>

### export 키워드

- 다른 module에서 해당 module을 사용할 수 있도록 해줌
- `function` `interface` `class` `type` `let` `const` 키워드 앞에 붙일 수 있음

<br>

### import 키워드

```ts
import { symbols } from "path";
```

- 가장 기본적인 형태

```ts
import * as symbol from "path";
```

- 파일 전체를 import하고 symbol.method 와 같은 방식으로 호출할 수 있게 해줌

<br>

### export default 키워드

- JS와의 호환을 위해서 제공되는 구문
- module이 내보내는 기능 중 오직 1개에만 붙일 수 있음
- import를 통해 불러올 때 `{}` 없이 사용 가능
- export 키워드가 이미 있더라도 사용 가능

<br>
<br>

## 3. tsconfig.json 파일 살펴보기

- `tsc ---help`를 통해 tsc 명령어에 대해 알아볼 수 있음
- **compilerOptions** : 지정할 tsc 옵션들
  - **module** : 컴파일된 ES5 JS 코드의 동작 방식 설정
    - 웹 브라우저와 Node.js는 물리적 동작 방식이 다르기 때문에
    - JS module은 웹 브라우저에서는 AMD 방식으로, Node.js처럼 웹 브라우저가 아니면 CommonJS 방식으로 동작
    - 그러므로 웹 브라우저라면 `amd`, Node.js라면 `commonjs`로 설정
  - **moduleResolution** : module의 값이 commonjs라면 `node`로, amd라면 `classic`으로 설정
  - **target** : 트랜스파일할 JS의 버전 설정 (대부분 `es5` 지정)
  - **baseUrl & outDir** : 트랜스파일된 ES5 JS 파일을 저장할 디렉토리 설정
    - tsc는 tsconfig.json이 있는 디렉토리에서 실행되므로, tsconfig.json이 있는 디렉토리에서부터 계산해야 함
  - **paths** : import 문에서 from 부분을 해석할 때 찾아야 하는 디렉토리 설정
  - **esModuleInterop** : JS 라이브러리 중 웹 브라우저에서의 동작만을 기반으로 만들어진 것들을 위해 설정
  - **sourceMap** : 트랜스파일 디렉토리에 .js 외에도 .js.map 파일을 만들어줘서 디버깅할 수 있도록 해줌
  - **downlevelIteration** : 생성기 구문을 작동시키기 위해서 설정
  - **noImplicitAny** : false 지정 시, 타입을 지정하지 않더라도 문제로 인식하지 않게 해줌
- **include** : 컴파일 대상 지정
