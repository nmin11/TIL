# 멀티 스레드 개념

## 프로세스와 스레드

- **Process** : 운영체제에서 실행 중인 하나의 애플리케이션
  - 사용자가 애플리케이션을 실행하면 운영체제로부터 실행에 필요한 메모리를 할당받아 애플리케이션의 코드를 실행
- 하나의 애플리케이션이 다중 프로세스를 만들기도 함
  - 예를 들어 Chrome 브라우저를 2개 실행했다면 2개의 Chrome 프로세스가 생성된 것
- **Multi Tasking** : 2가지 이상의 작업을 동시에 처리하는 것
  - 운영체제는 멀티 태스킹을 할 수 있도록 CPU 및 메모리 자원을 프로세스마다 적절히 할당해주고, 병렬로 실행시킴
- 멀티 태스킹이 꼭 멀티 프로세스를 의미하는 것은 아님
  - 미디어 플레이어가 영상 재생과 음악 재생을 동시에 하고, 메신저가 채팅 송수신과 파일 송수신을 동시에 하듯,<br>하나의 프로세스가 2가지 이상의 작업을 할 수도 있음
- **Multi Thread** : 하나의 스레드는 하나의 코드 실행 흐름 → 한 프로세스 내에 여러 개의 코드 실행 흐름이 있게 할 수도 있음
  - thread는 사전적 의미로 한 가닥의 실이라는 뜻<br>→ 한 가지 작업을 실행하기 위해 순차적으로 실행할 코드를 실처럼 이어 놓았다고 해서 유래된 이름
- 멀티 프로세스가 애플리케이션 단위의 멀티 태스킹이라면 멀티 스레드는 애플리케이션 내부에서의 멀티 태스킹

