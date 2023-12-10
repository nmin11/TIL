## list

- 기본적인 자료구조로서 여러 데이터 보관 가능
- 배열: 연속된 메모리에 데이터를 저장
- 리스트: 불연속된 메모리에 데이터를 저장

### linked with pointer

- 리스트: 데이터를 담은 각 요소들을 포인터로 연결한 자료구조
- linked list 라고 부르기도 함

```go
type Element struct {
  Value interface{}
  Next  *Element
  Prev  *Element
}
```

### basic usage

```go
import (
  "container/list"
  "fmt"
)

func main() {
  v := list.New()
  e4 := v.PushBack(4)   // 리스트 맨 뒤에 요소 추가
  e1 := v.PushFront(1)  // 리스트 맨 앞에 요소 추가
  v.InsertBefore(3, e4) // e4 요소 앞에 요소 삽입
  v.InsertAfter(2, e1)  // e1 요소 뒤에 요소 삽입

  for e := v.Front(); e != nil; e = e.Next() {  // 모든 요소 순회
    fmt.Print(e.Value, " ")
  }
  fmt.Println()
  for e := v.Back(); e != nil; e.Prev() {       // 모든 요소 역순 순회
    fmt.Print(e.Value, " ")
  }
}
```

### array vs list

맨 앞에 데이터 추가

- 배열: 모든 요소를 한 칸씩 밀어내므로 O(N)
- 리스트: 요소를 추가하고 맨 앞에서 연결만 해주기 때문에 O(1)

요소 삭제

- 배열: 모든 요소의 인덱스를 조정해야 하므로 O(N)
- 리스트: 삭제한 곳의 앞뒤 링크만 바꾸면 되므로 O(1)

인덱스 요소 접근

- 배열: `배열 시작 주소 + (인덱스 X 타입 크기)`는 상수 시간이므로 O(1)
- 리스트: N-1번 링크를 타고 원하는 인덱스까지 가야하니까 O(N)

⇒ 인덱스를 활용한 접근이 많으면 배열, 삽입 및 삭제가 빈번하다면 리스트를 쓰자!

### queue with list

```go
import "container/list"

type Queue struct {
  v *list.List
}

func NewQueue() *Queue {
  return &Queue{ list.New() }
}

func (q *Queue) Push(val interface{}) {
  q.v.PushBack(val)
}

func (q *Queue) Pop() interface{} {
  front := q.v.Front()
  if front != nil {
    return q.v.Remove(front)
  }
  return nil
}
```

### stack with list

```go
import "container/list"

type Stack struct {
  v *list.List
}

func NewStack() *Stack {
  return &Stack{ list.New() }
}

func (s *Stack) Push(val interface{}) {
  s.v.PushBack(val)
}

func (s *Stack) Pop() interface{} {
  back := s.v.Back()
  if back != nil {
    return s.v.Remove(back)
  }
  return nil
}
```

⇒ 사실 스택은 요소 추가 및 삭제가 항상 맨 뒤에서 발생하기 때문에 배열로 만들어도 성능에 손해가 없음!

## ring

- 맨 앞과 맨 뒤의 요소가 서로 연결된 자료구조
- 리스트를 기반으로 만들어졌음
- 원형으로 연결되어 있기 때문에 환형 리스트라고도 불림
- 시작도 없고 끝도 없고 다만 현재 위치가 있을 뿐

### baisc usage

```go
import (
  "container/ring"
  "fmt"
)

func main() {
  r := ring.New(5)
  n := r.Len()

  for i := 0; i < n; i++ {
    r.Value = 'A' + i
    r = r.Next()
  }

  for j := 0; j < n; j++ {
    fmt.Printf("%c ", r.Value)
    r = r.Next()
  }
  fmt.Println()
  for j := 0; j < n; j++ {
    fmt.Printf("%c ", r.Value)
    r = r.Prev()
  }
}
```

### when to use a ring

- 저장할 개수가 고정되고 오래된 요소는 지워도 되는 경우에 적합
- 실행 취소 기능: 문서 편집기 등에서 일정 개수의 명령을 저장하고 실행 취소하는 경우
- 고정 크기 버퍼 기능
- 리플레이 기능: 고정된 길이의 리플레이 기능을 제공할 때

## map

- 키와 값 형태로 데이터를 저장하는 자료구조
- 키를 사용해서 값을 저장하거나 변경할 수 있음
- 언어에 따라 dictionary, hash table, hash map 등으로 불림
  - Go에서는 map
- list나 ring과는 달리 container 패키지가 아닌 Go 기본 내장 타입
  - 그만큼 자주 사용됨

```go
type Product struct {
  Name  string
  Price int
}

func main() {
  m := make(map[int]Product)

  m[16] = Product{ "볼펜", 500 }
  m[46] = Product{ "지우개", 200 }
  m[78] = Product{ "자", 1000 }
  m[345] = Product{ "샤프", 3000 }
  m[897] = Product{ "샤프심", 500 }

  for k, v := range m {
    fmt.Println(k, v)
  }
}
```

- map에 대한 순회는 정렬되지 않음

### delete an element

```go
delete(m, key)
```

- 맵 변수와 삭제할 키 값을 인수로 받음
- 삭제된 요소를 다시 조회하면 해당 요소 타입의 기본값 출력
- 없는 값과 기본값을 구분하기 위해 요소 존재 여부를 확인해볼 필요가 있음

```go
v, ok := m[3]
```

### array vs list vs slice

- array: 요소가 많을수록 추가 및 삭제 작업이 오래 걸림
- list: 요소가 많을수록 읽기 작업이 오래 걸림
- map: 요소 개수와 상관없이 일정하게 빠른 속도

| 구분 | array, slice | list | map  |
| :--: | :----------: | :--: | :--: |
| 추가 |     O(N)     | O(1) | O(1) |
| 삭제 |     O(N)     | O(1) | O(1) |
| 읽기 |     O(1)     | O(N) | O(1) |

## how map works

### hash function

1. 같은 입력 = 같은 결과
2. 다른 입력 = 되도록 다른 결과
3. 입력값의 범위 = 무한대, 결과 = 특정 범위를 가짐

### simple example

```go
const M = 10
func hash(d int) int {
  return d % M
}

func main() {
  m := [M]int{}

  m[hash(23)] = 10
  m[hash(259)] = 50
}
```

- 실제로는 매우 복잡하고 다양한 해시 함수들이 사용되고 있음
- 요소와 상관 없이 고정된 시간을 갖는 함수이기 때문에 O(1) 시간복잡도를 가짐
