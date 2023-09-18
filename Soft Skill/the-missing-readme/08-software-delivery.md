## 4 steps of software delivery

Build ⇒ Release ⇒ Deploy ⇒ Rollout

- 사실 딜리버리를 위해 정해진 업계 표준은 없지만 본 책에서는 이 4단계를 기본 구조로 잡고 설명
- package
  - 소프트웨어는 반드시 패키지로 **build** 되어야 함
  - 패키지는 반드시 불변이며 버전이 지정되어야 함
  - 패키지는 생성 후 반드시 **release** 되어야 함
- 릴리스 과정에서 릴리스 노트 및 변경 로그가 업데이트되어야 함
- 릴리스 후 패키지를 중앙식 리포지토리로 발행
- 발행된 릴리스는 테스트 환경이나 프로덕션 환경으로 **deploy** 되어야 함
- 배포된 소프트웨어는 install 되었을 뿐 상용화된 상태가 아님
- 상용화를 위해 **rollout**
- 롤아웃 후 사용자 피드백 수집, 버그 발견, 새로운 제품 요구사항 반영
  - 이를 바탕으로 다시 delivery 단계들 시작
- 각 딜리버리 단계들을 위한 일련의 권장 기법이 존재

## source control branching strategy

- release package: 버전 제어 시스템의 코드로부터 빌드
- trunk: 변경 이력을 가진 주 버전의 코드 베이스
- branch: 코드 수정을 위해 트렁크로부터 가지를 쳐서 나온 것
  - 개발자들이 브랜치에서 병렬적으로 작업하고 준비가 되면 트렁크로 변경사항 merge
- 다양한 브랜칭 전략마다 브랜치 유지 기간이나 릴리스 버전 등에 대한 나름의 정의가 있음

trunk-based

- 모든 개발자가 트렁크로부터 브랜치를 생성
- 브랜치는 작은 기능, 버그 수정, 업데이트 등을 위해 사용됨
- 개발자가 브랜치를 공유하지 않으며, 시간 단위가 아닌 일 단위의 신속한 merge가 많은 환경에 적합
- 자주 merge하는 방식을 CI(Continuous Integration)라고도 함
- 각 개발자들이 최신 버전의 코드로부터 벗어나 있는 시간이 줄어드니 위험도 줄일 수 있음
- 반면에 트렁크에 버그가 존재하면 모든 개발자의 개발 속도가 느려짐
  - 그래서 merge 이전에 자동화된 테스트 기능 필요
- 보통 트렁크는 항상 릴리스 가능한 상태를 유지하고, 릴리스도 자주 일어남

feature branch-based

- 기능 브랜치가 상당히 오래 유지되면서 여러 개발자가 함께 작업
- 각 기능 브랜치는 제품의 특정 기능과 관련됨
- 기능 브랜치가 outdated 되지 않도록 rebase를 수행해야 함
  - 기능 브랜치의 안정성도 rebase 수행 시점에 관리해야 함
- 릴리스 준비가 되면 기능 브랜치를 릴리스 브랜치로 가져옴
- 트렁크의 코드가 불안정해서 트렁크를 안정화시키면서 기능도 개발해야 할 때 사용하는 방법

⇒ service-oriented system 이라면 일반적으로 trunk-based 개발 전략을 채택!

**Gitflow**

- 2010년 빈센트 드리센이 소개한 가장 보편적인 기능 브랜치 전략!
- `develop` `hotfix` `release` 브랜치 사용
- develop: 기능 브랜치를 merge하고 rebase하는 주 브랜치
- release
  - 릴리스 준비가 되었을 때 develop 브랜치로부터 가지 치기
  - 릴리스 안정화 도중 개발 업무는 기능 브랜치에서 진행
  - 릴리스 안정화 이후 트렁크로 merge
- hotfix
  - 심각한 버그로 인해 트렁크가 불안정해졌을 때 통상적인 릴리스 절차 없이 즉시 수정
  - 버그 수정 후 hotfix 브랜치를 트렁크와 develop 브랜치 양쪽에 merge

## build

