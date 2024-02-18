## 1. 트레이드오프와 탈착형 수집기

- 썬 마이크로시스템즈 환경에서 GC는 탈착형 서브시스템(Pluggable Subsystem)으로 취급됨
  - 같은 자바 프로그램이라도 여러 GC를 갖고 돌려볼 수 있음
  - 완전무결한 범용 GC 알고리즘은 없음
- 개발자가 GC를 선정할 때 고민해야 할 포인트들
  - 중단 시간
  - 처리율 (런타임 대비 GC 시간 비율)
  - 중단 빈도
  - 회수 효율 (GC 사이클 당 회수되는 메모리 양)
  - 중단 일관성

## 2. 동시 GC 이론

- 동시 GC는 GC를 수행하면서 애플리케이션을 계속 실행하는 방식
- 물론 그만큼 실제 애플리케이션 작업에 투입 가능한 처리 역량을 빼앗기고 수집 로직은 더 복잡해짐
- 우선 필수 GC 용어 및 기술부터 알아볼 것

### 2.1 JVM 세이브포인트

- JVM은 어떻게 STW를 일으키는가?
- JVM은 스레드를 통제하기 위해 애플리케이션 스레드마다 세이브포인트(Safepoint)를 두고 있음
- 세이브포인트 처리 규칙
  - JVM은 강제로 스레드를 세이브포인트 상태로 바꿀 수 없다.
  - JVM은 스레드가 세이프포인트 상태에서 벗어나지 못하게 할 수 있다.
- 스레드는 세이브포인트 요청을 받았을 때 제어권을 반납해야 함
  - 이를 위한 코드(배리어)가 VM 인터프리터 구현에 어딘가에 있어야 함

스레드가 세이브포인트 상태로 바뀌는 일반적인 경우들

1. JVM이 전역 'time to safepoint' 플래그를 세팅한다.
2. 각 애플리케이션 스레드는 폴링하면서 이 플래그가 세팅됐는지 확인한다.
3. 애플리케이션 스레드는 일단 멈췄다가 다시 깨어날 때까지 대기한다.

작동 원리

- 인터프리터에서 바이트코드 2개를 실행할 때마다 체크
- 컴파일드 코드 → 메소드가 회귀하는 지점에 세이브포인트 폴링 코드 삽입

자동 세이브포인트 상태

- 모니터에서 차단
- JNI 코드 실행

꼭 세이브포인트가 되는 건 아닌 경우

- 바이트 코드 실행 도중
- OS의 인터럽트

### 2.2 삼색 마킹

작동 원리

- GC 루트에 회색 표시
- 다른 객체는 모두 흰색 표시
- 마킹 스레드가 임의의 회색 노드로 이동
- 마킹 스레드가 흰색 표시된 자식 노드를 만나면 자식 노드들을 모두 회색 표시한 뒤 해당 노드에 검은색 표시
- 회색 노드가 하나도 남지 않을 때까지 반복
- 검은색 객체는 모두 reachable 하므로 회수 대상에서 제외
- 흰색 객체는 모두 unreachable 하므로 회수 대상에 포함

**SATB**

*Snapshot At The Beginning (일단 스냅샷 뜨기)*

- 수집 사이클을 시작할 때 접근 가능하면 라이브 객체로 간주
- 애플리케이션 스레드가 마킹 작업 도중에 객체를 변경하는 것을 조심해야 함
  - 해결 방안 1 - 쓰기 배리어: 변경된 객체는 색깔을 회색으로 바꾸고 처리할 노드 세트에 추가한다
  - 해결 방안 2 - main phase 이후 fixup 단계에서 바로잡는다

## 3. CMS

*Concurrent Mark Sweep*

- 테뉴어드(올드) 공간 전용 수집기
- 보통 영 세대 전용 ParNew 수집기와 함께 사용됨
- 중단 시간 최소화를 위해, 애플리케이션 스레드 실행 중에 많은 일을 함께 함
- 삼색 마킹 알고리즘에 따라 수집하므로, 레코드를 바로잡기 위한 복잡한 로직 필요

