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

※ fs 모듈로 HTML을 응답하는 예제

[fs & http](https://github.com/nmin11/Node.js-masterbook/blob/main/http/server2.js)
