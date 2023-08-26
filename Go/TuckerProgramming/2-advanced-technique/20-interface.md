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
