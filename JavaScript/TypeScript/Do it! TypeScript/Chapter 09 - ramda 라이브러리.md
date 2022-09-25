## 1. ramda 라이브러리 소개

- TS 언어와 100% 호환
- `compose`와 `pipe` 함수 제공
- auto curry 기능 제공
- 포인트가 없는 고차 도움 함수 제공
- combinatory logic 함수 일부 제공

<br>

### ramda 패키지 구성

utility function 문서

- https://ramdajs.com/docs/
  - 함수를 알파벳 순서로 분류
- https://devdocs.io/ramda/
  - 함수를 기능 위주로 분류

<br>
<br>

## 2. ramda 기본 사용법

### range 함수

- `range(min, max)` 형식으로 사용
- `[min, min + 1, ... max - 1]` 형태의 배열 반환

<br>

### tap 디버깅용 함수

- `tap(callback)(arr)` 형식의 2차 고차 함수로 사용
- 현재 값을 파악할 수 있게 해줌

```ts
import { range, tap } from "ramda";

const numbers: number[] = range(1, 10);
tap((n) => console.log(n))(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### pipe 함수

```ts
import { range, pipe } from "ramda";

const array: number[] = range(1, 10);
pipe(tap((n) => console.log(n)))(array); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### pointless function

- ramda 라이브러리 대부분의 함수는 2차 함수 형태
- 2차 함수는 pointless function 형태로 사용 가능

```ts
import { pipe, tap } from "ramda";

export const dump = pipe(tap((n) => console.log(n)));
```

```ts
import { range } from "ramda";
import { dump } from "./dump";

dump(range(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### auto curry

```ts
import { add } from "ramda";

console.log(add(1, 2), add(1)(2));
```

- ramda 라이브러리 함수들은 매개변수가 2개인 일반 함수처럼 사용할 수도 있고 2차 함수로 사용할 수도 있음
- 이를 **auto curry** 라고 부름

<br>

### curryN 함수

- `curryN(N, func)` 형식으로 사용
- N개의 매개변수를 갖는 1차 함수 → N개의 curry를 갖는 N차 함수

```ts
export const sum = (...numbers: number[]): number =>
  numbers.reduce((result: number, sum: number) => result + sum, 0);
```

```ts
import { curryN } from "ramda";
import { sum } from "./sum";

export const curriedSum = curryN(4, sum);
```

<br>

### pure function

- ramda 라이브러리는 pure function을 고려해서 설계되었음
- 따라서 함수들은 항상 입력 변수의 상태를 변화시키지 않고 새로운 값을 반환

<br>
<br>

## 3. 배열에 담긴 수 다루기

### declarative programming

- 선언형 프로그래밍에서 모든 입력 데이터는 단순 데이터보다는 배열 형태를 주로 사용

※ 단순 데이터 형식

```ts
const value = 1;
const newValue = inc(value);
```

※ 배열 형태

```ts
const newArray = pipe(map(inc))([value]);
```

- `tap`을 활용해서 `console.log()`를 직접 찍지 않는 것도 같은 이유

<br>

### 사칙 연산 함수

```ts
add(a: number)(b: number)
subtract(a: number)(b: number)
multiply(a: number)(b: number)
divide(a: number)(b: number)
```

<br>

### addIndex 함수

- `Array.map`은 2번째 매개변수로 index 제공
- `ramda.map`은 index를 기본 매개변수로 제공하지 않음
- `ramda.map`이 `Array.map`처럼 동작하려면 `ramda.addIndex` 함수를 이용해야 함

```ts
import { add, pipe, map, addIndex, tap, range } from "ramda";

const plusIndex = pipe(
  addIndex(map)(add),
  tap((a) => console.log(a)) // [1, 3, 5, 7, 9, 11, 13, 15, 17]
);

const newNumbers = plusIndex(range(1, 10));
```

<br>

### flip 함수

- `subtract` 함수와 `divide` 함수는 매개변수의 순서에 따라 값이 달라짐
- `flip` 함수를 활용하면 매개변수 순서를 바꿔줄 수 있음

```ts
import { flip, subtract, pipe, map, tap, range } from "ramda";

