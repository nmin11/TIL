※ MySQL Workbench 테이블 생성 옵션들

- PK(PRIMARY KEY) : 기본 키 여부
  - AI(AUTO_INCREMENT)가 함께 쓰이는 경우가 많음
- NN(NOT NULL) : null 허용 여부
- UQ(UNIQUE INDEX) : 고유값 여부
- UN(UNSIGNED) / ZF(ZEROFILL)
- Default/Expression : 기본값 설정, `now()` 같은 함수 지정 가능

※ utf8 & utf8mb4

- 기본적으로 한글을 사용하고 싶다면 utf8 계열 사용
- 추가적으로 이모티콘까지 넣고 싶다면 utf8mb4 사용
