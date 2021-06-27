# 예외 처리

## 예외와 예외 클래스

자바에서는 컴퓨터 하드웨어의 오동작 또는 고장으로 인해 프로그램 실행 오류가 발생하는 것을 에러라고 한다. 또한 자바에서는 에러 이외에 예외(Exception)이라고 부르는 오류가 있다.  
예외란 사용자의 잘못된 조작 또는 개발자의 잘못된 코딩으로 인해 발생하는 프로그램 오류를 뜻한다. 예외가 발생하면 프로그램은 곧바로 종료된다는 점에서는 에러와 동일하다. 그러나 예외 처리(Exception Handling)를 통해 프로그램을 종료하지 않고 정상 실행 상태가 유지되도록 할 수 있다.  
예외에는 두 가지 종류가 있다. 하나는 일반 예외(Exception)이고, 다른 하나는 실행 예외(Runtime Exception)이다. 일반 예외는 컴파일러 체크 예외라고도 하는데, 자바 소스를 컴파일하는 과정에서 예외 처리코드가 필요한지 검사하기 때문이다. 만약 예외처리 코드가 없다면 컴파일 오류가 발생한다. 실행 예외는 컴파일하는 과정에서 예외처리 코드를 검사하지 않는 예외를 의미한다. 컴파일 시 예외처리를 확인하는 차이일 뿐, 두 가지 예외는 모두 예외 처리가 필요하다. 자바에서는 예외를 클래스로 관리한다. JVM은 프로그램을 실행하는 도중에 예외가 발생하면 해당 예외 클래스로 객체를 생성한다. 그러고 나서 예외 처리 코드에서 예외 객체를 이용할 수 있도록 해준다. 모든 예외 클래스들은 java.lang.Exception 클래스를 상속받는다.  
일반 예외는 Exception을 상속받지만 RuntimeException을 상속받지 않은 클래스들이고, 실행 예외는 RuntimeException을 상속받는 클래스들이다. RuntimeException은 Exception을 상속받지만, JVM은 RuntimeException을 상속했는지를 보고 실행 예외를 판단한다.

</br>

## 실행 예외

실행 예외는 자바 컴파일러가 체크를 하지 않기 때문에 오로지 개발자의 경험에 의해서 예외 처리 코드를 삽입해야 한다. 만약 개발자가 실행 예외에 대해 예외 처리 코드를 넣지 않았을 경우, 해당 예외가 발생하면 프로그램은 곧바로 종료된다. 자바 개발자라면 몇 가지 실행 예외를 잘 익혀 두어야 한다.

</br>

### NullPointerException

자바 프로그램에서 가장 빈번하게 발생하는 실행 예외다. 이것은 객체 참조가 없는 상태를 의미하며, 즉 null 값을 갖는 참조 변수로 객체 접근 연산자인 .을 사용했을 때 발생한다.

### ArrayIndexOutOfBoundsException

배열에서 인덱스 범위를 초과하여 사용할 경우 발생하는 실행 예외다.

### NumberFormatException

문자열로 되어 있는 데이터를 숫자로 변경하는 경우에 자주 발생한다. 문자열을 숫자로 변환하는 방법은 다음과 같다.

| 반환 타입 |          메소드 명           |
| :-------: | :--------------------------: |
|    int    |  Integer.parseInt(String s)  |
|  double   | Double.parseDouble(String s) |

Wrapper 클래스인 Integer와 Double에 parseInt, parseDouble 메소드를 이용해서 문자열을 숫자로 변환할 수 있다. 이 메소드들은 매개 값인 문자열이 숫자로 변환될 수 없다면 java.lang.NumberFormatException을 발생시킨다.

### ClassCastException

타입 변환(Casting)은 상위 클래스와 하위 클래스 간에 발생하고 구현 클래스와 인터페이스 간에도 발생한다. 이러한 관계가 아니라면 클래스는 다른 클래스로 타입 변환을 할 수 없다. 억지로 타입 변환을 시도할 경우, ClassCastException이 발생한다.

</br>

## 예외 처리 코드

프로그램에서 예외가 발생했을 경우 프로그램의 갑작스러운 종료를 막고 정상 실행을 유지할 수 있도록 처리하는 코드를 예외 처리 코드라고 한다. 자바 컴파일러는 소스 파일을 컴파일할 때 일반 예외가 발생할 가능성이 있는 코드를 발견하면 컴파일 오류를 발생시켜 개발자로 하여금 강제적으로 예외 처리 코드를 작성하도록 요구한다. 그러나 실행 예외는 컴파일러가 체크해주지 않기 때문에 예외 처리 코드를 개발자의 경험에 따라 작성해야 한다.  
예외 처리 코드는 기본적으로 **try-catch-finally 블록**을 이용한다. 이 블록은 생성자 내부와 메소드 내부에서 작성되어 일반 예외와 실행 예외가 발생할 경우 예외 처리를 할 수 있도록 해준다. 기본적인 작성 방법은 다음과 같다.

```java
try {
   예외가 발생할 수도 있는 코드
} catch (예외 클래스 e) {
   예외 처리
} finally {
   항상 실행
}
```

