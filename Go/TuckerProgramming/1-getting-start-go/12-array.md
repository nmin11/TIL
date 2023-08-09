## declare & initialize

기본 변수 선언

```go
var nums [5]int
```

선언 및 할당

```go
days := [3]string{"monday", "tuesday", "wednesday"}
```

일부만 할당

```go
var temps [5]float64 = [5]float64{24.3, 26.7}
```

- 이 경우 2, 3, 4번 index에는 기본값 0.0으로 채워짐

특정 index에 할당

```go
var s = [5]int{1:10, 3:30}
```

- 주어진 index에만 값이 채워지고 나머지는 역시 기본값으로 채워짐

길이 생략

```go
x := [...]int{10, 20, 30}
```

- 길이 3으로 자동 초기화

※ 배열 길이는 상수가 입력되어야 함

## computer with array

- 배열 선언시 컴퓨터는 배열을 위해 연속된 메모리 공간을 확보

```go
var a [10]int32
```

- int32 타입은 4byte이므로 연속된 40byte를 찾아서 배열에 할당하게 됨

컴퓨터가 index에 해당하는 요소를 찾아가는 방법

```
element_location = starting_point + (index * type_size)
```

- 예를 들어 a 배열의 시작 주소가 100번지라면, `a[3]` 주소는 `100 + (3 * 4) = 112`번지가 됨

메모리에 값 할당

```go
a[3] = 300
```

- 112번지로부터 4byte 메모리 공간에 300을 대입

핵심!

1. 배열은 연속된 메모리
2. 컴퓨터는 index와 타입 크기를 사용해서 메모리 주소를 찾아냄
