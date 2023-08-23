## basic concept

```go
func (r Rabbit) info() int {
  return r.width * r.height
}
```

- `(r Rabbit)` 부분이 리시버
- 리시버에는 모든 로컬 타입이 올 수 있음
- 메소드 정의는 같은 패키지 어디에도 위치할 수 있지만, 리시버 타입이 선언된 파일에 같이 정의하는 게 일반적
- 별칭 타입도 리시버로 활용 가능

```go
type myInt int
func (a myInt) add(b int) int {
  return int(a) + b
}
```

## why use a method

- 결합도(coupling)를 낮추고 응집도(cohesion)를 높이기 위해
- 메소드는 데이터와 관련된 기능을 묶어서 코드 응집도를 높여줌
- 응집도가 낮으면 새 기능을 추가할 때 흩어진 모든 부분을 검토하고 고치는 산탄총 수술 문제 발생

### object oriented programming

- 과거의 절차 중심 프로그래밍은 기능 호출 순서를 나타내는 flowchart를 중요하게 여겼음
- 메소드 기능이 생기면서 데이터와 기능이 묶인 object들이 동작할 수 있게 되었음
- object: 데이터와 기능을 갖는 타입
- object instance: 객체 타입의 인스턴스
- 객체 인스턴스들이 서로 유기적으로 소통하고 관계를 맺게 되면서 프로그래밍 패러다임의 변화가 생겼음
- 이제는 flowchart보다 class diagram을 더 중시하게 됐음
- Go 언어가 OOP 언어인가
  - 클래스, 상속 지원 X
  - 메소드, 인터페이스 지원 O
  - 그래도 객체 간의 상호관계 중심으로 프로그래밍을 할 수 있으므로 충분한 OOP라고 볼 수 있음

## pointer method vs value method

```go
type account struct {
  balance   int
  firstName string
  lastName  string
}

// pointer method
func (a *account) withdrawPointer(amount int) {
  a.balance -= amount
}

func (a account) withdrawValue(amount int) {
  a.balance -= amount
}
```

- 포인터 메소드는 주소를 복사하기 때문에 동일한 인스턴스에 대해 수정할 수 있음
- 값 메소드는 리시버 타입의 모든 값을 복사한 또다른 주소를 만들어냄
  - 복사 대상을 수정해봤자 원본 주소의 값은 수정되지 않음
- 메소드 호출 시 자동 타입 변환
  - 포인터 변수의 값 메소드 호출 시 `(*a).withdrawValue(20)`와 같은 타입 변환을 자동으로 지원
  - 값 변수의 포인터 메소드 호출 시 `(&a).withdrawValue(20)`와 같은 타입 변환을 자동으로 지원
- 포인터 메소드는 인스턴스 중심, 값 메소드는 값 중심
