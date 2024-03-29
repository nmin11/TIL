# 객체 지향 프로그래밍 (OOP : Object Oriented Programming)

- 현실 세계에서 어떤 제품을 만들 때, 부품을 먼저 개발하고 이 부품들을 하나씩 조립해서 완성된 제품을 만들 듯,<br>소프트웨어를 개발할 때에도 부품에 해당하는 객체들을 먼저 만들고, 이것들을 하나씩 조립해서 완성된 프로그램을 만드는 기법

<br>
<br>

## 객체란?

- 객체(Object)란 물리적으로 존재하거나 추상적으로 생각할 수 있는 것 중에서 자신의 속성을 가지고 있는 다른 것과 식별 가능한 것을 뜻함
  - ex) 물리적으로 존재하는 자동차, 자전거, 책, 사람
  - ex) 추상적인 학과, 강의, 주문
- 객체는 속성과 동작으로 구성되어 있음
  - ex) 사람은 이름, 나이 등의 속성을 가지며, 웃다, 걷다 등이 동작을 할 수 있음
  - Java는 이 속성과 동작들을 각각 **field** 와 **method** 라고 부름
- 현실 세계의 객체를 소프트웨어 객체로 설계하는 것을 **Object Modeling** 이라고 함
  - 객체 모델링은 현실 세계 객체의 속성과 동작을 추려내서 소프트웨어 객체의 필드와 메소드로 정의하는 과정이라고 볼 수 있음

<br>
<br>

## 객체의 상호작용

- 현실 세계에서 일어나는 모든 현상은 객체와 객체 간의 상호작용으로 이루어져 있음
- 소프트웨어에서도 객체들은 각각 독립적으로 존재하고, 다른 객체와 서로 상호작용하면서 동작함
  - 객체들 사이의 상호작용 수단은 메소드이며, 객체가 다른 객체의 기능을 이용하는 것이 메소드 호출
- 메소드 호출 방법은 객체에 `.` 연산자를 붙이고 메소드 이름을 기술하면 됨

```java
int result = Calculator.add(10, 20);
```

<br>
<br>

## 객체 간의 관계

- 객체는 개별적으로 사용될 수 있지만, 대부분 다른 객체와 관계를 맺고 있음
- 관계의 종류에는 **집합 관계, 사용 관계, 상속 관계** 가 있음
  - **집합 관계** : 집합 관계에 있는 객체는 하나는 부품이고 하나는 완성품에 해당
  - **사용 관계** : 객체 간의 상호작용을 뜻함. 객체는 다른 객체의 메소드를 호출하여 원하는 결과를 얻어냄
  - **상속 관계** : 상위(부모) 객체를 기반으로 하위(자식) 객체를 생성하는 관계를 뜻함. 일반적으로 상위 객체는 종류를 의미하고 하위 객체는 구체적인 사물에 해당

<br>
<br>

## 객체 지향 프로그래밍의 특징

### 캡슐화 (Encapsulation)

- 객체의 필드와 메소드를 하나로 묶고, 실제 구현 내용을 감추는 것
- 외부 객체는 객체 내부의 구조를 알지 못하며 객체가 노출해서 제공하는 필드와 메소드만 이용 가능
- 필드와 메소드를 캡슐화하여 보호하는 이유는 외부의 잘못된 사용으로 인해 객체가 손상되지 않도록 하기 위한 목적
- Java는 캡슐화된 멤버를 노출시킬 것인지, 숨길 것인지를 결정하기 위해 **접근 제한자(Access Modifier)** 를 사용함
  - 접근 제한자는 객체의 필드와 메소드의 사용 범위를 제한함으로써 외부로부터 보호함
- 실생활 예시) TV의 중요한 부품이 바깥으로 노출되어 있다면 사용자의 실수로 고장날 수도 있으니, TV 안쪽으로 캡슐화해서 숨겨두어야 함

<br>

### 상속 (Inheritance)

- 상위 객체가 자신이 갖고 있는 필드와 메소드를 하위 객체에게 물려주어 하위 객체가 사용할 수 있도록 해줌
- 상위 객체를 재사용해서 하위 객체를 쉽고 빨리 설계할 수 있도록 도와줌
  - 이미 잘 개발된 객체를 재사용해서 새로운 객체를 만들기 때문에 코드의 중복을 줄여줌
- 상위 객체의 수정으로 모든 하위 객체들의 수정 효과를 가져오므로 유지 보수 시간을 최소화시켜줌

<br>

### 다형성 (Polymorphism)

- 하나의 타입에 여러 객체를 대입함으로써 다양한 기능을 이용할 수 있도록 해줌
- Java는 다형성을 위해 부모 클래스 또는 인터페이스의 타입 변환을 허용함
  - 부모 타입에는 모든 자식 객체가 대입될 수 있고, 인터페이스 타입에는 모든 구현 객체가 대입될 수 있음
- 다형성의 효과로 객체는 부품화가 가능
- 실생활 예시) 자동차를 설계할 때 타이어 인터페이스 타입을 적용했다면 이 인터페이스를 구현할 실제 타이어들은 한국 타이어든 금호 타이어든 상관없이 장착 가능

<br>
<br>

# 객체와 클래스

- 현실 세계에서 객체는 설계도를 바탕으로 만들어짐
  - ex) 사람들이 자동차를 이용하기 위해서는 우선 공장에서 설계도를 보고 자동차를 만들어야 함
- OOP에서도 메모리에서 사용하고 싶은 객체가 있다면 우선 설계도로 해당 객체를 만드는 작업이 필요함
- Java에서는 설계도가 바로 **클래스(class)**
- 클래스에는 객체를 생성하기 위한 필드와 메소드가 정의되어 있음
- 클래스로부터 만들어진 객체를 해당 클래스의 **인스턴스(instance)** 라고 함
  - ex) 자동차 객체는 자동차 설계도 클래스의 인스턴스인 셈
- 클래스로부터 객체를 만드는 과정을 **인스턴스화** 라고 함
- 하나의 클래스로부터 여러 개의 인스턴스를 만들 수 있음
  - ex) 동일한 설계도로부터 여러 대의 자동차를 만들 수 있음
- **OOP의 3단계**
  1. 클래스 설계
  2. 클래스를 가지고 사용할 객체를 생성
  3. 생성된 객체를 이용

<br>
<br>

# 클래스 선언

- 사용하고자 하는 객체를 구상하고, 그 객체의 대표 이름을 하나 결정하여 이것을 클래스 이름으로 지정
- 클래스 이름은 다른 클래스와 식별할 목적으로 사용되므로 Java의 식별자 작성 규칙에 따라야 함
  1. 하나 이상의 문자로 이루어질 것
  2. 첫 번째 글자는 숫자가 올 수 없음
  3. `$` `_` 외의 특수 문자 사용 불가능
  4. Java 키워드 사용 불가능
