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
