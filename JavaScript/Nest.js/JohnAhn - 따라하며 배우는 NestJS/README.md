## Module

- 모듈은 밀접하게 관련된 기능들의 집합
- 기본적으로 싱글톤 → 여러 모듈 간 공유 가능
- AppModule은 모든 모듈의 루트 모듈
- `nest g module <name>` : 기본 모듈 생성 명령어

## Controller

- 지정한 경로로 요청을 전달 받음
- HTTP 메소드를 데코레이터로 이용한 핸들러 함수들을 가짐
- `nest g controller <name> --no-spec` : 기본 컨트롤러 생성 명령어
  - `--no-spec` : 테스트 파일 생성 X

## Provider

- 대부분의 기본 서비스, 리포지토리, 팩토리, 헬퍼 등은 프로바이더로 취급됨
- 주로 의존성 주입을 위해 사용
- module에 등록해야 사용 가능

## Service

- `@Injectable()` 데코레이터로 선언
  - 해당 서비스를 앱 전체에서 사용할 수 있게 해줌
  - 단, 의존성을 주입해야만 사용할 수 있음
- `nest g service <name> --no-spec` : 기본 서비스 생성 명령어

## @Body() 데코레이터

- POST 요청의 body를 가져옴
- `@Body('title')` 방식으로 특정 필드만 가져올 수도 있음

## DTO(Data Transfer Object)

- 요청 및 응답 데이터의 형식을 정의
- interface 혹은 class로 정의 가능
  - NestJS에서는 class를 권장
- 데이터 유효성을 체크하는 데 사용됨
- 여러 군데에서 사용되는 프로퍼티의 이름이 변경되는 경우 유지보수가 편리

## Pipe

- `@Injectable()` 데코레이터가 달린 클래스
- data transformation, data validation 등을 수행
- 컨트롤러 메소드의 파라미터에 적용 가능
- 메소드 호출 직전에 파이프를 삽입하고, 파이프는 메소드로 향하는 인수를 받아서 작동

### Pipe 사용 방법

- Handler-level pipe
  - `@UsePipes(ValidationPipe)` 데코레이터로 사용
  - 핸들러의 모든 파라미터에 적용
- Parameter-level pipe
  - `@Body('column', ParseIntPipe)` 데코레이터로 사용
  - 특정 파라미터에만 적용
- Global-level pipe
  - `app.useGlobalPipes(new ValidationPipe())` 메소드로 사용
  - 애플리케이션 전체 적용

### Built-in Pipes

NestJS 기본 6개 파이프

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

### Custom Pipe

- `PipeTransform` 인터페이스를 구현해서 만들 수 있음
- 모든 파이프는 `transform()` 메소드를 구현해야 함
  - 해당 메소드는 NestJS가 파이프를 실행할 때 인자를 처리하기 위해 호출됨
  - value: 파이프가 처리할 인자
  - metadata: 파이프가 처리할 인자의 메타데이터
  - 메소드에서 리턴된 값은 핸들러 메소드로 전달됨

## TypeORM

- node.js에서 실행되고 TypeScript로 작성된 객체 관계 매핑(Object-Relational Mapping) 라이브러리
- 여러 DB를 지원하는 매퍼
- 객체와 관계형 DB의 데이터 변형 및 연결
- 모델을 기반으로 DB 테이블 생성 및 관리
- DB에서 개체를 쉽게 CRUD 할 수 있음
- 테이블 간의 매핑을 통해 객체 간의 관계를 쉽게 관리
- 간단한 CLI 명령 제공
- NestJS에서 사용하기 위해 `@nestjs/typeorm` 패키지 설치 필요
- Entity 클래스를 통해 DB 테이블을 정의
  - `@Entity()` 데코레이터로 클래스 선언
- Repository 클래스를 통해 Entity 클래스를 조작
  - `@InjectRepository(Entity)` 데코레이터로 클래스 선언
  - DB와 관련된 일은 Repository 클래스를 통해 수행하며 이를 Repository 패턴이라고 함

### remove vs delete

- remove: 무조건 존재하는 것을 삭제하며, 존재하지 않는 경우 404 에러 발생
- delete: 존재하는 것을 삭제하거나 존재하지 않는 경우 아무런 동작도 하지 않음
- delete을 활용해야 DB 호출을 한번만 할 수 있음

```ts
const result = await this.boardRepository.delete(id);
if (result.affected === 0) {
  throw new NotFoundException(`Board with ID ${id} not found`);
}
```

## Middleware

- Pipes: 요청 유효성 검사, 데이터 변환 등
- Filters: 예외 처리
- Guards: 요청 처리 전 인증 및 권한 부여
- Interceptors: 요청 처리 후 응답 변환, 응답 매핑 및 캐시 관리
- middleware → guard → interceptor(before) → pipe → controller → service → controller → interceptor(after) → filter → client

### @UseGuards()

- `@nestjs/passport` 패키지를 통해 토큰 검증 및 사용자 정보 조회 가능