GC 작업 순서

1. Initial Mark (STW)
2. Concurrent Mark
3. Concurrent Preclean
4. Remark (STW)
5. Concurrent Sweep
6. Concurrent Reset

Initial Mark

- 목적: GC 출발점(initial pointer, 목적상 GC 루트와 동일) 얻기
- 다른 메모리 영역은 신경 쓰지 않고 하나의 GC 풀에 집중

Concurrent Mark

- 삼색 마킹 알고리즘을 힙에 적용하면서 나중에 생길 변경사항 추적

Concurrent Preclean

- 목적: Remark 단계의 STW 시간 줄이기
- 카드 테이블을 이용해 Concurrent Mark 도중 영향을 끼친 마킹 조정

CMS 장단점

- 짧은 STW
- 단일 풀 GC 사이클 시간이 긺
- 사이클 실행 중 애플리케이션 처리율 감소
- GC의 객체 추적 때문에 더 많은 메모리 소모
- GC 수행을 위해 더 많은 CPU 시간 소모
- 힙을 압착하지 않으므로 테뉴어드 영역의 단편화 발생 가능

### 3.1 CMS 작동 원리

- 애플리케이션 스레드와 동시 실행
  - 기본적으로 가용 스레드 절반을 GC에 투입
- CMS 실행 도중 에덴 공간이 꽉 차면?
  - STW 이후 영 GC 발생 (CMS가 이미 실행 중이므로 오래 걸림)
  - 영 수집에서 일부 객체가 테뉴어드로 승격되면?
    - 평상시에는 영 수집에서 극히 일부만 테뉴어드로 승격 이후 CMS 올드 수집을 해서 테뉴어드가 정리됨
    - 하지만 할당률이 급증하면 영 수집에서의 조기 승격이 발생하고 테뉴어드 공간이 부족해지는 문제가 발생할 수 있음

→ CMF (Concurrent Mode Failure)

- 조기 승격으로 인한 테뉴어드 공간 부족 문제가 발생하면 JVM은 풀 STW를 유발하는 Parallel Old GC 수집 방식으로 돌아감
- CMF 방지를 위해 테뉴어드 공간이 꽉 차기 전에 CMS 수집 사이클을 실행해야 함
  - 테뉴어드 힙 점유 수준을 기준으로 CMS 수집 사이클 실행
  - default: 75% 테뉴어드 점유 시점
- 힙 단편화
  - CMF를 유발하는 또 다른 원인
  - CMS는 테뉴어드를 압착하지 않음
  - 테뉴어드의 빈 공간은 단일 연속 블록이 아니기 때문에 승격된 객체를 기존 객체 사이사이에 밀어 넣어야 함
  - 객체를 끼워 넣을 공간이 부족하면 테뉴어드 승격이 불가능해지고 CMF 발생

프리 리스트

- CMS는 내부적으로 프리 리스트를 통해 사용 가능한 빈 공간 관리
- Concurrent Sweep 단계에서 단편화로 인해 CMF가 발생하지 않도록 연속된 빈 블록들을 하나로 뭉침
- 새로 할당된 블록이 잘못 스윕될 경우를 예방하기 위해 스위퍼 스레드는 작업 도중 프리 리스트를 잠궈둠

### 3.2 CMS 기본 JVM 플래그

```bash
java -XX:+UseConcMarkSweepGC
```

- 최신 핫스팟 버전에서 이 플래그를 쓰면 ParNew GC와 함께 작동
- 60개가 넘는 플래그들이 있음 (숲을 보기 위해 지금은 보지 말자)

## 4. G1

*Garbage First*

특성

