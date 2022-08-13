## 1. TypeScript 변수 선언문

### TypeScript 기본 제공 타입

number / boolean / string / object

<br>

### let & const

- var는 ESNext에서 deprecated
- let은 mutable, const는 immutable
  - const 변수 선언 시 초기값이 꼭 필요함

<br>

### type annotation

- 변수 선언문을 확장해서 타입 명시 가능

```ts
let n: number = 1;
let b: boolean = true;
let s: string = "hello";
let o: object = {};
```

<br>

### type inference

- JS와의 호환성을 위해 타입 주석 생략 가능
- 생략할 경우, 우항의 값에 따라 타입을 추론

```ts
let n = 1;
let b = true;
let s = "hello";
let o = {};
```

<br>

### any 타입

- JS와의 호환을 위해 제공
- 어떤 종류의 값이라도 저장 가능
- 모든 타입의 최상위 타입

```ts
let a: any = 0;
a = "hello";
a = true;
a = {};
```

<br>

### undefined 타입

- JS에서의 undefined는 값
- TS에서는 타입이기도 하고 값이기도 함
- undefined 타입은 undefined 값만 가질 수 있는 최하위 타입

```ts
let u: undefined = undefined;
```

<br>

### template string

- 변수에 담긴 값을 조합해서 문자열을 만드는 방법

```ts
let count = 10,
  message = "Your count";
let result = `${message} is ${count}`;
```

<br>
<br>

## 2. 객체와 인터페이스

**object 타입**

- 클래스와 인터페이스의 상위 타입
- object 타입으로 선언된 변수는 number, boolean, string 타입의 값을 가질 수 없음
- 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있음
- 마치 객체를 대상으로 하는 any 타입과도 같음

```ts
let o: object = { name: "Loko", age: 28 };
```

<br>

### 인터페이스 선언문

- interface 타입 : 객체의 타입을 정의할 수 있게 해줌
- 객체를 의미하는 `{}`를 사용해서 타입들을 나열

```ts
interface IPerson {
  name: string;
  age: number;
}
```

<br>

### optional property

- 인터페이스 설계 시 있어도 되고 없어도 되는 속성 지정 가능
- `?` 기호를 사용해서 표현

```ts
interface IPerson {
  name: string;
  age: number;
  etc?: boolean;
}
```

<br>

### anonymous interface

- interface 키워드 및 이름도 없이 인터페이스를 만들 수 있음

```ts
let ai: {
  name: string;
  age: number;
  etc?: boolean;
} = { name: "Loko", age: 28 };
```

<br>
<br>

## 3. 객체와 클래스

### 클래스 선언문

class, private, public, protected, implements, extends 키워드 제공

```ts
class Person {
  name: string;
  age?: number;
}
```

<br>

### access modifier

- 클래스는 이름 앞에 `public` `private` `protect` 라는 접근 제한자를 붙일 수 있음
- 생략할 경우 `public` 으로 간주

<br>

### constructor

```ts
class Person {
  constructor(public name: string, public age?: number) {}
}
```

<br>

### interface

- `implements` 키워드를 사용하여 구현
- 인터페이스는 규약에 불과하며 물리적으로 해당 속성을 만들지는 않음

```ts
interface IPerson {
  name: string;
  age?: number;
}

class Person implements IPerson {
  name: string;
  age: number;
}
```

<br>

### 추상 클래스

- 클래스 키워드 앞에 `abstract` 키워드를 사용해서 추상 클래스를 만들 수 있음
- 추상 클래스는 자신의 속상이나 메소드 앞에도 `abstract` 키워드를 붙여서 상속받는 클래스에서 구현하도록 함

```ts
abstract class AbstractPerson {
  abstract name: string;
  constructor(public age?: number) {}
}
```

<br>

### 클래스 상속

- `extends` 키워드를 사용해서 상속 클래스를 만들 수 있음
- 자식 클래스는 부모 클래스의 생성자를 `super` 키워드로 호출할 수 있음

```ts
class Person extends AbstractPerson {
  constructor(public name: string, age?: number) {
    super(age);
  }
}
```

<br>

### static 속성

- 클래스는 정적인 속성을 가질 수 있음
- 클래스의 정적 속성은 `ClassName.staticVar` 형식으로 가져올 수 있음

```ts
class A {
  static initValue = 1;
}

let initVal = A.initValue;
```

<br>
<br>

## 4. 객체의 비구조화 할당문

- **structuring** : 인터페이스나 클래스를 사용해서 관련된 정보를 묶어 새로운 타입으로 표현하는 것

```ts
let jack: IPerson = { name: "Jack", age: 28 },
  jane: IPerson = { name: "Jane", age: 32 };

let apple: ICompany = { name: "Apple Computer Inc", age: 43 },
  ms: ICompany = { name: "Microsoft", age: 44 };
```

<br>

### destructuring

- 구조화된 데이터는 어떤 시점에서 데이터의 일부만 사용해야 할 때가 있음
- 구조화된 데이터를 분해하는 작업을 **destructuring(비구조화)** 라고 함

```ts
let name = jack.name,
  age = jack.age;
```

<br>

### 비구조화 할당

- 배열, 객체, 튜플에 사용 가능
- 사용법 : 얻고 싶은 속성을 `{}`로 묶음

```ts
let jack: IPerson = { name: "Jack", age: 32 };
let { name, age } = jack;
```

<br>

### rest operator

- `...` 연산자가 사용되는 위치부터 나머지 값들을 한번에 담을 수 있음

```ts
let address: any = {
  country: "Korea",
  city: "Seoul",
  address1: "Gangnam-gu",
  address2: "Sinsa-dong 123-456",
  address3: "789 street, 2 Floor ABC building",
};

const { country, city, ...detail } = address;
```

<br>

### spread operator

- 같은 `...` 연산자를 사용하지만 비구조화 할당문이 아닌 경우에는 **전개 연산자** 라고 부름

```ts
let part1 = { name: "Jane" },
  part2 = { age: 22 },
  part3 = { city: "Seoul", country: "Kr" };
let merged = { ...part1, ...part2, ...part3 };
```

<br>

## 5. 객체의 타입 변환

### type conversion

```ts
let person: object = { name: "Jack", age: 32 };
let name = (<{ name: string }>person).name;
```

<br>

### type assertion

- 타입 단언문에는 2가지 형태가 있음
  - `(<type>obj)`
  - `(obj as type)`
- JS의 타입 변환 구문과 구분하기 위해서 타입 단언이라는 용어를 사용
