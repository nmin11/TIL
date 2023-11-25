## Properties

- 클래스 안의 property에 대한 getter 및 setter는 자동으로 생성됨
- 명시적으로 `get()` `set()` 함수를 선언해서 커스텀할 수 있음

```java
class PropertyExample() {
  var counter = 0
  var propertyWithCounter: Int? = null
    set(v) {
      field = v
      counter++
    }
}
```

※ `v` : set 함수 사용시 파라미터로 들어오는 값

※ `field` : 해당 필드에 세팅해줄 값

<br>

## Delegates

- lazy property: 변수에 접근할 때 연산
- 서로 간의 명확한 상속 관계가 아닌 '위임'
- 다른 객체의 구현을 재사용해야 할 때
- Delegation 패턴을 별도의 코드 구현 없이 지원

```java
class LazyProperty(val initializer: () -> Int) {
  val lazyValue: Int by lazy(initialize)
}
```

※ 디자인 패턴과도 연관되어 있어서 이해하기에 어려웠음 → 추후 프로젝트 통해서 실제 사용을 해볼 것
