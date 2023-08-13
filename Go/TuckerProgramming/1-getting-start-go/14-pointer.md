## concept

- 포인터는 메모리 주소를 값으로 갖는 타입

### declare & assign

- 데이터 타입 앞에 `*`을 붙여서 선언

```go
var p *int
```

- 메모리 공간에 접근해서 값을 변경할 수 있음

```go
var a int = 500
var p *int
p = &a
*p = 100
```

- 포인터 변수의 기본값은 `nil`

## why use pointer

- 변수 대입 및 함수 인자 전달은 항상 복사하면서 메모리 공간을 많이 차지함

※ 포인터를 사용하지 않는 예시

```go
type Data struct {
  value int
  data  [200]int
}

func ChangeData(arg Data) {
  arg.value = 999
  arg.data[100] = 999
}

func main() {
  var data Data
  ChangeData(data)
  fmt.Println(data.value)     // 0
  fmt.Println(data.data[100]) // 0
}
```

- 메모리 공간을 복사한 후 복사한 변수에 값을 넣었기 때문에 원본 데이터는 변경되지 않음
- 게다가 위 예시에서는 ChangeData를 할 때마다 총 1608byte를 복사해야 함

※ 포인터를 사용하는 예시

```go
type Data struct {
  value int
  data  [200]int
}

func ChangeData(arg *Data) {
  arg.value = 999
  arg.data[100] = 999
}

func main() {
  var data Data
  ChangeData(&data)
  fmt.Println(data.value)     // 999
  fmt.Println(data.data[100]) // 999
}
```

- 포인터가 참조하는 값을 직접 바꿨기 때문에 함수 실행 후에 변경된 데이터 출력
- 메모리 주소는 8byte이기 때문에 8byte만 복사
  - 메모리 주소의 크기는 64bit 컴퓨터에서는 8byte, 32bit 컴퓨터에서는 4byte

### assign without declare

- 구조체 변수를 선언하지 않고도 곧바로 포인터 변수에 구조체 초기값을 담아줄 수 있음

※ 기존 방식

```go
var data Data
var p *Data = &data
```

※ 바로 초기화하는 방식

```go
var p *Data = &Data{}
```

※ 데이터를 넣지 않고 기본 구조체 생성

```go
var p = new(Data)
```

## instance

- 인스턴스: 메모리에 할당된 데이터의 실체
- 포인터를 이용해서 인스턴스에 접근 가능
- 더이상 사용되지 않는 인스턴스는 GC가 알아서 지워줌
- 포인터 변수가 아무리 많아도 인스턴스가 추가로 생성되는 것은 아님

```go
var p1 *Data = &Data{}
var p2 *Data = p1
var p3 *Data = p1
```

- 인스턴스를 복사하면 여러 인스턴스를 만들 수 있음

```go
var data1 Data
var data2 Data = data1
var data3 Data = data1
```

## stack memory & heap memory

- 대부분의 프로그래밍 언어는 메모리를 할당할 때 스택 메모리 영역이나 힙 메모리 영역을 사용
- 이론상 스택 메모리 영역이 힙 메모리 영역에 비해 훨씬 효율적
- **하지만 스택 메모리는 함수 내부에서만 사용 가능한 영역**
- 그래서 함수 외부로 공개되는 메모리 공간은 힙 메모리 영역에서 할당
- C/C++는 `malloc()` 함수를 직접 호출해서 힙 메모리 공간 할당
- Java는 클래스 타입은 힙에, 기본 타입은 스택에 할당
- Go는 **escape analysis**를 통해 어느 메모리에 할당할지 결정

```go
type User struct {
  Name string
  Age  int
}

func NewUser(name string, age int) *User {
  var u = User{name, age}
  return &u
}

func main() {
  userPointer := NewUser("AAA", 23)
  fmt.Println(userPointer)  // &{AAA 23}
}
```

- 위 예시에서 `u` 변수는 NewUser 함수 내부에서 선언되었으므로, 메모리가 사라져서 dangling 오류가 발생해야 했음
- 하지만 Go는 escape analysis를 통해 `u` 변수가 함수 외부로 공개되는 것을 분석해서, `u`를 스택 메모리가 아닌 힙 메모리에 할당

<br>

- 또한 Go에서 스택 메모리는 크기가 계속 증가하는 동적 메모리 풀
- 일정 크기를 갖는 C/C++에 비해 메모리 효율성이 높고, 재귀 호출로 인한 스택 메모리 고갈 문제도 발생하지 않음
