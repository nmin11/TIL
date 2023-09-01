운영 가능한 코드란

- 보호 장치, 분석 장치, 제어 장치가 내장된 operable code
- 안전하고 회복성 있는 resilent 코딩 기법
- defensive programming

## defensive programming

### avoid the null

- 대부분의 프로그래밍 언어가 null(nil, None 등)을 지원하기 때문에 null pointer exception 발생 가능성이 있음
- 따라서 **null 검사**, **null object pattern**, **option type** 등을 사용해야 함
- **null 검사**
  - 메소드 시작 지점에서 해야 함
    - 시작점부터 확실하게 체크하면 나머지 코드에서는 변수의 실제값을 사용할 수 있게 되므로
  - `NotNull` annotation과 같은 언어 기능을 활용하면 좋음
- **null object pattern**
  - null 값 대신 객체를 사용하는 패턴
  - 예시: 원하는 객체를 찾지 못했을 때, null이 아닌 빈 배열을 리턴하는 검색 메소드
  - 비어있더라도 객체를 반환하도록 하면 호출자는 null에 대한 검사를 따로 할 필요가 없어짐
- **option type**
  - `Option` `Maybe` 같은 option type이 내장된 언어들도 있음
  - option type은 개발자로 하여금 빈 응답에 대한 처리를 고려해보게끔 유도함

### input validation

- 사전 조건, checksum, 데이터 유효성, 보안, 보편적인 에러 등을 찾아주는 도구 활용
- 사전 조건을 이용해서 유효성을 검사하는 라이브러리 및 프레임워크를 사용할 것
  - `checkNotNull` 같은 메소드나 `@Size(min=0, max=100)` 같은 애노테이션 활용
- 컴퓨터 하드웨어
  - 네트워크 및 디스크의 데이터 훼손 가능성이 있음
  - 강력한 내구성이 필요하면 checksum을 통해 데이터 변경 여부를 확인할 것
- 보안
  - 입력값을 항상 검사해서 SQL injection 방지
  - 검증된 라이브러리 및 프레임워크를 활용해서 cross-site scripting 방지
  - 메모리를 조작할 때는 메모리 크기 파라미터를 명시적으로 설정해서 버퍼 오버플로 방지
  - 보안 및 암호화 라이브러리 및 프로토콜은 직접 작성하지 말고 널리 사용되는 검증된 것을 사용하자
  - [Open Web Application Security Project(OWASP) 상위 10개 보안 위협 보고서](https://owasp.org/www-project-top-ten)를 자주 확인할 것

### throw early, catch exception late

- '일찍 던지고 늦게 잡아라'

throw early

- 예외는 에러가 발생한 지점과 최대한 가까운 지점에서 던져야 함
  - 그래야 문제의 원인을 찾기 쉬워짐

catch exception late

- 예외를 처리할 적절한 위치에 도착할 때까지 호출 스택을 통해 전파시켜야 함

## metrics

- 지표를 통해 애플리케이션이 어떤 동작을 하는지 살펴보자
- 지표: 숫자로 표현한 로그와 같음
- counter, gauge, histogram 3가지 유형이 보편적
  - counter: 특정 이벤트 발생 횟수 측정
  - gauge: 특정 시점을 기준으로 값 측정
  - histogram: 이벤트를 규모에 따라 특정 범위로 구분
- 시스템 성능
  - P99와 같은 백분위수(threshold percentiles)의 지표값으로 측정
  - 어떤 시스템은 추적할 데이터를 줄이기 위해 백분위수를 설정하도록 요구하기도 함
- 애플리케이션 지표
  - DataDog, LogicMonitor, Prometheus 같은 중앙식 observability system에서 수집
  - control theory: 시스템의 출력을 통해 현재 상태 파악이 얼마나 용의한지를 정의
  - 모니터링 도구와 대시보드 제공
- autoscaling
  - 지표는 시스템을 자동으로 확장하거나 축소하는데에도 사용할 수 있음
- 직접 만들기보다는 표준 지표 라이브러리를 적극 활용할 것!
