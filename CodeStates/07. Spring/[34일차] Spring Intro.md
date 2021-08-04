2021 / 08 / 04

## Introduction

Spring Boot는 Spring 프레임워크의 웹 서버 설정, 보안 설정 등을 자동화하고 라이브러리를 통합 관리해주는 웹 프레임워크이다.  
Spring Boot를 사용하면 핵심 비즈니스 로직에만 집중하여 코드를 작성할 수 있기에 빠르게 웹 서버를 개발할 수 있다.  
그러면서 동시에 Spring의 강력한 성능과 보안기술을 사용할 수 있고 탄탄한 안정성을 보장받을 수 있다.  
Spring Boot가 Spring을 대체하고 있는 이유는 기존 Spring과 완전히 같은 성능을 내면서도 스프링 컨테이너와 Config, Bean 스코프와 라이프사이클을 크게 신경 쓰지 않고 프로그래밍을 할 수 있기 때문이다.  
Spring Boot는 코드를 간편하게 짤 수 있게 해준다.  
간편한 코드는 유지 보수성을 높여주며, 이에 따라 다양한 비즈니스 요구사항에 맞춰 유연하게 대처할 수 있게 된다.

</br>

# Spring Intro

## Spring 등장 배경

스프링이 등장하기 이전에는 EJB(Enterprise Java Bean)를 자바 표준 기술로 사용했다.  
대규모 서버를 구축할 때 안정적이라는 장점이 있었지만, 비싸고 복잡하고 어렵고 또한 Java의 장점은 객체 지향적 특징을 살리지 못한다는 단점들을 내포한 기술이었다.  
이러한 문제점들 때문에 EJB 대신 평범한 자바 객체(POJO, Plain Old Java Object)를 사용해서 개발하는 움직임이 있을 정도였다.

</br>

이런 상황 속에서 2003년 스프링이 처음으로 등장한다.  
가장 잘 알려진 스프링의 정의는 다음과 같다.

- Java 엔터프라이즈 개발을 편하게 => 대규모 서버를 안정적으로 구축하는 EJB의 장점 유지
- 오픈 소스 => 특별한 라이선스를 취득할 필요 없이 자유롭게 이용 가능
- 경량급 => 복잡한 작업 제거
- 애플리케이션 프레임워크 => 애플리케이션 개발의 전 과정을 빠르고 편리하며 효율적이게 만들어 줌

이처럼 스프링은 EJB의 장점은 살리고 단점은 보완하여, **좋은 객체 지향 애플리케이션**을 개발할 수 있게 도와주는 프레임워크로 자리잡았다.

</br>

## Spring 특징

### 1. 객체 지향 설계 원칙을 핵심 아이디어로 갖는다.

스프링은 SOLID 원칙을 지키며 프로그램을 작성할 수 있도록 만든 프레임워크이다.  
모든 클래스는 모듈화가 되어 있고 기능을 수정할 때 핵심 로직만 수정해도 프로그램에 영향을 주지 않는다.  
이는 대규모 웹 애플리케이션을 제작할 때는 강점을 갖도록 하지만, 소규모 서비스를 제작할 때에는 기본적으로 요구하는 코드들 때문에 약점으로 작용할 수 있다.

</br>

### 2. 여러 기술이 모여서 작동한다.

스프링이라는 용어는 스프링 아래 클라우드, 스프링 웹, 스프링 시큐리티 등 다양한 라이브러리를 통칭한다.  
스프링은 웹 애플리케이션 개발에 필요한 여러 라이브러리를 제공하고 있고 개발자는 이러한 기능들을 사용하기만 하면 된다.

</br>

## Spring은 무엇인가?

보통 '스프링'이라고 하면 **Spring Framework**를 지칭하는 경우가 많다.  
스프링 프레임워크의 가장 중요한 특징은 IoC(Inversion of Control, 제어의 역전)와 DI(Dependency Injection, 의존성 주입), 그리고 AOP(Aspect-Oriented Programming, 관점 지향 프로그래밍)이다.

</br>

### IoC

