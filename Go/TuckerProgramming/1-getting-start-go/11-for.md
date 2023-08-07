## basic concepts

- Go에서는 반복문으로 `for`문 하나만 지원
  - while문이 없음

## infinite loop

- 조건문이 true이면 무한 루프가 됨

```go
for true {}
```

- switch문에서 조건문을 생략하면 true가 되듯, for문에서도 true 생략 가능

```go
i := 1
for {
  time.Sleep(time.Second)
  fmt.Println(i)
  i++
}
```

## break label

- label을 사용하면 중첩된 for문 안에서도 바깥쪽 for문을 break 할 수 있음

```go
func main() {
  a := 1
  b := 1

OuterFor:
  for ; a <= 9; a++ {
    for b = 1; b <= 9; b++ {
      if a*b == 45 {
        break OuterFor
      }
    }
  }
  fmt.Printf("%d * %d = %d\n", a, b, a*b)
}
```

- 편리한 방법일 수는 있으나 혼동이 생기고, 버그가 발생할 수도 있음
- 가급적이면 플래그를 사용하고, label은 꼭 필요한 경우에만 사용할 것
