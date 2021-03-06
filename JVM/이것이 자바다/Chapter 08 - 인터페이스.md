# 인터페이스의 역할

- Java에서 인터페이스는 객체의 사용 방법을 정의한 타입
- 인터페이스는 객체의 교환성을 높여주기 때문에 다형성을 구현하는 매우 중요한 역할을 수행함
- 특히 Java 8에서는 람다식이 함수적 인터페이스의 구현 객체를 생성하기 때문에 인터페이스의 중요성이 더욱 커졌음
- 인터페이스는 개발 코드와 객체가 서로 통신하는 접점 역할을 수행함
  - 개발 코드가 인터페이스의 메소드를 호출하면 인터페이스는 객체의 메소드를 호출
  - 그렇기 때문에 개발 코드는 객체 내부 구조를 알 필요가 없고 인터페이스의 메소드만 알고 있으면 됨
- ⭐ 개발 코드가 직접 메소드를 호출하지 않고, 중간에 있는 인터페이스를 거쳐야 하는 이유
  - 개발 코드를 수정하지 않고 사용하는 객체를 변경할 수 있도록 하기 위해서
  - 인터페이스는 여러 개의 객체들을 사용할 수 있으므로, 어떤 객체를 사용하느냐에 따라 실행 내용과 리턴 값이 다양해질 수 있음

<br>
<br>

# 인터페이스 선언

- `.java` 형태의 소스 파일로 작성되고 컴파일러 `javac.exe`를 통해 `.class` 형태로 컴파일됨
  - 물리적인 형태는 클래스와 동일
  - 차이점은 소스를 작성할 때 선언하는 방법

<br>
<br>

## 인터페이스 선언 방법

- `class` 키워드 대신에 `interface` 키워드 사용
- 인터페이스의 이름 작성 방법은 클래스의 방법과 동일
  - 영어 대소문자를 구분하며, 첫 문자를 대문자로 하고 나머지는 소문자로 하는 것이 관례
- 클래스는 필드, 생성자, 메소드를 구성 멤버로 가지지만, 인터페이스는 **상수** 와 **메소드** 만을 구성 멤버로 가짐
- 인터페이스는 객체로 생성할 수 없기 때문에 생성자를 가질 수 없음
- Java 8 이전에는 메소드를 추상 메소드로만 선언 가능했지만, Java 8부터는 디폴트 메소드와 정적 메소드도 선언 가능해짐

```java
interface 인터페이스명 {
  타입 상수명 = 값;

  타입 메소드명(매개변수);
  default 타입 메소드명(매개변수) { ··· }
  static 타입 메소드명(매개변수) { ··· }
}
```

<br>

### Constant Field

- 인터페이스는 객체 사용 설명서이므로 런타임 시 데이터를 저장할 수 있는 필드를 선언할 수 없음
- 그러나 상수 필드는 선언 가능
  - 상수 선언 시 반드시 초기값을 대입해야 함

<br>

### Abstract Method

- 객체가 가지고 있는 메소드를 설명해줌
  - 호출할 때 어떤 매개값이 필요하고, 리턴 타입이 무엇인지만
- 실제 실행부는 구현 객체가 가지고 있음

<br>

### Default Method

- 인터페이스에 선언되지만 사실은 구현 객체가 가지고 있는 인스턴스 메소드
- Java 8에서 디폴트 메소드가 허용된 이유는 기존 인터페이스를 확장해서 새로운 기능을 추가하기 위함

<br>

### Static Method

- 역시 Java 8부터 작성 가능
- 디폴트 메소드와는 다르게, 객체 없이 인터페이스만으로 호출 가능

<br>
<br>

## 상수 필드 선언

- `public static final`로 선언 가능
  - 생략하더라도 컴파일 과정에서 자동으로 붙게 됨
- 상수명은 대문자로 작성하되, 서로 다른 단어로 구성되어 있을 경우 `_`로 연결하는 것이 관례
- `static {}` 블록으로 초기화할 수 없기 때문에 반드시 선언과 동시에 초기값을 지정해야 함

<br>
<br>

## 추상 메소드 선언

