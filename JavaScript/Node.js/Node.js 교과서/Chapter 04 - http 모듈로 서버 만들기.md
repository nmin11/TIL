## 요청과 응답

- http는 클라이언트와 서버가 통신하기 위한 공통된 프로토콜
- 노드에서는 http 모듈 사용 가능

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node!</h1>");
  res.end("<p>Hello Server!</p>");
});
server.listen(8080);

server.on("listening", () => {
  console.log("8080 port waiting...");
});

server.on("error", (error) => {
  console.error(error);
});
```

- 클라이언트로부터 요청을 받으면 위 코드 실행
- `req`와 `res`를 통해 요청과 응답 처리
- `listen` 부분을 통해 임의의 포트에 서버 연결
  - 연결 후 실행할 콜백 함수를 넣을 수 있음
  - 만약 80포트를 사용하고자 한다면 생략 가능
- `res.writeHead` : 응답에 대한 정보 기록 (Header 설정)
- `res.write` : 데이터가 기록되는 Body 설정
- `res.end` : 응답 종료, 인수가 있다면 그 데이터도 클라이언트로 보내고 종료
- 여러 개의 포트로 여러 개의 서버를 만들 수도 있음

※ [fs 모듈로 HTML을 응답하는 예제](https://github.com/nmin11/Node.js-masterbook/blob/main/http/server2.js)

<br>
<br>

## REST와 라우팅

※ [제로초님의 RESTful한 서버 예제](https://github.com/ZeroCho/nodejs-book/tree/master/ch4/4.2)

- 위 코드들 중 `restServer.js`가 핵심
- `req.method`를 통해 HTTP 요청 메소드 구분
- `req.url`을 통해 요청 주소 구분
- Express.js를 적용하기 전, http만을 이용해서 만드는 서버는 코드가 꽤나 번잡하다는 사실을 알 수 있음

<br>
<br>

## 쿠키와 세션

- 클라이언트의 요청은 누가 보냈는지 알 수 없으므로, 로그인을 구현해야 함
- 로그인 구현에 필요한 것이 바로 쿠키와 세션

<br>

### Cookie

- key = value
- 클라이언트는 쿠키를 저장해두었다가 매 요청마다 동봉해서 보냄
- 서버는 쿠키를 읽어서 사용자가 누구인지 파악
- 쿠키가 꼭 로그인에만 쓰이는 것은 아님

```js
const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test; auth=admin" });
    res.end("Hello Cookie");
  })
  .listen(8080, () => {
    console.log("8080 port is waiting...");
  });
```

- 쿠키는 문자열 형식으로 존재
- 각 쿠키를 `;`으로 구분
- 서버는 `req.headers.cookie`에서 쿠키를 받아낼 수 있음
- 위 코드에서 Header에 `Set-Cookie`를 통해 쿠키를 저장하도록 했음
  - 브라우저는 응답을 받으면 쿠키를 저장하게 됨

※ [Cookie를 통해 사용자를 식별하는 예제](https://github.com/ZeroCho/nodejs-book/blob/master/ch4/4.3/cookie2.js)

<br>

**Cookie의 속성들**

- Expires : 만료 기한, 기본값은 클라이언트 종료까지
- Max-age : Expires와 비슷하지만 날짜 대신 초
- Domain : 쿠키가 전송될 도메인 특정, 기본값은 현재 도메인
- Path : 쿠키가 전송될 URL 특정, 기본값은 `/`
- Secure : HTTPS인 경우에만 쿠키 전송
- HttpOnly : JS에서 쿠키 접근 불가

### Session

※ [Session 활용 예제](https://github.com/ZeroCho/nodejs-book/blob/master/ch4/4.3/session.js)

- 쿠키는 조작이 가능하기 때문에 위험
- 중요한 정보는 서버에서 관리하고 클라이언트에는 세션 키만 제공하는 방식
- 세션을 위해 사용하는 쿠키를 세션 쿠키라고 부름
- 사실 실제로는 세션을 이렇게 변수에 저장하진 않음
  - 서버가 초기화되면 메모리의 변수도 초기화
  - 실제로는 메모리 DB 등을 자주 사용함
  - 실제 서버에서는 세션을 직접 구현하지 말자!
- 세션 실무 예제는 Express.js를 배울 때 더욱 자세하게 배울 예정

<br>
<br>

## https & http2

- HTTPS는 웹 서버에 SSL 암호화를 추가한 것
- HTTP 2는 요청 및 응답 방식을 1.1 버전에 비해 개선한 것, SSL 암호화도 포함되어 있음

※ [https 모듈 활용 예제](https://github.com/ZeroCho/nodejs-book/blob/master/ch4/4.4/server1-3.js)

※ [http2 모듈 활용 예제](https://github.com/ZeroCho/nodejs-book/blob/master/ch4/4.4/server1-4.js)

- 노드에서 https 모듈 지원
- `createServer`에 인수가 추가되어서 cert, key, ca 값을 추가해줘야 함
- https 모듈과 http2 모듈의 사용 방식은 거의 동일

<br>
<br>

## cluster

- 기본적으로는 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
- 포트를 공유하는 모듈 여러 개 운용 가능
- 요청이 많이 들어왔을 경우 실행된 서버를 병렬로 운용하여 요청 분산
- 코어 하나당 노드 프로세스 하나씩 배정 가능
- 그렇다고 성능이 8배가 되는 것은 아니지만 확실히 개선됨
- 그러나 메모리, 세션 등의 컴퓨터 자원을 공유하지 못함
- 단점은 주로 메모리 DB를 사용하여 극복

※ [cluster 모듈 활용 예제](https://github.com/ZeroCho/nodejs-book/blob/master/ch4/4.5/cluster.js)

- 실무에서는 cluster 모듈을 직접적으로 사용하기보다 pm2 등의 모듈을 사용하곤 함

<br>

⭐ 실무에서는 대부분 Express.js를 사용!
