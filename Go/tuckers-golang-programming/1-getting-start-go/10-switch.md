## when use switch

- if문을 보기 좋게 정리하고 싶을 때
- 가독성을 높일 수 있음

## condition initialize

```go
switch age := getMyAge(); true {
case age < 10;
  fmt.Println("Child")
case age < 20;
  fmt.Println("Teenager")
case age < 30;
  fmt.Println("20s")
default:
  fmt.Println("My age is ", age)
}
```

- 변수를 초기화한 후, case문의 조건이 true인 경우에 실행하도록 만들 수 있음

## enum with switch

- enum 값과 함께 switch문을 활용하는 사례가 많음

```go
type ColorType int
const (
  Red ColorType = iota
  Blue
  Green
  Yellow
)

func colorToString(color ColorType) string {
  switch color {
  case Red:
    return "Red"
  case Blue:
    return "Blue"
  case Green:
    return "Green"
  case Yellow:
    return "Yellow"
  default
    return "Undefined"
  }
}
```

## break & fallthrough

- 일반적으로 다른 언어들은 switch문의 각 case 종료 시 break문을 사용해야 다음 case 코드를 실행하지 않게 됨
- 하지만 Go는 기본적으로 case를 하나 실행하면 바로 switch문을 빠져나가도록 되어 있음
- 굳이 다음 case 까지 실행시키고 싶다면 `fallthrough` 를 사용해야 함

```go
func main() {
  a := 2

  switch a {
  case 1:
    fmt.Println("a == 1")
  case 2:
    fmt.Println("a == 2") // printed
    fallthrough
  case 3:
    fmt.Println("a == 3") // printed
  default:
    fmt.Println("a > 3")
  }
}
```

- `fallthrough` 키워드는 혼동을 일으킬 수 있으므로 가급적이면 사용하지 않는 것을 권장
