## 호출 스택, 이벤트 루프

```js
function first() {
  second();
  console.log("첫 번째");
}
function second() {
  third();
  console.log("두 번째");
}
function third() {
  console.log("세 번째");
}
first();
```

- 세 번째 → 두 번째 → 첫 번째
- 위 코드의 실행 순서를 쉽게 알기 위해서 호출 스택을 그려볼 줄 알아야 함
- 함수들은 호출될 때 스택에 쌓이고, 실행이 완료되면 역순으로 스택에서 빠져나감
- 참고로 모든 함수보다 앞에, anonymous가 먼저 호출에 스택에 쌓이고, 모든 함수 실행이 완료되면 anonymous도 빠져나감

```js
function run() {
  console.log("3초 후 실행");
}
console.log("시작");
setTimeout(run, 3000);
console.log("끝");
```

- 시작 → 끝 → 3초 후 실행
- 위 코드는 호출 스택 + 이벤트 루프로 이해해야 함
- `setTimeout`은 바로 실행되지 않고 background로 이동하고, 시간 지연을 거친 뒤 task queue로 갔다가<br>호출 stack이 비어있을 때 비로소 호출 stack으로 이동해서 실행을 완료함

```js
function oneMore() {
  console.log("one more");
}
function run() {
  console.log("run");
  setTimeout(() => {
    console.log("wow");
  }, 0);
  new Promise((resolve) => {
    resolve("hi");
  }).then(console.log);
  oneMore();
}

setTimeout(run, 5000);
```

- run → one more → hi → wow
- `Promise`는 `then` 이전까지는 blocking 실행, `then` 부분은 background로 이동함
- 대신 `Promise`는 task queue에 있을 때, setTimeout보다 우선순위를 부여받을 수 있음
- 사실은 이보다 더 자세한 우선순위 관련 규칙들이 있기는 함
- `process.nextTick` 또한 우선순위를 가짐
- 사실 노드에서는 `setTimeout` 0초보다는 `setImmediate`를 주로 사용

<br>
<br>

## ES2015 (ES6)

### var, const, let

- 원래 `var`만 쓰이다가 ES2015부터 `const`와 `let` 등장
- `const`와 `let`은 함수 및 블록`{}`에 대해 별도의 스코프를 가짐
- `var`은 블록 스코프를 무시하지만, 함수 스코프에 대해서는 제약을 가짐
- `const`는 대입을 한번만 할 수 있으며, 참조 변수라면 참조 내용을 바꿀 수는 있음
- `let`은 mutable한 변수
- 개발을 오래하다 보면 `const`를 사용할 일이 더 많아짐!

<br>

### 템플릿 문자열

```js
const result = `이 과자는 ${won} 원입니다.`;
```

<br>

### 객체 리터럴

※ ES5

```js
var sayNode = function () {
  console.log("Node");
};
var es = "ES";
var oldObject = {
  sayJS: function () {
    console.log("JS");
  },
  sayNode: sayNode,
};
oldObject[es + 6] = "Fantastic";
```

※ ES6

```js
const newObject = {
  sayJS() {
    console.log("JS");
  },
  sayNode,
  [es + 6]: "Fantastic",
};
```

- 객체의 메소드에 `:function`을 붙이지 않아도 됨
- `{ name: name }` 대신 `{ name }`
- `[변수 + 값]` 등의 동적 속성명을 객체 속성명으로도 사용 가능

<br>

### 화살표 함수 (arrow function)

```js
const add = (x, y) => x + y;
```

- ES6에서는 주로 생략이 많아졌음을 알 수 있음
- 화살표 함수는 기존의 함수를 완벽하게 대체할 수는 없음

```js
const object = (x, y) => ({ x, y });
```

- 주의할점
  - 객체를 반환하는 경우에는 `()` 필수
  - 부모의 `this`와 같은 `this` 참조를 가짐
    - 기존의 일반 함수는 자기만의 `this`를 가질 수 있음

※ 제로초님의 조언 : `this`를 쓸거면 일반 함수, 아니라면 화살표 함수를 쓰자!

<br>

### 구조분해 할당

```js
const candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};

const {
  getCandy,
  status: { count },
} = candyMachine;
```