- CMS보다 훨씬 튜닝하기 쉬움
- 조기 승격에 덜 취약
- 대용량 힙에서의 우수한 확장성
- 풀 STW 수집을 없앨 수 있음
- 자바 9부터 디폴트 GC

### 4.1 G1 힙 레이아웃 및 영역

- 힙은 region으로 구분됨
  - default 크기 1MB 메모리 공간
  - 세대를 불연속적으로 배치 가능
  - 매 GC마다 전체 가비지를 수집할 필요가 없음

![g1-region](https://github.com/nmin11/TIL/assets/75058239/8619d26e-2645-4bd3-aa91-6cafcdb6ce8e)

- 1, 2, 4, 8, 16, 32, 64MB 크기로 region을 사용할 수 있음
- 기본적으로 힙에는 2,048 ~ 4,095개의 region 존재
  - 이 개수에 따라 region 크기도 조정됨
  - `regionSize = heapSize / 2048`
  - `regionCount = heapSize / regionSize`
  - 런타임 스위치로도 변경 가능

### 4.2 G1 알고리즘 설계

G1 수집기가 하는 일의 맥락

- 동시 마킹 단계 활용
- 방출 수집기로서 작동
- 통계적으로 압착

세부 작업들

- 워밍업 시기 - GC 사이클이 한번 돌 때 얼마나 많은 '일반' 영역에서 가비지를 수집할 수 있는지 그 수치 보관
- TLAB 할당, 서바이버로의 방출, 테뉴어드로의 승격 등은 다른 핫스팟 수집기와 비슷

영 세대 구성

- 영 세대는 똑같이 에덴, 서바이버 영역으로 나뉨
  - 다만 세대를 구성하는 영역이 연속되어 있지 않을 뿐
  - 영 세대의 크기는 전체 중단 시간 목표에 따라 조정됨

**RSet**

![rset](https://github.com/nmin11/TIL/assets/75058239/ce68836b-8673-46cc-b60e-cc18fe8829f5)

- *Remembered Set*
- 영역별로 하나씩, 외부에서 힙 영역 내부를 참조하는 레퍼런스 관리 장치
- 카드 테이블과 함께 floating garbage를 추적하는 데 사용됨
  - floating garbage: 현재 수집 세트 외부에서 죽은 객체가 참조하는 객체라서 살아있는 객체처럼 보이는 객체

### 4.3 G1 단계

1. 초기 마킹 (STW)
2. 동시 루트 탐색
3. 동시 마킹
4. 재마킹 (STW)
5. 정리 (STW)

동시 루트 탐색

- 초기 마킹 단계의 서바이버 영역에서 올드 세대를 가리키는 레퍼런스를 찾는 동시 단계
- 반드시 다음 영 GC 탐색 시작 전에 끝내야 함

재마킹

- 마킹 작업을 끝냄
- 레퍼런스(weak/soft) 처리 후 SATB 방식으로 정리 작업 수행

정리

- accounting 및 RSet scrubbing 태스크 수행
- accounting: 재사용 준비를 마친 영역을 식별하는 작업

### 4.4 G1 기본 JVM 플래그

```bash
java -XX:+UseG1GC
```

```bash
java -XX:+UseG1GC -XX:MaxGCPauseMillis=200
```

- G1의 목표는 특정 시간 안에 GC를 끝내는 것
- 하지만 실제로 이 기준에 맞추리란 보장은 없고, 어디까지나 목표치
- 100ms 이하는 지키지 못할 가능성이 큼

```bash
java -XX:+UseG1GC -XX:G1HeapRegionSize=<n>
```

- region 크기를 조정할 수 있음
- 1, 2, 4, 8, 16, 32, 64MB 중 하나로 설정

정리

- G1은 오라클의 전폭적인 지원을 받고 있는 안정된 알고리즘
- 하지만 저지연 워크로드에서 아직 CMS보다 STW가 긺

## 5. 셰난도아

*Shenandoah*

- Red Hat에서 개발한 GC
- 실험적인 수집기이지만 유망한 특성들을 지니고 있음
- 목표: G1처럼 STW를 단축하는 것
  - 이를 위해 동시 압착(Concurrent Compaction)을 사용

수집 단계

1. 초기 마킹 (STW)
2. 동시 마킹
3. 최종 마킹 (STW)
4. 동시 압착

**Brooks pointer**

- 객체 당 메모리 워드를 하나 더 써서 이전 GC 때 객체가 재배치되었는지 여부를 표시하고 새 버전 객체 컨텐츠의 위치를 가리킴
- forwarding pointer: 재배치되지 않은 객체의 브룩스 포인터는 그냥 다음 워드를 가리킴
- 하드웨어 수준에서 지원하는 CAS(Compare And Swap) 기능에 의존하여 포워딩 주소를 아토믹하게 수정

동시 마킹

- 힙을 순회하면서 살아 있는 객체를 모두 마킹
- 포워딩 포인터가 있는 oop를 가리키는 객체 레퍼런스가 있으면 새 oop 위치를 직접 참조하도록 레퍼런스 수정

최종 마킹

- STW 이후 루트 세트 재탐색
- 방출한 사본을 가리키도록 루트 복사 및 수정

### 5.1 동시 압착

GC 스레드의 방출 방식

1. 객체를 TLAB로 추측해서 복사
2. CAS로 브룩스 포인터가 추측성 사본(speculative copy)을 가리키도록 수정
3. 작업 성공 시 압착 스레드의 승리 → 이후 해당 버전 객체는 모두 브룩스 포인터를 경유해서 액세스
4. 작업 실패 시 압착 스레드의 실패 → 추측성 사본 원상복구 후 승리한 스레드가 남긴 브룩스 포인터를 따라감

⇒ 셰난도아는 동시 수집기라서 수집 사이클 동안 애플리케이션 스레드가 생성하는 가비지가 더 많으므로,  
애플리케이션 실행 중 수집을 할당 페이스에 맞춰야 함

### 5.2 셰난도아 얻기

- 오라클 자바 빌드 버전이나 OpenJDK 배포판에서 구할 수 없음
- 레드햇 페도라 같은 리눅스 배포판에 아이스티 바이너리 일부로 실려 있음
- 리눅스가 아닌 경우 소스를 내려받고 컴파일하는 과정이 까다로움

```bash
java -XX:+UseShenandoahGC
```

❖ 셰난도아와 다른 수집기의 중단 시간 비교 그래프

![shenandoah-gc](https://github.com/nmin11/TIL/assets/75058239/aeda9d29-14c3-4267-9636-5fd951297035)

## 6. C4(아줄 징)

- 아줄 시스템이 출시한 2가지 자바 플랫폼
  - Zulu: 다중 플랫폼에서 사용 가능한 OpenJDK 기반의 FOSS(free and open-source software) 솔루션
  - Zing: 리눅스에서만 쓸 수 있는 상용 플랫폼
    - OpenJDK에 있는 자바 클래스 라이브러리를 사용하긴 하지만 완전히 다른 VM

Zing VM

- C4(Continuous Concurrent Compacting Collector) 가비지 수집기, ReadyNow, Falcom 컴파일러 등 신박한 소프트웨어 기술을 자랑함

C4

- 셰난도아처럼 동시 압착 알고리즘을 사용하지만 브룩스 포인터 대신 64bit 워드 하나로 이루어진 객체 헤더 사용
  - 핫스팟은 객체 헤더가 워드 2개로 구성됨
- 단일 워드 헤더에는 klass 포인터 대신 kid가 들어 있음
  - kid: 25bit 정도의 숫자형 klass ID
- 주소 비트 대신 **Loaded Value Barrier(LVB)** 용 oop 레퍼런스 비트 일부 사용
- 헤더 하위 32bit에는 락 정보 보관
  - 락 상태 관련 추가 정보가 담김
- 64bit 아키텍처 전용으로 설계되었음

### 6.1 로드값 배리어

- 아이디어: 로드한 레퍼런스 각자의 로딩이 끝나자마자 현재 객체 위치를 직접 가리키게 만들자
  - 아줄에서는 이를 **self-healing barrier**라고 부름
- 헤더 워드, 객체 레퍼런스는 객체의 GC 상태 관련 메타데이터를 나타내는 일부 레퍼런스 비트 사용
  - 레퍼런스 자신의 비트를 사용하니 단일 헤더 워드 비트를 다 쓰는 것보다 공간을 절약할 수 있음

NMT(not marked through) 메타데이터 비트

- 현재 수집 사이클에서 객체가 이미 마킹되었는지 여부를 나타냄
- C4는 살아 있는 객체 마킹을 위해 타깃 상태(target state) 관리
- 객체가 마킹 도중 재배치되면 NMT 비트를 타깃 상태와 동일하게 세팅
- 수집 사이클 종료 시 C4가 타깃 상태 비트를 뒤집기 때문에 생존 객체는 모두 다음 사이클로 넘어갈 준비가 됨

C4 수집 단계

1. 마킹
2. 재배치
3. 재매핑

교대 압착 (hand-over-hand)

- C4는 연속적인 압착을 위해 교대 압착을 사용
- 물리 메모리 주소와 가상 메모리 주소 간 단절이라는 가상 메모리 체계의 특성을 활용
- 평상시 가상 메모리 서브시스템은 프로세스 주소 공간에 가상 페이지와 하부 물리 페이지 사이의 매핑 정보를 관리
- 징의 방출 기법에 따라 객체는 다른 페이지에 복사되는 형태로 재배치
  - 자연스럽게 서로 다른 물리 주소에 대응됨
  - 어떤 페이지에 있는 객체를 모두 복사한 후 물리 페이지를 싹 다 비우고 OS에 반납
  - 아직 매핑되지 않은 가상 페이지를 가리키는 애플리케이션 레퍼런스가 남지만, LVB가 도맡아 처리해줌

## 7. 밸런스드(IBM J9)

- IBM에서 제작한 상용 JVM이었는데, 오픈 소스화 단계를 밟고 있음 (이름도 오픈 J9로 바뀜)
- J9에도 여러 GC가 내장되어 있음
  - 여기서는 밸런스드 GC만 다룰 것

영역 기반 수집기 밸런스드

- 64bit J9 JVM에서 사용 가능하며 4GB 이상의 힙에 맞게 설계되었음

목표

- 대용량 자바 힙에서 중단 시간이 길어지는 현상을 개선한다.
- 중단 시간이 최악인 경우를 최소화한다.
- 불균일 기억 장치 액세스(NUMA) 성능을 인지하여 활용한다.

목표 달성 방안

- 1번 목표 달성을 위해 힙을 여러 영역으로 분할해 각자 독립적으로 관리/수집
  - G1처럼 최대 2,048개 영역을 관리하며 이 개수에 맞게 영역 크기를 정함
  - 영역 크기는 G1과 같이 1, 2, 4, 8, 16, 32, 64MB 중 하나로 설정

세대별 영역 기반 수집기

- 영역별 나이가 있고 새 객체는 나이가 0인 에덴 영역에 할당
- PGC(Partial Garbage Collection): 에덴이 꽉 찼을 때 발생하는 수집
  - STW 작업
  - 다른 나이 든 영역도 수집할 가치가 있다고 판단되면 추가로 수집

클래스 언로딩

- PGC 도중에도 현재 수집 대상의 일부인 클래스로더 수집 가능
- 하지만 PGC는 스스로 수집하기로 한 영역만 보기 때문에 부유 가비지가 생길 수 있음
- 그러므로 GMP(global mark phase)를 따로 두고 전체 자바 힙을 탐색하면서 수집할 죽은 객체를 표시하는 부분적 동시 작업 진행
- GMP 이후 해당 데이터에 다시 PGC 수행

GGC (global garbage collection)

- 힙을 압착하는 풀 STW 수집
- 핫스팟에서 CMF 발생 시 일어나는 풀 수집과 비슷

### 7.1 J9 객체 헤더

- 기본 객체 헤더는 64bit 클래스 슬롯
  - 압축 레퍼런스(Compressed Reference) 사용 시 32bit

객체 유형에 따라 헤더에 슬롯이 추가될 수 있음

- 동기화한 객체에 있는 모니터 슬롯
- JVM 내부 구조에 편입된 객체에 있는 해시 슬롯

→ 모니터 슬롯, 해시 슬롯은 객체 헤더와 꼭 붙어 있을 필요는 없음

### 7.2 밸런스드에서 큰 배열 처리하기

- 자바에서 큰 배열을 할당하면 충분히 큰 연속된 공간을 찾아야 하므로 대부분 압착 수집 발생

**arraylet**

- 밸런스드는 불연속된 여러 덩이에 큰 배열을 할당할 수 있도록 arraylet이라는 형태로 나타냄
  - arraylet은 힙 객체가 여러 영역에 걸쳐있는 유일한 상황
- 할당기는 큰 배열을 spine이라는 주 객체와 배열 리프들로 표현
  - 배열 리프는 실제 배열 엔트리를 담고 있음
  - 스파인 엔트리는 배열 리프들을 가리키는 자료 구조

GC 효율에 대해

- 여러 영역에 걸쳐 부분 GC를 수행하면 참조 객체, 피참조 객체 영역 정보를 관리하는 오버헤드 발생
- 전체 GC 소요 시간이 더 걸리지만 평균 중단 시간은 줄어듦
- 무엇보다 풀 STW 수집이나 압착 수집을 현저히 줄일 수 있음
- 밸런스드 수집기는 불연속된 큰 배열 관리에 대한 오버헤드가 있으므로 중단 시간을 줄이는 게 직접적인 처리율보다 더 중요한 애플리케이션에 적합

### 7.3 NUMA와 밸런스드

NUMA (Non-Uniform Memory Access)

- 일반적으로 중대형 서버용 멀티프로세스 시스템에서 사용하는 메모리 아키텍처
- 메모리와 프로세스 사이에 '거리'라는 개념이 있어서 프로세스와 메모리를 노드로 묶음
- 같은 노드에 속한 메모리에 액세스할 때 가장 빠름

밸런스드의 NUMA 활용 방안

- 밸런스드는 노드별로 자바 힙을 분리
- 애플리케이션 스레드는 자신이 선호하는 특정 노드에서 실행되고 그 노드에 속한 메모리 영역에 객체를 할당하도록 조정됨

## 8. 레거시 핫스팟 수집기

### 8.1 Serial 및 Serial Old

- Parallel/Parallel Old GC와 작동 원리는 같지만 CPU 한 코어만 사용
- 동시 수집이 안 되고 풀 STW를 일으킴
- 절대 사용하지 말 것
- 이런 GC를 사용하는 구형 애플리케이션도 있을 수 있으니 알아는 둘 것
- 자바 8부터 deprecated

### 8.2 증분 CMS(iCMS)

- 동시 수집을 시도했던 수집기
- 일부 아이디어가 G1에도 영향을 미쳤음

```bash
java -XX:+CMSIncrementalMode
```

- 자바 9부터 사라졌음

### 8.4 엡실론

- **어느 운영계 환경에서건 절대 사용 금물인 수집기**
- 테스트 전용으로 설계된, 아무 일도 안 하는 시험 수집기
- 활용 사례
  - 테스트 및 마이크로벤치마크 수행
  - 회귀 테스트
  - 할당률이 낮거나 0인 자바 애플리케이션 또는 라이브러리 코드의 테스트
  - JMH 테스트