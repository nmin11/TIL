# 왜 제네릭을 사용해야 하는가?

- Java 5 부터 **Generic** 타입이 추가되어, 잘못된 타입이 사용될 수 있는 문제를 컴파일 과정에서 제거할 수 있게 됨
- 제네릭은 컬렉션, 람다식, 스트림, NIO에서 널리 사용되므로 확실히 이해해 두어야 함
- API Document에도 제네릭 표현이 많기 때문에 API Document를 이해하기 위해서라도 알아야 함
- 제네릭은 클래스, 인터페이스, 메소드를 정의할 때 타입을 파라미터로 사용할 수 있도록 함
  - 타입 파라미터는 코드 작성 시 구체적인 타입으로 대체되어 다양한 코드를 생성하도록 함

<br>

### 컴파일 시 강한 타입 체크

- Java 컴파일러는 잘못 사용된 타입 때문에 발생하는 문제점을 제거하기 위해 제네릭 타입에 강한 타입 체크를 함
- 런타임 에러보다는 컴파일 에러로 체크해서 에러를 사전에 방지하기 위한 목적

<br>

### 타입 변환(casting) 체크

- 비제네릭 코드는 불필요한 타입 변환 때문에 프로그램 성능에 악영향을 미침

```java
List list = new ArrayList();
list.add("hello");
String str = (String) list.get(0);
```

※ 위 코드를 제네릭 코드로 수정하면 타입 변환을 할 필요가 없어진다.

```java
List<String> list = new ArrayList<String>();
list.add("hello");
String str = list.get(0);
```

<br>
<br>

# 제네릭 타입 : class\<T>, interface\<T>

```java
public class 클래스명<T> { ··· }
public interface 인터페이스명<T> { ··· }
```

- 제네릭 타입 : 타입을 파라미터로 가지는 클래스와 인터페이스
- 클래스나 인터페이스 이름 뒤에 `<>` 부호가 붙고, 사이에 타입 파라미터가 위치함
- 타입 파라미터는 변수명과 동일한 규칙으로 작성 가능하지만, 일반적으로 대문자 알파벳 한 글자로 표현함
- 제네릭 타입을 실제 코드에서 사용하려면 타입 파라미터에 구체적인 타입을 지정해야 함

<br>

※ 비제네릭 타입을 이용하고 Object 타입을 사용하는 경우

```java
public class Box {
    private Object obj;
    public void set(Object obj) { this.obj = obj; }
    public Object get() { return obj; }
}
```

```java
public class BoxExample {
    public static void main(String[] args) {
        Box box = new Box();
        box.set("홍길동");
        String name = (String) box.get();
    }
}
```

- Object 타입은 모든 종류의 Java 객체를 저장할 수 있다는 장점은 있지만<br>타입 변환이 빈번해지면 전체 프로그램 성능에 악영향을 끼침
- 모든 종류의 객체를 저장하면서 타입 변환이 발생하지 않도록 하기 위해서 제네릭을 이용할 수 있음

<br>

※ 제네릭 타입을 이용하는 경우

```java
public class Box<T> {
    private T t;
    public T get() { return t; }
    public void set(T t) { this.t = t; }
}
```

```java
public class BoxExample {
    public static void main(String[] args) {
        Box<String> box1 = new Box<String>();
        box1.set("hello");
        String str = box1.get();

        Box<Integer> box2 = new Box<Integer>();
        box2.set(6);
        int value = box2.get();
    }
}
```

- 제네릭은 클래스를 설계할 때 구체적인 타입을 명시하지 않고, 타입 파라미터로 대체했다가<br>실제 클래스가 사용될 때 구체적인 타입을 지정함으로써 타입 변환을 최소화시킴

<br>
<br>

# 멀티 타입 파라미터 : class\<K, V, ...>, interface\<K, V, ...>

- 제네릭 타입은 2개 이상의 멀티 타입 파라미터를 사용할 수 있으며, 이 경우 각 파라미터를 `,`로 구분함

```java
public class Product<T, M> {
    private T kind;
    private M model;

    public T getKind() { return this.kind; }
    public M getModel() { return this.model; }

    public void setKind(T kind) { this.kind = kind; }
    public void setModel(M model) { this.model = model; }
}
```

```java
public class ProductExample {
    public static void main(String[] args) {
        Product<TV, String> product1 = new Product<TV, String>();
        product1.setKind(new TV());
        product1.setModel("LG TV");
        TV tv = product1.getKind();
        String tvModel = product1.getModel();

        Product<Car, String> product2 = new Product<Car, String>();
        product2.setKind(new Car());
        product2.setModel("Tesla");
        Car car = product2.getKind();
        String carModel = product2.getModel();
    }
}
```

- 제네릭 타입 변수 선언과 객체 생성을 동시에 할 때 타입 파라미터 자리에<br>구체적인 타입을 지정하는 코드가 중복되어 다소 복잡해질 수 있음
  - Java 7 부터 제네릭 타입 파라미터의 중복 기술을 줄이기 위해 다이아몬드 연산자 `<>`를 제공함
  - Java 컴파일러는 타입 파라미터 부분에 `<>`를 통해 타입 파라미터를 유추해서 자동으로 설정해줌

```java
// Java 6 이하 버전
Product<TV, String> product = new Product<TV, String>();

// Java 7 이상 버전
Product<TV, String> product = new Product<>();
```

<br>
<br>

# 제네릭 메소드 : \<T, R> R method(T t)

- 제네릭 메소드 : 매개 타입과 리턴 타입으로 타입 파라미터를 갖는 메소드
- 선언 방법 : 리턴 타입 앞에 `<>` 기호를 추가하고 타입 파라미터를 기술하고,<br>리턴 타입과 매개 타입으로 타입 파라미터를 사용하면 됨

```java
public <T> Box<T> boxing(T t) { ··· }
```

- 호출 방법
  - 코드에서 타입 파라미터의 구체적인 타입을 명시적으로 지정하기
  - 컴파일러가 매개값의 타입을 보고 구체적인 타입을 추정하도록 하기

```java
Box<Integer> box = <Integer>boxing(100);
Box<Integer> box = boxing(100);
```

<br>

※ 제네릭 메소드 예시

```java
public class Util {
    public static <T> Box<T> boxing(T t) {
        Box<T> box = new Box<T>();
        box.set(t);
        return box;
    }
}
```

```java
public class BoxingMethodExample {
    public static void main(String[] args) {
        Box<Integer> box1 = Util.<Integer>boxing(100);
        int intValue = box1.get();

        Box<Integer> box2 = Util.boxing("로코");
        String strValue = box2.get();
    }
}
```
