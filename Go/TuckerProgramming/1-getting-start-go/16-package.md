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

## how to use

### unused package

- 패키지를 import하고 사용하지 않으면 에러 발생
- 패키지를 직접 사용하진 않고 부가효과만 얻고자 할 때는 `_`를 사용
  - `import _ "fmt"`

### install

- import로 패키지를 포함시키면 `go build` 할 때 패키지들을 포함한 실행 파일을 만들어줌
- Go가 import된 패키지를 찾는 3가지 방법
  - Go 설치 경로에 있는 기본 패키지에서 찾음
  - 외부 저장소의 패키지를 `GOPATH/pkg`에 다운로드
  - 같은 모듈 안에 있는 패키지는 폴더 내에서 찾음