- 인터페이스를 통해 호출된 메소드는 최종적으로 객체에서 실행되므로, 인터페이스의 메소드는 실행 블록이 없는 추상 메소드로 선언
- 추상 메소드에는 리턴 타입, 메소드명, 매개 변수만 기술되고 `{}`는 붙이지 않음
- 인터페이스에 선언된 추상 메소드는 모두 `public abstract`의 특성을 가짐
  - 생략하더라도 컴파일 과정에서 자동으로 붙게 됨

<br>
<br>

## 디폴트 메소드 선언

- Java 8에서 추가된 새로운 인터페이스 멤버
- 클래스의 인스턴스 메소드와 동일한 형태
- `default` 키워드가 붙음
- `public` 특성을 가짐
  - 생략하더라도 컴파일 과정에서 자동으로 붙게 됨

<br>
<br>

## 정적 메소드 선언

- Java 8에서 추가된 새로운 인터페이스 멤버
- 클래스의 정적 메소드와 완전히 동일한 형태
- `public` 특성을 가짐
  - 생략하더라도 컴파일 과정에서 자동으로 붙게 됨

```java
public interface RemoteControl {
  //상수
  int MAX_VOLUME = 10;
  int MIN_VOLUME = 0;

  //추상 메소드
  void turnOn();
  void turnOff();
  void setVolume(int volume);

  //디폴트 메소드
  default void setMute(boolean mute) {
    if(mute) { System.out.println("무음 처리합니다."); }
    else { System.out.println("무음 해제합니다."); }
  }

  //정적 메소드
  static void changeBattery() { System.out.println("건전지를 교환합니다."); }
}
```

<br>
<br>

# 인터페이스 구현

- 개발 코드가 인터페이스 메소드를 호출하면 인터페이스는 객체의 메소드를 호출
- 그러므로 객체는 인터페이스에서 정의된 추상 메소드와 동일한 메소드 이름, 매개 타입, 리턴 타입을 가진 실체 메소드를 가지고 있어야 함
- 이러한 객체를 인터페이스의 구현(implement) 객체라고 하며, 구현 객체를 생성하는 클래스를 구현 클래스라고 함

<br>
<br>

## 구현 클래스

```java
public class 구현클래스명 implements 인터페이스명 { ··· }
```

- 인터페이스 타입으로 사용할 수 있음을 알려주기 위해 클래스 선언부에 `implements` 키워드를 추가하고 인터페이스명을 명시해야 함
- `{}` 안에 인터페이스에 선언된 추상 메소드의 실체 메소드를 선언해야 함
- ⭐ 주의할 점 : 인터페이스의 모든 메소드는 기본적으로 `public` 접근 제한을 갖기 때문에 `public` 보다 낮은 접근 제한으로 작성할 수 없음
  - `public` 생략 시, `Cannot reduce the visibility of the inherited method` 라는 컴파일 에러 발생
- 인터페이스의 추상 메소드에 대응하는 구현 클래스의 실체 메소드가 작성되지 않았을 경우, 구현 클래스는 자동적으로 추상 클래스가 됨

```java
public class Television implements RemoteControl {
  private int volume;

  public void turnOn() { System.out.println("TV를 켭니다."); }
  public void turnOff() { System.out.println("TV를 끕니다."); }
  public void setVolume(int volume) {
    if(volume > RemoteControl.MAX_VOLUME) {
      this.volume = RemoteControl.MAX_VOLUME;
    } else if(volume < RemoteControl.MIN_VOLUME) {
      this.volume = RemoteControl.MIN_VOLUME;
    } else {
      this.volume = volume;
    }
    System.out.println("현재 TV 볼륨 : " + this.volume);
  }
}
```

```java
public class Audio implements RemoteControl {
  private int volume;

  public void turnOn() { System.out.println("Audio를 켭니다."); }
  public void turnOff() { System.out.println("Audio를 끕니다."); }
  public void setVolume(int volume) {
    if(volume > RemoteControl.MAX_VOLUME) {
      this.volume = RemoteControl.MAX_VOLUME;
    } else if(volume < RemoteControl.MIN_VOLUME) {
      this.volume = RemoteControl.MIN_VOLUME;
    } else {
      this.volume = volume;
    }
    System.out.println("현재 Audio 볼륨 : " + this.volume);
  }
}
```

- 인터페이스로 구현 객체를 사용하려면 인터페이스 변수를 선언하고 구현 객체를 대입해야 함

