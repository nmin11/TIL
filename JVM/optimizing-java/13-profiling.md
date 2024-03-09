- 프로파일링의 핵심 주제 2가지
  - **실행**
  - **할당**

13장에서는...

- 애플리케이션을 프로파일링하는 툴 소개
- 메모리 프로파일링 관련 기능을 제공하는 툴 소개

## 1. 프로파일링 개요

instrumentation

- JVM 프로파일링/모니터링 툴은 보통 저수준의 instrumentation을 사용
  - instrumentation: 프로그램의 여러 지점에 계측 행위를 끼워넣는 기술
- 수집한 데이터는 그래픽 콘솔에 피드백하거나 추후 분석 용도로 로그 저장
- 대부분 애플리케이션 시작 시 로드되는 agent나 실행 중인 JVM에 동적으로 부착하는 컴포넌트 형태로 구현
- 모니터링 툴, 경고 시스템, 프로파일러를 명확히 구분해야 함
- 프로파일링의 목표: 리팩토링 및 성능 최적화 대상 코드를 식별하는 것
- 성능 진단의 첫 단계: 문제를 일으키는 리소스를 찾아내는 것

## 2. 샘플링과 세이프포인팅 편향

- data point, stack trace는 대부분 샘플링을 통해 획득
- 데이터 수집 비용을 아끼기 위해 메소드 입출구는 보통 추적하지 않음
- 대신 스레드 실행 스냅샷을 낮은 빈도로 찍음
  - new relic thread profiler는 100ms마다 샘플링 (최적의 주기로 알려져 있음)

safepointing bias

- 대부분의 샘플링이 세이프포인트에서만 일어난다는 문제점
- 모든 스레드는 샘플을 뜨기 전에 세이프포인트에 다다라야 함
  - 모든 스레드를 세이프포인트에 두기 위한 오버헤드 가중
- 세이프포인트 지점에 있는 애플리케이션 상태만 샘플링 가능
  - 표본점 분포가 왜곡될 소지가 있음

`GetCallTree()`

- 실행 프로파일러는 대부분 핫스팟 C++ API에 있는 `GetCallTree()`를 사용해서 스레드의 스택 샘플 수집
- 일반적으로 agent 내부에서 샘플을 채취한 다음, 데이터를 로깅하거나 다른 프로세스로 전송
- 하지만 오버헤드가 만만치 않음
  - 활성 스레드가 N개면 스택 샘플을 수집할 때 JVM이 세이프포인트를 N번 해야 함

세이프포인팅 시간

- 성능 문제를 진단할 때 세이프포인팅 시간을 예의주시해야 함
- 세이프포인팅 시간이 높은 경우 아래의 JVM 플래그를 사용해서 추적해볼 것
  - GC 로그에 세이프포인팅 시간에 관한 추가 정보 로깅
  - 툴을 활용해서 세이프포인팅 시간과 OS 커널 중단 시간을 구분할 수도 있음

```bash
java -XX:+PrintGCApplicationStoppedTime
```

## 3. 개발자용 프로파일링 툴

### 3.1 VisualVM 프로파일러

- 실행 프로파일러, 메모리 프로파일러가 모두 들어 있고 사용하기 쉬운 무료 툴
- 하지만 기능이 한정되어 운영계 툴로는 거의 안 쓰임
  - drill down 기능이 부족함
- 개발/QA 환경에서의 애플리케이션 작동 상태 확인 용도
- 성능 엔지니어 입문 용도로는 괜춘

### 3.2 JProfiler

