## 1. 시스템 아키텍쳐

| 항목                                                 |    중요도    | 포지션 |  난이도  |
| :--------------------------------------------------- | :----------: | :----: | :------: |
| JWT를 이용한 로그인 구현                             | Bare Minimum | FE, BE |    ⭐    |
| Authorization(권한)에 따른 기능 접근 제한            | Bare Minimum | FE, BE |    ⭐    |
| OAuth 2.0을 이용한 소셜 로그인                       | Recommended  | FE, BE |    ⭐    |
| TypeScript 사용                                      |   Advanced   |   FE   |  ⭐⭐⭐  |
| next.js를 사용한 SSR 적용                            |   Advanced   |   FE   |  ⭐⭐⭐  |
| AWS lambda를 사용한 Serverless 아키텍쳐 도입         |   Advanced   |   BE   |  ⭐⭐⭐  |
| React custom hook 만들어서 쓰기                      |   Advanced   |   FE   |  ⭐⭐⭐  |
| socket.io를 이용한 실시간 통신                       |  Nightmare   | FE, BE | ⭐⭐⭐⭐ |
| redis를 이용한 캐싱                                  |  Nightmare   |   BE   | ⭐⭐⭐⭐ |
| Create React App을 사용하지 않고 빌드 과정 직접 구성 |  Nightmare   |   FE   | ⭐⭐⭐⭐ |
| 카프카를 사용한 메시지 기능 구현                     |  Nightmare   |   BE   | ⭐⭐⭐⭐ |
| Spring Boot가 아닌 Spring5를 이용한 프로젝트 구성    |  Nightmare   |   BE   | ⭐⭐⭐⭐ |

</br>

## 2. UI / UX

| 항목                                                       |        중요도        | 포지션 |   난이도   |
| :--------------------------------------------------------- | :------------------: | :----: | :--------: |
| 회원가입, 로그인, 로그아웃, 마이페이지, 회원탈퇴 기능 구현 |     Bare Minimum     | FE, BE |     ⭐     |
| 소셜 로그인 외 서비스 자체 회원가입 기능 구현              |     Bare Minimum     |   FE   |     ⭐     |
| 회원가입 없이 체험 형식으로 가볍게 기능 이용하는 장치 마련 | Bare Minimum (Final) |   FE   |     ⭐     |
| 회원 탈퇴나 리소스 삭제 시 confirm 모달 제공               |     Recommended      |   FE   |     ⭐     |
| 마이페이지를 통해 사용자 개인정보 수정 기능 제공           |     Bare Minimum     |   FE   |     ⭐     |
| (소셜 로그인이 아닌 경우) 비밀번호 수정 기능 제공          |     Bare Minimum     |   FE   |     ⭐     |
| 라이브러리를 사용하지 않고 React 컴포넌트 직접 작성        |     Bare Minimum     |   FE   |    ⭐⭐    |
| 검색 필터링 기능                                           |     Recommended      | FE, BE |   ⭐⭐⭐   |
| 데이터를 API로 받아와서 리스트 구현                        |     Recommended      |   FE   |    ⭐⭐    |
| 3rd-party API 호출                                         |     Recommended      |   FE   |     ⭐     |
| 모바일 환경 대응 및 반응형 웹                              |     Recommended      |   FE   |    ⭐⭐    |
| S3 파일 업로드                                             |     Recommended      | FE, BE |   ⭐⭐⭐   |
| 회원가입 시 인증 메일 발송                                 |     Recommended      | FE, BE |   ⭐⭐⭐   |
| reCAPTCHA 사용                                             |       Advenced       |   FE   |    ⭐⭐    |
| cron에 의한 메일 전송                                      |       Advanced       |   BE   |   ⭐⭐⭐   |
| 위치 기반 기능                                             |       Advanced       | FE, BE |   ⭐⭐⭐   |
| 국제화(i18n) 적용                                          |       Advanced       |   FE   |   ⭐⭐⭐   |
| 무한 스크롤                                                |       Advanced       |   FE   |   ⭐⭐⭐   |
| 스크롤에 의한 애니매이션 적용 (greensock 추천)             |       Advanced       |   FE   |   ⭐⭐⭐   |
| Socket.io를 이용한 채팅 기능                               |       Advanced       | FE, BE |  ⭐⭐⭐⭐  |
| pdf 리포트 생성                                            |       Advanced       | FE, BE |   ⭐⭐⭐   |
| 지도 API 사용 (오버레이, 핀)                               |       Advanced       |   FE   |  ⭐⭐⭐⭐  |
| 라이브러리를 사용하지 않고 드래그 앤 드랍 구현             |       Advanced       |   FE   |  ⭐⭐⭐⭐  |
| d3를 이용한 시각화                                         |       Advanced       |   FE   |  ⭐⭐⭐⭐  |
| fuzzy 검색                                                 |       Advanced       |   BE   |  ⭐⭐⭐⭐  |
| Canvas, SVG를 활용한 동적 이미지 표시                      |       Advanced       |   FE   | ⭐⭐⭐⭐⭐ |
| 추천 시스템 구현                                           |       Advanced       |   BE   | ⭐⭐⭐⭐⭐ |
| lighthouse 각 항목 70점 이상 통과 (PWA 제외)               |       Advanced       |   FE   | ⭐⭐⭐⭐⭐ |

</br>

## 3. 스키마 및 API

| 항목                                               |    중요도    | 포지션 |  난이도  |
| :------------------------------------------------- | :----------: | :----: | :------: |
| N:M 관계 적용                                      | Bare Minimum |   BE   |    ⭐    |
| ERD 작성                                           | Bare Minimum |   BE   |    ⭐    |
| API 작성 툴을 사용하여 요청/응답 및 JSON 형식 서술 | Bare Minimum |   BE   |   ⭐⭐   |
| ORM 사용 (sequelize, typeorm 추천)                 | Recommended  |   BE   |    ⭐    |
| 이유 있는 NoSQL 도입                               | Recommended  |   BE   |   ⭐⭐   |
| 페이지네이션 구현                                  | Recommended  |   BE   |  ⭐⭐⭐  |
| GraphQL 장점을 반영해서 적용                       |  Nightmare   | BE, FE | ⭐⭐⭐⭐ |

</br>

## 4. DevOps

| 항목                                           |    중요도    | 포지션 | 난이도 |
| :--------------------------------------------- | :----------: | :----: | :----: |
| precommit 단계에서 semistandard 적용           | Bare Minimum | FE, BE |   ⭐   |
| Github commit message 규칙 합의                | Bare Minimum | FE, BE |   ⭐   |
| 버전 규칙 합의                                 | Bare Minimum | FE, BE |   ⭐   |
| PR 형식 합의                                   | Recommended  | FE, BE |   ⭐   |
| 배포 자동화 설정                               | Recommended  |   BE   |   ⭐   |
| 도메인 구매 및 HTTPS 배포                      | Recommended  |   BE   | ⭐⭐⭐ |
| 테스트 코드 작성                               | Recommended  |   BE   | ⭐⭐⭐ |
| w3c validator 통과                             | Recommended  |   FE   | ⭐⭐⭐ |
| husky로 commit message 규칙 자동 체크          |   Advanced   | FE, BE | ⭐⭐⭐ |
| Docker를 이용한 개발 환경 구칙 및 전 팀원 사용 |   Advanced   |   BE   | ⭐⭐⭐ |
