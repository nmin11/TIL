# 상속 개념

- 객체 지향 프로그램에서 상속은 부모 클래스의 멤버를 자식 클래스에게 물려주는 것
- 부모 클래스를 상위 클래스라 부르기도 하며, 자식 클래스를 하위 클래스, 또는 파생 클래스라 부르기도 함
- 이미 잘 개발된 클래스를 재사용해서 새로운 클래스를 만들 수 있게 해주기 때문에 코드의 중복을 줄여줌
- 부모 클래스에서 `private` 접근 제한을 갖는 필드와 메소드는 상속 대상에서 제외
  - 마찬가지로 `default` 접근 제한을 갖는 필드와 메소드는 부모 · 자식 클래스가 서로 다른 패키지에 있다면 상속 대상에서 제외
- 부모 클래스의 수정으로 모든 자식 클래스들의 수정 효과를 가져오기 때문에 유지 보수 최소화

<br>
<br>

# 클래스 상속

```java
class 자식클래스 extends 부모클래스 {
    //필드
    //생성자
    //메소드
}
```

- 프로그램에선 자식이 부모를 선택
  - 자식 클래스를 선언할 때 어떤 부모 클래스를 상속받을 것인지 결정하고, 선택된 부모 클래스는 위와 같이 `extends` 뒤에 기술
- 다른 언어와 달리 Java는 다중 상속을 허용하지 않음

<br>
<br>

# 부모 생성자 호출

- 자식 객체를 생성하면 부모 객체가 먼저 생성되고 자식 객체가 그 다음에 생성됨
- 모든 객체는 클래스의 생성자를 호출해야만 생성되는데, 그렇다면 부모 객체를 생성하기 위한 부모 생성자를 어디서 호출한 것인가?
  - 비밀은 자식 생성자에 숨어 있음
  - 부모 생성자는 자식 생성자의 맨 첫 줄에서 호출됨
  - 생성자가 명시적으로 선언되지 않았더라도 컴파일러는 기본 생성자를 생성함

```java
public Child() {
    super();
}
```

`super()`는 부모의 기본 생성자를 호출한다.  
즉, 다음 코드와도 같다고 볼 수 있다.

```java
public Parent() {}
```

- 생성자를 명시적으로 선언할 때, `super()`의 괄호 안에 매개 변수들을 넣어서, 해당 매개 변수의 타입들과 맞는 부모 생성자를 지정해서 호출할 수도 있음
  - 만약 이 때 매개 변수들의 타입들과 일치하는 부모 생성자가 없을 경우 컴파일 오류 발생
- `super()`를 생략했을 경우, 컴파일러가 자동 생성하기 위해 부모 클래스에 기본 생성자가 있어야만 하는데, `super()`를 생략함과 동시에 부모 클래스에서는 타입을 직접 명시한 생성자만 있다면 자식 생성자에서 반드시 `super(매개값들)`를 명시적으로 호출해야 함
  - 또한, `super(매개값들)`는 반드시 자식 생성자 첫 줄에 위치해야만 함

```java
public class People {
    public String name;
    public String ssn;

    public People(String name, String ssn) {
        this.name = name;
        this.ssn = ssn;
    }
}
```

`People` 클래스는 기본 생성자가 없고 매개 변수를 갖는 생성자만 있기 떄문에 자식 클래스는 `super(name, ssn)`를 활용해서 `People` 클래스의 생성자를 호출해야 한다.

```java
public class Student extends People {
    public int studentNo;

    public Student(String name, String ssn, int studentNo) {
        super(name, ssn);
        this.studentNo = studentNo;
    }
}
```

만약 `super(name, ssn)` 부분을 주석 처리하고 실행하면 `Implicit super constructor People() is undefined. Must explicitly invoke another constructor` 라는 컴파일 오류가 발생한다.

<br>
<br>

# 메소드 재정의

- 부모 클래스의 특정 메소드는 자식 클래스가 사용하기에 적합하지 않을 수 있음
- Java는 상속된 일부 메소드를 자식 클래스에서 다시 수정해서 사용할 수 있도록 **Overriding** 기능 제공

<br>
<br>

## 메소드 재정의 (@Override)

- 메소드 오버라이딩은 상속된 메소드의 내용이 자식 클래스에 맞지 않을 경우, 자식 클래스에서 동일한 메소드를 재정의하는 것
- 메소드가 오버라이딩되었다면 부모 객체의 메소드는 숨겨짐
  - 자식 객체를 통해 해당 메소드를 호출하면 오버라이딩된 자식 메소드가 호출됨