const reverseSubtract = flip(subtract);
const newArray = pipe(
  map(reverseSubtract(10)),
  tap((a) => console.log(a)) // [-9, -8, -7, -6, -5, -4, -3, -2, -1]
)(range(1, 10));
```

<br>
<br>

## 4. 서술자와 조건 연산

- `Array.filter`처럼 콜백 함수가 boolean 타입 값을 반환해서<br>조건을 만족하는지 확인하는 함수를 **predicate(서술자)** 라고 부름

<br>

### 수의 크기를 판단하는 서술자

```ts
lt(a)(b): boolean   // a < b
lte(a)(b): boolean  // a <= b
gt(a)(b): boolean   // a > b
gte(a)(b): boolean  // a >= b
```

- 주로 다른 함수와 결합해서 포인트 없는 함수 형태로 사용됨

```ts
import { pipe, filter, lte, tap, range } from "ramda";

pipe(
  filter(lte(3)),
  tap((n) => console.log(n)) // [3, 4, 5, 6, 7, 8, 9, 10]
)(range(1, 11));
```

- 이는 직관적으로 `3 <= x`의 의미로 와닿지 않기 때문에 `flip(gte(3))`처럼 변형해서 사용하기도 함

<br>

### allPass / anyPass

※ min <= x < max

```ts
import { allPass, lte, gt } from "ramda";

type NumberToBooleanFunc = (n: number) => boolean;
export const selectRange = (min: number, max: number): NumberToBooleanFunc =>
  allPass([lte(min), gt(max)]);
```

※ filter 함수와 결합해서 포인트 없는 함수로 구현하기

```ts
import { pipe, filter, tap, range } from "ramda";
import { selectRange } from "./selectRange";

pipe(
  filter(selectRange(3, 7)),
  tap((n) => console.log(n))
)(range(1, 11));
```

<br>

### not 함수

- true이면 false 반환, false이면 true 반환

```ts
import { pipe, not } from "ramda";
import { selectRange } from "./selectRange";

export const notRange = (min: number, max: number) =>
  pipe(selectRange(min, max), not);
```

<br>

### ifElse 함수

- 3개의 매개변수 포함
  - true/false를 반환하는 서술자
  - 선택자가 true일 때 실행할 함수
  - 선택자가 false일 때 실행할 함수

※ 1 ~ 10 중에서 중간값인 6보다 작은 수는 -1 하고 나머지는 +1 하는 예제

```ts
import { range, pipe, map, ifElse, lte, inc, dec, tap } from "ramda";

const input: number[] = range(1, 11),
  halfValue = input[input.length / 2];
const subtractOrAdd = pipe(
  map(ifElse(lte(halfValue), inc, dec)),
  tap((a) => console.log(a)) // [0, 1, 2, 3, 4, 7, 8, 9, 10, 11]
);
const result = subtractOrAdd(input);
```

<br>
<br>

## 5. 문자열 다루기

- `trim` : 문자열 앞뒤 공백 제거
- `toLower` : 소문자 전환
- `toUpper` : 대문자 전환
- `split` : 문자열을 구분자를 활용해서 배열로 전환
- `join` : 문자열 배열을 구분자를 활용해서 문자열로 전환

<br>
<br>

## 6. chance 패키지로 객체 만들기

- `chance` 패키지는 그럴듯한 가짜 데이터를 만들어주는 라이브러리
- ramda와 직접 관련된 것은 아니지만, 객체를 다루는 함수들을 사용하려면 그럴듯한 객체 데이터 필요
- 한 마디로, dummy data를 만들 때 유용

```ts
import { ICoordinates } from "./ICoordinates";
import { makeIcoordinates } from "./makeICoordinates";
import Chance from "chance";

const c = new Chance();

export const makeRandomICoordinates = (): ICoordinates =>
  makeICoordinates(c.latitude(), c.longitude());
```

<br>
<br>

## 7. lens를 활용한 객체 속성 다루기

### what is lens?

- 하스켈 언어의 `Control.Lens` 라이브러리 내용 중 JS에서 동작할 수 있는 getter/setter 기능만 ramda 함수로 구현한 것

※ 활용 방법

1. `lens` 함수로 객체의 특정 속성에 대한 lens 생성
2. lens를 `view` 함수에 적용해서 속성값을 얻어냄
3. lens를 `set` 함수에 적용해서 속성값이 바뀐 새로운 객체를 얻어냄
4. lens와 속성값을 바꾸는 함수를 `over` 함수에 적용해서 값이 바뀐 새로운 객체를 얻어냄

<br>

### prop & assoc

- `prop`
  - 'property'
  - 객체의 특정 속성값을 가져오는 함수
  - **getter**
  - `prop('name')(person)`
- `assoc`
  - **setter**
  - `assoc('name', 'Loko')(person)`

<br>

### lens 함수

- lens 기능을 사용하려면 일단 lens를 만들어야 함
- `lens` `prop` `assoc`의 조합으로 만듦

```ts
export const makeLens = (propName: string) =>
  lens(prop(propName), assoc(propName));
