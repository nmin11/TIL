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
