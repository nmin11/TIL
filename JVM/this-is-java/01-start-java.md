# 자바란?

## 자바 소개

- 1995년도에 Sun Microsystems에서 발표한 언어
- 성공한 프로그래밍 언어로서 전세계적으로 다양한 분야에서 사용되고 있음
- 1991년에 Sun의 엔지니어들에 의해서 고안된 Oak라는 언어에서부터 시작됨
  - Oak는 초기에 가전제품에서 사용될 목적이었지만, 인터넷이 등장하자 인터넷에서 실행되는 프로그래밍 언어 Java로 재탄생
- 1995년 ~ 1999년 : Windows 프로그램 개발이 주류였기 때문에 C++ 언어에 비해 Java는 열세였음
  - 메모리 및 CPU를 지나치게 많이 사용하기 때문에 윈도우 프로그래밍 언어로는 부적합
- 그러나 인터넷이 활성화된 1999년부터 웹 애플리케이션 구축용 언어로 Java의 급부상
  - 기업체 및 공공기관의 다양한 서버 운영체제에서 단 한 번의 작성으로 모든 곳에서 실행 가능한 언어는 Java 뿐이었기 때문

=> Java는 초기에 가전 제품 탑재용 프로그래밍 언어였지만, 현재에 이르러서는 스마트폰, 데스크탑 등 각종 장비에서 실행되는 애플리케이션이 되었다.  
그리고 금융, 공공, 대기업 등의 엔터프라이즈 기업 환경에서 실행되는 서버 애플리케이션을 개발하는 중추적인 언어로 자리매김하고 있다.

<br>
<br>

## 자바의 특징

### 이식성이 높은 언어이다.

- MS Windows, Linux, Mac 등 서로 다른 실행 환경을 가진 시스템 간에 프로그램을 옮겨 실행할 수 있음
- 이식성이 낮은 경우, 다른 시스템으로 옮겨서 실행하려면 소스 파일 수정 및 재컴파일 과정 필요
- 하지만 Java의 경우, **JRE(Java Runtime Environment)** 가 설치되어 있는 환경이라면 소스 파일 수정 없이 실행 가능

<br>

### 객체 지향 언어이다.

- Java는 100% 객체 지향 언어
- 객체를 만들기 위해 설계도인 클래스를 작성해야 하고, 객체와 객체를 연결하여 목적에 맞는 프로그램을 만들어 냄
- 아무리 작은 프로그램이라도 객체를 만들어 사용
- 처음부터 객체를 고려하여 설계되었기 때문에 객체 지향 언어가 가져야 할 **캡슐화, 상속, 다형성** 기능 완벽 지원

<br>

### 함수적 스타일 코딩을 지원한다.

- 최근 들어 함수적 프로그래밍이 다시 부각되고 있음
  - 대용량 데이터의 병렬 처리 및 이벤트 지향 프로그래밍에 적합하기 때문
- Java 또한 함수적 프로그래밍을 위해 Java 8부터 **Lambda Expressions** 지원
- 람다식을 사용하면 컬렉션의 요소를 필터링, 매핑, 집계 처리하는 것이 쉬워지며, 코드가 매우 간결해짐

<br>

### 메모리를 자동으로 관리한다.

- C++과는 달리 Java는 개발자가 직접 메모리에 접근할 수 없도록 설계되어 있음
- 객체 생성 시 자동적으로 메모리 영역을 찾아서 할당하고, 사용이 완료되면 **Garbage Collector** 를 실행시켜 자동적으로 사용하지 않는 객체 제거
- 개발자는 메모리 관리의 수고를 덜고, 핵심 기능 코드 작성에 집중할 수 있음

<br>

### 다양한 애플리케이션을 개발할 수 있다.

- 다양한 OS(Operating System)에서 실행되는 프로그램 개발 가능
- 단순한 콘솔 프로그램에서부터 클라이언트용 윈도우 애플리케이션, 서버용 웹 애플리케이션, 모바일용 안드로이드 앱에 이르기까지 거의 모든 곳에서 실행되는 프로그램 개발 가능
- Java는 다양한 운영체제에서 사용할 수 있는 개발 도구와 API를 묶어 Edition 형태로 정의하고 있음

<br>

**※ Java SE(Standard Edition)**

