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
