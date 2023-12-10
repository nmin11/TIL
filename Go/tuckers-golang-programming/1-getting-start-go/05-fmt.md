## fmt.Printf()

※ 서식 문자 표

|   구분    | 설명                                           |
| :-------: | :--------------------------------------------- |
|   `%v`    | 데이터 타입에 맞춰 기본 형태로 출력            |
|   `%T`    | 데이터 타입 출력                               |
|   `%t`    | boolean 출력                                   |
|   `%d`    | 10진수 정수 출력                               |
|   `%b`    | 2진수 출력                                     |
|   `%c`    | 정수를 유니코드 문자로 출력                    |
|   `%o`    | 8진수 출력                                     |
|   `%O`    | 앞에 8진수 표시 `0o`를 붙이고 8진수 출력       |
|   `%x`    | 16진수 출력, 10 이상 값은 `a-f` 소문자 표기    |
|   `%X`    | 16진수 출력, 10 이상 값은 `A-F` 대문자 표기    |
| `%e` `%E` | 실수를 지수 형태로 출력                        |
| `%f` `%F` | 실수 출력                                      |
| `%g` `%G` | 값이 크면 지수 형태로, 작으면 실수 형태로 출력 |
|   `%s`    | 문자열 출력                                    |
|   `%q`    | 특수 문자 escape 출력                          |
|   `%p`    | 메모리 주소값 출력                             |

⇒ `%d` `%f` `%s` 정도만 알면 일단 OK

### minimum print width

- 최소 출력 너비 지정: `%5d`와 같이, 사이에 숫자를 넣어서 너비 지정 가능
- 공란 채우기: `%05d`와 같이, 너비 앞에 0을 붙이면 공란을 0으로 채움
- 왼쪽 정렬: `%-5d`와 같이, 앞쪽에 `-`를 붙이면 출력을 왼쪽으로 정렬

### digits of float

- `%5.2f`: 최소 너비 5칸, 소수점 이하 2개 값 출력
- `%5.3g`: 최소 너비 5칸, 숫자 3개를 이용해서 표현하고, 표현 못하면 지수 표현으로 전환

## standard input

### Scan()

```go
func Scan(a ...interface{}) (n int, err error)
```

- 입력받을 변수들의 메모리 주소를 인수로 받음
- 한 번에 여러 값을 입력할 때는 공백을 두어서 구분
  - `enter` 키도 공란으로 인식
- 예시: `fmt.Scan(&a, &b)`

### Scanf()

```go
func Scanf(format string, a ...interface{}) (n int, err error)
```

- 서식에 맞춘 입력을 받음
- 예시: `fmt.Scanf("%d %d\n", &a, &b)`

### Scanln()

```go
func Scanln(a ...interface{}) (n int, err error)
```

- 한 줄을 입력받아서 인수로 들어온 변수 메모리 주소에 값을 채움
- `Scan()`과 다른 점은 반드시 `enter` 키로 입력을 종료해야 한다는 점

### how this work

- 사용자가 표준 입력 장치로 입력하면 입력 데이터는 컴퓨터 내부의 **standard input stream**이라는 메모리 공간에 임시 저장
- `Scan()` 함수들은 이 표준 입력 스트림에서 값을 읽고 처리
- 가장 먼저 입력한 데이터부터 읽어오기 때문에 FIFO 구조를 가짐

### bufio

```go
func NewReader(rd io.Reader) *Reader
```

- 입력 스트림으로부터 한 줄을 읽는 Reader 객체 제공
- 예시: `stdin := bufio.NewReader(os.Stdin)`
- bufio를 사용해서 에러 발생 시 입력 스트림을 지워줄 수 있음

```go
n, err := fmt.Scanln(&a, &b)
if err != nil {
  fmt.Println(err)
  stdin.ReadString('\n')
} else {
  fmt.Println(n, a, b)
}
```

## io deep dive

### how Go handle io

- Go는 io 패키지의 `Reader` `Writer` 인터페이스를 사용해서 모든 입출력을 처리

Reader

```go
type Reader interface {
  Read(p []byte) (n int, err error)
}
```

- `Read()`
  - 읽어올 데이터를 저장할 수 있는 `p []byte` 슬라이스를 생성해서 넣어주면 그 크기만큼 데이터를 읽어서 채워줌
  - 크기만큼 채우지 못하면 채울 수 있는 만큼만 채움
  - 총 읽은 byte 크기를 `n`으로 반환
  - 데이터를 읽는 중에 에러가 발생하면 `err` 반환
