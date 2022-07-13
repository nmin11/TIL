## 노드의 정의

- 노드는 서버가 아니다!
- `Node.js는 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임입니다.`
- 서버의 역할도 수행할 수 있는 JavaScript 런타임
- 서버 실행을 위해 필요한 http/https/http2 모듈 제공
- Node.js는 JavaScript가 브라우저나 HTML이라는 종속성에서 벗어나게 해줌
- 참고로 TypeScript는 Deno라는 런타임을 사용할 수 있음
  - Node.js의 원저자인 Ryan Dahl이 만듦
- 런타임 : 특정 언어로 만든 프로그램들을 실행할 수 있게 해주는 가상 머신
- JavaScript의 다른 런타임으로는 웹 브라우저가 있음
- JavaScript 튜토리얼이 필요하다면 [JAVASCRIPT.INFO](https://ko.javascript.info/) 사이트를 참고하자
- Single Thread이면서 비동기 처리가 가능함

<br>
<br>

## 노드의 특성

### event-driven

- 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
- 예시 : 클릭, 네트워크 요청 등
- event listener : 이벤트를 등록하는 함수
- callback 함수 : 이벤트가 발생되었을 때 실행할 함수
- event loop : 여러 이벤트가 동시에 발생했을 때 어떤 순서로 callback 함수를 호출할지 판단
- background : event listener들이 대기하는 곳으로, 여러 작업 동시 실행 가능
- task queue : 정해진 순서대로 callback들이 줄을 서 있는 공간, callback queue라고도 불림

<br>

### Non-blocking I/O

- 오래 걸리는 함수를 background로 보낸 뒤 다음 코드를 먼저 실행하고 나중에 오래 걸리는 함수 실행
- non-blocking 방식 하에 일부 코드는 background에서 병렬 실행
  - 일부 코드 : I/O(파일 시스템 접근, 네트워크 요청), 압축, 암호화 등
- 그러므로 I/O 작업이 많을 때 Node의 활용성을 극대화할 수 있음
- 그러나 Node에서 동시성을 구현하기란 매우 힘들고, 일부를 제외하고는 거의 다 blocking 방식으로 진행됨

<br>

### Single Thread

- Process : 운영체제에서 할당하는 작업의 단위, process 간 자원 공유 없음
  - 기본적으로 프로그램을 하나 띄우면 Process도 하나 띄우는 것이라고 생각하면 편함
- Thread : process 내에서 실행되는 작업의 단위, 부모 프로세스로부터 자원을 공유받음
- Node의 thread는 Multi Thread이지만 직접 다룰 수 있는 thread는 하나이기 때문에 Single Thread라고 표현
- Node는 주로 Multi Thread 보다는 Multi Process를 활용
- Single Thread의 장단점
  - blocking이 발생하면 다른 작업들이 대기해야 하는 비효율이 발생함
  - 에러를 처리하지 못하면 멈춤
  - 프로그래밍 난이도가 쉽고, CPU 및 메모리 자원을 적게 사용
- 이를 해결하기 위해 Non-blocking I/O 모델을 사용해서 I/O 처리를 다른 프로세스에서 실행하는 것!
  - 요청을 먼저 받고, 작업이 완료되었을 때 응답하는 방식 사용
  - I/O 코드가 아니라면 그대로 Single Thread, Blocking 방식으로 처리
  - I/O 작업을 처리할 때는 Multi Threading 보다 Multi Processing이 효율적!
- Node 14 버전부터는 Multi Thread 또한 사용 가능
  - Multi Thread의 단점 : 프로그래밍하기가 어려움
  - Multi Thread를 사용할 수 있도록 worker_threads 모듈 도입
  - Multi Thread가 Node의 주역이 되는 것은 아니고, Multi Processing만 가능했던 아쉬움을 달래주기 위한 것
  - 가급적이면 CPU 작업이 많을 때만 사용할 것

<br>
<br>

## 서버로서의 노드

- Server : 네트워크를 통해 client에 정보나 서비스를 제공하는 컴퓨터 또는 프로그램
- Client : server에 요청을 보내는 주체

<br>

### 노드 서버의 장단점

| 장점                                           | 단점                                                   |
| :--------------------------------------------- | :----------------------------------------------------- |
| Multi Thread 방식에 비해 적은 컴퓨터 자원 사용 | 기본이 Single Thread이기 때문에 CPU 코어를 하나만 사용 |
| I/O 작업이 많은 server에게 적합                | CPU 작업이 많은 server로는 부적합                      |
| Multi Thread 방식보다 코딩이 쉬움              | 하나뿐인 thread가 멈추지 않도록 관리가 필요            |
| web server 내장                                | server 규모가 커졌을 때 관리가 어려움                  |
| JavaScript 사용 (세계적인 언어)                | 어중간한 성능                                          |
| JSON 형식과의 호환성 (JavaScript가 곧 JSON)    |                                                        |

- CPU 작업을 위해서 AWS Lambda 혹은 Google Cloud Functions와 같은 별도 서비스 사용
  - CPU 작업 예시 : image resizing, 암호화, algorithm 풀이, 대규모 데이터 처리
- Paypal, Netflix, NASA, Walmart, LinkedIn, Uber 등에서 메인 또는 서브 server로 사용중

<br>

### 서버 외의 노드

- JavaScript 런타임이기 때문에 당연히 용도가 서버로만 한정되어 있는 것이 아님
- Web Framework : Angular, React, Vue, Meteor 등
- Mobile App Framework : React Native
- Desktop : Electron (Atom, Slack, VSC, Discord 등)
