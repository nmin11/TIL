## basic concepts

### doulbe quote or back quote

큰따옴표 문자열

- `\t` `\n` 등의 특수 문자 기능이 사용됨
  - 특수문자를 그대로 쓰고 싶다면 `\\t`와 같이 역슬래시를 한 번 더 써줄 것

백쿼트 문자열

- 특수 문자를 일반 문자처럼 취급
- 여러 줄 표현에 특수 문자가 필요 없이 그냥 문자열을 여러 줄로 적으면 됨

### UTF-8

- Go의 표준 문자코드
- Go 언어 창시자 롭 파이크와 켄 톰슨이 고안한 문자코드
- 자주 사용되는 영문자, 숫자, 일부 특수 문자를 1byte로 표현, 그외 다른 문자들은 2~3byte로 표현
  - 모든 문자를 2byte에 고정해서 사용하는 UTF-16에 비해 크기 절약
  - ANSI 코드와 1:1 대응
- 한글, 한자 사용 가능

### rune

- 문자 하나를 표현하는 타입
- UTF-8 문자값은 3byte이지만, Go 언어 기본 타입에서 3byte 정수 타입이 없음
- 그래서 4byte 정수 타입인 int32 타입의 별칭으로 사용
  - rune과 int32는 이름만 다를 뿐 같은 타입

```go
var ch rune = '한'
fmt.Println("%T\n", ch) // int32
fmt.Println(ch)         // 54620
fmt.Println("%c\n", ch) // 한
```

### len()

- 문자 수가 아닌, 문자열이 차지하는 메모리 크기를 알아내는 함수

### []rune

- 문자 수를 알려면 string을 []rune 타입으로 변환해야 함
- string과 []rune 타입은 상호 타입 변환 가능

```go
str := "Hello 월드"
runes := []rune(str)
fmt.Println(len(runes)) // 8
```

- string은 연속된 byte 메모리이지만, []rune은 글자들의 배열이라서 서로 완전 다름
  - 그럼에도 Go에서는 편의를 위해 상호 타입 변환을 지원하는 것

### string to []byte

- []byte는 1byte의 부호 없는 정수 타입의 가변 길이 배열
- 문자열도 결국 메모리에 있는 데이터이고, 메모리는 1byte 단위로 저장되기 때문에 1byte 씩 저장되는 배열로 변환 가능
- 파일로 작성이나 네트워크 전송 시에는 []byte 타입을 인수로 받는 `io.Writer` 인터페이스를 사용해야 함
- 문자열을 쉽게 처리하고자 string에서 []byte 타입으로의 변환을 지원해주는 것

## iteration

문자열을 순회하는 3가지 방법

1. index를 사용한 byte 단위 순회
2. []rune 타입 변환 후 한 글자씩 순회
3. range 키워드를 이용해서 한 글자씩 순회

### iterate over byte with index

```go
str := "Hello 월드!"
for i := 0; i < len(str); i++ {
  fmt.Printf("타입: %T byte값: %d 문자값: %c\n", str[i], str[i], str[i])
}
```

- 타입은 unit8로 출력
  - byte 타입이 곧 uint8
  - rune 타입은 곧 int32 → 다시 한 번 메모메모
- 한글의 경우 3byte를 차지하기 때문에 문자값 부분이 깨져서 출력됨

### iterate over character with []rune

```go
str := "Hello 월드!"
arr := []rune(str)
for i := 0; i < len(arr); i++ {
  fmt.Printf("타입: %T byte값: %d 문자값: %c\n", arr[i], arr[i], arr[i])
}
```

- 타입은 int32로 출력
- 이렇게 하면 모든 문자를 제대로 출력할 수 있음
- 하지만 별도의 배열을 할당해야 돼서 공간 낭비가 발생

### iterate over character with range keyword

```go
str := "Hello 월드!"
for _, v := range str {
  fmt.Printf("타입: %T byte값: %d 문자값: %c\n", v, v, v)
}
```

- 결과값은 []rune 타입 변환 후 순회하는 방식과 동일
- []rune 타입 방식과는 다르게 추가 메모리 할당이 필요 없음
- ⭐ 문자열 안의 문자를 순회할 일 있으면 range 키워드를 기억하자!

## structure

- 사실 string 자료구조까지 알 필요는 없지만 내부 구조를 이해하면 프로그래밍에 도움이 됨
- string 타입은 Go에서 제공하는 내장 타입으로, 그 내부 구현이 감춰져 있음
- 하지만 reflect 패키지 안의 StringHeader 구조체를 통해서 내부 구현을 엿볼 수 있음

```go
type StringHeader struct {
  Data uintptr
  Len  int
}
```

- Data는 문자열의 데이터가 있는 메모리 주소를 나타내는 일종의 포인터
- Len은 문자열의 길이
- string 구조체는 이 두 타입의 크기를 합해서 16byte의 크기를 가짐

```go
str2 := str1
```

- 문자열을 복사해서 대입하면 문자열의 주소값을 복사 (물론 Len 값도 같이 복사)
- 실제 문자열 값을 직접 복사하지 않음!
- 그러니 복사할 때 문자열이 길다고 해서 성능 걱정 ㄴㄴ

## immutable

- string 타입의 문자열 중 일부만 변경할 수 없음
- []byte 타입으로 변환 후 바꾸면 가능은 함

```go
str := "Hello World"
slice := []byte(str)
slice[2] = 'a'

fmt.Println(str)          // Hello World
fmt.Printf("%s\n", slice) // Healo World
```

- string 변수로 []byte 타입의 변수를 만들면 이 둘은 이미 서로 다른 주소를 가지고 있음
- 그래서 string 변수는 불변을 지키고, []byte 타입의 변수값이 바뀌는 것

### string + string

- 문자열끼리 더하면 새로운 메모리 공간을 만들어서 두 문자열을 합침
- 합친 이후에는 당연히 새로운 메모리 주소를 가지고, 이전 메모리 공간이 사용되지 않으면 버림
- 극심한 메모리 손실!
- strings 패키지의 Builder를 사용하면 이러한 메모리 낭비를 줄일 수 있음

### why is string immutable?

- string은 복사할 때 문자열 전체가 아닌 Data, Len 값을 복사하기 때문
- 만약 str1, str2, str3가 모두 같은 문자열을 가리킬 때, 이들 중 하나만 일부 변경하면 셋 다 변경되는 셈