- 클래스 이름은 한글이든 영어든 상관없지만, 한글로 클래스 이름을 만드는 경우는 거의 없음
- Java는 영어 대소문자를 다른 문자로 취급하기 때문에 클래스 이름도 영어 대소문자를 구분함
- 관례적으로 각 단어의 첫 머리 글자는 대문자로 작성함
- 클래스 이름을 정했다면 `클래스이름.java` 형식으로 소스 파일을 생성해야 함
  - 소스 파일을 생성했다면 소스 파일을 열고 클래스를 선언해야 함

```java
public class Car {

}
```

일반적으로 소스 파일당 하나의 클래스를 선언하지만, 2개 이상의 클래스 선언도 가능하다.

```java
public class Car {

}

class Tire {

}
```

2개 이상의 클래스가 선언된 소스 파일을 컴파일하면 바이트 코드 파일(`.class`)은 클래스를 선언한 개수만큼 생긴다.  
**결국 소스 파일은 클래스 선언을 담고 있는 저장 단위일 뿐, 클래스 자체는 아니라는 뜻이다.**  
위의 코드를 컴파일하면 `Car.class`와 `Tire.class`가 각각 생성된다.  
주의할 점은 파일 이름과 동일한 이름의 클래스 선언에만 `public` 접근 제한자를 붙일 수 있다는 점이다.  
만약 파일 이름과 동일하지 않은 클래스에 public 접근 제한자를 붙이면 컴파일 에러가 발생한다.  
**가급적이면 소스 파일 하나당 동일한 이름의 클래스 하나를 선언하는 것이 좋다.**

<br>
<br>

# 객체 생성과 클래스 변수

- 클래스를 선언한 후 컴파일을 했다면 객체를 생성할 설계도가 만들어진 셈

```java
클래스 변수 = new 클래스();
```

- 클래스로부터 객체를 생성하기 위해서 `new` 연산자를 사용할 수 있음
  - new 연산자는 클래스로부터 객체를 생성시키는 연산자
  - new 연산자로 생성된 객체는 메모리 힙 영역에 생성됨
  - 메모리 내에서 생성된 객체의 위치를 모르면 객체를 사용할 수 없으므로, new 연산자는 힙 영역에 객체를 생성시킨 후, 객체의 주소를 리턴하도록 되어 있음
    - 이 주소를 참조 타입인 클래스 변수에 저장해 두면, 변수를 통해 객체를 사용할 수 있음
- 클래스의 2가지 용도 : 라이브러리(API : Application Program Interface)용 / 실행용
  - 라이브러리 클래스는 다른 클래스에서 이용할 목적으로 설계됨
  - 프로그램 전체에서 사용되는 클래스가 100개라면 99개는 라이브러리이고 단 하나가 실행 클래스
  - 실행 클래스는 프로그램 실행 진입점인 `main()` 메소드를 제공해주는 역할을 함

```java
public class Student { }
```

```java
public class StudentExample {
  public static void main(String[] args) {
    Student student = new Student();
  }
}
```

위의 코드에서 Student는 라이브러리 클래스이고 StudentExample은 실행 클래스이다.  
사실 Student 클래스 안에 main() 메소드를 작성해서 라이브러리인 동시에 실행 클래스로 작동하도록 설계할 수도 있지만 이는 OOP에는 맞지 않는다.  
대부분의 객체 지향 프로그램은 라이브러리와 실행 클래스가 분리되어 있다.

<br>
<br>

# 클래스의 구성 멤버

- 클래스에는 객체가 가져야 할 구성 멤버가 선언됨
  - **Field** : 객체의 데이터가 저장되는 곳
  - **Constructor** : 객체 생성 시 초기화 역할 담당
  - **Method** : 객체의 동작에 해당하는 실행 블록
  - 구성 멤버들은 생략될 수도 있고, 복수 개가 작성될 수도 있음

```java
public class ClassName {
  //필드
  int fieldName;

  //생성자
  ClassName() { ··· }

  //메소드
  void methodName() { ··· }
}
```

<br>
<br>

## 필드

- 객체의 고유 데이터, 부품 객체, 상태 정보를 저장하는 곳
- 선언 형태는 변수(variable)와 비슷하지만, 필드를 변수라고 부르지는 않음
  - 변수는 생성자와 메소드 내에서만 사용되고 생성자와 메소드가 종료되면 자동 소멸됨
  - 필드는 생성자와 메소드 전체에서 사용되며 객체가 소멸되지 않는 한 객체와 함께 존재

<br>
<br>

## 생성자

- `new` 연산자로 호출되는 특별한 `{ }` 블록
- 객체 생성 시 초기화를 담당
  - 필드를 초기화하거나, 메소드를 호출해서 객체를 사용할 준비를 함
- 생성자는 메소드와 비슷하게 생겼지만, 클래스 이름으로 되어 있고 리턴 타입이 없음

<br>
<br>

## 메소드

- 객체의 동작에 해당하는 `{ }` 블록
- 중괄호 블록이 갖는 이름이 곧 메소드 이름
- 메소드 호출 시 중괄호 블록에 있는 모든 코드 일괄 실행
- 필드를 읽고 수정하는 역할을 기본적으로 하며, 다른 객체를 생성해서 다양한 기능을 수행하기도 함
- 메소드는 객체 간의 데이터 전달의 수단으로 사용됨
- 외부로부터 매개값을 받을 수 있으며, 실행 후 어떤 값을 리턴할 수 있음

<br>
<br>

# 필드

- 객체의 고유 데이터, 객체가 가져야 할 부품, 객체의 현재 상태 데이터를 저장하는 곳

```java
public class Car {
  //고유 데이터
  String company;
  String model;
  String color;
  int maxSpeed;

  //상태
  int speed;
  int rpm;

  //부품
  Body body;
  Engine engine;
  Tire tire;
}
```

<br>
<br>

## 필드 선언

- 위의 예시에서 보여지듯, 변수 선언과 같은 방식으로 선언함
- `{ }` 블록 어디서든 존재할 수 있음
  - 생성자 선언과 메소드 선언의 앞뒤 어느 곳에서나 선언 가능
  - 하지만 생성자와 메소드 중괄호 내부에는 선언될 수 없으며, 여기에 선언된 변수는 로컬 변수로 취급
- 필드의 초기값은 필드 선언 시 주어질 수도 있고, 생략될 수도 있음
- 초기값이 지정되지 않은 필드들은 객체 생성 시 자동으로 기본 초기값으로 설정됨

