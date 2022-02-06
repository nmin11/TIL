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

![Multi Process & Multi Thread](https://github.com/nmin11/TIL/blob/main/Java/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/multi%20process.png)

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

![스레드 상태 제어](https://github.com/nmin11/TIL/blob/main/Java/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/JVM%20%EC%9E%91%EB%8F%99%20%EA%B3%BC%EC%A0%95.png)

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
