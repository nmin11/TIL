2021 / 08 / 09

# 객체지향 설계

## SOLID 원칙

SOLID 원칙이란, 좋은 객체지향 설계를 위한 5가지 원칙을 뜻한다.

</br>

### **SRP : 단일 책임 원칙 (Single Responsibility Principle)**

한 클래스에 하나의 책임만

</br>

### **OCP : 개방-폐쇄 원칙 (Open / Closed Principle)**

소프트웨어 요소는 "확장"에는 열려 있고 "변경"에는 닫혀 있어야 함

</br>

### **LSP : 리스코프 치환 원칙 (Liskov Substitution Principle)**

프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 함

</br>

### **ISP : 인터페이스 분리 원칙 (Interface Segregation Principle)**

특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 나음

</br>

### **DIP : 의존관계 역전 원칙 (Dependency Inversion Principle)**

추상화에 의존해야 하며, 구체화에 의존하지 말 것

</br>

※ Spring은 SOLID 원칙을 몸소 실천하는 프레임워크이므로, 해당 원칙들이 Spring에서 어떻게 구현되어 있는지 상세히 알아보면 많은 도움이 된다.

</br>

## Spring의 파일 구조

### **Controller**

API 요청을 매핑하는 클래스이다.  
@GetMapping, @PostMapping 같은 어노테이션을 사용한다.  
Controller 클래스에서의 단일 책임은 API 요청을 매핑하고 결과를 리턴하는 것이다.  
필요한 로직이 있다면 Service 클래스를 사용한다.

</br>

### **Service**

비즈니스 기능을 수행하는 클래스이다.  
Repository 클래스를 사용하여 데이터를 전달받을 수 있다.  
로직을 수행한 결과를 다시 Controller에게 전달해준다.

</br>

### **Repository**

DB에서 원하는 데이터를 가져오고 저장하는 기능을 수행하는 클래스이다.  
JPA 코드가 Repository에 많이 작성되며, 주로 SQL 관련 코드들을 담는다.  
Service에서 메소드를 호출하는 방식으로 사용된다.

</br>

### **Domain**

DTO, VO, Entity 코드들을 모아두는 패키지이다.

</br>

### **Configuration**

의존성 주입을 위한 스프링 어노테이션, @Configuration을 사용하는 클래스이다.  
여기에서 스프링 컨테이너에 클래스를 등록한다.

</br>

Controller, Service, Repository의 간단한 사용 예제를 보면 다음과 같다.

```java
@RestController
class UserController {
	private UserService userSerivce;

	public UserContorller() {
		this.userService = new UserService();
	}

	@GetMapping("/login")
	public List<LoginDTO> UserLogin(@RequestParam(required = true) String name) {
		return userService.SereachUser(name);
	}
}
```

```java
@Service
class UserService {
	private UserRepository userRepository;

	public UserService() {
		this.userRepository = new UserRepository();
	}

	public List<LoginDTO> SearchUser(String name) {
		try {
			return userRepository.FindByName(name);
		} catch(Exception e) {
			return null;
		}
	}
}
```

```java
@Repository
class UserRepository {
	public List<LoginDTO> FindByName(String name) {
		return loginRepository.getLoginList().stream()
                .filter(itme -> itme.getName().equals(name))
                .collect(Collectors.toList())
	}
}
```

</br>
</br>

# Spring Container

## Bean

Bean은 Spring Container에서 생성하고 관리하는 어플리케이션 객체를 뜻한다.  
@Configuration 클래스 안에 구현한 메소드에 @Bean 어노테이션을 붙여서 특정 객체를 스프링 컨테이너에 등록할 수 있다.

</br>

## IoC (Inversion of Control, 제어의 역전)

Spring의 핵심 중 하나이다.  
기존에 객체의 관리(생성과 의존 관계 설정)는 개발자가 직접 제어했다.  
그러나 Spring을 사용하면 객체 제어 권한을 Spring Container가 가지게 되어, 어노테이션에 따라 자동으로 객체를 관리해주게 된다.  
이 때문에 제어 주체가 역전되었다고 표현한다.

