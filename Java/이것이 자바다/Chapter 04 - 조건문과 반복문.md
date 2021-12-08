# 코드 실행 흐름 제어

- Java 프로그램을 시작하면 main() 메소드의 시작 중괄호 `{`에서부터 끝 중괄호 `}`까지 위에서부터 아래로 실행하는 흐름을 가짐
  - 이러한 흐름을 개발자가 원하는 방향으로 바꿀 수 있도록 해주는 것이 **흐름 제어문** (간단히 **제어문** 이라고 함)
- 제어문은 조건식과 중괄호 `{ }` 블록으로 구성되며, 조건식의 연산 결과에 따라 내부 실행 여부가 결정됨
- 제어문의 종류는 **조건문** 과 **반복문** 이 있음
  - 조건문 : if문, switch문
  - 반복문 : for문, while문, do-while문
- 제어문 블록을 빠져나와 정상 흐름으로 돌아올지는 어떤 제어문을 사용하느냐에 달려 있음
  - 조건문 : 정상 흐름으로 돌아옴
  - 반복문 : Looping 진행
- 제어문 블록 내부에는 또 다른 제어문 사용 가능
  - 따라서 개발자가 원하는 매우 복잡한 흐름 제어도 가능

<br>
<br>

# 조건문 (if문, switch문)

## if문

```java
if (조건식) {
    실행문;
}
```

- 조건식의 결과에 따라 블록 실행 여부 결정
- 조건식에는 true 또는 false 값을 산출할 수 있는 연산식이나, boolean 변수가 올 수 있음
- 중괄호 `{ }` 블록은 여러 개의 실행문을 하나로 묶기 위해 작성됨
  - 만약 실행문이 한 문장 밖에 없다면 생략 가능
    - 하지만 생략할 경우 코드의 가독성이 떨어질 수 있기 때문에 생략하지 않는 것을 추천

<br>
<br>

## if-else문

```java
if (조건식) {
    조건식이 true일 때의 실행문;
} else {
    조건식이 false일 때의 실행문;
}
```

- 조건식의 결과에 따라 실행 블록을 선택
  - 조건식이 true이면 if문의 블록 실행
  - 조건식이 false이면 else문의 블록 실행

<br>

## if-else if-else문

```java
if (조건식1) {
    조건식1이 true일 때의 실행문;
} else if (조건식2) {
    조건식2가 true일 때의 실행문;
} else {
    조건식1과 조건식2 모두 false일 때의 실행문;
}
```

- 처음 if문의 조건식이 false인 경우 다른 조건식의 결과에 따라 실행 블록 선택 가능
- else if문의 수는 제한이 없음
- 여러 개의 조건식 중 true가 되는 블록만 실행하고 전체 if문을 벗어남
- 마지막에 else 블록을 추가하여 모든 조건식이 false일 경우에 대비할 수 있음

※ 주사위 번호를 뽑는 예제 (ver. if문)

```java
public class IfDiceExample {
    public static void main(String[] args) {
        int num = (int) (Math.random() * 6) + 1;

        if (num == 1) {
            System.out.println("1번 당첨");
        } else if (num == 2) {
            System.out.println("2번 당첨");
        } else if (num == 3) {
            System.out.println("3번 당첨");
        } else if (num == 4) {
            System.out.println("4번 당첨");
        } else if (num == 5) {
            System.out.println("5번 당첨");
        } else {
            System.out.println("6번 당첨");
        }
    }
}
```

<br>
<br>

## 중첩 if문

```java
if (조건식1) {
    if (조건식2) {

    } else {

    }
} else {

}
```

- if문 블록 내부에 또 다른 if문 사용 가능
- 중첩의 단계는 제한이 없음
- 사실 if문 뿐만이 아니라 switch문, for문, while문, do-while문 또한 서로 중첩 가능
- Java를 처음 학습하는 사람이 제어문이 어렵다고 느끼는 이유는 이러한 중첩이 생길 경우 실행 흐름을 쉽게 이해하지 못하기 때문

<br>
<br>

## switch문

```java
switch (변수) {
    case 값1 :
        실행문1;
        break;
    case 값2 :
        실행문2;
        break;
    default :
        실행문 기본값;
}
```

- if문과는 달리 조건식이 논리 타입이 아닌, 변수의 값
- if문은 조건식의 결과가 true, false 밖에 없으므로 경우의 수가 많아질수록 else if문이 많아지고 코드가 복잡해질 우려가 있음
  - 이에 비해 switch문은 변수의 값에 따라 실행문이 결정되기 때문에 if문보다 코드가 간결해짐
- 괄호 안의 변수의 값과 동일한 case로 가서 실행문을 실행시키는 방식이며, 만약 해당하는 case가 없다면 default로 가서 실행문을 실행시킴

※ 주사위 번호를 뽑는 예제 (ver. switch문)

```java
public class IfDiceExample {
    public static void main(String[] args) {
        int num = (int) (Math.random() * 6) + 1;

        switch (num) {
            case 1 :
                System.out.println("1번 당첨");
                break;
            case 2 :
                System.out.println("2번 당첨");
                break;
            case 3 :
                System.out.println("3번 당첨");
                break;
            case 4 :
                System.out.println("4번 당첨");
                break;
            case 5 :
                System.out.println("5번 당첨");
                break;
            default :
                System.out.println("6번 당첨");
                break;
        }
    }
}
```

- case 실행문 끝에 `break;`가 있는 이유는 다음 case를 실행하지 말고 switch문을 빠져나가기 위함
  - `break;`가 없으면 다음 case가 연달아 실행되며, case 값과는 상관없이 실행됨

```java
public class SwitchNoBreakCaseExample {
    public static void main(String[] args) {
        int time = (int) (Math.random() * 4) + 8;
        System.out.println("[현재시간: " + time + "시]");

        switch (time) {
            case 8 :
                System.out.println("출근합니다.");
            case 9 :
                System.out.println("회의를 합니다.");
            case 10 :
                System.out.println("업무를 봅니다.");
            default :
                System.out.println("출근합니다.");
        }
    }
}

/*
[현재시간: 9시]
회의를 합니다.
업무를 봅니다.
외근을 나갑니다.
*/
```

- char 타입도 switch문에 사용 가능

```java
public class SwitchCharExample {
    public static void main(String[] args) {
        char grade = 'B';

        switch (grade) {
            case 'A' :
            case 'a' :
                System.out.println("우수 회원입니다.");
                break;
            case 'B' :
            case 'b' :
                System.out.println("일반 회원입니다.");
                break;
            default :
                System.out.println("손님입니다.");
        }
    }
}
```

- Java 6까지는 switch문의 괄호에 정수 타입 변수나 정수값을 산출하는 연산식만 올 수 있었지만 Java 7부터는 String 타입 변수도 사용 가능하게 되었음