```java
public class RemoteControlExample {
  public static void main(String[] args) {
    RemoteControl rc;
    rc = new Television();
    rc = new Audio();
  }
}
```

<br>
<br>

## 익명 구현 객체

```java
인터페이스 변수 = new 인터페이스() {
  //인터페이스에 선언된 추상 메소드에 대응하는 실체 메소드 작성
};
```

- 구현 클래스를 만들어 사용하는 방법은 일반적이며 클래스를 재사용할 수 있기 때문에 편리함
- 하지만 일회성의 구현 객체를 만들기 위해 소스 파일을 만들고 클래스를 선언하는 것은 비효율적
- Java는 소스 파일을 만들지 않고도 구현 객체를 만들 수 있는 방법을 제공하는데, 이를 **익명 구현 객체** 라고 함
- Java는 UI 프로그래밍에서 이벤트를 처리하기 위해, 임시 작업 쓰레드를 만들기 위해 익명 구현 객체를 많이 활용함
- 하나의 실행문이므로 끝에는 반드시 `;`을 붙여야 함
- `{}` 안에는 인터페이스에 선언된 모든 추상 메소드들의 실체 메소드를 작성해야 함
- 필드와 메소드를 선언할 수 있지만, 익명 객체 안에서만 사용할 수 있고 인터페이스 변수로 접근할 수 없음

```java
public class RemoteControlExample {
  public static void main(String[] args) {
    RemoteControl rc = new RemoteControl() {
      public void turnOn() { /*실행문*/ }
      public void turnOff() { /*실행문*/ }
      public void setVolume(int volume) { /*실행문*/ }
    };
  }
}
```

모든 객체는 클래스로부터 생성되는데, 익명 구현 객체도 예외는 아니다.  
`RemoteControlExample.java`를 컴파일하면 `RemoteControlExample$1.class`라는 파일이 만들어진다.  
만약 두 번째 익명 구현 객체를 만들었다면 `RemoteControlExample$2.class`라는 파일이 만들어진다.

<br>
<br>

## 다중 인터페이스 구현 클래스

```java
public class 구현클래스명 implements 인터페이스A, 인터페이스B {
  //인터페이스 A의 실체 메소드 선언
  //인터페이스 B의 실체 메소드 선언
}
```

- 모든 인터페이스의 추상 메소드에 대한 실체 메소드를 구현해야 하며, 하나라도 없을 경우 추상 클래스로 선언해야 함

<br>
<br>

# 인터페이스 사용

- 인터페이스의 구현 객체 사용 방법 : `인터페이스 변수 = 구현객체;`
- 인터페이스는 클래스의 필드, 그리고 생성자 또는 메소드의 매개 변수 및 로컬 변수로 선언될 수 있음

<br>
<br>

## 추상 메소드 사용

- 구현 객체가 인터페이스 타입에 대입되면 인터페이스에 선언된 추상 메소드를 호출할 수 있음

```java
public class RemoteControlExample {
  public static void main(String[] args) {
    RemoteControl rc = null;

    rc = new Television();
    rc.turnOn();
    rc.turnOff();

    rc = new Audio();
    rc.turnOn();
    rc.turnOff();
  }
}

/*
TV를 켭니다.
TV를 끕니다.
Audio를 켭니다.
Audio를 끕니다.
*/
```

<br>
<br>

## 디폴트 메소드 사용

- 디폴트 메소드는 인터페이스에 실행문까지 함께 선언되지만, 인터페이스에서 바로 사용할 수 없음
- 디폴트 메소드는 추상 메소드가 아닌 인스턴스 메소드이므로 구현 객체가 있어야 함
- 디폴트 메소드는 인터페이스의 모든 구현 객체가 가지고 있는 **기본 메소드**
  - 디폴트 메소드를 재정의(오버라이딩)하는 것도 가능함

※ `setMute(boolean mute)`라는 디폴트 메소드를 아래와 같은 방식으로는 호출할 수 없다.

```java
RemoteControl.setMute(true);
```

반드시 구현 객체를 인터페이스 변수에 대입한 이후에 디폴트 메소드를 호출해야 한다.

```java
RemoteControl rc = new Television();
rc.setMute(true);
```

<br>
<br>

## 정적 메소드 사용

- 인터페이스로 바로 호출 가능