- 메소드 오버라이딩 규칙
  - 부모의 메소드와 동일한 시그니처(리턴 타입, 메소드 이름, 매개 변수 리스트)를 가져야 함
  - 접근 제한을 더 강하게 오버라이딩할 수 없음
    - 만약 부모 메소드가 `public` 접근 제한을 가지고 있다면 오버라이딩하는 자식 메소드는 `default`나 `private` 접근 제한을 가질 수 없음
    - 만약 부모 메소드가 `default` 접근 제한을 가지고 있다면 오버라이딩하는 자식 메소드는 `default`나 `public` 접근 제한을 가질 수 있음
  - 새로운 `Exception`을 `throw`할 수 없음
- `@Override` 어노테이션은 생략할 수 있지만 이 어노테이션이 있으면 컴파일러는 메소드가 정확히 오버라이딩되었는지 체크해줌

```java
public class Calculator {
  double areaCircle(double r) {
    return 3.141592 * r * r;
  }
}
```

```java
public class Computer extends Calculator {
  @Override
  double areaCircle(double r) {
    return Math.PI * r * r;
  }
}
```

<br>
<br>

## 부모 메소드 호출 (super)

- 오버라이딩 이후에도 부모 클래스의 원본 메소드를 사용하고 싶다면 `super` 키워드 사용

```java
public class Airplane {
  public void land() {
    System.out.println("착륙합니다.");
  }

  public void fly() {
    System.out.println("일반 비행합니다.");
  }

  public void takeOff() {
    System.out.println("이륙합니다.");
  }
}
```

```java
public class SupersonicAirplane extends Airplane {
  public static final int NORMAL = 1;
  public static final int SUPERSONIC = 2;

  public int flyMode = NORMAL;

  @Override
  public void fly() {
    if(flyMode == SUPERSONIC) {
      System.out.println("초음속 비행합니다.");
    } else {
      super.fly();
    }
  }
}
```

<br>
<br>

# final 클래스와 final 메소드

- final 필드는 초기값 설정 후 더 이상 값을 변경할 수 없다는 사실을 이미 학습했음
- final 클래스와 final 메소드는 상속과 관련되어 있음

<br>
<br>

## 상속할 수 없는 final 클래스

- final 클래스는 부모 클래스가 될 수 없어서 자식 클래스를 만들 수 없음
- 대표적인 예는 Java 표준 API에서 제공하는 `String` 클래스

<br>
<br>

## 오버라이딩할 수 없는 final 메소드

- 부모 클래스의 final 메소드는 자식 클래스에서 오버라이딩을 통한 재정의를 할 수 없음

<br>
<br>

# protected 접근 제한자

- `public`과 `default` 접근 제한의 중간쯤에 해당
- 같은 패키지에서는 `default`와 같이 접근 제한이 없고, 다른 패키지에서는 자식 클래스만 접근 허용
- 필드, 생성자, 메소드 선언에 사용 가능

<br>
<br>

# 타입 변환과 다형성

- 다형성은 같은 타입이지만 실행 결과가 다양한 객체를 이용할 수 있는 성질
  - 하나의 타입에 여러 객체를 대입함으로써 다양한 기능을 이용할 수 있도록 해줌
- 다형성을 위해 Java는 부모 클래스로 타입 변환을 허용함
  - 부모 타입에 모든 자식 객체가 대입될 수 있음
  - **객체의 부품화**

```java
public class Car {
  Tire t1 = new HankookTire();
  Tire t2 = new KumhoTire();
}
```

자식 타입은 부모 타입으로 자동 타입 변환된다.

<br>
<br>

## 자동 타입 변환 (Promotion)

- 자동 타입 변환 조건 : `부모클래스 변수 = 자식클래스타입;`
- 자동 타입 변환 개념 : 자식은 부모의 특징과 기능을 상속받기 때문에 부모와 동일하게 취급될 수 있음
- 상속 관계가 있을 때만 가능함

```java
Cat cat = new Cat();
Animal animal = cat;

cat == animal   //true
```

`animal` 변수는 `cat` 변수와 동일한 `Cat` 객체를 참조한다.

- 부모 타입으로 자동 타입 변환된 이후에는 부모 클래스에 선언된 필드와 메소드만 접근 가능
  - 변수는 자식 객체를 참조하지만 변수로 접근 가능한 멤버는 부모 클래스 멤버로만 한정됨
  - 그러나 예외적으로 메소드가 자식 클래스에서 오버라이딩되었다면 자식 클래스의 메소드가 대신 호출됨
    - 이는 다형성과 관련이 있는 매우 중요한 성질

