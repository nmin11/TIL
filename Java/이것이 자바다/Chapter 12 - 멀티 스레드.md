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
