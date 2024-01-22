## Serial GC

- 가장 단순한 GC 구현체
- 싱글 스레드로 수행
- mark-sweep-compact 알고리즘 사용
- **전체 애플리케이션에 STW 발생**
  - 서버 환경과 같은 멀티 스레드에서는 부적합

```bash
java -XX:+UseSerialGC
```

<img width="783" alt="serial-and-parallel" src="https://github.com/nmin11/TIL/assets/75058239/74e91d2a-0edc-4669-8347-aa3ca1fcd465">

## Parallel GC

- Java 5 ~ 8 까지의 디폴트 GC
- Throughput Collector 라고도 불림
  - GC 처리율 최대화
- **힙 공간을 관리하기 위해 멀티 스레드 사용**
- 메모리가 충분하고 코어 개수가 많을 때 유리
- 하지만 역시나 GC 수행 시 전체 애플리케이션에 대한 STW 발생
  - 애플리케이션을 모두 중단시킨 다음 가용 CPU 코어를 총동원해 가능한 한 빨리 메모리를 수집
- GC에 사용할 최대 스레드 수, 중단 시간, 처리량, 힙 사이즈를 지정할 수 있음
  - 최대 스레드 수: `-XX:ParallelGCThreads=<N>`
  - 최대 중단 시간: `-XX:MaxGCPauseMillis=<N>`
    - 설정값 이하로 pause time 유지하라는 설정
  - 애플리케이션 수행시간 대비 전체 GC 수행시간 비율: `-XX:GCTimeRatio=<N>`
    - 기본값 99 (1%의 GC 시간 비율)

```bash
java -XX:+UseParallelGC
```

## Parallel Old GC

- Parallel GC에서 Old 영역의 GC 알고리즘만 다름
- Old 영역까지도 멀티 스레드로 GC 수행
- Old 영역에 대해 *Mark-Summary-Compact* 알고리즘 사용
  - Mark 단계: Old 영역을 리전별로 나누고, 리전별로 자주 참조되는 객체를 마킹
  - Summary 단계: 살아남은 객체들의 밀도가 높은 부분이 어디인지 dense prefix를 정하고, 이를 기준으로 compact 영역을 줄임
  - Compact 단계: compact 영역을 destination과 source로 나누고, 살아남은 객체를 destination으로 이동, 참조되지 않은 객체는 제거

```bash
java -XX:+UseParallelOldGC
```

## CMS GC

*Concurrent Mark Sweep*

