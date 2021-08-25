2021 / 08 / 25

## 순열 / 조합

[A, B, C, D, E] 5장의 카드를 갖고 있다고 했을 때, 이 5장의 카드 중 3장을 선택하여 나열하려고 한다.  
이 때 2가지 방법이 있다.

- 순서를 생각하며 3장을 선택한다.
- 순서를 생각하지 않고 선택한다.

처음 방법으로 모든 경우의 수를 구한다면 1장씩 나열하면서 필요한 장수에 도달했을 때 중지하면 된다.

1. 첫 번째 카드를 선택하는 방법은 5가지
2. 두 번째 카드를 선택하는 방법은 4가지
3. 세 번째 카드를 선택하는 방법은 3가지

따라서 5 X 4 X 3 = 60이 된다.

</br>

이렇게 n개의 무언가 중 일부만 선택해서 나열하는 것을 순열이라고 한다.  
순열은 **순서를 생각하며 나열한다**는 것을 유의해야 한다.  
순열은 영어로 Permutaion이라고 하며, 약자 P로 표현한다.

- 5장에서 3장을 선택하는 모든 순열의 수 : (5 X 4 X 3 X 2 X 1) / (2 X 1) = 60
- 일반식 : (이미지 첨부 순열 일반식)

</br>

다음 방법으로 모든 경우의 수를 구할 때에는 카드 3장을 **하나의 그룹으로 선택**한다.

1. 순열과 마찬가지로 순서를 생각하면서 셈
2. 중복해서 센 부분으로 나눗셈

순열에서는 ABC, ACB, BAC, BCA, CAB, CBA 6가지는 모두 다른 것으로 취급하지만 조합에서는 이 6가지를 하나의 그룹으로 취급한다.  
조합에서는 1이지만 순열에서는 6이 나왔다.  
이는 3장을 치환했을 때의 모든 가짓수(3 X 2 X 1)이다.  
이를 참고해서 모든 가짓수를 중복되는 6으로 나누면 조합의 모든 가짓수를 얻을 수 있다.

</br>

(5 X 4 X 3 X 2 X 1) / ((3 X 2 X 1) X (2 X 1)) = 10

</br>

- 5장에서 3장을 선택하는 모든 조합의 수 : 5! / (3! \* 2!) = 10
- 일반식 : (이미지 첨부 조합 일반식)

</br>

## 멱집합

어떤 집합의 모든 부분집합을 멱집합이라고 부른다.  
예를 들어 집합 {1, 2, 3}이 있다고 했을 때 이 집합의 모든 부분집합은 {}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}이 되고 개수는 8개이다.  
이렇게 나열하는 방법은 다음과 같은 단계로 구할 수 있다.  
이 방법에서 단계를 나누는 기준은 가장 앞 원소(혹은 임의의 집합 원소)가 있는지 없는지로 구분한다.

- Step A : 1을 제외한 {2, 3}의 부분집합 나열
  - Step B : 2를 제외한 {3}의 부분집합 나열
    - Step C : 3을 제외한 {}의 부분집합을 나열 → {}
    - Step C : {}의 모든 부분집합에 {3}을 추가한 집합들 나열 → {3}
  - Step B : {3}의 모든 부분집합에 {2}를 추가한 집합들 나열
    - Step C : {3}의 모든 부분집합에 {2}를 추가한 집합들을 나열하기 위해 {}의 모든 부분집합에 {2}를 추가한 집합들 나열, {}의 모든 부분집합에 {2, 3}을 추가한 집합들 나열 → {2}, {2, 3}
- Step A : {2, 3}의 모든 부분집합에 {1}을 추가한 집합들 나열
  - Step B : {2, 3}의 모든 부분집합에 {1}을 추가한 집합들을 나열하기 위해 {3}의 모든 부분집합에 {1}을 추가한 집합들 나열, {3}의 모든 부분집합에 {1, 2}를 추가한 집합들 나열
    - Step C : {3}의 모든 부분집합에 {1}을 추가한 집합을 나열하기 위해 {}의 모든 부분집합에 {1}을 추가한 집합들 나열, {}의 모든 부분집합에 {1, 3}을 추가한 집합들 나열 → {1}, {1, 3}
    - Step C : {3}의 모든 부분집합에 {1, 2}를 추가한 집합을 나열하기 위해 {}의 모든 부분집합에 {1, 2}를 추가한 집합들 나열, {}의 모든 부분집합에 {1, 2, 3}을 추가한 집합들 나열 → {1, 2}, {1, 2, 3}

