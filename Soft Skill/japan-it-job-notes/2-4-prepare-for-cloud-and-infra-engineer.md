# 2-4. 클라우드와 인프라 엔지니어의 성장 가능성

## 일본 기업의 클라우드 전환은 이제 선택이 아니다

- 일본 기업이 클라우드 전환을 하는 가장 큰 이유: **속도와 유연성**
- 트래픽 변동에 민첩하게 대응하는 경쟁력
- IaC, 컨테이너, 오케스트레이션, CI/CD, 모니터링 자동화까지 통합으로 다룰 수 있는 인재가 여전히 부족

## AWS, Azure, Google Cloud 수요의 차이

- AWS가 가장 널리 사용됨
  - EC2, S3, RDS, Lambda, CloudFront, ECS, EKS 등
- Azure는 대기업 및 엔터프라이즈 시장에서 강함
  - Microsoft 365, Active Directory, Windows Server, SQL Server 등 기반의 기존 시스템과 함께 사용됨
  - 특히 제조, 금융, 보험 계열 IT 회사들에서 사용
- Google Cloud는 데이터 분석, AI, 머신러닝, 대규모 데이터 처리 분야에서 주목받음
  - BigQuery, Vertex AI, Dataflow, Pub/Sub 등 사용
- 중요한 것은 하나를 깊게 아는 것 보다는 클라우드 공통 원리를 이해하는 것
  - 네트워크, 권한 관리, 스토리지, 컴퓨팅, 보안, 모니터링, 비용 최적화 등

## Kubernetes와 DevOps가 몸값을 바꾸는 이유

- 최근 일본 시장에서 Kubernetes 경험이 강력한 차별점이 되고 있음
  - 많은 기업이 VM 기반 운영 → 컨테이너 기반 배포로 전환 중
  - 마이크로서비스 구조를 도입하려는 움직임도 커지고 있음
- Docker 수준을 넘어 Kubernetes 클러스터 운영, 배포 전략, 서비스 디스커버리, 오토스케일링, 롤백, 헬스체크를 다룰 수 있다면 지원 가능 기업의 범위가 크게 확장됨
- DevOps 엔지니어는 개발 생산성과 운영 안정성을 동시에 개선
- 일본에서 선호되는 도구들: Terraform, Ansible, GitHub Actions, GitLab CI, Jenkins, Argo CD, Prometheus, Grafana, Datadog

## 인프라 자동화는 연봉 상승의 핵심이다

- 연봉을 가르는 기준이 "운영할 수 있는가"에서 "자동화할 수 있는가"로 옮겨가고 있음
- 비용 최적화: 비용 분석, 예약 인스턴스, 오토스케일링, 서버리스, 로그 보관 정책 등

## 일본 취업을 위한 전략

- 먼저 리눅스, 네트워크, 데이터베이스의 기본기를 갖춰야 함
  - 클라우드는 결국 추상화된 인프라
  - TCP/IP, DNS, HTTP, 로드밸런싱, 방화벽, 서브넷, 라우팅을 알아야 함
- 그다음은 하나의 클라우드를 깊게 익히기
  - AWS 기준으로 VPC, IAM, EC2, RDS, S3, CloudWatch, ECS, EKS 실습
- 포트폴리오는 반드시 실제 운영 흐름을 보여줘야 한다
  - 인프라 구성: Terraform으로 VPC, 서브넷, 보안 그룹, 인스턴스 생성
  - 배포 자동화: GitHub Actions로 테스트와 배포 파이프라인 구성
  - 컨테이너 운영: Docker, Kubernetes, ECS, EKS 배포
  - 모니터링: Prometheus, Grafana, CloudWatch 지표 확인
  - 장애 대응: 로그 수집, 알림 설정, 롤백 절차 문서화
- 자격증도 도움이 된다
  - AWS Certified Solutions Architect, AWS SysOps Administrator
  - Azure Administrator
  - Google Cloud Associate Cloud Engineer

## 앞으로 더 커질 인프라 엔지니어의 기회

- AI 시대에 인프라의 중요성은 더 커진다
  - 대규모 연산 자원 필요
  - 데이터 파이프라인 구축
  - GPU 환경
  - 보안 체계
  - 배포 자동화
- MLOps 플랫폼 엔지니어링, 보안 기반 클라우드 운영은 앞으로 성장 가능성이 높음