[overview 페이지](https://www.ej-technologies.com/products/jprofiler/overview.html)

- agent에 기반하는 유명 상용 프로파일러
- GUI 모드, headless 모드로 로컬 또는 원격으로 애플리케이션 프로파일링
- OS 지원 범위가 넓음

```bash
java -agentpath:/path/to/libjprofilerti.so=port=8849
```

- default 설정으로 프로파일링 대상 애플리케이션 시작 시 GUI 접속 대기
- 원격 프로파일링 설정, 원격 JVM 설정값 가이드를 위한 마법사 기능 제공

### 3.3 YourKit

[홈페이지](https://www.yourkit.com/)

- JProfiler와 여러모로 닮았음

```bash
java -agentpath:/path/to/bin/linux-x86-64/libyjpagent.so
```

⇒ JProfiler와 YourKit 모두 세이프포인팅 샘플링을 하기 때문에 편향과 한계점에 빠질 수 있음

### 3.4 JFR/JMC

*Java Flight Recorder / Java Mission Control*

[JMC docs](https://docs.oracle.com/en/java/java-components/index.html)

- Oracle JVM 전용

```bash
java -XX:+UnlockCommercialFeatures -XX:+FlightRecorder
```

- 그래픽 컴포넌트 JMC는 `$JAVA_HOME/bin/jmc` 바이너리 파일로 실행
- 대상 JVM에 JFR이 활성화되어 있어야 함

### 3.5 운영 툴

- 프로파일러의 본래 용도: 문제점 진단, 애플리케이션의 저수준에서의 동작 방식 파악
- 그러나 운영계 모니터링 툴로도 많이 쓰임
  - 현재 시스템 상태를 한눈에 보기 좋게 표현해주기 때문

**레드햇 서모스탯**

- 핫스팟 기반 JVM 전용 오픈 소스 서비서빌리티/모니터링 솔루션
- 단일 머신 및 클러스터 모두 모니터링 가능
- 이력 데이터 및 시점별 상태 정보는 몽고DB에 저장
- 아키텍처 확장이 가능해서 다음 용도로 사용 가능
  - 유저가 직접 만든 커스텀 지표 수집 및 분석
  - instrumentation 용도의 커스텀 코드 주입
  - 커스텀 플러그인 작성 및 툴링 통합
- 실제로 서모스탯 내장 기능은 대부분 플러그인 형태로 구현되어 있음

**뉴 렐릭**

[new relic java agent docs](https://docs.newrelic.com/docs/apm/agents/java-agent/getting-started/introduction-new-relic-java/)

- 클라우드 기반 애플리케이션용 SaaS 제품
- JVM 외에도 사용 범위가 넓은 범용 툴 세트
- JVM에 설치하려면 agent를 내려받고 스위치를 지정해서 JVM에 부착해야 함
- 범용 툴이기 때문에 JVM 기술에만 초점을 두지 않음
  - 따라서 JVM 정보를 더 깊이 분석하려면 전용 툴을 조합해야 할 수도 있음
- [java agent API](https://docs.newrelic.com/docs/apm/agents/java-agent/api-guides/guide-using-java-agent-api/) 제공
- [custom instrumentation](https://docs.newrelic.com/docs/apm/agents/java-agent/custom-instrumentation/java-custom-instrumentation/)을 구현해서 기본 기능을 확장할 수 있음
- 뉴 렐릭이 쏟아내는 데이터 양이 엄청나서 확실한 추이가 아니면 이렇다 할 특징을 잡아내기 어려울 때가 많음

## 4. 최신 프로파일러

*최신 오픈 소스 툴 3가지*

**[Honest Profiler](https://github.com/jvm-profiling-tools/honest-profiler)**

- 구글 기술팀에서 개발한 프로토타입 코드를 오픈 소스화
- 주목표
  - **다른 대부분의 프로파일러에 있는 세이프포인트 편향 제거**
  - **오버헤드가 아주 낮은 상태로 작동**
- 목표 달성을 위해 핫스팟 내부의 `AsyncGetCallTrace`라는 private API를 사용
- non-OpenJDK JVM에서는 사용 불가
- `SIGPROF` 유닉스 OS 시그널을 사용해서 프로파일링을 시작하고 종료
- 스레드만 따로 인터럽트하므로 전역 동기화 이벤트가 없음
  - 다른 프로파일러의 고질적인 경합 및 오버헤드 현상이 없음
- 비동기 콜백 내부에서 호출 트레이스는 lock-free한 ring buffer 안에 쓰인 후, 별도의 전용 스레드가 애플리케이션 중단 없이 세부 내용 로깅
- 단점: 일부 스레드 최상단에 Unkown이라고 표시되는 현상
  - 프로파일러가 자바 스택 트레이스로 정확하게 매핑되지 못하는 JVM 인트린직의 부수 효과

```bash
java -agentpath:/path/to/liblagent.so=interval=<n>,logPath=/path/to/log.hpl
```

- GUI는 JavaFX 기반이므로 OpenJFX가 설치되어 있어야 함
- 공식 배포 바이너리는 최신 linux 버전에만 사용 가능

**[perf](https://perf.wiki.kernel.org/index.php/Main_Page)**

- 리눅스 애플리케이션의 경량급 프로파일링 툴
  - 특정 Java/JVM 애플리케이션에 구애받지 않고, 하드웨어 성능 카운터를 읽음
- 리눅스 커널 `tools/perf` 디렉토리에 포함되어 있음
- performance counter: 하드웨어 이벤트를 카운팅하는 물리 레지스터
  - 실행된 명령어, 캐시 미스, 분기 예측 실패 등 애플리케이션 프로파일링의 근본을 형성하는 이벤트들
- perf 입장에서 런타임 환경이 동적인 자바는 조금 난해한 대상
  - perf 사용을 위해 자바 실행의 동적인 부분을 매핑할 브릿지 필요
- [perf-map-agent](https://github.com/jvm-profiling-tools/perf-map-agent)
  - 미지의 메모리 영역을 perf에 동적 심볼을 통해 매핑하는 브릿지 역할
  - 핫스팟은 가상 디스패치용 인터프리터와 점프 테이블을 동적 생성하므로 엔트리도 함께 생성해야 함
  - C로 작성된 agent, agent를 attach하는 자바 부트스트랩으로 구성됨

```bash
java -XX:+PreserveFramePointer -XX:+ExtendedDTraceProbes -XX:+UsePerfData
```

- perf로 시각화한 [flame graph](https://github.com/brendangregg/FlameGraph) 가 장관
  - [넷플릭스 기술 블로그](https://netflixtechblog.com/java-in-flames-e763b3d32166)

[Async Profiler](https://github.com/async-profiler/async-profiler)

- Honest Profiler와 perf의 장점을 결합한 프로파일러
  - 같은 `AsyncGetCallTrace`를 사용하고, perf에 전적으로 의존

## 5. 할당 프로파일링

- 전체 프로파일링에서 실행 프로파일링의 비중이 높음
- 하지만 대부분의 애플리케이션은 일정 수준의 메모리 프로파일링도 병행해야 함
- 할당 프로파일링 = 애플리케이션의 할당 동작을 살피는 표준 메모리 프로파일링
- 할당 프로파일링에는 여러 접근 방식이 있음
  - jmap 등의 툴이 사용하는 HeapVisitor 방식: 힙에 있는 모든 객체를 방문하는 방식

JVM에서 메모리 할당을 지시하는 바이트코드들

- `new` : 주어진 타입의 새로운 객체를 생성
- `newarray` : 기본형 배열 공간 할당
- `anewarray` : 주어진 타입의 객체 배열 공간 할당
- instrumentation 할 바이트코드도 이들뿐
- [ASM](https://asm.ow2.io/) 을 활용해서 바이트코드를 조작할 수 있음

TLAB을 이용해 할당 프로파일링할 수도 있음

- Async 프로파일러는 핫스팟 전용 콜백을 이용해 다음 시점에 알림을 수신하는 TLAB 샘플링 기능 지원
  - 새로 만든 TLAB 객체가 할당될 때
  - TLAB 밖에 객체가 할당될 때
- 객체 할당을 전부 세지 않고 TLAB 평균 크기 n KB 단위로 할당을 기록

## 6. 힙 덤프 분석

- 빼놓을 수 없는 **할당 프로파일링** 기법
- 전체 힙의 스냅샷을 툴로 자세히 분석하며, 객체 그래프의 형상/구조를 파악
- 하지만 힙 덤프의 크기가 문제
  - 덤프한 메모리 크기의 300~400%
  - 수 GB에 이르는 힙은 골치 아픔
  - 리소스가 빵빵한 워크스테이션에 로드해야 하고 과한 지연 없이 덤프를 처리해야 함
  - 전체 덤프를 한번에 로드할 수 없으면 워크스테이션이 덤프 파일을 분할해서 로드할 수 있어야 함
  - 힙 파일 생성은 힙을 샅샅이 뒤져 덤프 파일을 쓰는 과정이므로 STW 이벤트도 불가피

⇒ 대부분의 애플리케이션에서 프로파일링의 주 관심사는 **할당 프로파일링**과 **힙 프로파일링** (실행 프로파일링에 너무 몰입하지 않기)
