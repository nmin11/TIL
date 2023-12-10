## return an error

직접 에러를 만들어서 반환하기

```go
fmt.Errorf("제곱근은 양수여야 합니다. float64: %g", f)
```

```go
errors.New("에러 메시지")
```

## error type

```go
type error interface {
  Error() string
}
```

- 어떤 타입이라도 문자열을 반환하는 `Error()` 메소드만 포함하면 에러로 사용할 수 있음!

```go
func (t SomeType) Error() string {
  return "error!"
}
```

### errror wrapping

- 에러를 감싸는 새로운 에러를 만들 수 있음

```go
pos := 0
a, n, err := readNextInt(scanner)
if err != nil {
  return 0, fmt.Errorf("Failed to readNextInt(), pos: %d err: %w", pos, err)
}
```

- `errors.As()`
  - 첫번째 인수에 에러, 두번째 인수에 타입 입력
  - 입력된 타입으로 반환될 수 있는 에러라면 true 반환

```go
var numError *strconv.NumError
if errors.As(err, &numError) {
  fmt.Println("NumberError: ", numError)
}
```

- `errors.Is()`
  - 주어진 에러가 에러 객체 타입인지만 확인

## panic

- 프로그램 정상 진행이 어려울 때 프로그램 흐름을 중지시키는 기능
- Go 언어는 `panic()` 내장 함수를 제공
- 잘못된 메모리 접근 및 메모리 부족 등의 실행 불가능 상황에서 프로그램을 바로 종료시키고 빠르게 문제를 파악
- 버그 수정에 유용한 방식
- `panic(err)`은 프로그램 즉시 종료 후 에러 메시지를 출력하고 call stack 표시
  - 이 정보를 통해 에러 발생 경로를 파악할 수 있음

### call panic

```go
func panic(interface{})
```

- 인수로 모든 타입을 넣을 수 있음
- 일반적으로는 string 타입 메시지나 `fmt.Errorf()` 함수를 통해 만들어진 에러 타입 사용

### recover

- panic을 복구하는 함수
- 발생한 panic 객체를 반환

```go
func recover() interface{}
```

- `interface{}` 타입을 반환하기 때문에 반환값을 사용하려면 타입 검사를 할 것

```go
if r, ok := recover().(net.Error); ok {
  fmt.Println("r is net.Error Type")
}
```

- `recover()`는 제한적으로 사용할 것
  - 데이터가 비정상적이거나 프로그램이 불안정한 상태가 될 수 있음
  - 복구하더라도 비정상 데이터를 확실하게 지워줄 것
