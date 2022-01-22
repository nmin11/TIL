# Java API Document

- API : Application Programming Interface
- API는 라이브러리라고 불리기도 하며, 프로그램 개발에 자주 사용되는 클래스 및 인터페이스의 모음을 뜻함
- 흔히 사용해 왔던 `String` 클래스나 `System` 클래스가 모두 API에 속하는 클래스
- API들은 `<JDK 설치 경로>/jre/lib/rt.jar` 경로에 있는 압축 파일에 저장되어 있음
- API Document 주소 : http://docs.oracle.com/javase/8/docs/api/
  - 예시 : `String` 클래스를 확인하고자 할 때,  
    좌측 상단 프레임에서 `java.lang`을 클릭하고 좌측 하단 프레임에서 `String`을 클릭하면  
    중앙 프레임에서 `String` 클래스에 대한 상세한 설명을 확인할 수 있음

<br>
<br>

# java.lang과 java.util 패키지

- Java Application을 개발할 때 공통적으로 많이 사용하는 패키지
  - `java.lang`
  - `java.util`
  - `java.time`

<br>
<br>

## java.lang 패키지

- Java 프로그램의 기본적인 클래스를 담고 있는 패키지
- `import` 없이 사용 가능

|                                      클래스                                      | 용도                                                                                                                               |
| :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------- |
|                                      Object                                      | Java 클래스의 최상위 클래스로 사용                                                                                                 |
|                                      System                                      | 표준 입력 장치로부터 데이터를 입력받을 때<br>표준 출력 장치로 출력할 때<br>JVM을 종료시킬 때<br>Garbage Collector 실행을 요청할 때 |
|                                      Class                                       | 클래스를 메모리로 로딩할 때                                                                                                        |
|                                      String                                      | 문자열을 저장하고 여러 가지 정보를 얻을 때                                                                                         |
|                          StringBuffer \| StringBuilder                           | 문자열을 저장하고 내부 문자열을 조작할 때                                                                                          |
|                                       Math                                       | 수학 함수를 이용할 때                                                                                                              |
| Wrapper<br>(Byte, Short, Character,<br>Integer, Float, Double,<br>Boolean, Long) | 기본 타입의 데이터를 갖는 객체를 만들 때<br>문자열을 기본 타입으로 변환할 때<br>입력값을 검사할 때                                 |

<br>
<br>

## java.util 패키지

- Java 프로그램 개발에 조미료 같은 역할을 하는 클래스를 담고 있는 패키지
- Collection 클래스들이 대부분을 차지하고 있음

|     클래스      | 용도                                             |
| :-------------: | :----------------------------------------------- |
|     Arrays      | 배열을 조작(비교, 복사, 정렬, 탐색)할 때         |
|    Calendar     | 운영체제의 날짜와 시간을 얻을 때                 |
|      Date       | 날짜와 시간 정보를 저장할 때                     |
|     Objects     | 객체를 비교하거나 null 여부를 조사하는 등의 용도 |
| StringTokenizer | 특정 문자로 구분된 문자열을 뽑아낼 때            |
|     Random      | 난수를 얻을 때                                   |