- Go 내부의 파일, 네트워크 등의 Reader 인터페이스를 구현한 객체들 모두 이와 같이 동작

Writer

```go
type Writer interface {
  Write(p []byte) (n int, err error)
}
```

- `Write()`
  - 쓸 데이터를 `p []byte`에 넣어주면 쓸 수 있는 만큼 써줌
  - 쓴 byte 크기를 `n`으로 반환

<br>

- `io.Reader` `io.Writer` 에는 가장 기본 메소드만 있어서 바로 사용하기에는 불편
- 내부에 메모리 버퍼를 가진 `bufio`를 사용하면 편함

**bufio.Reader**

- 객체 내부에 메모리 버퍼 포함
- io.Reader 인스턴스를 편하게 사용할 수 있도록 다양한 기능 제공

```go
type Reader
  func NewReader(rd io.Reader) *Reader
  func (b *Reader) ReadLine() (line []byte, isPrefix bool, err error)
  func (b *Reader) ReadRune() (r rune, size int, err error)
  func (b *Reader) ReadString(delim byte) (string, error)
```

- `NewReader()`: io.Reader를 넣어서 인스턴스 생성
- `ReadLine()`: 한 줄 읽기
- `ReadRune()`: 문자 하나 읽기
- `ReadString()`: 특정 구분자가 나올 때까지 문자열 읽기

**bufio.Scanner**

- io.Reader 인스턴스로부터 일정한 패턴으로 값을 읽어올 때 사용

```go
type Scanner
  func NewScanner(r io.Reader) *Scanner
  func (s *Scanner) Scan() bool
  func (s *Scanner) Err() error
  func (s *Scanner) Split(split SplitFunc)
  func (s *Scanner) Text() string
```

- 토큰 = 패턴과 일치하는 문자열
- `Scan()`: 토큰 읽기 시도
- `Text()`: 읽어온 토큰 반환

※ [Scanner 예제](https://pkg.go.dev/bufio#example-Scanner-Words)

```go
func main() {
  const input = "Now is the winter of our discontent,\n
  Made glorious summer by this sun of York.\n"
  scanner := bufio.NewScanner(strings.NewReader(input))
  scanner.Split(bufio.ScanWords)

  count := 0
  for scanner.Scan() {
    count++
  }
  if err := scanner.Err(); err != nil {
    fmt.Fprintln(os.Stderr, "reading input: ", err)
  }
  fmt.Printf("%d\n", count)
}
```

**bufio.Writer**

- io.Writer 인스턴스에 문자열을 쓸 때 유용

```go
type Writer
  func NewWriter(w io.Writer) *Writer
  func (b *Writer) WriteString(s string) (int, error)
```

- 사실 `fmt`의 Fprint 시리즈를 사용하면 더욱 편리하게 io.Writer 인스턴스에 문자열을 쓸 수 있음

**io.ReadAll()**

- io.Reader 인스턴스에서 모든 데이터를 읽어옴

```go
func ReadAll(r Reader) ([]byte, error)
```

- io.Reader 인스턴스 `r`에서 모든 데이터를 읽어서 `[]byte` 타입으로 반환

### fmt.Fprint series

- io.Writer 인스턴스에 원하는 형태의 문자열을 쓸 때 사용

```go
func Fprint(w io.Writer, a ...interface{}) (n int, err error)
func Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error)
func Fprintln(w io.Writer, a ...interface{}) (n int, err error)
```

- 기본적으로 Print 시리즈와 동작이 같음
  - 다른 점: Print 시리즈는 `os.Stdout`에 쓰지만 Fprint 시리즈는 어떤 io.Writer에 쓸지 직접 정해서 쓸 수 있음

```go
func main() {
  f, err := os.Create("output.txt")
  if err != nil {
    fmt.Errorf("Create: %v\n", err)
    return
  }
  defer f.Close()

  const name, age = "Kim", 22
  n, err := fmt.Fprint(f, name, " is ", age, " years old.\n")
  if err != nil {
    fmt.Errorf("Fprint: %v\n", err)
  }

  fmt.Print(n, " bytes written.\n")
}
```
