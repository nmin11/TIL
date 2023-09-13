## return an error

직접 에러를 만들어서 반환하기

```go
fmt.Errorf("제곱근은 양수여야 합니다. float64: %g", f)
```

```go
errors.New("에러 메시지")
```

## error type

```go
type error interface {
  Error() string
}
```

- 어떤 타입이라도 문자열을 반환하는 `Error()` 메소드만 포함하면 에러로 사용할 수 있음!
