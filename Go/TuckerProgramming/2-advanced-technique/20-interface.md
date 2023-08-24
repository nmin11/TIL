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
