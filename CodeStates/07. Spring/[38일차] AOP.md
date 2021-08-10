2021 / 08 / 10

# AOP (관점지향 프로그래밍)

AOP는 흩어진 Aspect를 **모듈화**할 수 있는 프로그래밍 기법이다.  
클래스들이 비슷한 메소드, 필드, 코드 등을 사용하고 있다면, 개발자가 한 클래스를 수정하려고 할 때 연관된 모든 클래스를 찾아가서 또다시 수정을 진행해야 할 것이다.  
이렇듯, 클래스마다 겹치고 반복되는 코드를 **Crosscutting Concerns(흩어진 관심사)** 라고 부른다.

</br>

(이미지 첨부 AOP)

</br>

이는 AOP를 활용해서 해결해야 한다.  
위 이미지를 보면 흩어져 있는 부분들을 Aspect를 활용해서 모듈화한 모습을 볼 수 있다.  
이처럼 모듈화한 Aspect를 클래스의 어떤 곳에서 사용해야 하는지 정의해주면 된다.  
결론적으로, **Aspect를 모듈화하고 핵심적인 비즈니스 로직에서 분리하여 재사용하겠다는 것이 AOP이다.**

</br>

## 주요 개념

- **Aspect** : 모듈화한 클래스들
- **Target** : Aspect 적용 대상
- **Advice** : 어떤 부가 기능을 수행할 것인지 지정  
  메소드의 상태에 따라 Before, AfterReturning, AfterThrowing, After, Around로 나눌 수 있음
- **Join point** : Advice 적용 위치  
  메소드 진입 지점, 생성자 호출 시점 등 다양한 시점에 적용 가능  
  **Spring AOP에서는 메소드에만 적용 가능**
- **Point cut** : 실제 Advice 적용 지점  
  **Spring AOP에서는 Advice가 적용될 메소드를 선정**

</br>

## 적용 방법

- **컴파일** : Java 파일을 클래스 파일로 만들 때 바이트코드를 조작하여 적용
- **로드 타임** : 클래스를 로딩하는 시점에 끼워서 적용
- **런타임** : 클래스를 빈으로 만들 때 프록시 빈으로 감싸서 만든 후, 프록시 빈이 클래스 중간에 코드를 추가해서 적용

</br>

## 적용 예제

메소드의 실행 시간을 체크하는 예제이다.

```java
public class TimeTraceAop {
    @Around("execution(* hello.hellospring..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        System.out.println("START : " + joinPoint.toString());

        try {
            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            System.out.println("END : " + joinPoint.toString() + " " + timeMs + "ms");
        }
    }
}
```

@Around 어노테이션의 속성을 위와 같이 지정해줌으로써, 모든 클래스에 적용되는 AOP가 만들어졌다.  
return joinPoint.proceed() 부분이 종단 관심 사항으로, 서비스 로직이 실행되는 구간이다.

- Advice = Around
- point cut = execution(_ hello.hellospring.._(..))

</br>

## Spring AOP의 특징

- 프록시 패턴 기반의 AOP 구현체 및 프록시 객체를 쓰는 이유는 접근 제어 및 부가 기능 추가를 위한 것
- Spring Bean에만 AOP 적용 가능
- 모든 AOP 기능 제공 X, Spring IoC와 연동하여 엔터프라이즈 애플리케이션의 가장 흔한 문제에 대한 해결책 지원

</br>

## 우아한 테크 테코톡 영상으로 한번 더 이해하기

[10분 테코톡 - 제이의 Spring AOP](https://www.youtube.com/watch?v=Hm0w_9ngDpM&t=2s&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech) 영상을 보고 정리한 내용이다.

</br>

### 인프라 로직

AOP는 메소드의 실행 시간을 측정하거나 권한을 체크하거나 트랜잭션을 거는 등의 '부가 기능'을 구현할 때 주로 사용한다.  
이러한 인프라 로직은 애플리케이션 전 영역에서 나타날 수 있다.  
필요한 모든 영역에 인프라 로직을 넣게 되면 중복된 코드로 인해 유지보수가 힘들어진다.  
게다가 인프라 로직이 비즈니스 로직과 함께 있으면 비즈니스 로직을 이해하기가 까다로워진다.

</br>

### AOP와 OOP

AOP는 OOP를 보완한다.  
다음은 Spring 공식 문서의 내용이다.

</br>

_Aspect-oriented Programming (AOP) complements_  
_Object-oriented Programming (OOP) by providing_  
_another way of thinking about program structure._

</br>

프로그램의 구조에 대해 또다른 생각의 방향을 제시해줌으로써, AOP가 OOP를 보완하고 있다는 내용이다.

</br>

### Spring AOP vs AspectJ

|            |                  Spring AOP                   |                                 AspectJ                                  |
| :--------: | :-------------------------------------------: | :----------------------------------------------------------------------: |
|    목표    |                간단한 AOP 기능                |                             완벽한 AOP 기능                              |
| join point |              메소드 레벨만 지원               |                생성자, 필드, 메소드 등</br>다양하게 지원                 |
|  weaving   |              런타임 시에만 가능               | 런타임은 제공하지 않음</br>compile-time, post-compile</br>load-time 제공 |
|    대상    | Spring Container가 관리하는</br>Bean에만 가능 |                         모든 Java Object에 가능                          |
