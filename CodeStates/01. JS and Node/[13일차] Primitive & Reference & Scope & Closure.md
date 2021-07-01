2021 / 07 / 01

# Primitive Type

객체가 아니면서 메소드를 가지지 않는 6가지 타입

> string, number, bigint, boolean, undefined, symbol, (null)

옛날에는 메모리의 용량이 제한되었기 때문에 변수 하나에 용량이 제한된 하나의 원시 자료형 밖에 담을 수 없었다.  
이렇게 "원시적인" 데이터 타입들을 Primitive Type이라고 부르게 되었다.  

</br>

※ null은 원시 타입과 거의 같게 사용되지만 이는 typeof() 메소드 등에서 인위적으로 그렇게 보는 것이고, 엄밀하게 따지고 보면 원시 타입이라고 볼 수 없다.

</br>

## 변수에는 하나의 데이터만

원시 자료형은 변수에 데이터의 크기와 관계 없이 하나의 데이터만 담을 수 있다.  
원시 자료형은 값 자체에 대한 변경이 불가능(immutable)하지만 변수에 다른 데이터를 할당할 수 있다.

</br>
</br>

# Reference Data Type

## 참조 자료형이 저장되는 특별한 데이터 보관함 - Heap

참조 자료형의 데이터는 해당 데이터가 위치한 곳(메모리 상 주소)을 가리키는 주소가 변수에 저장된다.  
즉, 변수에는 특별한 데이터 보관함을 찾아갈 수 있는 주소가 담겨있고, 이 주소를 따라가보면 특별한 데이터 보관함을 찾을 수 있는데, 이 특별한 데이터 보관함은 마음대로 사이즈를 늘렸다가 줄였다가 할 수 있는 것이다.  
이처럼 데이터는 별도로 관리되고 우리가 직접 다루는 변수에는 주소가 저장되기 때문에 Reference Type이라고 부른다.  
그리고 특별한 데이터 보관함을 Heap이라고 부른다.

</br>

## 동적(dynamic)으로 변하는 특별한 데이터 보관함

배열과 객체는 대량의 데이터를 쉽게 다룰 수 있게 해준다.  
그 이유는 크기가 고정되어 있지 않고 우리가 데이터를 추가하고 삭제하는 것에 따라서 크기가 달라지기 때문이다.  
이렇듯 언제 늘어나고 줄어들지 모르기 때문에 별도의 저장공간을 마련하여 따로 관리해야 한다.

</br>
</br>

# Checkpoint - Primitive & Reference

충격적이게도 체크포인트의 문제 7개 중 3개를 틀렸다.  
기본적인 내용이라고 무시했다가 큰코를 다쳤고, 내가 얼마나 기초가 부족한지 깨달았다.  
그래서 이렇게 정리해본다.

</br>

## 객체의 주소를 참조해서 다른 변수에 할당하고 값을 바꾸면 어떻게 되는가?

```javascript
// 실행 후 x.foo의 값은?
let x = { foo: 3 };
let y = x;
y.foo = 2;
```

참조 자료형이 변수에 할당되는 경우 변수에 해당 데이터가 저장되는 곳의 주소가 할당된다.  
따라서 y에는 x의 주소가 할당되고, x와 y는 같은 주소를 바라보게 된다.  
y.foo = 2; 를 실행하게 되면 바라보고 있는 주소의 값을 변경하기 때문에 x의 주소의 값도 변경된다.

</br>

## 주소를 참조해서 다른 변수에 할당하고 값을 바꾼 뒤, undefined로 다시 바꾸면?

```javascript
// 실행 후 myArray의 값은?
let myArray = [2, 3, 4, 5];
let ourArray = myArray;
ourArray[2] = 25;
ourArray = undefined
```

호기롭게 undefined라고 제출했다가 틀렸다.  
위 문제와 마찬가지로 객체 주소를 참조한 뒤 변경한 값에 대해서는 변경이 이루어지지만, ourArray = undefined; 의 경우 더이상 myArray에 접근할 수 없게 해주는 코드이다.  
따라서 myArray는 변경이 일어났던 [2, 3, 25, 5]를 그대로 가지고 있다.

</br>

## 원시 자료형에 값 대입하기

```javascript
// 실행 후 score의 값은?
let score = 80;
function doStuff(value) {
  value = 90;
}

doStuff(score)
```

사실 엄청 간단한 문제였다.  
function 안에서 value = 90; 이 아니라 score = 90; 이었다면 변수에 할당된 값이 바뀌었을 테지만 value는 아무 의미가 없기 때문에 score는 어떤 변화도 없는 것이다.  
내가 이런 기초적인 부분에 대해서 너무 깊게 생각하지 않았던 것 같아서 후회가 된다.

</br>
</br>

# Scope

컴퓨터 공학, 그리고 자바스크립트에서의 스코프는 **"변수의 유효범위"** 로 사용된다.

</br>

## Scope의 규칙

