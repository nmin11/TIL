```go
type DuckInterface interface {
  Fly()
  Walk(distance int) int
}
```

- 규칙
  - `_`를 이름으로 사용할 수 없으며, 이름이 반드시 있어야 함
  - 매개변수 및 반환 타입만 다르고 이름이 같은 메소드를 만들 수 없음
  - 메소드 구현을 포함하지 않음
  - `~er`을 붙인 이름으로 만들기를 권장

※ 예제

```go
type Stringer interface {
  String() string
}

type Student struct {
  Name string
  Age  int
}

func (s Student) String() string {
  return fmt.Sprintf("안녕! 나는 %d살 %s라고 해", s.Age, s.Name)
}

func main() {
  student := Student{ "철수", 12 }
  var stringer Stringer
  stringer = student
  fmt.Printf("%s\n", stringer.String())
}
```

- Student 타입이 `String()` 메소드를 포함하고 있기 때문에 `stringer = student`와 같이 대입할 수 있는 것

## why use an interface?

- 인터페이스는 객체지향 프로그래밍에서 아주 중요한 역할을 수행
  - 구체화된 객체가 아닌 인터페이스만 가지고 메소드를 호출할 수 있기 때문
  - 큰 코드 수정 없이 프로그램을 유연하게 변경할 수 있음

### abstraction layer

- 추상화: 내부 동작을 감춰서 서비스를 제공하는 쪽과 사용하는 쪽 모두에게 자유를 주는 방식
- 인터페이스는 추상화를 제공하는 추상화 계층
- decoupling: 추상화 계층을 사용해서 의존 관계를 끊는 것
- 구체화된 타입(concrete type)으로 상호작용하는 것이 아닌, 관계로 상호작용하는 것
  - 그 관계를 정의한 추상화 계층이 바로 인터페이스

## duck typing

- 의미: 인터페이스 구현 여부 명시 X / 정의된 메소드 포함 여부만 결정
- 어떤 인터페이스를 상속받았는지에 대한 명시를 하지 않아도 됨
- 그저 상속 받은 인터페이스의 메소드들을 전부 구현하기만 하면 상속된 타입이라고 볼 수 있음

※ 유래

> 덕 타이핑이라는 이름은 미국 시인 James Whitcomb Riley(1849-1916)가 썼던 다음 글귀에서 유래가 됐습니다.
>
> "만약 어떤 새를 봤는데 그 새가 오리처럼 걷고 오리처럼 날고 오리처럼 소리내면 나는 그 새를 오리라고 부르겠다."

- 장점: 사용자 중심의 코딩 가능
  - 서비스 제공자는 그저 구체화된 객체만 제공
  - 서비스 이용자는 필요에 따라 그때그때 인터페이스를 정의해서 사용
  - 다른 언어라면 인터페이스 지원 여부를 사용자가 아닌 대상이 스스로 명시해야 할 것

## additional features

### nested interface

- 구조체가 다른 구조체를 포함할 수 있듯, 인터페이스도 다른 인터페이스를 포함할 수 있음

```go
type Reader interface {
  Read() (n int, err error)
  Close() error
}

type Writer interface {
  Write() (n int, err error)
  Close() error
}

type ReadWriter interface {
  Reader
  Writer
}
```

- 위 예제의 경우 `Close()`는 같은 형식이므로 하나로 퉁쳐짐

### empty interface

- `interface{}`는 메소드를 가지지 않는 빈 인터페이스
- 모든 타입에 대응할 수 있음
- 따라서 어떤 값이든 받을 수 있는 함수, 메소드, 변수값을 만들 때 사용됨

```go
func PrintVal(v interface{}) {
  switch t := v.(type) {
  case int:
    fmt.Printf("v is int %d\n", int(t))
  case float64:
    fmt.Printf("v is float64 %f\n", float64(t))
  case string:
    fmt.Printf("v is string %s\n", string(t))
  default:
    fmt.Printf("Not supported type: %T:%v\n", t, t)
  }
}
```

### interface default value nil

```go
type Attacker interface {
  Attack()
}

func main() {
  var att Attacker
  att.Attack()
}
```

- 위 예제의 경우 `att`는 초기값이 없기 때문에 `nil`이 됨
- `att.Attack()`은 유효하지 않은 nil 주소를 참조하게 되어 runtime error 발생
- ⭐ nil 때문에 발생한 에러라면 `invalid memory address` 구문을 찾을 수 있을 것!

## convert

- 인터페이스 변수는 타입 변환을 통해 아래와 같이 변환 가능
  - 구체화된 다른 타입
  - 다른 인터페이스

```go
var a Interface
t, ok := a.(ConcreteType)
```

- 타입 변환이 실패해도 런타임 에러는 발생하지 않으니, `ok` bool 타입 변수로 성공 여부를 확인해야 함
  - 실패한 경우 `t`의 값은 ConcreteType의 기본값
  - 인터페이스 변환 시 항상 변환 성공 여부를 체크하자!
- 인터페이스 변수를 구체화된 타입으로 변환할 때, 해당 타입이 인터페이스 메소드 집합을 포함하지 않으면 컴파일 타임 에러 발생
