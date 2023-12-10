## thread

- goroutine은 경량 스레드를 통해 함수나 명령을 동시 실행할 때 사용
- `main()` 함수 역시 goroutine에 의해 실행됨
- goroutine을 알기 전에 thread를 이해해야 함
- 프로세스
  - 메모리 공간에 로딩되어 동작하는 프로그램
  - 한 개 이상의 스레드를 포험
- 스레드
  - 프로세스 안의 작업 단위
  - 실행 흐름이라고 볼 수 있음
  - CPU 코어 하나는 한 번에 하나의 명령어 다발(스레드) 실행
- 싱글코어 CPU라도 context switching을 이용하면 마치 동시에 수행되는 것처럼 할 수 있음

### context switching

- 스레드를 전환하려면 현재 상태를 보관해서 다시 돌아왔을 때 이어서 실행할 수 있게 해야 함
- 이를 위해 instruction pointer, 스택 메모리 등의 정보를 thread context에 저장
- 스레드 전환마다 스레드 컨텍스트를 저장 및 복원하기 때문에 너무 많은 스레드를 수행하면 성능이 저하됨
  - 보통 (코어 X 2) 이상의 스레드를 만들면 스위칭 비용이 많이 발생한다고 말함
- **하지만 Go에서는 CPU 코어마다 OS 스레드를 하나만 할당하기 때문에 컨텍스트 스위칭이 없음!**

## how to use goroutine

※ 모든 프로그램은 main이라는 goroutine 하나를 반드시 가지고 있음

```go
go invokeFunction()
```

※ 예제

```go
func PrintHangul() {
  hanguls := []rune{ '가', '나', '다', '라', '마', '바', '사' }
  for _, v := range hanguls {
    time.Sleep(300 * time.Millisecond)
    fmt.Printf("%c ", v)
  }
}

func PrintNumbers() {
  for i := 1; i <= 5; i++ {
    time.Sleep(400 * time.Millisecond)
    fmt.Printf("%d ", i)
  }
}

func main() {
  go PrintHangul()
  go PrintNumbers()
  time.Sleep(3 * time.Second)
}
```

- main 함수가 종료되면 다른 goroutine들을 무시한 채 즉시 프로그램이 종료됨

### WaitGroup

- sync 패키지의 `WaitGroup` 객체를 사용하면 goroutine의 종료 시점을 알 수 있음

```go
var wg sync.WaitGroup
wg.Add(3) // 작업 개수 설정
wg.Done() // 작업이 완료 후 호출하면 작업 개수를 하나씩 줄여줌
wg.Wait() // 모든 작업 완료까지 대기
```

※ 예제

```go
var wg sync.WaitGroup

func SumAtoB(a, b int) {
  sum := 0
  for i := a; i <= b; i++ {
    sum += i
  }
  fmt.Printf("%d부터 %d까지 합계는 %d입니다\n", a, b, sum)
  wg.Done()
}

func main() {
  wg.Add(10)
  for i := 0; i < 10; i++ {
    go SumAtoB(1, 100)
  }
  wg.Wait()
  fmt.Println("모든 계산이 완료됐습니다")
}
```

## how goroutine work

- goroutine
  - 명령을 수행하는 단일 흐름
  - 운영체제가 제공하는 OS 스레드를 이용하는 lightweight thread
- Go는 CPU 코어, OS 스레드, goroutine을 서로 조율해서 goroutine이 효율적으로 동작하도록 해줌
- 컨텍스트 스위칭은 CPU가 스레드를 변경할 때 발생
  - goroutine을 사용하면 CPU와 스레드를 그대로 두고 goroutine만 옮겨 다님
  - 그래서 OS 스레드를 직접 사용함에도 컨텍스트 스위칭 비용이 발생하지 않음

※ 예시

1. CPU 코어가 2개이고, goroutine을 3개 실행했을 때

⇒ 3번째 goroutine은 2번째 goroutine이 끝났을 때 2번째를 제거하고 3번째로 교체 후 실행

2. 네트워크 호출 등의 system call

⇒ 네트워크 수신 대기 상태의 goroutine을 대기 상태로 보내고 다른 goroutine 먼저 실행

## mutex

- 동시성 프로그래밍은 동일한 메모리 자원에 여러 goroutine이 접근할 때 동시에 값을 변경하면서 문제가 발생할 수 있음
- mutex
  - 동시성 프로그래밍 문제에 대한 가장 단순한 해결 방법
  - mutual exclusion의 약자 (상호 배제)
  - 한 goroutine이 작업할 때 다른 goroutine이 작업하지 못하도록 자원 접근 권한 통제

```go
var mutex sync.Mutex

type Account struct {
  Balance int
}

func DepositAndWithdraw(account *Account) {
  mutex.Lock()
  defer mutex.Unlock()
  if account.Balance < 0 {
    panic(fmt.Sprintf("Balance should not be negative value: %d", account.Balance))
  }
  account.Balance += 1000
  time.Sleep(time.Millisecond)
  account.Balance -= 1000
}

func main() {
  var wg sync.WaitGroup

  account := &Account{0}
  wg.Add(10)
  for i := 0; i < 10; i++ {
    go func() {
      for {
        DepositAndWithdraw(account)
      }
      wg.Done()
    }()
  }
  wg.Wait()
}
```

- `Lock()`
  - mutex 획득
  - 이미 다른 goroutine이 mutex를 가지고 있다면 반납될 때까지 대기
- `Unlock()`
  - mutex 반납
  - 다른 goroutine이 대기 중이었으면 mutex를 가져감

⇒ 가져간 mutex는 반드시 `Unlock()`을 호출해서 반납하자!

## mutex & deadlock

mutex의 문제점들

1. 사실상 동시성 프로그래밍이 아니게 되어버림
2. 프로그램을 완전히 멈추게 만드는 데드락 발생 위험

deadlock

- 어떤 goroutine도 원하는 만큼의 mutex를 확보하지 못했을 때 발생하는 무한 대기 현상

※ 예시

```go
var wg sync.WaitGroup

func main() {
  rand.Seed(time.Now().UnixNano())

  wg.Add(2)
  fork := &sync.Mutex{}
  spoon := &sync.Mutex{}

  go diningProblem("A", fork, spoon, "포크", "수저")
  go diningProblem("B", spoon, fork, "수저", "포크")
  wg.Wait()
}

func diningProblem(name string, first, second *sync.Mutex, firstName, secondName string) {
  for i := 0; i < 100; i++ {
    fmt.Printf("%s 밥 먹자\n", name)
    first.Lock()
    fmt.Printf("%s %s 획득\n", name, firstName)
    second.Lock()
    fmt.Printf("%s %s 획득\n", name, secondName)

    fmt.Printf("%s 밥 먹음\n", name)
    time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)

    second.Unlock()
    first.Unlock()
  }
  wg.Done()
}
```

⇒ mutex는 사용할 때 deadlock에 걸리는지 여부를 철저히 확인한다면 여전히 손쉽고 유용한 동시성 프로그래밍 방식

## resource management

- 애초에 여러 goroutine이 같은 자원에 접근할 일을 만들지 말자!!!
- 영역을 나누거나 역할을 나누어서 서로 침범할 일이 없도록 하자
