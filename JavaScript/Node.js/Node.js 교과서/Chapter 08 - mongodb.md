※ JOIN 기능은 없지만 대신 aggregate 기능이 있음

- mongoose에서도 `populate` 메소드를 통해 어느 정도 JOIN 기능을 보완하여 제공

※ 몽고 컴퍼스는 무척 간편하지만 복잡한 쿼리를 쓸 때를 위해서 몽고 shell 사용법을 익혀둬야 함!

※ 기본적으로는 JS의 자료형을 따르면서, 추가적인 자료형도 제공

- `Date`, 정규표현식 같은 JS 객체
- `Binary Data` `ObjectId` `Int` `Long` `Decimal` `Timestamp` `JavaScript` 등 추가적인 자료형
  - 이 중에서도 `ObjectId` `Binary Data` `Timestamp` 외에는 잘 사용되지 않음
  - `ObjectId`는 primary key와 비슷한 역할
- `Undefined` `Symbol`은 사용되지 않음!

## Mongoose 사용하기

- ODM(Object Document Mapping)
- 몽고디비 자체가 JS임에도 불구하고 몽고디비의 불편한 기능들이 있기에 몽구스가 있는 것!
  - 대표적으로 몽구스에서는 **schema**를 도입해서 실수를 줄여줌
- ES2015 프로미스 문법과 강력하고 가독성이 높은 쿼리 빌더 지원
