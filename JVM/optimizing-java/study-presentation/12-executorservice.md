# ExecutorService 알아보기

⎯ 남궁민

## 12장에서 헷갈리는 개념들

- Semaphore
- SpinLock
- ReentrantLock
- CAS (Compare And Swap)
- Atomic Variables
- CountDownLatch
- CyclicBarrier
- ForkJoinPool
- ExecutorService

## 집중해서 공부하고 싶은 개념

- ~~Semaphore~~
- ~~SpinLock~~
- ~~ReentrantLock~~
- ~~CAS (Compare And Swap)~~
- ~~Atomic Variables~~
- CountDownLatch
- ~~CyclicBarrier~~
- ~~ForkJoinPool~~
- **ExecutorService**

## ExecutorService란?

- 비동기 작업을 단순화하는 JDK API
- 자동으로 스레드 풀과 태스크 할당 API를 제공
  - 풀에 담긴 스레드를 어떻게 관리하고 몇 개의 스레드를 생성할지 자동으로 결정

## 인스턴스 만들기

- 가장 쉬운 방법은 `Executors` 클래스의 정적 팩토리 메서드를 사용하는 것
  - `newFixedThreadPool(int nThreads)` : 고정된 크기의 스레드 풀
  - `newCachedThreadPool()` : 필요에 따라 스레드를 생성하는 스레드 풀
  - `newSingleThreadExecutor()` : 단일 스레드 풀
  - `newScheduledThreadPool(int corePoolSize)` : 스케줄링 기능을 제공하는 스레드 풀

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
```

- 인터페이스이기 때문에 구현체를 `java.util.concurrent` 패키지에서 선택하거나, 직접 생성할 수도 있음
  - 하지만 일반적인 상황에서 세부적인 설정은 불필요

```java
ExecutorService executor = new ThreadPoolExecutor(
  10, 10, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>()
);
```

## 태스크 할당하기

- `Runnable` 또는 `Callable` 태스크를 실행할 수 있음

`execute(Runnable command)` : `Runnable` 태스크를 실행

```java
executor.execute(runnableTask);
```

`submit(task)` : 태스크를 실행하고 `Future` 객체를 반환

```java
Future<String> future = executor.submit(callableTask);
```

`invokeAll(tasks)` : 모든 태스크를 실행하고 `Future` 객체의 리스트를 반환

```java
List<Future<String>> futures = executor.invokeAll(callableTasks);
```

`invokeAny(tasks)` : 하나의 태스크만 실행하고 `Future` 객체를 반환

```java
String result = executor.invokeAny(callableTasks);
```

## Shutdown

- ExecutorService는 태스크가 없을 때 자동으로 종료되지 않고 새로운 태스크를 기다림
- 종료 메소드들
  - `shutdown()` : 현재 진행 중인 태스크를 마치고 종료
  - `shutdownNow()` : 현재 진행 중인 태스크를 취소하고 종료

```java
List<Runnable> notExecutedTasks = executor.shutdownNow();
```

- Oracle에서 권장하는 종료 방법
  - 작업 중단을 시켜두고, 만료 시간 이후에 강제 종료

```java
executor.shutdown();
try {
  if (!executor.awaitTermination(800, TimeUnit.MILLISECONDS)) {
    executor.shutdownNow();
  } 
} catch (InterruptedException e) {
  executor.shutdownNow();
  Thread.currentThread().interrupt();
}
```

### CountDownLatch를 활용해서 종료하는 방법

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
CountDownLatch latch = new CountDownLatch(2);
for (int i = 0; i < 2; i++) {
  executor.submit(() -> {
    try {
      Thread.sleep(1000);
      latch.countDown();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  });
}
latch.await();
executor.shutdown();
```

## Future 인터페이스

- 태스크를 할당할 때 반환되는 Future 객체
- 이 객체를 통해 태스크 실행 결과, 태스크 상태(실행 여부) 등을 확인할 수 있음

`get`

```java
String result = future.get(200, TimeUnit.MILLISECONDS);
```

- `Callable`의 경우 결과를 반환하고, `Runnable`의 경우 null 반환
- 결과를 기다리는 블로킹 메소드이므로, 필요한 경우 타임아웃을 설정할 것

`isDone`

```java
boolean done = future.isDone();
```

`cancel`

```java
boolean canceled = future.cancel(true);
boolean isCanceled = future.isCancelled();
```

## ScheduledExecutorService

- 사전에 정의한 딜레이 이후, 혹은 주기적으로 태스크를 실행

1초 딜레이 이후 실행

```java
executor.schedule(callableTask, 1, TimeUnit.SECONDS);
```

100ms 딜레이 이후 실행, 그 후 450ms마다 동일한 태스크 실행

```java
executor.scheduleAtFixedRate(runnableTask, 100, 450, TimeUnit.MILLISECONDS);
```

100ms 딜레이 이후 실행, 그 후 태스크 간의 150ms 딜레이

```java
executor.scheduleWithFixedDelay(runnableTask, 100, 150, TimeUnit.MILLISECONDS);
```

## ExecutorService vs Fork/Join

- 자바 7 이후 많은 개발자들이 ExecutorService를 Fork/Join 으로 대체했음
- Fork/Join은 작업을 작은 단위로 나누어 분할 정복하는 방식
- ExecutorService는 스레드 및 태스크에 대한 세분화된 제어를 할 수 있음
  - "하나의 스레드에 하나의 태스크"라는 독립적인 태스크 환경에 적합

## References

- [A Guide to the Java ExecutorService](https://www.baeldung.com/java-executor-service-tutorial)
- [ExecutorService – Waiting for Threads to Finish](https://www.baeldung.com/java-executor-wait-for-threads)
