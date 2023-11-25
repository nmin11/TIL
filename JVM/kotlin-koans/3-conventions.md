## Comparison

- 날짜 데이터를 년, 월, 일에 따라 비교 정렬하기
- `when` 절 및 표현식 활용 방법 숙지할 것

```java
data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int): Comparable<MyDate> {
  override fun compareTo(other: MyDate): Int = when {
    year != other.year -> year - other.year
    month != other.month -> month - other.month
    else -> dayOfMonth - other.dayOfMonth
  }
}
```

<br>

## Operators overloading

- 연산자 오버로딩: 연산자들을 기존과 다르게 활용할 수 있도록 교체
- `a.inc()` `a.dec()` `a.plus()` `a.minus()` 등의 함수를 오버로딩하면 `++` `--` `+` `-` 같은 연산자의 동작이 바뀜

```java
data class Counter(val dayIndex: Int) {
  operator fun plus(increment: Int): Counter {
    return Counter(dayIndex + increment)
  }
}
```