1. 안쪽 스코프에서 바깥쪽 스코프로는 접근할 수 있지만 반대는 불가능하다.
2. 중첩이 가능하다. 가장 바깥쪽의 Global Scope(전역 스코프)와 Local Scope로 나눠서 부르기도 한다.
3. 지역 변수는 전역 변수보다 더 높은 우선순위를 가짐

</br>

## Scope의 종류

- Block Scope : 중괄호로 둘러싼 범위
- Function Scope : 함수로 둘러싼 범위

※ 화살표 함수로 둘러싼 범위는 블록 스코프이다.

```javascript
let getAge => {
  return user.age;
}
// 블록 스코프로 취급

let getAge = function(user) {
  return user.age;
}
// 함수 스코프로 취급
```

</br>

## let & var

var는 블록 스코프를 무시하고 함수 스코프만 따른다.  
보통 코드를 작성할 때 블록은 구분이 시각적으로 명확하다.  
var는 이러한 규칙을 무시하므로 코드를 작성할 때 다소 혼란스러울 수 있다.  
따라서 훨씬 더 예측 가능한 코드를 작성하기 위해 let의 사용이 권장된다.  
</br>
또한, var는 재선언을 해도 에러가 나지 않지만 let은 재선언을 방지한다.  
실제로 코딩할 때 변수를 재선언할 필요가 거의 없고 보통 재선언이 된다면 버그이다.  
let 키워드는 이러한 실수를 사전에 막아준다.

</br>

## const

값이 변하지 않는 상수를 정의할 때 사용한다.  
let 키워드와 동일하게 블록 스코프를 따른다.  
값의 변경을 최소화하여 보다 안전한 프로그램을 만들 수 있게 해준다.  
값을 새롭게 할당할 일이 없다면 const 키워드의 사용이 권장된다.

</br>

## window 객체

개발자 도구를 열어서 콘솔에 window라고 입력하면 객체 하나를 조회할 수 있다.  
이 객체는 사실 브라우저의 창(window)를 의미하는 객체이지만 이와는 별개로 전역 영역을 담고 있기도 하다.  
함수 선언식으로 함수를 선언하거나 var로 전역 변수를 만들면 window 객체에서도 동일한 값을 찾을 수 있다.

</br>

## 전역 변수

이러한 전역 변수들은 가급적 적게 사용하는 것이 좋다.  
전역 변수는 어디서든 접근 가능하기 때문에 편리하지만 다른 함수와 로직에 의해 의도되지 않은 변경이 일어날 수 있다.  
이를 side effect라고 하며, 전역 변수를 최소화하는 것은 side effect를 줄이는 좋은 방법이다.  
</br>
선언 없이 변수를 할당할 경우 해당 변수는 var로 선언한 전역 변수처럼 취급된다.  
이를 방지하기 위해서 Strict Mode를 사용할 수 있다.

```javascript
'use strict';

function showAge() {
  age = 90;
  console.log(age);
}
showAge();
```

Strict Mode는 브라우저가 보다 엄격하게 작동하도록 만들어준다.  
선언 없는 변수 할당의 경우 Strict Mode는 에러로 판단한다.  
이 모드를 적용하려면 js 파일 상단에 'use strice'라고 입력하면 된다.

</br>
</br>

# Closure

클로저는 함수와 함수가 선언된 어휘적(lexical) 환경의 조합을 말한다.  
이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다.  
자바스크립트는 함수가 호출되는 환경과 별개로, 기존에 선언되어 있던 어휘적 환경을 기준으로 변수를 조회하려고 한다.  
**"외부함수의 변수에 접근할 수 있는 내부함수"** 를 클로저 함수로 부르는 이유도 그렇다.

</br>

## Closure 함수의 특징

1. 함수를 리턴하는 함수
```javascript
const adder = function(x) {
  return function(y) {
    return x + y;
  }
}
```

2. 리턴하는 함수에 의해 스코프가 구분됨  

※ 클로저의 핵심 : 스코프를 이용해서 변수의 접근 범위를 닫음(closure)  
→ 외부 함수의 변수에 내부 함수가 접근할 수 있음

</br>

## Closure의 활용

### 데이터를 보존하는 함수

일반적인 함수는 함수 실행이 끝나고 나면 함수 내부의 변수를 사용할 수 없다.  
하지만 클로저는 외부 함수의 실행이 끝나더라도 외부 함수 내 변수가 메모리 상에 저장된다. (어휘적 환경을 메모리에 저장)

```javascript
const adder = function(x) {
  return function(y) {
    return x + y;
  }
}

const add5 = adder(5);
add(7); // 12
add(10); // 15
const doubleAdd = adder(2)(4);
```

위 예시코드에서 변수 add5에는 클로저를 리턴한 함수가 담겨 있다.  
add5는 외부 adder 함수의 실행이 끝났음에도 adder 함수에서 인자로 넘긴 5라는 값을 x 변수에 계속 담은 채로 남아있다.  
adder(2)(4)를 할당한 doubleAdd를 추가해보았다.  
이런 때에는 x와 y에 순차적으로 값을 넣어줄 수 있게 된다.

