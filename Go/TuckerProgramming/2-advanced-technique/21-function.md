## variadic function

- 가변 인수 함수: 함수 인수 개수가 고정적이지 않은 함수

```go
func sum(nums ...int) int {
  sum := 0
  for _, v := range nums {
    sum += v
  }
  return sum
}
```

- 함수 내부에서는 slice 타입으로 동작
- 참고로 `fmt.Println(2, "hello", 3.14)`의 경우 `...interface{}` 타입으로 받아서 처리하기 때문에 모든 타입에 대응할 수 있는 것

## defer

- 함수 종료 직전에 실행하는 코드
- 대표적으로 OS 자원을 사용하는 파일이나 소켓 핸들

```go
defer f.Close()
```

- `defer` 키워드를 한 함수 내에서 여러 번 사용하면 역순으로 호출됨

## function type variable

- program counter: 다음으로 실행할 라인을 나타내는 레지스터
- 함수 시작 지점 역시 counter 숫자로 표시될 수 있고, 이를 통해 마치 포인터처럼 함수를 가리킬 수 있음
- 그래서 function pointer라고 불림

※ 함수 포인터 예시

```go
func (int, int) int
```

※ 함수 타입 변수 활용 예제

```go
type opFunc func (int, int) int

func add(a, b int) int {
  return a + b
}

func mul(a, b int) int {
  return a * b
}

func getOperator(op string) opFunc {
  if op == "+" {
    return add
  } else if op == "*" {
    return mul
  } else {
    return nil
  }
}

func main() {
  var operator opFunc
  operator = getOperator("*")
  result := operator(3, 4)  // 12
}
```

## function literal

- 이름 없는 함수
- 함수명 없이 함수 타입 변수값으로 대입되는 함수값
- 다른 프로그래밍 언어에서는 익명 함수 또는 Lambda라고 불리기도 함

```go
type opFunc func(a, b int) int

func getOperator(op string) opFunc {
  if op == "+" {
    return func(a, b int) int {
      return a + b
    }
  } else if op == "*" {
    return func (a, b int) int {
      return a * b
    }
  } else {
    return nil
  }
}

func main() {
  fn := getOperator("*")
  result := fn(3, 4)  // 12
}
```

※ 함수 리터럴 직접 호출

```go
result := func(a, b int) int {
  return a + b
}(3,4)
```
