## basic concept

- Go에서 코드를 묶는 가장 큰 단위
  - 다른 언어에서는 namespace라는 것을 사용하기도 하지만 Go에는 그런 게 없음
- 함수로 코드 블록을, 구조체로 데이터를, 패키지로 함수와 구조체 및 코드를 묶음
- 프로그램은 main 패키지 하나와 여러 외부 패키지로 구성됨

### main

- 프로그램 시작점을 포함하는 특별한 패키지
- 프로그램 시작점이란 `main()` 함수를 의미
- 프로그램 실행시 대부분의 OS는 프로그램을 메모리에 load하고 프로그램 시작점부터 한 줄씩 코드를 실행

### other packages

- 한 프로그램은 main 패키지 외에 다수의 다른 패키지를 포함할 수 있음
- 외부 패키지 예시
  - fmt: 표준 입출력
  - crypto: 암호화
  - net: 네트워크 기능

### search packages

- 뭔가를 새로 만들기 전에 표준 패키지에서 같은 기능을 제공하는지 찾아볼 것
  - https://golang.org/pkg
- 외부 패키지에서도 원하는 기능을 적극적으로 찾아보자!
  - https://github.com/avelino/awesome-go

## module

- 패키지들을 모아놓은 Go 프로젝트 단위
- 모든 Go 코드는 Go 모듈 아래에 있어야 함
- `go.mod`
  - **go build를 하려면 반드시 모듈의 루트 폴더에 go.mod 파일이 있어야 함**
  - 모듈 이름, Go 버전, 필요한 외부 패키지 등을 명시
- `go.sum`
  - `go build` 시 외부 패키지와 모듈 내 패키지를 합쳐서 실행 파일을 만들 수 있도록 해주는 역할
  - 패키지 위조 여부를 검사하는 checksum 결과 포함
- 모듈은 `go mod init` 명령어를 통해 만들 수 있음
- `go mod tidy` 명령어를 통해 필요한 패키지 정보를 `go.mod`와 `go.sum`에 적어줄 수 있음
- 다운로드 받은 외부 패키지들은 `GOPATH/pkg/mod` 폴더에 버전별로 저장됨
  - 그래서 이미 다운로드가 되었다면 다른 모듈에서 사용하더라도 다시 다운로드하지 않게 됨

## package initialize

패키지를 import 했을 때 벌어지는 일들

1. 컴파일러는 패키지 내 전역 변수 초기화
2. 패키지에 `init()` 함수가 있다면 호출해서 패키지 초기화

- `init()` 함수는 매개변수도, 반환값도 없어야만 함
- 만약 어떤 패키지의 `init()` 함수만 사용하고 싶다면 `_`를 사용해서 import

```go
import (
  "database/sql"
  _ "github.com/mattn/go-sqlite3"
)
```