```js
const [x, y, , , z] = [1, 2, 3, 4, 5];
```

<br>

### Class

- 프로토타입 문법을 깔끔하게 작성할 수 있도록 해주는 문법
- 생성자, 상속 등을 깔끔하게 처리
- 코드가 그룹화되어서 가독성도 좋아짐
- 하지만 그럼에도 JavaScript는 프로토타입 기반으로 동작한다는 사실을 명심해야 함

```js
class Human {
  constructor(type = "human") {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert("h-a-a-a-m");
  }
}

class Loko extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}
```

<br>

### Promise

- 내용은 실행되었지만 결과를 아직 반환하지 않은 객체
- `then`을 붙였을 때 결과를 반환
- 실행을 완료해야 `then` 함수를 실행
- `callback hell`이라고 불리던 현상을 극복하게 해주었다는 평가를 받고 있음

```js
const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) resolve("성공");
  else reject("실패");
});

promise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("무조건");
  });
```

- 코드를 분리할 수 있다는 장점!
- Promise를 미리 선언만 해두고, 나중에 필요할 때 사용할 수 있는 편리함
- 노드 생태계는 현재 callback에서 Promise로 전환되고 있음
- `resolve`와 `reject`라는 callback 함수를 매개변수로 가짐

`Promise.all(arr)`

- 여러 개의 Promise 동시 실행
- 하나라도 실패하면 catch 구문으로 감
- `allSettled`를 사용하면 실패한 것만 추려낼 수도 있음

<br>

### async/await

```js
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = "zero";
    user = await user.save();
    user = await User.findOne({ gender: "m" });
  } catch (error) {
    console.error(error);
  }
}
```

- `await`이 Promise의 `then` 역할을 해주고 있다고 봐도 됨
  - 실행 순서도 오른쪽에서 왼쪽으로
- `async` 함수에서 반환한 값은 `then`으로 받아야 함
  - `async`도 Promise라고 봐야 하며, Promise를 간단하게 만들어주는 친구
- 화살표 함수도 async/await 사용 가능
- for문과 함께 사용해서 Promise 순차적 실행도 가능

```js
const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
```

<br>
<br>

## JavaScript with front-end

### AJAX (Asynchronous Javascript And XML)

- axios와 함께 사용하기에 편리
- jQuery와도 함께 사용할 수 있음
- axios는 Promise 기반이고 async/await 사용 가능
  - 이러한 Promise인지 여부에 대한 정보들은 공식 문서를 잘 살펴봐야 함
- script 태그와 함께 간편하게 사용할 수 있음

```html
<script src="https://unpkg.com/axios/dist/axios.min.js" />
```

<br>

### FormData

- HTML의 form 태그에 넣는 데이터를 동적으로 제어할 수 있는 기능
- 이미지를 업로드할 때 주로 사용됨

```js
const formData = new FormData();
formData.append("name", "loko");
formData.has("name");
formData.get("name");
formData.set("name", "min");
formData.delete("name");
```

<br>

### encodeURIComponent, decodeURIComponent

- 원래 주소창에는 ASCII 코드만 넣는 것이 좋음
- 그런데 한글을 입력하고 싶은 경우가 있으니, 이에 대응하기 위한 메소드

```js
(async () => {
  try {
    const result = await axios.get(
      `https://www.zerocho.com/api/search/${encodeURIComponent("노드")}`
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
```

<br>

### data attribute와 dataset

- HTML 태그에서 데이터를 저장하는 방법
- 서버의 데이터를 프론트엔드에 내려줄 때 사용됨
- 반대로 JavaScript에서도 dataset 객체에 데이터를 넣어줄 수도 있음
- 반드시 공개해도 되는 데이터에만 사용할 것!

```html
<ul>
  <li data-id="1" data-user-job="programmer">Loko</li>
  <li data-id="2" data-user-job="designer">Coko</li>
  <li data-id="3" data-user-job="programmer">Choko</li>
  <li data-id="4" data-user-job="ceo">Moko</li>
</ul>
<script>
  console.log(document.querySelector("li").dataset);
</script>
```

- 위 데이터에 접근 시, `data.userJob`으로 접근해야 함
- 솔직히 잘 쓰일지는 미지수
