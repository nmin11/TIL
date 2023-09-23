## channel

- channel: goroutine끼리 메시지를 전달할 수 있는 메시지 큐

### channel instance

```go
var messages chan string = make(chan string)
```

- slice, map 등과 똑같이 `make()` 함수로 만들 수 있음
- 채널 타입은 `chan` 키워드와 메시지 타입을 합쳐서 표현
  - `chan string`은 string 타입 메시지를 전달하는 채널 타입

### push data into a channel

```go
messages <- "This is a message"
```

- `<-` 키워드를 사용해서 우변 데이터를 좌변 채널에 삽입

### pop from channel

```go
var msg string <- messages
```

- `<-` 키워드를 사용해서 우변의 채널에서 데이터를 가져와서 변수에 삽입
- 만약 채널 인스턴스에 데이터가 없으면 데이터가 생길 때까지 대기

※ 예제

```go
func main() {
  var wg sync.WaitGroup
  ch := make(chan int)

  wg.Add(1)
  go square(&wg, ch)
  ch <- 9
  wg.Wait()
}

func square(wg *sync.WaitGroup, ch chan int) {
  n := <-ch

  time.Sleep(time.Second)
  fmt.Printf("Square: %d\n", n*n)
  wg.Done()
}
```

### channel size

- 채널 생성시 크기가 0인 채널이 만들어짐
  - = unbuffered channel
- 따라서 메시지를 보관할 곳이 없고, 메시지를 가져갈 때까지 기다려야 함
- 코드상에서 채널에 데이터를 넣었는데 빼가는 로직이 없으면 goroutine이 영원히 대기하게 됨
  - Go 프로그램에서 deadlock 문제를 감지하고 강제 종료

### channel with buffer

- 내부에 데이터를 보관할 수 있는 메모리 영역 buffer와 함께 채널 만들기

```go
var ch string messages = make(chan string, 2)
```

- 버퍼를 다 채우면 버퍼가 없을 때와 마찬가지로 보관함에 빈자리가 생길 때까지 대기
  - 빼가는 로직이 없으면 똑같이 deadlock