try 블록의 코드가 예외 없이 정상 실행되면 catch 블록의 코드는 실행되지 않고 finally 블록의 코드를 실행한다. 만약 try 블록의 코드에서 예외가 발생하면 즉시 실행을 멈추고 catch 블록으로 이동하여 예외 처리 코드를 실행한다. 그리고 finally 블록의 코드를 실행한다. finally 블록은 옵션으로 생략 가능하다. 예외 발생 여부와 상관 없이 항상 실행할 내용이 있는 경우에만 finally 블록을 작성해주면 된다. 또한 try 블록과 catch 블록에서 return 문을 사용하더라도 finally 블록은 항상 실행된다.

</br>

### 다중 catch

try 블록 내부는 다양한 종류의 예외가 발생할 수 있다. 이 경우 발생하는 예외 별로 예외 처리 코드를 다르게 작성하기 위해 다중 catch 블록을 작성한다. 물론 catch 블록이 여러 개라 할지라도 단 하나의 catch 블록만 실행된다. 왜냐하면 try 블록에서 하나의 예외가 발생하면 즉시 실행을 멈추고 해당 catch 블록으로 이동하기 때문이다.  
다중 catch 블록을 작성할 때 주의할 점은 상위 예외 클래스가 하위 예외 클래스보다 아래쪽에 위치해야 한다는 점이다. try 블록에서 예외가 발생했을 때, 예외를 처리해줄 catch 블록은 위에서부터 차례대로 검색된다. 만약 상위 예외 클래스의 블록이 위에 있다면 하위 클래스의 catch 블록은 실행되지 않는다.

```java
try {
   ArrayIndexOutOfBoundsException
   NumberFormatException
} catch (ArrayIndexOutOfBoundsException e) {
   예외 처리
} catch (Exception e) {
   예외 처리
}
```

### 멀티 catch

하나의 catch 블록에서 여러 개의 예외 처리를 할 수 있는 멀티 catch 기능이 있다.

```java
try {
	ArrayIndexOutOfBoundsException 또는 NumberFormatException 발생
	다른 exception 발생
} catch (ArrayIndexOutOfBoundsException | NumberFormatException e ) {
	예외처리 1
} catch (Exception e) {
	예외처리 2
}
```

</br>

## 예외 떠넘기기

경우에 따라서 메소드 내부의 예외를 메소드를 호출한 곳으로 떠넘길 수도 있다. 이 때 사용할 수 있는 키워드가 throws다. throws 키워드는 메소드 선언부 끝에 작성되어 메소드에서 처리하지 않은 예외를 호출한 곳으로 떠넘기는 역할을 한다.

```java
public class Main {
  public static void main(String[] args) {

    try {
      findClass();
    } catch(ClassNotFoundException e){
      System.out.println("클래스가 존재하지 않습니다");
    }
  }

  public static void findClass() throws ClassNotFoundException {
    Class clazz = Class.forName("java.lang.String2");
  }
}
```

</br>

## 사용자 정의 예외

자바 표준 API에서 제공하는 예외 클래스만으로 표현할 수 없는 예외를 애플리케이션 예외라고 하며, 사용자 정의 예외라고도 한다.

```java
public class aaaException extends [ Exception | RuntimeException ] {
	public bbbException() {}
	public cccException(String message) { super(message); }
}
```

사용자 정의 예외 클래스도 필드, 생성자, 메소드 선언들을 포함할 수 있지만 대부분은 생성자 선언만을 포함한다. 생성자는 두 개를 선언하는 것이 일반적인데, 하나는 파라미터가 없는 기본 생성자이고, 다른 하나는 예외 발생 원인(예외 메시지)을 전달하기 위해 String 타입의 파라미터를 갖는 생성자이다. String 타입의 파라미터를 갖는 생성자는 상위 클래스의 생성자를 호출하여 예외 메시지를 넘겨준다. 예외 메시지의 용도는 catch 블록의 예외 처리 코드에서 이용하기 위해서이다.

</br>

## 예외 정보 얻기

try 블록에서 예외가 발생하면 예외 객체는 catch 블록의 파라미터에서 참조하게 되므로 이를 이용하면 예외 객체의 정보를 알 수 있다. 모든 예외 객체는 Exception 클래스를 상속하기 때문에 Exception이 가지고 있는 메소드들은 모든 예외 객체에서 호출할 수 있다.  
그중에서도 가장 많이 사용되는 메소드는 getMessage()와 printStackTrace()이다.  
예외 메시지의 내용에는 왜 예외가 발생했는지에 대한 간단한 설명이 포함된다. 좀 더 상세한 원인을 세분화하기 위해서 예외 코드를 포함하기도 하는데, 예를 들어 데이터베이스에서 발생한 오류들은 예외 코드가 메시지로 전달된다. 이와 같은 예외 메시지는 catch 블록에서 getMessage() 메소드의 리턴값으로 얻을 수 있다. 뿐만 아니라 printStackTrace() 메소드는 예외 발생 코드를 추적해서 모두 콘솔에 출력한다. 어떤 예외가 어디에서 발생했는지 상세하게 출력하기 때문에 프로그램을 테스트하면서 오류를 찾을 때 활용된다.
