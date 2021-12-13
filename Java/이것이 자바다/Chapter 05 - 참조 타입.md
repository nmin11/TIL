# 데이터 타입 분류

- 프로그램이 하는 일은 결국 데이터를 처리하는 것이므로, 데이터를 얼마나 잘 다루느냐가 관건
- Java의 Data Type
  - primitive type
    - 정수 타입
    - 실수 타입
    - 논리 타입
  - reference type
    - 배열 타입
    - 열거 타입
    - 클래스
    - 인터페이스
- 기본 타입 변수와 참조 타입 변수의 차이점은 **저장되는 값이 무엇이냐**
  - 기본 타입 변수는 **실제 값** 을 저장하지만, 참조 타입 변수는 **메모리의 번지** 를 값으로 저장함
    - **번지를 통해 객체를 참조한다** 는 뜻에서 참조 타입이라고 부름

<br>
<br>

# 메모리 사용 영역

- java.exe로 JVM이 시작되면 JVM은 운영체제에서 할당받은 메모리 영역(Runtime Data Area)을 다음과 같이 세부 영역으로 구분해서 사용함

<br>

![JVM Runtime Data Area](https://github.com/nmin11/TIL/blob/main/Java/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/JVM-runtime-data-area.jpg)

<br>
<br>

## Method 영역

- 코드에서 사용되는 클래스(\*.class)들을 클래스 로더로 읽어 클래스별로 Runtime Constant Pool, Field Data, Method Data, Method Code, Constructor Code 등을 분류해서 저장
- 메소드 영역은 JVM이 시작할 때 생성되며, 모든 Thread가 공유하는 영역

<br>
<br>

## Heap 영역

- 객체와 배열이 생성되는 영역
- 힙 영역에 생성된 객체와 배열은 JVM Stack 영역의 변수나 다른 객체의 필드에서 참조함
- 참조하는 변수나 필드가 없을 경우 Garbage Collector를 실행시켜 쓰레기 객체를 힙 영역에서 자동으로 제거
  - 개발자는 객체를 제거하기 위해 별도의 코드를 작성할 필요가 없음
  - 사실 Java는 코드로 객체를 직접 제거하는 방법을 제공하지 않음

<br>
<br>

## JVM Stack 영역

- 각 Thread마다 하나씩 존재하며 Thread가 시작될 때 할당됨
- Java 프로그램에서 추가적으로 Thread를 생성하지 않았다면 main Thread만 존재하므로 JVM Stack도 하나
- 메소드를 호출할 때마다 Frame을 추가(push)하고 메소드가 종료되면 해당 Frame을 제거(pop)하는 동작 수행
- 예외 발생 시 printStackTrace() 메소드로 보여주는 Stack Trace의 각 라인은 하나의 Frame을 표현
- Frame 내부에 로컬 변수 스택이 있으며, 여기에 기본 타입 변수와 참조 타입 변수가 push되거나 pop됨
  - 변수가 이 로컬 변수 스택에 생성되는 시점은 초기화될 때
  - 변수는 선언된 블록 안에서만 스택에 존재하고, 블록을 벗어나면 스택에서 제거됨
- 기본 타입 변수는 스택 영역에 직접 값을 가지고 있지만, 참조 타입 변수는 값이 아니라 힙 영역이나 메소드 영역의 객체 주소를 가짐
  - 참고로 Java에서는 배열을 객체로 취급

<br>
<br>

# 참조 변수의 ==, != 연산

- 동일한 객체를 참조하는지, 다른 객체를 참조하는지 알아볼 때 사용됨
- 참조 타입 변수의 값은 힙 영역의 객체 주소이므로 결국 주소 값을 비교하는 것이 됨

<br>
<br>

# null과 NullPointerException

- 참조 타입 변수는 힙 영역의 객체를 참조하지 않는다는 뜻으로 null 값을 가질 수 있음
- null 값도 초기값으로 사용할 수 있기 때문에 null로 초기화된 참조 변수는 스택 영역에 생성됨
- 참조 타입 변수를 사용하면서 가장 많이 발생하는 예외 중 하나가 `NullPointerException`
  - 참조 타입 변수를 사용하는 것은 곧 객체를 사용하는 것을 의미하는데, 참조할 객체가 null이면 사용할 수 없게 됨

```java
int[] intArray = null;
intArray[0] = 10;       //NullPointerException

String str = null;
int len = str.length(); //NullPointerException
```

<br>
<br>

# String 타입

- String 타입은 다음과 같이 선언 및 문자열 저장 가능

```java
String name;
name = "로코";
String hobby = "코딩";
```

- 사실 문자열을 String 변수에 저장한다는 말은 틀린 표현
  - 문자열이 직접 변수에 저장되는 것이 아니라, 문자열은 String 객체로 생성되고 변수는 String 객체를 참조
  - 하지만 일반적으로 문자열을 String 변수에 저장한다는 표현을 주로 사용함
- Java는 문자열 리터럴이 동일하다면 String 객체를 공유하도록 되어 있음

```java
String name1 = "로코";
String name2 = "로코";
```

위의 두 변수는 동일한 String 객체를 참조한다.

<br>

- 일반적으로 문자열을 저장할 때 문자열 리터럴을 주로 사용하지만 new 연산자를 사용해서 직접 String 객체를 생성시킬 수도 있음
  - new 연산자는 힙 영역에 새로운 객체를 만들 때 사용하는 연산자로, **객체 생성 연산자** 라고 함

```java
String name1 = new String("로코");
String name2 = new String("로코");
```

위의 두 변수는 서로 다른 String 객체를 참조한다.

- 일반적인 방법을 통해 동일한 문자열 리터럴로 String 객체를 생성한 이후 `==` 비교를 하면 `true`가 나오지만,<br>new 연산자를 통해 동일한 문자열 리터럴로 String 객체를 생성한 이후 `==` 비교를 하면 `false`가 나옴
  - 참조하는 객체가 똑같든 말든 문자열 리터럴만 비교하고 싶을 때는 String 객체의 equals 메소드를 사용해야 함

```java
boolean result = str1.equals(str2);
```

- String 변수도 참조 타입이므로 초기값으로 null을 가질 수 있음

```java
String hobby = "여행";
hobby = null;
```

참조를 잃은 String 객체("여행")는 JVM에서 참조되지 않은 쓰레기 객체로 취급하여 Garbage Collector를 구동하고 메모리에서 자동 제거함

<br>
<br>

# 배열 타입

## 배열이란?

- 같은 타입의 데이터를 연속된 공간에 나열시키고, 각 데이터에 index를 부여해 놓은 자료구조
- 같은 타입의 많은 양의 데이터를 효율적으로 다루기 위한 방법
- 선언과 동시에 저장할 수 있는 데이터 타입이 결정되며, 이 때 결정된 타입과 같은 타입의 데이터만 저장 가능
  - 만약 다른 타입의 값을 저장하려고 하면 `Type mismatch` 컴파일 오류 발생
- 한 번 생성된 배열은 길이를 늘리거나 줄일 수 없음
  - 만약 더 많이 저장해야 할 필요가 있다면 그 길이만큼의 배열을 새로 생성하고, 기존 배열 항목을 새 배열로 복사해야 함

<br>
<br>

## 배열 선언

- 배열 변수 선언은 2가지 형태로 작성 가능

```java
타입[] 변수;
```

```java
타입 변수[];
```

- 배열도 객체이므로 힙 영역에 생성되고 배열 변수는 힙 영역의 배열 객체를 참조
- 참조할 배열 객체가 없다면 null 값으로 초기화될 수 있음

<br>

## 값 목록으로 배열 생성

- 배열 항목에 저장될 값의 목록이 있다면 다음과 같이 간단하게 배열 객체를 만들 수 있음

```java
String[] names = { "남궁민", "로코", "셰르디" };
```

`{ }`는 주어진 값들을 항목으로 가지는 배열 객체를 힙에 생성하고, 배열 객체의 번지를 리턴한다.  
배열 변수는 리턴된 번지를 저장함으로써 참조가 이루어진다.

그리고 위에 생성된 배열에서 names[0]는 "남궁민", names[1]는 "로코", names[2]는 "셰르디"로 읽을 수 있다.  
만약 names[2]의 "셰르디"를 "존잘남"으로 바꾸고 싶다면 다음과 같이 대입 연산자를 사용하면 된다.

```java
names[2] = "존잘남";
```

<br>

- 값의 목록으로 배열 객체를 생성할 때, **배열 변수를 이미 선언한 후에 다른 실행문에서 중괄호를 사용한 배열 생성 및 저장은 허용되지 않음**

```java
타입[] 변수;
변수 = { 값0, 값1, 값2, 값3, ··· }; //컴파일 에러
```

만약 배열 변수를 미리 선언한 후, 값 목록들이 나중에 결정되는 상황이라면 다음과 같이 **new 연산자** 를 사용해서 값 목록을 지정해주면 된다.

```java
String[] names = null;
names = new String[] { "남궁민", "로코", "자바왕" };
```

메소드의 매개값이 배열인 경우에도 매개값에 new 연산자를 사용해야 한다.

```java
public class ArrayCreateByValueListExample {
  public static void main(String[] args) {

    int sum = add(new int[] { 83, 90, 87 });
    System.out.println("총합 : " + sum);

  }

  public static int add(int[] scores) {
    int sum = 0;
    for (int i = 0; i < scores.length; i++) {
      sum += scores[i];
    }
    return sum;
  }
}
```

<br>

## new 연산자로 배열 생성

- 값의 목록을 가지고 있지 않지만, 향후 값들을 저장할 배열을 미리 만들고 싶을 때는 new 연산자를 사용

```java
int[] intArray = new int[5];
```

위의 변수 선언 및 저장 과정에서는 길이가 5인 int[] 배열을 생성한다.

<br>

- 지정된 값이 없기 때문에 초기에는 모든 index의 값들이 타입별 초기값으로 설정됨

|   분류    | 데이터 타입 |  초기값  |
| :-------: | :---------: | :------: |
| 정수 타입 |   byte[]    |    0     |
| 정수 타입 |   char[]    | '\u0000' |
| 정수 타입 |   short[]   |    0     |
| 정수 타입 |    int[]    |    0     |
| 정수 타입 |   long[]    |    0L    |
| 실수 타입 |   float[]   |   0.0F   |
| 실수 타입 |  double[]   |   0.0    |
| 논리 타입 |   boolean   |  false   |
| 참조 타입 |   class[]   |   null   |
| 참조 타입 | interface[] |   null   |

<br>

## 배열 길이

- 배열의 길이란 배열에 저장할 수 있는 전체 항목 수를 뜻함
- 코드에서 배열의 길이를 얻으려면 배열 객체의 length 필드를 읽으면 됨

```java
int[] intArray = { 10, 20, 30 };
int num = intArray.length;
```

- length 필드는 읽기 전용 필드이기 때문에 값을 바꿀 수 없음

```java
intArray.length = 10; //컴파일 에러
```

- 배열의 length 필드는 for문을 사용해서 배열 전체를 루핑할 때 매우 유용하게 사용됨

```java
public class ArrayLengthExample {
  public static void main(String[] args) {

    int[] scores = { 70, 80, 90 };
    int sum = 0;

    for (int i = 0; i < scores.length; i++) {
      sum += scores[i];
    }
    System.out.println("총합 : " + sum);

    double avg = (double) sum / scores.length;
    System.out.println("평균 : " + avg);

  }
}

/*
총합 : 240
평균 : 80.0
*/
```

for문의 조건식에서 `<` 연산자를 사용한 이유는 배열의 마지막 인덱스는 배열의 길이보다 `1`이 적기 때문이다.  
배열의 index의 범위는 0~(길이-1)이다.  
만약 index를 초과해서 사용하면 `ArrayIndexOutOfBoundsException`이 발생한다.

<br>
<br>

## 커맨드 라인 입력

- 프로그램 실행을 위해서는 main() 메소드가 필요함
  - 하지만 main() 메소드의 매개값인 `String[] args`는 왜 필요한 것일까?

```java
public static void main(String[] args) { ··· }
```

- java 클래스로 프로그램을 실행하면 JVM은 길이가 0인 String 배열을 먼저 생성하고 main() 메소드를 호출할 때 매개값으로 전달함
- java 클래스 뒤에 공백으로 구분된 문자열 목록을 주고 실행하면, 문자열 목록으로 구성된 String[] 배열이 생성되고 main() 메소드를 호출할 때마다 매개값으로 전달함

```java
java 클래스 문자열0 문자열1 문자열2 ··· 문자열n-1
```

- main() 메소드는 String[] args 매개 변수를 통해서 커맨드 라인에서 입력된 데이터의 수와 입력된 데이터를 알 수 있게 됨

<br>
<br>

## 다차원 배열

- 행과 열로 구성된 배열을 2차원 배열이라고 함
- Java는 2차원 배열을 중첩 배열 방식으로 구현함

```java
int[][] scores = new int[2][3];
```

이 코드는 메모리에 3개의 배열 객체를 생성한다.  
scores 배열 객체가 하나 생성되고, scores 배열 객체는 길이가 3인 배열 객체 2개를 참조하게 된다.  
각 배열의 길이는 다음과 같이 얻을 수 있다.

```java
scores.length     //2
scores[0].length  //3
scores[1].length  //3
```

- Java는 1차원 배열이 서로 연결된 구조로 다차원 배열을 구현하기 때문에 행렬 구조가 아닌 계단식 구조를 가질 수도 있음

```java
int[][] scores = new int[2][];
scores[0] = new int[2];
scores[1] = new int[3];
```

- 다차원 배열을 사용할 때 주의할 점은 정확한 배열의 길이를 알고 index를 사용해야 한다는 점
  - 배열의 범위를 넘어서면 `ArrayIndexOutOfBoundsException` 발생
- 그룹화된 값 목록을 이미 가지고 있다면 `{ }` 안에 다시 `{ }`를 사용해서 값 목록을 나열해서 저장할 수 있음

```java
int[][] scores = { { 95, 80 }, { 92, 96 } };

int score = scores[0][0];   //95
int score = scores[1][1];   //96
```

<br>
<br>

## 객체를 참조하는 배열

- 기본 타입 배열은 각 항목에 직접 값을 갖고 있지만, 참조 타입 배열은 각 항목에 객체의 번지를 갖고 있음
- 대표적으로 String 타입 배열도 객체의 주소를 값으로 가짐
  - 문자열 비교를 위해서 `==` 비교 대신 `equals() 메소드` 사용 권장

<br>
<br>

## 배열 복사

- 배열은 한 번 생성하면 크기를 변경할 수 없음
  - 더 많은 저장 공간이 필요하다면 보다 큰 배열을 새로 만들고 이전 배열로부터 항목 값들을 복사해야 함
- for문을 사용하거나 System.arraycopy() 메소드를 사용해야 함

```java
public class ArrayCopyByForExample {
  public static void main(String[] args) {
    int[] oldIntArray = { 1, 2, 3 };
    int[] newIntArray = new int[5];

    for (int i = 0; i < oldIntArray.length; i++) {
      newIntArray[i] = oldIntArray[i];
    }
  }
}
```

newIntArray의 길이가 더 크기 때문에 복사되지 않은 newIntArray[3], newIntArray[4]의 값은 int[] 배열의 초기값인 0이 된다.

<br>

```java
public class ArrayCopyExample {
  public static void main(String[] args) {
    String[] oldStrArray = { "남궁민", "로코", "존잘남" };
    String[] newStrArray = new String[5];

    System.arraycopy(oldStrArray, 0, newStrArray, 0, oldStrArray.length);
  }
}
```

우선 System.arraycopy() 메소드의 사용법은 다음과 같다.

```java
System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length);
```

src는 원본 배열이고, srcPos는 원본 배열에서 복사할 항목의 시작 index이다.  
dest는 새 배열이고, destPos는 새 배열에서 붙여넣을 시작 index이다.  
마지막으로 length는 복사할 개수이다.

<br>

- 만약 참조 타입 배열을 복사했다면, 복사한 값이 객체의 번지들이므로, 새 배열의 항목은 이전 배열의 항목이 참조하는 객체와 동일함
  - 이를 **얕은 복사(shallow copy)** 라고 함
    - **깊은 복사(deep copy)** 를 위해서는 참조하는 객체도 별도로 생성해야 함

<br>
<br>

## 향상된 for문

```java
for (타입 변수 : 배열) {
  실행문;
}
```

- Java 5부터 배열 및 컬렉션 객체를 좀 더 쉽게 처리할 목적으로 향상된 for문 제공
- 반복 실행을 하기 위해 카운터 변수와 증감식을 사용할 필요가 없음
- 배열 및 컬렉션 항목의 개수만큼 반복하고, 자동적으로 for문을 빠져나감
- 향상된 for문 실행 순서
  1. 배열에서 가져올 값이 존재하는지 평가
  2. 값이 존재한다면 해당 값을 타입 변수에 저장
  3. 실행문 실행
  4. 다시 배열에 가져올 다음 값이 존재하는지 평가 → 없을 때까지 계속해서 반복

```java
public class AdvancedForExample {
  public static void main(String[] args) {
    int[] scores = { 95, 71, 84, 93, 87 };
    int sum = 0;

    for (int score : scores) {
      sum += score;
    }
  }
}
```

<br>
<br>

# 열거 타입

- 데이터 중에는 몇 가지로 한정된 값만 갖는 경우가 흔하게 있음
  - ex) 요일, 계절