원소가 있는지 없는지 2가지 경우를 고려하기 때문에 요소가 n개일 때 모든 부분집합의 개수는 2ⁿ개가 된다.  
각 단계를 거쳐가는 과정이 다소 복잡해보이지만 여기서 트리와 비슷한 모양을 떠올릴 수 있다.

</br>

(이미지 첨부 멱집합)

</br>

단계를 유심히 보면 순환 구조를 볼 수 있다.  
각 단계는 임의의 원소를 제외하면서 집합을 작은 단위로 줄여나간다.  
즉, 문제를 작은 단위로 줄여나가는 재귀의 응용으로 활용된다.

</br>

## 정규표현식

정규표현식을 한 문장으로 정의하면 **문자열에서 특정한 문자를 찾아내는 도구**이다.  
이를 이용하면 수십 줄이 필요한 코딩 작업을 간단하게 한두 줄로 끝낼 수 있게 된다.  
정규표현식은 특정한 규칙을 갖는 문자열로 이루어진 표현식이며, 정규표현식에서 특수 문자는 각각의 고유한 규칙을 갖고 있다.  
우리는 이러한 규칙들을 조합하여 원하는 패턴을 만들고, 특정 문자열에서 해당 패턴과 대응하는 문자를 찾을 수 있다.

</br>

### E-mail 유효성 검사

```javascript
let regExp = /^0-9a-zA-Z@0-9a-zA-Z\.[a-zA-Z]{2,3}$/i;
```

</br>

### 휴대전화 번호 유효성 검사

```javascript
let regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
```

</br>

### 정규표현식 사용하기

#### 리터럴 패턴

정규표현식 규칙을 `/`로 감싸서 사용한다.  
슬래시 안의 문자열이 찾고자 하는 문자열이 된다.

```javascript
let pattern = /c/;
```

</br>

#### 생성자 함수 호출 패턴

RegExp 객체의 생성자 함수를 호출하여 사용한다.

```javascript
let pattern = new RegExp("c");
```

</br>

### 정규표현식 내장 메소드

JavaScript에서도 정규표현식은 객체로써 내장 메소드를 가지고 있으며, String 객체에서도 정규표현식을 사용할 수 있는 내장 메소드를 가지고 있다.  
이를 활용해서 문자열 안에 원하는 정보를 찾거나 특정 패턴에 대응하는 문자열을 검색하거나 추출하거나 다른 문자열로 치환할 수 있다.

</br>

#### RegExp 객체의 메소드

##### exec()

execution의 줄임말로, 원하는 정보를 뽑아낼 때 사용한다.  
검색의 대상이 찾고자 하는 문자열에 대한 정보를 갖고 있다면 이를 배열로 반환하며, 없다면 null로 반환한다.

```javascript
let pattern = /c/;
pattern.exec("canival");

// ['c'] 반환
```

</br>

##### test()

찾고자 하는 문자열이 대상 안에 있는지 여부를 반환한다.

```javascript
let pattern = /c/;
pattern.test("codestates");
```

</br>

#### String 객체의 메소드

##### match()

RegExp.exec()와 비슷한 기능을 한다.  
정규표현식을 인자로 받아 주어진 문자열과 일치된 결과를 배열로 반환하며, 없으면 null을 반환한다.

```javascript
let pattern = /c/;
let str = "codestates";
str.match(pattern);
```

</br>

##### replace()

'검색 후 바꾸기'를 수행한다.  
첫 번째 인자로 정규표현식을 받고, 두 번째 인자로 치환하려는 문자열을 받는다.  
문자열에서 찾고자 하는 대상을 검색해서 이를 치환하려는 문자열로 변경한 후 변경된 값을 반환한다.

