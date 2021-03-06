※ MySQL Workbench 테이블 생성 옵션들

- PK(PRIMARY KEY) : 기본 키 여부
  - AI(AUTO_INCREMENT)가 함께 쓰이는 경우가 많음
- NN(NOT NULL) : null 허용 여부
- UQ(UNIQUE INDEX) : 고유값 여부
- UN(UNSIGNED) : 0과 양수만 허용
- ZF(ZEROFILL) : 컬럼의 자릿수 제한에 맞춰서, 비어있는 부분은 0으로 채워줌
- Default/Expression : 기본값 설정, `now()` 같은 함수 지정 가능

※ utf8 & utf8mb4

- 기본적으로 한글을 사용하고 싶다면 utf8 계열 사용
- 추가적으로 이모티콘까지 넣고 싶다면 utf8mb4 사용

※ 제로초님의 대댓글 tip

- 하위 댓글들은 부모 id를 넣어주고, front-end에서 조립
- 부모 id가 없는 댓글들은 당연히 상위 댓글이 됨

<br>
<br>

## Sequelize

- 노드에서 MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
- JS 객체와 DB의 릴레이션을 매핑해주는 **ORM(Object-Relational Mapping)**
- MariaDB, PostgreSQL, SQLite, MSSQL 등 다른 DB와도 같이 사용 가능
- SQL을 직접 사용하지 않고 JS만으로 DB 조작 가능

※ 실습 때 설치한 패키지들

```bash
npm i express morgan mustache sequelize sequelize-cli mysql2
```

- sequelize-cli : 시퀄라이즈 명령어 실행
- mysql2 : MySQL과 시퀄라이즈를 이어주는 드라이버
- 패키지 설치 후 `npx sequelize init`
  - 설치하면 `config` `models` `migrations` `seeders` 폴더 생성
  - 설치 후 `modules/index.js` 파일은 다음과 같이 최적화

<br>

### MySQL 연결하기

※ models/index.js

```js
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

module.exports = db;
```

- Sequelize는 시퀄라이즈 패키지이자 생성자
  - `config/config.json`에서 DB 설정을 불러와서 `new Sequelize`를 통해 MySQL 연결 객체 생성
  - 연결 객체를 나중에 사용하기 위해서 `db.sequelize`에 넣어둠

