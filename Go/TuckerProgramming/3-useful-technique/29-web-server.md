## http web server

- Go에서는 `net/http` 패키지를 활용해서 손쉽게 웹 서버를 만들 수 있음
- 몇 줄 안 되는 코드로도 강력한 웹 서버 구축 가능
- Go에서 웹 서버를 만들기 위한 2단계
  - 핸들러 등록
  - 웹 서버 시작

### handler

- HTTP 요청 URL 경로에 대응할 수 있는 핸들러 등록 과정
- 핸들러: HTTP 요청 URL이 수신됐을 때 처리하는 함수 또는 객체
- `http.HandleFunc()`: URL 경로와 해당 경로를 처리할 핸들러 함수 지정
- 핸들러 함수: `http.Handler` 인터페이스 객체를 구현한 객체이어야 함
- HTTP 요청 수신 시 핸들러 함수를 호출하거나 `http.Handler` 객체의 `ServeHTTP()` 메소드를 호출할 수 있음

```go
func IndexHandler(w http.ResponseWriter, r *http.Request) {}
http.HandleFunc("/", IndexHandler)
```

### web server

```go
func ListenAndServe(addr string, handler Handler) error
```

- 웹 서버를 시작하는 함수
- `addr`: HTTP 요청을 수신하는 주소, 일반적으로 포트 번호를 적어줌
- `handler`: 핸들러 인스턴스, nil이면 디폴트 핸들러 실행

```go
func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello World")
  })
  http.ListenAndServe(":3000", nil)
}
```

## querystring

```go
func barHandler(w http.ResponseWriter, r *http.Request) {
  values := r.URL.Query()
  name := values.Get("name")
  id, _ := strconv.Atoi(values.Get("id"))
  fmt.Fprintf(w, "Hello %s! id: %d", name, id)
}

func main() {
  http.HandleFunc("/bar", barHandler)
  http.ListenAndServe(":3000", nil)
}
```

- `URL.Query()`의 결과값은 `map[string][]string` 타입
- `Get()` 메소드를 활용해서 결과값으로부터 원하는 쿼리 인수값을 가져올 수 있음

## ServeMux

- `ListenAndServe()`의 2번째 인수에 nil을 넣는 것은 DefaultServeMux 를 사용하는 것
  - 이렇게 하면 다양한 기능을 추가하기에는 어려움

```go
func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello World")
  })
  mux.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello Bar")
  })

  http.ListenAndServe(":3000", mux)
}
```

- 이렇게 디폴트가 아닌 직접 지정한 mux를 사용하면 다양한 기능을 추가하기가 쉬워짐

※ Mux

> multiplexer 의 약자
> 여러 입력 중 하나를 선택해서 반환하는 디지털 장치를 뜻함
> 웹 서버는 URL에 핸들러들을 등록하고 요청을 수신받았을 때 핸들러를 선택해서 실행하는 방식
> 핸들러를 선택하고 실행하는 구조체 이름은 Mux 를 제공한다고 해서 ServeMux 라고 불림
> 비슷한 의미로 router 라고 불리기도 함

## test web server

```go
func TestIndexHandler(t *testing.T) {
  assert := assert.New(t)
  res := httptest.NewRecorder()
  req := httptest.NewRequest("GET", "/", nil)
  mux := MakeWebHandler()
  mux.ServeHTTP(res, req)

  assert.Equal(http.StatusOK, res.Code)
  data, _ := io.ReadAll(res.Body)
  assert.Equal("Hello World", string(data))
}
```

## send a JSON

```go
type User struct {
  Name  string
  Age   int
  Score int
}

func MakeWebHandler() http.Handler {
  mux := http.NewServeMux()
  mux.HandleFunc("/user", UserHandler)
  return mux
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
  var user = User{"aaa", 16, 87}
  data, _ := json.Marshal(student)
  w.Header().Add("content-type", "application/json")
  w.WriteHeader(http.StatusOK)
  fmt.Fprintf(w, string(data))
}

func main() {
  http.ListenAndServe(":3000", MakeWebHandler())
}
```

## https web server

- 우선 인증서와 비밀키를 발급받아야 함
  - 로컬 환경의 경우 `openssl` 명령어로 발급받을 수 있음

```go
func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello World")
  })
  err := http.ListenAndServeTLS(":3000", "localhsot.crt", "localhost.key", nil)
  if err != nil {
    log.Fatal(err)
  }
}
```