- 의존성 해석 및 linking, 린터 실행, 컴파일, 테스트, 소프트웨어 패키징 등 여러 단계로 구성
- 대부분의 빌드 단계는 개발 과정에서도 사용
- 여러 플랫폼 및 환경을 위해 여러 개의 패키지를 생성할 수도 있음
  - 대부분 OS, CPU 아키텍처, 언어 런타임에 따라 다양한 패키지 생성
- 패키지의 내용물과 구조
  - 바이너리, 소스 코드, 의존성, 설정, 릴리스 노트, 문서, 미디어, 라이선스, 체크섬, 가상 머신 이미지 등
- 애플리케이션 패키지
  - 보통 zip, tar, dmg, exe 등의 파일로 생성
- 컨테이너 및 머신 패키지
  - 소프트웨어를 실행하는 환경 자체를 빌드할 수 있음

### package version

- 패키지에는 버전을 명시해야 하고 고유한 식별자를 할당해야 함
- 어떤 버저닝 전략을 채택할지 애매하다면 semantic versioning!

### resource packaging

- 소프트웨어는 설정, 스키마, 이미지, 언어 팩 등을 모두 포함
- 각각의 리소스는 서로 다른 릴리스, 빌드 타임, 테스트 및 검증 방식이 필요
- 각 리소스를 별도로 패키징하면 전체 패키지를 재빌드하지 않고도 필요한 부분만 수정할 수 있음
  - 독립적인 rollout 및 rollback!
- meta-package
  - 고객에게 제공되는 완전한 애플리케이션으로서의 최종 패키지
  - 패키지들의 패키지
  - 각 패키지는 별도로 업그레이드가 가능

## release

- 소프트웨어 종류 및 크기, 사용자 숙련도에 따라 다양한 방법으로 수행
- 내부 프로젝트라면 소프트웨어 패키지를 공유 패키지 리포지토리에 발행하는 한 단계로 끝나기도 함
- 반면 사용자가 직접 사용한다면 다양한 절차가 필요
  - 산출물 발행
  - 문서 업데이트
  - 릴리스 노트
  - 사용자와의 소통
- 릴리스 관리: 안정적이고 문서화가 잘된 소프트웨어를 예측 가능한 시점에 발행하는 기술
  - 고객 만족도와 직결되는 요소
  - 여러 팀이 복잡한 소프트웨어를 개발하는 경우 릴리스 관리 담당 인력을 별도로 배치하기도 함
  - 릴리스 관리자: 테스트, 기능 검증, 보안 절차, 문서화 등의 절차 조율

### release repository

- 릴리스 패키지는 대부분 패키지 리포지토리에 발행하거나 버전 제어 시스템에 tag로 생성하곤 함
- 그러나 가능하면 릴리스 전용 패키지 리포지토리에 발행하는 것이 좋음
- 릴리스 리포지토리: 수천 명의 사용자가 동시에 새로운 릴리스를 다운로드할 수 있도록 하는 용도
- 버전 제어 시스템만을 활용하면 운영 이슈가 생길 수 있고, 개발자 도구가 성능에 영향을 미칠 수 있음

### immutability

- 릴리스 패키지 발행 이후 절대 변경하거나 덮어쓰지 말 것
- 동일한 버전의 모든 애플리케이션은 완전히 동일한 코드를 실행하도록 보장되어야 함

### release often

- 릴리스 주기가 길면 테스트를 위한 충분한 시간이 있는 것 같아져서 늘어짐
- 릴리스 주기가 짧아지면
  - 버그가 발견됐을 때 더 빠르고 쉽게 처리 가능
  - 매 주기마다 변경사항의 수가 더 적어지므로 위험도가 낮아짐
  - 개발자 입장에서도 새로운 코드이므로 어떤 수정이 필요한지 파악이 빨라짐

### release schedule

- 매 분기든 매년이든 마일스톤 기반이든 릴리스 일정은 명확히
- 사용자에게 언제 새로운 릴리스가 발행될지 알려줄 것

### change log & release note

- 릴리스에 어떤 변경사항이 반영되었는지 사용자 및 고객지원팀이 이해할 수 있게 하는 용도
- change log
  - 커밋한 모든 티켓 나열
  - 커밋 메시지 및 이슈 트래커 레이블을 통해 변경사항 자동 추적 필요
  - 주로 고객지원팀을 위한 것
