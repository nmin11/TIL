## 익스프레스 프로젝트 시작하기

```json
{
  "name": "express",
  "version": "1.0.0",
  "description": "study express.js",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Loko",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}
```

- `nodemon app` : app.js를 nodemon으로 실행
  - 서버 코드가 변경될 때마다 nodemon 모듈이 서버를 자동으로 재시작
  - nodemon이 실행되는 콘솔에 `rs`를 입력해서 수동 재시작도 가능
  - nodemon은 개발용으로만 권장 (배포 후 서버 코드가 빈번하게 변경될 일이 없음)

```js
const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
  res.send("Hello Express");
});
app.listen(app.get("port"), () => {
  console.log(app.get("port"), " port is waiting...");
});
```

- express 모듈에는 http 모듈이 내장되어 있음
- `app.js`라는 이름은 필수적인 것은 아니지만 express 개발자들이 통상적으로 많이 사용함
- `app.set("port", port)` : 서버가 실행될 포트 설정
  - `app.set(key, val)`을 사용해서 데이터 저장 가능
  - 서버에 속성을 저장해둔다고 생각하면 편함
- `app.get(addr, router)` : 주소에 대한 GET 요청이 들어올 때에 대한 처리
  - http 모듈의 `res.write`이나 `res.end` 대신, `res.send` 사용
- GET 이외에도 라우터를 위한 `app.post` `app.put` `app.patch` `app.delete` `app.options` 메소드 존재
- `listen` 메소드 부분은 http 모듈과 동일

```js
res.sendFile(path.join(__dirname, "/index.html"));
```

- 단순한 문자열 대신 HTML로 응답하고 싶다면 `sendFile` 메소드 사용
  - `fs` 모듈이 필요 없으므로 http 모듈에 비해서 좀 더 편리!

<br>
<br>

## 자주 사용하는 미들웨어

- 미들웨어는 익스프레스의 핵심
- 요청과 응답의 사이에서 중간 처리를 해주는 역할
- 라우터와 에러 핸들러 또한 미들웨어의 일종
- 미들웨어는 `app.use(middleware)` 형식으로 사용됨

```js
app.set("port", process.env.PORT || 3000);
app.use((req, res, next) => {
  console.log("executed for all request");
  next();
});
app.get(
  "/",
  (req, res, next) => {
    console.log("executed for GET / request");
    next();
  },
  (req, res) => {
    throw new Error("go to error handling middleware");
  }
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
```

- `app.use`에 매개변수가 `req` `res` `next`인 함수를 넣어서 사용
  - `next`는 다음 미들웨어로 넘어가는 함수
- 미들웨어는 위에부터 아래로 순서대로 실행
- 요청과 응답 사이 특별한 기능 추가 가능
- 하나의 라우터에 여러 개 이상의 미들웨어 장착 가능
- 첫 번째 인수로 주소를 넣어주지 않으면 모든 경로에서 실행
- `app.use(middleware)` : 모든 요청에서 미들웨어 실행
- `app.use(path, middleware)` : 지정 경로에서 미들웨어 실행
- `app.post(path, middleware)` : 지정 경로에 대한 POST 요청에서 미들웨어 실행
- 에러 처리 미들웨어는 매개변수가 `err` `req` `res` `next` 4개
  - 모든 매개변수를 사용하지 않더라도 반드시 4개를 채워야 함

```js
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
```

- 여러 패키지들을 사용해서 미들웨어에 다양한 기능들을 추가할 수 있음
- 설치한 패키지들 또한 `app.use`로 연결
- `req` `res` `next` 등은 미들웨어 내부에 들어있음
  - `next` 또한 내부적으로 호출하기 때문에 자동으로 다음 미들웨어로 넘어감
- dotenv 패키지는 `.env` 파일을 읽어서 `process.env`로 만들어줌

<br>

### morgan

- 요청과 응답에 대한 정보를 `GET / 500 9.180 ms - 31` 방식으로 출력
  - `dev` 모드 기준 `[HTTP method] [url] [HTTP status code] [response speed] [response byte]` 형식으로 출력
- `app.use(morgan("dev"));`
- `dev` `combined` `common` `short` `tiny` 등을 넣을 수 있음
  - 개발 환경 → `dev` / 배포 환경 → `combined` 추천

<br>

### static

- 정적인 파일들을 제공하는 라우터
- 기본 제공이므로 설치할 필요 없이 express 객체에서 꺼내 쓰면 됨
- `app.use([requested path], express.static([real path]))`
- 서버의 폴더 구분과 요청 경로를 다르게 지정해줄 수 있음
- `fs.readFile`로 파일을 읽을 필요가 없으며, 만약 해당 파일이 없으면 알아서 `next` 호출
  - 만약 파일이 있다면 다음 미들웨어는 실행되지 않고 응답으로 파일을 보냄

<br>

### body-parser

- 요청의 본문에 있는 데이터를 해석해서 `req.body` 객체로 만들어주는 미들웨어
- 보통 form-data 혹은 AJAX 요청 데이터 처리
- 단, multipart 데이터는 처리 불가능 (`multer` 모듈을 사용해야 함)

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

- body-parser 또한 express에 내장되어 있지만 Raw, Text 형식의 데이터를 해석하려면 설치 필요
  - Raw 타입은 버퍼 데이터를 처리할 때 사용

```js
const bodyParser = require("body-parser");
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

- `urlencoded({ extended: false })`
  - false이면 노드의 querystring 모듈을 사용해서 해석
  - true이면 qs 모듈을 사용해서 해석
    - qs 모듈은 npm 패키지이며, querystring 모듈의 기능을 좀 더 확장한 모듈
- http 모듈의 `req.on("data")` `req.on("end")`를 사용할 필요가 없고, body-parser가 알아서 `req.body`를 다뤄줌

**자주 사용하는 요청 데이터들**

- JSON
- URL-encoded : 주소 형식의 데이터

<br>

### cookie-parser

- 요청에 동봉된 쿠키를 해석해서 `req.cookies` 객체로 만들어주는 모듈
- `app.use(cookieParser(process.env.COOKIE_SECRET));`
- 첫 번째 인수는 비밀 키
  - 비밀 키를 통해서 내 서버가 만든 쿠키임을 검증 가능
- 쿠키에는 서명을 쿠키 값 뒤에 붙이는데, 이렇게 서명된 쿠키는 `req.signedCookies` 객체에 들어감
- cookie-parser는 쿠키 생성에 쓰이진 않음
  - 쿠키 생성/제거를 위해서는 `res.cookie` `res.clearCookie` 사용
  - 쿠키 삭제 시 키와 값 외에도 옵션도 정확히 일치해야 삭제 가능
