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
var messages chan string = make(chan string, 2)
```

- 버퍼를 다 채우면 버퍼가 없을 때와 마찬가지로 보관함에 빈자리가 생길 때까지 대기
  - 빼가는 로직이 없으면 똑같이 deadlock

### close channel

```go
func square(wg *sync.WaitGroup, ch chan int) {
  for n := range ch {
    fmt.Printf("Square: %d\n", n*n)
    time.Sleep(time.Second)
  }
  wg.Done()
}

func main() {
  var wg sync.WaitGroup
  ch := make(chan int)

  wg.Add(1)
  go square(&wg, ch)

  for i := 0; i < 10; i++ {
    ch <- i * 2
  }
  close(ch)
  wg.Wait()
}
```

- `for n := range ch` 구문은 채널에 데이터가 들어올 때까지 무작정 기다리게 함
- 따라서 `close()` 메소드를 호출해서 채널을 닫아줘야 함

### select

- 채널에 데이터가 없을 때 다른 작업을 하거나 여러 채널을 동시에 대기할 때 사용
- 여러 채널을 기다리는 경우 하나만 실행해도 종료되기 때문에 for문과 함께 사용해야 함

```go
func square(wg *sync.WaitGroup, ch chan int, quit chan bool) {
  for {
    select {
    case n := <-ch:
      fmt.Printf("Square: %d\n", n*n)
      time.Sleep(time.Second)
    case <-quit:
      wg.Done()
      return
    }
  }
}

func main() {
  var wg sync.WaitGroup
  ch := make(chan int)
  quit := make(chan bool)

  wg.Add(1)
  go square(&wg, ch, quit)

  for i := 0; i < 10; i++ {
    ch <- i * 2
  }

  quit <- true
  wg.Wait()
}
```

### producer consumer pattern

- goroutine과 mutex를 사용하지 않기 위해서 채널을 활용해볼 수 있음

```go
type Car struct {
  Body  string
  Tire  string
  Color string
}

var wg sync.WaitGroup
var startTime = time.Now()

func main() {
  tireCh := make(chan *Car)
  paintCh := make(chan *Car)

  fmt.Printf("Start Factory\n")

  wg.Add(3)
  go MakeBody(tireCh)
  go InstallTire(tireCh, paintCh)
  go PaintCar(paintCh)

  wg.Wait()
  fmt.Println("Close the factory")
}

func MakeBody(tireCh chan *Car) {
  tick := time.Tick(time.Second)
  after := time.After(10 * time.Second)
  for {
    select {
    case <-tick:
      car := &Car{}
      car.Body = "Sports car"
      tireCh <- car
    case <-after:
      close(tireCh)
      wg.Done()
      return
    }
  }
}

func InstallTire(tireCh, paintCh chan *Car) {
  for car := range tireCh {
    time.Sleep(time.Second)
    car.Tire = "Winter tire"
    paintCh <- car
  }
  wg.Done()
  close(paintCh)
}

func PaintCar(paintCh chan *Car) {
  for car := range paintCh {
    time.Sleep(time.Second)
    car.Color = "Red"
    duration := time.Now().Sub(startTime)
    fmt.Printf("%.2f Complete Car: %s %s %s\n", duration.Seconds(), car.Body, car.Tire, car.Color)
  }
  wg.Done()
}
```

- 처음 차를 만들 때는 3초가 걸리지만, 이후로는 1초에 하나씩 만들 수 있게 됨
- Producer Consumer Pattern: 한쪽에서 데이터를 넣어주면 다른 쪽에서 데이터를 빼오는 방식

## context

- 작업 가능 시간, 작업 취소 등 작업 조건을 지시하는 작업 명세서 역할
- 새 goroutine으로 작업을 시작할 때 일정 시간 동안만 작업하게 하거나 외부에서 작업을 취소할 때 사용
- 작업 설정에 관한 데이터를 전달할 수도 있음

### cancel context

```go
var wg sync.WaitGroup

func main() {
  wg.Add(1)
  ctx, cancel := context.WithCancel(context.Background())
  go PrintEverySecond(ctx)
  time.Sleep(5*time.Second)
  cancel()
  wg.Wait()
}

func PrintEverySecond(ctx context.Context) {
  tick := time.Tick(time.Second)
  for {
    select {
    case <-ctx.Done():
      wg.Done()
      return
    case <-tick:
      fmt.Println("Tick")
    }
  }
}
```

- `context.WithCancel()`
  - context를 인수로 넣으면 해당 context를 감싸는 새로운 context 생성
  - 2번째 반환값인 취소 함수를 사용해서 context를 취소할 수 있음
- `context.Background()`: 가장 기본적인 context 생성
- `cancel()`을 실행하면 `context.Done()` 시그널이 전송된다는 것을 확인할 수 있음

### set timeout on context

- context 취소와 비슷

```go
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
```

- 2번째 인수로 넣은 시간이 지나면 `context.Done()` 시그널 전송
- `cancel()` 함수 역시 함께 받을 수 있음

### context with value

- 작업에 대한 지시사항을 추가할 때 사용

```go
var wg sync.WaitGroup

func main() {
  wg.Add(1)
  ctx := context.WithValue(context.Background(), "number", 9)
  go square(ctx)
  wg.Wait()
}

func square(ctx context.Context) {
  if v := ctx.Value("number"); v != nil {
    n := v.(int)
    fmt.Printf("Square: %d", n*n)
  }
  wg.Done()
}
```

※ 취소도 되고 값도 설정할 수 있는 context

```go
ctx, cancel := context.WithCancel(context.Background())
ctx = context.WithValue(ctx, "keyword", "Lilly")
```

- 구글에 "golang concurrency patterns"를 검색해서 더 많은 활용법들을 찾아보자!
