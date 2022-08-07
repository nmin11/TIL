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

<br>
<br>

## 2. TypeScript 주요 문법

- TypeScript를 다루려면 ESNext 문법을 알아야 함
- 그리고 TypeScript만의 고유한 문법도 있음

<br>

### ESNext 주요 문법

**destructuring assignment**

```ts
let person = { name: "Loko", age: 28 };
let { name, age } = person;

let array = [1, 2, 3, 4];
let [head, ...rest] = array;

let a = 1,
  b = 2;
[a, b] = [b, a];
```

- 객체와 배열에 적용 가능
- 객체의 각 멤버를 쉽게 얻어낼 수 있음
- 배열에서 첫번째 요소와 나머지 요소를 손쉽게 구분 가능
- 값을 서로 교환하는 swap도 가능

**화살표 함수**

```ts
const add = (a, b) => a + b;
```

**class**

```ts
abstract class Animal {
  constructor(public name?: string, public age?: number) {}
  abstract say(): string;
}

class Cat extends Animal {
  say() {
    return "Meow";
  }
}

class Dog extends Animal {
  say() {
    return "Bark";
  }
}

let animals: Animal[] = [new Cat("Coco", 2), new Dog("Gold", 3)];
let sounds = animals.map((a) => a.say());
```

- C++, Java처럼 객체지향 프로그래밍을 지원하기 위해 클래스 기능 제공
- 객체지향 프로그래밍 언어가 됨으로써 캡슐화, 상속, 다형성 지원

**module**

```ts
import * as fs from "fs";
export function writeFile(filepath: string, content: any) {
  fs.writeFile(filepath, content, (err) => {
    err && console.log("error", err);
  });
}
```

- 코드를 여러 개의 파일로 분할해서 작성하도록 해주는 기능
- 변수나 함수, 클래스 등에 `export` 키워드를 사용하면 다른 파일에서도 사용 가능
- 가져올 때는 `import` 키워드 사용

**생성기**

```ts
function* gen() {
  yield* [1, 2];
}
for (let value of gen()) {
  console.log(value);
}
```

- `yield` : TS는 물론 Python이나 PHP에서도 제공하는 '반복기 제공자'
- 생성기는 `function*` 키워드와 `yield` 키워드를 사용해서 만들 수 있음
- 위 함수는 2행에서 일시 정지한 후 4행을 실행하는데, 4행은 2행의 배열을 모두 순회할 때까지 반복 실행됨

**Promise & async/await**

```ts
async function get() {
  let values = [];
  values.push(await Promise.resolve(1));
  values.push(await Promise.resolve(2));
  values.push(await Promise.resolve(3));
  return values;
}
get().then((values) => console.log(values));
```

- `Promise` : 웹 브라우저와 Node.js에서 제공하는 기본 타입, 비동기 콜백 함수를 비교적 쉽게 구현
- `async/await` : 여러 개의 Promise 호출을 더욱 간결하게 구현