**컨테이너**라는 객체 관리 프로그램이 개발자 대신 객체 생성부터 소멸까지의 생명 주기를 관리해준다.  
객체가 몇 개 없다면 직접 관리해도 되겠지만, 프로그램의 규모가 커지고 관리해야 할 객체의 수가 늘어나면 관리하기 힘들 것이다.  
스프링 프레임워크는 이런 작업을 대신해준다.

</br>

### DI

객체 사이의 의존 관계를 설정해준다.  
이 역시 미리 설정해 주면 **컨테이너**가 알아서 관리해준다.  
객체의 수가 많아지만 의존 관계를 직접 연결하기가 까다로워지지만, 스프링 프레임워크는 이런 작업도 대신해준다.

</br>

## Spring Boot는 또 뭔가?

스프링을 더 쉽게 이용할 수 있도록 해 주는 스프링 프레임워크의 모듈이다.  
스프링에서 아쉬운 부분은 초기 설정이 매우 복잡하고 귀찮다는 것이다.  
하지만 스프링 부트는 이러한 초기 설정을 간단하게 할 수 있도록 도와준다.  
설정 코드를 직접 적을 필요도 없이, GUI에서 사용할 라이브러리를 골라 주기만 하면 버전까지 최적화해서 설정해 준다.  
내장 서버를 탑재하고 있어서 배포 서버도 간단하게 구축할 수 있다.

</br>

## 이 외 Spring의 다른 기능들

스프링은 어떤 DB라도 기본적인 CRUD를 쉽게 사용할 수 있게 해주는 스프링 데이터, 세션을 편리하게 사용하도록 해주는 스프링 세션, 보안을 담당하는 스프링 시큐리티 등 다양한 기능을 제공해준다.  
이러한 기능들은 스프링 부트에서 선택하기만 하면 사용할 수 있다.

</br>

## Spring initializr

https://start.spring.io/ 에 접속하면 아주 간편하게 스프링 프로젝트를 생성할 수 있게 된다.

</br>

### 프로젝트 빌드 도구

Gradle을 선택해주는 것이 좋다.  
빌드 도구는 프로젝트 생성, 테스트 빌드, 배포 등의 작업을 위한 프로그램이다.  
Gradle은 가장 최근에 나온 빌드 도구로, 성능이 가장 좋다.

</br>

### 패키징

Jar를 선택해주는 것이 좋다.  
Jar(Java Archive)와 War(Web Application Archive)는 자바 프로젝트를 압축해서 배포할 때 쓰이는 자바 클래스 패키징 확장자이다.  
War 또한 Jar 파일의 일종으로 이름과 동일하게 웹 애플리케이션에 좀 더 특화된 Jar 파일이라고 생각하면 된다.  
보통은 제너럴한 Jar를 사용한다.

</br>

## Gradle 살펴보기

- **plugins** : 프로젝트를 빌드하기 위해서 필요한 여러 가지 작업을 처리해줄 플로그인들
- **configurations** : 의존성 관련 설정
- **repositories** : 라이브러리를 다운받을 저장소, 주로 mavenCentral() 사용, JCenter()도 사용 가능
- **dependencies** : 저장소에서 다운로드 받을 라이브러리들
- **test** : 테스트할 때 사용할 프레임워크

</br>

### dependency 추가 방법

dependencies 객체 안에 추가할 dependency를 적어주면 된다.  
dependency 앞에는 사용될 범위를 뜻하는 Dependency Configuration을 적어줘야 한다.  
Dependency Configuration의 종류와 의미는 다음과 같다.

- **implementation** : 의존 라이브러리 수정 시 본 모듈까지만 재빌드.
- **compileOnly** : 컴파일 시에만 빌드. 빌드 결과물에는 포함하지 않음. (런타임 중에는 필요 없는 경우)
- **runtimeOnly** : 런타임 시에만 필요한 라이브러리인 경우
- **annotaionProcessor** : 어노테이션 관련 라이브러리
- **testImplementation** : 테스트 시에만 의존

</br>

## 프로젝트 폴더 구조 살펴보기

