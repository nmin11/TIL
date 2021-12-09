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

<br>
<br>

# 반복문 (for문, while문, do-while문)

- 어떤 작업(코드들)이 반복적으로 실행되도록 할 때 사용됨
- for문과 while문은 서로 변환 가능
  - 하지만 **for문** 은 **반복 횟수를 알고 싶을 때** , **while문** 은 **조건에 따라 반복할 때** 주로 사용

<br>
<br>

## for문

```java
for (초기화식; 조건식; 증감식) {
    실행문;
}
```

- for문 실행 순서
  1. 초기화식이 제일 먼저 실행됨
  2. 조건식을 평가해서 true이면 실행문을 실행시키고, false이면 for문 블록을 실행하지 않고 종료
  3. 블록 안에 실행문을 모두 실행시켰다면 증감식을 실행시킴
  4. 다시 조건식을 평가
  5. 조건식이 false가 나올 때까지 `실행문 → 증감식 → 조건식` 과정을 반복

```java
public class ForPrintFrom1To10Example {
    public static void main(String[] args) {

        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }

    }
}

/*
1
2
3
4
5
6
7
8
9
10
*/
```

- 초기화식은 조건식과 실행문, 증감식에서 사용할 변수를 초기화하는 역할을 하며, 생략 가능함

```java
int i = 1;
for (; i <= 100; i++) { ··· }
```

- 초기화식이 2개 이상일 수도 있고, 증감식도 2개 이상일 수 있으며, 이런 경우 `,`로 구분해서 작성해야 함

```java
for (int i = 0, j = 100; i <= 50 && j >= 50; i++, j--) { ··· }
```

- 초기화식에 선언된 변수는 for문 블록 내부에서 사용되는 로컬 변수이므로, for문을 벗어나서는 사용할 수 없음
  - 변수를 for문 밖에서 선언해주고, 초기화식에서는 값의 대입을 해준다면 for문 밖에서도 사용 가능해짐
- 루프 카운트 변수를 선언할 때 부동소수점 타입을 사용하지 말아야 함

```java
public class ForFloatCounterExample {
    public static void main(String[] args) {

        for (float x = 0.1f; x <= 1.0f; x += 0.1f) {
            System.out.println(x);
        }

    }
}

/*
0.1
0.2
0.3
0.4
0.5
0.6
0.70000005
0.8000001
0.9000001
*/
```

0.1은 float 타입으로 정확하게 표현할 수 없기 때문에 x에 더해지는 실제값은 0.1보다 약간 크다.

<br>

- for문은 또 다른 for문을 내포할 수 있는데, 이것을 중첩된 for문이라고 함

```java
public class ForMultiplicationTableExample {
    public static void main(String[] args) {

        for (int m = 2; m <= 9; m++) {
            System.out.println("*** " + m + "단 ***");
            for (int n = 1; n <= 9; n++) {
                System.out.println(m + " x " + n + " = " + (m * n));
            }
        }

    }
}
```

<br>
<br>

## while문

```java
while (조건식) {
    실행문;
}
```

- 조건식이 true일 경우에 계속해서 반복
- 조건식에는 비교 또는 논리 연산식이 주로 오게 됨
- while문 실행 순서
  1. 조건식을 평가해서 true이면 실행문 실행
  2. 실행문이 모두 실행되면 다시 조건식을 평가
  3. 조건식에서 false가 나올 때까지 `실행문 → 조건식` 과정을 반복

```java
public class WhilePrintFrom1To10Example {
    public static void main(String[] args) {

        int i = 1;
        while (i <= 10) {
            System.out.println(i);
            i++;
        }

    }
}

/*
1
2
3
4
5
6
7
8
9
10
*/
```

- 조건식에는 boolean 변수나 true/false를 산출하는 어떠한 연산식이든 올 수 있음
- 만약 조건식에 `true`를 사용하면 무한 루프를 돌게 됨

<br>
<br>

## do-while문

```java
do {
    실행문;
} while (조건식);
```

- 조건식에 의해 반복 실행한다는 점에서는 while문과 동일
  - 다만 while문은 시작할 때부터 조건식을 검사하지만, do-while문은 **실행문을 우선 실행시키고 실행 결과에 따라서 반복 실행을 계속할지 결정**
- do-while문 실행 순서
  1. 실행문을 우선 실행
  2. 조건식을 평가하여 true가 나오면 `실행문 → 조건식`으로 돌아옴
  3. 조건식이 false가 나올 때까지 반복

```java
import java.util.Scanner;

public class DoWhileExample {
    public static void main(String[] args) {
        System.out.println("메시지를 입력하세요.");
        System.out.println("종료하려면 q를 입력하세요.");

        Scanner scanner = new Scanner(System.in);
        String inputString;

        do {
            System.out.print("> ");
            inputString = scanner.nextLine();
            System.out.println(inputString);
        } while (!inputString.equals("q"));

        System.out.println();
        System.out.println("프로그램 종료");
    }
}

/*
메시지를 입력하세요.
종료하려면 q를 입력하세요.
> 안녕!
안녕!
> 방가!
방가!
> q
q

프로그램 종료
*/
```

<br>

## break문

- 반복문을 실행 중지할 때 사용됨
- switch문을 종료하기 위해서도 사용됨
- 대개 if문과 함께 사용되어 조건식에 따라 반복문을 종료함

