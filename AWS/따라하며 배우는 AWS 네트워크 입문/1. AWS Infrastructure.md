# AWS Introduce

## What is cloud?

- Cloud: 인터넷을 통해 언제 어디서든 원하는 만큼의 IT 리소스를 손쉽게 사용할 수 있게 하는 서비스

### Cloud service types

**IaaS (Infrastructure as a Service)**

- 클라우드 사업자 제공: 서버, 네트워크, 스토리지
  - 가장 기본적인 IT 자원들
- 사용자: 가상 서버에 필요한 프로그램 설치 후 사용 및 운영
- Related to: EC2, VPC, EBS

**PaaS (Platform as a Service)**

- 클라우드 사업자 제공: 기본 IT 자원 + middleware + runtime
- 사용자: 개발에 집중
- Related to: Elastic Beanstalk

**Serverless platform**

- 클라우드 사업자 제공: 애플리케이션 개발에 필요한 대부분의 것들
- 사용자: 개발에 집중
- Related to: Lambda, API Gateway

**SaaS (Software as a Service)**

- 클라우드 사업자 제공: SaaS 개발을 할 수 있도록 리소스 및 다양한 지원 제공
- 사용자: 활용만 잘 하면 됨

<br>

## AWS cloud introduce

_AWS 클라우드 규모에 따른 구분_

Global Infrastructure > Region (Edge) > Availability Zone > Data center

**Data center**

- 건물 내에 물리 영역, IT 인프라 영역, 운영 영역으로 구분되어 있음

**AZ**

- 한 개 이상의 데이터 센터들의 모음
- 각 데이터 센터는 분산되어 있고, Metro Fiber(초고속 광통신 전용망)로 연결됨

**Region**

- 해당 지리적 영역 내에서 물리적으로 분리된 여러 AZ의 모음
- 최소 2개 ~ 최대 6개 AZ
- 장애 극복을 위해 multi-AZ 활용이 권장됨

**Edge POP(Point of Presense)**

- 외부 인터넷과 AWS 글로벌 네트워크망을 연결하는 별도의 센터
- Edge Location과 Regional Edge Cache로 구성됨
- Related to:
  - CDN service of CloudFront
  - Direct Connect
  - DNS of Route 53
  - DDoS Protection of AWS Shield
  - AWS Global Accelerator