```javascript
const tagMaker = tag => content => `<${tag}>${content}</${tag}>`

const divMaker = tagMaker('div');
divMaker('hello') // '<div>hello</div>'
divMaker('codestates') // '<div>codestates</div>'

const anchotMaker = tagMaker('a');
anchorMaker('go');
anchorMaker('urclass');
```

위 코드와 같이 클로저를 HTML 태그 및 문자열을 만들기 위해서 실용적으로 활용해볼 수 있다.  
클로저는 이처럼 특정 데이터를 스코프 안에 가두어 둔 채로 계속 사용할 수 있게 해준다.

</br>

### 클로저 모듈 패턴

```javascript
const makeCounter = () => {
  let value = 0;

  return {
    increase: () => {
      value = value + 1
    },
    decrease: () => {
      value = value - 1
    },
    getValue: () => value
  }
}

const counter1 = makeCounter();

counter1; // { increase: f, decrease: f, getValue: f }
```

클로저를 이용해서 내부 함수를 단 하나만 리턴하는 것이 아니라 객체에 담아 여러 개의 함수를 리턴하도록 만들 수 있다.  
makeCounter() 함수를 실행하여 변수를 담고서 확인해보면 객체가 리턴되는 것을 확인할 수 있다.  
또 한가지 유념해야 할 것은, 위쪽에 선언된 value라는 변수는 직접 수정이 불가능하다는 점이다.  
"외부 스코프에서는 내부 스코프의 변수에 접근할 수 없다"는 규칙에 의해, 어떤 경우에도 value는 직접 수정이 불가능하다.  
대신 리턴하는 객체가 제공하는 메소드를 통해 value 값을 간접적으로 조작할 수 있다.  
이것이 바로 **정보의 접근 제한(캡술화)** 이다.

```javascript
const counter1 = makeCounter();
counter1.increase();
counter1.increase();
counter1.decrease();
counter1.getValue(); // 1

const counter2 = makeCounter();
counter2.decrease();
counter2.decrease();
counter2.decrease();
counter2.getValue(); // -3
```

위에서 counter1과 counter2의 getValue 값을 확인해보면 서로 다른 value 값을 가지고 있음을 확인할 수 있다.  
makeCounter에 의해 리턴된 두 객체는 이렇게 서로에게 영향을 끼치지 않고 각각의 값을 보존할 수 있다.  
이와 같이 함수 재사용성을 극대화하여 함수 하나를 완전히 독립적인 부품 형태로 분리하는 것을 **모듈화** 라고 한다.  
클로저는 이처럼 데이터와 메소드를 같이 묶어서 다룰 수 있다.  
즉, 클로저는 모듈화에 유리하다.

</br>

## 유튜브 영상을 통해 Closure 쉽게 이해하기

이대로 넘어가기에는 아직 학습이 덜 된 것 같기에, 유튜브에서 [Taehoon님의 클로저 설명](https://www.youtube.com/watch?v=KmpofpqkitA&ab_channel=Taehoon) 을 보고 다시 정리해보았다.

</br>

- 정말 간단하게 보자면, 외부 변수와 함수를 합쳐서 Closure라고 부른다.
- Closure가 어렵게 느껴진다면 그건 내 탓이 아니라 JavaScript 때문.

사실상 모든 함수는 Closure 함수가 될 수 있다. 주변에 다 Closure 밖에 없는데 뭐가 Closure고 뭐가 Closure가 아닌지 구별하려고 하니 어려움이 생기는 것.

```javascript
let poison = 0;

@capture(poison)
function add(a, b) {
  return a + b + poison;
}
```

```javascript
pure function add1(a, b) {
  return a+ b;
}

let poison = 0;

function add2(a, b) {
  return a + b + poison;
}
```

다른 많은 프로그래밍 언어들에서는 Closure 함수와 일반 함수가 명확한 구분을 가지고 있는 경우가 많다.  
위 예시 코드는 다른 프로그래밍 언어의 Closure 함수에 대한 예시를 이해하기 쉽게 임의로 만들어둔 것이다.  
</br>
기본적으로 모든 함수가 Closure 기능을 쓸 수 있다는 것은 사용에는 편리하지만 이해하는 데에는 완벽한 정보가 제공되지 않기 때문에 어려움이 있을 수 있다.  
알아야 할 개념들은 Script 언어라고 해서 적은 게 아니다.  
처음 봤을 때 이러한 개념들이 뒤에 숨어있기 때문에 쉬워보이는 것 뿐이다.

</br>

## Checkpoint - Closure

```javascript
// total의 값은?
let add = function(x) {
  let sum = function(y) {
    return x + y;
  }
  return sum;
}

let foo = add(1);
foo(3);
let total = foo(6);
```

쉽게 생각해서 let foo = add(1); 이라고 선언한 순간, x 값에는 1이 고정적으로 할당되어 있다고 보면 된다.  
그리고 foo(3); 이라는 코드는 4라는 값을 반환하지만 그 값을 어떤 변수에 할당하지 않기에 의미가 없다.  
따라서 단순하게 1 + 6 의 답인 7이 된다.