```javascript
let pattern = /c/;
let str = "codestates";
str.replace(pattern, "C");
```

</br>

##### split()

주어진 인자를 구분자로 삼아서 문자열을 부분 문자열로 나누어 그 결과를 배열로 반환한다.

```javascript
"123,456,789".split(","); // ["123", "456", "789"]
"12304560789".split("0"); // ["123", "456", "789"]
```

</br>

##### search()

정규표현식을 인자로 받아서 가장 처음 일치하는 부분의 문자열의 위치를 반환한다.  
없으면 -1을 반환한다.

```javascript
"JavaScript".search(/script/); // -1 대소문자를 구분
"JavaScript".search(/Script/); // 4
"codestates".search(/ode/); // 1
```

</br>

### flag

정규표현식은 flag를 설정해줄 수 있으며, 이는 추가적인 검색 옵션의 역할을 해준다.  
이 flag들은 각자 혹은 함께 사용하는 것이 모두 가능하며, 순서에 구분이 없다.

</br>

#### i

대소문자를 구분하지 않게 된다.

```javascript
let withi = /c/i;
let withouti = /c/;
"Codestates".match(withi); // ['C']
"Codestates".match(withouti); // null
```

</br>

#### g

global의 약자로, 모든 결과를 리턴하게 된다.

```javascript
let withg = /c/g;
let withoutg = /c/;
"coolcodestates".match(withg); // ['c', 'c']
"coolcodestates".match(withoutg); // ['c'] g 가 없으면 첫 번째 검색 결과만 반환
```

</br>

#### m

다중행을 검색한다.

```javascript
let str = `1st : cool
2nd : code
3rd : states`;
str.match(/c/gm);
// 3개의 행을 검색하여 모든 c 를 반환
// ['c', 'c']
str.match(/c/m);
// m은 다중행을 검색하게 해 주지만, g 를 빼고 검색하면 검색 대상을 찾는 순간 검색을 멈추기 때문에
// 첫 행의 ['c'] 만 리턴
```

</br>

### 정규식 패턴

| 정규식 패턴 | 설명                                                                   |
| :---------: | :--------------------------------------------------------------------- |
|      ^      | line의 시작에서 일치                                                   |
|      $      | line의 끝에서 일치                                                     |
|      .      | 임의의 한 문자                                                         |
|   a \| b    | a or b, index가 작은 것을 우선 반환                                    |
|     \*      | 0회 이상 연속으로 반복되는 문자와 가능한 많이 일치, {0,}과 동일        |
|     \*?     | 0회 이상 연속으로 반복되는 문자와 가능한 적게 일치, {0}과 동일         |
|      +      | 1회 이상 연속으로 반복되는 문자와 가능한 많이 일치, {1,}과 동일        |
|     +?      | 1회 이상 연속으로 반복되는 문자와 가능한 적게 일치, {1}과 동일         |
|     {3}     | 숫자 3개 연속 일치                                                     |
|    {3,}     | 3개 이상 연속 일치                                                     |
|   {3, 5}    | 3개 이상 5개 이하 연속 일치                                            |
|     ()      | capture할 그룹                                                         |
|    [a-z]    | 영어 소문자와 일치                                                     |
|    [A-Z]    | 영어 대문자와 일치                                                     |
|    [0-9]    | 숫자와 일치                                                            |
|     \       | escape 문자, 특수 기호 앞에 붙이면 정규식 패턴이 아닌 기호 자체로 인식 |
|     \d      | 숫자를 검색, /[0-9]/와 동일                                            |
|     \D      | 숫자가 아닌 문자를 검색, /[^0-9]/와 동일                               |
|     \w      | 영어 대소문자, 숫자, \_를 검색, /[A-Za-z0-9]/와 동일                   |
|     \W      | 영어 대소문자, 숫자, \_가 아닌 문자를 검색, /[^a-za-z0-9]/와 동일      |
|     [^]     | [] 안에 없는 문자를 검색                                               |

</br>

#### Anchors - ^ and $

##### ^

