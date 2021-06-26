# Process, Thread, Multi-Thread

## Process

운영체제에서는 실행 중인 하나의 애플리케이션을 프로세스라고 부른다. 사용자가 애플리케이션을 실행하면 운영체제로부터 실행에 필요한 메모리를 할당받아 애플리케이션의 코드를 실행하는데, 이것을 프로세스라고 부른다. 하나의 애플리케이션을 두 번 이상 실행해서 다중 프로세스를 만들기도 한다.

</br>

## Thread

쓰레드는 사전적 의미로 한 가닥의 실이라는 뜻이다. 한 가지 작업을 실행하기 위해 순차적으로 실행한 코드를 실처럼 이어놓았다고 해서 유래된 이름이다. 하나의 쓰레드는 하나의 코드의 실행 흐름이기 때문에 한 프로세스 내에 쓰레드가 두 개라면 두 개의 코드 실행 흐름이 생긴다는 의미이다.

</br>

## Multi-Thread

운영체제는 멀티 태스킹을 할 수 있도록 CPU 및 메모리 자원을 프로세스마다 적절히 할당해주고, 병렬로 실행을 시킨다. 멀티 태스킹이 꼭 멀티 프로세스를 의미하는 것은 아니다. 한 프로세스 내에서 멀티 태스킹을 할 수 있도록 만들어진 애플리케이션들도 있다. 어떻게 하나의 프로세스가 두 가지 이상의 작업을 처리할 수 있을까? 그 비밀은 멀티 쓰레드에 있다.  
멀티 프로세스가 애플리케이션 단위의 멀티 태스킹이라면, 멀티 쓰레드는 애플리케이션 내부에서의 멀티 태스킹이라고 할 수 있다. 멀티 쓰레드는 다양한 곳에서 사용된다. 대용량 데이터의 처리 시간을 줄이기 위해 데이터를 분할해서 병렬로 처리하는 곳에서 사용되기도 하고, UI를 가지고 있는 애플리케이션에서 네트워크 통신을 하기 위해 사용되기도 한다. 또한 다수 클라이언트의 요청을 처리하는 서버를 개발할 때도 사용된다.

</br>

## Main Thread

모든 자바 애플리케이션은 메인 쓰레드가 main() 메소드를 실행하면서 시작된다. 메인 쓰레드는 main() 메소드의 첫 코드부터 아래로 순차적으로 실행하고, main() 메소드의 마지막 코드를 실행하거나 return 문을 만나면 실행을 종료한다.  
메인 쓰레드는 필요에 따라 작업 쓰레드들을 만들어서 병렬로 코드를 실행할 수 있다. 즉, 멀티 쓰레드를 생성해서 멀티 태스킹을 수행한다.

</br>

