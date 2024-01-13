- 자바 마이크로벤치마킹은 매우 어려운 일
- 마이크로벤치마킹 툴의 업계 표준인 JMH 사용법을 익힐 것
- 가장 좋은 툴로 잘 알려진 함정들과 베어 트랩을 피해 가라

## 1. 자바 성능 측정 기초

- 벤치마크 = 입출력을 지닌 일종의 블랙 박스
  - 결과를 추측/추론하기 위한 것
  - 데이터를 모으는 것에 현혹되지 않도록 주의하라

> 벤치마크에서 수치는 별로 중요하지 않습니다.  
> 이 수치들로부터 어떤 모델을 이끌어 내느냐, 하는 점이 관건입니다.
>
> ⎯ 알렉세이 시필레프

- 벤치마크를 통해 공정한 테스트를 해야 함
  - 가급적 시스템의 어느 한 곳만 변경하고 다른 외부 요인은 벤치마크 안에 두고 통제
  - 순수하게 공정한 테스트는 현실적으로 어렺지만 최소한 반복은 할 수 있어야 할 것
- 자바 플랫폼 벤치마크의 가장 큰 문제점 = 자바 런타임의 정교함
  - JVM의 자동 최적화 때문
  - 자바 코드 실행은 JIT 컴파일러, 메모리 관리, 그밖의 서브 시스템과 완전히 떼어놓을 수 없음
- 마이크로벤치마크는 물밑의 런타임과 애플리케이션 코드를 확실히 떼어놓기 어려움
- JVM은 가동 준비를 마칠 수 있게 웜업 기간을 두는 게 좋음
  - 보통 벤치마크 대상 코드들 여러 번 반복 실행하는 식으로 예열
- 타이밍 캡처 도중 GC가 발생할 수 있으니 GC 이벤트 정보도 필요
  - 아래와 같이 커맨드를 작성하면 GC 로그도 출력됨

```bash
java -verbose:gc ClassName
```

까다로운 JVM을 위한 벤치마크 방법

- 시스템 전체를 벤치마크
  - 저수준 수치는 무시
  - 전체 결과에 대한 평균으로 더 큰 규모에서 유의미한 결과만 얻기
  - 대부분의 상황에서 대부분의 개발자에게 필요한 접근 방식
- 공통 프레임워크를 이용한 처리
  - 저수준 결과를 의미있게 비교하기 위한 방법
  - 최적화 및 외부 제어 변수가 잘 관리되도록 OpenJDK의 개발 흐름을 잘 따라가야 함
  - JMH가 바로 그 주인공

## 2. JMH 소개

### 2.2 휴리스틱: 마이크로벤치마킹은 언제 하나?

- 일반적으로 저수준 분석이나 마이크로벤치마킹을 하는 주요 유스케이스 3가지
  - 사용 범위가 넓은 범용 라이브러리 코드 개발
  - OpenJDK 또는 다른 자바 플랫폼 구현체 개발
    - JMH도 원래 OpenJDK 개발팀에서 만든건데 입소문을 타고 유명해졌음
  - 지연에 극도로 민감한 코드 개발
- 일반적으로 마이크로벤치마크는 가장 극단적인 애플리케이션에 한하여 사용하는 게 좋다
- 마이크로벤치마킹은 거의 쓸 일이 없지만 일부 기본 이론과 복잡성은 알아두는 게 좋다

### 2.3 JMH 프레임워크

> JMH는 자바를 비롯해 JVM을 타깃으로 하는 언어로 작성된 나노/마이크로/밀리/매크로 벤치마크를 제작, 실행, 분석하는 자바 도구입니다.
>
> ⎯ OpenJDK

- JMH는 JVM을 빌드한 사람들이 직접 만든 프레임워크
  - JVM 버전별로 숨겨진 함정과 최적화 베어 트랩들에 대해 잘 알고 있음
  - 각 JVM 릴리즈마다 함께 진화했음
- JMH는 벤치마크 코드에 애너테이션을 붙여서 사용

### 2.4 벤치마크 실행

- Maven을 이용해서 쉽게 설정 가능

```bash
mvn archetype:generate \
  -DinteractiveMode=false \
  -DarchetypeGroupId=org.openjdk.jmh \
  -DarchetypeArtifactId=jmh-java-benchmark-archetype \
  -DgroupId=org.sample \
  -DartifactId=test \
  -Dversion=1.0
```

- Gradle의 경우 커뮤니티에서 지원하는 바인딩 사용

```gradle
plugins {
  id "me.champeau.jmh" version "0.7.2"
}
```

```gradle
dependencies {
  implementation 'org.openjdk.jmh:jmh-core:1.35'
  jmhAnnotationProcessor 'org.openjdk.jmh:jmh-generator-annprocess:1.35'
}
```

- 벤치마크 메소드에 `@Benchmark` 애너테이션을 붙여서 사용

```java
public class MyBenchmark {
  @Benchmark
  public void testMethod() {
    // code stub
  }
}
```

- 벤치마크 설정을 위한 매개변수 세팅

```java
public class MyBenchmark {
  public static void main(String[] args) throws RunnerException {
    Options opt = new OptionsBuilder()
      .include(SortBenchmark.class.getSimpleName())
      .warmupIterations(100)
      .measurementIterations(5).forks(1)
      .jvmArgs("-server", "-Xms2G", "-Xmx2G").build();
    new Runner(opt).run();
  }
}
```

JMH의 블랙홀

