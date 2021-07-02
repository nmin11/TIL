2021 / 07 / 02

# Spread 문법

주로 배열을 풀어서 인자로 전달하거나, 배열을 풀어서 각각의 요소로 넣을 때 사용한다.

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

sum(...numbers); // 6
```

</br>

# Rest 문법

파라미터를 배열의 형태로 받아서 사용할 수 있다. 파라미터 개수가 가변적일 때 유용하다.  
함수의 매개변수로 사용할 때에만 Rest 문법을 사용한다고 할 수 있다.

```javascript
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4); // 10
```

</br>

# Spread 문법을 배열에서 사용하기

## 배열 합치기

```javascript
let parts = ["shoulders", "knees"];
let lyrics = ["head", ...parts, "and", "toes"];

// lyrics의 값 : ["head", "shoulders", "knees", "and", "toes"]

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2];
// spread 문법은 기존 배열을 변경하지 않으므로(immutable), arr1의 값을 바꾸려면 새롭게 할당해야 한다.

// arr1의 값 : [0, 1, 2, 3, 4, 5]
```

</br>

## 배열 복사

```javascript
let arr = [1, 2, 3];
let arr2 = [...arr]; // arr.slice() 와 유사한 방법
arr2.push(4);
// spread 문법은 immutable이므로, arr2를 수정한다고, arr이 바뀌지 않습니다.

// arr의 값 : [1, 2, 3]
// arr2의 값 : [1, 2, 3, 4]
```

</br>

# Spread 문법을 객체에서 사용하기

```javascript
let obj1 = { foo: "bar", x: 42 };
let obj2 = { foo: "baz", y: 13 };

let clonedObj = { ...obj1 };
let mergedObj = { ...obj1, ...obj2 };

// clonedObj의 값 : {foo: "bar", x: 42}
// mergedObj의 값 : {foo: "baz", x: 42, y: 13}
```

# 함수에서 나머지 파라미터 받아오기

```javascript
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five", "six");

/* console 출력
a one
b two
manyMoreArgs ["three", "four", "five", "six"]
*/
```

</br>

# Destructing

구조 분해 할당은 Spread 문법을 이용하여 값을 해체한 후, 개별 값을 변수에 새로 할당하는 과정을 말한다.

</br>

## 분해 후 새 변수에 할당

### 배열

```javascript
const [a, b, ...rest] = [10, 20, 30, 40, 50];

// a = 10, b = 20, rest = [30, 40, 50]
```

</br>

### 객체

```javascript
const { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };

// a = 10, b = 20, rest = {c: 30, d: 40}
```

객체에서 구조 분해 할당을 사용할 경우 선언(const, let, var)과 함께 사용하지 않으면 에러가 발생할 수 있다.

</br>

### 유용한 예제 : 함수에서 객체 분해

```javascript
function whois({ displayName: displayName, fullName: { firstName: name } }) {
  console.log(displayName + " is " + name);
}

let user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "John",
    lastName: "Doe",
  },
};

whois(user); // jdoe is John
```

</br>

### 유용한 예제 : for of 반복문과 구조 분해

```javascript
var people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith",
    },
    age: 35,
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones",
    },
    age: 25,
  },
];

