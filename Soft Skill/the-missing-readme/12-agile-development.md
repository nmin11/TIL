sprint planning, daily stand up 같은 애자일 방법론의 주요 철학과 목적을 이해하자!

## agile manifesto

https://agilemanifesto.org

- 절차와 도구보다는 **각 개인 그리고 서로 간의 상호작용**
- 포괄적인 문서보다는 **동작하는 소프트웨어**
- 계약 협상보다는 **고객과의 협업**
- 계획을 따르기보다는 **변화에의 대응**

## frameworks

scrum

- 계획을 수정하는 체크포인트를 빈번하게 가지며 짧은 개발 주기 반복
- sprint
  - 개발 업무를 나누는 단위
  - 기간은 2주가 가장 보편적
- sprint planning
  - user story, task를 팀원들에게 할당
  - 계획이 끝나면 개발자들은 각자 맡은 업무 진행
- 진행 상황은 ticketing이나 issue 시스템을 이용해서 추적
- daily stand up
  - 매일 아침 짤막하게 업데이트를 공유하고 문제점을 논의
- review
  - sprint가 끝나면 완료한 작업을 리뷰
- retrospective
  - 새롭게 발견한 부분을 논의하며 지표를 확인하고 절차를 세밀하게 조정
  - 다음 sprint에 반영

kanban

- 백로그, 계획, 구현, 테스팅, 배포, 롤아웃 등 작업 항목이 변화해가는 모든 단계를 정의
- 필요에 따라 정의된 스테이지들은 조정되기도 함
- 각 스테이지별 WIP(Work In Progress) 개수 제한
  - 티켓 수 제한을 통해 새 업무 착수 전 진행 중인 업무 완료에 집중할 수 있음
- kanban board
  - 각 워크플로우 스테이지의 상태를 보여주는 열들로 구성된 대시보드
  - 태스크는 상태 변경에 따라 각 열 사이를 오감
  - 현재 진행 중인 업무를 가시적으로 표현
  - 특정 스테이지에 업무가 쌓여가는 문제를 식별하기에 좋음

scrumban

- 팀이 scrum과 kanban의 '이상적인 형태'를 모두 갖추는 것은 어려움
- 보통 일부 원칙만 채택하고 나머지는 무시하는 경우가 많음
- 하지만 애자일 방법론을 따른다면 유용한 소프트웨어 전달을 위해 계획 절차가 반드시 필요
- 기법보다는 목적에 집중
- 실험해보고 결과를 살펴보고, 제대로 동작하는 부분은 취하고 나머지는 버리자

## scrum

- 대부분의 팀이 어떤 형태로든 scrum을 채택하므로 어느 정도 더 깊이 이해해둘 필요가 있음!

### user story

- 사용자 관점에서 필요한 기능을 정의하는 특별한 종류의 티켓
- "나는 <사용자>로서 <목적>을 하기 위해 <기능>을 원한다."
- estimate: 스토리를 구현하는 데 필요한 노력의 정도를 추측한 값
- acceptance criteria: 어떤 것들을 충족해야 스토리가 완료되는지 정의
  - 개발자, 제품 관리자, QA 사용자 등이 해당 기능에 대해 동일한 수준으로 이해하는 데 도움이 됨
  - 각 인수 조건에 대해 명시적인 테스트를 작성하도록 노력하라
- 여러 개의 구현 티켓이나 하위 태스크를 가질 수 있음
- 불명확하거나 설계가 필요하면 **spike**가 필요
  - 특정 스토리 완료를 위해 일정 시간 내에 조사를 수행하기 위한 스토리
  - 조사 수행을 통해 설계 문서, 고려사항, 채택된 의사결정, 트레이드오프에 대한 평가 등이 완료되면 스파이크 스토리 완료

### task

- 하나의 스토리는 소요 시간 예측, 작업 분배, 구현 진도 추적 등을 위해 태스크 여러 개로 분리해야 함
- 업무를 작은 단위로 나누기 위해 필요한 것은 아주 상세한 설명 작성
  - 설명을 읽다보면 필요한 모든 태스크를 찾아낼 수 있도록

### story point

- 팀 전체가 동의한 작업량 단위
- 스프린트 업무량 = 개발자 수 X 스토리 포인트
  - 한 스프린트의 스토리 포인트를 모두 더한 값이 스프린트 업무량보다 커서는 안 됨
