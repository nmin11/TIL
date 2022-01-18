# 예외와 예외 클래스

- 예외란 사용자의 잘못된 조작 또는 개발자의 잘못된 코딩으로 인해 발생하는 프로그램 오류를 뜻함
- 예외는 예외 처리(Exception Handling)를 통해 프로그램을 종료하지 않고 정상 실행 상태가 유지되도록 할 수 있음
- 예외의 2가지 종류
  - 일반 예외(Exception)
    - 컴파일러 체크 예외라고도 불림
    - Java 소스를 컴파일하는 과정에서 예외 처리 코드가 필요한지 검사하기 때문
  - 실행 예외(Runtime Exception)
    - 컴파일하는 과정에서 예외 처리 코드를 검사하지 않는 예외
  - 컴파일 시 예외 처리를 확인하는지 여부에 차이가 있을 뿐, 2가지 예외는 모두 예외 처리가 필요함
- Java에서는 예외를 클래스로 관리함
  - JVM은 프로그램 실행 도중 예외가 발생하면 해당 예외 클래스로 객체를 생성하고, 예외 처리 코드에서 예외 객체를 이용할 수 있도록 해줌
  - 모든 예외 클래스들은 `java.lang.Exception` 클래스를 상속받음

![JVM 작동 과정](https://github.com/nmin11/TIL/blob/main/Java/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/Exception.png)

<br>
<br>

# 실행 예외

- 실행 예외는 Java 컴파일러가 체크하지 않기 때문에 오로지 개발자의 경험에 따라 예외 처리 코드를 삽입해야 함
- 실행 예외에 대한 예외 처리 코드가 없을 경우, 해당 예외가 발생하면 프로그램은 곧바로 종료됨
- 그러므로 자주 발생되는 실행 예외를 알아둘 필요가 있음

<br>
<br>

## NullPointerException

- 가장 빈번하게 발생하는 실행 예외
- 객체가 없는 상태에서 객체를 사용하려 할 때 발생하는 예외

```java
public class NullPointerExceptionExample {
    public static void main(String[] args) {
        String data = null;
        System.out.println(data.toString());
    }
}
```

<br>
<br>

## ArrayIndexOutOfBoundsException

- 배열에서 인덱스 범위를 초과해서 사용할 경우 발생하는 실행 예외

```java
public class ArrayIndexOutOfBoundsExceptionExample {
    public static void main(String[] args) {
        String data1 = args[0];
        String data2 = args[1];

        System.out.println("args[0] : " + data1);
        System.out.println("args[1] : " + data2);
    }
}
```

<br>
<br>

## NumberFormatException

- 문자열 데이터를 숫자로 변경하는 경우가 자주 있으며, 그럴 경우 가장 많이 사용되는 코드는 다음과 같음

| 반환 타입 |            메소드            | 설명                                 |
| :-------: | :--------------------------: | :----------------------------------- |
|    int    |  Integer.parseInt(String s)  | 주어진 문자열을 정수로 변환해서 리턴 |
|  double   | Double.parseDouble(String s) | 주어진 문자열을 실수로 변환해서 리턴 |

- 하지만 만약 숫자로 변경할 수 없는 문자열이라면 `java.lang.NumberFormatException` 발생

```java
public class NumberFormatExceptionExample {
    public static void main(String[] args) {
        String data = "a100";
        int value = Integer.parseInt(data);
    }
}
```

<br>
<br>

## ClassCastException

- 타입 변환은 상위 클래스와 하위 클래스 간에 발생하고 구현 클래스와 인터페이스 간에서도 발생함
- 이러한 관계가 아니라면 클래스는 다른 클래스로 타입 변환할 수 없음
- 억지로 타입 변환을 시도할 경우 `java.lang.ClassCastException` 발생
- 타입 변환 전에 `instanceof` 연산자를 활용해서 타입 변환이 가능한지 확인해보는 것이 좋음

```java
public class ClassCastExceptionExample {
    public static void main(String[] args) {
        Dog dog = new Dog();
        changeDog(dog);

        Cat cat = new Cat();
        changeDog(cat);
    }

    public static void changeDog(Animal animal) {
        if (animal instanceof Dog) Dog dog = (Dog) animal;
    }
}

class Animal {}
class Dog extends Animal {}
class Cat extends Animal {
```

<br>
<br>

# 예외 처리 코드

- 예외 처리 코드란 예외 발생 시 프로그램의 갑작스러운 종료를 막고 정상 실행을 유지할 수 있도록 처리하는 코드를 뜻함
- Java 컴파일러는 소스 파일을 컴파일할 때 일반 예외가 발생할 가능성이 있는 코드를 발견하면 컴파일 오류를 발생시켜 개발자로 하여금 강제적으로 예외 처리 코드를 작성하도록 요구함
- 실행 예외는 개발자의 경험을 바탕으로 예외 처리 코드를 작성해야 함

```java
try {
    예외 발생 가능 코드
} catch(예외 클래스 e) {
    예외 처리
} finally {
    항상 실행되는 코드
}
```

- 예외 처리 코드는 `try-catch-final` 블록을 이용함
  - `try-catch-final` 블록은 생성자 내부와 메소드 내부에 작성되어 일반 예외와 실행 예외가 발생할 경우 예외 처리를 할 수 있도록 해줌
  - `try` 블록에는 예외 발생 가능 코드가 위치함
    - `try` 블록의 코드에서 예외가 발생하지 않으면 `catch` 블록의 코드는 실행되지 않고 `finally` 블록의 코드를 실행함
    - `try` 블록의 코드에서 예외가 발생하면 `catch` 블록의 예외 처리 코드를 실행하고 `finally` 블록의 코드를 실행함
  - `finally` 블록은 생략 가능
    - 예외 발생 여부와 상관없이 항상 실행할 내용이 있을 경우에만 작성할 것
    - `try` 블록과 `catch` 블록에서 `return`문을 사용하더라도 `finally` 블록은 항상 실행됨

```java
public class TryCatchFinallyExample {
    public static void main(String[] args) {
        try {
            Class clazz = Class.forName("java.lang.String2");
        } catch(ClassNotFoundException e) {
            System.out.println("클래스가 존재하지 않습니다.");
        } finally {
            System.out.println("즐거운 하루 되십시오!");
        }
    }
}
```

<br>
<br>

# 예외 종류에 따른 처리 코드

## 다중 catch

```java
try {
    예외 발생 가능 코드
} catch(ArrayIndexOutOfBoundsException e) {
    예외 처리 1
} catch(NumberFormatException e) {
    예외 처리 2
}
```

- `try` 블록 내부에서 발생할 수 있는 다양한 종류의 예외에 대처하기 위해 **다중 catch** 블록을 작성할 수 있음
- 예외가 발생하면 해당하는 예외의 `catch` 블록 실행
- `catch` 블록이 여러 개라 할지라도 단 하나의 `catch` 블록만 실행됨
  - 하나의 예외가 발생하면 즉시 실행을 멈추고 해당 `catch` 블록으로 이동하기 때문

<br>
<br>

## catch 순서

- 다중 catch 블록을 작성할 때 주의할 점 : 상위 예외 클래스가 하위 예외 클래스보다 아래쪽에 위치해야 함
  - `catch` 블록은 위에서부터 아래로 차례대로 검색됨
  - 상위 예외가 위에 있으면 하위 예외가 발생해도 상위 예외를 발생시키니, 다중 catch 블록을 작성하는 의미가 없어짐

```java
try {
    예외 발생 가능 코드
} catch(ArrayIndexOutOfBoundsException e) {
    예외 처리 1
} catch(Exception e) {
    예외 처리 2
}
```

<br>
<br>

## 멀티 catch

- Java 7부터 하나의 `catch` 블록에서 여러 개의 예외를 처리할 수 있도록 **multi catch** 기능이 추가됨
- `catch`의 괄호 안에 동일하게 처리하고 싶은 예외를 `|`로 연결하면 됨

```java
try {
    예외 발생 가능 코드
} catch(ArrayIndexOutOfBoundsException | NumberFormatException e) {
    예외 처리 1
} catch(Exception e) {
    예외 처리 2
}
```

<br>
<br>

# 자동 리소스 닫기

- Java 7에서 새로 추가된 `try-with-resources`를 사용하면 예외 발생 여부와 상관없이 사용했던 리소스 객체의 `close()` 메소드를 호출해서 안전하게 리소스를 닫아줌
- 리소스의 대표적인 예 : `FileInputStream`, `FileOutputStream`

※ Java 6 이하 버전의 코드

```java
FileInputStream fis = null;
try {
    fis = new FileInputStream("file.txt");
} catch(IOException e) {

} finally {
    if(fis != null) {
        try {
            fis.close();
        } catch(IOException e) {}
    }
}
```

※ Java 7 이상 버전의 코드

```java
try(FileInputStream fis = new FileInputStream("file.txt")) {

} catch(IOException) {}
```

- Java 7 이상 버전의 코드에서는 예외가 발생하면 자동으로 `close()` 메소드를 호출해줌
- `try-with-resources`를 구현하고자 하는 리소스는 `java.lang.AutoColseable` 인터페이스를 구현하고 있어야 함

<br>
<br>

# 예외 떠넘기기

- 경우에 따라서 메소드를 호출한 곳으로 예외를 떠넘길 수도 있음
- 이때 사용하는 키워드가 `throws`
- `throws` 키워드는 메소드 선언부 끝에 작성되어 메소드에서 처리하지 않은 예외를 호출한 곳으로 떠넘기는 역할을 함
- `throws` 키워드 뒤에는 떠넘길 예외 클래스를 쉼표로 구분해서 나열해주면 됨

```java
리턴타입 메소드명(매개변수들) throws 예외클래스들 {}
```

- `throws Exception` 만으로 모든 예외를 간단하게 떠넘길 수도 있음
- `throws` 키워드가 붙어있는 메소드는 반드시 `try` 블록 내에서 호출되고 `catch` 블록에서 떠넘겨 받은 예외를 처리해야 함

```java
public void method1() {
    try {
        method2();
    } catch(ClassNotFoundException e) {
        System.out.println("클래스가 존재하지 않습니다.");
    }
}

public void method2() throws ClassNotFoundException {
    Class clazz = Class.forName("java.lang.String2");
}
```

- `throws` 키워드가 붙은 메소드를 사용하기 위해 `try-catch`를 사용하지 않고 `throws` 키워드로 다시 예외를 떠넘길 수도 있음
  - 이 경우, 결국 예외를 떠넘긴 메소드를 호출할 때 `try-catch`를 사용해야 함
- `main()` 메소드에서도 `throws` 키워드를 사용해서 예외를 떠넘길 수 있는데, 이 경우에는 결국 JVM이 최종적으로 예외 처리를 하게 됨
  - JVM은 예외 내용을 콘솔에 출력하는 것으로 예외 처리를 함
  - `main()` 메소드에서 `throws Exception`을 붙이는 것은 프로그램이 알 수 없는 예외 내용을 출력하고 종료될 수도 있으므로 좋지 못한 방법
  - 그러므로 `main()` 메소드에서는 `try-catch` 블록으로 예외 처리를 하는 것이 권장됨