for (var {
  name: n,
  family: { father: f },
} of people) {
  console.log("Name: " + n + ", Father: " + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```

</br>

# Sprint - JavaScript Koans

코드스테이츠에서는 틈틈이 Sprint 과제를 내준다.  
Sptint의 원래 뜻은 전력질주이며, 코드스테이츠에서는 이 단어를 특정 문제들을 풀거나 간단한 프로젝트를 짜서 제출하면 되는 과제의 의미로 사용하고 있다.  
그리고 이러한 코드스테이츠의 Sprint들은 보통 pair가 지정되어서 함께 의논하면서 과제를 해결해나가는 방식으로 이루어진다.  
이번 Sprint의 이름은 JavaScript Koans이다.  
Koans는 불교에서 유래된 단어로, 결론을 내리기 전에 이게 왜 맞는지 깊게 고민한다는 의미를 가지고 있다.  
이번에 제시된 문제들은 테스트 케이스가 실패한 이유를 출력해주기 때문에 큰 어려움 없이 풀 수 있는 문제들이었다.  
하지만 이게 왜 정답인지, 어떤 방식으로 작동하는 것인지 고민해보는 것이 중요하다.  
이 다음줄에는 나에게 어떤 부분이 어렵게 다가왔으며, 새롭게 알게 된 개념들은 무엇인지를 정리할 것이다.

</br>

## const로 선언한 배열 및 객체에서는 배열 및 객체 요소의 추가 및 삭제 가능

어찌 보면 단순하지만 잘 몰랐던 부분이다.  
const는 '상수'라는 의미로 해당 변수에 특정 값을 선언해버리면 더이상 이 변수에는 새로운 값을 할당할 수 없기 때문에, 말 그대로 선언 이후에는 절대 변하지 않는 변수라고 인식하고 있었다.  
하지만 배열과 객체는 참조 타입이므로 값들이 담겨져 있는 참조 주소를 갖고 있는 것이지, 배열이나 객체 그 자체를 갖고 있는 것이 아니다.  
따라서 해당 주소 안의 값들을 변경한다고 해도 주소 자체를 바꾸지 않는다면 const 변수에서도 배열이나 객체의 값들을 변경할 수 있는 것이다.

</br>

## Hoisting

호이스팅에는 한가지 오해가 있다.  
호이스팅을 변수 및 함수 선언이 물리적으로 작성한 코드의 상단으로 옮겨지는 것으로 알고 있을 수도 있지만, 실제로는 그렇지 않다.  
변수 및 함수 선언은 컴파일 단계에서 메모리에 저장되지만, 코드에서 입력한 위치와 정확히 일차한 곳에 있다.

```javascript
catName("Chloe");

function catName(name) {
  console.log("My cat's name is " + name);
}
```

함수를 작성하기 전에 호출하였지만 함수가 정상 작동하는 것을 확인할 수 있다.

```javascript
var x = 1; // x 초기화
console.log(x + " " + y); // '1 undefined'
var y = 2;

// 아래 코드는 위 코드와 같은 방식으로 동작한다.

var x = 1; // Initialize x
var y; // Declare y
console.log(x + " " + y); // '1 undefined'
y = 2; // Initialize y
```

</br>

### Hoisting의 흔한 오해

이번에도 [Taehoon님의 호이스팅 설명](https://www.youtube.com/watch?v=AlcRl4pJd0c&ab_channel=Taehoon) 영상을 참고해서 다시 머릿속에, 그리고 글로 정리해보려고 한다.  
호이스팅은 간단하게, 변수나 함수를 호이스팅 덕에 선언하기 전에도 사용할 수 있다는 의미이다.  
사실 호이스팅은 누군가 이렇게 작동하도록 추가로 만든 것이 아니라 그냥 놔두면 이렇게 작동하는 것이다.  
이를 선배 개발자들이 친절하게 호이스팅이라는 용어로 만들어주었지만 오해가 생겨버린 것이다.  
우리가 자바스크립트 인터프리터를 직접 만든다고 생각해보자. 가장 먼저 뭘 하는 것이 좋을까?  
선언된 변수나 함수가 뭐가 있는지 긁어모아서 사전을 만든 다음, 코드가 실행되서 변수를 부르면 사전에서 하나씩 꺼내서 주는 방식이 간단할 것이다.  
변수에 값을 넣는 것은 코드가 실행되어야 하기 때문에 값을 미리 불러다가 쓸 수는 없게 해야 한다.  
</br>
let이랑 const는 상대적으로 나중에 추가된 변수 선언 방법이다.  
let과 const는 호이스팅이 지원되지 않는다고 생각할 수 있지만 그렇지는 않다. 단지 기능이 추가된 것 뿐이다.  
var와는 다르게 let과 const는 코드를 선언하는 구문에 도달하기 전에는 변수를 사용할 수 없도록 하는 기능을 갖고 있는 것이다.

```javascript
const hello = 100;

function print1() {
  console.log(hello); // 100
}

function print2() {
  console.log(hello); // Error

  const hello = 200;
}
```

</br>

## 객체의 얕은 복사 (Shallow Clone)

### Object.assign()

첫번째 인자로 들어온 객체에 두번째 인자로 들어온 객체의 프로퍼티들을 복사해서 넣는다.

```javascript
const obj = { a: 1, b: 2 };
const target = { c: 3 };

const copiedObj = Object.assign(target, obj);

console.log(copiedObj); //{c: 3, a: 1, b: 2}
```

</br>

### Spread Operator

```javascript
const original = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const copied = { ...original };

original.a = 1000;
original.c.d = 3000;

console.log(copied.a); // 1
console.log(copied.c.d); // 3000
```

Object.assign()과 기능은 동일하다.

</br>

### for문을 통해 순서대로 복사

```javascript
const copyFunc = (obj) => {
  let copiedObj = {};

  for (let key in obj) {
    copiedObj[key] = obj[key];
  }

  return copiedObj;
};

const original = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

const result = copyFunc(original);

original.a = 100;
original.c.d = 3000;

console.log(result.a); // 1
console.log(result.c.d); // 3000
```

세 가지 방법 다 복사한 객체 안의 객체 요소는 주소를 참조하기 때문에 원본과 함께 값이 변경된다.  
이를 방지하기 위해서는 깊은 복사가 필요하다.

</br>

## 객체의 깊은 복사 (Deep Clone)

### JSON 객체의 메소드 이용하기

```javascript
const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));

