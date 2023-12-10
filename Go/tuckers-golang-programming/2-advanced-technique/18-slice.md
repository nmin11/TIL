## basic concept

```go
var slice []int
```

- 슬라이스는 초기화하지 않으면 길이가 0인 슬라이스로 만들어짐
  - 길이를 초과해서 접근하면 런 타임 에러 발생

### initialize with `{}`

```go
var slice1 = []int{1, 2, 3}
var slice2 = []int{1, 5:2, 10:3}
```

※ 아래 두 구문이 서로 다른 타입을 만든다는 점에 유의

```go
var array = [...]int{1, 2, 3}
var slice = []int{1, 2, 3}
```

### initialize with `make()`

```go
var slice = make([]int, 3)
```

- 각 요소의 값들은 타입의 기본값으로 들어감

### `append()`

```go
var slice = []int{1, 2, 3}
slice2 := append(slice, 4)
```

- 여러 값 추가도 가능

```go
slice = append(slice, 3, 4, 5, 6, 7)
```

- `append()`는 첫 번째 인수로 들어온 슬라이스를 변경하는 게 아니라 요소가 추가된 새로운 슬라이스 반환

## mechanism

- reflect 패키지 안의 SliceHeader 구조체를 통해서 내부 구현을 엿볼 수 있음

```go
type SliceHeader struct {
  Data uintptr  // 배열을 가리키는 포인터
  Len  int      // 요소 개수
  Cap  int      // 전체 배열 길이
}
```

- 쉽게 포인터가 다른 배열을 가리키도록 변경할 수 있음
- 배열에 비해 메모리나 속도에 이점이 있음
- 슬라이스에 대한 포인터가 아닌, 원본 배열에 대한 포인터라는 점에 유의!

※ 예시

```go
var slice = make([]int, 3)
```

- len: 3, cap: 3 슬라이스 생성

```go
var slice = make([]int, 3, 5)
```

- len: 3, cap: 5 슬라이스 생성
- 요소 5개 중 3개만 사용 중이고, 나머지 2개는 나중을 위해 남겨둠

### array vs slice

```go
func changeArray(array2 [5]int) {
  array2[2] = 200
}

func changeSlice(slice2 [5]int) {
  slice2[2] = 200
}

func main() {
  array := [5]int{1, 2, 3, 4, 5}
  slice := []int{1, 2, 3, 4, 5}
  changeArray(array)
  changeSlice(slice)

  fmt.Println(array)  // [1 2 3 4 5]
  fmt.Println(slice)  // [1 2 200 4 5]
}
```

- Go에서 모든 값의 대입은 복사
- 함수에 인수를 전달할 때도 값이 복사됨
- 포인터는 포인터 값인 메모리 주소 복사, 구조체는 모든 필드 복사, 배열은 모든 값 복사
- `changeArray` 함수는 복사된 배열의 값을 바꿨기 때문에 원본 배열에 영향을 미치지 않은 것
- `changeSlice` 함수는 슬라이스를 복사할 때 포인터를 함께 복사하기 때문에 원본 배열을 변경할 수 있는 것

### problem with `append()`

- 슬라이스를 복사하면 같은 포인터를 가지는 슬라이스가 생기기 때문에, 원본과 복사본에 변경사항이 똑같이 적용됨
- 하지만 `append()` 실행시 빈 공간이 충분하지 못하면 새로운 배열을 기존의 2배 크기로 만들고, 새롭게 복사된 배열 주소를 가리키게 됨

```go
slice1 := []int{1, 2, 3}
slice2 := append(slice1, 4, 5)
```

- 따라서 위의 slice2는 새로운 메모리 주소를 가지는 배열을 가리키므로, 어떤 슬라이스를 변경해도 서로 영향을 주지 않음
- 슬라이스를 복사할 때는 더 큰 공간을 가진 새로운 배열로 복사했는지를 잘 살펴볼 것!

※ 개선 방안 1

```go
slice2 := append([]int{}, slice1...)
```

- 새로운 주소를 생성하고 거기에 값을 하나씩 넣어줌

※ 개선 방안 2

```go
slice2 := make([]int, len(slice1))
copy(slice2, slice1)
```

- 내장 함수 `copy()` 활용

## slicing

```go
array[startIdx:endIdx:maxIdx]
```

- 배열의 일부를 집어내는 기능
- 새로운 배열을 만드는 게 아니라 배열의 일부를 포인터로 가리키는 슬라이스를 만들어냄
- 따라서 슬라이싱한 슬라이스를 변경하면 원본 배열이 변경됨
- array 뿐만 아니라 slice를 대상으로도 슬라이싱 가능
- 시작 index ~ 끝 index-1 만큼 슬라이싱
- 모든 값은 생략 가능

※ 처음부터 슬라이싱

```go
slice := array[:3]
```

※ 끝까지 슬라이싱

```go
slice := array[2:]
```

※ 전체 슬라이싱

```go
slice := array[:]
```

- 슬라이싱된 슬라이스의 cap은 배열 전체 길이에서 시작 index를 뺀 값이 기본
- 최대 index를 주면 cap까지 조절 가능

```go
slice := array[1:3:4]
```

### delete an element

```go
slice = append(slice[:idx], slice[idx+1:]...)
```

- 삭제하고자 하는 idx의 하나 이전까지 복사하고, idx 하나 다음부터 복사해서 서로 append해서 붙여줌

### add an element

```go
slice = append(slice, 0)
copy(slice[idx+1:], slice[idx:])
slice[idx] = value
```

- 배열의 크기를 하나 더 추가
- 변경할 index에서 한 칸 밀린 슬라이싱에 다시 기존 슬라이싱 적용
  - 원하는 index에서 요소들을 한 칸 씩 밀어낸 효과
- 밀려난 index에 원하는 값 대입

### pop

```go
el, slice := slice[len(slice)-1], slice[:len(slice)-1]
```

- 마지막 요소를 el 변수에 담음
- 슬라이스의 맨 마지막을 잘라내는 슬라이싱을 한 다음에 원래의 slice 변수에 다시 대입

## sort

```go
s := []int{5, 2, 6, 3, 1, 4}
sort.Ints(s)
fmt.Println(s)  // [1 2 3 4 5 6]
```

- `Float64s` 함수를 사용하면 float64 슬라이스 정렬 가능

### sort a struct slice

```go
type Student struct {
  Name string
  Age  int
}

type Students []Student

func (s Students) Len() int { return len(s) }
func (s Students) Less(i, j int) bool { return s[i].Age < s[j].Age }
func (s Students) Swap(i, j int) { s[i], s[j] = s[j], s[i] }

func main() {
  s := []Student{
    {"화랑", 31},
    {"백두산", 52},
    {"류", 42},
    {"켄", 38},
    {"송하나", 18},
  }
  sort.Sort(Students(s))
  fmt.Println(s)  // [{송하나 18} {화랑 31} {켄 38} {류 42} {백두산 52}]
}
```

- `Sort()` 함수 사용을 위해 `Len()` `Less()` `Swap()` 함수들에 대한 정의 필요
- `sort.Sort(sort.Reverse(Students(s)))`로 사용하면 역순으로 정렬할 수도 있음
