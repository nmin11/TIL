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