![cms-gc](https://github.com/nmin11/TIL/assets/75058239/ae758bfe-404e-4b03-ba4a-f5a0cf2384f5)

- Initial Mark 단계: 클래스로더에서 가장 가까운 객체 중 살아있는 객체만 찾고 끝
- Concurrent Mark 단계: 살아있다고 확인한 객체들을 루트로 하여 참조되는 객체들을 마킹
  - 다른 스레드가 실행 중인 상태에서 동시에 실행됨
- Remark 단계: Concurrent Mark 단계에서 새로 추가되거나 참조가 끊긴 객체들을 마킹
- Concurrent Sweep 단계: 마킹되지 않은 객체들을 제거
  - 다른 스레드가 실행 중인 상태에서 동시에 실행됨
- STW 시간이 매우 짧음
  - 응답 속도가 중요할 때 사용되며, Low Latency GC 라고도 불림
- 단점
  - CPU와 메모리 사용량이 많음
  - compaction 단계가 없어서 메모리 단편화가 발생할 수 있음
    - 조각난 메모리가 많아 compaction 작업을 할 경우 STW 시간이 훨씬 더 길어짐

## G1 GC

*Garbage First*

![g1-gc](https://github.com/nmin11/TIL/assets/75058239/f3893306-45de-4b70-912b-12bd2e5e47ba)

- Java 9부터 디폴트 GC
- 지금까지의 GC와는 완전히 다른 방식
- 메모리 공간이 넉넉한 멀티 프로세서 환경에서 사용
- 힙 메모리를 동일 사이즈를 가진 리전이라는 영역들로 나눠서 메모리를 관리
  - 각 리전은 논리적으로 구분됨 (Eden, Survivor, Old, Humongous, Available/Unused)
  - Humongous: 리전 크기의 50%를 초과하는 큰 객체를 저장하기 위한 영역
  - Available/Unused: 아직 사용되지 않은 영역
- GC 수행 단계
  - 글로벌 마킹 단계: 리전별 객체 활성도 판단
  - 스윕 단계: 거의 비어있는 리전부터 우선적으로 가비지를 수집해서 상당한 여유 공간을 확보

### Minor GC

- Eden 영역이 꽉 차면 수행
- Eden 영역의 살아남은 객체들을 Survivor 영역으로 이동
- 비어있게 된 Eden 영역을 Available/Unused 영역으로 지정

### Major GC

![g1-gc-process](https://github.com/nmin11/TIL/assets/75058239/a9af8b42-4f0b-4b38-bb7d-06e850f6cf2e)

- Initial Mark 단계: Old 리전의 객체들이 참조하는 Survivor 영역의 객체들을 마킹 (STW)
- Root Region Scan 단계: 위 단계에서 찾은 Survivor 객체들에 대한 스캔 작업
- Concurrent Mark 단계: 전체 힙에 대한 스캔 작업 실시 → 가비지가 없는 리전들은 다음 단계에서 제외
- Remark 단계: 최종적으로 GC 대상에서 제외할 객체 식별 (STW)
- Cleanup 단계: 살아있는 객체가 가장 적은 리전에 대한 미사용 객체 제거 작업 (STW)
- Copy 단계: Cleanup 후에도 완전히 비어지지 않은 살아있는 객체들을 새로운 리전에 옮김으로써 compaction 작업 수행 (STW)

```bash
java -XX:+UseG1GC
```

## Z GC

*Scalable Low Latency GC*

![zgc-concept-1](https://github.com/nmin11/TIL/assets/75058239/a26abb49-e049-4240-a634-29ec9fde7635)

- Java 11 때 실험 버전으로 등장, 이후 Java 15부터 정식 버전 출시
- **STW 시간을 10ms 이하로!**
  - 저지연을 요구하는 동시성 고비용 작업에 적합
- 8MB ~ 16TB 크기의 힙 처리 가능
- G1 GC와 마찬가지로 힙을 영역별로 나누어 관리하지만, 각 영역의 크기는 다름
  - region 대신 **ZPage**라는 논리적 단위로 구분
  - small(2 MB), medium(32 MB), large(N * 2 MB) 3가지 타입을 가짐

### Colored pointers

![colored-pointers](https://github.com/nmin11/TIL/assets/75058239/7a620525-8a40-4499-a548-ca0b8f80bca4)

- 객체를 가리키는 변수의 포인터에서 64bit 메모리를 활용해서 객체 상태값을 저장
  - 이를 위해 64bit 운영체제에서만 사용 가능
- 42bit는 객체의 주소값으로 활용
- 4bit는 객체의 상태값을 표현
  - Finalizable: finalizer를 통해서만 접근 가능한 객체 (가비지)
  - Remapped: 객체의 재배치 여부를 표시
  - Marked 1 / 0: 접근 가능한 객체를 표시

### Load barriers

![zgc-concept-7](https://github.com/nmin11/TIL/assets/75058239/e7d92b3d-e6db-4a4e-95b5-65031ae2c178)

- 객체를 참조할 때 실행되는 코드
- G1 GC와 다르게 메모리 재배치 과정에서 STW가 발생하지 않게 해줌
- RemapMark와 RellocationSet을 확인하면서 참조와 mark를 업데이트
- GC 수행 단계
  - `Pause` Mark Start 단계: ZGC의 루트에서 가리키는 객체 Mark 표시 (Live Object)
  - Concurrent Mark/Remap 단계: 객체의 참조를 탐색하며 모든 객체에 Mark 표시
  - `Pause` Mark End 단계: 새로 들어온 객체들에 대한 Mark 표시
  - Concurrent Pereare for Relocate 단계: 재배치할 영역을 찾아서 RelocationSet에 배치
  - `Pause` Relocate Start 단계: 모든 루트 참조의 재배치를 진행하고 업데이트
  - Concurrent Relocate 단계: Load barriers를 사용해서 모든 객체를 재배치하고 참조를 수정

![zgc-performance](https://github.com/nmin11/TIL/assets/75058239/6ac87a0a-82fc-499c-962e-f3aa88f4c218)

```bash
java -XX:+UseZGC
```

⚠️ Java 15 이전 버전에서는 `-XX:+UnlockExperimentalVMOptions` 옵션을 추가해야 함
