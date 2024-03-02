## [와일더의 Mutex & Semaphore](https://youtu.be/oazGbhBCOfU?si=zNLN_Z9HLR9HqqZp)

교착 상태

- 둘 이상의 작업이 서로 상대방의 작업이 끝나기를 기다리는 상태
- 공유 자원이 속한 임계 영역에 대해 둘 이상의 프로세스가 동시에 접근하려고 할 때 발생

임계 영역 (Critical Section)

- 교착 상태가 발생하는 4가지 조건
  - 상호 배제 (Mutual Exclusion)
  - 점유 대기 (Hold and Wait)
  - 비선점 (No Preemption)
  - 순환 대기 (Circular Wait)
  - 모두 만족해야 교착 상태 발생

상호 배제 (Mutual Exclusion)

- 프로세스들이 필요로 하는 자원에 대해 배타적인 통제권을 요구하는 것
- 쉽게 말해 하나의 프로세스가 공유 자원을 사용하고 있을 때, 다른 프로세스는 그 자원을 사용할 수 없도록 통제

mutex (mutual exclusion)

- 여러 스레드를 실행하는 환경에서 자원에 대한 접근에 제한을 강제하기 위한 동기화 매커니즘
- boolean 타입의 Lock 변수를 사용하여 임계 구역에 대한 접근을 제어
- 공유 자원을 사용 중인 스레드가 있을 때, 다른 스레드가 공유 자원에 접근하면 blocking 후 대기 큐로 보냄
- Lock을 건 스레드만 Lock 해제 가능
- sleep-waiting & blocking-lock 방식: 스레드가 대기실에서 기다리게 함

SpinLock

- 스레드가 계속해서 자원을 얻을 수 있을 때까지 반복해서 시도하게 함
- busy-waiting 방식, 대기 큐를 갖지 않음
- 컨텍스트 스위칭 시간이 더 짧을 때, 멀티 코어 프로세스일 때 유용
- mutex-nonblocking 모델

Semaphore

- 멀티프로그래밍 환경에서 다수의 프로세스나 스레드의 여러 개의 임계 구역에 대한 접근을 제어하기 위한 방법
- P, V 연산
  - P 연산: 임계 구역에 들어가기 전에 수행하는 연산 (wait)
  - V 연산: 임계 구역을 빠져나온 후에 수행하는 연산 (signal)
- sempaphore 변수를 통해 wait, signal 관리
  - sempaphore 변수는 0 이상의 정수형 변수
- counting semaphore
- 공유 자원의 수가 1개일 때는 이진 sempaphore로 mutex처럼 사용 가능
- Lock을 걸지 않은 스레드도 signal을 보내서 Lock 해제 가능

References

- https://docs.microsoft.com/ko-kr/dotnet/standard/threading/overview-of-synchronization-primitives
- https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Semaphore.html
- https://ko.wikipedia.org/wiki/%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4
- https://www.baeldung.com/java-mutex
- https://about-myeong.tistory.com/34

## [오션의 뮤텍스와 세마포어](https://youtu.be/NL9JQh5bbZ8?si=7GFdKoeCYHq9Xqvs)

### 1. 뮤텍스와 세마포어 배경

Race Condition

- 여러 프로세스/스레드가 동시에 같은 데이터를 조작할 때 발생하는 문제
- 동시에 접근하지 못하도록 접근 순서를 제어하는 동기화 기법 필요

Critical Section

- 공유 자원의 일관성을 보장하기 위해 특정 프로세스/스레드만 진입해서 실행 가능한 코드 영역
  - = Mutual Exclusion
- 상호 배제를 동기화 기법으로 구현한 것이 Mutex와 Semaphore

### 2. 뮤텍스란?

- 여러 프로세스/스레드가 공유 자원에 동시에 접근하는 것을 제한하기 위한 락
- boolean 타입의 Lock 변수로 잠금 여부를 알 수 있음
- 1개의 프로세스/스레드만 뮤텍스 소유 및 해제 가능
- acquire 메소드로 뮤텍스 소유, release 메소드로 뮤텍스 해제
- non-busy-wait: 대기 큐에서 CPU 자원을 내려놓고 대기

```java
public static void main(String[] args) {
  Person Ocean = new Person("오션");
  Person Sea = new Person("바다");

  Ocean.start();
  Sea.start();
}
```

```java
class Person extends Thread {
  static final ReentrantLock mutex = new ReentrantLock();

  public void run() {
    String myName = this.getName();
    try {
      mutex.lock(); // acquire
      System.out.println(myName + "이(가) 뮤텍스 획득");
      Thread.sleep(2000);
      System.out.println(myName + "이(가) 뮤텍스 해제");
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    } finally {
      mutex.unlock(); // release
    }
  }
}
```

❖ 자바에서는 mutex를 직접적으로 지원해주지 않아서 ReentrantLock을 사용

### 3. 세마포어란?

- 여러 프로세스/스레드가 공유 자원에 동시에 접근하는 것을 제한하기 위한 정수형 변수
- 정수형 변수의 값만큼 프로세스/스레드가 접근 가능하다고 표시
- mutex와 다르게 1개 이상의 프로세스/스레드가 접근 가능
- wait(p) 작업으로 정수값 감소, signal(v) 작업으로 정수값 증가
  - 각각 P연산, V연산이라고도 불림
- non-busy-wait: 대기 큐에서 CPU 자원을 내려놓고 대기
- 이진 세마포어 (0, 1): 최대 1개의 프로세스/스레드만 접근 가능한 세마포어
- 카운팅 세마포어 (n): 최대 n개의 프로세스/스레드만 접근 가능한 세마포어
- 대기 큐에서 나오는 방식에 따라 강성 세마포어(FIFO) / 약성 세마포어(무작위)로 나뉨

```java
public static void main(String[] args) {
  Person Ocean = new Person("오션");
  Person Sea = new Person("바다");
  Person Sky = new Person("하늘");

  Ocean.start();
  Sea.start();
  Sky.start();
}
```

```java
class Person extends Thread {
  static final Semaphore semaphore = new Semaphore(2);

  public void run() {
    String myName = this.getName();
    try {
      semaphore.acquire();
      System.out.println(myName + "이(가) 세마포어 획득");
      Thread.sleep(2000);
      System.out.println(myName + "이(가) 세마포어 해제");
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    } finally {
      semaphore.release();
    }
  }
}
```

### 4. 비교

공통점

- 동시에 실행되는 프로세스/스레드들 간 공유 자원 보호
- 잘못 사용하면 교착 상태 발생 가능
  - 스레드가 mutex를 acquire하고 release를 하지 않으면 데드락 발생 가능

차이점

- 뮤텍스는 락, 세마포어는 공유 변수
- 뮤텍스는 1개의 프로세스/스레드 접근, 세마포어는 n개의 프로세스/스레드 접근
- 뮤텍스는 락을 소유한 프로세스/스레드만 락 해제 가능, 세마포어는 락을 소유하지 않은 프로세스/스레드도 락 해제 가능
- 그러므로 뮤텍스와 이진 세마포어도 비슷하지만 다르다
- 세마포어는 작업 간 실행 순서 동기화 가능
