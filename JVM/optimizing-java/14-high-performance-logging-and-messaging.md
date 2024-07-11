저지연 / 고성능 시스템에서 핵심적인 고려 사항 2가지 = **로깅 + 메시징**

## 1. 로깅

- 대부분의 개발자들은 로깅 라이브러리를 대충 고른다
- 그다지 흥미로운 주제는 아니기 때문
- 대충 판단하고 방관하다가 기술 부채로 이어지기도 함
- 하지만 로거는 모든 애플리케이션에서 가장 중요한 부분
- 고성능 환경에서는 처리 정확도와 리포팅이 속도만큼 중요
- 로그는 운영팀이 이슈의 단서를 찾는 데 도움이 되므로 사후 조사를 할 수 있을 정도로 충분한 로그를 남겨야 한다

### 1.1 로깅 벤치마크

- 이 절에서는 가장 많이 쓰이는 3 로거의 성능 벤치마크를 살펴볼 것
  - `Logback`, `Log4j`, `java.util.logging`
  - [스티븐 콘놀리의 오픈 소스 프로젝트](https://github.com/stephenc/java-logging-benchmarks)

벤치마크 결과 요약

- `java.util.logging` 은 다른 로거에 비해 성능이 2.5배 이상 안 좋음
- Logback이 Log4j보다 약간 더 빠름
- 대신 Log4j 포맷은 전반적으로 일관된 결과를 보여줌

## 2. 성능에 영향이 적은 로거 설계하기

- 저지연 애플리케이션에서 로거가 비즈니스 로직 성능에 병목 현상을 초래해선 안 됨

> 고객사 시스템이 로깅 때문에 좋지 않은 영향을 받았다는 소리는 지금까지 거의 들은 바 없습니다.  
> 허용 시간을 4.5초로 잡았는데 실제 로깅 시간이 4.2초나 차지한 극단적인 사례는 있었죠.
>
> ⎯ 커크 페퍼다인

Log4j 2.6 버전

- 커크가 제기한 문제를 steady-state의 garbage-free 로거로서 해결
- 각 로그 메시지마다 임시 객체를 생성하는 대신 객체를 재사용하는 방식으로 수정
  - **object pool pattern**
  - ThreadLocal 필드를 이용해 String → Byte 변환 시 버퍼 재사용

## 3. 리얼 로직 라이브러리를 이용해 지연 줄이기

- Real Logic: 저수준 이해가 고성능 설계에 영향을 미친다는 **기계 공감** 접근 방식을 주장한 마틴 톰슨이 설립한 영국 회사
- **아그로나** : 자바용 고성능 자료 구조 및 유틸리티 메소드
- **SBE** : 시리얼라이즈된 바이트 표현을 위한 메시지 코딩을 위한 프레임워크
- **에어론** : 효율적/안정적인 UDP 유니캐스트, UDP 멀티캐스트, IPC 메시지 전송
- **아티오** : 탄력적인 고성능 FIX 게이트웨이

### 3.1 아그로나

https://github.com/real-logic/agrona

- 저지연 애플리케이션 전용 구성 요소를 담아놓은 라이브러리
- 표준 라이브러리만으로 유스케이스를 충족시키기 어렵다면 직접 코드를 작성하기 전에 아그로나 라이브러리를 검토해보는 것이 합리적

**버퍼**

- 자바에는 direct/non-direct 버퍼를 추상화한 `ByteBuffer` 클래스가 존재
- 기존에는 버퍼 타입별 최적화를 적용할 수 없음
- 아그로나는 저마다 독특한 특성을 지닌 4가지 버퍼 지원
- `DirectBuffer` 인터페이스: 버퍼에서 읽기만 가능, 최상위 상속 계층에 위치
- `MutableDirectBuffer` 인터페이스: `DirectBuffer` 상속, 버퍼 쓰기도 가능
- `AtomicBuffer` 인터페이스: `MutableDirectBuffer` 상속, 메모리 액세스 순서까지 보장
- `UnsafeBuffer` 클래스: `Unsafe` 를 이용해 `AtomicBuffer` 를 구현한 클래스
- 아그로나 구현 코드는 매우 저수준이고 `Unsafe` 를 광범위하게 사용

**리스트, 맵, 세트**

- 아그로나는 리스트 구현체를 여럿 제공
- 자바는 배열 안에서 객체를 나란히 배치하는 장치가 따로 없고, 표준 컬렉션의 결과물은 항상 레퍼런스의 배열
  - 객체 자체의 크기 오버헤드
  - 자동박싱/언박싱
- 아그로나 `ArrayListUtil` 을 이용하면 리스트 순서는 안 맞아도 `ArrayList` 에서 신속하게 원소 제거 가능
- 아그로나 맵, 세트 구현체는 키/값을 해시 테이블 자료 구조에 나란히 저장
  - 키가 충돌하면 다음 값은 해시 테이블의 바로 다음 위치에 저장
  - 동일한 캐시 라인에 있는 기본형 매핑을 재빠르게 액세스할 수 있음

**큐**

- 아그로나 큐는 표준 `java.util.Queue` 인터페이스 준수
  - 표준 큐 구현체 대신 사용 가능
- 순차 처리용 컨테이너 지원 기능이 부가된 `org.agrona.concurrent.Pipe` 인터페이스도 함께 구현됨
  - 원소 카운팅, 수용 가능한 최대 원소 개수 반환, 원소 비우기 작업 지원
  - 큐는 모두 락-프리하고 `Unsafe` 를 사용하므로 저지연 시스템에 안성맞춤


`org.agrona.concurrent.AbstractConcurrentArrayQueue`

- 서로 다른 생산자/소비자 모델을 제공하는 일련의 큐를 1차적으로 지원하는 추상 클래스
- `OneToOneConcurrentArrayQueue`
  - 유일한 동시 액세스는 생산자, 소비자가 자료 구조에 동시에 접근할 때 발생한다
  - 한번에 하나의 스레드에 의해서만 업데이트되는 head, tail 포인터
- `ManyToOneConcurrentArrayQueue`
  - 생산자가 다수인 경우 tail 위치를 업데이트할 때 부가적인 제어 로직 필요
  - while 루프에서 `Unsafe.compareAndSwapLong` 을 사용하면 꼬리가 업데이트될 때까지 큐 테일을 안전하게, 락-프리하게 업데이트 가능
  - 소비자는 하나이므로 경합이 없음
- `ManyToManyConcurrentArrayQueue`
  - 생산자 다수, 소비자 다수인 경우 head/tail 양쪽을 업데이트해야 함
  - 이 정도의 제어를 위해 `compareAndSwap` 을 감싸는 while 루프 필요
  - 조정 과정이 가장 복잡하기 때문에 안전이 보장된 경우에만 사용할 것

**링 버퍼**

`org.agrona.concurrent.RingBuffer`

- 프로세스 간 통신용 binary encoding 메시지 교환 인터페이스
- `DirectBuffer` 를 이용해 메시지 off-heap 저장소 관리
- 메시지가 `RecordDescriptor` 자료 구조에 저장됨
- 구현체: `OneToOneRingBuffer`, `ManyToOneRingBuffer`
- 쓰기 작업: 소스 버퍼를 전달받아 메시지를 별도의 버퍼에 써넣음
- 읽기 작업: 메시지 핸들러의 `onMessage()` 메소드로 콜백

### 3.2 단순 바이너리 인코딩

- 저지연 성능에 알맞게 개발된 바이너리 인코딩 방식
- 금융 시스템에서 쓰이는 FIX 프로토콜에 특화됨
- GC를 유발하지 않고, 메모리 액세스 문제를 최적화하지 않고도 효율적인 자료 구조를 통해 저지연 메시지 전달 가능

**카피-프리, 네이티브 타입 매핑**

- SBE의 객체 복사를 하지 않는 카피-프리 기술은 중간 버퍼를 쓰지 않고 메시지를 인코딩/디코딩하도록 설계되었음
- 하지만 하부 버퍼에 직접 쓰는 작업은 설계 비용이 듦
- 어셈블리 명령어에 네이티브하게 매핑하는 타입 역시 카피-프리하게 작업하는 것이 좋음

**정상 상태 할당**

- 자바의 할당 작업 자체도 CPU 사이클을 소모하지만 사용 후 객체를 지우는 작업도 문제
- GC의 STW는 성능 모델에 유의미한 편차를 가져옴
- SBE는 하부 버퍼에 flyweight pattern을 사용해서 allocate-free
  - 할당이 일어나지 않음

**스트리밍/단어 정렬 액세스**

- 자바에서 메모리 액세스는 범접할 수 없는 대상
- SBE는 메시지를 진행 방향으로 인코딩/디코딩하도록 설계
  - 정확하게 단어를 정렬할 수 있는 틀이 잡혀 있음


### 3.3 에어론

- 아그로나와 SBE에 기반한 툴
- 자바 및 C++ 용도로 개발된 UDP 유니캐스트, UDP 멀티캐스트, IPC 메시지 전송을 위한 수단
- 컴포넌트 라이브러리 형태이므로 어떤 프레임워크에도 얽매이지 않음

![aeron](https://github.com/nmin11/TIL/assets/75058239/a6fd9131-9c1d-425f-a366-716693233c89)

- media: 에어론이 통신하는 매개체 (UDP, IPC, 인피니밴드 등)
- media driver: 미디어와 에어론 사이의 연결 통로
- conductor: 전체 흐름 관장, 새 구독자/발행자 요청 리스닝, NAK 감지 및 재전송, 송신자/수신자가 최대 처리율을 낼 수 있게 함
- sender: 생산자로부터 데이터를 읽어 소켓으로 전송
- receiver: 소켓에서 데이터를 읽고 해당 채널/세션으로 전송

[sample 참조](https://github.com/real-logic/aeron/tree/master/aeron-samples/src/main/java/io/aeron/samples)

### 3.4 에어론의 설계 개념

[소개 영상](https://www.youtube.com/watch?v=tM4YskS94b0&ab_channel=StrangeLoopConference)

**전송 요건**

- OSI 4 전송 계층에서 메시징을 하므로 반드시 준수해야 할 요건들이 있음
- 정렬: 전송 계층은 무작위로 패킷을 받기에 메시지는 다시 정렬
- 신뢰성: 유실된 데이터를 재전송 요청하는 접속 수준의 신뢰성
- 배압: 부하가 높아지면 구독자는 압박을 받으므로 흐름 제어 및 배압 측정 서비스 지원 필요
- 혼잡: 저지연 네트워크라면 혼잡 제어 기능을 끄고, 다른 트래픽에 민감하다면 혼잡 제어 기능을 킬 것
- 다중화: 전체 성능을 떨어뜨리지 않으면서 단일 채널에서 다중 정보 스트림을 처리할 수 있어야 함

**지연 및 애플리케이션 원칙**

[에어론 위키](https://github.com/real-logic/aeron/wiki/Design-Principles)

- 정상 상태에서 가비지-프리 실현
  - GC 중단은 지연과 불가측성을 일으키는 주원인
  - 에어론은 GC 중단 방지를 위해 정상 상태를 보장하도록 설계되었음
- 메시지 경로에 스마트 배칭 적용
  - 스마트 배칭: 수신 메시지가 폭주하는 상황을 감안하여 설계된 알고리즘
  - 메시지 처리 도중 다른 메시지가 들어오면 용량이 허락하는 한도 내에서 같은 네트워크 패킷 안에 집어넣을 수 있음
  - 에어론은 적절한 자료 구조를 이용해 생산자가 공유 리소스에 쓰는 걸 지연시키지 않고도 배칭을 수행
- 메시지 경로의 락-프리 알고리즘
  - 락킹은 스레드를 블로킹하는 경합을 일으키며, 파킹 및 락에서 깨어나는 과정은 애플리케이션을 느려지게 만듦
  - 그러므로 락을 없애자!
- 메시지 경로의 논블로킹 I/O
  - 블로킹 I/O가 스레드를 블로킹하며 깨우는 비용도 무시할 수 없음
  - 그러므로 논블로킹 방식 사용
- 메시지 경로의 비예외 케이스
  - 애플리케이션은 소수의 edge-case를 제외하고는 기본 시나리오를 처리
  - 기본 시나리오의 실행 속도를 최적화
- 단일 출력기 원칙을 적용
  - 단일 출력기를 쓰면 액세스 제어/조정 작업이 단순해지고 경합도 줄어듦
- 공유 안 하는 상태가 더 좋다
  - 가변 데이터를 공유해야 하는 문제
  - private 또는 local 상태를 유지하는 건 모든 소프트웨어 설계 계층에서 매우 바람직한 일
- 쓸데없이 데이터를 복사하지 말라
  - 캐시 라인 무효화 및 다른 데이터 방출 가능성은 언제라도 문제가 될 수 있음
  - 복사를 줄이면 우발적인 메모리 변경을 방지하는 데 도움이 됨