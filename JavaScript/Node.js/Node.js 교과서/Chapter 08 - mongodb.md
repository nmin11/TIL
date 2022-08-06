※ JOIN 기능은 없지만 대신 aggregate 기능이 있음

- mongoose에서도 `populate` 메소드를 통해 어느 정도 JOIN 기능을 보완하여 제공

※ 몽고 컴퍼스는 무척 간편하지만 복잡한 쿼리를 쓸 때를 위해서 몽고 shell 사용법을 익혀둬야 함!

※ 기본적으로는 JS의 자료형을 따르면서, 추가적인 자료형도 제공

- `Date`, 정규표현식 같은 JS 객체
- `Binary Data` `ObjectId` `Int` `Long` `Decimal` `Timestamp` `JavaScript` 등 추가적인 자료형
  - 이 중에서도 `ObjectId` `Binary Data` `Timestamp` 외에는 잘 사용되지 않음
  - `ObjectId`는 primary key와 비슷한 역할
- `Undefined` `Symbol`은 사용되지 않음!

※ MySQL에서는 `offset`을 사용했지만 MongoDB는 `skip`을 써야 함!

## Mongoose 사용하기

- ODM(Object Document Mapping)
- 드라이버도 내장되어 있음
- 몽고디비 자체가 JS임에도 불구하고 몽고디비의 불편한 기능들이 있기에 몽구스가 있는 것!
  - 대표적으로 몽구스에서는 **schema**를 도입해서 실수를 줄여줌
  - JOIN 기능 추가

※ Mongoose에서 Schema를 사용하면서, 기존의 자유로운 데이터 타입 대신 JSON을 사용해야 함!

※ Sequelize와 함께 사용할 경우 타입들이 많이 달라서 헷갈리게 되기 쉬우므로 타입들을 잘 알아둘 것!

- ES2015 프로미스 문법과 강력하고 가독성이 높은 쿼리 빌더 지원
- 몽구스는 `_id`를 기본 키로 생성하므로 스키마 작성 시 명시해줄 필요가 없음
- `String` `Number` `Date` `Buffer` `Boolean` `Mixed` `ObjectId` `Array`를 값으로 가질 수 있음
- `Ref`를 사용해서 RDBMS의 JOIN 기능 구현
- `populate`을 사용하면 ObjectID의 실제 객체를 반환해줌
- mongosh를 사용하면 데이터 수정 시 `$set`을 꼭 붙여줘야 하지만 mongoose에선 필요 없음
  - mongosh에서 `$set`을 안쓰면 데이터 전체가 수정됨

※ Mongoose template

- https://github.com/nmin11/Node.js-masterbook/tree/main/mongo