문자열의 처음을 의미한다.  
^ 뒤에 붙은 단어로 시작하는 부분을 찾는다.  
일치하는 부분이 있더라도 그 부분이 시작부분이 아니면 null을 반환한다.

```javascript
"coding is fun".match(/^co/); // ['co']
"coding is fun".match(/^fun/); // null
```

</br>

##### $

문자열의 끝을 의미한다.  
마찬가지로 일치하는 부분이 있더라도 그 부분이 문자열의 끝부분이 아니면 null을 반환한다.

```javascript
"coding is fun".match(/un$/); // ['un']
"coding is fun".match(/is$/); // null
"coding is fun".match(/^coding is fun$/);
// 문자열을 ^ 와 $ 로 감싸주면 그 사이에 들어간 문자열과 정확하게 일치하는 부분을 찾음
// ["coding is fun"]
```

</br>

#### Quantifiers - \*, +, ? and {}

##### \*

바로 앞 문자가 0번 이상 나타나는 경우를 검색한다.

```javascript
"co cod code codee coding codeeeeee codingding".match(/ode*/g);
// ["od", "ode", "odee", "od", "odeeeeee", "od"]
```

위와 같이 활용하면 "od"가 들어가면서 그 뒤에 e가 0번 이상 포함된 문자열을 반환한다.

</br>

##### +

바로 앞 문자가 1번 이상 나타나는 경우를 검색한다.

```javascript
"co cod code codee coding codeeeeee codingding".match(/ode*/g);
// ["ode", "odee", "odeeeeee"]
```

</br>

##### ?

바로 앞 문자가 0번 혹은 1번 나타나는 경우만 검색한다.  
\*? 또는 +?와 같이 활용하는 것도 가능하다.

```javascript
"co cod code codee coding codeeeeee codingding".match(/ode?/g);
// ["od", "ode", "ode", "od", "ode", "od"]
"co cod code codee coding codeeeeee codingding".match(/ode*?/g);
// ["od", "od", "od", "od", "od", "od"]
"co cod code codee coding codeeeeee codingding".match(/ode+?/g);
// ["ode", "ode", "ode"]
```

</br>

##### {}

_, _?, +, +?의 확장판이라고 보면 된다.  
직접 숫자를 넣어서 연속되는 개수를 설정할 수 있다.

```javascript
"co cod code codee coding codeeeeee codingding".match(/ode{2}/g);
// 2개의 "e"를 포함한 문자열을 검색
// ["odee", "odee"]

"co cod code codee coding codeeeeee codingding".match(/ode{2,}/g);
// 2개 이상의 "e"를 포함한 문자열을 검색
// ["odee", "odeeeeee"]

"co cod code codee coding codeeeeee codingding".match(/ode{2,5}/g);
// 2개 이상 5개 이하의 "e"를 포함한 문자열을 검색
// ["odee", "odeeeee"]
```

</br>

#### OR operator (`|`)

| 는 or 조건으로 검색해서 | 의 왼쪽 또는 오른쪽의 검색 결과를 반환한다.

```javascript
"Cc Oo Dd Ee".match(/O|D/g); // ["O", "D"]
"Cc Oo Dd Ee".match(/c|e/g); // ["c", "e"]
"Cc Oo Dd Ee".match(/D|e/g); // ["D", "e"]
"Ccc Ooo DDd EEeee".match(/D+|e+/g); // + 는 1번 이상 반복을 의미하기 때문에
// ["DD", "eee"] 를 반환
```

</br>

#### Braket Operator (`[]`)

대괄호 안에 명시된 값을 검색한다.