- release note
  - 새로운 기능 및 버그 수정에 대한 요약 내용 기록
  - 주로 사용자를 위한 것

⭐ release process of Apache Software Foundation

- 매우 철저하며 실질적인 릴리스 절차 가이드라인을 갖고 있음
- 라이선스 기록 절차
  - 모든 프로젝트는 릴리스 관리자를 선정해서 릴리스를 수행
  - 릴리스에는 소스 코드, 바이너리 패키지 포함
  - 릴리스 관리자는 암호화 키를 이용해서 산출물에 서명
  - 사용자는 서명을 통해 패키지가 아파치에서 제공한 것인지 검증 가능
  - 손상 감지를 위한 checksum 포함
  - 소프트웨어 라이선스와 저작권을 위한 LICENSE 및 NOTICE 파일도 포함
  - 모든 소스 파일의 첫머리에 라이선스 명시
  - 릴리스 관리자가 릴리스 후
- 릴리스 검증 절차
  - 릴리스 관리자가 릴리스 후보를 '선언'
  - 패키지 생성
  - PMC(Project Management Committee) 구성원들이 투표 전 최종 산출물 검증
    - checksum, 서명, 인수 테스트 통과 여부 확인
  - PMC가 릴리스 후보를 채택할지 거부할지를 투표로 결정
  - 릴리스 후보가 채택되면 산출물을 https://downloads.apache.org 에 등록
  - 릴리스 완료 후 릴리스 관리자의 발행 업무
    - 아파치 프로젝트 메일링 리스트에 발표
    - 프로젝트 웹사이트에 릴리스 노트, 변경 로그, 새 문서 및 블로그 게시글 등을 발행
- references
  - https://www.apache.org/dev/#release
  - https://spark.apache.org/release-process.html

## deploy

### automatically

- 소프트웨어 배포는 직접 수행하지 말고 스크립트를 통해 자동화해라
  - 예측 가능한 배포 구현 가능
  - 배포 실패 이유를 유추할 수 있음
  - 사람보다 실수할 확률이 적고 시스템에 직접 손을 대는 것을 방지할 수 있음
- CD(Continuous Delivery)
  - 자동화를 고도화하면 사람을 배포 절차에서 완전히 배제할 수 있음
  - 패키징, 테스팅, 릴리스, 배포, 롤아웃까지 모두 자동화 가능
  - 사용자에게 더 신속하게 기능을 전달하고 피드백을 받을 수 있음
  - CD 적용을 위해 테스트 자동화, 도구 자동화, 기반 고객 필요
- 잘 만들어진 배포 자동화 도구를 사용하자
  - 직접 스크립트를 작성하면 시작은 쉽지만 금세 거추장스러워짐
  - Puppet, Salt, Ansible, Terraform 등
- 배포를 완전 자동화는 못하더라도 사람의 개입 범위를 최소화해라

### atomically

- 인스톨 스크립트는 여러 단계로 구성되는 경우가 많음
- 따라서 예상치 못한 오류로 애플리케이션 일부만 배포될 수도 있음
- 이를 방지하기 위해 애플리케이션을 완전히 배포하거나 아무것도 배포하지 않도록 만들어야 함
- 배포 실패 시 기존의 패키지를 유지하도록
- 가장 쉬운 방법
  - 기존 소프트웨어를 덮어쓰지 말고 다른 경로에 신규 소프트웨어 설치
  - 설치 성공 이후 shortcut이나 symbolic link를 통해 교체
  - 이렇게 하면 rollback도 쉬워짐
- 경우에 따라 한 소프트웨어의 여러 버전을 같은 머신에서 동시 실행할 수도 있음

### independently

- 여러 애플리케이션이 유기적으로 연결되어 있는 경우 애플리케이션마다 배포를 순서대로 진행해야 하는 문제 발생
- 배포는 순서에 상관없이 가능하도록 만들어야 함
- 서로 다른 애플리케이션들이 서로 의존적이지 않도록 해야 함

## rollout

