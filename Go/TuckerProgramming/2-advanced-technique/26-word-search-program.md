```go
type LineInfo struct {
  lineNo int
  line   string
}

type FindInfo struct {
  filename string
  lines    []LineInfo
}

func main() {
  if len(os.Args) < 3 {
    fmt.Println("2개 이상의 실행 인수가 필요합니다")
    return
  }

  word := os.Args[1]
  files := os.Args[2:]
  findInfos := []FindInfo{}
  for _, path := range files {
    findInfos = append(findInfos, FindWordInAllFiles(word, path)...)
  }
  for _, findInfo := range findInfos {
    fmt.Println(findInfo.filename)
    fmt.Println()
    for _, lineInfo := range findInfo.lines {
      fmt.Println("\t", lineInfo.lineNo, "\t", lineInfo.line)
    }
    fmt.Println()
  }
}

func FindWordInAllFiles(word, path string) []FindInfo {
  findInfos := []FindInfo{}
  filelist, err := filepath.Glob(path)
  if err != nil {
    fmt.Println("파일 경로 에러: ", err, "경로: ", path)
    return findInfos
  }

  ch := make(chan FindInfo)
  cnt := len(filelist)
  recvCnt := 0

  for _, filename := range filelist {
    go FindWordInFile(word, filename, ch)
  }

  for findInfo := range ch {
    findInfos = append(findInfos, findInfo)
    recvCnt++
    if recvCnt == cnt {
      break
    }
  }
  return findInfos
}

func FindWordInFile(word, filename string, ch chan FindInfo) {
  findInfo := FindInfo{filename, []LineInfo{}}
  file, err := os.Open(filename)
  if err != nil {
    fmt.Println(filename " 파일을 찾을 수 없습니다")
    ch <- findInfo
    return
  }
  defer file.Close()

  lineNo := 1
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    line := scanner.Text()
    if strings.Contains(line, word) {
      findInfos.lines = append(findInfo.lines, LineInfo{lineNo, line})
    }
    lineNo++
  }
  ch <- findInfo
}
```

```go
func Open(name string) (*File, error)
```

- os 패키지의 파일을 열고 파일 핸들을 가져오는 함수
- `*File` 타입은 `io.Reader` 인터페이스를 구현하고 있기 때문에 `bufio.NewScanner()` 함수도 활용 가능

```go
func Glob(pattern string) (matches []string, err error)
```

- filepath 패키지의 주어진 경로에 맞는 모든 파일 목록을 가져오는 함수
- 와일드카드 `*` `?` 사용 가능
  - `*`: 0개 이상의 아무 문자열
  - `?`: 1개의 아무 문자

```go
func NewScanner(r io.Reader) *Scanner
```

- bufio 패키지의 파일을 한 줄씩 읽기 위한 `Scanner` 객체를 얻는 함수
- `io.Reader` 인터페이스를 구현하는 모든 인스턴스를 인수로 사용할 수 있음

```go
type Scanner
  func (s *Scanner) Scan() bool
  func (s *Scanner) Text() string
```

- `Scan()`: 다음 줄을 읽어옴
- `Text()`: 읽어온 한 줄을 문자열로 반환

```go
func Contains(s, substr string) bool
```

- strings 패키지의 단어 검색 함수
- 문자열 `s` 안에 찾고자 하는 `substr`이 있는지 여부를 반환
