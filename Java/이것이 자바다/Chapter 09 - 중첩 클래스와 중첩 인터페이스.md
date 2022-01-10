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

(이미지 첨부 - member class and local class)

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
