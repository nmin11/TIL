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