- **.gradle** : 그래들이 사용하는 폴더
- **.idea** : 인텔리제이에서 사용하는 폴더
- **src** : 프로젝트에서 만든 프로그램 관련 폴더
  - **main** : 프로그램의 소스 코드들
    - **java** : 자바 코드들
    - **resources** : 자바 코드에서 사용할 리소스들 (HTML, CSS, IMG 등)
      - **static** : 정적 리소스들 (CSS, IMG, JS)
      - **templates** : 동적 리소스들 (HTML)
  - **test** : 테스트를 위한 자바 코드와 리소스들

</br>

## gradlew

Gradle Wrapper를 줄여서 gradlew라고 한다.  
gradlew는 새로운 환경에 프로젝트를 설치할 때 별도의 설치나 설정 없이 바로 빌드할 수 있게 해준다.  
누구든 이 Wrapper를 사용하는 프로젝트를 쓸 때 Java나 Gradle을 별도로 설치할 필요가 없어진다.  
만약 Wrapper 없이 빌드하려고 한다면 사용 환경에 Java와 Gradle이 설치되어 있어야 하고, 버전이 일치하지 않으면 호환성 문제가 발생할 수 있다.  
따라서 gradle로 작성된 프로젝트를 빌드할 때에는 **gradlew를 사용해서 빌드하는 것을 권장한다.**  
gradlew를 사용해서 빌드하기 위한 명령어는 다음과 같다.

```
./gradlew build
```

</br>

## application.properties

애플리케이션에서 사용할 설정값들을 정의할 수 있는 외부 설정 파일이다.  
key = value 형식으로 값을 정의해서 작성해주면 애플리케이션에서 이 값들을 참조하여 사용할 수 있다.  
여기에서 작성된 값을 Java 코드 안에서 참조하고 싶다면 @Value 어노테이션을 사용하면 된다.  
DB 셋팅을 위해서 많이 사용하게 된다.  
만약 mySQL을 사용한다면 일단 build.gradle의 dependencies에 다음 코드를 추가한 뒤,

```
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
compile 'mysql:mysql-connector-java'
```

필요한 설정을 application.properties에 적어주면 된다.

```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    // 위에서 추가해준 드라이버 관련 설정
spring.datasource.url=jdbc:mysql://localhost:3306/[database]?serverTimezone=UTC&characterEncoding=UTF-8
	// serverTimezone을 입력해줘야 오류가 나지 않음
spring.datasource.username=[mySQL 사용자이름]
spring.datasource.password=[mySQL 비밀번호]
```

</br>

## settings.gradle

프로젝트의 구성 정보를 기록하는 파일이다.  
어떤 하위 프로젝트(모듈)들이 어떤 관계로 구성되어 있는지를 기술한다.  
Gradle은 이 파일에 기술된 대로 프로젝트를 구성하게 된다.  
하위 프로젝트는 프로젝트 우클릭 → New → Module을 선택해서 만들 수 있다.  
이렇게 하위 프로젝트를 만든 다음, settings.gradle을 확인해보면 다음과 같이 추가되어 있을 것이다.

```
rootProject.name = 'MiniCRUDServer'
include 'module1'
include 'module2'
include 'module3'
```

만약 하위 프로젝트들 사이에 관계를 설정해주고 싶다면 다음과 같이 작성해주면 된다.  
다음은 module1에서 module2를 참조하는 예시이다.

```
dependencies {
    compile(project(":module2"))
}
```

</br>
</br>

# Spring Boot

## Spring Boot 주요 어노테이션

- **@SpringBootApplication** : @Configuration, @EnableAutoConfiguration, @ComponentScan 등의 어노테이션을 합친 것으로, 주로 메인 클래스 위에서 사용
- **@EnableAutoConfiguration** : 미리 설정해놓은 Java 설정 파일들을 빈으로 등록
- **@ComponentScan** : @Component 어노테이션이 붙어있는 클래스들을 찾아서 빈으로 등록
- **@Component** : 선언된 클래스를 빈으로 등록
- **@Controller** : Spring MVC의 Controller로 사용되는 클래스 선언
- **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping** : HTTP 메소드 어노테이션으로, API를 작성할 때 사용
- **@Autowired** : 의존성 주입에 사용, 스프링 컨테이너에 등록된 빈을 주입받게 해줌
- **@Service** : 비즈니스 로직이 들어가는 클래스임을 명시
- **@Repository** : DB에 접근하는 클래스인 DAO(Data Access Object)에 특화된 어노테이션
- **@Configuration** : 설정을 위한 어노테이션으로, 이 어노테이션을 붙은 클래스 안에 @Bean 어노테이션으로 빈을 직접 설정해줄 수 있음
- **@Bean** : 리턴하는 객체를 빈으로 등록