|   분류    | 데이터 타입 |  초기값  |
| :-------: | :---------: | :------: |
| 정수 타입 |    byte     |    0     |
| 정수 타입 |    char     | '\u0000' |
| 정수 타입 |    short    |    0     |
| 정수 타입 |     int     |    0     |
| 정수 타입 |    long     |    0L    |
| 실수 타입 |    float    |   0.0F   |
| 실수 타입 |   double    |   0.0    |
| 논리 타입 |   boolean   |  false   |
| 참조 타입 |    array    |   null   |
| 참조 타입 |    class    |   null   |
| 참조 타입 |  interface  |   null   |

<br>
<br>

## 필드 사용

- 필드를 사용한다는 것은 필드값을 읽고, 변경하는 작업을 의미
- 클래스 내부의 생성자나 메소드에서 사용할 경우, 단순히 필드 이름으로 읽고 변경하면 됨
- 클래스 외부에서 사용할 경우, 우선 클래스로부터 객체를 생성한 뒤 필드를 사용해야 함

```java
public class Car {
  //필드
  int speed;

  //생성자
  Car() {
    speed = 0;
  }

  //메소드
  void method() {
    speed = 10;
  }
}
```

```java
public class Person {
  Car myCar = new Car();
  myCar.speed = 60;
}
```

myCar 변수가 Car 객체를 참조하게 되면 `.` 연산자를 사용해서 speed 필드에 접근할 수 있다.  
`.` 연산자는 객체 접근 연산자로 객체가 가지고 있는 필드나 메소드를 사용하고자 할 때 사용된다.

<br>
<br>

# 생성자

- new 연산자와 함께 사용되며, 클래스로부터 객체를 생성할 때 호출되어 객체의 초기화를 담당함
  - 객체 초기화 : 필드를 초기화하거나, 메소드를 호출해서 객체를 사용할 준비를 하는 것
- 생성자를 실행시키지 않고는 클래스로부터 객체를 만들 수 없음
- 생성자가 성공적으로 실행되면 힙 영역에 객체가 생성되고 객체의 주소가 리턴됨
  - 리턴된 객체의 주소는 클래스 타입 변수에 저장되어 객체에 접근할 때 이용됨

<br>
<br>

## 기본 생성자

- 모든 클래스는 생성자가 반드시 존재하며, 하나 이상을 가질 수 있음
- 개발자가 클래스 내부에 생성자 선언을 생략해도 컴파일러는 기본 생성자를 바이트 코드에 자동으로 추가함

```java
//소스 파일 (Car.java)
public class Car { }
```

```java
//바이트 코드 파일 (Car.class)
public class Car {
  public Car() { }  // 기본 생성자 자동 추가
}
```

- 클래스에 명시적으로 선언한 생성자가 1개라도 있으면 컴파일러는 기본 생성자를 추가하지 않음
  - 명시적으로 생성자를 선언하는 이유는 객체를 다양하게 초기화하기 위해서

<br>
<br>

## 생성자 선언

- 생성자는 메소드와 비슷한 모양을 가지고 있지만 리턴 타입이 없고 클래스 이름과 동일함
- 생성자 블록 내부에는 객체 초기화 코드가 작성됨
- 매개 변수 선언은 생략할 수도 있고 여러 개를 선언할 수도 있음
- 클래스에 생성자가 명시적으로 선언되어 있을 경우에는 반드시 선언된 생성자를 호출해서 객체를 생성해야만 함

```java
public class Car {
  Car(String color, int cc) {
    this.color = color;
    this.cc = cc;
  }
}
```

```java
public class CarExample {
  public static void main(String[] args) {
    Car myCar = new Car("black", 3000);
  }
}
```

위와 같이 명시적인 생성자 선언이 있을 경우에는 기본 생성자를 사용할 수 없다.

<br>
<br>

## 필드 초기화

- 클래스로부터 객체가 생성될 때 필드는 기본 초기값으로 자동 설정됨
- 다른 값으로 초기화하고 싶다면 2가지 방법이 있음
  - 필드를 선언할 때 초기값을 주는 방법
    - 이 방법을 사용하면, 동일한 클래스로부터 생성되는 객체들은 모두 같은 데이터를 갖게 됨
    - 객체 생성 후 변경할 수는 있음
  - 생성자에서 초기값을 주는 방법
    - 객체 생성 시점에 외부에서 제공되는 다양한 값들로 초기화되어야 한다면 이 방법을 써야 함

```java
public class Korean {
  String nation = "대한민국"
  String name;
  String ssn;

  public Korean(String name, String ssn) {
    this.name = name;
    this.ssn = ssn;
  }
}
```

- 매개 변수 이름은 다른 것을 사용할 수도 있지만, 관례적으로 필드와 동일한 이름을 갖는 매개 변수를 사용함
  - 동일한 이름을 사용할 경우, 생성자를 통해 생성될 객체 자신의 참조를 뜻하는 `this.`을 붙여서 매개 변수와 구분지어야 함

<br>
<br>

## 생성자 Overloading

- 외부에서 제공되는 다양한 데이터들을 이용해서 객체를 초기화하려면 생성자도 다양화될 필요가 있음
- Java는 다양한 방법으로 객체를 생성할 수 있도록 생성자 오버로딩을 제공함
- 생성자 오버로딩이란 매개 변수를 달리하는 생성자를 여러 개 선언하는 것을 뜻함

```java
public class Car {
  Car() { ··· }
  Car(String model) { ··· }
  Car(String model, String color) { ··· }
  Car(String model, String color, int maxSpeed) { ··· }
}
```

- 주의할 점 : 매개 변수의 타입과 개수, 순서가 똑같을 경우 매개 변수 이름만 바꾸는 것은 생성자 오버로딩이 아님

```java
Car(String model, String color) { ··· }
Car(String color, String model) { ··· }   //오버로딩이 아님
```

- 생성자가 오버로딩되어 있을 경우, `new` 연산자로 생성자를 호출할 때 제공되는 매개값의 타입과 수에 의해 호출될 생성자가 결정됨

```java
Car car1 = new Car();
Car car2 = new Car("그랜저");
Car car3 = new Car("그랜저", "흰색");
Car car4 = new Car("그랜저", "흰색", 300);
```

<br>
<br>

## 다른 생성자 호출 (this())

- 생성자 오버로딩이 많아질 경우 생성자 간의 중복된 코드가 발생할 수 있음
  - 필드 초기화 내용은 한 생성자에만 집중적으로 작성하고 나머지 생성자는 초기화 내용을 가지고 있는 생성자를 호출하는 방법으로 개선 가능
- 생성자 안에 `this()`를 사용하여 다른 생성자 호출 가능
  - 반드시 생성자의 첫줄에 작성해야 함
  - 호출되는 생성자의 매개 변수 타입에 맞게 제공해야 함
  - `this()` 뒤에 추가적인 실행문들이 올 수 있음