- 열거 타입(enumeration type)은 몇 개의 열거 상수(enumeration constant) 중에서 하나의 상수를 저장하는 데이터

<br>
<br>

## 열거 타입 선언

- 열거 타입 이름을 정하고, 정한 이름으로 소스 파일(.java)을 생성해야 함
- 열거 타입 이름은 관례적으로 첫 문자를 대문자로 하고 나머지는 소문자로 구성
  - 만약 여러 단어로 구성된 이름이라면 각 단어의 첫 문자를 대문자로 하는 것이 관례

```java
Week.java
MemberGrade.java
ProductKind.java
```

- 소스 파일은 열거 타입 선언 및 열거 상수 선언으로 채워짐

```java
public enum Week {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY
}
```

`public enum` 키워드는 열거 타입을 선언하기 위한 키워드이다.  
열거 타입 안에 나열하게 되는 열거 상수들은 모두 대문자로 작성하는 것이 관례이다.  
만약 열거 상수가 여러 단어로 구성될 경우에는 `_`로 연결하는 것이 관례이다.

```java
public enum LoginResult { LOGIN_SUCCESS, LOGIN_FAILED }
```

<br>
<br>

## 열거 타입 변수

- 열거 타입도 하나의 데이터 타입이므로 변수를 선언하고 사용할 수 있음