- 새 코드 배포 후 한 번에 모든 사용자에게 코드를 롤아웃하는 것은 위험
- 점진적으로 롤아웃하고 지표를 모니터링하길 권장
- 롤아웃 전략들: feature flag, circuit breaker, dark launch, canary deployment, blue-green deployment 등
- feature flag: 각 코드 경로에 대해 사용자 비율을 제어할 수 있음
- circuit breaker: 문제 발생시 자동으로 코드 경로 변경
- dark launch, canary/blue-green deployment: 동시에 여러 버전의 소프트웨어 실행
- 하지만 너무 복잡한 롤아웃 전략 채택은 금물 ⇒ 운영 복잡도 증가

### monitoring

- 롤아웃 시 에러울, 응답 시간, 리소스 사용량 등 상태 지표를 모니터링할 것
- 자동화 도구도 있지만 통계값과 롤아웃 과정을 반드시 관찰해야 함
- 롤아웃 범위를 로그와 지표에 따라 결정하는 경우가 보편적
- SLI(Service Level Indicator) 지표가 저하되는지 여부를 주시하자

### feature flag

- boolean 및 if 를 활용해서 허용 목록이나 퍼센트 기반으로 기능이 적용되도록 하기
- 플래그를 동적으로 결정하는 함수는 주로 런타임에 주입
- 상태를 변경하는 코드라면 각별히 주의할 것
  - 가급적 데이터를 격리해서 사용할 것
- 코드가 어지럽혀지므로 롤아웃 후 반드시 정리해야 함
- A/B 테스팅이라고도 불림
  - 사용자가 통계적으로 유의미한 방식으로 그룹화되어 있을 때 유용

### circuit breaker

- latency나 예외 등의 이벤트에 의해 자동으로 제어되는 기능 플래그
- 성능이 저하되고 있는 상황에서 시스템을 보호하기 위해 사용

### canary deployment

- 석탄 탄광에서 유독 가스 존재 여부를 확인하기 위해 사용했던 카나리아 새에서 유래
- 대규모 트래픽을 처리하며 수많은 인스턴스에 배포되는 서비스에 활용
- 새 버전의 애플리케이션을 제한된 수의 머신에만 배포
- 새 버전의 애플리케이션의 조기 경보 시스템

### blue-green deployment

- 새 버전의 애플리케이션을 active 상태로, 기존 버전의 애플리케이션을 passive 상태로 운영
- 새 애플리케이션에 문제가 생기면 passive 상태의 머신에서 다시 active 상태 운영
- 보통 릴리스가 안정적이라고 판단되면 passive 환경을 제거
- 카나리와 달리 반드시 한 쪽이 100%의 트래픽을 처리해야 함
- 그러므로 문제 발생시 신속하게 두 환경을 병렬로 교체할 수 있는 능력이 매우 중요

### dark launch

- traffic shadowing 이라고도 불림
- 최종 사용자는 볼 수 없는 상태에서 새로운 코드를 실제 트래픽에 노출하는 방법
- 그래서 다크 코드가 잘못 동작해도 사용자에게 별 영향이 없음
- 사용자의 영향을 최소화하면서 소프트웨어가 프로덕션 환경에서 어떻게 실행되는지 파악할 수 있음
- 복잡한 변경사항 릴리스에 유용
- 시스템 마이그레이션 검증에 유용
- 원리
  - 실제 트래픽과 애플리케이션 사이에 애플리케이션 프록시를 둠
  - 프록시는 요청을 다크 시스템으로 복제
  - 두 시스템으로부터 받은 응답을 비교하고 차이점 기록
  - 사용자는 프로덕션 시스템의 응답만 받음
- 다크 읽기 모드는 데이터 변경을 하지 않으니 별 문제 없음
- 다크 쓰기 모드는 완전히 독립적인 데이터스토어를 사용해야 함
- 다크 시스템으로의 트래픽 분석, 이중 과금 등의 부수 효과를 처리해야 함
  - Istio 같은 service mesh 혹은 Gloo 같은 API G/W는 이런 동작을 자체적으로 지원
- Diffy는 다크 트래픽을 3개의 백엔드 서비스 인스턴스로 보낼 수 있음