```javascript
[abc][a - c]; // a or b or c 를 검색, or(|) Operator 로 작성한 a|b|c 와 동일하게 작동 // [abc] 와 동일 -로 검색 구간을 설정

"Ccc Ooo DDd EEeee".match(/[CD]+/g); // [] 에 + 등의 기호를 함께 사용 가능
// C or D 가 한번 이상 반복된 문자열을 반복 검색하기 때문에
// ["C", "DD"] 반환

"Ccc Ooo DDd EEeee".match(/[co]+/g); // ["cc", "oo"]
"Ccc Ooo DDd EEeee".match(/[c-o]+/g); // - 때문에 c ~ o 구간을 검색하여
// ["cc", "oo", "d", "eee"] 반환

"AA 12 ZZ Ad %% Az !# dd 54 zz".match(/[A-Za-z]+/g);
// a~z 또는 A~Z 에서 한번 이상 반복되는 문자열을 반복 검색하기 때문에
// ["AA", "ZZ", "Ad", "Az", "dd", "zz"] 반환
"AA 12 ZZ Ad %% Az !# dd 54 zz".match(/[A-Z]+/gi);
// flag i 는 대소문자를 구분하지 않기 때문에 위와 동일한 결과를 반환
// ["AA", "ZZ", "Ad", "Az", "dd", "zz"]

"AA 12 ZZ Ad %% Az !# dd 54 zz".match(/[0-9]+/g);
// 숫자도 검색 가능
// ["12", "54"]

"aAbB$#67Xz@9".match(/[^a-zA-Z]+/g);
// [] 안에 ^ 를 사용하면 anchor 로써의 문자열의 처음을 찾는것이 아닌
// 부정을 나타내기 때문에 [] 안에 없는 값을 검색
// ["$#67", "@9"]
```

</br>

#### Character Classes

##### \d & \D

\d는 digit을 의미하며 0 ~ 9 사이의 숫자 하나를 검색한다.  
[0-9]와 동일하다.  
\D는 not Digit을 의미하며 숫자가 아닌 문자 하나를 검색한다.  
[^0-9]와 동일하다.

```javascript
"abc34".match(/\d/); // ["3"]
"abc34".match(/[0-9]/); // ["3"]
"abc34".match(/\d/g); // ["3", "4"]
"abc34".match(/[0-9]/g); // ["3", "4"]
"abc34".match(/\D/); // ["a"]
"abc34".match(/[^0-9]/); // ["a"]
"abc34".match(/\D/g); // ["a", "b", "c"]
"abc34".match(/[^0-9]/g); // ["a", "b", "c"]
```

</br>

##### \w & \W

\w는 알파벳 대소문자, 숫자, _ 중 하나를 검색한다.  
[a-zA-Z0-9_]와 동일하다.  
\W는 알파벳 대소문자, 숫자, _가 아닌 문자 하나를 검색한다.  
[^a-zA-Z0-9_]와 동일하다.

```javascript
"ab3_@A.Kr".match(/\w/); //["a"]
"ab3_@A.Kr".match(/[a-zA-Z0-9_]/); // ["a"]
"ab3_@A.Kr".match(/\w/g); //["a", "b", "3", "_", "A", "K", "r"]
"ab3_@A.Kr".match(/[a-zA-Z0-9_]/g); // ["a", "b", "3", "_", "A", "K", "r"]

"ab3_@A.Kr".match(/\W/); // ["@"]
"ab3_@A.Kr".match(/[^a-zA-Z0-9_]/); // ["@"]
"ab3_@A.Kr".match(/\W/g); // ["@", "."]
"ab3_@A.Kr".match(/[^a-zA-Z0-9_]/g); // ["@", "."]
```

</br>

#### Grouping and Capturing

**()**  
()는 그룹으로 묶는다는 의미 이외에도 몇 가지 의미가 더 있다.

</br>

##### 그룹화

표현식의 일부를 ()로 묶어주면 그 안의 내용을 하나로 그룹화할 수 있다.

```javascript
let co = "coco";
let cooo = "cooocooo";

co.match(/co+/); // ["co", index: 0, input: "coco", groups: undefined]
cooo.match(/co+/); // ["cooo", index: 0, input: "cooocooo", groups: undefined]

co.match(/(co)+/); // ["coco", "co", index: 0, input: "coco", groups: undefined]
cooo.match(/(co)+/); // ["co", "co", index: 0, input: "cooocooo", groups: undefined]
```

