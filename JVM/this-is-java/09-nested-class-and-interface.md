# 중첩 클래스와 중첩 인터페이스란?

- 객체 지향 프로그램에서 클래스들은 서로 긴밀한 관계를 맺고 상호작용을 함
  - 어떤 클래스는 여러 클래스와 관계를 맺음
  - 어떤 클래스는 특정 클래스와 관계를 맺음
  - 클래스가 여러 클래스와 관계를 맺는 경우에는 독립적으로 선언하는 것이 좋음
  - 클래스가 특정 클래스와 관계를 맺는 경우에는 관계 클래스를 클래스 내부에 선언하는 것이 좋음

```java
class ClassName {
  class NestedClassName {}
}
```

- 중첩 클래스(Nested Class)란 클래스 내부에 선언한 클래스를 뜻함
- 중첩 클래스의 장점
  - 두 클래스의 멤버들이 서로 쉽게 접근할 수 있음
  - 외부에는 불필요한 관계 클래스를 감춤으로써 코드의 복잡성을 줄일 수 있음

```java
class ClassName {
  interface NestedInterfaceName {}
}
```

- 중첩 인터페이스란 클래스 내부에 선언한 인터페이스를 뜻함
- 중첩 인터페이스는 해당 클래스와 긴밀한 관계를 맺는 구현 클래스를 만들기 위해서 사용됨
- 중첩 인터페이스는 주로 UI 프로그래밍에서 이벤트를 처리할 목적으로 많이 활용됨
  - 예를 들어 안드로이드에서는 `View` 클래스의 클릭 이벤트를 처리하는 구현 클래스를 만들 수 있도록 `View` 클래스 내부에 `OnClickListener`라는 중첩 인터페이스를 가지고 있음

```java
public class View {
  public interface OnClickListener {
    public void onClick(View v);
  }
}
```

<br>
<br>

# 중첩 클래스

- 중첩 클래스는 클래스 내부에 선언되는 위치에 따라서 2가지로 분류됨
  - 클래스의 멤버로서 선언되는 중첩 클래스는 **멤버 클래스**
  - 메소드 내부에서 선언되는 중첩 클래스는 **로컬 클래스**
- 멤버 클래스는 클래스나 객체가 사용 중이라면 언제든지 재사용 가능
- 로컬 클래스는 메소드 실행 시에만 사용되고, 메소드가 실행 종료되면 없어짐

