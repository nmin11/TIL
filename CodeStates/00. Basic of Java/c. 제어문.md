# 제어문

자바 프로그램을 시작하면 main() 메소드의 시작 중괄호부터 끝 중괄호까지 위에서부터 아래로 실행되는 흐름을 갖는다. 이러한 실행 흐름을 개발자가 원하는 방향으로 바꿀 수 있도록 해주는 것이 제어문이다.  
제어문의 종류에는 **조건문** 과 **반복문** 이 있다. 조건문에는 **if문, switch문** 이 있고, 반복문에는 **for문, while문, do-while문** 이 있다.  
제어문 블록이 실행 완료되었을 경우, 다시 제어문 처음으로 돌아갈지, 아니면 제어문 블록을 빠져나와 정상흐름으로 다시 돌아올지는 어떤 제어문을 사용하느냐에 따라 다르다.  
제어문이 실행된 후 다시 제어문 처음으로 돌아가 반복하는 전자는 반복문의 경우를 의미한다. 또한 제어문 블록을 빠져나와 정상 흐름으로 다시 돌아가는 것은 조건문의 경우를 의미한다.

</br>

## 조건문

### if문

if문은 조건식의 결과에 따라 블록 실행 여부가 결정된다. 조건식에는 true 혹은 false 값을 산출할 수 있는 연산식이나, boolean 변수가 올 수 있다. 조건식이 true이면 블록을 실행하고, false이면 블록을 실행하지 않는다. 중괄호{} 블록으로 실행문을 하나로 묶어서 사용되며, 실행할 문장이 하나 밖에 없다면 중괄호를 생략할 수 있지만 생략하지 않고 작성하는 것을 추천한다.

</br>

### if-else문

if문은 else 블록과 함께 사용되어 조건식의 결과에 따라 실행블록을 선택한다. if문의 조건식이 true이면 if문의 블록이 실행되고 조건식이 false이면 else 블록이 실행된다.

</br>

### Switch문

switch문은 변수가 어떤 값을 갖느냐에 따라 실행문이 선택된다. if문은 조건들의 경우의 수가 많아질수록 if-else를 반복적으로 추가해야 하기 때문에 코드가 복잡해진다. 그러나 switch문은 변수의 값에 따라서 실행문이 결정되기 때문에 같은 기능의 if문보다 코드가 간결하다.

```java
switch(dice) {
   case 1:
      System.out.println("1번");
      break;
   case 2:
      System.out.println("2번");
      break;
   case 3:
      System.out.println("3번");
      break;
   case 4:
      System.out.println("4번");
      break;
   case 5:
      System.out.println("5번");
      break;
   case 6:
      System.out.println("6번");
      break;
   default:
      System.out.println("존재하지 않는 숫자 " + dice)
      break;
}
```

</br>

## 반복문

### for문

for문은 주어진 횟수만큼 실행문을 반복 실행할 때 적합한 반복 제어문이다. 한 번 작성된 실행문을 여러 번 반복 실행해주기 때문에 코드를 간결하게 만들어준다.

```java
for((1)초기화식; (2)조건식; (3)증감식) {
   실행문;
   실행문;
}
```

(2)조건식을 충족하는 동안, (1)초기화식부터 시작해서 (3)증감식의 규칙을 따라서 실행한다. 조건이 충족하지 않으면 실행문을 실행하지 않고 끝나게 된다.

</br>

※ 주의할 점 : 루프 카운트 변수를 선언할 때 부동소수점(Floating Point) 타입을 사용하지 말아야 한다.

</br>

### enhanced for문

배열과 컬렉션 객체를 좀 더 쉽게 처리하기 위해서 향상된 for문을 제공한다. 향상된 for문은 반복실행을 위해서 카운터 변수와 증감식을 사용하지 않는다. 배열 및 컬렉션 항목의 개수만큼 반복하고 자동적으로 for문을 빠져나간다.

```java
String[] names = {"kimchi", "loko", "duhan"};
for (String name : names) {
   System.out.println(name + "님은 자바 프로그래머입니다.")
}

/*
kimchi님은 자바 프로그래머입니다.
loko님은 자바 프로그래머입니다.
duhan님은 자바 프로그래머입니다.
*/
```

for문의 괄호() 안에는 배열에서 꺼낸 항목을 저장할 변수 선언, 콜론(:), 그리고 사용할 배열이 작성된다. 향상된 for문을 처음 실행할 때, names 배열에서 가져올 첫 번째 값이 존재하는지 확인하고 값이 존재하면 해당값을 변수인 name에 저장한다. 그리고 그 안의 실행문을 실행한다. 블록 내부의 실행문이 모두 실행되면 다시 names 배열에서 가져올 값이 있는지 확인하고 만약 가져올 다음 항목이 없다면 자동적으로 for문이 종료된다.

</br>

### while문

while문은 조건식이 true일 경우에 계속해서 반복한다. 조건식에는 비교 혹은 논리 연산식이 주로 오는데, 조건식이 false이면 반복 행위를 멈추고 while문을 종료한다.

```java
while(doCoding) {
   sleepingPoint++;
   System.out.println("졸린 점수 : " + sleepingPoint);
   if (sleepingPoint > 100) {
      doCoding = false;
   }
}
```

</br>

### do-while문

do-while문은 조건식에 의해 반복 실행한다는 점에서 while문과 동일하다. 그런데 while문은 시작할 때부터 조건식을 검사하여 블록 내부를 실행할지 결정하고, do-while문은 블록 내부의 실행문을 우선 실행시키고 실행 결과에 따라서 반복 실행을 계속할지 결정한다.

```java
public class Main {
   public static void main(String args[]) {
      int arr[] = {11, 24, 6, 18, 2, 20};
      int i = 0;
      do {
         System.out.println(arr[i]);
         i++;
      } while(i < 3);
   }
}

//11, 24, 6
```

</br>

### break문

break문은 반복문을 실행 중지할 때 사용되며, switch문에서도 break를 사용해서 실행을 중지할 수 있다. 대개 if문과 같이 사용되며, if문의 조건식에 따라 반복문을 종료할 때 사용된다.

</br>

### continue문

continue문은 반복문에서만 사용되며, 블록 내부에서 continue문이 실행되면 for문의 증감문이나 while, do-while문의 조건식으로 이동하여 작동한다. break문과의 차이점은 종료 여부이다. 따라서 break문과 마찬가지로 보통 if문과 함께 사용되어 if문의 조건을 만족하는 경우 continue문을 실행하여 그 이후의 코드를 실행하지 않고 다음 반복으로 넘어간다.

```java
for (int i = 0; i < 10; i++) {
   if (i % 2 == 0) {
      continue;
   }
   System.out.println(i);
}

/*
1, 3, 5, 7, 9
*/
```
