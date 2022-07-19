## npm

- Node Package Manager의 약어
- 다른 사람의 소스 코드를 활용해서 간편한 코딩이 가능해짐
- 오픈 소스 생태계
- 패키지 : npm에 업로드된 노드 모듈
- 모듈처럼 패키지 간의 의존 관계를 만들 수도 있음
- npm과 비슷한 yarn도 있으며, yarn은 주로 React 진영에서 주로 쓰임

<br>
<br>

## package.json

- 프로젝트 정보 및 패키지 정보를 담은 파일
- 패키지별 버전들이 기록되어 있으며, 버전에 따라 문제가 발생할 수도 있음
- 노드를 시작할 때 보통 `npm init`을 통해 이 파일을 먼저 만듦
- package name : 패키지 이름, package.json.name
- version : 패키지 버전, npm의 버전은 다소 엄격함
- entry point : JS 실행 파일 진입점, 보통 마지막으로 module.exports하는 파일로 지정, package.json.main
- test command : 테스트할 명령어, package.json.scripts.test
- git repository : Git 저장소 주소, package.json.repository
- keyword : npm 홈페이지에서 패키지를 쉽게 찾게 해줌, package.json.keywords

```json
{
  "name": "npmtest",
  "version": "0.0.1",
  "description": "hello package.json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ZeroCho",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.5",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.3",
    "rimraf": "^3.0.2"
  }
}
```

- scripts 부분은 npm 명령어를 저장해두는 부분
  - `npm run [order]`를 입력해서 실행
- `npm i [package name]`를 통해 패키지 설치
- 패키지를 설치하면 `node_modules`라는 폴더도 생성
- package.json은 node_modules와 연동되면서 의존관계를 만들어주는 것!
- `npm i -D` 옵션으로 패키지를 설치하면 `devDependencies` 속성으로 설치 가능
  - `devDependencies`의 패키지들은 개발 전용 패키지
- `npm i -g` 옵션으로 노드 전역에 설치 가능
  - Windows : C:\User\[user]\AppData\Roaming\npm
  - Mac : /usr/local/lib/node_modules
  - 관리자 권한 필요
  - package.json에 기록되지 않음
- node_modules의 파일들은 삭제해도 `npm i` 명령어를 통해 재설치 가능
  - package.json의 내용을 기반으로 재설치하게 됨
  - 따라서 node_modules는 보통 커밋하지 않음
- package-lock.json에서는 버전이 확실하게 명시되며, 설치한 패키지의 하위 패키지들 또한 확실하게 명시됨
  - 보통 건드릴 일이 없는 파일

<br>
<br>

## SemVer

- Semantic Versioning (유의적 버전)
- 노드 패키지의 버저닝 방식
- 버전을 Major / Minor / Patch 로 나눔
- `1.0.7`
- Major : 하위 버전과 호환되지 않는 수정사항이 있을 때 올림
  - 0인 경우 초기 개발 중이라는 뜻
- Minor : 하위 버전과 호환되는 수정사항이 있을 때 올림
- Patch : 버그 해결 시 올림
- 추가적으로 버전 앞에 기호를 더해서 의미를 더함
  - `^1.1.1` : Minor 버전까지만 업데이트 (2.0.0 업데이트 불가능)
  - `~1.1.1` : Patch 버전까지만 업데이트 (1.2.0 업데이트 불가능)
  - `^` 혹은 `~`가 없다면 아예 버전을 고정하겠다는 뜻
  - `>` `<` 등의 부등호로 버전의 범위 설정
    - `npm i express@>1.1.1`이면 반드시 1.1.1보다 높은 버전을 설치하겠다는 뜻
  - `@latest` : 최신
    - `x`라고도 표현 가능
  - `@next` : 불안정한 가장 최신 배포판
  - `alpha` `beta` `rc` 버전도 있음
- 노드의 규칙은 이렇지만 안 따르는 패키지들이 있을 수 있으므로 버전 변경 시마다 테스트를 꼭 해볼 것!
- 설치시 `npm i express@latest`와 같은 방식으로 설치

<br>
<br>

## npm 명령어들

- `npm outdated` : 어떤 패키지에 버전 변화가 있었는지 조회
- `npm uninstall [package]` : 패키지 제거
  - `npm rm`으로도 사용 가능
- `npm search [keyword]` : npm 패키지 검색
  - 사실 공식 사이트 https://npmjs.com 을 검색하면 편리
- `npm info [package]` : 패키지 세부 정보 파악
- `npm adduser` : npm 로그인, 패키지 배포 시 필요
  - `npm login`으로도 가능
- `npm whoami` : 로그인한 사용자 정보
- `npm logout` : 로그아웃
- `npm version [version]` : package.json의 버전을 올림
  - minor 버전을 1 올리는 예시 : `npm version 5.3.2, npm version minor`
  - package.json을 직접 수정하지 않고 이렇게 버전을 수정하면 git commit에 tag까지 붙여줌
- `npm deprecate [name] [ver] [msg]` : 해당 패키지 설치 시 경고 메시지 출력
- `npm publish` : 자신이 만든 패키지 배포
- `npm unpublish --force` : 배포한 패키지 제거, 24시간 이내에만 제거 가능
- `npm ci` : package-lock.json에 기반하여 패키지 설치
- 이외 명령어들 : https://docs.npmjs.com/cli/v8/commands