```java
Week today = Week.SUNDAY;
Week birthday = null;
```

열거 상수는 단독으로 사용할 수 없고 반드시 `열거타입.열거상수`로 사용해야만 한다.  
그리고 열거 타입도 참조 타입이기 때문에 null 값을 저장할 수 있다.

<br>

- 열거 타입도 참조 타입이고, 참조 타입 변수는 객체를 참조하는 변수
  - 그러므로 열거 상수 또한 객체 → 열거 상수는 열거 객체로 생성됨

```java
Week today = Week.MONDAY;
today == Week.MONDAY        //true

Week week1 = Week.SATURDAY;
Week week2 = Week.SATURDAY;
week1 == week2              //true
```

<br>
<br>

## 열거 객체의 메소드

- 열거 객체는 java.lang.Enum 클래스에 선언된 메소드들을 사용할 수 있음
  - 모든 열거 타입이 컴파일 시에 Enum 클래스를 상속하기 때문에 사용 가능

| return 타입 |        메소드        | 설명                                  |
| :---------: | :------------------: | :------------------------------------ |
|   String    |        name()        | 열거 객체의 문자열 리턴               |
|     int     |      ordinal()       | 열거 객체의 순번 리턴 (0부터 시작)    |
|     int     |     compareTo()      | 열거 객체를 비교해서 순번 차이를 리턴 |
|  열거 타입  | valueOf(String name) | 주어진 문자열의 열거 객체 리턴        |
|  열거 배열  |        values        | 모든 열거 객체들을 배열로 리턴        |