- JMH는 벤치마크 메소드가 반환한 단일 결과값을 암묵적으로 블랙홀에 할당
- 블랙홀은 성능 오버헤드를 낮추고자 JMH 프레임워크 제작자가 개발한 것
- JVM이 메소드 내 실행 코드가 부수 효과를 일으키지 않고 사용되지 않을 경우 해당 메소드를 삭제하기 때문에 취하는 조치
- 블랙홀이 벤치마크에 영향을 주는 최적화를 방지하기 위한 4가지 장치
  - **런타임에 죽은 코드를 제거하는 최적화를 못 하게 한다**
  - **반복되는 계산을 상수 폴딩하지 않게 만든다**
  - **값을 읽거나 쓰는 행위가 현재 캐시 라인에 영향을 끼치는 잘못된 공유 현상을 방지한다**
  - **쓰기 장벽으로부터 보호한다**

<br>

JVM과 밀접하게 맞닿아 작동하는 JMH의 아주 강력한 기능

- **컴파일러를 제어한다**
- **벤치마크 도중 CPU 사용 수준을 시뮬레이션한다**
- `@CompilerControl` 애너테이션을 이용해서 컴파일 성능 이슈 확인
  - `@CompilerControl(CompilerControl.Mode.DONT_INLINE)` = 인라인 최적화를 하지 않도록 지시
  - `@CompilerControl(CompilerControl.Mode.INLINE)` = 인라인 최적화를 하도록 명시
  - `@CompilerControl(CompilerControl.Mode.EXCLUDE)` = 메소드 컴파일 제외

JMH 코드 예시

```java
@State(Scope.Benchmark)
@BenchmarkMode(Mode.Throughput)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@OutputTimeUnit(TimeUnit.SECONDS)
@Fork(1)
public class SortBenchmark {
  private static final int N = 1_000;
  private static final List<Integer> testData = new ArrayList<>();

  @Setup
  public static final void setup() {
    Random randomGenerator = new Random();
    for (int i = 0; i < N; i++) {
      testData.add(randomGenerator.nextInt(Integer.MAX_VALUE));
    }
    System.out.println("Setup complete");
  }

  @Benchmark
  public List<Integer> classicSort() {
    List<Integer> copy = new ArrayList<>(testData);
    Collections.sort(copy);
    return copy;
  }

  @Benchmark
  public List<Integer> standardSort() {
    return testData.stream().sorted().collect(Collectors.toList());
  }

  @Benchmark
  public List<Integer> parallelSort() {
    return testData.stream().parallel().sorted().collect(Collectors.toList());
  }

  public static void main(String[] args) throws RunnerException {
    Options opt = new OptionsBuilder()
      .include(SortBenchmark.class.getSimpleName())
      .warmupIterations(100)
      .measurementIterations(5).forks(1)
      .jvmArgs("-server", "-Xms2G", "-Xmx2G").build();
      .addProfiler(GCProfiler.class)
      .addProfiler(StackProfiler.class)
      .build();
    new Runner(opt).run();
  }
}
```

## 3. JVM 성능 통계

- 성능 분석은 실험과학이므로 결과 데이터 분포를 다루는 일이 필수
- 결과는 눈에 탁 띄는 신호로 깔끔하게 나타나지 않으므로 통계적으로 분석해야 함

### 3.1 오차 유형

**랜덤 오차(random error)**

- 측정 오차 혹은 무관계 요인이 상관관계 없이 결과에 영향을 미침
- 정밀도(precision): 랜덤 오차의 수준을 나타내는 용어

**계통 오차(systematic error)**

- 알 수 없는 요인이 상관관계를 가지면서 측정에 영향을 미침
- 정확도(accuracy): 계통 오차의 수준을 나타내는 용어

❖ 정밀도와 정확도의 차이 나타내는 그림

![accuracy-and-precision](https://github.com/nmin11/TIL/assets/75058239/40d2915d-0385-4feb-8171-096da3a65b6a)

### 3.2 비정규 통계학

긴 꼬리형 비정규 분포 다루기

- 고동적 범위 분포(high dynamic range distribution)
- 측정값의 동적 범위 = 최대값 / 최소값
- [HdrHistogram](https://github.com/HdrHistogram/HdrHistogram) 라이브러리를 사용해서 정교한 분석을 할 수 있음

```gradle
dependencies {
  implementation 'org.hdrhistogram:HdrHistogram:2.1.12'
}
```

```java
public class BenchmarkWithHistogram {
  private static final long NORMALIZER = 1_000_000;
  private static final Histogram HISTOGRAM = new Histogram(TimeUnit.MINUTES.toMicros(1), 2);

  public static void main(String[] args) throws Exception {
    final List<String> values = Files.readAllLines(Paths.get(args[0]));
    double last = 0;
    for (final String tVal : values) {
      double parsed = Double.parseDouble(tVal);
      double gcInterval = parsed - last;
      last = parsed;
      HISTOGRAM.recordValue((long) (gcInterval * NORMALIZER));
    }
    HISTOGRAM.outputPercentileDistribution(System.out, 1000.0);
  }
}
```

- 코드 실행 시 출력되는 맨자료는 분석하기 힘드니 [온라인 포매터](http://hdrhistogram.github.io/HdrHistogram/plotFiles.html)를 사용할 것

## 4. 통계치 해석

- 애플리케이션을 측정해서 얻은 결과값을 해석하는 일이야말로 가장 힘들고 어려운 일
- 분석자는 데이터 및 도메인을 충분히 이해해야 함
- [페이팔 통계학 및 분석 기법 활용 사례](https://medium.com/paypal-tech/statistics-for-software-e395ca08005d) 참고해보면 좋음

## 5. 마치며

- **유스케이스를 확실히 모르는 상태에서 마이크로벤치마킹하지 마세요**
- **그래도 마이크로벤치마킹을 해야 한다면 JMH를 이용하세요**
- **여러분이 얻은 결과를 가능한 한 많은 사람과 공유하고 회사 동료들과 함께 의논하세요**
- **항상 잘못될 가능성을 염두에 두고 여러분의 생각을 지속적으로 검증하세요**