```java
public class Parent {
  public void method1() {
    System.out.println("Parent-method1");
  }

  public void method2() {
    System.out.println("Parent-method2");
  }
}
```

```java
public class Child extends Parent {
  @Override
  public void method2() {
    System.out.println("Child-method2");
  }

  public void method3() {
    System.out.println("Child-method3");
  }
}
```

```java
public class ChildExample {
  public static void main(String[] args) {
    Child child = new Child();
    Parent parent = child;  //자동 타입 변환

    parent.method1();
    parent.method2();   //재정의된 메소드 호출
    parent.method3();   //호출 불가능
  }
}

/*
Parent-method1
Child-method2
*/
```

<br>
<br>

## 필드의 다형성

- 그냥 자식 타입으로 사용하면 될 것을 부모 타입으로 변환해서 사용하는 이유 : 다형성을 구현하는 기술적 방법 때문
- 다형성은 주로 필드의 값을 다양화함으로써 실행 결과가 다르게 나오도록 구현
- 필드의 타입은 변함이 없지만 실행 도중 어떤 객체를 필드로 저장하느냐에 따라 실행 결과가 달라질 수 있게 하는 것이 다형성

<br>
<br>

## 하나의 배열로 객체 관리

```java
class Car {
  Tire frontLeftTire = new Tire("앞왼쪽", 6);
  Tire frontRightTire = new Tire("앞오른쪽", 2);
  Tire backLeftTire = new Tire("뒤왼쪽", 6);
  Tire backRightTire = new Tire("뒤오른쪽", 6);
}
```

이 코드를 보다 깔끔하게 만들기 위해서 배열을 사용해줄 수 있다.

```java
class Car {
  Tire[] tires = {
    new Tire("앞왼쪽", 6),
    new Tire("앞오른쪽", 2),
    new Tire("뒤왼쪽", 3),
    new Tire("뒤오른쪽", 4)
  };
}
```

tires 배열의 각 항목에도 자식 객체를 대입하여 자동 타입 변환이 발생하게 할 수 있다.

```java
tires[1] = new KumhoTire("앞오른쪽", 13);
```

<br>
<br>

## 매개 변수의 다형성

- 자동 타입 변환은 필드의 값을 대입할 때에도 발생하지만, 메소드를 호출할 때 주로 발생함
- 메소드의 매개 변수의 타입이 클래스일 경우, 해당 클래스의 객체뿐만 아니라 자식 객체까지도 매개값으로 사용할 수 있음
- 매개값으로 어떤 자식 객체가 제공되느냐에 따라 메소드의 실행 결과는 다양해질 수 있음 (매개 변수의 다형성)
- 자식 객체가 메소드를 재정의했다면 메소드 내부에서 오버라이딩된 메소드를 호출함

```java
public class Vehicle {
  public void run() {
    System.out.println("차량이 달립니다.");
  }
}
```

```java
public class Driver {
  public void drive(Vehicle vehicle) {
    vehicle.run();
  }
}
```

```java
public class Bus extends Vehicle {
  @Override
  public void run() {
    System.out.println("버스가 달립니다.");
  }
}
```

```java
public class Taxi extends Vehicle {
  @Override
  public void run() {
    System.out.println("택시가 달립니다.");
  }
}
```

```java
public class DriverExample {
  public static void main(String[] args) {
    Driver driver = new Driver();
    Bus bus = new Bus();
    Taxi taxi = new Taxi();

    driver.drive(bus);
    driver.drive(taxi);
  }
}

/*
버스가 달립니다.
택시가 달립니다.
*/
```

<br>
<br>

## 강제 타입 변환 (Casting)

- 강제 타입 변환 사용 방법 : `자식클래스 변수 = (자식클래스) 부모클래스타입`
- 부모 타입을 자식 타입으로 변환하는 것을 뜻함
- 모든 부모 타입을 자식 타입으로 강제 변환할 수는 없음
  - 자식 타입이 부모 타입으로 자동 변환한 후, 다시 자식 타입으로 변환할 때 강제 타입 변환 사용 가능
- 부모 타입으로 자동 타입 변환 시, 부모 타입에 선언된 필드와 메소드만 사용 가능
  - 만약 자식 타입에 선언된 필드와 메소드를 꼭 사용해야 한다면 강제 타입 변환 이후에 사용해야 함

```java
public class Parent {
  public String field1;

  public void method1() {
    System.out.println("Parent-method1");
  }

  public void method2() {
    System.out.println("Parent-method2");
  }
}
```