</br>

## @Controller

Spring에서 HTTP 요청을 수행할 때 사용하는 어노테이션이다.  
컨트롤러로 사용할 클래스를 생성하고, 그 클래스 바로 위에 @Controller 어노테이션을 사용해서 해당 클래스가 컨트롤러임을 명시해준 다음, 클라이언트로부터 들어오는 요청의 종류에 따라 어떤 처리를 해줄지 작성해주면 된다.

</br>

### @ResponseBody

컨트롤러가 클라이언트의 요청을 처리해서 응답해줄 때, 응답을 공용어 형태인 JSON으로 바꿔주기 위해서 사용하는 어노테이션이다.

</br>

## @GetMapping

GET 요청은 주로 데이터를 조회하거나 짧은 데이터를 전달할 때 사용된다.  
스프링에서 HTTP GET 요청을 수행할 때 @GetMapping 어노테이션을 선언하여 사용한다.

</br>

## @RequestParam, @PathVariable

URL에 정보를 담는 방법에는 2가지가 있다.

1. https://codestates.com/users?name=loko
2. https://codestates.com/users/loko

1번의 경우는 @RequestParam을, 2번의 경우는 @PathVariable을 사용한다.  
각각의 사용 예시는 다음과 같다.

```java
// @RequestParam 사용방식
@GetMapping(value = "/user")
public ArrayList<UserDTO> getUserData(@RequestParam("name") String name){
		...
}

// @PathVariable 사용방식
@GetMapping(value = "/user/{name}")
public ArrayList<UserDTO> getUserData(@PathVariable("name") String name){
		...
}
```

@RequestParam의 기본값은 true이다.  
꼭 필요한 파라미터가 아니라면 false를 설정해주도록 하자.  
추가적으로, 예외처리를 해주지 않으면 예외가 발생했을 때 서버가 종료되므로 예외처리를 꼭 해주도록 하자.

</br>

## @PostMapping

POST 요청은 데이터를 저장할 때 주로 사용한다.  
스프링에서 POST 요청을 수행하기 위해서 @PostMapping 어노테이션을 사용한다.  
사용방법 자체는 @GetMapping과 유사하다.

</br>

### @RequestBody

@ResponseBody와는 반대로, 클라이언트에서 요청을 받아올 때 JSON을 Java 객체로 바꿔주는 어노테이션이다.  
@RequestParam과 @PathVariable 어노테이션을 활용할 때, URL에 담기에는 지나치게 많은 정보를 요청할 때에는 URL에 꽉꽉 채우기가 버거울 것이다.  
이럴 때 이용할 수 있는 것이 @RequestBody이다.  
이는 HTTP Requests를 활용하는 방안이다.  
클라이언트는 이 공간을 활용해서 요청에 필요한 정보를 보통 JSON으로 보낼 것이며, 거기에 맞게 요청을 처리해줄 수 있도록 로직을 짤 수 있게 해주는 것이 @RequestBody이다.  
사용 방법은 @RequestParam, @PathVariable과 같다.  
다만 Request Body 안의 정보를 Java 객체로 바꿔서 가져오기 때문에, 이 정보를 담아줄 객체 형식이 필요하다.  
그렇기 때문에 우리는 DTO라는 객체 형식을 이용하는 것이다.

</br>

## @PutMapping, @DeleteMapping

데이터를 업데이트할 때 사용되는 PUT 요청은 @PutMapping을 사용한다.  
@DeleteMapping은 역시 데이터를 삭제할 때 사용한다.  
이외에는 다른 HTTP method 관련 어노테이션들과 같은 역할을 한다.