```java
public class Car {
  String company = "현대자동차"
  String model;
  String color;
  int maxSpeed;

  Car(String model) {
    this(model, "은색", 250);
  }

  Car(String model, String color) {
    this(model, color, 250);
  }

  //공통 실행 생성자
  Car(String model, String color, int maxSpeed) {
    this.model = model;
    this.color = color;
    this.maxSpeed = maxSpeed;
  }
}
```

<br>
<br>

# 메소드

- 객체의 동작에 해당하는 중괄호 블록
- 중괄호 블록의 이름은 메소드 이름
- 메소드를 호출하면 중괄호 블록에 있는 모든 코드들이 일괄적으로 실행됨
- 필드를 읽고 수정하는 역할도 하고, 다른 객체를 생성해서 다양한 기능을 수행하기도 함
- 객체 간의 데이터 전달 수단으로 사용됨
  - 외부로부터 매개값을 받을 수도 있고, 실행 후 어떤 값을 리턴할 수도 있음

<br>
<br>

## 메소드 선언

```java
리턴타입 메소드이름(매개변수들) {
  실행문;
}
```

- 선언부(리턴 타입, 메소드 이름, 매개 변수 선언)와 실행 블록으로 구성됨
  - 메소드 선언부를 signature라고도 함

<br>

### 리턴 타입

- 메소드 실행 후 리턴하는 값의 타입
- 메소드는 리턴값이 있을 수도 있고 없을 수도 있음

```java
void powerOn() { ··· }
double divide(int x, int y) { ··· }
```

두 메소드는 다음과 같이 호출할 수 있다.

```java
powerOn();
double result = divide(10, 20);
```

- 리턴값을 받기 위한 변수는 반드시 메소드의 리턴 타입과 동일하게 선언해야 함
- 리턴 타입이 있다고 해서 반드시 리턴값을 변수에 저장할 필요는 없음
  - 경우에 따라서 리턴값보다는 메소드 실행이 중요할 때가 있음

<br>

### 메소드 이름

- Java 식별자 규칙 및 관례에 맞게 작성하면 됨
  - 숫자로 시작하면 안 되고, `$`와 `_`를 제외한 특수 문자를 사용하지 말아야 함
  - 관례적으로 소문자로 작성
  - 서로 다른 단어가 혼합된 이름이라면 뒤이어 오는 단어의 첫머리 글자는 대문자로 작성

<br>

### 매개 변수 선언

- 메소드가 실행될 때 필요한 데이터를 외부로부터 받기 위해 사용됨
- 메소드 호출 시 매개값은 반드시 매개 변수의 타입에 부합되는 값으로 넣어줘야 함
  - 만약 연산 과정 중 타입 자동 변환이 일어나고, 그 타입이 리턴 타입에 부합한다면 상관 없음

```java
byte b1 = 10;
byte b2 = 20;
double result = divide(b1, b2);
```

<br>

### 매개 변수의 수를 모를 경우

- 메소드의 매개 변수는 개수가 이미 정해져 있는 것이 일반적이지만, 경우에 따라서 메소드를 선언할 때 매개 변수의 개수를 알 수 없는 경우가 있음
- 예를 들어 여러 개의 수를 모두 합산하는 메소드를 선언해야 한다면 몇 개의 매개 변수가 입력될지 알 수 없음
- 해결책은 매개 변수를 배열 타입으로 선언하는 것

```java
int sum1(int[] values) {
  int sum = 0;
  for (int value : values) {
    sum += value;
  }
  return sum;
}
```

```java
int[] values = { 1, 2, 3 };
int result = sum1(values);
int result = sum1(new int[] { 1, 2, 3, 4, 5 });
```

- 배열을 생성하지 않고 값의 리스트만 넘겨주는 방법도 있음
- `...`을 사용해서 선언하면 됨
  - `...`으로 선언 시 매개값으로 넘겨주는 값의 수에 따라 자동으로 배열 선언 / 아니면 직접 배열을 매개값으로 줘도 됨

```java
int sum2(int ... values) {
  int sum = 0;
  for (int value : values) {
    sum += value;
  }
  return sum;
}
```

```java
int result = sum2(1, 2, 3);
int result = sum2(1, 2, 3, 4, 5);
int[] values = { 1, 2, 3 };
int result = sum2(values);
int result = sum2(new int[] { 1, 2, 3, 4, 5 });
```

<br>
<br>

## return문

### 리턴값이 있는 메소드

- 메소드 선언에 리턴 타입이 있는 메소드는 반드시 return문을 사용해서 리턴값을 지정해야 함
- return문의 리턴값은 리턴 타입이거나 리턴 타입으로 변환될 수 있어야 함

```java
int plus(int x, int y) {
  byte result = (byte) (x + y);
  return result;
}
```

- return문 이후에 실행문이 오면 `Unreachable code`라는 컴파일 오류 발생

```java
int plus(int x, int y) {
  int result = x + y;
  return result;
  System.out.println(result);   //Unreachable code
}
```

- 하지만 if문과 같은 조건문을 사용할 경우에는 조건문 안의 return문과 상관 없이, 조건문 이후에 다른 실행문을 작성할 수 있음

```java
boolean isLeftGas() {
  if(gas == 0) {
    return false;
  }
  return true;
}
```

<br>

### 리턴값이 없는 메소드 (void)

- void로 선언된 리턴값이 없는 메소드에서도 return문을 사용할 수 있음

```java
void run() {
  while(true) {
    if(gas > 0) {
      gas -= 1;
    } else {
      return;
    }
  }
}
```

`return;`을 활용해서 메소드 실행을 강제 종료시킬 수 있다.  
그런데 위 예제와 같이 while문을 사용할 때에는 while문을 종료시키는 `break;`와 메소드 전체를 종료시키는 `return;`의 차이를 명확히 구분하여 사용해야 한다.

<br>
<br>

## 메소드 호출

- 메소드는 클래스 내 · 외부의 호출에 의해 실행됨
  - 클래스 내부에서 호출할 경우에는 단순하게 메소드 이름으로 호출하면 됨
  - 클래스 외부에서 호출할 경우에는 우선 클래스로부터 객체를 생성한 뒤, 참조 변수를 이용해서 메소드를 호출해야 함
    - 객체가 존재해야 메소드도 존재하기 때문

<br>

### 객체 내부에서 호출

```java
public class Calculator {
  int plus(int x, int y) {
    int result = x + y;
    return result;
  }

  double avg(int x, int y) {
    double sum = plus(x, y);
    double result = sum / 2;
    return result;
  }

  void execute() {
    double result = avg(7, 10);
    System.out.println("실행 결과 : " + result);
  }
}
```

<br>

### 객체 외부에서 호출