```java
public class Child extends Parent {
  public String field2;

  public void method3() {
    System.out.println("Child-method3");
  }
}
```

```java
public class ChildExample {
  public static void main(String[] args) {
    Parent parent = new Child();
    parent.field1 = "data1";
    parent.method1();
    parent.method2();

    /*
    parent.field2 = "data2";  //필드 사용 불가능
    parent.method3();         //메소드 호출 불가능
    */

    Child child = (Child) parent;
    child.field2 = "로코";
    child.method3();
  }
}

/*
Parent-method1
Parent-method2
Child-method3
*/
```

<br>
<br>

## 객체 타입 확인 (instanceof)

- 객체가 어떤 클래스의 인스턴스인지 확인하기 위해 `instanceof` 연산자 사용 가능
- `instanceof` 사용 방법 : `boolean result = 객체 instanceof 타입`

```java
public class InstanceofExample {
  public static void method(Parent parent) {
    if(parent instanceof Child) {
      Child child = (Child) parent;
      System.out.println("Child 변환 성공");
    } else {
      System.out.println("Child 변환 실패");
    }
  }

  public static void main(String[] args) {
    Parent parentA = new Child();
    method(parentA);

    Parent parentB = new Parent();
    method(parentB);
  }
}

/*
Child 변환 성공
Child 변환 실패
*/
```

만약에 `instanceof`가 있는 if-else문을 작성하지 않았다면 `ClassCastException`이 발생하고 프로그램이 종료된다.  
그러므로 강제 타입 변환을 하기 전에는 `instanceof` 연산자로 변환시킬 타입의 객체인지 조사해서 잘못된 매개값으로 인해 프로그램이 종료되는 것을 막아야 한다.

<br>
<br>

# 추상 클래스

## 추상 클래스의 개념

- 사전적 의미로 추상(abstract)은 '실체 간에 공통되는 특성을 추출한 것'
- 실체 클래스 : 객체를 직접 생성할 수 있는 클래스
- 추상 클래스 : 실체 클래스들의 공통적인 특성을 추출해서 선언한 클래스
- 추상 클래스와 실체 클래스는 추상 클래스가 부모이고 실체 클래스가 자식인 상속 관계를 가짐
- 추상 클래스는 실체 클래스의 공통되는 필드와 메소드를 추출해서 만들기 때문에 객체를 직접 생성해서 사용할 수 없음

<br>
<br>

## 추상 클래스의 용도

### 1. 실체 클래스들의 공통된 필드와 메소드의 이름을 통일할 목적

- 실체 클래스를 설계하는 사람이 여럿일 경우, 실체 클래스마다 필드와 메소드를 제각기 다른 이름으로 짓게 될 우려가 있음
- 실체 클래스가 상속 받는 추상 클래스를 만들어서 필드와 메소드를 미리 정의해두면 필드와 메소드의 이름을 통일시킬 수 있음

<br>

### 2. 실체 클래스를 작성할 때 시간을 절약

- 개발 프로젝트에서 설계자와 코더는 일반적으로 다른 사람이므로, 설계자는 코더에게 클래스가 어떤 구조로 작성되어야 하는지 알려줄 필요가 있음
- 추상 클래스는 '설계 규격'이 되어줌

<br>
<br>

## 추상 클래스 선언

```java
public abstract class Sample {
  //필드
  //생성자
  //메소드
}
```

- `abstract` 키워드를 사용해서 선언
- 일반 클래스와 마찬가지로 필드, 생성자, 메소드 선언을 할 수 있음
  - `new` 연산자로 직접 생성자를 호출할 수는 없지만 자식 객체가 생성될 때 `super()`를 호출해서 추상 클래스 객체를 생성하므로 생성자가 반드시 있어야 함

```java
public abstract class Phone {
  public String owner;

  public Phone(String owner) {
    this.owner = owner;
  }
}
```

```java
public class SmartPhone extends Phone {
  public SmartPhone(String owner) {
    super(owner);
  }
}
```

<br>
<br>

## 추상 메소드와 오버라이딩

- 메소드의 선언만 통일화하고 실행 내용은 실체 클래스마다 달라야 하는 경우, 추상 클래스는 추상 메소드를 선언할 수 있음

<br>

### 추상 메소드

- 추상 클래스에서만 선언 가능
- 메소드의 선언부만 있고 메소드 실행 내용인 `{}`가 없음
- 하위 클래스는 반드시 해당 메소드를 재정의해서 실행 내용을 채워야 함

```java
public abstract class Animal {
  public abstract void sound();
}
```
