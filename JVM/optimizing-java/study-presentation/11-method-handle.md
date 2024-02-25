# Method Handle 이란 무엇인가?

⎯ 남궁민

## Method Handle 정의

- 자바 7부터 추가되었고, 이후 지속적으로 개선되어 온 기능
  - `java.lang.invoke.MethodHandles`

> method handle은 내재된 메소드, 생성자, 필드 혹은 이와 비슷한 저수준 작업을 직접 실행할 수 있는 타입화된 참조이며, 선택적으로 인자 값을 변경하거나 값을 반환할 수 있다.

- 쉽게 말해서 **메소드를 찾고, 조정하고, 호출하는 저수준 메커니즘**
- method handle은 불변 객체이며, 외부에서 상태를 확인할 수 없음

## Method Handle 생성 및 사용을 위한 4단계

1. lookup 생성
2. method type 생성
3. method handle 조회
4. method handle 호출

## Method Handle vs Reflection

- method handle은 기존의 `java.lang.reflect` API와 함께 사용할 수 있도록 소개되었으며, 둘은 목적과 성격이 다름
- 성능 관점: **Method Handles API가 Reflection API보다 훨씬 빠름**
  - access checks가 실행 시간이 아닌 생성 시간에 수행되기 때문
- MethodHandles API의 약점
  - 멤버 클래스 열거, 접근성 flag에 대한 메커니즘이 부실함
- MethodHandles API 매개변수 관련 특징
  - 메소드 커리(여러 매개변수를 가진 함수를 단일 매개변수를 가진 함수들로 변환)을 지원
  - 매개변수 타입 변경 및 순서 변경 지원

## Lookup 생성

- lookup: method handle을 생성하기 위한 팩토리 객체
  - 특정 클래스에 대해 접근 가능한 메소드, 생성자, 필드만을 대상으로 함
- MethodHandles API를 활용해서 생성 가능

❖ public 메소드에 대한 액세스 제공 lookup 생성

```java
MethodHandles.Lookup publicLookup = MethodHandles.publicLookup();
```

❖ private 및 protected 메소드에 대한 액세스 제공 lookup 생성

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
```

## MethodType 생성

- MethodHandle을 생성하기 위해 lookup 객체는 타입에 대한 정의가 필요
- 이는 MethodType 클래스를 사용하여 생성 가능
- **MethodType은 method handle이 받는 매개변수와 반환 타입, 또는 method handle caller에게 전달되는 매개변수와 반환 타입을 나타냄**
  - MethodType을 통해 method handle이나 호출자는 올바른 타입의 매개변수를 전달하고 반환값도 올바른 타입으로 처리할 수 있게 됨
- MethodType의 인스턴스 또한 불변 객체

❖ Object[]을 받아 List를 반환하는 메소드의 MethodType을 생성

```java
MethodType mt = MethodType.methodType(List.class, Object[].class);
```

## MethodHandle 조회

- lookup 객체를 사용하여 method handle을 조회
  - 이를 위해 원본 클래스 및 메소드 이름도 필요함
- lookup factory는 method handle을 찾아내는 메소드 집합을 제공
  - 찾고자 하는 메소드의 scope에 맞게 적절한 메소드를 사용할 수 있음

❖ `findVirtual` : 객체 메소드의 MethodHandle 조회

```java
MethodType mt = MethodType.methodType(String.class, String.class);
MethodHandle concatMH = publicLookup.findVirtual(String.class, "concat", mt);
```

❖ `findStatic` : 정적 메소드의 MethodHandle 조회

```java
MethodType mt = MethodType.methodType(List.class, Object[].class);
MethodHandle asListMH = publicLookup.findStatic(Arrays.class, "asList", mt);
```

❖ `findConstructor` : 생성자의 MethodHandle 조회

```java
MethodType mt = MethodType.methodType(void.class, String.class);
MethodHandle newIntegerMH = publicLookup.findConstructor(Integer.class, mt);
```

❖ `findGetter` : 필드의 MethodHandle 조회

```java
MethodHandle getMH = publicLookup.findGetter(String.class, "length", int.class);
```

❖ private 메소드에 대한 MethodHandle 조회

```java
Method formatBookMethod = Book.class.getDeclaredMethod("formatBook");
formatBookMethod.setAccessible(true);
MethodHandle formatBookMH = lookup.unreflect(formatBookMethod);
```

## MethodHandle 호출

- MethodHandle 클래스는 3가지 실행 방식을 제공
  - `invoke`
  - `invokeWithArguments`
  - `invokeExact`

### `invoke`

- 인자 개수를 고정해야 하지만, 인자 및 반환 타입에 대한 캐스팅 및 박싱/언박싱을 허용

```java
MethodType mt = MethodType.methodType(String.class, char.class, char.class);
MethodHandle replaceMH = publicLookup.findVirtual(String.class, "replace", mt);

String output = (String) replaceMH.invoke("jovo", Character.valueOf('o'), 'a');

assertEquals("java", output);
```

### `invokeWithArguments`

- 3가지 실행 방식 중 가장 제한이 적음
- 인자 및 반환 타입에 대한 캐스팅 및 박싱/언박싱을 허용 + 가변 개수 호출 허용

```java
MethodType mt = MethodType.methodType(List.class, Object[].class);
MethodHandle asList = publicLookup.findStatic(Arrays.class, "asList", mt);

List<Integer> list = (List<Integer>) asList.invokeWithArguments(1,2);

assertThat(Arrays.asList(1,2), is(list));
```

### `invokeExact`

- 가장 제한적인 실행 방식
- 캐스팅할 수 없으며 고정된 인자 개수를 사용해야 함

```java
MethodType mt = MethodType.methodType(int.class, int.class, int.class);
MethodHandle sumMH = lookup.findStatic(Integer.class, "sum", mt);

int sum = (int) sumMH.invokeExact(1, 11);

assertEquals(12, sum);
```

## 정리

- Method Handle은 Reflection보다 빠르고 유연한 저수준 메커니즘
- 저수준 작업을 허용하기 때문에 꼭 필요한 경우가 아니면 사용하지 않는 것이 좋음
