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
