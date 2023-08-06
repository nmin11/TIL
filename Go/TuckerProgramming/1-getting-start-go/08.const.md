## declare constant

```go
const ConstValue int = 10
```

- Go에서 상수로 사용 가능한 타입들
  - `bool`
  - `rune`
  - 정수
  - 실수
  - 복소수
  - 문자열
- 한 번 선언되면 대입문에 사용될 수 없음!
- `&` 연산자를 사용해서 주소를 참조할 수 없음
  - 값으로만 동작하기 때문

## use enum with `iota`

※ iota는 그리스 알파벳 9번째 글자로, 아주 작은 양을 뜻함

- 1씩 증가하는 열거값들을 만들 때 `iota`를 사용하면 편함

```go
const (
  Red   int = iota  // 0
  Blue  int = iota  // 1
  Green int = iota  // 2
)
```

```go
const (
  C1 uint = iota  // 0
  C2              // 1
  C3              // 2
)
```

```go
const (
  BitFlag1 uint = 1 << iota // 1
  BitFlag2                  // 2
  BitFlag3                  // 4
  BitFlag4                  // 8
)
```

## constant without type

- 상수 선언 시 타입을 명시하지 않고 타입 없는 상수를 만들 수 있음

```go
const PI = 3.14
const FloatPI float64 = 3.14

func main() {
  var a int = PI * 100      // 314
  var b int = FloatPI * 100 // error
}
```

- 타입 없는 상수는 변수에 복사될 때 타입이 정해지기 때문에 여러 타입과 함께 사용되는 상수인 경우에 편리함

## constant and literal

- 상수는 컴파일 타임에 실제 리터럴로 변환되기 때문에 상수 표현식 계산에 CPU 자원을 사용하지 않음
- 그렇기 때문에 메모리 주소를 참조할 수 없고, 동적 할당 메모리 영역을 사용하지 않게 되는 것