위 코드에서 co+에서 c는 "c"를 검색하고 +는 "o"가 1회 이상 연속으로 반복되는 문자를 검색해주기 때문에 "coco"가 반환되었다.  
하지만 (co)+는 "c"와 "o"를 그룹화하여 "co"를 단위로 1회 이상 반복을 검색하기 때문에 "coco"가 반환되었다.  
여기서 특이한 점은 일치하는 문자열로 반환된 결과가 2개라는 점이다.

</br>

##### 캡쳐

()로 그룹화를 하며, 이를 캡쳐한다고 한다.

```javascript
co.match(/(co)+/); // ["coco", "co", index: 0, input: "coco", groups: undefined]
```

캡쳐의 작동방식을 확인해보자.

1. ()로 "co"를 캡쳐
2. 캡쳐한 "co"는 바로 사용하지 않고, +가 "co"의 1회 이상 연속 반복을 검색
3. 캡쳐 이외의 표현식이 모두 작동하고 나면, 캡쳐해두었던 "co"를 검색

2번 과정에 따라 "coco"가 반환되었고, 3번 과정에 의해 "co"가 반환된 것이다.

</br>

캡쳐에 대한 이해를 위해 한가지 예시를 더 살펴보도록 하자.

```javascript
"2021code".match(/(\d+)(\w)/);
// ["2021c", "2021", "c", index: 0, input: "2021code", groups: undefined]
```

1. () 안의 표현식을 순서대로 캡쳐 → \d+ 와 \w
2. 캡쳐 후 남은 표현식으로 검색 → 위 예시에서는 없음
3. \d로 숫자를 검색하되 +로 1개 이상 연속되는 숫자를 검색 → 2021
4. \w로 문자를 검색 → c
5. 3번과 4번이 조합되어 "2021c" 반환
6. 첫 번째 캡쳐한 (\d+)로 인해 2021 반환
7. 두 번째 캡쳐한 (\w)로 인해 c 반환

</br>

**+ 문자열 대체 시 캡쳐된 값 참조하기**

캡쳐된 값은 replace() 메소드를 사용하여 문자 치환 시 참조 패턴으로 사용될 수 있다.

```javascript
"code.states".replace(/(\w+)\.(\w+)/, "$2.$1"); //states.code
```

1. 첫 번째 (\w+)가 code를 캡쳐
2. 두 번째 (\w+)가 states를 캡쳐
3. 각 캡쳐된 값은 각각 첫 번째 캡쳐는 $1, 두 번째 캡쳐는 $2 참조값을 가짐
4. "$2.$1"로 참조값을 맞바꾸어 state.code 반환

</br>

##### Non-Capturing

()를 사용하면 그룹화와 캡쳐를 한다.  
하지만 (?:)로 사용하면 그룹은 만들지만 캡쳐는 하지 않는다.

```javascript
let co = "coco";

co.match(/(co)+/); // ["coco", "co", index: 0, input: "coco", groups: undefined]

co.match(/(?:co)+/);
// ["coco", index: 0, input: "coco", groups: undefined]
```

</br>

##### Lookahead

(?=)는 검색하려는 문자열에 (?=)으로 지정해준 문자가 있어야 앞의 문자열을 반환한다.

```javascript
"abcde".match(/ab(?=c)/);
// ab 가 c 앞에 있기 때문에 ["ab"] 를 반환
"abcde".match(/ab(?=d)/);
// d 의 앞은 "abc" 이기 때문에 null 을 반환
```

</br>

##### Negated Lookahead

(?!)는 (?=)의 부정이다.

```javascript
"abcde".match(/ab(?!c)/); // null
"abcde".match(/ab(?!d)/); // ["ab"]
```

</br>

## Sprint Review

- 멱집합 : 완전탐색의 기본
- 정규표현식 : 필요한 게 있을 때마다 찾아서 검색해서 사용하는 게 낫다.  
  하나하나 다 완전히 공부하려고 하지 말자.
- Trade-off : 다른 언어나 다른 프레임워크를 학습하고자 한다면 장단점을 명확히 알고 배우자.  
  할거면 제대로, 하나를 깊게 파자.  
  얼마나 복잡한 문제를 경험해보고 해결해봤는가가 중요!  
  하나의 기술로 웬만하면 해결하려고 해보자.
