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

※ 와일드카드에 대한 미들웨어 설정하기

```js
app.get("/category/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});
```

- 와일드카드는 다른 미들웨어보다 아래에 두어야 할 때가 많음

<br>

### morgan

- 요청과 응답에 대한 정보를 `GET / 500 9.180 ms - 31` 방식으로 출력
  - `dev` 모드 기준 `[HTTP method] [url] [HTTP status code] [response speed] [response byte]` 형식으로 출력
- `app.use(morgan("dev"));`
- `dev` `combined` `common` `short` `tiny` 등을 넣을 수 있음
  - 개발 환경 → `dev` / 배포 환경 → `combined` 추천
  - `combined`는 시간과 요청자 정보까지 알려줌

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

<br>

### express-session

- 세션 관리용 미들웨어
- 로그인 등을 세션으로 구현하거나 특정 사용자의 데이터를 임시로 저장할 때 유용
- 세션은 사용자별로 `req.session` 객체 안에 유지

```js
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

**매개인수 살펴보기**

- `resave` : 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할 것인지
- `saveUninitialized` : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할 것인지
- `secret` : 세션 쿠키 방식이기 때문에 쿠키를 서명할 값 지정, cookie-parser의 것과 동일하게 하는 것이 좋음
- `cookie` : 세션 쿠키 설정
- `name` : 세션 쿠키의 이름, 기본값은 `connect.sid`

<br>

**세션 조작하기**

- `req.session` 객체의 값을 수정해서 세션 변경 가능
- `req.session.destroy` : 세션 전체 삭제
- `req.sessionID` : 현재 세션 ID

<br>

### 미들웨어 특성

- 미들웨어는 `req` `res` `next`를 매개변수로 가지는 함수
- 에러 처리 미들웨어만 예외적으로 `err` `req` `res` `next`
- 미들웨어를 장착할 때는 `app.use` `app.get` `app.post` 등으로 장착
- 특정 URL에 대한 미들웨어로 만드려면 첫 번째 인수로 URL을 넣을 것
- 동시에 여러 개의 미들웨어 장착 가능하며, 다음 미들웨어로 넘어가려면 `next` 호출
- 미들웨어 모듈들은 대부분 `next`가 내장되어서 생략 가능
- `next`를 호출하지 않는 미들웨어는 `res.send` `res.sendFile` 등의 메소드로 응답을 보내야 함
  - `send`를 2번 이상 했을 경우에도 에러가 발생하니 꼭 유의할 것!
  - 응답을 보낸 다음 줄의 코드도 실행됨 (함수를 return 해버리는 것이 아님!)
  - `res.json` `res.render` 또한 응답을 보내는 메소드
- 미들웨어 장착 순서에 따라 어떤 미들웨어는 작동하지 않을 수도 있음!
- 만약 `next`도 호출하지 않고 응답도 보내지 않으면 클라이언트는 하염없이 기다리게 됨
- `next`에는 인수를 넣을 수 있으며, 넣게 되면 특수한 동작 수행
  - `"route"` : 다음 라우터의 미들웨어로 바로 이동
  - 그 밖의 인수 : 에러 처리 미들웨어로 이동, 인수는 에러 처리 미들웨어의 `err` 매개변수가 됨
- `req.data` : 미들웨어 간 데이터를 전달하는 방법
  - 요청이 끝날 때까지만 유지
  - 새로운 요청이 오면 초기화
  - 속성명이 꼭 `data`일 필요는 없지만 다른 미들웨어와 겹치지 않도록 조심해야 함
    - 예를 들어 `req.body`는 body-parser 미들웨어와 겹침
- `app.set`은 익스프레스에서 전역적으로 사용되므로 사용자 개개인의 값을 넣지 말 것

※ 미들웨어 안에 미들웨어 넣기

```js
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
```

- 기존 미들웨어의 기능 확장 가능
- 환경별로 분기 처리 가능

<br>

### multer

- multipart 형식으로 파일 업로드할 때 사용하는 미들웨어
- enctype이 `multipart/form-data`인 form을 통해 업로드하는 데이터 형식
- multer 패키지 안에 여러 종류의 미들웨어가 있음

```js
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
```

- `storage` : 어떤 destination에 어떤 filename으로 저장할지
- `destination` `filename` : `req` 요청 정보 / `file` 업로드한 파일 정보 / `done` 처리할 함수
  - `done` : 첫 번째 인자는 에러, 두 번째 인수는 실제 경로나 파일 이름
- 위 코드에서는 `[파일명 + 현재시간.확장자]` 형식으로 업로드
- `limits` : 업로드에 대한 제한 사항 설정
- 위 코드를 실제로 활용하려면 서버에 uploads 폴더가 반드시 존재해야 함

```js
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.send("ok");
});
```

- 파일을 하나만 업로드할 경우 **single** 미들웨어 사용
- 파일 여러 개를 업로드한다면 `upload.array("many")`로 변경해야 함
  - 파일이 여러 개면 결과도 `req.file` 대신 `req.files` 배열에 들어있음
- 파일이 여러 개이면서, form data의 키가 다른 경우에는 **fields** 미들웨어를 사용해야 함
- 업로드 결과 또한 `req.files.image1` `req.files.image2`에 각각 담기게 됨

```js
app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
  }
);
```

- 특수한 경우 multipart 형식임에도 파일은 업로드하지 않는 경우가 있는데, 이럴 때는 **none** 미들웨어 사용
  - 이럴 때는 `req.file`이 없고 `req.body`만 있게 됨

<br>
<br>

## Router 객체로 라우팅 분리

- app.js에서 라우터를 많이 연결하면 app.js 코드가 매우 길어지므로 익스프레스는 라우터 분리 방법 제공

※ 예제 코드 : [routes/index.js](https://github.com/nmin11/Node.js-masterbook/blob/main/express/use_middleware/routes/index.js) [routes/user.js](https://github.com/nmin11/Node.js-masterbook/blob/main/express/use_middleware/routes/user.js)

```js
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/user", userRouter);
```

- `indexRouter`를 `./routes`로 require할 수 있는 이유는 `index.js`가 생략 가능하기 때문
- `app.use`로 주소를 연결할 경우 두 주소가 합쳐짐

**next("route")**

```js
router.get(
  "/",
  function (req, res, next) {
    next("route");
  },
  function (req, res, next) {
    console.log("not executed");
    next();
  }
);
router.get("/", function (req, res) {
  console.log("executed");
  res.send("Hello!");
});
```

- `next("route")`를 사용하면 다음 `next()`들은 무시되고, 주소와 일치하는 다음 라우터로 감

**404 응답 미들웨어**

```js
app.use((req, res, next) => {
  res.status(404).send("Not found");
});
```

- 일치하는 라우터가 없을 때 404 상태 코드를 응답하는 역할
- 익스프레스가 자제적으로 404 에러로 처리해주기는 하지만 그래도 연결해주는 것이 좋음

**같은 url 다른 http 메소드에 대한 처리**

```js
router
  .route("/abc")
  .get((req, res) => {
    res.send("GET /abc");
  })
  .post((req, res) => {
    res.send("POST /abc");
  });
```