- 객체 생성 이후 참조 변수와 함께 `.` 연산자를 사용해서 메소드 호출 가능

```java
Car myCar = new Car();
myCar.keyTurnOn();
myCar.run();
int speed = myCar.getSpeed();
```

<br>
<br>

## 메소드 오버로딩

- 클래스 내에 같은 이름의 메소드를 여러 개 선언하는 것을 뜻함
  - 오버로딩의 사전적 의미는 **많이 싣는 것**
- 메소드 오버로딩의 조건은 매개 변수의 타입, 개수, 순서 중 하나라도 달라야 함
- 오버로딩된 메소드를 호출할 경우 JVM은 매개값의 타입을 보고 메소드를 선택함

```java
int plus(int x, int y) {
  int result = x + y;
  return result;
}

double plus(double x, double y) {
  double result = x + y;
  return result;
}
```

```java
int x = 10;
double y = 20.3;
plus(x, y);
```

위 연산은 컴파일 오류가 날 것 같지만 `plus(double x, double y)` 메소드가 실행된다.  
JVM은 일차적으로 매개 변수 타입을 보지만, 매개 변수 타입이 일치하지 않을 경우, 자동 타입 변환이 가능한지를 검사한다.

<br>

- 주의할 점 1 : 매개 변수의 타입과 개수, 순서가 똑같을 경우 매개 변수 이름만 바꾸는 것은 메소드 오버로딩이 아님
- 주의할 점 2 : 리턴 타입만 다르고 매개 변수가 동일하다면 메소드 오버로딩이 아님

```java
int divide(int x, int y) { ··· }
double divide(int a, int b) { ··· }   //컴파일 오류 발생
```

<br>
<br>

# 인스턴스 멤버와 this

- 인스턴스 멤버란 객체를 생성한 후 사용할 수 있는 필드와 메소드를 가리키며, 이들을 각각 인스턴스 필드, 인스턴스 메소드라고 부름
- 객체 외부에서 인스턴스 멤버에 접근하기 위해 참조 변수를 사용할 수 있음
- 객체 내부에서 인스턴스 멤버에 접근하기 위해 `this`를 사용할 수 있음

```java
public class Car {
  String model;
  int speed;

  Car(String model) {
    this.model = model;
  }

  void setSpeed(int speed) {
    this.speed = speed;
  }
}
```

<br>
<br>

# 정적 멤버와 static

- 정적 멤버란 클래스에 고정된 멤버로서 객체를 생성하지 않고 사용할 수 있는 필드와 메소드를 가리키며, 이들을 각각 정적 필드, 정적 메소드라고 부름
- 정적 멤버는 객체(인스턴스)에 소속된 멤버가 아니라 클래스에 소속된 멤버이기 때문에 클래스 멤버라고도 함

<br>
<br>

## 정적 멤버 선언

- 필드나 메소드 선언 시 `static` 키워드를 추가적으로 붙이면 됨
- 정적 멤버는 클래스에 고정된 멤버이므로 클래스 로더가 클래스(바이트 코드)를 로딩해서 메소드 메모리 영역에 적재할 때 클래스별로 관리됨
  - 따라서 클래스 로딩이 끝나면 바로 사용 가능

