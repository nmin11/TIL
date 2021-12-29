# 상속 개념

- 객체 지향 프로그램에서 상속은 부모 클래스의 멤버를 자식 클래스에게 물려주는 것
- 부모 클래스를 상위 클래스라 부르기도 하며, 자식 클래스를 하위 클래스, 또는 파생 클래스라 부르기도 함
- 이미 잘 개발된 클래스를 재사용해서 새로운 클래스를 만들 수 있게 해주기 때문에 코드의 중복을 줄여줌
- 부모 클래스에서 `private` 접근 제한을 갖는 필드와 메소드는 상속 대상에서 제외
  - 마찬가지로 `default` 접근 제한을 갖는 필드와 메소드는 부모 · 자식 클래스가 서로 다른 패키지에 있다면 상속 대상에서 제외
- 부모 클래스의 수정으로 모든 자식 클래스들의 수정 효과를 가져오기 때문에 유지 보수 최소화

<br>
<br>

# 클래스 상속

```java
class 자식클래스 extends 부모클래스 {
    //필드
    //생성자
    //메소드
}
```

- 프로그램에선 자식이 부모를 선택
  - 자식 클래스를 선언할 때 어떤 부모 클래스를 상속받을 것인지 결정하고, 선택된 부모 클래스는 위와 같이 `extends` 뒤에 기술
- 다른 언어와 달리 Java는 다중 상속을 허용하지 않음

<br>
<br>

# 부모 생성자 호출

- 자식 객체를 생성하면 부모 객체가 먼저 생성되고 자식 객체가 그 다음에 생성됨
- 모든 객체는 클래스의 생성자를 호출해야만 생성되는데, 그렇다면 부모 객체를 생성하기 위한 부모 생성자를 어디서 호출한 것인가?
  - 비밀은 자식 생성자에 숨어 있음
  - 부모 생성자는 자식 생성자의 맨 첫 줄에서 호출됨
  - 생성자가 명시적으로 선언되지 않았더라도 컴파일러는 기본 생성자를 생성함

```java
public Child() {
    super();
}
```

`super()`는 부모의 기본 생성자를 호출한다.  
즉, 다음 코드와도 같다고 볼 수 있다.

```java
public Parent() {}
```

- 생성자를 명시적으로 선언할 때, `super()`의 괄호 안에 매개 변수들을 넣어서, 해당 매개 변수의 타입들과 맞는 부모 생성자를 지정해서 호출할 수도 있음
  - 만약 이 때 매개 변수들의 타입들과 일치하는 부모 생성자가 없을 경우 컴파일 오류 발생
- `super()`를 생략했을 경우, 컴파일러가 자동 생성하기 위해 부모 클래스에 기본 생성자가 있어야만 하는데, `super()`를 생략함과 동시에 부모 클래스에서는 타입을 직접 명시한 생성자만 있다면 자식 생성자에서 반드시 `super(매개값들)`를 명시적으로 호출해야 함
  - 또한, `super(매개값들)`는 반드시 자식 생성자 첫 줄에 위치해야만 함

```java
public class People {
    public String name;
    public String ssn;

    public People(String name, String ssn) {
        this.name = name;
        this.ssn = ssn;
    }
}
```

`People` 클래스는 기본 생성자가 없고 매개 변수를 갖는 생성자만 있기 떄문에 자식 클래스는 `super(name, ssn)`를 활용해서 `People` 클래스의 생성자를 호출해야 한다.

```java
public class Student extends People {
    public int studentNo;

    public Student(String name, String ssn, int studentNo) {
        super(name, ssn);
        this.studentNo = studentNo;
    }
}
```

만약 `super(name, ssn)` 부분을 주석 처리하고 실행하면 `Implicit super constructor People() is undefined. Must explicitly invoke another constructor` 라는 컴파일 오류가 발생한다.