```

<br>

### view & set & over

- getter / setter 를 생성할 수 있게 해주는 함수들

```ts
import { lens, assoc, view, set, over } from "ramda";

export const makeLens = (propName: string) =>
  lens(prop(propName), assoc(propName));

export const getter = (lens) => view(lens);
export const setter =
  (lens) =>
  <T>(newValue: T) =>
    set(lens, newValue);
export const setterUsingFunc =
  (lens) =>
  <T, R>(func: (T) => R) =>
    over(lens, func);
```

<br>

### lensPath 함수

- person.location.coordinates.longitude와 같은 긴 속성값을 쓰지 않게 해주는 함수
  - 이러한 중첩 속성을 '경로'라고도 부름

```ts
const longitudeLens = lensPath(["location", "coordinates", "longitude"]);
const getLongitude = getter(longitudeLens);
const setLongitude = setter(longitudeLens);
```

<br>
<br>

## 객체 다루기

### toPairs & fromPairs

`toPairs`: 객체의 속성들을 분해해서 배열로 만듦

- 배열의 각 아이템은 `[string, any]` 타입의 튜플

```ts
const pairs: [string, any][] = toPairs(person);
```

`fromPairs`: `[key, value]` 형태의 아이템을 가진 배열을 다시 객체로 만듦

```ts
const person: IPerson = fromPairs(pairs) as IPerson;
```

<br>

### keys & values

`keys`: 객체의 속성 이름만 추려서 `string[]` 타입으로 반환

```ts
const keys: string[] = keys(makeRandomIPerson());
```

`values`: 객체의 속성값만 추려서 `any[]` 타입으로 반환

```ts
const values: any[] = values(makeRandomIPerson());
```

<br>

### zipObj 함수

- 키 배열과 값 배열을 결합해서 객체로 만듦

```ts
const zippedPerson: IPerson = zipObj(keys, values) as IPerson;
```

<br>

### mergeLegt & mergeRight

- 2개의 객체를 입력받아서 속성들을 결합한 새로운 객체 생성
- `Left`인지 `Right`인지에 따라 우선순위를 결정
  - 서로 같은 이름의 속성이 있고, 값은 다를 때 선택하기 위함

```ts
const left = { name: "Jack" },
  right = { name: "Jane", age: 32 };
const person1 = mergeLeft(left, right); // { name: 'Jack', age: 32 }
const person2 = mergeRight(left, right); // { name: 'Jane', age: 32 }
```

<br>

### mergeDeepLeft & mergeDeepRight

- 객체의 속성에 담긴 객체도 바꾸려고 할 때 사용

```ts
const newPerson = mergeDeepRight(person, { location: newLocation });
```

<br>
<br>

## 9. 배열 다루기

### prepend & append

`prepnd`: 배열 맨 앞에 아이템 삽입

```ts
const newArr = prepend(1)(arr);
```

`append`: 배열 맨 뒤에 아이템 삽입

```ts
const newArr = append(1)(arr);
```

<br>

### flatten 함수

- 다차원의 복잡한 배열을 1차원의 평평한 배열로

```ts
const flattendArr = flatten(arr);
```

<br>

### unnest 함수

- `flatten`보다 조금 정교하게 배열을 가공
- 예를 들어 3차원 배열이 있다면 `unnest` 한번에 2차원 배열이 되고,<br>한번 더 `unnest`를 하면 `flatten`과 같은 1차원 배열이 됨

<br>

### sort 함수

- 배열이 `number[]`일 때 `sort` 함수로 내림차순 및 오름차순 정렬 가능

```ts
sortedArr = sort((a: number, b: number) => a - b)(arr); // 오름차순 정렬
```

<br>

### sortBy 함수

- 객체의 배열을 특정 속성값에 따라 정렬
- 오름차순 정렬만 가능

```ts
const ageSortedPersons = sortBy(prop("age"))(persons);
```

<br>

### sortWith

- `sortBy`와는 다르게, 오름차순과 내림차순 모두 가능
  - `ascend` `descend` 함수를 활용하면 됨

```ts
const nameSortedPersons = sortWith([descend(prop("name"))])(persons); // name 속성을 기준으로 내림차순 정렬
```