![static-member-generation](https://github.com/nmin11/TIL/blob/main/JVM/this-is-java/img/static-member-generation.png)

- 필드 선언 시 인스턴스 필드로 선언할 것인지, 정적 필드로 선언할 것인지에 대한 판단 기준
  - 객체마다 가지고 있어야 할 데이터라면 인스턴스 필드로 선언
  - 객체마다 가지고 있을 필요성이 없는 데이터라면 정적 필드로 선언

```java
public class Calculator {
  String color;                 //계산기 별로 색깔이 다를 수 있음
  static double pi = 3.141592;  //계산기에서 사용하는 π 값은 동일함
}
```

```java
public class Calculator {
  String color;

  void setColor(String color) { this.color = color; }
  static int plus(int x, int y) { return x + y; }
  static int minus(int x, int y) { return x - y; }
}
```

<br>
<br>

## 정적 멤버 사용

- 클래스가 메모리로 로딩되면 정적 멤버를 바로 사용할 수 있음
- 클래스 이름과 함께 `.` 연산자로 접근하면 됨 (참조 변수를 따로 만들 필요가 없음)
- 원칙적으로는 클래스 이름으로 접근해야 하지만 객체 참조 변수로도 접근이 가능하기는 함
  - 하지만 객체 참조 변수로 접근하는 방식은 권장되지 않음

<br>
<br>

## 정적 초기화 블록

```java
static double pi = 3.141592;
```

- 정적 필드는 위와 같이 필드 선언과 동시에 초기값을 주는 것이 일반적임
- 그러나 계산이 필요한 초기화 작업이 있을 수도 있음
  - 인스턴스 필드는 생성자에서 초기화하지만, 정적 필드는 객체 생성 없이도 사용해야 하므로 생성자에서 초기화 작업을 할 수 없음
- Java는 정적 필드의 복잡한 초기화 작업을 위해서 **static block** 을 제공함
  - 정적 블록은 클래스가 메모리로 로딩될 때 자동적으로 실행됨
  - 정적 블록은 클래스 내부에 여러 개가 선언되어도 상관없음
    - 클래스가 메모리로 로딩될 때 선언된 순서대로 실행됨

```java
public class Television {
  static String company = "Samsung";
  static String model = "LCD";
  static String info;

  static {
    info = company + "-" + model;
  }
}
```

<br>
<br>

## 정적 메소드와 블록 선언 시 주의할 점

- 객체가 없어도 실행되기 때문에 내부의 인스턴스 필드나 인스턴스 메소드 사용 불가
- 객체 자신의 참조인 `this` 키워드 사용 불가

```java
public class ClassName {
  int field1;
  void method1() { ··· }

  static int field2;
  static void method2() { ··· }

  static {
    field1 = 10;      //컴파일 에러
    method1();        //컴파일 에러
    field2 = 10;
    method2();
  }

  static void method3() {
    this.field = 10;  //컴파일 에러
    this.method1();   //컴파일 에러
    field2 = 10;
    method2();
  }
}
```

- `main()` 메소드도 정적 메소드이므로 객체 생성 없이 인스턴스 필드와 메소드를 `main()` 메소드에서 바로 사용할 수 없음

<br>
<br>

## Singleton

- 전체 프로그램에서 단 하나만 있도록 보장된 객체
- 싱글톤을 만들려면 클래스 외부에서 `new` 연산자로 생성자를 호출할 수 없도록 막아야 함
  - 이를 위해 생성자 앞에 `private` 접근 제한자를 붙여줘야 함
  - 그리고 외부에서 호출할 수 있는 `getInstance()`를 선언하고 정적 필드에서 참조하고 있는 자신의 객체를 리턴
- 외부에서 객체를 얻는 유일한 방법은 `getInstance()` 메소드를 호출하는 방법 뿐
  - 몇 번을 호출해도 단 하나의 같은 객체를 리턴

```java
public class Singleton {
  private static Singleton singleton = new Singleton();

  private Singleton() {}

  static Singleton getInstance() {
    return singleton;
  }
}
```

```java
public class SingletonExample {
  public static void main(String[] args) {
    Singleton obj1 = new Singleton();           //컴파일 에러
    Singleton obj2 = Singleton.getInstance();
    Singleton obj3 = Singleton.getInstance();

    return obj2 == obj3;
  }
}

/*
true
*/
```

<br>
<br>

# final 필드와 상수

## final 필드

- final 필드는 초기값이 저장되면 그 값이 최종적인 값이 되어서 프로그램 실행 도중에 수정할 수 없음
- final 필드의 초기값을 줄 수 있는 2가지 방법 - 1. 필드 선언 시 주는 방법 / 2. 생성자에서 주는 방법
  - 단순 값이라면 필드 선언 시 주는 방법 이용
  - 복잡한 초기화 코드가 필요하거나 외부 데이터로 초기화해야 한다면 생성자에서 주는 방법 이용
- 생성자는 final 필드의 최종 초기화를 마쳐야 함
  - 초기화되지 않은 final 필드가 남아있을 경우 컴파일 에러 발생

```java
public class Person {
  final String nation = "Korea";
  final String ssn;
  String name;

  public Person(String ssn, String name) {
    this.ssn = ssn;
    this.name = name;
  }
}
```

<br>
<br>

## 상수 (static final)

- 불변의 값을 저장하는 필드를 Java에서는 상수(constant)라고 부름
- 그냥 final 필드는 객체마다 저장되고, 생성자의 매개값을 통해서 여러 가지 값을 가질 수 있기 때문에 상수가 될 수 없음
- 핵심은 객체마다 저장할 필요가 없는 **공용성** 을 띤다는 점
- 초기값이 단순 값이라면 선언 시에 주는 것이 일반적이지만, 복잡한 초기화일 경우 정적 블록에서도 초기화 가능

```java
static final 타입 상수;
static {
  상수 = 초기값;
}
```

- 상수 이름은 모두 대문자로 작성하는 것이 관례이고, 만약 서로 다른 단어가 혼합된 이름이라면 `_`로 단어를 연결해줌

```java
public class Earth {
  static final double EARTH_RADIUS = 6400;
  static final double EARTH_SURFACE_AREA;

  static {
    EARTH_SURFACE_AREA = 4 * Math.PI * EARTH_RADIUS * EARTH_RADIUS;
  }
}
```

```java
public class EarthExample {
  public static void main(String[] args) {
    System.out.println("지구의 반지름 : " + Earth.EARTH_RADIUS + " km");
    System.out.println("지구의 표면적 : " + Earth.EARTH_SURFACE_AREA + " km²");
  }
}
```

<br>
<br>

# package

- Java에서는 클래스를 체계적으로 관리하기 위해 패키지를 사용함
- 폴더를 만들어 파일을 저장 관리하듯이 패키지를 만들어 클래스를 저장 관리할 수 있게 해줌
- 패키지의 물리적 형태는 파일 시스템의 폴더
- 클래스의 일부분이며, 클래스를 유일하게 만들어주는 식별자 역할
  - 클래스 이름이 동일하더라도 패키지가 다르면 다른 클래스로 인식
- 클래스 전체 이름은 `상위패키지.하위패키지.클래스`로 표현됨
- 패키지 안에 클래스만 따로 복사해서 다른 곳으로 이동하면 클래스는 사용할 수 없게 됨
  - 클래스를 이동할 경우에는 패키지 전체를 이동시켜야 함

<br>
<br>

## 패키지 선언

```java
package 상위패키지.하위패키지;

public class ClassName { ··· }
```

- 패키지는 클래스를 컴파일하는 과정에서 자동으로 생성되는 폴더
  - 컴파일러는 클래스에 포함되어 있는 패키지 선언을 보고 파일 시스템의 폴더로 자동 생성시킴
- 패키지의 이름을 지을 때 지켜야 할 규칙들
  - 숫자로 시작해서는 안 되고, `_`와 `$`를 제외한 특수 문자를 사용해서는 안 됨
  - `java`로 시작하는 패키지는 Java 표준 API에서만 사용하므로 사용해서는 안 됨
  - 모두 소문자로 작성하는 것이 관례
- 여러 개발 회사가 함께 참여하는 대규모 프로젝트나, 다른 회사의 패키지를 이용해서 개발할 경우, 패키지 이름이 중복될 가능성이 있으므로 흔히 회사의 도메인 이름으로 패키지를 만듦
  - 도메인은 등록 기관에서 유일한 이름이 되도록 검증되었기 때문에
  - 도메인 이름으로 패키지 이름을 만들 경우, 도메인 역순으로 패키지 이름을 지어줌 (포괄적인 이름이 상위 패키지가 되도록 하기 위해서)
  - `com.samsung.projectname`
  - `com.lg.projectname`

<br>
<br>

## 패키지 선언이 포함된 클래스 파일

- 패키지 선언이 포함된 클래스를 명령 프롬프트에서 컴파일할 경우, 단순히 `javac ClassName.java`로 컴파일하면 패키지 폴더가 생성되지 않음
- 패키지 폴더가 자동으로 생성되려면 `javac` 명령어 다음에 `-d` 옵션을 추가하고 패키지가 생성될 경로를 지정해야 함

```bash
javac -d .            ClassName.java
javac -d ..\bin       ClassName.java
javac -d C:\temp\bin  ClassName.java
```

`ClassName.java`를 `C:\temp`에 저장했다면 cmd 창에서 C:\temp 폴더로 이동하여 java 명령어를 통해 실행할 수 있음

```bash
C:\temp> java com.example.ClassName
```

<br>
<br>

## import문

- 같은 패키지에 속하는 클래스들은 아무런 조건 없이 다른 클래스 사용 가능
- 다른 패키지에 속하는 클래스를 사용할 수 있게 해주는 첫 번째 방법 : **패키지와 클래스 모두 기술하기**
  - 패키지 이름이 길거나 이런 코드가 많아지면 전체 코드가 난잡해 보임
  - 서로 다른 패키지에 동일한 클래스 이름이 존재하고, 두 패키지 모두 import되어 있을 경우에는 패키지 이름 전체를 기술해야 함

```java
package com.mycompany;

public class Car {
  com.hankook.Tire tire = new com.hankook.Tire();
}
```

- 다른 패키지에 속하는 클래스를 사용할 수 있게 해주는 두 번째 방법 : **import문 사용하기**

```java
package com.mycompany;

import com.hankook.Tire;

public class Car {
  Tire tire = new Tire();
}
```

- import문의 위치는 패키지 선언과 클래스 선언 사이
- 패키지에 포함된 다수의 클래스를 사용해야 한다면 개별 클래스 이름 대신 `*` 사용
  - 주의할 점 : `*`로 지정한 패키지의 하위 패키지는 import 대상이 아니며, 하위 패키지의 클래스들도 사용하고 싶다면 import문을 하나 더 작성해야 함

```java
import com.mycompany.*;
import com.mycompany.project.*;
```

<br>
<br>

# 접근 제한자 (Access Modifier)

- `main()` 메소드를 가지지 않는 대부분의 클래스는 외부 클래스에서 이용할 목적으로 설계된 **라이브러리 클래스**
- 라이브러리 클래스를 설계할 때에는 외부 클래스에서 접근할 수 있는 멤버와 없는 멤버로 구분해서 필드, 생성자, 메소드를 설계하는 것이 바람직함
  - 객체 생성을 막기 위해 생성자를 호출하지 못하게 해야 할 때가 있음
  - 객체의 특정 데이터를 보호하기 위해 해당 필드에 접근하지 못하도록 막아야 할 때가 있음
  - 객체의 특정 메소드는 호출할 수 없도록 제한해야 할 때가 있음
- **public** : 외부 클래스가 자유롭게 사용할 수 있는 공개 멤버
- **protected** : 같은 패키지 또는 자식 클래스에서 사용할 수 있는 멤버
- **private** : 외부에 노출되지 않는 멤버
- **default** : 접근 제한자가 적용되지 않은 멤버이며, 같은 패키지에 소속된 클래스에서만 사용할 수 있는 멤버

| 접근 제한 |          적용 대상           | 접근할 수 없는 클래스                   |
| :-------: | :--------------------------: | :-------------------------------------- |
|  public   | 클래스, 필드, 생성자, 메소드 | 없음                                    |
| protected |     필드, 생성자, 메소드     | 자식 클래스가 아닌 다른 패키지의 클래스 |
|  default  | 클래스, 필드, 생성자, 메소드 | 다른 패키지의 클래스                    |
|  private  |     필드, 생성자, 메소드     | 모든 외부 클래스                        |

<br>
<br>

## 클래스의 접근 제한

- 클래스를 선언할 때 고려해야 할 사항은 같은 패키지 내에서만 사용할 것인지, 다른 패키지에서도 사용할 것인지
- 클래스에 적용할 수 있는 접근 제한은 `public`과 `default`

<br>
<br>

## 생성자의 접근 제한

- 생성자가 어떤 접근 제한을 갖느냐에 따라 호출 가능 여부가 결정됨
- `public` `protected` `default` `private` 모두 가질 수 있음
- 클래스에 생성자가 없을 때 자동으로 추가되는 기본 생성자의 접근 제한은 클래스의 접근 제한과 동일함
  - `public` 혹은 `default`

<br>
<br>

## 필드와 메소드의 접근 제한

- `public` `protected` `default` `private` 모두 가질 수 있음

<br>
<br>

# Getter와 Setter 메소드

- 객체 지향 프로그래밍에서 객체의 데이터는 외부에서 직접 접근할 경우 무결성이 깨질 수 있음
- 그러므로 객체 지향 프로그래밍에서는 외부에서 메소드를 통해 데이터를 변경하는 방법을 선호
- 메소드를 통해 값을 받아오고, 설정하기 위해서 `Getter`와 `Setter` 메소드 사용

```java
private 타입 fieldName;

public 리턴 타입 getFieldName() {
  return fieldName;
}

public void setFieldName(타입 fieldName) {
  this.fieldName = fieldName;
}
```

- 필드 타입이 boolean일 경우 Getter는 `get`이 아닌 `is`로 시작하는 것이 관례

```java
private boolean stop;

public boolean isStop() {
  return stop;
}

public void setStop(boolean stop) {
  this.stop = stop;
}
```

<br>
<br>

# Annotation

- Annotation은 metadata
  - 메타데이터란, 컴파일 과정과 실행 과정에서 코드를 어떻게 컴파일하고 처리할 것인지 알려주는 정보
- 사용 방법 : `@AnnotationName`
- 어노테이션의 3가지 용도
  - 컴파일러에게 코드 문법 에러를 체크하도록 정보 제공
  - 소프트웨어 개발 툴이 빌드나 배치 시 코드를 자동으로 생성할 수 있도록 정보 제공
  - 런타임 시 특정 기능을 실행하도록 정보 제공
- 대표적인 예는 `@Override`
  - 메소드가 재정의된 것임을 컴파일러에게 알려주어, 컴파일러가 오버라이드 검사를 하도록 해줌
    - 정확히 오버라이드되지 않았다면 컴파일 에러 발생
- 빌드 시 자동으로 XML 설정 파일을 생성하거나, 배포를 위해 JAR 압축 파일을 생성하는데에도 사용됨
- 런타임 시 클래스의 역할을 정의하기도 함

<br>
<br>

## 어노테이션 타입 정의와 적용

- 인터페이스를 정의하는 것과 유사함
- `@interface`를 사용해서 정의
- 엘리먼트의 타입으로는 기본 타입 데이터 타입이나 String, 열거 타입, Class 타입, 그리고 이들의 배열 타입 사용 가능
- 엘리먼트의 이름 뒤에는 메소드를 작성하는 것처럼 `()`를 붙여야 함
- 어노테이션은 기본 엘리먼트인 `value`를 가질 수 있음

```java
public @interface AnnotationName {
  String value();
  int elementName() default 5;
}
```

```java
@AnnotationName("값");
```

`default`를 통해 기본값이 정해진 경우 생략 가능하다.  
이 값은 기본 엘리먼트인 value 값으로 자동 설정된다.

```java
@AnnotationName(value="값", elementName=3);
```

<br>
<br>

## 어노테이션 적용 대상

- 어노테이션을 적용할 수 있는 대상은 `java.lang.annotation.ElementType` 열거 상수

| ElementType 열거 상수 |           적용 대상           |
| :-------------------: | :---------------------------: |
|         TYPE          | 클래스, 인터페이스, 열거 타입 |
|    ANNOTATION_TYPE    |          어노테이션           |
|         FIELD         |             필드              |
|      CONSTRUCTOR      |            생성자             |
|        METHOD         |            메소드             |
|    LOCAL_VARIABLE     |           로컬 변수           |
|        PACKAGE        |            패키지             |

- 어노테이션 적용 대상을 지정할 때에는 `@Target` 어노테이션 사용
  - `@Target`의 기본 엘리먼트인 `value`는 ElementType 배열을 값으로 가짐
    - 어노테이션이 적용될 대상을 복수 개로 지정하기 위해서

```java
@Target( {ElementType.TYPE, ElementType.FIELD, ElementType.METHOD} )
public @interface AnnotationName {}
```

```java
@AnnotationName
public class ClassName {
  @AnnotationName
  private String fieldName;

  /*  @Target에 Element.CONSTRUCTOR가 없기 때문에 사용 불가능
  @AnnotationName
  public ClassName() { }
  */

  @AnnotationName
  public void methodName() { }
}
```

<br>
<br>

## 어노테이션 유지 정책

- 어노테이션 정의 시 사용 용도에 따라 어노테이션을 어느 범위까지 유지할 것인지 추가로 지정해야 함
  - 소스 상에만 유지할 건지, 컴파일된 클래스까지 유지할 건지, 런타임 시에도 유지할 건지
- 어노테이션 유지 정책은 `java.lang.annotation.RetentionPolicy` 열거 상수로 이루어져 있음

| RetentionPolicy 열거 상수 | 설명                                                                                                                  |
| :-----------------------: | :-------------------------------------------------------------------------------------------------------------------- |
|          SOURCE           | 소스 상에서만 어노테이션 정보 유지<br>소스 코드 분석 때만 의미가 있고, 바이트 코드 파일에는 정보가 남지 않음          |
|           CLASS           | 바이트 코드 파일까지 어노테이션 정보 유지<br>리플렉션을 이용해서 어노테이션 정보를 얻을 수 없음                       |
|          RUNTIME          | 바이트 코드 파일까지 어노테이션 정보를 유지하면서<br>리플렉션을 이용해서 런타임 중에도 어노테이션 정보를 얻을 수 있음 |

- **Reflection** 이란 런타임 시에 클래스의 메타 정보를 얻는 기능을 뜻함
  - 클래스가 어떤 필드를 가지고 있는지, 어떤 생성자를 가지고 있는지, 어떤 메소드를 가지고 있는지, 적용된 어노테이션이 무엇인지
- 어노테이션 유지 정책을 지정할 때에는 `@Retention` 어노테이션 사용
  - `@Retention`의 기본 엘리먼트인 `value`는 RetentionPolicy 타입이므로 위의 3가지 상수 중 하나를 지정하면 됨
- 코드 자동 생성 툴을 개발하지 않는 이상 우리가 작성하는 어노테이션은 대부분 런타임 시점에서 사용하기 위한 용도로 만들어짐

```java
@Target( {ElementType.TYPE, ElementType.FIELD, ElementType.METHOD} )
@Retention(RetentionPolicy.RUNTIME)
public @interface AnnotationName {}
```

<br>
<br>

## 런타임 시 어노테이션 정보 사용하기

- 어노테이션 자체는 아무런 동작을 가지지 않는 표식일 뿐이지만, 리플렉션을 이용해서 어노테이션의 적용 여부 및 엘리먼트 값을 읽고 적절히 처리할 수 있음
- 클래스에 적용된 어노테이션 정보를 얻으려면 `java.lang.Class` 이용
- 필드, 생성자, 메소드에 적용된 어노테이션 정보를 얻으려면 아래에 있는 Class의 메소드를 통해서 `java.lang.reflect` 패키지의 Field, Constructor, Method 타입의 배열을 얻어야 함

|   리턴 타입   |        메소드        | 설명                                  |
| :-----------: | :------------------: | :------------------------------------ |
|    Field[]    |     getFields()      | Field 정보를 Field 배열로 리턴        |
| Constructor[] |  getConstructors()   | 생성자 정보를 Constructor 배열로 리턴 |
|   Method[]    | getDeclaredMethods() | Method 정보를 Method 배열로 리턴      |

- Field, Constructor, Method 타입의 배열을 얻은 이후 이들이 가지고 있는 메소드를 호출해서 적용된 어노테이션 정보를 얻을 수 있음

|  리턴 타입   |                              메소드                              | 설명                                                                                                                                                   |
| :----------: | :--------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
|   boolean    | isAnnotationPresent(Class<? extends Annotation> annotationClass) | 지정한 어노테이션이 적용되었는지 여부<br>Class에서 호출했을 때 상위 클래스에 적용된 경우에도 `true` 반환                                               |
|  Annotation  |             getAnnotation(Class\<T> annotationClass)             | 지정한 어노테이션이 적용되어 있으면 어노테이션 반환<br>그렇지 않다면 null 반환<br>Class에서 호출했을 때 상위 클래스에 적용된 경우에도 어노테이션 반환  |
| Annotation[] |                         getAnnotations()                         | 적용된 모든 어노테이션 반환<br>적용된 어노테이션이 없을 경우 길이가 0인 배열 반환<br>Class에서 호출했을 때 상위 클래스에 적용된 어노테이션도 모두 포함 |
| Annotation[] |                     getDeclaredAnnotations()                     | 직접 적용된 모든 어노테이션 반환<br>Class에서 호출했을 때 상위 클래스에 적용된 어노테이션은 포함되지 않음                                              |

```java
@Target( {ElementType.METHOD} )
@Retention(RetentionPolicy.RUNTIME)
public @interface PrintAnnotation {
  String value() default "-";
  int number() default 15;
}
```

```java
public class Service {
  @PrintAnnotation
  public void method1() {
    System.out.println("실행 내용 1");
  }

  @PrintAnnotation("*")
  public void method2() {
    System.out.println("실행 내용 2");
  }

  @PrintAnnotation(value="#", number=20)
  public void method3() {
    System.out.println("실행 내용 3");
  }
}
```

```java
public class PrintAnnotationExample {
  public static void main(String[] args) {
    //Service 클래스로부터 메소드 정보 획득
    Method[] declaredMethods = Service.class.getDeclaredMethods();

    //Method 객체 하나씩 처리
    for(Method method : declaredMethods) {
      //PrintAnnotation 적용 여부 확인
      if(method.isAnnotationPresent(PrintAnnotation.class)) {
        //PrintAnnotation 객체 얻기
        PrintAnnotation printAnnotation = method.getAnnotation(PrintAnnotation.class);

        //메소드 이름 출력
        System.out.println("[" + method.getName() + "]");

        //구분선 출력
        for(int i = 0; i < printAnnotation.number(); i++) {
          System.out.print(printAnnotation.value());
        }
        System.out.println();

        try {
          //Service 객체를 생성하고 생성된 Service 객체의 메소드 호출
          method.invoke(new Service());
        } catch(Exception e) {
          System.out.println("Exception : " + e);
        }
        System.out.println();
      }
    }
  }
}

/*
[method1]
---------------
실행 내용 1

[method2]
***************
실행 내용 2

[method3]
####################
실행 내용 3
*/
```