![Multi Process & Multi Thread](https://github.com/nmin11/TIL/blob/main/JVM/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/multi%20process.png)

- 멀티 프로세스들은 운영체제에서 할당받은 자신의 메모리를 가지고 실행하기 때문에 서로 독립적
  - 따라서 하나의 프로세스에서 오류가 발생해도 다른 프로세스에 영향을 미치지 않음
- 하지만 멀티 스레드는 하나의 프로세스 내부에서 생성되기 때문에<br>하나의 스레드가 예외를 발생시키면 프로세스 자체가 종료될 수 있음
  - 따라서 멀티 스레드에서는 예외 처리에 만전을 기해야 함
- 멀티 스레드는 다양한 곳에서 사용됨
  - 대용량 데이터의 처리 시간을 줄이기 위해 데이터를 분할해서 병렬로 처리할 때
  - UI를 가지고 있는 애플리케이션에서 네트워크 통신을 하기 위해
  - 다수 클라이언트의 요청을 처리하는 서버를 개발할 때

<br>
<br>

## 메인 스레드

- 모든 Java 애플리케이션은 메인 스레드가 `main()` 메소드를 실행하면서 시작됨
- 메인 스레드는 `main()` 메소드의 첫 코드부터 아래로 순차적으로 실행되며,<br>마지막 코드를 실행하거나 return문을 만나면 실행 종료됨
- 메인 스레드는 필요에 따라 작업 스레드들을 만들어서 병렬로 코드를 실행할 수 있음
  - 즉, 멀티 스레드를 생성해서 멀티 태스킹을 수행할 수 있다는 의미
- 싱글 스레드 애플리케이션에서는 메인 스레드가 종료하면 프로세스도 종료되지만,<br>멀티 스레드 애플리케이션에서는 실행 중인 스레드가 하나라도 있으면 프로세스가 종료되지 않음

<br>
<br>

# 작업 스레드 생성과 실행

- 멀티 스레드로 실행하는 애플리케이션을 개발하려면 먼저 몇 개의 작업을 병렬로 실행할지 결정하고 각 작업별로 스레드를 생성해야 함
- 어떤 Java 애플리케이션이건 메인 스레드는 반드시 존재하기 때문에 메인 작업 이외에 추가적인 병렬 작업의 수만큼 스레드를 생성하면 됨
- Java에서는 작업 스레드도 객체로 생성되기 때문에 클래스가 필요함
  - `java.lang.Thread` 클래스를 직접 객체화해서 생성할 수도 있고, Thread를 상속해서 하위 클래스를 만들어 생성할 수도 있음

<br>
<br>

## Thread 클래스로부터 직접 생성

```java
Thread thread = new Thread(Runnable target);
```

- `java.lang.Thread` 클래스로부터 작업 스레드 객체를 직접 생성하려면 **Runnable** 을 매개값으로 갖는 생성자를 호출해야 함
  - Runnable은 작업 스레드가 실행할 수 있는 코드를 가지고 있는 객체라고 해서 붙여진 이름
- Runnable은 인터페이스 타입이기 때문에 구현 객체를 만들어서 대입해야 함
  - 구현 클래스는 Runnable의 `run()` 메소드를 재정의해서 작업 스레드가 실행할 코드를 작성해야 함

```java
class Task implements Runnable {
    public void run() {
        작업 스레드 실행 코드;
    }
}
```

- Runnable은 작업 내용을 가지고 있는 객체이지, 실제 스레드는 아님
  - Runnable 구현 객체를 생성한 후, 이를 매개값으로 해서 Thread 생성자를 호출해야 비로소 작업 스레드가 생성됨

```java
Runnable task = new Task();
Thread thread = new Thread(task);
```

- 코드를 절약하기 위해 Thread 생성자를 호출할 때 Runnable 익명 객체를 매개값으로 사용할 수 있음
  - 오히려 더 많이 사용되는 방법!

```java
Thread thread = new Thread(new Runnable() {
    public void run() {
        스레드 실행 코드;
    }
});
```

- Runnable 인터페이스는 `run()` 메소드 하나만 정의되어 있기 때문에 함수적 인터페이스<br>→ 람다식을 매개값으로 사용해서 코드를 더 줄일 수 있음

```java
Thread thread = new Thread(() -> {
    스레드 실행 코드;
});
```

- 작업 스레드는 생성 시점에 실행되는 것이 아니라, `start()` 메소드를 호출해야 실행됨

```java
thread.start();
```

<br>

※ beep음을 발생시키면서 동시에 프린팅하는 예제 (Thread 클래스로부터 직접 생성)

```java
public class BeepPrintExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            Toolkit toolkit = Toolkit.getDefaultToolkit();
            for (int i = 0; i < 5; i++) {
                toolkit.beep();
                try { Thread.sleep(500); } catch (Exception e) {}
            }
        });
        thread.start();

        for (int i = 0; i < 5; i++) {
            System.out.println("띵");
            try { Thread.sleep(500); } catch (Exception e) {}
        }
    }
}
```

<br>
<br>

## Thread 하위 클래스로부터 생성

```java
public class WorkerThread extends Thread {
    @Override
    public void run() {
        스레드 실행 코드;
    }
}
Thread thread = new WorkerThread();
```

- 작업 스레드가 실행할 작업을 Runnable로 만들지 않고,<br>Thread의 하위 클래스로 작업 스레드를 정의하면서 작업 내용을 포함시킬 수도 있음
- Thread 클래스를 상속한 후 `run()` 메소드를 재정의해서 스레드가 실행할 코드를 작성하면 됨
- 코드를 절약하기 위해 Thread 익명 객체로 작업 스레드 객체를 생성할 수 있음

```java
Thread thread = new Thread() {
    public void run() {
        스레드 실행 코드;
    }
}
```

<br>

※ beep음을 발생시키면서 동시에 프린팅하는 예제 (Thread 하위 클래스로부터 생성)

```java
public class BeepPrintExample2 {
    public static void main(String[] args) {
        Thread thread = new Thread() {
            @Override
            public void run() {
                Toolkit toolkit = Toolkit.getDefaultToolkit();
                for (int i = 0; i < 5; i++) {
                    toolkit.beep();
                    try { Thread.sleep(500); } catch (Exception e) {}
                }
            }
        };
        thread.start();

        for (int i = 0; i < 5; i++) {
            System.out.println("띵");
            try { Thread.sleep(500); } catch (Exception e) {}
        }
    }
}
```

<br>
<br>

## 스레드의 이름

- 스레드는 자신의 이름을 가짐
- 큰 역할을 하는 것은 아니지만 디버깅할 때 어떤 스레드가 어떤 작업을 하는지 조사할 목적으로 가끔 사용됨
- 메인 스레드는 `main`이라는 이름을 가지고 있고, 우리가 직접 생성한 스레드는 자동적으로 `Thread-n`이라는 이름으로 설정됨
- 다른 이름으로 설정하고 싶다면 Thread의 `setName()` 메소드를 호출하면 됨

```java
thread.setName("스레드 이름");
```

- 스레드의 이름을 알고 싶은 경우에는 Thread의 `getName()` 메소드를 호출하면 됨

```java
thread.getName();
```

- `setName()`과 `getName()`은 Thread의 인스턴스 메소드이므로 스레드 객체의 참조가 필요
- 만약 스레드 객체의 참조를 가지고 있지 않다면,<br>Thread의 정적 메소드인 `currentThread()`로 현재 실행 중인 스레드의 참조를 얻을 수 있음

```java
Thread thread = Thread.currentThread();
```

<br>
<br>

# 스레드 우선순위

- 멀티 스레드는 **동시성(Concurrency)** 또는 **병렬성(Parallelism)** 으로 실행됨
  - 동시성은 멀티 작업을 위해 하나의 코어에서 멀티 스레드가 번갈아가며 실행하는 성질
  - 병렬성은 멀티 작업을 위해 멀티 코어에서 개별 스레드를 동시에 실행하는 성질
- 싱글 코어 CPU를 이용한 멀티 스레드 작업은 워낙 빨라서 병렬적으로 실행되는 것처럼 보이지만,<br>사실은 번갈아가며 실행하는 동시성 작업
- 스레드 스케줄링 : 스레드의 개수가 코어의 수보다 많을 경우, 스레드를 어떤 순서에 의해 동시성으로 실행할 것인지 결정하는 것
  - 스레드들은 스레드 스케줄링에 의해 아주 짧은 시간에 번갈아가면서 그들의 `run()` 메소드를 조금씩 실행함
- Java의 스레드 스케줄링은 **우선순위(Priority)** 방식과 **순환 할당(Round-Robin)** 방식을 사용함
  - 우선순위 방식은 우선순위가 높은 스레드가 실행 상태를 더 많이 가지도록 스케줄링하는 것
  - 순환 할당 방식은 **시간 할당량(Time Slice)** 을 정해서<br>하나의 스레드를 정해진 시간만큼 실행하고 다시 다른 스레드를 실행하는 방식
  - 우선순위 방식은 스레드 객체에 우선순위 번호를 부여할 수 있기 때문에 개발자가 코드로 제어할 수 있음
  - 순환 할당 방식은 JVM에 의해서 정해지기 때문에 개발자가 코드로 제어할 수 없음
- 우선순위 방식에서 우선순위는 1~10까지 부여되는데, 1이 가장 우선순위가 낮고 10이 우선순위가 가장 높음
- 우선순위를 부여하지 않으면 모든 스레드는 기본적으로 5의 우선순위를 할당받음
- 우선순위를 변경하고 싶다면 Thread 클래스의 `setPriority()` 메소드를 이용하면 됨

```java
thread.setPriority(Thread.MAX_PRIORITY);  //10
thread.setPriority(Thread.NORM_PRIORITY); //5
thread.setPriority(Thread.MIN_PRIORITY);  //1
```

<br>
<br>

# 동기화 메소드와 동기화 블록

## 공유 객체를 사용할 때 주의할 점

- 멀티 스레드 프로그램에서는 스레드들이 객체를 공유해서 작업해야 하는 경우가 있음
- 이 경우, 스레드 A를 사용하던 객체가 스레드 B에 의해 상태가 변경될 수도 있음

<br>
<br>

## 동기화 메소드 및 동기화 블록

- 스레드가 사용 중인 객체를 다른 스레드가 변경할 수 없도록 하려면 작업이 끝날 때까지 객체에 잠금을 걸어야 함
- **임계 영역(critical section)** : 멀티 스레드 프로그램에서 단 하나의 스레드만 실행할 수 있는 코드 영역
- Java는 임계 영역을 지정하기 위해 동기화 메소드와 동기화 블록을 제공함
  - 스레드가 객체 내부의 동기화 메소드 또는 블록에 들어가면 즉시 객체에 잠금을 걸게 됨
- 동기화 메소드를 만드는 방법 : 메소드 선언에 `synchronized` 키워드를 붙이면 됨
  - `synchronized` 키워드는 인스턴스와 정적 메소드 어디든 붙일 수 있음

```java
public synchronized void method() {
  임계 영역;
}
```

- 메소드 전체가 아니라 일부만 임계 영역으로 만들고자 한다면 동기화 블록을 만들면 됨

```java
public void method() {
  synchronized(this | 공유객체) {
    임계 영역;
  }
}
```

- 만약 두 스레드가 같은 임계 영역을 실행하면 한 스레드의 실행을 마칠 때까지 기다린 후, 다음 스레드가 실행하게 됨

<br>
<br>

# 스레드 상태

- 스레드 객체를 생성하고 `start()` 메소드를 호출하면 스레드는 곧바로 실행되는 것이 아니라 실행 대기 상태가 됨
  - **실행 대기 상태** : 아직 스케줄링이 되지 않아서 실행을 기다리고 있는 상태
- 실행 대기 상태에 있는 스레드 중에서 스레드 스케줄링으로 선택된 스레드가 CPU를 점유하고 `run()` 메소드를 실행하며, 이를 **실행(Running) 상태**라고 함
  - 실행 상태의 스레드는 `run()` 메소드를 모두 실행하기 전에 스케줄링에 의해 다시 실행 대기 상태로 돌아갈 수 있음
  - 그리고 스케줄링에 의해 실행 대기 상태에 있는 다른 스레드가 선택되어 실행 상태가 됨
- 이렇듯 스레드는 실행 대기 상태와 실행 상태를 번갈아가며 자신의 `run()` 메소드를 조금씩 실행함
- 실행 상태에서 `run()` 메소드가 종료되면 더 이상 실행할 코드가 없기 때문에 스레드의 실행은 멈추게 되며, 이를 **종료 상태**라고 함
- 경우에 따라서 스레드는 실행 상태에서 **일시 정지 상태** 로 가기도 함
  - 일시 정지 상태 : 스레드가 실행할 수 없는 상태
  - 일시 정지 상태에는 WAITING, TIMED_WAITING, BLOCKED가 있음
  - 스레드가 다시 실행 상태로 가기 위해서는 일시 정지 상태에서 실행 대기 상태로 가야 함
- 스레드의 상태를 코드에서 확인하려면 Thread 클래스의 `getState()` 메소드를 활용하면 됨
  - `getState()` 메소드는 스레드 상태에 따라서 Thread.State 열거 상수를 리턴함

|   상태    |   열거 상수   | 설명                                                      |
| :-------: | :-----------: | :-------------------------------------------------------- |
| 객체 생성 |      NEW      | 스레드 객체 생성 후 `start()` 메소드가 호출되지 않은 상태 |
| 실행 대기 |   RUNNABLE    | 언제든 실행 상태로 갈 수 있는 상태                        |
| 일시 정지 |    WAITING    | 다른 스레드의 통지를 기다리는 상태                        |
| 일시 정지 | TIMED_WAITING | 주어진 시간만큼 기다리는 상태                             |
| 일시 정지 |    BLOCKED    | 사용할 객체의 락이 풀릴 때까지 기다리는 상태              |
|   종료    |  TERMINATED   | 실행을 마친 상태                                          |

<br>
<br>

# 스레드 상태 제어

- 스레드 상태 제어 : 실행 중인 스레드의 상태를 변경하는 것
- 멀티 스레드 프로그램을 만들기 위해서는 정교한 스레드 상태 제어가 필요함

![스레드 상태 제어](https://github.com/nmin11/TIL/blob/main/JVM/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/%EC%8A%A4%EB%A0%88%EB%93%9C%20%EC%83%81%ED%83%9C%20%EC%A0%9C%EC%96%B4.png)

※ 취소선을 가진 메소드는 스레드의 안전성을 해친다고 하여 더 이상 사용하지 않도록 Deprecated 된 메소드들

|                           메소드                            | 설명                                                                                                                                                                                                      |
| :---------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                         interrupt()                         | 일시 정지 상태의 스레드에 `InterruptedException` 예외를 발생시켜서,<br>catch문에서 실행 대기 상태로 가거나 종료 상태로 갈 수 있도록 함                                                                    |
|                   notify()<br>notifyAll()                   | 동기화 블록 내에서 `wait()` 메소드에 의해<br>일시 정지 상태에 있는 스레드를 실행 대기 상태로 만듦                                                                                                         |
|                          resume()                           | `suspend()` 메소드에 의해<br>일시 정지 상태에 있는 스레드를 실행 대기 상태로 만듦                                                                                                                         |
|     sleep(long millis)<br>sleep(long millis, int nanos)     | 주어진 시간 동안 스레드를 일시 정지 상태로 만듦<br>주어진 시간이 지나면 자동적으로 실행 대기 상태가 됨                                                                                                    |
| join()<br>join(long millis)<br>join(long millis, int nanos) | 이 메소드를 호출한 스레드는 일시 정지 상태가 됨<br>실행 대기 상태가 되려면 이 메소드를 멤버로 가지는 스레드가 종료되거나,<br>매개값으로 주어진 시간이 지나야 함                                           |
| wait()<br>wait(long millis)<br>wait(long millis, int nanos) | 동기화 블록 내에서 스레드를 일시 정지 상태로 만듦<br>매개값으로 주어진 시간이 지나면 자동적으로 실행 대기 상태가 됨<br>시간이 주어지지 않으면 `notify()` `notifyAll()`에 의해 실행 대기 상태로 갈 수 있음 |
|                          suspend()                          | 스레드를 일시 정지 상태로 만듦<br>`resume()` 메소드를 호출하면 다시 실행 대기 상태가 됨                                                                                                                   |
|                           yield()                           | 실행 중에 우선순위가 동일한 다른 스레드에게 실행을 양보하고 실행 대기 상태가 됨                                                                                                                           |
|                           stop()                            | 스레드를 즉시 종료시킴                                                                                                                                                                                    |

- Object 클래스의 메소드 : `wait()` `notify()` `notifyAll()`
  - 나머지는 전부 Thread 클래스의 메소드들

<br>
<br>

## sleep() : 주어진 시간 동안 일시 정지

```java
try {
  Thread.sleep(1000);
} catch (InterruptedException e) {
  // interrupt() 메소드 호출 시 실행
}
```

- Thread 클래스의 정적 메소드
- 주어진 시간 동안 일시 정지 상태가 되고, 해당 시간 이후에 실행 대기 상태가 됨
- 매개값으로 주는 시간을 밀리세컨드(1/1000초) 단위로 주어야 함

<br>
<br>

## yield() : 다른 스레드에게 실행 양보

- 스레드가 처리하는 작업은 반복적인 실행을 위해 for문이나 while문을 포함하는 경우가 많음
  - 가끔은 이런 반복문들이 무의미한 반복을 하는 경우가 있음
- 이런 경우에 해당하는 스레드는 다른 스레드에게 실행을 양보하고 실행 대기 상태로 가는 것이 전체 프로그램 성능에 도움이 됨
- `yield()` 메소드를 호출한 스레드는 실행 대기 상태로 돌아가고 동일한 우선순위 또는 높은 우선순위를 갖는 다른 스레드에게 실행 기회를 줌

<br>
<br>

## join() : 다른 스레드의 종료를 기다림

- 스레드는 다른 스레드와 독립적으로 실행하는 것이 기본이지만<br>다른 스레드가 종료될 때까지 기다렸다가 실행해야 하는 경우가 발생할 수도 있음

```java
public class SumThread extends Thread {
  private long sum;

  public long getSum() {
    return sum;
  }

  public void setSum(long sum) {
    this.sum = sum;
  }

  public void run() {
    for (int i = 1; i <= 100; i++) {
      sum += i;
    }
  }
}
```

```java
public class JoinExample {
  public static void main(String[] args) {
    SumThread sumThread = new SumThread();
    sumThread.start();

    try {
      sumThread.join();
    } catch (InterruptedException e) {}

    System.out.println("1 ~ 100 까지의 합 : " + sumThread.getSum());
  }
}

/*
1 ~ 100 까지의 합 : 5050
*/
```

<br>
<br>

## wait() / notify() / notifyAll() : 스레드 간 협업

- 2개의 스레드를 교대로 번갈아가며 실행해야 할 경우가 있음
- 정확한 교대 작업이 필요할 경우, 자신의 작업이 끝나면 상대방 스레드를 일시 정지 상태에서 풀어주고 자신은 일시 정지 상태로 만드는 과정이 필요함
- 이 방법의 핵심은 **공유 객체**
  - 공유 객체는 두 스레드가 작업할 내용을 각각 동기화 메소드로 구분해 놓음
  - 한 스레드가 작업을 완료하면 `notify()` 메소드를 호출해서 일시 정지 상태에 있는 다른 스레드를 실행 대기 상태로 만들고,<br>자신은 `wait()` 메소드를 호출하여 일시 정지 상태로 만듦
  - `wait()` 메소드의 매개 변수로 시간을 지정해서 굳이 `notify()` 메소드가 필요하지 않도록 할 수도 있음
- `notify()`는 `wait()`에 의해 일시 정지된 스레드 중 1개를 실행 대기 상태로 만들고<br>`notifyAll()`은 `wait()`에 의해 일시 정지된 모든 스레드들을 실행 대기 상태로 만듦
- 주의할 점 : 이 메소드들은 동기화 메소드 또는 동기화 블록에서만 사용 가능

```java
public class DataBox {
  private String data;

  public synchronized String getData() {
    if (this.data == null) {
      try {
        wait();
      } catch (InterruptedException e) {}
    }

    String returnValue = data;
    System.out.println("Consumer가 읽은 데이터 : " + returnValue);
    data = null;
    notify();
    return returnValue;
  }

  public synchronized void setData(String data) {
    if (this.data != null) {
      try {
        wait();
      } catch (InterruptedException e) {}
    }
    this.data = data;
    System.out.println("Producer가 생성한 데이터 : " + data);
    notify();
  }
}
```

```java
public class ProducerThread extends Thread {
  private DataBox dataBox;

  public ProducerThread(DataBox dataBox) {
    this.dataBox = dataBox;
  }

  @Override
  public void run() {
    for (int i = 1; i <= 3; i++) {
      String data = "Data-" + i;
      dataBox.setData(data);
    }
  }
}
```

```java
public class ComsumerThread extends Thread {
  private DataBox dataBox;

  public ComsumerThread(DataBox dataBox) {
    this.dataBox = dataBox;
  }

  @Override
  public void run() {
    for (int i = 1; i <= 3; i++) {
      String data = dataBox.getData();
    }
  }
}
```

```java
public class WaitNotifyExample {
  public static void main(String[] args) {
    DataBox dataBox = new DataBox();

    ProducerThread producer = new ProducerThread(dataBox);
    ComsumerThread producer = new ComsumerThread(dataBox);

    producer.start();
    consumer.start();
  }
}

/*
Produer가 생성한 데이터 : Data-1
Consumer가 읽은 데이터 : Data-1
Produer가 생성한 데이터 : Data-2
Consumer가 읽은 데이터 : Data-2
Produer가 생성한 데이터 : Data-3
Consumer가 읽은 데이터 : Data-3
*/
```

<br>
<br>

## stop 플래그 / interrupt() : 스레드의 안전한 종료

- 스레드는 자신의 `run()` 메소드가 모두 실행되면 자동적으로 종료됨
- 경우에 따라서는 실행 중인 스레드를 즉시 종료할 수도 있음
  - 예를 들어 사용자가 동영상을 끝까지 보지 않고 중지를 요청했을 때
- 스레드를 즉시 종료시키기 위해서 `stop()`메소드를 제공하고 있지만, 이 메소드는 Deprecated 되었음
  - `stop()` 메소드로 스레드를 갑자기 종료하면 스레드가 사용 중이던 자원들이 불안전한 상태로 남겨지기 때문
- 그러므로 스레드를 안전하게 종료시키기 위한 방법들을 알아두어야 함

<br>

### stop 플래그를 이용하는 방법

- 스레드가 `run()` 메소드를 모두 실행하고 안전하게 종료되도록 유도하는 것이 최선의 방법
- 그러므로 stop 플래그를 활용하여 `run()` 메소드의 안전한 종료를 유도할 수 있음

```java
public class PrintThread1 extends Thread {
  private boolean stop;

  public void setStop(boolean stop) {
    this.stop = stop;
  }

  public void run() {
    while (!stop) {
      System.out.println("실행 중");
    }
    System.out.println("자원 정리");
    System.out.println("실행 종료");
  }
}
```

```java
public class StopFlagExample {
  public static void main(String[] args) {
    PrintThread1 printThread = new PrintThread1();
    printThread.start();

    try { Thread.sleep(1000); } catch (InterruptedException e) {}

    printThread.setStop(true);
  }
}
```

<br>

### interrupt() 메소드를 이용하는 방법

- `interrupt()` 메소드는 스레드가 일시 정지 상태에 있을 때 `InterruptedException` 예외를 발생시키는 역할을 함
- 이를 활용하면 `run()` 메소드를 정상 종료시킬 수 있음

```java
public class PrintThread2 extends Thread {
  public void run() {
    while (true) {
      System.out.println("실행 중");
      if (Thread.interrupted()) {
        break;
      }
    }
    System.out.println("자원 정리");
    System.out.println("실행 종료");
  }
}
```

```java
public class InterruptExample {
  public static void main(String[] args) {
    Thread thread = new PrintThread2();
    thread.start();

    try { Thread.sleep(1000); } catch (InterruptedException e) {}

    thread.interrupt();
  }
}
```

- 주의할 점 : 스레드가 실행 대기 또는 실행 상태에 있을 때 `interrupt()` 메소드가 실행되면 즉시 `InterruptException`이 발생하는 것이 아님
  - 스레드가 미래에 일시 정지 상태가 되어야 예외가 발생함
  - 따라서 스레드가 일시 정지 상태가 되지 않으면 `interrupt()` 메소드 호출은 아무런 의미가 없음
  - 짧은 시간이나마 일시 정지 상태를 만들기 위해 `Thread.sleep(1)`을 이용하거나,<br>일시 정지를 만들지 않고도 `interrupt`호출 여부를 알 수 있게 해주는 `interrupted()` 혹은 `isInterrupted`를 활용하면 됨

<br>
<br>

# Daemon 스레드

- 주 스레드의 작업을 돕는 보조적인 역할을 수행하는 스레드
- 주 스레드가 종료되면 데몬 스레드는 강제 종료됨
- 이외에는 일반 스레드와 크게 차이가 없음
- 예시 : 워드프로세서의 자동 저장, 미디어 플레이어의 영상 및 음악 재생, 가비지 컬렉터
- 생성 방법 : 주 스레드가 데몬이 될 스레드의 `setDaemon(true)` 호출

```java
public static void main(String[] args) {
  AutoSaveThread thread = new AutoSaveThread();
  thread.setDaemon(true);
  thread.start();
}
```

- 주의할 점 : `start()` 호출 이후에 `setDaemon(true)`을 호출하면 `IllegalThreadStateException` 발생
- 현재 실행 중인 스레드가 데몬 스레드인지 여부는 `isDaemon()`을 호출해서 확인할 수 있음

<br>
<br>

# 스레드 그룹

- 관련된 스레드를 묶어서 관리할 목적으로 이용됨
- JVM 실행 시 `system` 스레드 그룹을 만들고, JVM 운영에 필요한 스레드들을 생성해서 `system` 그룹에 포함시킴
  - 그리고 `system`의 하위 스레드 그룹으로 `main`을 만들고 메인 스레드를 `main` 스레드 그룹에 포함시킴
- 스레드는 반드시 하나의 스레드 그룹에 포함됨
  - 명시적으로 그룹에 포함시키지 않으면 기본적으로 자신을 생성한 스레드와 같은 스레드 그룹에 속하게 됨
  - 우리가 생성하는 작업 스레드는 대부분 `main` 스레드가 생성하므로 기본적으로 main 스레드 그룹에 속하게 됨

<br>
<br>

## 스레드 그룹 이름 얻기

```java
ThreadGroup group = Thread.currentThread().getThreadGroup();
String name = group.getName();
```

- Thread의 정적 메소드인 `getAllStackTraces()`를 이용하면 프로세스 내에서 실행되는 모든 스레드에 대한 정보를 얻을 수 있음

```java
Map<Thread, StackTraceElement[]> map = Thread.getAllStackTraces();
```

리턴하는 Map 타입의 객체에서 key는 스레드 객체이고 value는 스레드의 상태 기록들을 갖고 있는 StackTraceElement[] 배열이다.

<br>
<br>

## 스레드 그룹 생성

```java
ThreadGroup tg = new ThreadGroup(String name);
ThreadGroup tg = new ThreadGroup(ThreadGroup parent, String name);
```

- 스레드 그룹 생성 시 부모 스레드 그룹을 지정하지 않으면 현재 스레드가 속한 그룹의 하위 그룹으로 생성됨
- 스레드 그룹을 먼저 생성한 후, 이 그룹에 스레드를 포함시키려면 Thread 객체를 생성할 때 생성자 매개값으로 스레드 그룹을 지정하면 됨

```java
Thread t = new Thread(ThreadGroup group, Runnable target);
Thread t = new Thread(ThreadGroup group, Runnable target, String name);
Thread t = new Thread(ThreadGroup group, Runnable target, String name, long stackSize);
Thread t = new Thread(ThreadGroup group, String name);
```

- 매개값 중 Runnable 타입은 Runnable 구현 객체를 뜻하고, String 타입은 스레드의 이름이며,<br>long 타입은 JVM이 이 스레드에 할당할 stack 크기

<br>
<br>

## 스레드 그룹의 일괄 interrupt()

- 스레드 그룹의 `interrupt()` 메소드를 이용하면 그룹 내에 포함된 모든 스레드들을 일괄 interrupt할 수 있음
- 스레드 그룹의 `interrupt()` 메소드는 소속된 스레드의 `interrupt()` 메소드를 호출할 뿐<br>개별 스레드에서 발생하는 `InterruptedException`에 대한 예외처리를 하지 않음
  - 따라서 안전한 종료를 위해서는 개별 스레드가 예외 처리를 해야 함
- 스레드 그룹에는 `suspend()` `resume()` `stop()` 메소드들이 있지만 모두 Deprecated 되었음
- 스레드 그룹을 통해 사용되는 주요 메소드들

| 메소드                          | 설명                                                                                          |
| :------------------------------ | :-------------------------------------------------------------------------------------------- |
| int activeCount()               | 현재 그룹 및 하위 그룹에서 활동 중인 모든 스레드의 수 리턴                                    |
| int activeGroupCount()          | 현재 그룹에서 활동 중인 모든 하위 그룹의 수 리턴                                              |
| void checkAccess()              | 현재 스레드가 스레드 그룹을 변경할 권한이 있는지 체크<br>만약 없다면 `SecurityException` 발생 |
| void destroy()                  | 현재 그룹 및 하위 그룹 모두 삭제<br>단, 그룹 내 모든 스레드들이 종료 상태일 것                |
| boolean isDestroyed()           | 현재 그룹이 삭제되었는지 여부 리턴                                                            |
| int getMaxPriority()            | 현재 그룹에 포함된 스레드가 가질 수 있는 최대 우선순위 리턴                                   |
| void setMaxPrority(int pri)     | 현재 그룹에 포함된 스레드가 가질 수 있는 최대 우선순위 설정                                   |
| String getName()                | 현재 그룹의 이름 리턴                                                                         |
| ThreadGroup getParent()         | 현재 그룹의 부모 그룹 리턴                                                                    |
| boolean parentOf(ThreadGroup g) | 현재 그룹이 매개값으로 지정한 스레드 그룹의 부모인지 여부 리턴                                |
| boolean isDaemon()              | 현재 그룹이 데몬 그룹인지 여부 리턴                                                           |
| void setDaemon(boolean daemon)  | 현재 그룹을 데몬 그룹으로 설정                                                                |
| void list()                     | 현재 그룹에 포함된 스레드와 하위 그룹에 대한 정보를 출력                                      |
| void interrupt()                | 현재 그룹에 포함된 모든 스레드들을 interrupt                                                  |

<br>
<br>

# 스레드풀

![스레드풀](https://github.com/nmin11/TIL/blob/main/Java/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/Thread%20Pool.png)

- 병렬 작업 처리가 많아지면 스레드 개수가 증가되고 그에 따른 스레드 생성과 스케줄링으로 인해<br>메모리 사용량이 늘어나서 애플리케이션 성능이 저하됨
- 갑작스런 병렬 작업의 폭증으로 인한 스레드 폭증을 막기 위해 **ThreadPool** 을 이용해야 함
- 스레드풀은 작업 처리에 사용되는 스레드를 제한된 개수만큼 정해 놓고<br>작업 큐에 들어오는 작업들을 하나씩 스레드가 맡아 처리하게 함
  - 작업 처리가 끝난 스레드는 다시 작업 큐에서 새로운 작업을 가져와서 처리함
  - 그렇기 때문에 작업 처리 요청이 폭증되어도 스레드의 전체 개수가 늘어나지 않게 됨
- Java는 스레드풀을 생성하고 사용할 수 있도록 `java.util.concurrent` 패키지에서<br>ExecutorService 인터페이스와 Executors 클래스를 제공함
  - Executors의 다양한 정적 메소드를 통해 ExecutorService 구현 객체를 만들 수 있으며, 이것이 바로 스레드풀

<br>
<br>

## 스레드풀 생성 및 종료

### 스레드풀 생성

- ExecutorService 구현 객체는 Executors 클래스의 2가지 메소드 중 하나를 이용해서 간편하게 생성 가능

| 메소드                           | 초기 스레드 수 | 코어 스레드 수 |  최대 스레드 수   |
| :------------------------------- | :------------: | :------------: | :---------------: |
| newCachedThreadPool()            |       0        |       0        | Integer.MAX_VALUE |
| newFixedThreadPool(int nThreads) |       0        |    nThreads    |     nThreads      |

- 코어 스레드 수는 사용되지 않는 스레드를 스레드풀에서 제거할 때 최소한 유지해야 할 스레드 수를 뜻함
- `newCachedThreadPool()`로 생성된 스레드풀은 스레드 개수보다 작업 개수가 많으면 새 스레드를 생성시켜 작업을 처리함
  - 이론적으로 int 최대값만큼 스레드가 추가되지만, 이는 운영체제의 성능과 상황에 따라 달라짐
  - 1개 이상의 스레드가 추가되었을 경우 60초 동안 추가된 스레드가<br>아무 작업도 하지 않으면 해당 스레드를 종료하고 풀에서 제거함
- `newFixedThreadPool(int nThreads)`로 생성된 스레드풀 또한 스레드 개수보다 작업 개수가 많으면<br>새 스레드를 생성시키고 작업을 처리함
  - 스레드가 작업을 처리하지 않고 놀고 있더라도 스레드 개수가 줄지 않음
- CPU 코어의 수만큼 최대 스레드를 사용하는 스레드풀을 생성할 수도 있음

```java
ExecutorService es = Exectors.newFixedThreadPool(
  Runtime.getRuntime().availableProcessors()
);
```

- 두 메소드를 사용하지 않고 직접 ThreadPoolExecutor 객체를 생성할 수도 있음

```java
ExecutorService threadPool = new ThreadPoolExecutor(
  3,                                // 코어 스레드 개수
  100,                              // 최대 스레드 개수
  120L,                             // 놀고 있는 시간
  TimeUnit.SECONDS,                 // 놀고 있는 시간 단위
  new SynchronousQueue<Runnable>()  // 작업 큐
);
```

<br>

### 스레드풀 종료

- 스레드풀의 스레드는 데몬 스레드가 아니기 때문에 main 스레드가 종료되더라도 실행 상태로 남아 있음
  - `main()` 메소드의 실행이 끝나도 애플리케이션 프로세스는 종료되지 않음
- ExecutorService는 종료와 관련해서 3개의 메소드를 제공함

|                         메소드                          | 설명                                                                                                                                     |
| :-----------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------- |
|                     void shutdown()                     | 현재 처리 중인 작업을 포함해서 작업 큐에 대기하고 있는 모든 작업을 처리한 뒤에 스레드풀 종료                                             |
|              List\<Runnable> shutdownNow()              | 현재 처리 중인 스레드를 interrupt해서 작업 중지 시도 후 스레드 풀 종료<br>리턴값은 작업 큐에 있는 미처리된 작업 목록                     |
| boolean awaitTerminate<br>(long timeout, TimeUnit unit) | `shutdown()` 호출 이후 모든 작업 처리를 timeout 내에 완료하면 true 리턴<br>완료하지 못하면 작업 처리 중인 스레드 interrupt 및 false 리턴 |

- `shutdown()` : 남아있는 작업을 마무리하고 스레드풀을 종료할 때
- `shutdownNow()` : 남아있는 작업과는 상관없이 강제로 종료할 때

<br>
<br>

## 작업 생성과 처리 요청

### 작업 생성

- 하나의 작업은 **Runnable** 또는 **Callable** 구현 클래스로 표현
- 둘의 차이점은 작업 처리 완료 후 리턴값이 있느냐 없느냐

※ Runnable 구현 클래스

```java
Runnable task = new Runnable() {
  @Override
  public void run() {
    // 스레드의 작업 처리 내용
  }
}
```

※ Callable 구현 클래스

```java
Callable<T> task = new Callable<T>() {
  @Override
  public T call() throws Exception {
    // 스레드의 작업 처리 내용
    return T;
  }
}
```

- 스레드풀의 스레드는 작업 큐에서 Runnable 또는 Callable 객체를 가져와서 `run()`과 `call()` 메소드 실행

<br>

### 작업 처리 요청

- 작업 처리 요청 : ExecutorService 작업 큐에 Runnable 또는 Callable 객체를 넣는 행위
- ExecutorService는 작업 처리 요청을 위해 2가지 종류의 메소드를 제공함

|                                                         메소드                                                         | 설명                                                                                            |
| :--------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------- |
|                                             void execute(Runnable command)                                             | Runnable을 작업 큐에 저장<br>작업 처리 결과를 받지는 못함                                       |
| Future\<?> submit(Runnable task)<br>Future\<V> submit(Runnable task, V result)<br>Future\<V> submit(Callable\<V> task) | Runnable 또는 Callable을 작업 큐에 저장<br>리턴되는 Future를 통해 작업 처리 결과를 얻을 수 있음 |

- `execute()`와 `submit()` 메소드의 차이점
  - 작업 처리 결과를 받을 수 있는지 없는지
  - `execute()`는 작업 처리 도중 예외가 발생하면 스레드 종료 및 스레드풀에서 제거하고<br>스레드풀은 다른 작업 처리를 위해 새로운 스레드를 생성함
  - `submit()`은 작업 처리 도중 예외가 발생해도 스레드는 종료되지 않고 다음 작업을 위해 재사용됨
  - 그러므로 가급적이면 스레드의 생성 오버헤더를 줄이기 위해 `submit()`을 사용하는 것이 좋음

<br>
<br>

## 블로킹 방식의 작업 완료 통보

- ExecutorService의 `submit()` 메소드가 리턴하는 Future 객체는 작업 결과가 아니라<br>작업이 완료될 때까지 기다렸다가 최종 결과를 얻는데 사용됨
  - 그래서 Future를 pending completion(지연 완료) 객체라고 함
- Future의 `get()` 메소드를 호출하면 스레드가 작업을 완료할 때까지 블로킹되었다가<br>작업을 완료하면 처리 결과를 리턴함
  - 이것이 블로킹을 사용하는 작업 완료 통보 방식

|               메소드               | 설명                                                                                          |
| :--------------------------------: | :-------------------------------------------------------------------------------------------- |
|              V get()               | 작업이 완료될 때까지 블로킹되었다가 처리 결과 V 리턴                                          |
| V get(long timeout, TimeUnit unit) | timeout 시간 전에 작업이 완료되면 결과 V 리턴<br>작업이 완료되지 않으면 TimeoutException 발생 |

- 리턴 타입 V는 `submit(Runnable task, V result)`의 2번째 매개값인 V 타입이거나<br>`submit(Callable<V> task)`의 Callable 타입 파라미터 V 타입
- Future를 이용한 블로킹 방식의 작업 완료 통보에서 주의할 점
  - 스레드가 작업을 완료하기 전까지는 `get()` 메소드가 블로킹되므로 다른 코드를 실행할 수 없음
  - 그렇기 때문에 `get()` 메소드를 호출하는 스레드는 새로운 스레드이거나 스레드풀의 또 다른 스레드가 되어야 함

※ 새로운 스레드를 생성해서 호출

```java
new Thread(new Runnable() {
  @Override
  public void run() {
    try {
      future.get();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}).start();
```

※ 스레드풀의 스레드가 호출

```java
executorService.submit(new Runnable() {
  @Override
  public void run() {
    try {
      future.get();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
});
```

- Future 객체는 작업 결과를 얻는 메소드 이외에도 여러 메소드들을 제공함

|                    메소드                     | 설명                                |
| :-------------------------------------------: | :---------------------------------- |
| boolean cancel(boolean mayInterruptIfRunning) | 작업 처리가 진행 중인 경우 취소시킴 |
|             boolean usCancelled()             | 작업이 취소되었는지 여부            |
|               boolean isDone()                | 작업 처리가 완료되었는지 여부       |

- `cancel()` 메소드는 작업이 시작되기 전에 실행되면 매개값과 상관없이 작업 취소 후 true 리턴<br>작업 진행 중에는 mayInterruptIfRunning 매개값의 true인 경우에만 작업 스레드를 interrupt<br>작업이 완료되었을 때 또는 어떤 이유로 취소될 수 없다면 false 리턴
- `isCanceled()` 메소드는 작업이 완료되기 전에 작업이 취소되었을 경우에만 true 리턴
- `isDone()` 메소드는 작업이 정상 종료, 예외, 취소 등 어떤 이유에서라도 작업이 완료되었다면 true 리턴

<br>

### 리턴값이 없는 작업 완료 통보

- 리턴값이 없는 작업일 경우에는 Runnable 객체로 생성하면 됨
- 결과값이 없는 작업 처리 요청은 `submit(Runnable task)` 메소드를 사용하면 됨
- 결과값이 없음에도 Future 객체를 리턴하는데, 이는 스레드가 작업 처리를 완료했는지, 아니면 예외가 발생했는지 확인하기 위함
  - Future의 `get()` 메소드는 예외 처리가 필요함

```java
public class NoResultExample {
  public static void main(String[] args) {
    ExecutorService es = Executors.newFixedThreadPool(
      Runtime.getRuntime().availableProcessors()
    );

    System.out.println("[작업 처리 요청]");

    Runnable runnable = new Runnable() {
      @Override
      public void run() {
        int sum = 0;
        for (int i = 1; i <= 10; i++) { sum += i; }
        System.out.println("[처리 결과] " + sum);
      }
    };
    Future future = es.submit(runnable);

    try {
      future.get();
      System.out.println("[작업 처리 완료]");
    } catch (Exception e) {
      System.out.println("[실행 예외 발생] " + e.getMessage());
    }
    es.shutdown();
  }
}

/*
[작업 처리 요청]
[처리 결과] 55
[작업 처리 완료]
*/
```

<br>

### 리턴값이 있는 작업 완료 통보

- 리턴값이 있는 작업일 경우에는 Callable 객체로 생성하면 됨
- 결과값이 있는 작업 처리 요청은 `submit(Callable<V> task)` 메소드를 사용하면 됨
- 위 메소드는 Future\<T>를 리턴하며, T는 `call()` 메소드가 리턴하는 타입

```java
public class ResultByCallableExample {
  public static void main(String[] args) {
    ExecutorService es = Executors.newFixedThreadPool(
      Runtime.getRuntime().availableProcessors()
    );

    System.out.println("[작업 처리 요청]");

    Callable<Integer> task = new Callable<Integer>() {
      @Override
      public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 10; i++) { sum += i; }
        return sum;
      }
    };
    Future<Integer> future = es.submit(task);

    try {
      future.get();
      System.out.println("[처리 결과] " + sum);
      System.out.println("[작업 처리 완료]");
    } catch (Exception e) {
      System.out.println("[실행 예외 발생] " + e.getMessage());
    }
    es.shutdown();
  }
}

/*
[작업 처리 요청]
[처리 결과] 55
[작업 처리 완료]
*/
```

<br>

### 작업 처리 결과를 외부 객체에 저장

- 상황에 따라 스레드가 작업한 결과를 외부 객체에 저장해야 할 경우도 있음
- 예를 들어 스레드가 작업 처리를 완료하고 외부 Result 객체에 작업 결과를 저장하면,<br>애플리케이션이 Result 객체를 공유 객체로 사용해서 2개 이상의 스레드 작업을 취합할 수 있음
- 이런 작업을 위해서 ExecutorService의 `submit(Runnable task, V result)`<br>메소드를 사용할 수 있으며, V가 바로 result 타입이 됨

```java
public class ResultByRunnableExample {
  public static void main(String[] args) {
    ExecutorService es = Executors.newFixedThreadPool(
      Runtime.getRuntime().availableProcessors()
    );

    System.out.println("[작업 처리 요청]");

    class Task implements Runnable {
      Result result;
      Task(Result result) {
        this.result = result;
      }
      @Override
      public void run() {
        int sum = 0;
        for (int i = 1; i <= 10; i++) { sum += i; }
        result.addValue(sum);
      }
    }

    Result result = new Result();
    Runnable task1 = new Task(result);
    Runnable task2 = new Task(result);
    Future<Result> future1 = es.submit(task1, result);
    Future<Result> future2 = es.submit(task2, result);

    try {
      result = future1.get();
      result = future2.get();
      System.out.println("[처리 결과] " + result.accumValue);
      System.out.println("[작업 처리 완료]");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("[실행 예외 발생] " + e.getMessage());
    }
    es.shutdown();
  }
}

class Result {
  int accumValue;
  synchronized void addValue(int value) {
    accumValue += value;
  }
}

/*
[작업 처리 요청]
[처리 결과] 110
[작업 처리 완료]
*/
```

<br>

### 작업 완료 순으로 통보

- 작업 요청 순서대로 작업 처리가 완료되는 것은 아님
- 작업의 양과 스레드 스케줄링에 따라서 작업 처리 순서가 섞일 수도 있음
- 작업들이 순차적으로 처리될 필요성이 없고, 처리 결과도 순차적으로 이용할 필요가 없다면 완료 순으로 통보받으면 됨
- **CompletionService** : 스레드풀에서 작업 처리가 완료된 것만 통보받을 수 있게 해주는 클래스

|                    메소드                    | 설명                                                                       |
| :------------------------------------------: | :------------------------------------------------------------------------- |
|              Future\<V> poll()               | 완료된 작업의 Future를 가져옴<br>완료된 작업이 없다면 즉시 null 리턴       |
| Future\<V> poll(long timeout, TimeUnit unit) | 완료된 작업의 Future를 가져옴<br>완료된 작업이 없다면 timeout까지 블로킹됨 |
|              Future\<V> take()               | 완료된 작업의 Future를 가져옴<br>완료된 작업이 없다면 있을 때까지 블로킹됨 |
|     Future\<V> submit(callable\<V> task)     | 스레드풀에 Callable 작업 처리 요청                                         |
|  Future\<V> submit(Runnable task, V result)  | 스레드풀에 Runnable 작업 처리 요청                                         |

- CompletionService 구현 클래스는 ExecutorCompletionService\<V>

```java
ExecutorService es = Executors.newFixedThreadPool(
  Runtime.getRuntime().availableProcessors()
);
CompletionService<V> cs = new ExecutorCompletionService<V>(es);
```

- `poll()`과 `take()` 메소드를 이용해서 처리 완료된 작업의 Future를 얻으려면<br>CompletionService의 `submit()` 메소드로 작업 처리 요청을 해야 함

```java
cs.submit(Callable<V> task);
cs.submit(Runnable task, V result);
```

```java
public class CompletionServiceExample extends Thread {
  public static void main(String[] args) {
    ExecutorService es = Executors.newFixedThreadPool(
      Runtime.getRuntime().availableProcessors()
    );

    CompletionService<Integer> cs = new ExecutorCompletionService<Integer>(es);

    System.out.println("[작업 처리 요청]");

    for (int i = 0; i < 3; i++) {
      cs.submit(new Callable<Integer>() {
        @Override
        public Integer call() throws Exception {
          int sum = 0;
          for (int i = 1; i <= 10; i++) { sum += i; }
          return sum;
        }
      });
    }

    System.out.println("[처리 완료된 작업 확인]");

    es.submit(new Runnable() {
      @Override
      public void run() {
        while (true) {
          try {
            Future<Integer> future = cs.take();
            int value = future.get();
            System.out.println("[처리 결과] " + value);
          } catch (Exception e) { break; }
        }
      }
    });

    try { Thread.sleep(3000); }
    catch (InterruptedException e) {}
    es.shutdown();
  }
}

/*
[작업 처리 요청]
[처리 완료된 작업 확인]
[처리 결과] 55
[처리 결과] 55
[처리 결과] 55
*/
```

<br>
<br>

## 콜백 방식의 작업 완료 통보

- **callback** : 애플리케이션이 스레드에게 작업 처리를 요청한 후, 스레드가 작업을 완료하면 특정 메소드를 자동 실행하는 기법
  - 이때 자동 실행되는 메소드를 콜백 메소드라고 함
- 블로킹 방식은 작업 처리 요청 후 작업 완료까지 블로킹되지만,<br>콜백 방식은 작업 처리 요청 후 다른 기능 수행 가능
- ExecutorService는 콜백을 위한 별도의 기능을 제공하지 않고, Runnable 구현 클래스를 작성할 때 콜백 기능을 구현할 수 있음
- 콜백 메소드를 가진 클래스는 직접 정의할 수도 있고, `java.nio.channels.CompletionHandler`를 이용할 수도 있음
  - NIO 패키지는 비동기 통신에서 콜백 객체를 만들 때 사용됨

※ CompletionHandler 객체 생성 코드

```java
CompletionHandler<V, A> callback = new CompletionHandler<V, A>() {
  @Override
  public void completed(V result, A attachment) {}
  @Override
  public void failed(Throwable exc, A attachment) {}
};
```

- `completed()`는 작업을 정상 처리 완료했을 때 호출되는 콜백 메소드
- `failed()`는 작업 처리 도중 예외가 발생했을 때 호출되는 콜백 메소드
- CompletionHandler의 V는 결과값 타입, A는 첨부값 타입
  - 첨부값은 콜백 메소드에 결과값 이외에 추가적으로 전달하는 객체
  - 첨부값이 필요 없다면 `Void`로 지정해주면 됨

```java
public class CallbackExample {
  private ExecutorService es;

  public CallbackExample() {
    es = Executors.newFixedThreadPool(
      Runtime.getRuntime().availableProcessors()
    );
  }

  private CompletionHandler<Integer, Void> callback = new CompletionHandler<Integer, Void>() {
    @Override
    public void completed(Integer result, Void attachment) {
      System.out.println("completed() 실행 : " + result);
    }

    @Override
    public void failed(Throwable exc, Void attachment) {
      System.out.println("failed() 실행 : " + exc.toString());
    }
  };

  public void doWork(final String x, final String y) {
    Runnable task = new Runnable() {
      @Override
      public void run() {
        try {
          int intX = Integer.parseInt(x);
          int intY = Integer.parseInt(y);
          int result = intX + intY;
          callback.completed(result, null);
        } catch (NumberFormatException e) {
          callback.failed(e, null);
        }
      }
    };
    es.submit(task);
  }

  public void finish() {
    es.shutdown();
  }

  public static void main(String[] args) {
    CallbackExample example = new CallbackExample();
    example.doWork("3", "3");
    example.doWork("3", "삼");
    example.finish();
  }
}

/*
completed() 실행 : 6
failed() 실행 : java.lang.NumberFormatException: For input string: "삼"
*/
```