</br>

## DI (Dependency Injection, 의존성 주입)

DI는 Spring Container를 통해 의존 관계를 설정하는 방식을 뜻한다.  
기존에 사용하던 new 키워드나 직접 싱글톤 구현 방식을 사용하지 않고 컨테이너를 통해 Bean 객체를 주입받아서 사용한다.  
클래스는 생성자나 setter를 통해 의존 관계를 주입한다.

</br>

![DI](https://user-images.githubusercontent.com/75058239/128686077-7facc837-1160-4ddf-8277-2f95a3bc7ce1.png)

</br>
</br>

# 싱글톤 패턴

```java
@RestController
class UserController {
	private UserService userSerivce;

	public UserContorller() {
		this.userService = new UserService();
	}

	@GetMapping(value = "/login")
	public List<LoginDTO> UserLogin(@RequestParam(required = true) String name) {
		return userService.SereachUser(name);
	}
}
```

앞서 이런 코드를 살펴봤는데 여기에는 치명적인 문제점이 있다.  
바로 new 키워드를 사용하고 있다는 점이다.  
이렇게 new 키워드를 사용하게 되면 Controller로 API 요청이 올 때마다 새로운 Service 인스턴스를 생성하게 된다.

</br>

![new 키워드의 문제점](https://user-images.githubusercontent.com/75058239/128686106-d2b4f4ff-1af9-46da-afd5-8556ead85535.png)

</br>

1만 건의 요청이 들어온다면 서버 메모리에는 1만 개의 UserService 인스턴스가 생성된다.

</br>

스프링 컨테이너는 이 문제를 간단하게 해결한다.

</br>

![new 키워드 문제 해결](https://user-images.githubusercontent.com/75058239/128686127-cfc5099b-16c9-4b37-8233-4af7c1d72064.png)

</br>

UserService의 인스턴스를 재사용하는 방법이다.  
이 방법에 따라, 우리가 접근 가능한 곳에 미리 클래스를 인스턴스화 시켜두고 해당 인스턴스를 사용하게 된다.  
이 방법은 개발 환경에서 매우 자주 사용하는 방법이며, "싱글톤 패턴"이란 이름으로 정형화되어 있다.

</br>

## 싱글톤 패턴 적용해보기

싱글톤 패턴을 구현하는 방법은 아주 많고 서비스마다 제각각의 방법을 사용한다.  
싱글톤 패턴 구현 방법들을 직접 찾아보면 많은 도움이 될 것이다.
여기에서는 static을 사용한 예시를 첨부했다.

```java
@Service
class UserService {

	private static final UserService instance = new UserService();

	public static UserService getInstance() {
		return instance;
	}

	private UserRepository userRepository;

	private UserService(){
		this.userRepository = new UserRepository();
	}

	public List<LoginDTO> SearchUser(String name) {
		try {
			return userRepository.FindByName(name);
		} catch(Exception e) {
			return null;
		}
	}
}
```

이처럼 static을 사용했기에 실행과 동시에 메모리에 등록되고, private이기 때문에 접근은 불가능해진다.  
이 변수에 접근하기 위해서는 getInstance() 메소드를 사용하면 된다.  
Controller에서 이 Service를 사용하는 예제는 다음과 같다.

```java
@RestController
class UserController{
	public UserContorller() {}

	@GetMapping("/login")
	public List<LoginDTO> UserLogin(@RequestParam(required = true) String name) {
		return UserService.getInstance().SearchUser(name);
	}
}
```

이 방법을 통해 API 요청마다 인스턴스가 생기는 것을 방지할 수 있게 된다.

</br>

## 싱글톤 패턴의 문제점

싱글톤의 남발은 여러가지 문제를 가지고 온다.

- 싱글톤 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유시키면, 다른 클래스의 인스턴스 간 결합도가 높아져서 OCP를 위반
- 멀티쓰레드 환경에서 동기화 처리를 하지 않으면 인스턴스가 2개 생성되는 이슈가 발생할 수 있음

다양한 단점이 있지만 가장 핵심은 **"OCP 원칙"을 위반**한다는 점이다.  
다행히도 Spring은 객체지향을 몸소 실천하는 프레임워크인 만큼 이 문제를 방치하지 않았다.  
Spring Container를 만들어서 모든 클래스를 Spring Container에서 관리하게 했다.  
Spring Container를 사용하면 Spring 프레임워크가 싱글톤도 적용해주고 객체의 인스턴스도 전달해준다.

</br>
</br>

# 어플리케이션 Bean 객체

## Bean 객체 설정

Spring Container에서 관리하는 어플리케이션 객체를 Bean이라고 부른다.  
우리가 만든 클래스를 Bean으로 만들어 주려면 Spring Container에 어떤 클래스를 Bean으로 관리해주었으면 하는지 알려줘야 한다.  
그 방법에는 2가지가 있다.  
바로 @Configuration 클래스에서 @Bean 메소드를 사용해서 인스턴스를 등록하는 방법과, @Component 클래스에 직접 명시하여 설정하는 방법이다.

</br>

### Configuration

```java
@Configuration
public class SpringConfig {
	@Bean
	public UserService userService() {
		return new UserService(userRepository());
	}

	@Bean
	public UserRepository userRepository() {
		return new UserRepository();
	}
}
```

이렇게 설정해주면 다음과 같이 활용할 수 있다.

```java
@RestController
class UserController {
	private UserService userSerivce;

	@Autowired
	public UserContorller(UserService userService) {
		this.userService = userService();
	}

	@GetMapping(value = "/login")
	public List<LoginDTO> UserLogin(@RequestParam(required = true) String name) {
		return userService.SereachUser(name);
	}
}
```

```java
@Service
public class UserService {
	private UserRepository userRepository;

	public UserService(UserRepository userRepository){
		this.userRepository = userRepository;
	}

	public List<LoginDTO> SereachUser(String name){
    // ...
	}
}
```

```java
@Repository
public class UserRepository {
	public List<LoginDTO> FindByName(String name){
		// ...
	}
}
```

@Configuration은 개발자가 Java 코드로 Bean을 설정할 수 있게 해주는 어노테이션이다.  
레거시 프로젝트에서는 XML 파일을 활용해야 했지만 현재는 Java 클래스 파일을 사용할 수 있게 되었다.  
그리고 Configuration 파일은 하나만 존재하지는 않는다.  
그렇기 때문에 여러 개의 클래스로 나눠서 역할에 따라 구현한다.  
대부분의 경우 Configuraion이라는 패키지를 만들고, 그 안에 클래스들을 정리하는 방식을 활용한다.  
Configuration 클래스 안에 @Bean을 작성하면, 서버 실행과 동시에 Spring Container가 리턴되는 인스턴스를 관리해주게 된다.  
그리고 Configuration으로 의존성을 주입할 때는 주로 생성자를 통해서 주입한다.

</br>

### Component

Java 코드로 Bean에 등록하는 방법보다 더 간단한 방법이 있다.  
Component Scan 방법이 등장하면서 개발자는 더이상 Configuration을 별도로 만들 필요조차 없어졌다.  
Component Scan은 @Component가 선언되어 있는 클래스를 자동으로 찾아내서 Spring Container에 Bean으로 설정해준다.  
그리고 또 한가지 꼭 알아두어야 할 점은, @RestController, @Service, @Repository 어노테이션 안에 이미 @Component가 포함되어 있다는 점이다.  
사용 예시는 다음과 같다.

```java
@RestController
class UserController {
	private UserService userSerivce;

	@Autowired
	public UserContorller(UserService userService) {
		this.userService = userService();
	}

	@GetMapping(value = "/login")
	public List<LoginDTO> UserLogin(@RequestParam(required = true) String name) {
		return userService.SereachUser(name);
	}
}
```

```java
@Service
public class UserService {
	private UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<LoginDTO> SereachUser(String name) {
    // ...
	}
}
```

```java
@Repository
public class UserRepository{
	public List<LoginDTO> FindByName(String name) {
		// ...
	}
}
```

</br>
</br>

# Component Scan

@Component가 선언된 클래스 파일을 전부 찾아서 Spring Bean으로 설정해주는 기능이다.  
Configuration 방식보다 Bean 설정 방식이 간편하다는 장점이 있으며, 대부분의 경우 Component Scan으로 코드를 작성하게 된다.  
앞서 살펴봤듯이, @Controller나 @Service 등이 이미 @Component를 내장하고 있다는 점을 적극 활용하면 된다.  
이번에는 @Autowired에 대해서 알아볼 것이다.  
@Autowired는 등록한 방법에 상관 없이, Spring Container에서 관리하는 모든 Bean을 대상으로 의존성을 주입받는 방법이다.

</br>

## 생성자 주입

```java
@Service
public class UserService {
	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
}
```

생성자 인자를 통해 Bean 객체를 받아오는 방식이다.  
생성자 주입의 경우 @Autowired를 생략해도 되지만 생성자가 2개 이상일 때는 명시해주어야 한다.  
위 코드에서 보이는 final 키워드는 생성자 주입에만 사용할 수 있다.  
또한, 생성자 주입은 Spring에서 권장하는 DI 방법이다.  
그 이유는 다음과 같다.

- 객체 불변성 확보
- 순환 참조 방지
- final 키워드 사용 가능
- 테스트 코드 작성에 용이

setter 주입이나 필드 주입은 순환 참조를 해도 서버가 정상 실행되며, 순환 참조가 발생하는 부분에서 버그가 발생해서 서비스가 종료된다.  
반면에 생성자 주입의 경우에는 프로그램 시작과 동시에 순환 참조로 인해 프로그램이 실행되지 않아서 사전에 이를 방지할 수 있다.  
여기서 한가지 명심해야 할 점은, **'의존 관계 주입의 변경이 필요한 상황은 거의 발생하지 않는다'** 는 점이다.  
수정자 주입이나 일반 메소드 주입을 이용하면 불필요한 수정 가능성을 열어두게 되며 OCP를 위반하게 된다.  
따라서 생성자 주입을 통해 변경의 가능성을 배제하고 불변성을 보장하는 것이 좋다.

</br>

## Setter 주입

```java
@Service
public class UserService{
	private UserRepository userRepository;

    @Autowired
	private setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public UserService() {
		// 생성자
	}
}
```

생성자 주입과 다르게, 주입 받는 객체가 변경될 가능성이 있는 경우에 사용한다.  
하지만 변경 가능성은 극히 낮다.

</br>

## 필드 주입

```java
@Service
public class UserService{
	@Autowired
	private UserRepository userRepository;

	public UserService(){
		// 생성자
	}
}
```

변수에 바로 @Autowired를 사용해서 Bean 객체를 받아오는 방식이다.  
코드가 간결하기 때문에 과거에 많이 이용되었다.  
하지만 필드 주입은 외부에서 변경할 수 없다는 단점이 있어서, 테스트 코드의 중요성이 드러남에 따라 필드의 객체를 수정할 수 없는 필드 주입은 거의 사용되지 않게 되었다.

</br>

## Component Scan 범위

Application 클래스가 있는 폴더부터 그 하위 폴더까지 탐색한다.

</br>
</br>

## ※ Sprint Review 시간을 통해 추가적으로 알게 된 것들

1. RESTful API  
   사실 GET, POST 만으로도 작업을 다 처리할 수 있지만 URI를 번잡하게 사용하지 않고 효율적으로 사용하기 위해서 다른 HTTP 메소드들을 사용해야 하는 것이다.
2. POJO (Plain Old Java Object)  
   가장 간단한 자바 오브젝트를 뜻한다.  
   개발을 진행할 때 POJO에 따라서 직관적이며 이해하기 쉬운 코드를 짜는 것이 중요하다.
3. 인터페이스를 사용해야 하는 이유  
   인터페이스에 내장된 메소드 사용을 강제할 수 있다.  
   뿐만 아니라 메소드 이름, 변수 이름 등을 다 지켜야 한다.