※ [app.js 세팅](https://github.com/nmin11/Node.js-masterbook/blob/main/mysql/app.js)

- `require("./models")`는 `require("./models/index.js")`와 같음
- `db.sequelize`를 불러와서 `sync` 메소드 실행
- `{ force: true }` : 서버 실행 시마다 테이블 재생성
- MySQL과 연동할 때는 `config/config.json` 정보가 활용됨

```json
{
  "development": {
    "username": "root",
    "password": "[pwd]",
    "database": "[db name]",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- `development` 외에 `test`와 `production`은 각각 테스트 용도와 배포 용도
  - 이 설정은 `process.env.NODE_ENV`에 의해 결정됨

<br>

### 모델 정의하기

- MySQL의 테이블은 Sequelize의 모델과 대응

※ [Sequelize models](https://github.com/nmin11/Node.js-masterbook/blob/main/mysql/models)

- User 모델을 만들고 모듈로 exports
- User 모델은 Sequelize.Model을 확장한 클래스로 선언
- 모델은 크게 `static init` 메소드와 `static associate` 메소드로 나뉨
  - `init` 메소드는 테이블에 대한 설정, `associate` 메소드는 다른 모델과의 관계
- `init` 메소드
  - 첫 번째 인수는 테이블 컬럼에 대한 설정
  - 두 번째 인수는 테이블 자체에 대한 설정
  - Sequelize는 id를 기본 키로 연결하므로 굳이 id 컬럼을 명시할 필요가 없음
- `db`라는 객체에 User와 Comment 모델을 담아두었기 때문에 이를 require해서 접근 가능
- index.js에서 `User.init`과 `Comment.init`을 실행해서 각자의 `static init` 호출

**MySQL과 Sequelize 비교**

|     MySQL     |          Sequelize          |
| :-----------: | :-------------------------: |
| VARCHAR(100)  |         STRING(100)         |
|      INT      |           INTEGER           |
|    TINYINT    |           BOOLEAN           |
|   DATETIME    |            DATE             |
| INT UNSIGNED  |      INTEGER.UNSIGNED       |
|   NOT NULL    |      allowNull: false       |
|    UNIQUE     |        unique: true         |
| DEFAULT now() | defaultValue: Sequelize.NOW |

※ MySQL의 `DATE`을 사용하고 싶다면 Sequelize에서 `DATEONLY`를 사용해야 함

**super.init 두 번째 인자 - 테이블 옵션**

- sequelize : `static init` 메소드의 매개변수와 연결
- timestamps : true일 경우 createdAt, updatedAt 컬럼 추가
- underscored : Sequelize는 테이블과 컬럼 이름을 camelCase로 만드는데, 이를 snake_case로 바꿈
- modelName : 모델 이름 설정 / 노드에서 사용됨
- tableName : 실제 DB의 테이블 이름 / 기본적으로는 소문자 및 복수형으로 만듦
- paranoid : true일 경우 deletedAt 컬럼 추가 / 나중에 row를 복원하기 위한 용도
  - soft delete 라고도 불림
- charset / collate : 한글을 입력하기 위해 각각 utf8 / utf8_general_ci 설정

<br>

### 관계 정의하기

**1:N**

- Sequelize에서는 `hasMany` 메소드와 `belongsTo` 표현
- 1 쪽에서 `hasMany` / N 쪽에서 `belongsTo`
- 다른 모델의 정보가 들어가는 테이블에 `belongsTo`를 사용한다고 생각하면 편함
  - A belongs to B : A는 B에 속해 있다

```js
static associate(db) {
  db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
}
```

```js
static associate(db) {
  db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
}
```

**1:1**

- `hasOne` 메소드 사용

```js
db.User.hasOne(db.Info, { foreignKey: "UserId", sourceKey: "id" });
db.Info.belongsTo(db.User, { foreignKey: "UserId", targetKey: "id" });
```

**N:M**

- `belongsToMany` 메소드 사용

```js
db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
```

- `through` 속성에 있는 이름대로 새로 생성된 `PostHashtag` 모델 생성

<br>

### Sequelize 쿼리

- Promise나 async/await과 함께 사용 가능

※ 삽입 예제

```js
const { User } = require("../models");
User.create({
  name: "zero",
  age: 24,
  married: false,
  comment: "introduce myself",
});
```

※ 전체 조회 예제

```js
User.findAll({});
```

※ 조건별 조회 예제

```js
User.findOne({});
```

```js
User.findAll({
  attributes: ["id", "name"],
  order: [["age", "DESC"]],
});
```

- `order` 값으로 2차원 배열을 사용하는 이유는 정렬 조건을 여러 개 사용할 수도 있기 때문

```js
const { Op } = require("sequelize");
const { User } = require("../models");
User.findAll({
  attributes: ["id", "name"],
  where: {
    [Op.or]: [{ married: false }, { age: { [Op.ge]: 30 } }],
  },
});
```

```js
User.findAll({
  attributes: ["id", "name"],
  order: ["age", "DESC"],
  limit: 1,
  offset: 1,
});
```

- findOne 대신 `limit: 1` 사용 가능

※ 수정 예제

```js
User.update(
  {
    comment: "updated content",
  },
  {
    where: { id: 2 },
  }
);
```

※ 삭제 예제

```js
User.destroy({
  where: { id: 2 },
});
```

※ 값을 변수에 담을 때는?

```js
const user = await User.findOne({});
console.log(user.nickname);
```

※ JOIN해서 값을 가져오자!

```js
const user = await User.findOne({
  include: [
    {
      model: Comment,
    },
  ],
});
const comments = await user.getComments();
console.log(comments);
```

- 어떤 모델과 관계가 있는지 `include` 배열에 넣을 것
- 관계가 설정된 이후에는 `getComments`(조회) `setComments`(수정)<br>`addComment`(단일 생성) `addComments`(복수 생성) `removeComments`(삭제) 메소드 지원

※ 단일 생성 예제

```js
const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);
```

※ 복수 생성 예제

```js
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1, comment2]);
```

- 아이템이 먼저 떨어지고, 유저가 그것을 주웠을 때 해당 유저의 소유가 된다고 생각하면 편함

※ SQL 직접 사용

```js
const [result, metadata] = await sequelize.query("SELECT * FROM comments");
console.log(result);
```

<br>

### query 수행

※ [views/sequelize.html](https://github.com/ZeroCho/nodejs-book/blob/master/ch7/7.6/learn-sequelize/views/sequelize.html)

※ [views/error.html](https://github.com/ZeroCho/nodejs-book/blob/master/ch7/7.6/learn-sequelize/views/error.html)

※ [public/sequelize.js](https://github.com/ZeroCho/nodejs-book/blob/master/ch7/7.6/learn-sequelize/public/sequelize.js)

※ [routes/index.js](https://github.com/ZeroCho/nodejs-book/blob/master/ch7/7.6/learn-sequelize/routes/index.js)

- `User.findAll` 메소드로 모든 사용자를 조회하고 sequelize.html을 렌더링할 때 그 값을 넣어줌

※ [routes/users.js](https://github.com/ZeroCho/nodejs-book/blob/master/ch7/7.6/learn-sequelize/routes/users.js)

- `router.route` 메소드를 사용하면 같은 라우트 경로를 하나로 묶을 수 있음
  - `router.get` `router.post`를 따로 나눌 필요가 없다는 뜻
  - app.use에서 연결된 라우터 경로에 연결해서 새로운 라우터 설정
- GET 요청 - index.js와는 다르게 JSON 방식으로 응답

※ [routes/comments.js](https://github.com/ZeroCho/nodejs-book/blob/master/ch7/7.6/learn-sequelize/routes/comments.js)