```java
public class BreakExample {
    public static void main(String[] args) {

        while (true) {
            int num = (int) (Math.random() * 6) + 1;
            System.out.println(num);

            if (num == 6) {
                break;
            }
        }

        System.out.println("프로그램 종료");

    }
}

/*
2
5
1
6
프로그램 종료
*/
```

- 반복문이 중첩되어 있을 경우 break문은 가장 가까운 반복문만 종료함
  - 바깥쪽 반복문까지 종료시키려면 바깥쪽 반복문에 라벨을 붙이고, `break 라벨;`을 사용하면 됨

```java
public class BreakOutterExample {
    public static void main(String[] args) {

        Outter: for (char upper = 'A'; upper <= 'Z'; upper++) {
            for (char lower = 'a'; lower <= 'z'; lower++) {
                System.out.println(upper + "-" + lower);

                if (lower == 'g') {
                    break Outter;
                }
            }
        }

        System.out.println("프로그램 종료")

    }
}

/*
A-a
A-b
A-c
A-d
A-e
A-f
A-g
프로그램 종료
*/
```

<br>
<br>

## continue문

- 반복문에서만 사용됨
- for문의 증감식이나, while문, do-while문의 조건식으로 되돌아가게 함
- 대개 if문과 함께 사용되며 실행문 전체를 실행하지 않고 다음 반복으로 넘어가게 해줌

```java
public class ContinueExample {
    public static void main(String[] args) {

        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue;
            }
            System.out.println(i);
        }

    }
}

/*
2
4
6
8
10
*/

//사실 초기값을 2로 하고, 증감식을 i+=2로 해주어도 됨 😅
```

<br>
<br>

# ※ 확인문제

### 1. while문과 Math.random() 함수를 이용해서 두 개의 주사위를 던졌을 때 나오는 눈을 `(눈1, 눈2)` 형태로 출력하고, 눈의 합이 5가 아니면 계속 주사위를 던지고 눈의 합이 5이면 실행을 멈추는 코드를 작성해보세요.

```java
class CodeRunner{
    public static void main(String[] args){
        int x = 0;
        int y = 0;

        while (x + y != 5) {
            x = (int) (Math.random() * 6) + 1;
            y = (int) (Math.random() * 6) + 1;

            System.out.println("(" + x + ", " + y + ")");
        }
    }
}
```

<br>

### 2. 중첩 for문을 이용해서 방정식 `4x + 5y = 60`의 모든 해를 구해서 `(x, y)` 형태로 출력해보세요. 단, x와 y는 10 이하의 자연수입니다.

```java
class CodeRunner{
    public static void main(String[] args){

        for (int x = 1; x <= 10; x++) {
            for (int y = 1; y <= 10; y++) {
                if ((4 * x) + (5 * y) == 60) {
                    System.out.println("(" + x + ", " + y + ")");
                }
            }
        }

    }
}
```

<br>

### 3. for문을 이용해서 실행 결과와 같은 삼각형을 출력하세요.

<br>

실행결과

```
*
**
***
****
*****
```

```java
class CodeRunner{
    public static void main(String[] args){

        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

    }
}
```

<br>

### 추가적으로 반쪽짜리 삼각형이 아닌 온전한 삼각형을 만들어보기 위해 시도해보았음

<br>

실행결과

```
    *
   ***
  *****
 *******
*********
```

```java
class CodeRunner{
    public static void main(String[] args){

        int x = 4, y = 1;

        while (x >= 0) {
            for (int i = 1; i <= x; i++) {
                System.out.print(" ");
            }
            for (int i = 1; i <= y; i++) {
                System.out.print("*");
            }

            System.out.println();

            x--;
            y += 2;
        }

    }
}
```

<br>

### 4. while문과 Scanner를 이용해서 키보드로부터 입력된 데이터로 예금, 출금, 조회, 종료 기능을 제공하는 코드를 작성해보세요.

```java
import java.util.Scanner;

class CodeRunner{
    public static void main(String[] args){

        boolean run = true;
        int balance = 0;
        Scanner scanner = new Scanner(System.in);

        while (run) {
            System.out.println("------------------------------------");
            System.out.println("1.예금 | 2.출금 | 3.잔고 | 4.종료");
            System.out.println("------------------------------------");
            System.out.println("선택> ");

            int number = scanner.nextInt();
            int money = 0;

            switch (number) {
                case 1:
                    System.out.println("예금액> ");
                    money = scanner.nextInt();
                    balance += money;
                    break;
                case 2:
                    System.out.println("출금액> ");
                    money = scanner.nextInt();
                    balance -= money;
                    break;
                case 3:
                    System.out.println("잔고> " + balance);
                    break;
                case 4:
                    run = false;
                    break;
            }
            System.out.println();
        }

        System.out.println("프로그램 종료");
        scanner.close();
    }
}

/*
------------------------------------
1.예금 | 2.출금 | 3.잔고 | 4.종료
------------------------------------
선택> 1
예금액> 10000

------------------------------------
1.예금 | 2.출금 | 3.잔고 | 4.종료
------------------------------------
선택> 2
예금액> 2000

------------------------------------
1.예금 | 2.출금 | 3.잔고 | 4.종료
------------------------------------
선택> 3
예금액> 8000

------------------------------------
1.예금 | 2.출금 | 3.잔고 | 4.종료
------------------------------------
선택> 4

프로그램 종료
*/
```
