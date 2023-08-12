## memory size

### simple case

※ 예시 구조체

```go
type User struct {
  Age   int
  Score float64
}

var user User
```

- int 타입은 8byte, float64 타입도 8byte이므로, User 구조체는 16byte의 메모리 크기를 가짐
- 단, 이런 단순한 계산은 타입 크기가 모두 8의 배수일 때에만 해당한다는점! (메모메모)

### copy struct

```go
user2 := user
```

- 대입 연산자만으로 모든 필드값을 복사
- 복사되는 크기 또한 원본과 같음

### memory alignment

- 메모리 정렬: 컴퓨터가 데이터에 효과적으로 접근하기 위해 메모리를 일정 크기 간격으로 정렬하는 것
- 레지스터: 실제 연산에 사용될 데이터가 저장되는 곳
  - 레지스터 크기 = 4byte → 32bit 컴퓨터
  - 레지스터 크기 = 8byte → 64bit 컴퓨터
- 레지스터 크기가 8byte라는 것은 한 번의 연산에 8byte 크기를 연산할 수 있다는 것!
- 따라서 데이터가 레지스터 크기와 똑같은 크기로 정렬되어 있을 때 더 효율적으로 데이터를 읽어올 수 있음!

```go
type User struct {
  Age   int32
  Score float64
}

var user User
```

- 위 예시의 경우, Age는 4byte, Score는 8byte를 차지
- Age와 Score의 메모리 공간(메모리 주소 번지)을 붙여서 사용하면 성능을 손해봄
- 그렇기 때문에 Age와 Score의 메모리 공간 사이를 4byte만큼 띄워서 할당
- 이렇게 메모리 정렬을 위해 필드 사이 메모리 공간을 띄우는 것을 **Memory Padding** 이라고 함!

### field placement for memory padding

※ 문제의 struct

```go
type User struct {
  A int8  // 1byte
  B int   // 8byte
  C int8  // 1byte
  D int   // 8byte
  E int8  // 1byte
}

func main() {
  user := User{ 1, 2, 3, 4, 5 }
  fmt.Println(unsafe.Sizeof(user))  // 40
}
```

- 각 필드들의 메모리 크기를 합치면 19byte이지만, memory padding으로 인해 40byte까지 늘어났음

※ 개선된 struct

```go
type User struct {
  A int8  // 1byte
  B int8  // 1byte
  C int8  // 1byte
  D int   // 8byte
  E int   // 8byte
}

func main() {
  user := User{ 1, 2, 3, 4, 5 }
  fmt.Println(unsafe.Sizeof(user))  // 24
}
```

- 8byte보다 작은 필드들을 몰아서 배치하면 메모리 효율을 높일 수 있음
- 가장 크기가 작은 필드부터 차례대로 올려나가는 방식이 생각하기에도 편하고 좋을 듯
- 사실 메모리 용량이 충분한 데스크톱 애플리케이션은 memory padding으로 인한 메모리 낭비 문제를 크게 걱정하지 않아도 됨
  - 그러나 메모리 공간이 작은 임베디드 하드웨어라면 memory padding을 고려하는 것이 좋음