![멤버 클래스와 로컬 클래스](https://github.com/nmin11/TIL/blob/main/JVM/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/member%20class%20and%20local%20class.png)

- 멤버 클래스도 하나의 클래스이기 때문에 컴파일하면 바이트 코드 파일(.class)이 별도로 생성됨
  - 바이트 코드 파일 이름 : `A$B.class`
- 로컬 클래스 또한 바이트 코드 파일이 생성됨
  - 바이트 코드 파일 이름 : `A$1B.class`

<br>
<br>

## 인스턴스 멤버 클래스

- `static` 키워드 없이 선언된 중첩 클래스
- 인스턴스 필드와 메소드만 선언 가능하고, 정적 필드와 메소드는 선언 불가능
- 외부에서 인스턴스 멤버 클래스의 객체를 생성하려면 바깥 클래스 객체를 먼저 생성한 이후에 멤버 클래스의 객체를 생성해야 함

<br>
<br>

## 정적 멤버 클래스

- static 키워드와 함께 선언된 중첩 클래스
- 모든 종류의 필드와 메소드 선언 가능
- 외부에서 정적 멤버 클래스의 객체를 생성하려면 바깥 클래스 객체를 생성할 필요가 없고 바로 생성할 수 있음

<br>

## 로컬 클래스

- 메소드 내에 선언된 중첩 클래스
- 접근 제한자 및 `static`을 붙일 수 없음
  - 메소드 내부에서만 사용되므로 접근을 제한할 필요가 없음
- 인스턴스 필드와 메소드만 선언 가능하고, 정적 필드와 메소드는 선언 불가능
- 메소드가 실행될 때 메소드 내에서 객체를 생성하고 사용함
- 주로 비동기 처리를 위해 스레드 객체를 만들 때 사용함

```java
void method() {
  class DownloadThread extends Thread { ··· }
  DownloadThread thread = new DownloadThread();
  thread.start();
}
```

<br>

**※ 중첩 클래스 예시**

```java
//바깥 클래스
class A {
  A() { System.out.println("A 객체가 생성됨"); }

  //인스턴스 멤버 클래스
  class B {
    B() { System.out.println("B 객체가 생성됨"); }
    int field1;
    //static int field2;
    void method1() {}
    //static void method2() {}
  }

  //정적 멤버 클래스
  static class C {
    C() { System.out.println("C 객체가 생성됨"); }
    int field1;
    static int field2;
    void method1() {}
    static void method2() {}
  }

  void method() {
    //로컬 클래스
    class D {
      D() { System.out.println("D 객체가 생성됨"); }
      int field1;
      //static int field2;
      void method1() {}
      //static void method2() {}
    }
    D d = new D();
    d.field1 = 3;
    d.method1();
  }
}
```

```java
public class Main {
  public static void main(String[] args) {
    A a = new A();

    //인스턴스 멤버 클래스 객체 사용
    A.B b = a.new B();
    b.field1 = 3;
    b.method1();

    //정적 멤버 클래스 객체 사용
    A.C c = new A.C();
    c.field1 = 3;
    c.method1();
    A.C.field2 = 3;
    A.C.method2();

    //로컬 클래스 객체 사용
    a.method();
  }
}

/*
A 객체가 생성됨
B 객체가 생성됨
C 객체가 생성됨
D 객체가 생성됨
*/
```

<br>
<br>

# 중첩 클래스의 접근 제한

## 바깥 필드와 메소드에서 사용 제한

- 멤버 클래스가 인스턴스로 선언되었는지, 정적으로 선언되었는지에 따라 바깥 클래스의 필드와 메소드에도 사용 제한이 생김
  - 인스턴스 멤버 클래스는 바깥 클래스의 인스턴스 필드의 초기값이나 인스턴스 메소드에서 객체를 생성할 수 있음
  - 인스턴스 멤버 클래스는 정적 필드의 초기값이나 정적 메소드에서 객체를 생성할 수 없음
  - 정적 멤버 클래스는 모든 필드의 초기값이나 모든 메소드에서 객체를 생성할 수 있음

```java
public class A {
  //인스턴스 멤버 클래스
  class B {}

  //정적 멤버 클래스
  static class C {}

  //인스턴스 필드
  B field1 = new B();
  C field2 = new C();

  //인스턴스 메소드
  void method1() {
    B var1 = new B();
    C var2 = new C();
  }

  //정적 필드 초기화
  //static B field3 = new B();
  static C field4 = new C();

  //정적 메소드
  static void method2() {
    //B var1 = new B();
    C var2 = new C();
  }
}
```

<br>
<br>

## 멤버 클래스에서 사용 제한

- 멤버 클래스 내부에서 바깥 클래스의 필드와 메소드에 접근할 때에도 제한이 따름
  - 인스턴스 멤버 클래스 안에서는 바깥 클래스의 모든 필드와 모든 메소드에 접근 가능
  - 정적 멤버 클래스 안에서는 바깥 클래스의 정적 필드와 정적 메소드에 접근 가능
  - 정적 멤버 클래스 안에서는 인스턴스 필드와 인스턴스 메소드에 접근 불가능

```java
public class A {
  int field1;
  void method1() {}

  static int field2;
  static void method2() {}

  class B {
    void method() {
      field1 = 10;
      method1();

      field2 = 10;
      method2();
    }
  }

  static class C {
    void method() {
      //field1 = 10;
      //method1();

      field2 = 10;
      method2();
    }
  }
}
```

<br>
<br>

## 로컬 클래스에서 사용 제한

- 로컬 클래스 내부에서는 바깥 클래스의 필드나 메소드를 제한 없이 사용 가능
- 문제점 : 로컬 클래스의 객체는 메소드 실행이 끝나도 힙 메모리에 존재하므로 계속 사용할 수 있지만,  
  매개 변수나 로컬 변수는 메소드 실행이 끝나면 스택 메모리에서 사라지기 때문에 로컬 객체에서 사용할 경우 문제가 발생함
- Java의 해결 방법 : 컴파일 시 로컬 클래스에서 사용하는 매개 변수나 로컬 변수의 값을 로컬 클래스 내부에 복사해두고 사용하게 함
  - 매개 변수나 로컬 변수가 수정되어 값이 변경되어 로컬 클래스에 복사해 둔 값과 달라지는 문제를 해결하기 위해  
    매개 변수나 로컬 변수를 `final`로 선언하여 수정을 막음
- Java 7 이하 버전에서는 `final` 키워드 없이 선언된 매개 변수나 로컬 변수를 로컬 클래스에서 사용하면 컴파일 에러가 발생했음
- Java 8부터는 `final` 키워드 없이 선언된 매개 변수와 로컬 변수를 사용해도 컴파일 에러가 발생하지 않음
  - 그 이유는 `final`을 선언하지 않아도 `final`의 특성을 가지기 때문
  - `final` 키워드의 존재 여부의 차이점은 로컬 클래스의 복사 위치
    - `final` 키워드가 있다면 로컬 클래스의 메소드 내부에 지역 변수로 복사
    - `final` 키워드가 없다면 로컬 클래스의 필드로 복사

→ 로컬 클래스의 내부 복사 위치에 신경 쓸 필요 없이 로컬 클래스에서 사용된 매개 변수와 로컬 변수는 모두 `final` 특성을 갖는다는 것만 알면 됨

```java
public class Outter {
  //Java 7 이하
  public void method1(final int arg) {
    final int localVariable = 1;
    //arg = 100;
    //localVariable = 100;

    class Inner {
      public void method() {
        int result = arg + localVariable;
      }
    }
  }

  //Java 8 이상
  public void method2(int arg) {
    int localVariable = 1;
    //arg = 100;
    //localVariable = 100;

    class Inner {
      public void method() {
        int result = arg + localVariable;
      }
    }
  }
}
```

<br>
<br>

## 중첩 클래스에서 바깥 클래스 참조 얻기

- 중첩 클래스에서의 `this` 키워드는 바깥 클래스의 객체 참조가 아닌, 중첩 클래스의 객체 참조
- 중첩 클래스 내부에서 `this.field`, `this.method()`로 호출하면 중첩 클래스의 필드와 메소드가 사용됨
- 중첩 클래스 내부에서 바깥 클래스의 객체 참조를 얻으려면 `Outter.this.field`, `Outter.this.method()`의 방식으로 호출하면 됨

```java
public class Outter {
  String field = "Outter-field";
  void method() { System.out.println("Outter-method"); }

  class Nested {
    String field = "Nested-field";
    void method() { System.out.println("Nested-method"); }

    void print() {
      System.out.println(this.field);
      this.method();
      System.out.println(Outter.this.field);
      Outter.this.method();
    }
  }
}
```

```java
public class OutterExample {
  public static void main(String[] args) {
    Outter outter = new Outter();
    Outter.Nested nested = outter.new Nested();
    nested.print();
  }
}

/*
Nested-field
Nested-method
Outter-field
Outter-method
*/
```

<br>
<br>

# 중첩 인터페이스

```java
class A {
  interface I {
    void method();
  }
}
```

- 중첩 인터페이스는 클래스의 멤버로 선언된 인터페이스를 뜻함
- 인터페이스를 클래스 내부에 선언하는 이유는 해당 클래스와 긴밀한 관계를 맺는 구현 클래스를 만들기 위함
- 특히 UI 프로그래밍에서 이벤트를 처리할 목적으로 많이 활용됨

```java
public class Button {
  interface OnClickListener {
    void onClick();
  }

  OnclickListener listener;

  void setOnClickListener(OnClickListener listener) {
    this.listener = listener;
  }

  void touch() {
    listener.onClick();
  }
}
```

```java
public class CallListener implements Button.OnClickListener {
  @Override
  public void onClick() { System.out.println("전화를 겁니다."); }
}
```

```java
public class MessageListener implements Button.OnClickListener {
  @Override
  public void onClick() { System.out.println("메시지를 보냅니다."); }
}
```

```java
public class ButtonExample {
  public static void main(String[] args) {
    Button btn = new Button();

    btn.setOnClickListener(new CallListener());
    btn.touch();

    btn.setOnClickListener(new MessageListener());
    btn.touch();
  }
}

/*
전화를 겁니다.
메시지를 보냅니다.
*/
```

<br>
<br>

# 익명 객체

- 익명(anonymous) 객체란 이름이 없는 객체를 뜻함
- 단독으로 생성할 수 없고 클래스를 상속하거나 인터페이스를 구현해야만 생성할 수 있음
- 주로 필드의 초기값이나 로컬 변수의 초기값, 매개 변수의 매개값으로 대입됨

<br>
<br>

## 익명 자식 객체 생성

```java
부모클래스 [필드|변수] = new 부모클래스(매개값들) {
  필드들
  메소드들
};
```

- 부모 클래스를 상속해서 `{}` 안의 내용으로 자식 클래스를 선언한다는 뜻
- `new` 연산자는 이렇게 선언된 자식 클래스를 객체로 생성함
- `부모클래스(매개값들)`는 부모 생성자를 호출하는 코드
- `{}` 내부에서 필드나 메소드를 선언하거나 부모 클래스의 메소드를 재정의(오버라이딩)
- 일반 클래스와 달리 생성자를 선언할 수 없음

```java
public class Person {
  void wake() { System.out.println("7시에 일어납니다."); }
}
```

```java
public class Anonymous {
  //필드 초기값으로 대입
  Person field = new Person() {
    void work() { System.out.println("출근합니다."); }

    @Override
    void wake() {
      System.out.println("6시에 일어납니다.");
      work();
    }
  };

  void method1() {
    //로컬 변수값으로 대입
    Person localVar = new Person() {
      void walk() { System.out.println("산책합니다."); }

      @Override
      void wake() {
        System.out.println("7시에 일어납니다.");
        walk();
      }
    };

    //로컬 변수 사용
    localVar.wake();
  }

  void method2(Person person) {
    person.wake();
  }
}
```

```java
public class AnonymousExample {
  public static void main(String[] args) {
    Anonymous anony = new Anonymous();
    anony.field.wake();
    anony.method1();
    anony.method2(
      new Person() {
        void study() { System.out.println("공부합니다."); }

        @Override
        void wake() {
          System.out.println("8시에 일어납니다.");
          study();
        }
      }
    );
  }
}

/*
6시에 일어납니다.
출근합니다.
7시에 일어납니다.
산책합니다.
8시에 일어납니다.
공부합니다.
*/
```

<br>
<br>

## 익명 구현 객체 생성

```java
인터페이스 [필드|변수] = new 인터페이스() {
  인터페이스의 추상 메소드의 실체 메소드들
  필드들
  메소드들
};
```

- 구현 클래스가 재사용되지 않고 오로지 해당 필드와 변수의 초기값으로만 사용하는 경우, 익명 구현 객체를 초기값으로 대입하는 것이 좋음
- `{}` 안에는 인터페이스에 선언된 모든 추상 메소드들의 실체 메소드를 작성해야 함
- 필드와 메소드는 실체 메소드에서만 사용 가능

```java
public interface RemoteControl {
  public void turnOn();
  public void turnOff();
}
```

```java
public class Anonymous {
  //필드 초기값으로 대입
  RemoteControl field = new RemoteControl() {
    @Override
    public void turnOn() { System.out.println("TV를 켭니다."); }

    @Override
    public void turnOff() { System.out.println("TV를 끕니다."); }
  };

  void method1() {
    //로컬 변수값으로 대입
    RemoteControl localVar = new RemoteControl() {
      @Override
      public void turnOn() { System.out.println("Audio를 켭니다."); }

      @Override
      public void turnOff() { System.out.println("Audio를 끕니다."); }
    };

    //로컬 변수 사용
    localVar.turnOn();
  }

  void method2(RemoteControl rc) { rc.turnOn(); }
}
```

```java
public class AnonymousExample {
  public static void main(String[] args) {
    Anonymous anony = new Anonymous();
    anony.field.turnOn();
    anony.method1();
    anony.method2(
      new RemoteControl() {
        @Override
        public void turnOn() { System.out.println("SmartTV를 켭니다."); }

        @Override
        public void turnOff() { System.out.println("SmartTV를 끕니다."); }
      }
    );
  }
}

/*
TV를 켭니다.
Audio를 켭니다.
SmartTV를 켭니다.
*/
```

<br>
<br>

## 익명 객체의 로컬 변수 사용

- 익명 객체 내부에서는 바깥 클래스의 필드나 메소드를 제한 없이 사용할 수 있음
- 문제는 메소드의 매개 변수나 로컬 변수를 익명 객체에서 사용할 때
  - 메소드 내에서 생성된 익명 객체는 메소드 실행이 끝나도 힙 메모리에 존재하기에 계속 사용할 수 있음
  - 그러나 매개 변수나 로컬 변수는 메소드 실행이 끝나면 스택 메모리에서 사라지기 때문에 익명 객체에서 사용할 수 없게 되므로 문제가 발생함
- 그러므로 익명 객체 내부에서 메소드의 매개 변수나 로컬 변수를 사용할 경우, 이 변수들은 `final` 특성을 가져야 함
  - Java 8 부터는 명시하지 않아도 자동으로 `final` 특성을 가짐

```java
public interface Calculatable {
  public int sum();
}
```

```java
public class Anonymous {
  private int field;

  public void method(final int arg1, int arg2) {
    final int var1 = 0;
    int var2 = 0;
    field = 10;

    /* 사용 불가 로직들
    arg1 = 20;
    arg2 = 20;
    var1 = 30;
    var2 = 30;
    */

    Calculatable calc = new Calculatable() {
      @Override
      public int sum() {
        return field + arg1 + arg2 + var1 + var2;
      }
    };

    System.out.println(calc.sum());
  }
}
```

```java
public class AnonymousExample {
  public static void main(String[] args) {
    Anonymous anony = new Anonymous();
    anony.method(0, 0);
  }
}

/*
10
*/
```
