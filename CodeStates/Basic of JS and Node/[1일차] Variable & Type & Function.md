# 변수

## 1. 보관함 확보

선언 (declaration)

```javascript
let age;
```

</br>

## 2. 보관함에 데이터 저장

할당 (assignment)

```javascript
age = 12;
```

</br>

## 3. 선언과 할당을 동시에

```javascript
let name = "kim";
```

</br>

### ※ 프로그래밍 세계에서의 변수는 이름(Label)이 붙은 값

</br>

### ※ Camel Case

```javascript
let areaOfCircle;
```

변수명엔 공백을 쓸 수 없으므로 보통 단어의 첫 글자를 대문자로 써서 붙인다.  
낙타 등 모양처럼 생겨서 Camel Case라고 불림
</br>
</br>

# 타입

## 타입의 종류

- 숫자
- 문자열
- Boolean
- 배열
- 객체
- undefined
- 함수
  </br>
  </br>

# 함수

## What does it mean?

**어떤 목적을 가진 작업들을 수행하는 코드들이 모인 블록**

- 코드의 묶음
- 지시사항들의 묶음
- 기능(function)의 단위
- 입력과 출력 간의 매핑(mapping)
- 호출 후에는 반드시 돌아오며 출력값을 반환(return)
  </br>

## How to Use

1. 버튼 제작  
   선언 (declaration)

```javascript
function cal(param1, param2) {
  console.log(param1 + param2);
  return param1 + param2;
}
```

2. 버튼 사용  
   호출 (call, invocation)

```javascript
let result = cal(10, 20);
```

</br>

## 함수 선언 방법

1. 함수 선언식

```javascript
function getTriangleArea(base, height) {
  let triangleArea = (base * height) / 2;
  return triangleArea;
}
```

2. 함수 표현식

```javascript
const getTriangleArea = function (base, height) {
  let triangleArea = (base * height) / 2;
  return triangleArea;
};
```

3. 화살표 함수

```javascript
const getTriangleArea = (base, height) => {
  let triangleArea = (base * height) / 2;
  return triagleArea;
};
```

</br>

## 화살표 함수

함수의 body에 return문만 있는 경우 return과 중괄호(curly bracket) 생략 가능

```javascript
const getTriangleArea = (base, height) => (base * height) / 2; //정상 작동
const getTriangleArea = (base, height) => {
  (base * height) / 2;
}; //undefined 중괄호도 생략해야 함
```

return문에서 소괄호 사용 가능

```javascript
const getTriangleArea = (base, height) => (base * height) / 2; //정상 작동
```

함수 내 표현식이 2줄 이상인 경우에는 return과 중괄호를 명시적으로 써주는 것이 좋음

```javascript
//bad
const getStudentAvg = (arr) =>
  arr
    .filter((person) => person.job === "student")
    .reduce((sum, person) => sum + person.grade, 0);

//good
const getStudentAvg = (arr) => {
  return arr
    .filter((pesron) => person.job === "student")
    .reduce((sum, person) => sum + person.grade, 0);
};
```

</br>

## 매개변수(parameter)와 전달인자(argument)

```javascript
function getTriangleArea(base, height) {
  let triangleArea = (base * height) / 2;
}

let result = getTriangleArea(3, 4);
```

**(base, height)** 는 매개변수이며, **(3,4)** 는 전달변수이다.

</br>
</br>

# 조건문

## 조건문 기초

- 조건문은 어떠한 조건을 판별하는 기준
- 조건문에는 반드시 <u>비교 연산자</u>(Comparison Operator)가 필요

</br>

## 다양한 비교 연산자

| 연산자 |  의미  |
| :----: | :----: |
|   >    |  초과  |
|   <    |  미만  |
|   >=   |  이상  |
|   <=   |  이하  |
|  ===   |  같다  |
|  !==   | 다르다 |

**==** , **!=** 연산자들은 타입을 엄격하게 비교하지 않는다.

</br>

## 논리연산자 (Logical Operator)

### 두가지 조건이 한번에 적용되는 경우에 사용

학생이면서 여성일 때 통과 (AND 연산자)

```javascript
isStudent && isFemale;
```

학생이거나 여성일 때 통과 (OR 연산자)

```javascript
isStudent || isFemale;
```

학생이 아니면서 여성일 때 통과 (NOT 연산자)

```javascript
!isStudent && isFemale;
```

</br>

## 기억해둬야 할 6가지 falsy 값

### if문에서 false로 변환되므로 if 구문이 실행되지 않음

```javascript
if (false)
if (null)
if (undefined)
if (0)
if (NaN)
if ('')
```