- JVM(Java Virtual Machine)을 비롯해서 Java 프로그램 개발에 필수적인 도구와 라이브러리 API를 정의
- Java 프로그램을 개발하고 실행하기 위해서 반드시 Java SE 구현체인 JDK(Java Development Kit)를 설치해야 함

<br>

**※ Java EE(Enterprise Edition)**

- 분산 환경(네트워크, 인터넷)에서 서버용 애플리케이션을 개발하기 위한 도구 및 라이브러리 API를 정의
- 서버용 애플리케이션의 예시
  - Servlet/JSP를 이용한 웹 애플리케이션
  - 분산 처리 컴포넌트 EJB(Enterprise Java Bean)
  - XML Web Services

<br>

### Multi-Thread를 쉽게 구현할 수 있다.

- Multi-Thread Programming : 하나의 프로그램이 동시에 여러 가지 작업을 처리해야 할 경우, 대용량 작업을 빨리 처리하기 위해 서브 작업으로 분리해서 병렬 처리하는 방법
- 프로그램이 실행되는 운영체제에 따라 Multi-Thread 구현 방법이 다름
- Java는 Thread 생성 및 제어와 관련된 API를 제공하고 있기 때문에 운영체제와 상관없이 Multi-Thread를 쉽게 구현 가능

<br>

### Dynamic Loading을 지원한다.

- Java Application은 여러 개의 객체가 서로 연결되어 실행되며, 이 객체들은 클래스로부터 생성됨
- 애플리케이션이 실행될 때 모든 객체가 생성되지 않고, 객체가 필요한 시점에 클래스를 **동적 로딩** 해서 객체 생성
- 개발 완료 후 유지보수가 발생해도 해당 클래스만 수정하면 되므로 전체 애플리케이션을 재컴파일할 필요가 없음
  - 유지보수를 쉽고 빠르게 진행 가능

<br>

### 막강한 오픈소스 라이브러리가 풍부하다.

- Java는 Open Source 언어이기 때문에 Java 프로그램에서 사용하는 라이브러리 또한 오픈소스가 넘쳐남
- 고급 기능을 구현하는 코드를 직접 작성할 경우, 시간과 노력이 필요하며 실행 안정성을 보장할 수 없음
- 검증된 오픈소스 라이브러리를 사용하면 개발 기간을 단축하면서 안정성이 높은 애플리케이션 쉽게 개발 가능
- 많은 회사들이 Java를 선택하는 이유 중의 하나가 막강하고 풍부한 Java 오픈소스 라이브러리에 있음

<br>
<br>

## JVM (Java Virtual Machine)

- 용도
  - Java 프로그램은 완전한 기계어가 아닌, 중간 단계의 바이트 코드이기 때문에 이를 해석하고 실행할 수 있는 가상의 운영체제로서의 역할
  - 운영체제와 Java 프로그램을 중계하는 JVM을 두어 Java 프로그램이 여러 운영체제에서 동일한 실행 결과가 나오도록 설계됨
- 특징
  - JVM은 운영체제에 종속적이므로, 운영체제에 맞게 설치되어야 함
  - JVM은 JDK 또는 JRE를 설치하면 자동으로 설치됨

![jvm-process](https://github.com/nmin11/TIL/blob/main/JVM/this-is-java/img/jvm-process.png)

- 작동 과정
  1. 확장자가 .java인 파일을 작성
  2. 작성한 소스 파일을 컴파일러 javac.exe로 컴파일
  3. 확장자가 .class인 바이트 코드 파일이 생성됨
  4. 생성된 바이트 코드 파일은 JVM 구동 명령어 java.exe에 의해 해석되며, 해당 운영체제에 맞는 기계어로 번역됨
     - 바이트 코드는 하나지만, JVM에 의해서 번역되는 기계어는 운영체제에 따라 달라짐
- 한계
  - "Write once, run anywhere."는 매력적이지만, 한 번의 컴파일로 실행 가능한 기계어가 만들어지지 않고 JVM에 의해 기계어로 번역되고 실행되기 때문에 C와 C++에 비해 느림
  - 그러나 기계어로 빠르게 변환해주는 JVM 내부의 최적화된 JIT 컴파일러를 통해서 속도의 격차는 많이 줄어들고 있음
