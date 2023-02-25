## Main Package

- 프로젝트 컴파일이 필요한 경우 반드시 `main.go`가 있어야 함
- Go 파일에서는 어떤 패키지를 사용하는지 알려줘야 함
  - `main.go`의 경우 `package main`이 있어야 함
- main 패키지 안에 `func main`이 또한 존재해야 함
- 공유되는 패키지에는 main이 없을 수 있음

## Packages and Imports

※ fmt: formatting을 위한 패키지

- 함수를 export하고 싶다면 가장 앞 문자를 대문자로 써주면 됨
- VSC를 활용하면 import를 자동으로 완성해줌

## Variables and Constants

- 상수는 앞에 `const`를 붙여서 선언
- 변수는 앞에 `var`를 붙여서 선언
- 타입은 변수명 뒤에 지정할 수 있음
- 변수에 값을 할당할 때 `:=` 키워드를 활용하면 타입 추론

## Functions

※ 기본 형식

```go
func multiply(a, b int) int {
  return a * b
}
```

※ 2개의 값을 return할 수 있음

```go
func lenAndUpper(name string) (int, string) {
  return len(name), strings.ToUpper(name)
}
```

※ 2개의 값을 return 받았을 때, 1개는 무시하는 방식도 가능

```go
func main() {
  totalLength, _ := lenAndUpper("loko")
  fmt.Println(totalLength)
}
```

- `_`를 사용하면 해당 값은 무시

※ naked return

```go
func lenAndUpper(name string) (length int, uppercase string) {
  length = len(name)
  uppercase = strings.ToUpper(name)
  return
}
```

- return 값에 대한 변수들을 미리 지정해서, 해당 변수의 값들을 업데이트하고 return하는 방법

### defer

- 함수가 return을 수행한 이후에 실행하는 구문

```go
defer fmt.Println("I'm done")
```

## for, range, ...args

※ for + range

```go
func superAdd(numbers ...int) {
  for index, number := range numbers {
    fmt.Println(index, number)
  }
}
```

- 원한다면 index 부분은 `_` 처리할 수 있음

## If, Switch

※ if문 안에서 변수 선언 가능

```go
func canIDrink(age int) bool {
  if koreanAge := age + 2; koreanAge < 18 {
    return false
  }
  return true
}
```

- 변수가 if문 안에서만 사용된다는 점을 확실하게 할 수 있음

※ switch문 안에서도 변수 선언 가능

```go
func canIDrink(age int) bool {
  switch koreanAge := age + 2; koreanAge {
  case 10:
    return false
  case 18:
    return true
  }
  return false
}
```

## Pointers

- Go 언어는 low level 프로그래밍을 high level에서 할 수 있게 해줌

```go
func main() {
  a := 2
  b := &a
  *b = 20
  fmt.Println(a)  // 20
}
```

- `&`는 변수의 주소값을 나타냄
- `*`는 주소값이 담고 있는 값을 나타냄

## Arrays and Slices

※ array

```go
names := [3]string{"loko", "min", "sherdi"}
```

- 길이를 지정해줘야 함
- 초기값 항목을 반드시 채울 필요는 없음

※ slice

```go
names := []string{"loko", "min", "sherdi"}
names = append(names, "cool guy")
```

- 길이를 지정해줄 필요가 없음
- 새 항목을 추가하기 위해 `append` 함수를 실행해야 하는데, 이는 새 slice를 반환

## Maps

```go
loko := map[string]string{"name": "loko", "age": "12"}
for key, value := range loko {
  fmt.Println(key, value)
}
```

- 만약 객체 안에 더 다양한 타입의 value들을 넣고 싶다면 struct를 사용해야 함

※ key에 해당하는 value가 없는 경우 error 반환하기

```go
func (d Dictionary) Search(word string) (string, error) {
  value, exists := d[word]
  if exists {
    return value, nil
  }
  return "", errors.New("not found")
}
```

※ 특정 key 업데이트 혹은 삭제

```go
d["word"] = "definition"
delete(d, "word")
```

## Structs

```go
type person struct {
  name string
  age  int
}

func main() {
  loko := person{name: "loko", age: 23}
  fmt.Println(loko)
}
```

## 생성자

- Go에서는 생성자가 따로 없음
- 그래서 특유의 생성자를 만들어내는 패턴이 존재

```go
func NewAccount(owner string) *Account {
  account := Account{owner: owner, balance: 0}
  return &account
}
```

- 객체를 복사해서 반환하지 않기 위해 객체의 주소값을 반환

## Methods

```go
func (a *Account) Deposite(amount int) {
  a.balance += amount
}
```

- struct를 함수 이름 앞에서 지정
- `*`을 붙이지 않으면 받아온 a는 복사본일 뿐
  - 조회만 할 경우 복사본을 활용할 수도 있을 것

## Errors

```go
func (a *Account) Withdraw(amount int) error {
  if a.balance < amount {
    return errors.New("cannot withdraw")
  }
  a.balance -= amount
  return nil
}
```

- `nil`은 null과 같음
- Go는 exception을 발생시키지 않기 때문에 이 함수를 실행한 쪽에서 에러가 발생했는지 체크해야 함