```java
RemoteConrol.changeBattery();
```

<br>
<br>

# 타입 변환과 다형성

- 상속과 마찬가지로 인터페이스도 다형성을 구현하는 기술이 사용됨
  - 상속 : 같은 종류의 하위 클래스를 만드는 기술
  - 인터페이스 : 사용 방법이 동일한 클래스를 만드는 기술
- 오히려 요즘은 상속보다는 인터페이스를 통해서 다형성을 구현하는 경우가 더 많음
  - 프로그램 소스 코드의 변경 없이 구현 객체만 교체함으로써 매우 손쉽고 빠르게 다형성을 적용할 수 있음
- 인터페이스는 메소드의 매개 변수로 많이 등장함
  - 메소드 호출 시 매개값으로 여러 가지 종류의 구현 객체를 줄 수 있기 때문에 메소드 실행 결과가 다양하게 나올 수 있음

```java
public void useRemoteControl(RemoteControl rc) { ··· }
```

매개값을 `Television` 객체 또는 `Audio` 객체 중에서 선택적으로 줄 수 있다.

<br>
<br>

## 자동 타입 변환 (Promotion)

- `인터페이스 변수 = 구현객체;`
- 인터페이스 구현 클래스를 상속해서 자식 클래스를 만들었다면 자식 객체 역시 인터페이스 타입으로 자동 타입 변환시킬 수 있음

<br>
<br>

## 필드의 다형성

```java
public interface Tire {
  public void roll();
}
```

```java
public class HankookTire implements Tire {
  @Override
  public void roll() { System.out.println("한국 타이어가 굴러갑니다.") }
}
```

```java
public class KumhoTire implements Tire {
  @Override
  public void roll() { System.out.println("금호 타이어가 굴러갑니다.") }
}
```

```java
public class Car {
  Tire frontLeftTire = new HankookTire();
  Tire frontRightTire = new HankookTire();
  Tire backLeftTire = new HankookTire();
  Tire backRightTire = new HankookTire();

  void run() {
    frontLeftTire.roll();
    frontRightTire.roll();
    backLeftTire.roll();
    backRightTire.roll();
  }
}
```

```java
public class CarExample {
  public static void main(String[] args) {
    Car myCar = new Car();

    myCar.run();

    myCar.frontLeftTire = new KumhoTire();
    myCar.frontRightTire = new KumhoTire();

    myCar.run();
  }
}

/*
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
금호 타이어가 굴러갑니다.
금호 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
*/
```

<br>
<br>

## 인터페이스 배열로 구현 객체 관리

```java
public class Car {
  Tire[] tires = {
    new HankookTire(),
    new HankookTire(),
    new HankookTire(),
    new HankookTire()
  };

  void run() {
    for(Tire tire : tires) { tire.roll(); }
  }
}
```

```java
public class CarExample {
  public static void main(String[] args) {
    Car myCar = new Car();

    myCar.run();

    myCar.tires[0] = new KumhoTire();
    myCar.tires[1] = new KumhoTire();

    myCar.run();
  }
}

/*
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
금호 타이어가 굴러갑니다.
금호 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
한국 타이어가 굴러갑니다.
*/
```

<br>
<br>

## 매개 변수의 다형성

- 자동 타입 변환은 필드의 값을 대입할 때에도 발생하지만, 주로 메소드를 호출할 때 많이 발생
  - 매개 변수를 인터페이스 타입으로 선언하고 호출할 때는 구현 객체를 대입하게 되기 때문

```java
public class Driver {
  public void drive(Vehicle vehicle) {
    vehicle.run();
  }
}
```

```java
public interface Vehicle {
  public void run();
}
```

```java
public class Bus implements Vehicle {
  @Override
  public void run() { System.out.println("버스가 달립니다."); }
}
```

```java
public class Taxi implements Vehicle {
  @Override
  public void run() { System.out.println("택시가 달립니다."); }
}
```

