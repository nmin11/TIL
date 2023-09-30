## go test

테스트 코드 작성 규약

1. 테스트 코드는 파일명이 `_test.go`로 끝나는 파일 안에 있어야 함
2. `testing` 패키지를 import 해야 함
3. 테스트 코드를 구현하는 함수들은 `func TestXxxx(t *testing T)` 형태이어야 함

### how to write a test code

```go
import "testing"

func TestSquare(t *testing.T) {
  rst := square(9)
  if rst != 81 {
    t.Errorf("square(9) should be 81 but square(9) returns %d", rst)
  }
}
```

- `testing.T` 객체의 `Error()`와 `Fail()` 메소드를 통해 실패를 알리고 실패 메시지를 넣을 수 있음
  - `Error()`: 모든 테스트 중단
  - `Fail()`: 다음 테스트 계속 진행

### run only specific test

- `go test` 명령어는 전체 테스트를 실행
- `-run` 플래그를 통해 특정 테스트만 실행할 수 있음

```bash
go test -run TestName
```

- 입력한 문자열로 시작하는 모든 테스트를 실행

### stretchr/testify

```bash
go get github.com/stretchr/testify
```

- 테스트 코드 작성을 돕는 유용하고 간략한 외부 패키지

```go
import (
  "testing"
  "github.com/stretchr/testify/assert"
)

func TestSquare(t *testing.T) {
  assert := assert.New(t)
  assert.Equal(81, square(9), "square(9) should be 81")
}
```

stretchr/testify/assert 패키지의 유용한 함수들

- `Equal()`: expected와 actual 값이 다르면 실패

```go
func Equal(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool
```

- `Greater()`: e1이 e2보다 크지 않으면 실패

```go
func Equal(t TestingT, e1, e2 interface{}, msgAndArgs ...interface{}) bool
```

- `Len()`: object 항목의 개수가 length가 아니면 실패

```go
func Equal(t TestingT, object interface{}, length int, msgAndArgs ...interface{}) bool
```

- `NotNilf()`: object 가 nil이면 실패

```go
func Equal(t TestingT, object interface{}, msg string, args ...interface{}) bool
```

- `NotEqualf()`: expected와 actual 값이 같으면 실패

```go
func Equal(t TestingT, expected, actual interface{}, msg string, args ...interface{}) bool
```

stretchr/testify 의 다른 유용한 패키지들

- mock: 모듈의 행동을 가장하는 mockup 객체 제공
- suite: 테스트 준비 작업과 테스트 종료 후 뒤처리 작업을 쉽게 할 수 있도록 도와줌