const original = {
  a: 1,
  b: {
    c: 2,
  },
};

const copied = cloneObj(original);

original.a = 1000;
original.b.c = 2000;

console.log(copied.a); // 1
console.log(copied.b.c); // 2
```

JSON.stringify는 자바스크립트 객체를 JSON 문자열로 변환시킨다.  
그리고 JSON.parse는 JSON 문자열을 자바스크립트 객체로 변환시킨다.  
위 방법을 사용하면 객체를 문자열로 치환했다가 다시 객체로 변환했기 때문에 객체에 대한 참조가 없어진다.  
하지만 이 방법은 성능적으로 느리고, JSON.stringify 메소드가 function을 undefined로 처리한다는 문제가 있다.

</br>

### Lodash의 cloneDeep() 메소드 이용하기

Lodash는 많은 사람들이 사용해오고 있으며, 안정성이 증명된 라이브러리이다.  
Lodash의 많은 메소드들 중에서 cloneDeep() 메소드를 사용하면 깊은 복사가 가능하다.

```html
<script src="https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/lodash.min.js"></script>
```

```
npm i --save lodash
```

Lodash 라이브러리를 사용하려면 위와 같은 방법이나 다른 방법들을 사용해서 설치를 먼저 해야 한다.

```javascript
const - = require('lodash');

obj = {
  a: 10,
  b: {
    aa: "abc",
  },
};

newObj = _.cloneDeep(obj);

obj === newObj; // false
obj.a === newObj.a; // false
obj.b === newObj.b; // false
```

</br>

### 재귀적으로 직접 구현하기

```java
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  const result = Array.isArray(obj) ? [] : {}

  for (let key of Object.keys(obj)) {
    result[key] = deepClone(obj[key])
  }

  return result
}

const original = {
  a: 1,
  b: {
    c: 2,
  },
  d: () => {
    console.log("hi")
  },
}

const copied = deepClone(original)

original.a = 1000
original.b.c = 2000
original.d = () => {
  console.log("bye")
}

console.log(copied.a) // 1
console.log(copied.b.c) // 2
console.log(copied.d()) // 'hi'
```