<br>

### name() 메소드

- 열거 객체가 가지고 있는 문자열 리턴
- 리턴되는 문자열은 열거 타입을 정의할 때 사용한 상수 이름과 동일

```java
Week today = Week.MONDAY;
String name = today.name();   //"MONDAY"
```

<br>

### ordinal() 메소드

- 전체 열거 객체 중 몇 번째 열거 객체인지 알려줌
- 열거 객체 순번은 열거 타입을 정의할 때 주어진 순번이며, 0번부터 시작함

```java
public enum Week {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY
}
```

```java
Week today = Week.SUNDAY;
int ordinal = today.ordinal()   //6
```

<br>

### compareTo() 메소드

- 매개값으로 주어진 열거 객체를 기준으로 전후로 몇 번째 위치하는지 비교
- 열거 객체가 매개값의 열거 객체보다 순번이 빠르다면 음수가, 순번이 늦다면 양수가 리턴됨

```java
Week day1 = Week.MONDAY;
Week day2 = Week.WEDNESDAY;

int result1 = day1.compareTo(day2);   //-2
int result2 = day2.compareTo(day1);   //2
```

<br>

### valueOf() 메소드

- 매개값으로 주어지는 문자열과 동일한 문자열을 가지는 열거 객체를 리턴
- 외부로부터 문자열을 입력받아 열거 객체로 변환할 때 유용하게 사용 가능

```java
Week weekDay = Week.valueOf("SATURDAY");
```

<br>

### values() 메소드

- 열거 타입의 모든 열거 객체들을 배열로 만들어서 리턴

```java
Week[] days = Week.values();
```
