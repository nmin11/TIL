2021 / 09 / 16

## EC2 Instance를 원격 제어하기 위한 SSH 연결

EC2 Instance 생성 시, SSH 연결을 위해서 키 페어를 생성해야 하는 과정이 있다.  
여기서 **SSH(Secure Shell) Protocol**은 PC와 PC가 Public Networt를 통해서 통신할 때, 보안상 안전하게 하기 위한 Protocol이다.  
EC2 Instance를 만들 때 키 페어를 생성하는 것은, 주고 받는 데이터를 암호화해서 해당 키 페어를 가지지 않은 사람은 통신되는 데이터를 알아볼 수 없게 하기 위한 조치이다.  
키 페어를 생성하게 되면 `.pem` 확장자를 가진 파일을 내려받게 되는데, 이는 AWS에서 빌린 컴퓨터를 원격으로 제어하기 위해 SSH 통신을 하고자 할 때 필요한 **Private Key**가 기록된 파일이다.  
따라서 `.pem` 파일은 관리에 유의해야 한다.

</br>

## Security Group

EC2를 통해 빌린 컴퓨터에 Java 및 Spring project clone 과정, 그리고 build 작업을 모두 마쳤다 해도, Security Group(보안 그룹)을 설정해주지 않으면 Spring project의 서버에 접근할 수 없다.  
보안 그룹은 AWS에서 임대한 Instance의 **가상 방화벽**이다.  
이 보안 그룹을 활용해서 **Inbound**와 **Outbound**에 대한 규칙을 설정할 수 있다.

</br>

**Inbound**는 EC2 Instance로 들어오는 트래픽에 대한 규칙이다.  
EC2 Instance 생성 시, 기본적으로 SSH 접속을 위한 규칙만 생성되어 있다.  
그러므로 따로 설정해주는 작업이 필요하다.

</br>

**Outbound**는 EC2 Instance에서 나가는 트래픽에 대한 규칙이다.  
EC2 Instance 생성 시, 기본적으로 나가는 모든 트래픽에 대해 허용한다.

</br>

## 정적 웹 호스팅 과정

간단하게 4가지 순서에 대해서 꼭 알아두자.

1. 정적 웹 페이지 빌드
2. 버킷 생성 후 정적 웹 사이트를 호스팅하기 위한 구성
3. 빌드된 정적 웹 페이지 업로드
4. 퍼블릭 액세스 차단 해제 및 정책 생성

</br>

## S3 with CLI

### 굳이 왜 CLI를 사용하는가?

AWS 콘솔에 접속할 필요가 없어지며, npm script와 함께 요긴하게 사용할 수 있다.  
그리고 CLI에서도 콘솔과 마찬가지로 객체 업로드, 정적 웹 호스팅, 버킷 정책 변경, 접근 권한 변경 등의 작업들을 해줄 수 있다.

</br>

### IAM (Identity and Access Management)

CLI에서 S3를 다루기 위해서는 우선, IAM이 필요하다.  
이는 버킷을 관리할 수 있는 권한을 취득해야 하기 때문이다.

</br>

IAM은 사용자 및 그룹의 권한을 부여하고 관리가 가능하도록 해주는 서비스이다.  
IAM을 통해서 다른 사용자들이 본인의 AWS에 로그인하고 작업에 사용할 수 있는 특정 권한만 가진 계정을 발급받을 수 있게 해주며, CLI, SDK 방식을 통해 AWS 외부에서도 서비스를 사용할 수 있는 계정을 만들게도 해준다.  
페이스북, 구글의 자격 증명을 연동하여 해당 서비스의 아이디로 AWS에 접근하는 것도 가능하다.  
또한 OTP와 같은 이중 보안을 사용할 수 있게 해주며, 서비스 자체는 무료로 제공된다.

1. AWS 계정에 대한 공유 액세스
2. 세분화된 권한 부여
3. 자격 증명 연동
4. AWS 서비스들과의 연동
5. 멀티 팩터 인증
6. 무료 사용

</br>

### CLI 설치 방법 및 명령어들

#### CLI 설치 (MacOS)

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

</br>

#### CLI와 IAM 사용자 연결

```bash
aws configure
```

입력 후 다음 정보들을 차례대로 입력

1. IAM 사용자를 추가할 때 발급받은 액세스 키 ID
2. IAM 사용자를 추가할 때 발급받은 비밀 키
3. default로 접근할 AWS 지역 (ap-northeast-2)(서울)
4. 응답 메시지 출력 포맷

</br>

#### S3 버킷 관련 명령어

버킷 목록 조회

```bash
aws s3 ls
```

버킷 생성

```bash
aws s3 mb s3://{버킷 이름}
```

버킷 삭제

```bash
aws s3 rb s3://{버킷 이름}
```

</br>

#### 오브젝트 관련 명령어

오브젝트 동기화

```bash
aws s3 sync {로컬 파일 경로} s3://{버킷 이름}
```

오브젝트 목록 조회

```bash
aws s3 ls s3://{버킷 이름}
```

오브젝트 삭제

```bash
aws s3 rm s3://{버킷 이름/오브젝트/경로}
```

오브젝트 전체 삭제

```bash
aws s3 rm s3://{버킷 이름} --recursive
```

</br>

#### 정적 웹 호스팅

시작

```bash
aws s3 website s3://{버킷 이름} --index-document {기본 제공 파일} --error-document {에러 발생 시 제공 파일}
```

종료

```bash
aws s3api delete-bucket-website --bucket {버킷 이름}
```

</br>

#### 퍼블릭 액세스 정책 업데이트

bucket_policy.json 파일을 작성하고 업로드해야 한다.  
파일은 홈 디렉토리에 다음과 같이 작성한다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::{버킷이름}/*"
    }
  ]
}
```

이후 file URL을 이용해서 파일을 불러오고 업로드해야 한다.  
홈 디렉토리에 파일이 있다면 다음과 같이 업로드할 수 있다.

```bash
aws s3api put-bucket-policy --bucket {버킷이름} --policy file:///Users/유저이름/bucket_policy.json
```