![메인 쓰레드 병렬 작동](https://user-images.githubusercontent.com/75058239/123512411-4c7a1200-d6c2-11eb-9d12-63506ce83a05.png)

</br>

메인 쓰레드가 작업 쓰레드보다 먼저 종료되더라도 작업 쓰레드가 계속 실행 중이라면 프로세스는 종료되지 않는다.

</br>

## 작업 쓰레드 생성과 실행

멀티 쓰레드로 실행하는 애플리케이션을 개발하려면 먼저 몇 개의 작업을 병렬로 실행할지 결정하고 각 작업별로 쓰레드를 생성해야 한다. 어떤 자바 애플리케이션이건 메인 쓰레드는 반드시 존재하기 때문에 메인 작업 이외에 추가적인 병렬 작업의 수만큼 쓰레드를 생성하면 된다. 자바에서는 작업 쓰레드도 객체로 생성되기 때문에 클래스가 필요하다. java.lang.Thread 클래스를 직접 객체화해서 생성해도 되지만, Thread를 상속해서 하위 클래스를 만들어 생성할 수도 있다.

</br>

### Thread 클래스를 직접 객체화하는 방법

java.lang.Thread 클래스로부터 작업 쓰레드 객체를 직접 생성하려면 Runnable을 매개값으로 갖는 생성자를 호출해야 한다.

```java
Thread thread = new Thread(Runnable target);
```

Runnable은 작업 쓰레드가 실행할 수 있는 코드를 가지고 있는 객체라고 해서 붙여진 이름이다. Runnable은 인터페이스 타입이기 때문에 구현 객체를 만들어 대입해야 한다. Runnable run() 메소드 하나가 정의되어 있는데, 구현 클래스는 run()을 재정의해서 작업 쓰레드가 실행할 코드를 작성해야 한다.

```java
class Task implements Runnable {
	public void run() {
		스레드가 실행할 코드;
	}
}
```

Runnable은 작업 내용을 가지고 있는 객체이지 실제 쓰레드는 아니다. Runnable 구현 객체를 생성하고 이것을 매개값으로 해서 Thread 생성자를 호출하면 비로소 작업 쓰레드가 생성된다.

```java
Runnable task = new Task();
Thread thread = new Thread(task);
```

코드를 절약하기 위해서 Thread 생성자를 호출할 때 Runnable 익명 객체를 매개값으로 사용할 수 있다.

```java
Thread thread = new Thread(new Runnable() {
	public void run() {
		스레드가 실행할 코드;
	}
});
```

Runnable 인터페이스는 run() 메소드 하나만 정의되어 있기 때문에 함수적 인터페이스이다. 따라서 람다식을 매개값으로 사용할 수 있다.

```java
Thread thread = new Thread( () -> {
	스레드가 실행할 코드;
});
```

작업 쓰레드는 start() 메소드를 호출해야만 비로소 실행된다.

```java
thread.start();
```

</br>

### Thread 하위 클래스로부터 생성

작업 쓰레드가 실행할 작업을 Runnable로 만들지 않고, Thread의 하위 클래스로 작업 쓰레드를 정의하면서 작업 내용을 포함시킬 수도 있다. Thread 클래스를 상속한 후 run 메소드르르 재정의(overriding)해서 쓰레드가 실행할 코드를 작성하면 된다. 작업 쓰레드 클래로부터 작업 쓰레드 객체를 생성하는 방법은 일반적인 객체를 생성하는 방법과 동일하다.

```java
public class WorkerThread extends Thread {
	@Override
	public void run() {
		스레드가 실행할 코드;
	}
}

Thread thread = new WorkerThread();
```

코드를 절약하기 위해 Thread 익명 객체로 작업 쓰레드 객체를 생성할 수도 있다.

```java
Thread thread = new Thread(){
	public void run(){
		스레드가 실행할 코드;
	}
}
```

이렇게 생성된 작업 쓰레드 객체에서 start() 메소드를 호출하면 작업 쓰레드는 자신의 run() 메소드를 실행하게 된다.

```java
thread.start();
```

</br>

## 쓰레드의 이름

```java
thread.setName("쓰레드 이름");
thread.getName();
```

setName()과 getName()은 Thread의 인스턴스 메소드이므로 쓰레드 객체의 참조가 필요하다. 만약 쓰레드 객체의 참조를 가지고 있다면 Thread의 정적 메소드인 currentThread()로 코드를 실행하는 현재 쓰레드의 참조를 얻을 수도 있다.

```java
Thread thread = Thread.currentThread();
```

</br>

## 동기화 메소드와 동기화 블록

싱글 쓰레드 프로그램에서는 한 개의 쓰레드가 객체를 독차지해서 사용하면 되지만, 멀티 쓰레드 프로그램에서는 쓰레드들이 객체를 공유해서 작업해야 하는 경우가 있다. 이 때 쓰레드가 사용중인 객체를 다른 쓰레드가 변경할 수 없도록 하려면 쓰레드 작업이 끝날 때까지 객체에 잠금을 걸어서 다른 쓰레드가 사용할 수 없도록 해야 한다.  
멀티 쓰레드 프로그램에서 단 하나의 쓰레드만 실행할 수 있는 코드 영역을 임계 영역이라고 한다. 자바는 임계 영역을 지정하기 위해서 동기화 메소드와 동기화 블록을 제공한다. 쓰레드가 객체 내부의 동기화 메소드 혹은 블록에 들어가면 즉시 객체에 잠금을 걸어 다른 쓰레드가 임계 영역 코드를 실행하지 못하도록 해야한다. 동기화 메소드를 만드는 방법은 메소드 선언에 synchronized 키워드를 붙이면 된다. 이 키워드는 인스턴스와 정적 메소드 어디든 붙일 수 있다.

</br>

## 쓰레드의 상태

쓰레드 객체를 생성하고 start() 메소드를 호출하면 곧바로 쓰레드가 실행되는 것처럼 보이지만 사실은 실행 대기 상태가 된다. 실행 대기 상태란 아직 스케줄링이 되지 않아서 실행을 기다리고 있는 상태를 의미한다. 실행 대기 상태에 있는 쓰레드 중에서 쓰레드 스케줄링으로 선택된 쓰레드가 CPU를 점유하고 run() 메소드를 실행한다. 이 때를 실행 상태라고 한다. 실행 상태의 쓰레드는 run() 메소드를 모두 실행하기 전에 쓰레드 스케줄링에 의해 다시 실행 대기 상태로 돌아갈 수 있다. 그리고 실행 대기 상태에 있는 다른 쓰레드가 선택되어 실행 상태가 된다. 이렇게 쓰레드는 실행 대기 상태와 실행 상태를 번갈아 가면서 자신의 run() 메소드를 조금씩 실행한다. 실행 상태에서 run() 메소드가 종료되면 더 이상 실행할 코드가 없기 때문에 쓰레드의 실행은 멈추게 된다. 이 상태를 종료 상태라고 한다.  
경우에 따라서 쓰레드는 실행 상태에서 실행 대기 상태로 가지 않을 수도 있다. 실행 상태에서 일시 정지 상태로 가기도 하는데, 일시 정지 상태는 쓰레드가 실행할 수 없는 상태이다. 이 때 다시 실행 상태로 가기 위해서는 일시 정지 상태에서 실행 대기 상태로 가야만 한다.  
이러한 쓰레드의 상태를 코드에서 확인하기 위해서 getState() 메소드를 사용한다. 이 메소드는 Thread.State 열거 상수 (NEW, RUNNABLE, WAITING, TIMED_WAITING, BLOCKED, TERMINATED)를 리턴한다.  
다음 예시 코드는 쓰레드의 상태를 출력하는 예제이다. 생성자 매개값으로 받은 타겟 쓰레드의 상태를 0.5초 주기로 출력한다.

```java
//StatePrintThread.java
public class StatePrintThread extends Thread {
   private Thread targetThread;

   public StatePrintThread (Thread targetThread) {
      this.targetThread = targetThread;
   }

   public void run() {
      while (true) {
         Thread.State state = targetThread.getState();
         System.out.println("타겟 스레드 상태 : " + state);

         if (state == Thread.State.NEW) {
            targetThread.start();
         }

         if (state == Thread.State.TERMINATED) {
            break;
         }
         try {
            Thread.sleep(500);
         } catch(Exception e){}
      }
   }
}
```

다음은 타깃 쓰레드 클래스이다. 첫번째 for문에서 10억번 루핑을 돌게 해서 RUNNABLE 상태를 유지하고 sleep() 메소드를 호출해서 1.5초간 TIME_WAITING 상태를 유지한다. 그 이후 다시 10억번 루핑을 돌게 해서 RUNNABLE 상태를 유지한다.

```java
//TargetThread.java
public class TargetThread extends Thread {
   public void run() {
      for (long i=0; i<1000000000; i++) {}
      try {
         Thread.sleep(1500);
      } catch (Exception e) {}
         for (long i =0; i<1000000000; i++) {}
   }
}

public class Main {

   public static void main(String[] args) {
      StatePrintThread statePrintThread = new StatePrintThread(new TargetThread());
      statePrintThread.start();
   }
}

/*
타겟 스레드 상태 : NEW
타겟 스레드 상태 : RUNNABLE
타겟 스레드 상태 : TIMED_WAITING
타겟 스레드 상태 : TIMED_WAITING
타겟 스레드 상태 : RUNNABLE
타겟 스레드 상태 : TERMINATED
*/
```

</br>

## 쓰레드 상태 제어

사용자는 미디어 플레이어에서 동영상을 보다가 일시 정지 시킬 수도 있고, 종료시킬 수도 있다. 일시 정지는 조금 후 다시 영상을 보겠다는 의미이므로 미디어 플레이어는 동영상 쓰레드를 일시 정지 상태로 만들어야 한다. 그리고 종료는 더 이상 동영상을 보지 않겠다는 의미이므로 쓰레드 역시 종료 상태가 되어야 한다. 이와 같이 실행 중인 쓰레드의 상태를 변경하는 것을 쓰레드 상태 제어라고 한다.  
멀티 쓰레드 프로그램을 만들기 위해서는 정교한 쓰레드 상태 제어가 필요하다. 이는 쓰레드의 상태 변화를 가져오는 메소드들에 대한 이해가 필요하다.

</br>

![쓰레드 상태 제어 메소드](https://user-images.githubusercontent.com/75058239/123512422-5ef44b80-d6c2-11eb-99f2-cd9bcdee12e0.png)

</br>

|                          메소드                           | 설명                                                                                                                                                                                   |
| :-------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                        interrupt()                        | 일시 정지 상태의 쓰레드에서 예외를 발생시킴 → 예외의 catch문을 통해 실행 대기 상태나 종료 상태로                                                                                       |
|                   notify(), notifyAll()                   | wait() 메소드에 의해 일시 정지 상태에 있는 쓰레드를 실행 대기 상태로                                                                                                                   |
|    sleep(ling millis) / sleep(long millis, int nanos)     | 주어진 시간 동안 쓰레드 일시 정지 → 이후 자동으로 실행 대기 상태                                                                                                                       |
| join() / join(long millis) / join(long millis, int nanos) | 쓰레드를 일시 정지 상태로 → join 메소드의 쓰레드가 종료되거나 매개값의 시간이 지나야 변경 가능                                                                                         |
| wait() / wait(long millis) / wait(long millis, int nanos) | sychronized 블록 내에서 쓰레드를 일시 정지 상태로 → 매개값의 시간 이후 자동으로 실행 대기 상태, 시간이 정해지지 않으면 notify(), notifyAll() 메소드를 통해 실행 대기 상태로 갈 수 있음 |
|                           yield                           | 실행 중 우선순위가 동일한 다른 쓰레드에게 실행을 양보 → 실행 대기 상태로                                                                                                               |

</br>

## 쓰레드의 안전한 종료 (stop(), interrupt())

쓰레드는 자신의 run 메소드가 모두 실행되면 자동으로 종료되지만, 경우에 따라서 실행 중인 쓰레드를 즉시 종료할 필요가 있다. 예를 들면 동영상을 끝까지 보지 않고 사용자가 멈춤을 요구하는 경우가 있다. 쓰레드를 즉시 종료시키기 위해서 stop() 메소드를 제공하고 있는데, 이 메소드는 **deprecated** 되었다. 그 이유는 stop() 메소드로 쓰레드를 갑자기 종료하게 되면 쓰레드가 사용 중이던 자원들(파일, 네트워크 연결 등)이 불안전한 상태로 남겨지기 때문이다. 쓰레드는 run() 메소드가 끝나면 자동적으로 종료되므로, run 메소드가 정상적으로 종료되도록 유도하는 것이 최선의 방법이다.

</br>

### interrupt() 이용 방법

interrupt() 메소드는 쓰레드가 일시 정지 상태에 있을 때 InterruptedException 예외를 발생시킨다. 이것을 이용하면 run() 메소드를 정상 종료시킬 수 있다.  
다음 예제는 Thread2를 실행한 후, 1초 뒤에 Thread2를 멈추도록 interrupt() 메소드를 호출하는 코드이다.

```java
//Thread2.java
public class Thread2 extends Thread {
   public void run() {
      try {
         while(true) {
            System.out.println("실행중");
            Thread.sleep(1);
         }
      } catch (InterruptedException e){}
      System.out.println("자원정리");
      System.out.println("실행 종료");
   }
}

//InterruptExample.java
public class InterruptExample {

   public static void main(String[] args) {
      Thread thread = new Thread2();
      thread.start();

      try {
         Thread.sleep(500);
      } catch (InterruptedException e){}

      thread.interrupt();;
   }
}
```

주목할 점은 쓰레드가 실행 대기 또는 실행 상태에 있을 때 interrupt() 메소드가 실행되면 즉시 InterruptedException 예외가 발생하지 않고 쓰레드가 미래에 일시 정지 상태가 되면 InterruptedException 예외가 발생한다는 것이다. 따라서 쓰레드가 일시 정지 상태가 되지 않으면 interrupted() 메소드 호출은 아무런 의미가 없다. 그래서 짧은 시간이나마 일시 정지시키기 위해서 Thread.sleep(1)이 사용되었다.  
일시 정지를 만들지 않고도 interrupt() 호출 여부를 알 수 있는 방법이 있다.

```java
boolean status = Thread.interrupted();
boolean status = objThread.isInterrupted();
```

interrupt() 메소드가 호출되었다면 쓰레드의 interrupt()와 isInterrupted() 메소드는 true를 리턴한다. interrupted()는 정적 메소드로 현재 쓰레드가 interrupted되었는지 확인하는 것이고, isInterrupted()는 인스턴스 메소드로 현재 쓰레드가 interrupted되었는지 확인할 때 사용한다. 둘 중 어느 것을 사용해도 좋다.  
위 예제에서 boolean 타입을 활용해서 while문을 빠져나갈 수도 있다.

```java
public class Thread2 extends Thread {
   public void run() {
         while(true) {
            System.out.println("실행 중");
            if(Thread.interrupted()){
               break;
            }
         };
      System.out.println("자원 정리");
      System.out.println("실행 종료");
   }
}
```
