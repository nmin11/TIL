## value type vs pointer

※ 값 타입 예제

```go
type Temperature struct {
  Value int
  Type  string
}

func NewTemperature(v int, t string) Temperature {
  return Temperature{ Value: v, Type: t }
}

func (t Temperature) Add(v int) Temperature {
  return Temperature{ Value: t.Value + v, Type: t.Type }
}
```

※ pointer 예제

```go
type Student struct {
  Age  int
  Name string
}

func NewStudent(age int, name string) *Student {
  return &Student{ Age: age, Name: name }
}

func (s *Student) AddAge(a int) {
  s.Age += a
}
```

### what is deference

복사되는 크기가 다름

- 모든 대입은 복사로 일어나고 복사되는 크기는 타입 크기와 같으므로
- pointer를 사용하면 메모리 주소 크기인 8byte 고정
- 값 타입을 사용하면 모든 내부 필드 크기를 다 합친 만큼 복사하게 됨
- 하지만 전체 메모리 공간에 비하면 미미한 차이, 성능에 미치는 영향도 거의 없음
- Go 언어에서 메모리를 많이 차지하는 slice, string, map 등은 모두 내부 pointer를 가지는 형태이므로 메모리 낭비를 크게 걱정 안해도 됨

### depends on nature of the object

- 10도의 온도와 15도의 온도라는 두 객체는 서로 다름
- 하지만 15세의 앨리스가 16세가 된다고 해서 다른 객체가 되는 것은 아님
- 객체의 상태가 변경되었을 때 다른 객체가 되는가 ⇒ 값 타입
- 객체의 상태가 변경되어도 동일한 객체인가 ⇒ pointer
