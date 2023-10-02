## go commands

| command  | description                                                                     |
| :------: | :------------------------------------------------------------------------------ |
|   bug    | Go 언어에 대한 버그 리포트 사이트로 이동                                        |
|  build   | 패키지 컴파일                                                                   |
|  clean   | 컴파일 시 생성되는 패키지 object files 삭제                                     |
|   doc    | 패키지 문서 출력                                                                |
|   env    | Go 환경변수들 출력                                                              |
|   fix    | 오래된 API를 새 API로 업데이트<br>`go doc cmd/fix` 참고                         |
|   fmt    | 패키지를 리포맷하는 gofmt 실행<br>Go 코딩 규약에 맞게 소스 코드 수정            |
| generate | 파일 생성 절차에 따라 go 파일 생성<br>[참조 링크](https://go.dev/blog/generate) |
|   get    | 패키지 추가 및 다운로드                                                         |
| install  | 컴파일 후 GOPATH/bin 경로에 설치                                                |
|   list   | 패키지 및 모듈 목록 출력                                                        |
|   mod    | 새로운 모듈을 만들거나 관리                                                     |
|   run    | 실행 파일 없이 컴파일 후 실행                                                   |
|   test   | 패키지 테스트                                                                   |
|   tool   | 특정 go 도구 실행                                                               |
| version  | go 버전 출력                                                                    |
|   vet    | 패키지 내 버그로 의심되는 부분을 보고<br>`go doc cmd/vet` 참고                  |

## go doc

```bash
go doc fmt
```

- 패키지 문서를 출력해줌
- 위와 같은 표준 패키지뿐 아니라 우리도 직접 패키지 문서를 만들고 확인해볼 수 있음
- 작성 규칙: 소스 코드 내 각 요소들 위에 해당 요소의 이름으로 시작하는 주석을 추가하면 됨

```go
// CharSize 상수 설명입니다.
const CharSize = 3
```

### godoc tool

- 터미널 상에서 텍스트 형식으로 확인하는 것이 불편
- Go가 공식 제공하는 `godoc` 툴을 사용하면 웹 페이지 형태로 문서를 볼 수 있음

```bash
go get golang.org/x/tools/cmd/godoc
```

- 설치 후 로컬에서 실행하는 명령어 입력

```bash
godoc -http=:6060
```

- 이후 http://localhost:6060 에 접속하면 웹 페이지 형태로 패키지 문서 열람 가능

예제 보여주기

- `example_test.go`와 같은 테스트 파일 생성 후 아래와 같은 코드 작성

```go
// PrintDoc() 함수에 대한 예제입니다.
func ExamplePrintDoc() {
  fmt.Println("This is package level example")
}

// TextDoc의 PrintDoc() 메소드에 대한 예제입니다.
func ExampleTextDoc_PrintDoc() {
  fmt.Println("This is PrintDoc() example")
}

// TextDoc에 대한 예제입니다.
func ExampleTextDoc_lines() {
  fmt.Println("This is line() example")
}
```

- `ExampleTypeName_MethodName` 같은 형태로 예제 함수를 작성하면 문서에서 해당 예제를 출력해줄 수 있음

## embed

- 특정 파일들을 binary 파일 안에 포함시켜서 파일 읽기 성능을 향상시키는 기능
- 주로 웹 서버에서 파일 읽기 성능을 향상시키기 위해 사용

```go
// static 폴더 하위의 모든 파일을 실행 파일 내에 포함
// go:embed static/*
var files embed.FS

func main() {
  http.Dir
  http.Handle("/", http.FileServer(http.FS(files)))
  http.ListenAndServe(":3000", nil)
}
```

- 실행 후 http://localhost:3000/static/test.html 같은 방식으로 파일 경로에 접근 가능
- 장점: 포함된 파일을 빠르게 읽을 수 있음
- 단점: 실행 파일 크기가 늘어나고 메모리 사용량도 늘어남