- 간혹 태스크 복잡도를 기준으로 스토리 포인트를 정하는 팀도 있음
- 이미 완료한 작업과의 상대 비교를 통해서 스토리 포인트를 산출하면 좋음

### backlog triage

- 주로 계획 회의 전에 시행
- 백로그: 앞으로 처리할 스토리 목록
- 스토리 내용을 최신화하고 우선순위 결정

### sprint planning

- 현재 스프린트 업무량은 이전 스프린트 업무량에 따라 결정
- 스프린트 계획이 끝나면 해당 스프린트는 일종의 lock 상태
  - 새로운 업무가 등장해도 lock 상태의 스프린트에는 들어올 수 없음 → 백로그 행
  - 개발자 업무의 예측용이성을 더욱 높여줌!
- 스프린트 계획을 무조건적으로 세워야 하는 것은 아님
  - 제품 관리자 없이 개발자가 모든 업무를 관리하는 경우도 있으므로
  - user story 대신 포괄적인 형식의 태스크나 티켓을 활용하는 팀도 많음

### daily stand up

- 서로의 진척사항 공유, 방해 요소 대응
- 보통 매일 오전에 15분가량 진행
  - 서서 할 수 있을 만큼 짧지만 굳이 서서 할 필요는 없음
- 한 사람씩 진척사항, 오늘 할 일, 스프린트에 영향을 줄 만한 이슈 공유
- 대면하는 동기 방식이 있고, 텍스트로 작성하는 비동기 방식이 있음
- 마치 정기적인 시스템 검사와 유사
- 문제를 해결하는 자리가 아님
  - 신속한 업무 내용 공유에 집중
- parking lot: 회의 후 추가적인 논의가 필요할 때 관심있는 사람끼리 모여 따로 얘기하는 것
- 회의 일정이 겹쳤을 때 건너뛰기도 함

### review

- 매 스프린트 사이에 진행
- 주로 데모와 프로젝트 리뷰 2개로 나뉨
  - 데모: 모든 팀원이 이번 스프린트에서 자신이 담당했던 업무를 보여줌
  - 프로젝트 리뷰: 목표와 비교해서 이번 스프린트에 대해 평가
- 진솔한 피드백을 제공하고 업무에 자부심을 가져야 하는 자리
- 보통 일주일 당 1시간
  - 2주 스프린트가 많으니 2주마다 2시간 정도가 적당
- 리뷰 준비에 너무 매달리지는 말 것
  - 자신이 담당했던 티켓들이 정확히 어떤 상태인지 공유
  - 공식적인 PT나 발표는 자제

### retrospective

애자일 선언문 12가지 원칙 중 하나

> 팀은 정기적으로 더 효율적으로 일할 수 있는 방법을 찾고 그에 따라 자신의 행동을 조정한다.

⇒ 회고가 바로 이 원칙을 위해 존재한다!

- 공유 → 우선순위 결정 → 문제 해결
  - 모든 팀원은 지난 스프린트에서 잘한 일과 못한 일을 공유
  - 못한 일들에 대한 우선순위 논의
  - 높은 우선순위의 문제들부터 어떻게 해결할지 방법 모색
- 회고 회의 전에 어떤 논의가 팀에 도움이 될지 생각해보자
- 리뷰와 회고를 혼동할 수 있음
  - 리뷰: 스프린트 동안 완료한 업무를 논의
  - 회고: 절차와 도구를 논의
- 리뷰, 회고, 스프린트 계획을 하나로 묶는 팀들도 있음

## roadmap

> "전투를 준비하다 보면 계획 따위는 아무런 쓸모가 없다는 점을 알게 된다. 하지만 그럼에도 계획은 없어서는 안 되는 것이다."
> ― 드와이트 데이비드 아이젠하워

- 2주 단위의 스프린트도 좋지만 중장기 계획을 세우는 것도 중요
- 보통 3개월 분기 단위로 구분
- 계획은 각 분기 시작 전에 수행
- 로드맵은 팀이 만들고 있는 것에 대한 장기적인 비전을 생각해보게 함
- 스프린트와 달리 로드맵은 계속해서 진화
  - 고객의 요구사항, 새로운 기술적 문제 등에 따라
  - 그렇기 때문에 스프린트 계획, 리뷰, 회고가 중요한 것