```java
public class DriverExample {
  public static void main(String[] args) {
    Driver driver = new Driver();
    Bus bus = new Bus();
    Taxi taxi = new Taxi();

    driver.drive(bus);    //자동 타입 변환 : Vehicle vehicle = bus;
    driver.drive(taxi);   //자동 타입 변환 : Vehicle vehicle = taxi;
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

- 구현 객체가 인터페이스 타입으로 자동 변환하면, 인터페이스에 선언된 메소드만 사용 가능
- 그렇다면 구현 클래스에 선언된 필드와 메소드를 사용해야 할 경우에는 어떻게 해야 할까?  
  → 강제 타입 변환을 해서 다시 인터페이스 변수를 구현 클래스 타입으로 변환하면 구현 클래스의 필드와 메소드를 사용할 수 있음

```java
public interface Vehicle {
  public void run();
}
```

```java
public class Bus implements Vehicle {
  @Override
  public void run() { System.out.println("버스가 달립니다."); }

  public void checkFare() { System.out.println("승차 요금을 체크합니다."); }
}
```

```java
public class VehicleExample {
  public static void main(String[] args) {
    Vehicle vehicle = new Bus();
    vehicle.run();
    //vehicle.checkFare();      //Vehicle 인터페이스에는 없는 메소드이므로 사용 불가

    Bus bus = (Bus) vehicle;    //강제 타입 변환
    bus.run();
    bus.checkFare();            //Bus 클래스에 있는 메소드이므로 사용 가능
  }
}

/*
버스가 달립니다.
버스가 달립니다.
승차 요금을 체크합니다.
*/
```

<br>
<br>

## 객체 타입 확인 (instanceof)

- 강제 타입 변환은 구현 객체가 인터페이스 타입으로 변환되어 있는 상태에서만 가능함
- 그러나 어떤 구현 객체가 변환되어 있는지 알 수 없는 상태에서 무작정 변환을 할 경우 `ClassCastException`이 발생할 수 있음

```java
Vehicle vehicle = new Taxi();
Bus bus = (Bus) vehicle;        //ClassCastException 예외 발생
```

- 매개값이 어떤 객체인지 `instanceof` 연산자로 확인하고 안전하게 강제 타입 변환을 해야 함

```java
public Class Driver {
  public void drive(Vehicle vehicle) {
    if(vehicle instanceof Bus) {
      Bus bus = (Bus) vehicle;
      bus.checkFare();
    }
    vehicle.run();
  }
}
```

<br>
<br>

# 인터페이스 상속

```java
public interface 하위인터페이스 extends 상위인터페이스1, 상위인터페이스2 { ··· }
```

- 인터페이스도 다른 인터페이스를 상속할 수 있음
- 인터페이스는 클래스와는 달리 다중 상속을 허용함
- 하위 인터페이스를 구현하는 클래스는 하위 인터페이스의 메소드 뿐만 아니라 상위 인터페이스의 모든 추상 메소드에 대한 실체 메소드를 가지고 있어야 함
- 하위 인터페이스를 구현하는 클래스를 통해 객체를 생성하면, 하위 및 상위 인터페이스 타입으로 변환 가능
  - 상위 인터페이스 타입으로 변환했을 경우, 상위 인터페이스에 선언된 메소드만 사용 가능하고 하위 인터페이스에 선언된 메소드는 사용할 수 없음

<br>
<br>

# 디폴트 메소드와 인터페이스 확장

**디폴트 메소드의 목적은 모든 구현 객체에서 공유하는 기본 메소드로서의 역할 뿐인가?**

<br>
<br>

## 디폴트 메소드의 필요성

- 기존 인터페이스를 확장해서 새로운 기능을 추가하기 위함
- 기존 인터페이스의 이름과 추상 메소드의 변경 없이 디폴트 메소드만 추가하면 되기 때문에,  
  이전에 개발한 구현 클래스를 그대로 사용할 수 있으면서, 새롭게 개발하는 클래스는 디폴트 메소드를 활용할 수 있게 됨
- 쉽게 말해서, 인터페이스와 이를 구현한 클래스가 이미 있는 상태에서 인터페이스에 추가 기능을 넣고 싶을 때 요긴하게 사용됨

<br>
<br>

## 디폴트 메소드가 있는 인터페이스 상속

- 부모 인터페이스에 디폴트 메소드가 정의되어 있을 경우, 자식 인터페이스에서 디폴트 메소드를 활용하는 방법은 3가지
  1. 디폴트 메소드를 단순히 상속만 받기
  2. 디폴트 메소드를 재정의(Override)해서 실행 내용 변경하기
  3. 디폴트 메소드를 추상 메소드로 재선언하기
