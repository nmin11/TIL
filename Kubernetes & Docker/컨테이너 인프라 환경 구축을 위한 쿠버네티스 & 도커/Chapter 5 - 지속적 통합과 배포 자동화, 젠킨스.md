**※ Pipeline**

1. Github 등의 저장소에 저장해 둔 애플리케이션 소스 코드를 내려받아 도커 컨테이너 이미지로 빌드
2. 빌드한 컨테이너 이미지를 쿠버네티스에서 사용할 수 있도록 레지스트리에 등록
3. 레지스트리에 등록된 이미지를 기반으로 쿠버네티스 오브젝트 생성
4. 생성한 오브젝트(Pod/Deployment)를 외부에서 접속할 수 있도록 서비스 형태로 노출

- 기존에는 이러한 파이프라인을 수작업으로 진행했지만 이제는 도구를 사용해서 자동화할 수 있음
- 자동화는 크게 CI(Continuous Integration), CD(Continuous Deployment) 2가지로 정의되며<br>일반적으로 둘을 합쳐서 CI/CD라고 함

<br>
<br>

# 컨테이너 인프라 환경에서 CI/CD

- CI : 코드를 커밋하고 빌드했을 때 정상적으로 작동하는지 반복적으로 검증해서<br>애플리케이션의 신뢰성을 높이는 작업
- CD : CI 과정에서 생성된 신뢰할 수 있는 애플리케이션을 실제 상용 환경에 자동으로 배포하는 것
- 애플리케이션 배포 시 고려 사항들을 CD에 미리 정의하면 실수를 줄이고 적용 시간도 최소화할 수 있음

※ 컨테이너 인프라 관점에서의 CI/CD

1. 개발자가 소스를 커밋하고 푸시하면 CI 단계 진입
2. 애플리케이션 자동 빌드 및 테스트를 통해 배포할 수 있는 애플리케이션인지 확인하고,<br>통과하면 CD 단계 진입
3. 애플리케이션을 컨테이너 이미지로 만들어서 Pod, Deployment, StatefulSet 등<br>다양한 오브젝트 조건에 맞춰 미리 설정한 파일을 통해 배포

<br>
<br>

## CI/CD 도구 비교

- Teamcity
  - Jetbrains에서 만들었으며, Kotlin을 기반으로 만든 Kotlin DSL이라는 스크립트 언어로 작업 구성
  - 빌드 작업을 수행하는 에이전트 3개와 빌드 작업 100개를 무료로 사용 가능
  - 더 많은 에이전트를 사용하려면 유료 결제를 해야 함
- Github Action
  - Github에서 지원하는 Workflow 기반의 CI/CD 도구
  - Github에 저장한 소스 코드를 자동 분석한 결과를 기반으로<br>Github Action이 추천하는 방식에 따라 Workflow를 구성하거나<br>사용자가 직접 Workflow를 정의하는 파일을 작성한 후 Github 저장소에 넣어 사용할 수 있음
  - Github 저장소가 public하면 무료로 사용 가능하지만 한 달에 2,000분이라는 제한 시간이 있음
  - 추가로 사용할 경우 분 단위의 요금이 별도로 부과됨
- Bamboo
  - Atlassian에서 만든 도구
  - 유료이며 사용자의 서버에 설치해서 사용함
  - Atalssian에서 만든 다른 협업 도구와 연계해서 사용하기에 좋음
- Jenkins
  - 오픈 소스 CI/CD 도구
  - 사용자가 직접 UI에서 작업을 구성하거나 작업 순서를 코드로 정의할 수 있음
  - 역사, 인지도, 사용자 수에서 CI/CD 도구의 대명사라 해도 될 정도로 널리 알려져 있음
  - 그만큼 필요한 정보를 찾기 쉽고 플러그인 개발 관련 커뮤니티 활동도 활발하여,<br>다양한 사용 환경, 언어 및 빌드 도구와 연계할 플러그인을 쉽게 찾을 수 있음
  - 특정 언어나 환경에 구애받지 않고 범용적인 목적으로 무난하게 쓸 수 있음

|   구분    | Teamcity  | Github Action |  Bamboo   |   Jenkins   |
| :-------: | :-------: | :-----------: | :-------: | :---------: |
| 설치 방식 | 직접 설치 |  Github 연동  | 직접 설치 |  직접 설치  |
| 연계 기능 |   보통    |     보통      |   부족    |  매우 많음  |
|   가격    | 무료/유료 |   무료/유료   |   유료    |    무료     |
| 기능 추가 |   보통    |  매우 다양함  |   보통    | 매우 다양함 |
|  범용성   |   보통    |    매우 큼    |   보통    |   매우 큼   |
|  정보량   |  부족함   |     많음      |   많음    |  매우 많음  |

<br>

- 이외에도 퍼블릭 클라우드 기반의 시스템일 때는<br>클라우드 서비스 제공 업체에서 배포하는 CI/CD 도구를 사용해볼 수도 있음
  - AWS CodeBuild, CodePipeline, CodeDeploy, GCP CloudBuild, Azure Pipelines
- 배포가 중요한 환경에서는 CD 기능에 중점을 둔 Spinnaker나 Argo CD를 선택적으로 도입할 수도 있음

<br>

**About Jenkins**

- 거의 모든 환경에서 사용할 수 있도록 다양한 플러그인을 추가해 원하는 형태를 만드는 블록 방식
- CI/CD를 처음 해볼 때는 가장 대중적인 젠킨스로 하는 것이 좋음

<br>
<br>

## 젠킨스로 쿠버네티스 운영 환경 개선하기

- 애플리케이션 배포 영역에 쿠버네티스를 사용하면 개발자는 애플리케이션 개발에만 집중할 수 있게 됨
- 모든 배포 환경을 컨테이너 인프라로 일원화하고, CI/CD 도구를 사용하면<br>애플리케이션에 맞는 환경을 적용해 자동으로 배포할 수 있음

※ 대략적인 과정

1. 개발자가 소스 코드를 저장소에 push
2. 쿠버네티스 내부에 설치된 젠킨스는 코드를 빌드하고 레지스트리에 push
3. 쿠버네티스에서 사용 가능한 형태로 배포

<br>

- 젠킨스는 작업 내용을 Item 단위로 정의하고 조건에 따라<br>자동으로 작업을 수행해서 효율을 높이고 실수를 줄임
- 컨테이너 인프라 환경에서 젠킨스를 사용하는 주된 이유는<br>애플리케이션을 컨테이너로 만들고 배포하는 과정을 자동화하기 위해서
- 그러기 위해 단순히 젠킨스용 파드만을 배포해서는 만들어지지 않음
- 젠킨스는 컨트롤러와 에이전트 형태로 구성한 다음 배포애야 하며 여기에 필요한 설정을 모두 넣어야 함
- 이러한 환경을 하나하나 구성하는 것은 복잡하고 번거롭기 때문에 동적으로 변경할 수 있게 해주는<br>kustomize나 Helm의 도움을 받으면 좋음

<br>
<br>

# 젠킨스 설치를 위한 간편화 도구 살펴보기

- 필요에 따라 다수의 오브젝트를 사용해야 하는데, 이미 3장에서 매니페스트를 실행한 적이 있음
  - MetalLB 구동을 위해 수많은 오브젝트를 미리 정의된 하나의 매니페스트에 넣고 바로 실행했음
- 오브젝트를 단순히 정의한 대로만 사용한다면 젠킨스나 커스터마이즈, 헬름 등은 알 필요가 없음
- 쿠버네티스 클러스터 환경에서는 이러한 배포 도구들이 이미 준비되어 있음

<br>
<br>

## 배포 간편화 도구 비교하기

- kubectl
  - 쿠버네티스에 기본으로 포함된 커맨드라인 도구로, 추가 설치 없이 바로 사용 가능
  - 오브젝트 생성과 쿠버네티스 클러스터에 존재하는 오브젝트, 이벤트 등의 정보를 확인하는 데 사용됨
  - 오브젝트의 명세가 정의된 yaml 파일을 인자로 입력받아서 오브젝트를 배포할 수도 있음
  - 정의된 매니페스트 파일을 그대로 배포하기 때문에 개별적인 오브젝트를 관리하거나 배포할 때 좋음
- kustomize
  - 오브젝트를 사용자의 의도에 따라 유동적으로 배포할 수 있음
  - 별도의 커스터마이즈 실행 파일을 활용해서 커스터마이즈 명세를 따르는 yaml 파일 생성 가능
  - yaml 파일이 이미 존재한다면 kubectl로 -k 옵션을 활용해서 배포 가능
    - 그만큼 kubectl과 매우 밀접하게 동작
  - yaml 파일에 변수나 템플릿을 사용하지는 않지만<br>명령어로 배포 대상 오브젝트의 이미지 태그와 레이블 같은 명세를 변경하거나<br>일반 파일을 이용해 ConfigMap과 시크릿을 생성하는 기능을 지원함
  - 그렇기에 운영 중인 환경에서 배포 시 가변적인 요소를 적용하는 데 적합
- Helm
  - 쿠버네티스 사용자의 70% 이상이 사용하고 있을 정도로 널리 알려진 도구
  - 오브젝트 배포에 필요한 사양이 이미 정의되어 있는 Chart라는 패키지 활용
    - 헬름 차트 저장소가 온라인에 있기에 패키지를 검색하고 내려받아 사용하기가 매우 간편
    - 헬름 차트는 자체적인 템플릿 문법을 사용하므로 가변적인 인자를 배포할 때<br>다양한 배포 환경에 맞추거나 원하는 조건을 적용할 수 있음
  - 오브젝트를 묶어서 패키지 단위로 관리하므로 1개의 명령어로 애플리케이션에 필요한 오브젝트들 구성 가능

|    구분     |        kubectl        |              kustomize              |               Helm                |
| :---------: | :-------------------: | :---------------------------------: | :-------------------------------: |
|  설치 방법  | 쿠버네티스 기본 포함  | 별도 실행 파일 또는 쿠버네티스 통합 |             별도 설치             |
|  배포 대상  |       yaml 파일       |          커스터마이즈 파일          |           패키지(차트)            |
|   주 용도   | 오브젝트 관리 및 배포 |        오브젝트 가변적 배포         | 패키지 단위 오브젝트 배포 및 관리 |
| 가변적 환경 |       대응 힘듦       |          간단한 대응 가능           |         복잡한 대응 가능          |
| 기능 복잡도 |        단순함         |                보통                 |              복잡함               |

<br>
<br>

## 커스터마이즈로 배포 간편화하기

- 커스터마이즈를 활용하면 kubectl이 매니페스트를 고정적으로 이용했던 방식에 비해 유연해짐

<br>

### 커스터마이즈 작동 원리

- 커스터마이즈는 yaml 파일에 정의된 값을 사용자가 원하는 값으로 변경 가능
- 사용자가 직접 yaml 파일을 편집기를 통해 수정할 경우 문제가 발생하진 않지만<br>수정해야 하는 yaml 파일이 많거나, 여러 개의 쿠버네티스 클러스터가 있어서<br>LABEL이나 NAME 같은 항목들을 일일이 수정해야 한다면 많은 노력이 드는데,<br>이를 위해 커스터마이즈는 `kustomize` 명령을 제공함
- `kustomize` 명령과 `create` 옵션으로 **kustomization.yaml** 이라는 기본 매니페스트를 제작하고<br>이 파일에 변경해야 하는 값들을 적용함
- `build` 옵션으로 변경할 내용이 적용된 최종 yaml 파일을 저장하거나 변경된 내용이 바로 실행되도록 지정함

<br>

### 실습: 커스터마이즈로 MetalLB 한 번에 만들기

- 커스터마이즈를 사용해서 MetalLB를 만든다는 것은 사실상 명세서인 kustomization.yaml을 만드는 과정
- 그리고 만들어진 yaml 파일을 통해서 MetalLB 매니페스트를 생성하고, 이 매니페스트를 통해서 배포하는 것
- 즉, 커스터마이즈는 단순히 최종 매니페스트 생성을 도와주는 도구인 셈
- 이미지 태그 변경 명령어 : `kustomize edit set image`
  - 예시 : `kustomize edit set image metallb/controller:v0.8.2`
- 매니페스트 생성 명령어 : `kustomize build`
- 빌드 및 배포 명령어 : `kustomize build | kubectl apply -f -`
  - 빌드한 결과가 바로 `kubectl apply`에 인자로 전달되어 배포되도록 함
- 빌드 삭제 명령어 : `kustomize build | kubectl delete -f -`
- 커스터마이즈는 여러 변경 부분을 사용자가 직접 추가하고 최종적으로 필요한 매니페스트를 만들어서 배포해야 함
- 이러한 수동적 방식 말고 선언적으로 필요한 내용을 제공하기 위해서는 헬름을 사용해야 함

<br>

## 헬름으로 배포 간편화하기

### 헬름 작동 원리

- 헬름은 쿠버네티스에 패키지를 손쉽게 배포할 수 있도록 패키지를 관리하는 쿠버네티스 전용 패키지 매니저
- 일반적으로 패키지는 실행 파일뿐만 아니라 실행 환경에 필요한 의존성 파일과 환경 정보들의 묶음
- 패키지 매니저는 외부에 있는 저장소에서 패키지 정보를 받아와 패키지를 안정적으로 관리하는 도구
- 패키지 매니저의 다양한 목적들 중의 핵심 : 설치에 필요한 의존성 파일들을 관리하고 간편하게 설치하도록 돕는 것

※ 플랫폼별 패키지 매니저

|   플랫폼   | 패키지 매니저 |      저장소       |          사용 목적          |
| :--------: | :-----------: | :---------------: | :-------------------------: |
|   Linux    |   yum, apt    |   배포판 저장소   |   소프트웨어 의존성 관리    |
|   Python   |      pip      |     pypi.org      |   파이썬 모듈 의존성 관리   |
|    Java    |     maven     | mvnrepository.com | 자바 라이브러리 의존성 관리 |
| Kubernetes |     helm      |  artifacthub.io   |   쿠버네티스 패키지 관리    |

- 패키지 매니저의 역할 : 손쉬운 설치와 관리
  - 패키지 검색 : 설정한 저장소에서 패키지를 검색하는 기능
  - 패키지 관리 : 저장소에서 패키지 정보 확인, 사용자 시스템에 설치, 삭제, 업그레이드, 되돌리기 등
  - 패키지 의존성 관리 : 패키지를 설치할 때 의존하는 소프트웨어를 같이 설치하거나 같이 삭제
  - 패키지 보안 관리 : 디지털 인증서와 패키지에 고유하게 발행되는 Checksum이라는 값으로<br>해당 패키지의 소프트웨어나 의존성이 변조됐는지 검사
- 배포 구성에 필요한 모든 쿠버네티스 오브젝트를 위해 주소 할당을 하려 할 때 헬름을 사용할 수 있음

<br>

### 헬름의 장점

- 다수의 오브젝트 배포 yaml은 파일 구분자 `---`로 묶어 단일 yaml로서 배포 가능
  - 하지만 여러 사람이 동시에 작업한 단일 yaml은 충돌이 일어날 가능성이 있음
  - 이럴 때 헬름을 사용하면 요구 조건별로 리소스를 편집하거나 변수를 넘겨서 처리하는 패키지를 만들 수 있음
- 다양한 요구 조건을 처리할 수 있는 패키지를 Chart라고 함
  - 차트는 헬름 저장소에 공개해서 여러 사용자와 공유
  - 각 사용자는 공개된 저장소에 등록된 차트를 이용해서 애플리케이션을 원하는 형태로 쿠버네티스에 배포 가능
- 배포한 애플리케이션 업그레이드, 되돌리기, 삭제 기능 제공
- 헬름 기본 저장소는 아티펙트허브(artifacthub.io)로, 다른 패키지 매니저처럼 외부에 있음
  - 다른 저장소와 달리 설치할 패키지에 대한 경로만 제공

<br>

### 헬름의 전반적인 흐름

- 생산자 영역
  - 생산자가 헬름 명령으로 작업 공간을 생성하면 templates 디렉토리로<br>애플리케이션 배포에 필요한 여러가지 yaml 파일과 구성 파일 작성 가능
  - templates 디렉토리에 조건별 분기, 값 전달 등을 처리할 수 있도록 values.yaml에 설정된 키 사용<br>값이 전달되지 않으면 기본값으로 처리하도록 values.yaml에 설정 가능<br>필요한 패키지의 여러 분기 처리나 배포에 대한 구성을 values.yaml에서 진행
  - 차트의 이름, 목적, 배포되는 애플리케이션 버전과 같은 패키지 정보를 Charts.yaml에 채워 넣음
  - 차트 구성이 완료되면 생산자가 생산자 저장소에 업로드
  - 업로드한 생산자 저장소를 아티펙트허브에 등록하면 사용자는 아티펙트허브에서 찾을 수 있게 됨
- 아티펙트허브 영역
  - 아티펙트허브 검색을 통해 사용자는 패키지 저장 주소를 확인할 수 있음
  - 이렇게 확인된 주소는 각 애플리케이션을 개발하는 주체가 관리
- 사용자 영역
  - 아티펙트허브에서 얻은 차트 저장소 주소를 헬름을 통해서 등록
  - 그리고 최신 업데이트 후 차트를 내려받고 설치
  - 이렇게 헬름을 통해 쿠버네티스에 설치된 애플리케이션 패키지를 Release라고 함
  - 헬름을 통해 배포된 릴리스를 다시 차트를 사용해 업그레이드할 수 있고 원래대로 복구할 수 있음<br>또한 사용하지 않는 헬름 릴리스를 제거할 수 있음

<br>

### 헬름 명렁어들

- 헬름 차트 저장소 등록 : `helm repo add <이름> <저장소 위치>`
- 헬름 차트 저장소 목록 확인 : `helm repo list`
- 최신 차트 정보 동기화 : `helm repo update`
- 헬름 차트 설치 : `helm install`
  - --namespace : 생성될 애플리케이션이 위치할 네임스페이스 지정
  - --create-namespace : 위 옵션으로 지정된 네임스페이스가 없을 때 네임스페이스 생성
  - --set : 헬름에서 사용할 변수를 명령 인자로 전달

<br>

=> 여기까지 젠킨스 설치를 위한 도구들을 살펴봤고, 다음에는 본격적으로 젠킨스를 설치하고 살펴볼 것

<br>
<br>

# 젠킨스 설치 및 설정하기

## 헬름으로 젠킨스 설치하기

- 헬름으로 설치되는 젠킨스는 파드에서 동작하는 애플리케이션이기 때문에<br>PV를 마운트하지 않으면 파드 재실행 시 내부 볼륨의 모든 데이터가 삭제됨
  - PV가 NFS를 통해 프로비저닝될 수 있게 해야 함
- 젠킨스를 헬름 차트로 설치해 애플리케이션을 사용하게 되면<br>젠킨스의 여러 설정 파일과 구성 파일들이 PVC를 통해 PV에 파일로 저장됨
  - 이 때 PV에 적절한 접근 ID를 부여하지 않으면 PVC를 사용해 파일을 읽고 쓰는 기능에 문제가 발생할 수 있음
  - `chown 1000:1000 /nfs_shared/jenkins` 명령어를 통해<br>젠킨스 PV가 사용할 NFS 디렉토리에 대한 접근 ID를 1000번으로 설정
    - 젠킨스 컨트롤러 이미지에서 기본적으로 사용하는 유저 ID와 그룹 ID가 1000번이기 때문
- 젠킨스는 사용자가 배포를 위해 생성한 내용과 사용자의 계정 정보,<br>사용하는 플러그인 같은 데이터를 저장하기 위해 PV와 PVC의 구성을 필요로 함

※ 젠킨스 릴리스 정보

- NAME : 젠킨스의 릴리스 이름, 이후 헬름 명령어로 젠킨스 조회, 삭제, 변경을 위해 사용하게 되는 이름
- NAMESPACE : 젠킨스가 배포된 네임스페이스
- REVISION : 배포된 릴리스가 몇 번째로 배포된 것인지 알려줌<br>`helm upgrade` 명령어로 젠킨스 버전 업그레이드 때마다 1씩 증가<br>이전 버전으로 돌아가기 위해 `helm rollback` 명령어를 사용할 수 있음<br>롤백할 경우, REVISION의 번호를 직접 지정해서 특정 리비전으로 돌아가도록 하는 것도 가능
- NOTES : 설치와 관련된 안내 사항 몇 가지 표시
  1. 젠킨스의 관리자 비밀번호를 얻어오기 위한 명령어
  2. 젠킨스가 구동되는 파드에 접속할 수 있도록 외부의 트래픽을 쿠버네티스의 파드로 전달하게 만드는 설정
  3. 젠킨스 접속 시 사용할 유저 이름 표시

<br>

- 젠킨스 배포 시 젠킨스가 마스터 노드에 있음을 확인할 수 있음
- node와 deployment의 yaml 파일을 확인해보면 taints와 tolerations가 이런 결과를 만들고 있음
- 일반적으로 taints와 tolerations는 혼합해서 사용
- 비유적으로 taints는 다루기 꺼려지는 것, tolerations는 꺼려지는 것을 참아내는 인내를 뜻함
- 그런데 쿠버네티스의 taints와 tolerations는 사전적 의미와 반대
  - 매우 특별하게 취급돼야 하는 곳에 taints 설정하고 쉽게 접근 못하는 소중한 것으로 설정
  - tolerations는 특별한 키를 가져야만 출입 가능
- 즉, 마스터 노드에 taints가 설정되어 있어서, 특별한 목적으로 사용되는 노드라는 것을 명시해둔 것
- 일반적으로 taints는 마스터 노드 이외에도 GPU 노드, DB 전용 노드 등 특별한 목적의 노드들에 주로 사용됨
- 이 책에서는 편의를 위해 젠킨스 컨트롤러가 여러 곳에 스케줄되지 않고 마스터 노드에만 스케줄됨

※ taints와 tolerations

- 관계를 어떻게 정의하냐에 따라 배포를 상당히 유연하게 만들 수 있음
- taints : key와 value, 그리고 이 둘에 따른 effect의 조합을 통해<br>taints를 통해 설정된 노드에 파드 배치 기준을 설정
  - key와 value의 조합은 taints를 설정한 노드가 어떤 노드인지를 구분하기 위해 사용함
  - key는 필수로 설정해야 하고, value는 생략할 수 있음
  - effect는 taints와 tolerations의 key 또는 value가 일치하지 않는 파드가<br>노드에 스케줄되려 하는 경우 어떤 동작을 할 것인지 나타냄
    - effect에는 NoSchedule, PreferNoSchedule, NoExecute 값을 줄 수 있음

|       효과       | taints가 설정된 노드에 파드 신규 배치                   | 파드가 배치된 노드에 taints 설정 |
| :--------------: | :------------------------------------------------------ | :------------------------------- |
|    NoSchedule    | 노드에 파드 배치 거부                                   | 노드에 존재하는 파드 유지        |
| PreferNoSchedule | 다른 노드에 파드 배치가 불가능할 때<br>노드에 파드 배치 | 노드에 존재하는 파드 유지        |
|    NoExecute     | 노드에 파드 배치 거부                                   | 파드를 노드에서 제거             |

- tolerations : 똑같이 key, value, effect를 가지고 있고, 추가적으로 operator가 있음
  - taints가 설정된 노드로 들어가기 위한 특별한 열쇠의 역할<br>key와 effect가 반드시 일치해야 함
  - 연산자는 기본적으로 Equal로 동작해서 taints와 tolerations를 비교하는 역할을 수행
  - 연산자 Exists의 경우 비교할 key와 value가 존재한다는 가정으로 taints에 접근할 만능키로 바꿔주는 역할 수행
  - key, value, effect를 연산자를 통해 비교한 후 조건에 맞는 taints를 식별하는 방식
  - key와 effect 중 생략된 요소가 있다면 해당 요소는 와일드카드로서의 의미
  - tolerations의 key, value, effect는 taints의 key, value, effect와<br>조건에 맞는지를 Equal 혹은 Exists 연산자를 통해서 판단
  - 연산자를 생략할 경우 묵시적으로 Equal을 의미함
  - 조건 판단 결과 taints와 tolerations의 조건이 맞으면<br>taints가 설정된 노드에 tolerations를 가진 파드 배치 가능
    - 조건이 맞다고 생각하는 기준은 Equal 연산자를 사용했을 때<br>taints와 tolerations의 key, value, effect까지 일치하는 경우
  - Exists 연산자 사용 시 value는 반드시 생략해야 하고 이 상태에서 key와 effect의 일치 여부 판단
    - key와 effect를 모두 생략한 상태로 Exists 연산자만 사용하면<br>taints의 key와 effect는 모든 key와 모든 effect를 의미하므로<br>Exitsts 연산자 하나만으로도 taints가 설정된 모든 노드에 대해서 해당 tolerations를 설정한 파드 배포 가능

※ jenkins-install.sh

```sh
#!/usr/bin/env bash
jkopt1="--sessionTimeout=1440"
jkopt2="--sessionEviction=86400"
jvopt1="-Duser.timezone=Asia/Seoul"
jvopt2="-Dcasc.jenkins.config=https://raw.githubusercontent.com/sysnet4admin/_Book_k8sInfra/main/ch5/5.3.1/jenkins-config.yaml"

helm install jenkins edu/jenkins \
--set persistence.existingClaim=jenkins \
--set master.adminPassword=admin \
--set master.nodeSelector."kubernetes\.io/hostname"=m-k8s \
--set master.tolerations[0].key=node-role.kubernetes.io/master \
--set master.tolerations[0].effect=NoSchedule \
--set master.tolerations[0].operator=Exists \
--set master.runAsUser=1000 \
--set master.runAsGroup=1000 \
--set master.tag=2.249.3-lts-centos7 \
--set master.serviceType=LoadBalancer \
--set master.servicePort=80 \
--set master.jenkinsOpts="$jkopt1 $jkopt2" \
--set master.javaOpts="$jvopt1 $jvopt2"
```

- jkopt 부분 : 기본 설정이 30분 넘게 사용하지 않으면 세션이 종료되므로<br>세션 유효 시간 및 세션 정리 시간을 하루로 설정
- -Duser.timezone : 기본 설정으로는 시간대가 정확히 맞지 않으므로<br>젠킨스를 통한 CI/CD 시에 명확히 작업을 구분하기 힘듦
- -Dcasc.jenkins.config : 쿠버네티스를 위한 젠킨스 에이전트 노드 설정은<br>Pod Template이라는 곳을 통해서 설정값 입력<br>그런데 마스터 노드가 재실행되면 설정이 초기화됨<br>따라서 설정값을 미리 입력해 둔 yaml 파일을 Github 저장소에서 받아오도록 설정
- helm install : edu 차트 저장소의 jenkins 차트를 사용해 jenkins 릴리스 설치
- --set persistence.existingClaim : PVC 동적 프로비저닝 사용을 위해 jenkins라는 이름의 PVC 사용하도록 설정
- --set master.adminPassword : 젠킨스 접속 시 사용할 관리자 비밀번호를 admin으로 설정<br>이 값이 없으면 jenkins가 설치 과정에서 임의로 생성한 비밀번호 사용
- --set master.nodeSelector : 젠킨스의 컨트롤러 파드를 쿠버네티스 마스터 노드에 배치하도록 선택<br>`nodeSelector`는 뒤에 따라오는 문자열과 일치하는 레이블을 가진 노드에 파드를 스케줄링하겠다는 설정<br>`.` 앞의 `\`는 점을 하위 속성으로 분리하게 되기 때문에 이를 방지하기 위한 escape
- --set master.tolerations[0] : 이 옵션들이 없으면 마스터 노드에 파드를 배치할 수 없음<br>현재 마스터 노드에 NoSchedule taints가 설정되어 있기 때문<br>taints가 설정된 노드에 파드를 배치하려면 tolerations 옵션 필요<br>그래서 taints와 tolerations 관련 설정들을 해주는 부분
- --set master.runAsUser / runAsGroup : 젠킨스를 구동하는 파드가 실행될 때의 유저 ID와 그룹 ID 설정
- --set master.tag : 이후 젠킨스 버전에 따른 UI 변경을 막기 위해서 젠킨스 버전 고정
- --set master.serviceType : 차트로 생성되는 서비스의 타입을 로드밸런서로 설정해 외부 IP를 받아옴
- --set master.servicePort : 젠킨스가 http 상에서 구동되도록 80포트 지정
- --set master.jenkinsOpts : 앞서 선언한 변수들을 호출해서 젠킨스에 적용
- --set master.javaOpts : 앞서 선언한 변수들을 호출해서 젠킨스 실행 환경(JVM)에 적용

<br>
<br>

## 젠킨스 살펴보기

- 젠킨스 컨트롤러는 마스터에 설치했지만 젠킨스 에이전트는 필요 시에 생성되고 제거되는 임시적 구조를 가짐
  - 따라서 젠킨스 에이전트 작업 내용들은 삭제 전에 젠킨스 컨트롤러에 저장되어야 함
  - 이를 위해 젠킨스 에이전트 서비스가 항상 동작하고 있음
- 젠킨스 컨트롤러 단독 설치 시 설치된 서버에서 젠킨스 자체 시스템 관리, CI/CD 설정, 빌드 등의 작업을<br>모두 젠킨스 컨트롤러 단일 노드에서 수행
- 컨트롤러-에이전트 구조로 설치 시 컨트롤러는 젠킨스 자체의 관리 및 CI/CD와 관련된 설정만 담당<br>실제 빌드 작업은 에이전트로 설정된 노드에서 이루어짐
- 따라서 컨트롤러 단독 설치는 일반적으로 간단한 테스트에서만 사용되고<br>주로 컨트롤러-에이전트 구조로 사용함

※ 젠킨스 메뉴에 대해

- Item : 젠킨스를 통해서 빌드할 작업을 뜻함
- 사람 : 사용자를 관리하는 메뉴<br>젠킨스 구동 서버에서 직접 사용자를 관리하는 방법과 별도의 DB를 가지고 관리하는 방법이 있음
- 빌드 기록 : 젠킨스 작업에 대한 성공, 실패, 진행 내역을 볼 수 있음
- Jenkins 관리 : 젠킨스의 시스템, 보안, 도구, 플러그인 등 각종 설정을 수행하는 곳
- My Views : 젠킨스에서 각종 작업을 분류해 모아서 볼 수 있는 대시보드
- Lockable Resources : 젠킨스에서는 한 번에 여러 작업이 일어날 수 있으므로 동시성 문제가 발생할 수 있음<br>그러므로 작업이 끝날 때까지 같은 작업을 하지 못하도록 하는 잠금 장치
- New View : 대시보드인 View를 생성하는 작업

<br>
<br>

## 젠킨스 컨트롤러 설정하기

### 젠킨스 시스템 설정하기

**젠킨스 관리 > 시스템 설정**

- 시스템 메시지
  - 젠킨스 메인 웹 페이지에 접속했을 때 나타나는 메시지 입력
  - 사용자에게 젠킨스에 대한 소개나 간단한 안내를 할 수 있도록 해주는 메시지
- \# of executors
  - 동시에 빌드를 수행할 수 있는 실행기의 개수를 설정하는 옵션
  - 컨트롤러 노드에서 몇 개까지의 빌드를 실행할 수 있을지 설정할 수 있음
- Label
  - 노드를 구분할 수 있는 레이블 지정
  - 설정한 레이블을 통해 Usage 옵션을 사용하면 특정 작업을 어떤 노드에서 진행할지 결정할 수 있음
- Usage
  - 젠킨스의 빌드 작업에 대해 젠킨스 노드가 어떻게 처리할지 설정
  - Use this node as much as possible
    - 빌드 작업 수행 시 조건 없이 노드에 빌드할 수 있는 환경이라면 현재 노드에서 빌드 진행
    - 일반적인 환경에서의 빌드 작업에 적합
  - Only build with label expressions matching this node
    - 빌드와 대상의 레이블이 같아야 빌드 가능
    - 주로 빌드 환경이 다른 플랫폼에서 빌드를 수행할 때 사용됨
- Quiet period
  - 빌드 작업이 시작될 때까지 잠시 대기하는 시간 설정
  - 초 단위
  - 짧은 시간 내 변경된 코드에 대해서 중복 작업을 하지 않고 최신 변경 코드를 빌드하기 위해 설정
- SCM checkout retry count
  - 소스 코드 저장소로부터 파일을 가져오지 못한 경우 몇 번 재시도할지 설정
  - SCM : Source Code Management
    - 개발자들이 소스 코드를 통합하고 관리하며 이력을 추적하기 위해 사용하는 시스템
- Restrict project naming
  - 젠킨스를 통해 만들어지는 작업의 이름 규칙
  - 정규식 패턴으로 제약 조건 작성 가능
- Jenkins URL
  - 설치된 젠킨스 컨트롤러의 접속 주소
- Resource Root URL
  - 빌드 결과물과 같은 내용을 외부에 공개하기 위해 사용되는 주소

<br>

### 젠킨스 플러그인 관리하기

- 젠킨스는 실행되는 모든 기능을 플러그인으로 구현하도록 설계되어 있음
- 플러그인을 조합해서 더 강력한 CI/CD 기능을 만들 수 있음

**젠킨스 관리 > 플러그인 관리**

- 업데이트된 플러그인 목록
  - 젠킨스에 설치된 플러그인 중 업데이트된 플러그인이 있는 경우 최신화 가능
  - 보안 취약점이 발견되었거나 젠킨스 호환 버전이 아닌 경우 설치 불가능
- 설치 가능
  - 설치되지 않은 플러그인을 검색해서 현재 젠킨스에 추가
- 설치된 플러그인 목록
  - 현재 젠킨스에 설치되어 있는 플러그인 정보
  - 여기서 플러그인을 삭제할 수도 있음
- 고급
  - 외부와 연결되는 프록시 서버 설정 가능
  - 프록시 서버를 통해서 내부망에서도 젠킨스를 설치하고 업데이트할 수 있음
  - 별도의 플러그인 파일을 업로드해서 플러그인을 설치할 수 있음

<br>
<br>

## 젠킨스 에이전트 설정하기

**젠킨스 관리 > 노드 관리**

- 신규 노드
  - 에이전트 노드 추가
  - 고정된 여러 대의 서버에서 에이전트 노드를 추가해야 할 때 필요
- Configure Clouds
  - 클라우드 환경 기반의 에이전트 설정 시 필요
  - 쿠버네티스 위에 설치된 젠킨스의 에이전트에 관한 설정도 여기서 설정 가능
- Node Monitoring
  - 에이전트 노드의 안정성을 위한 각종 모니터링 관련 사항 설정 가능
- 노드 목록
  - 현재 구성된 노드 목록을 보여줌
  - 쿠버네티스상의 젠킨스는 작업 진행 시에만 파드 형태의 에이전트가 생성되었다가 사라지므로<br>작업 중이 아니라면 젠킨스 컨트롤러 노드만 표시됨

<br>

### 쿠버네티스에서 젠킨스 에이전트 구성

**젠킨스 관리 > 노드 관리 > Configure Clouds**

- (실습 기준) 헬름을 통해 젠킨스 설치 시 JCasC 기능을 사용했기에<br>쿠버네티스 환경에 맞게 자동화된 설정이 있음
  - JCasC : Jenkins Configuration as a Code
  - 이것 때문에 kubernetes 플러그인의 도움을 받기 위해 업데이트를 진행했던 것
- Kubernetes
  - 쿠버네티스 설정 관련 영역
  - Name에 이름 지정 가능
- Kubernetes Cloud details
  - 쿠버네티스 클러스터에 접속하기 위한 정보 설정
  - 헬름을 통해서 쿠버네티스 위에 설치한 젠킨스는<br>쿠버네티스 클러스터 내부에서 동작하기 때문에 기본값으로 둬도 무방
  - 쿠버네티스 클러스터 외부에 젠킨스를 설치한 경우에는 여기에서 쿠버네티스에 대한 정보를 수정해야 함
- Pod Templates
  - 쿠버네티스상의 젠킨스는 작업 시 에이전트를 파드 형태로 생성
  - 여기에서는 에이전트로 사용될 파드 관련 설정을 진행
  - 젠킨스 컨트롤러를 재시작하면 모든 설정이 초기화됨
  - 현재 세팅으로 마스터 노드를 재시작하면 모든 설정 초기화
  - 이를 해결하기 위해 헬름 설치 시 미리 jenkins-config.yaml을 읽어 들이도록 구성했음

<br>

### 젠킨스 에이전트의 상세 내용

- 젠킨스의 CI/CD 작업은 실제로 에이전트에서 동작
- 쿠버네티스에서는 에이전트가 파드로 운영되나 파드에는 `docker` 명령이나 `kubectl` 명령이 존재하지 않음
- 가장 쉬운 해결 방법은 호스트 시스템의 docker와 kubectl을 그대로 이용하는 것
- 쿠버네티스 파드에서 워커 노드에 있는 특정 경로를 마운트해서 사용할 수 있도록 해주는<br>**hostpath** 를 사용할 것
- Pod Template : 파드의 구성 요소를 그대로 메뉴상에 넣어 둔 것
  - 여기서 생성한 파드를 kubectl get pod \<이름> -o yaml로 조회해보면 이해하기 쉬울 것

<br>

### Pod Template의 Add Volume 옵션들

- Config Map Volume
  - 쿠버네티스의 ConfigMap 오브젝트를 파드 내부에 연결해서 사용하도록 설정
- Empty Dir Volume
  - 파일 및 내용이 없는 디렉토리를 파드 내부에 생성
  - 젠킨스로 빌드 시 컨테이너가 다수 생성될 수 있는데,<br>이 때 컨테이너 간의 공유 목적으로 빈 디렉토리를 주로 사용함
- Host Path Volume
  - 호스트인 쿠버네티스 워커 노드의 파일 및 디렉토리를 파드에서 사용할 수 있도록 연결
  - 호스트에 위치한 명령이나 데이터를 사용할 수 있음
  - 필요한 경우 파일을 저장해 파드가 사라진 경우에도 데이터 보존 가능
- NFS Volume
  - NFS 서버에 위치한 원격 디렉토리를 파드가 사용할 수 있도록 설정
- Persistent Volume Claim
  - 쿠버네티스 클러스터에서 PVC로 설정한 볼륨을 파드에서 사용할 수 있도록 설정
- Secret Volume
  - 쿠버네티스의 Secret 오브젝트를 파드 내부에 연결해서 사용하도록 설정

<br>

### jenkins 서비스 어카운트를 위한 권한 설정하기

- 서비스 어카운트 조회 : `kubectl get serviceaccounts`
- 권한부여 예시 : `kubectl create clusterrolebinding jenkins-cluster-admin \`<br>`--clusterrole=cluster-admin --serviceaccount=default:jenkins`
- jenkins 서비스 어카운트를 통해 젠킨스 에이전트 파드를 생성하거나<br>파드 내부에 제약 없이 접근하려면 **cluster-admin 역할 (Role)** 을 부여해야 함
- 필요한 영역에 따라 권한을 여러 개 부여해야 하지만 실습에서는 1개 권한만 부여
- Role을 부여하고 이 권한이 필요한 서비스 어카운트인 jenkins에 Binding해주는 방식
- 이런 방식을 RBAC(Role-Based Access Control)라고 함
- 쿠버네티스의 역할 부여 구조는 **할 수 있는 일**과 **할 수 있는 주체**의 결합으로 이루어짐
- Rules
  - '할 수 있는 일'과 관련된 Role, ClusterRole이 가지는 자세한 행동 규칙
  - apiGroups, resources, verbs의 속성을 가짐
  - 접근 가능한 API의 집합을 apiGroups로 표현
  - apiGroups에서 분류된 자원 중 접근 가능한 자원을 선별하기 위해 resources를 사용
  - resources에 대해서 할 수 있는 행동을 규정하기 위해 verbs 사용
    - verb 종류 : get, list, create, update, patch, watch, delete
- Role, ClusterRole
  - '할 수 있는 일'을 대표하는 오브젝트
  - Rules에 적용된 규칙에 따른 동작을 할 수 있음
  - 적용 범위에 따라 Role과 ClusterRole로 나뉨
  - Role : 해당 Role을 가진 주체가 특정 namespace에 대해서 접근 가능
  - ClusterRole : 해당 ClusterRole을 가진 주체가 쿠버네티스 클러스터 전체에 대해서 접근 가능
- RoleBinding, ClusterRoleBinding
  - Role과 ClusterRole의 '할 수 있는 일' 속성을 '할 수 있는 주체'를 대표하는 속성인 Subjects와 연결
  - Role과 ClusterRole은 roleRef(할 수 있는 역할의 참조)와 subject(수행 주체) 속성을 가짐
  - RoleBinding : Role과 결합하여 namespace 범위의 접근 제어 수행
  - ClusterRoleBinding : ClusterRole과 결합하여 클러스터 전체 범위의 접근 제어 수행
- Subjects
  - 행위를 수행하는 주체
  - 특정 사용자 혹은 그룹, 서비스 어카운트를 속성으로 가질 수 있음
  - 사용자는 쿠버네티스에 접근을 수행하는 실제 이용자
  - 쿠버네티스 클러스터의 사용자 목록은 kubeconfig의 users 섹션에 기록되어 있음
  - 서비스 어카운트는 파드 내부의 프로세스에 적용되는 개념
  - 파드는 namespace에 존재하는 default 서비스 어카운트 또는 다른 특정 서비스 어카운트 사용
  - 파드 내부의 프로세스는 설정된 서비스 어카운트로서<br>쿠버네티스상에 존재하는 자원에 접근 시도 가능

<br>
<br>

# 젠킨스로 CI/CD 구현하기

**새로운 Item**

- Item
  - 새롭게 정의할 작업을 의미
  - CI/CD를 하려면 각각의 작업은 모두 정의가 필요
  - 작업을 코드로 정의했다 하더라도 작업 순서 정도는 정해야 함
  - 프로젝트 : 모든 작업의 정의와 순서를 모아 둔 전체 작업
  - 프로젝트를 정의하고 생성하는 것을 아이템이라고 함
  - 프로젝트 외 실제 작업에 도움이 되는 내용들을 정의하는 것도 아이템을 생성하는 것

<br>

**프로젝트 생성 방식**

- Freestyle project
  - 스타일의 자유도가 높은 방식
  - 브라우저에서 사용자가 직접 설정값과 수행할 동작 입력 가능
  - 화면에 보이는 항목을 입력하면서 구성할 수 있어서 젠킨스 초보자도 구성하기 쉬움
  - 하지만 과정이 복잡한 작업을 구성하기 어려움
  - 생성한 아이템은 입력한 항목의 명세를 별도로 저장하지 않음
- Pipeline
  - 젠킨스에서 지원하는 고유 Pipeline 문법으로 코드를 작성해 작업을 정의하는 프로젝트
  - Freestyle에 비해 사전 숙지가 필요하므로 진입 장벽이 좀 있음
  - 변수 정의, 반복문, 조건문 등의 프로그래밍 기법을 사용해서 복잡한 방식의 작업 정의 가능
  - 작성해둔 코드를 통해 새 프로젝트를 바로 생성할 수 있고 일부만 수정해서 재사용하기도 수월함
  - Github 저장소에 Pipeline 코드를 함께 올려 두면 애플리케이션 코드와 배포 코드를 함께 관리 가능
- Multi-configuration project
  - 하나의 소스 코드를 여러 조건의 조합으로 나온 경우의 수에 해당하는 환경에 동시 배포하는 프로젝트
- Folder
  - 젠킨스 작업이 늘어날수록 단순 관리가 어려워지므로, 분류 가능한 디렉토리를 생성하는 것
- Multibranch Pipeline
  - 하나의 소스 코드 저장소 내에 존재하는 각 브랜치에서 젠킨스 파이프라인 코드가<br>작성된 파일을 불러와 한 번에 여러 브랜치에 대해 품질 검증, 테스트, 빌드 작업 수행

=> 주로 사용되는 것은 Freestyle과 Pipeline<br>간단한 작업이나 직접 사용의 경우에는 Freestyle, 복잡도가 높거나 재사용이 필요한 경우 Pipeline 사용

<br>
<br>

## Freestyle로 간단히 echo-ip 배포하기

**순서**

1. 깃허브에서 echo-ip라는 레포지토리 pull
2. 받은 파일들을 이용해서 컨테이너 이미지 빌드
3. 빌드한 이미지를 레지스트리(192.168.1.10:8443)에 push
4. 레지스트리에 저장한 이미지를 쿠버네티스 클러스터에 디플로이먼트로 생성하고 로드밸런서 서비스로 노출

※ Restrict where this project can be run<br>: 젠킨스 에이전트가 특정 레이블을 가지고 있을 때 해당 레이블을 가진 에이전트에서만 실행되도록 제한

※ Build - Execute shell 명령어

```sh
docker build -t 192.168.1.10:8443/echo-ip . # 도커 빌드 / CI 작업
docker push 192.168.1.10:8443/echo-ip       # 도커 이미지 저장 / CI 작업
kubectl create deployment fs-echo-ip --image=192.168.1.10:8443/echo-ip                                        # 쿠버네티스 디플로이먼트 배포 / CD 작업
kubectl expose deployment fs-echo-ip --type=LoadBalancer --name=fs-echo-ip-svc --port=8080 --target-port=80   # 쿠버네티스 서비스 노출 / CD 작업
```

=> Freestyle은 웹 화면에 셸 스크립트를 입력하기 때문에 작업 관리 및 변경 사항 추적이 쉽지 않음<br>그래서 깃허브 저장소를 연동하면 편하며, 이를 위해 필요한 것이 Pipeline

<br>
<br>

## Pipeline 프로젝트로 손쉽게 echo-ip 배포하기

**젠킨스의 Pipeline**

- 연속적인 작업을 코드 또는 파일로 정의해주는 젠킨스 기능
- Pipeline은 고유 문법의 코드 또는 그러한 내용을 담고 있는 파일로 이루어져 있음
- 코드가 실제로 동작하는 작업이 되는 **Pipeline-As-Code** 를 구현할 수 있게 해줌
- Freestyle은 단일 작업에는 유용하지만 CI/CD는 **빌드-테스트-패키징-배포** 등의<br>여러 단계로 나누어진 작업들이 효과적으로 이루어져야 함
- 젠킨스 Pipeline의 2가지 문법
  - Scripted pipeline
    - 익숙하지 않은 젠킨스의 고유 문법을 사용해야 함
  - Declarative pipeline
    - 익숙한 YAML을 사용할 수 있음

<br>

**순서**

1. 소스 코드 저장소에서 빌드할 소스 코드와 선언적 문법의 Jenkinsfile 내려받기
2. Jenkinsfile을 해석해서 작업 자동 수행

<br>

**Build Triggers 옵션 살펴보기**

- Build after other projects are built
  - 다른 프로젝트 빌드 후 이 프로젝트 빌드
  - 특정 프로젝트를 빌드하기 위한 사전 조건을 구성해야 하는 경우,<br>혹은 여러 프로젝트를 빌드하는 때 순서에 따른 의존 관계가 있는 경우에 사용할 수 있음
- Build periodically
  - 주기적으로 프로젝트 빌드 수행
  - 주기를 설정할 때 **Cron** 이라는 스케줄 도구의 문법 활용
- Poll SCM
  - 소스 코드 저장소에서 주기적으로 내용을 검사하고 빌드
  - 여기서도 Cron 문법을 사용해서 주기적으로 빌드
  - Build periodically와 다르게 저장소의 내용에 변경이 있을 때만 빌드 수행
- 빌드 안함
  - 임시로 사용하지 않을 프로젝트 등에 설정
  - 웹 화면 상에서도 '이 프로젝트는 현재 비활성 상태입니다' 라는 안내 표시
- Quiet period
  - 빌드 실행 시 약간의 지연 시간을 주는 옵션
  - 지연 시간의 범위 이내에 들어온 요청도 함께 포함해서 처리하기 때문에 불필요한 작업 중복 방지
  - 단 젠킨스 UI에서의 'Build Now' 버튼은 이 값을 무시함
- 빌드를 원격으로 유발
  - 외부 연계를 위해 젠킨스 빌드 작업을 외부에서 URL 호출로 시작할 때 사용
  - 작업 실행 권한의 인증을 위한 토큰 입력 가능
  - `<JENKINS_URL>/job/<작업명>/build?token=<토큰 이름>` 의 형식으로 URL을 호출하여 빌드

<br>

**Jenkinsfile 이해하기**

```sh
pipeline {
  agent any
  stages {
    stage('git scm update') {
      steps {
        git url: 'https://github.com/IaC-Source/echo-ip.git', branch: 'main'
      }
    }
    stage('docker build and push') {
      steps {
        sh '''
        docker build -t 192.168.1.10:8443/echo-ip .
        docker push 192.168.1.10:8443/echo-ip
        '''
      }
    }
    stage('deploy kubernetes') {
      steps {
        sh '''
        kubectl create deployment pl-bulk-prod --image=192.168.1.10:8443/echo-ip
        kubectl expose deployment pl-bulk-prod --type=LoadBalancer --port=8080 \
                                               --target-port=80 --name=pl-bulk-prod-svc
        '''
      }
    }
  }
}
```

- pipeline
  - 선언적 문법이 시작하는 부분
  - 선언적 문법은 `{}` 사이에 작업 내용을 작성해야 함
- agent
  - 작업을 수행할 에이전트 지정 및 필요한 설정 진행
  - 지정된 에이전트 내부에서 젠킨스 빌드 작업이 실제로 수행됨
  - 에이전트 지정 방식들
    - any : 젠킨스가 임의로 사용 가능한 에이전트 지정
    - label : 특정 레이블과 일치하는 에이전트 노드를 지정
    - docker : 에이전트 노드의 이미지를 도커로 지정
    - kubernetes : 에이전트 노드를 쿠버네티스 파드로 지정
- stages
  - stage들을 모아서 정의하고 이를 순서대로 진행
- stage
  - step들을 정의하는 영역
  - 젠킨스에서 빌드가 진행될 때 stage 별로 진행 단계 확인 가능
- steps
  - stage 내부에서 실제 작업 내용을 작성하는 영역
  - 이 안에서 script, sh, git 등의 작업을 통해서 실제로 동작하게 됨

<br>
<br>

## Pipeline 프로젝트로 구현하는 블루그린 배포 전략

- 쿠버네티스에서 애플리케이션을 배포하는 것은 어렵지 않음
- 하지만 파드 특성상 배포되는 애플리케이션의 변경이 있으면<br>삭제 후 재생성하는 과정을 거치게 되고, 무중단 배포를 할 수가 없게 됨
- 그래서 이번에는 무중단 배포 방법인 블루그린 전략을 젠킨스 상에서 구현하는 방법을 알아볼 것

<br>

**blue-green 배포 전략**

- 배포 전략 : 모든 파드가 업데이트된 이후에 트래픽을 전달하자
- 2개의 디플로이먼트를 생성하고 기존에 배포된 블루 디플로이먼트로 계속 트래픽 전달
- 새로 배포되는 그린 디플로이먼트의 모든 파드가 업데이트되어 트래픽 처리에 문제가 없을 때<br>서비스를 모두 새로 배포된 그린 디플로이먼트로 넘김
- 그리고 기존 블루 디플로이먼트는 삭제
- 이렇게 하면 무중단 배포가 가능해지고, 문제 발생 시 원복도 수월해짐
- 하지만 배포를 위한 디플로이먼트를 만들기 위해 기존에 비해 최소 2배 이상의 리소스가 필요
- 그래도 무중단 배포와 장애 복구의 이점 때문에 리소스 사용은 크게 부각되는 단점이 아님
- 쿠버네티스에는 블루그린 배포가 기본 기능이 아니지만 젠킨스를 이용하면 구현 가능

<br>

**Jenkinsfile**

```sh
pipeline {
  agent {
    kubernetes {
      yaml '''
      apiVersion: v1
      kind: Pod
      metadata:
        labels:
          app: blue-green-deploy
        name: blue-green-deploy
      spec:
        containers:
        - name: kustomize
          image: sysnet4admin/kustomize:3.6.1
          tty: true
          volumeMounts:
          - mountPath: /bin/kubectl
            name: kubectl
          command:
          - cat
        serviceAccount: jenkins
        volumes:
        - name: kubectl
          hostPath:
            path: /bin/kubectl
      '''
    }
  }
  stages {
    stage('git scm update'){
      steps {
        git url: 'https://github.com/IaC-Source/blue-green.git', branch: 'main'
      }
    }
    stage('define tag'){
      steps {
        script {
          if(env.BUILD_NUMBER.toInteger() % 2 == 1){
            env.tag = "blue"
          } else {
            env.tag = "green"
          }
        }
      }
    }
    stage('deploy configmap and deployment'){
      steps {
        container('kustomize'){
          dir('deployment'){
            sh '''
            kubectl apply -f configmap.yaml
            kustomize create --resources ./deployment.yaml
            echo "deploy new deployment"
            kustomize edit add label deploy:$tag -f
            kustomize edit set namesuffix -- -$tag
            kustomize edit set image sysnet4admin/dashboard:$tag
            kustomize build . | kubectl apply -f -
            echo "retrieve new deployment"
            kubectl get deployments -o wide
            '''
          }
        }
      }
    }
    stage('switching LB'){
      steps {
        container('kustomize'){
          dir('service'){
            sh '''
            kustomize create --resources ./lb.yaml
            while true;
            do
              export replicas=$(kubectl get deployments \
              --selector=app=dashboard,deploy=$tag \
              -o jsonpath --template="{.items[0].status.replicas}")
              export ready=$(kubectl get deployments \
              --selector=app=dashboard,deploy=$tag \
              -o jsonpath --template="{.items[0].status.readyReplicas}")
              echo "total replicas: $replicas, ready replicas: $ready"
              if [ "$ready" -eq "$replicas" ]; then
                echo "tag change and build deployment file by kustomize"
                kustomize edit add label deploy:$tag -f
                kustomize build . | kubectl apply -f -
                echo "delete $tag deployment"
                kubectl delete deployment --selector=app=dashboard,deploy!=$tag
                kubectl get deployments -o wide
                break
              else
                sleep 1
              fi
            done
            '''
          }
        }
      }
    }
  }
}
```

- kubernetes
  - 쿠버네티스의 파드를 젠킨스 작업이 수행되는 에이전트로 사용
  - `kubernetes { }` 내부에서는 에이전트로 사용할 파드에 대한 명세를 YAML 형태로 정의 가능
- yaml
  - 젠킨스의 에이전트로 만들어지는 파드의 명세
  - `kubectl` 명령어로 파드를 생성할 때 쓰는 매니페스트와 동일한 형식의 YAML 사용 가능
  - kustomize를 바로 사용할 수 있도록 이미 설치되어 있는 컨테이너를 에이전트 파드에 포함
  - kubectl을 사용할 수 있도록 호스트와 연결된 볼륨이 설정되어 있음
  - 쿠버네티스 클러스터에 오브젝트를 배포할 수 있도록 서비스 어카운트 jenkins가 설정되어 있음
- 'git scm update' stage
  - Github로부터 소스 코드 내려받기 단계
  - 지정된 url의 main 브랜치로부터 코드를 내려받음
- 'define tag' stage
  - 실습에서는 젠킨스의 빌드 횟수마다 부여되는 번호에 따라<br>블루/그린이 전환되도록 젠킨스 스크립트 사용
  - 젠킨스 빌드 번호가 홀수일 때 tag 환경변수값을 blue로, 짝수일 때 green으로 설정
- 'deploy configmap and deployment' stage
  - 대시보드를 배포하기 위해 필요한 ConfigMap 배포 후 디플로이먼트를 배포하는 단계
  - `dir(deployment)`를 통해 하위 디렉토리로 이동 후 작업 진행
  - 디플로이먼트의 이미지, 이름, 레이블에 설정한 tag 환경 변수를<br>일일이 수정하지 않도록 kustomize 명령 사용
- 'switching LB' stage
  - 디플로이먼트 배포 이후 외부의 요청을 로드밸런서에 보내줄 대상을 다시 설정하는 단계
  - `dir(service)`를 통해 하위 디렉토리로 이동 후 작업 진행
  - kustomize를 통해 tag 환경변수 덧붙이는 작업
  - replicas 값과 readyReplicas 값을 비교해 값이 같은 경우 배포가 완료되었다고 판단

<br>
<br>

# 젠킨스 플러그인을 통해 구현되는 GitOps

**젠킨스가 제공하는 플러그인 종류**

- Platforms : 웹 애플리케이션 이외의 플랫폼에서 작동하는 애플리케이션 빌드를 위한 것들
- User Interface : 젠킨스 확장 UI를 적용하기 위한 것들
- Administration : 젠킨스 자체 관리에 필요한 것들
- Source code management : 소스 코드 저장소 연결이나 관리를 위한 것들
- Build management : CI/CD 단계에서 추가적으로 사용할 수 있는 것들

<br>

- 이번 장 목표 : 아래 3개의 플러그인을 조합해 젠킨스에서 GitOps 구현하기
  - Kubernetes Continuous Deploy : 쿠버네티스용 지속적 배포
  - Slack Notification : 슬랙 알림
  - Last Changes : 변경 내용 비교

<br>

※ GitOps란?

- Git과 Ops(Operations, 운영)의 합성어
- git을 통해 모든 것을 선언적으로 SCM에 업데이트하면 오퍼레이터가 변경 감지 및 배포
- 현재 쿠버네티스 환경에 맞춰 설명하자면···
  - 배포되어야 할 매니페스트 파일을 Github 저장소에 저장
  - 매니페스트 업데이트 시 젠킨스가 이를 파악해서 쿠버네티스 클러스터에 배포

<br>

※ GitOps의 이점

- SCM의 내용과 상용 및 운영 환경의 내용을 동일하게 가져감
  - SCM을 통해 모든 내용을 단일화해서 관리하고 히스토리도 관리할 수 있으며 복구도 빠름
- 배포를 표준화하여 자동 배포 가능
  - 배포 과정을 미리 정의해서 SCM에 변경된 내용을 선언만 하면 모든 배포 자동 진행
- 사람의 실수를 줄여줌
  - 모든 배포 과정이 자동화되어 견고한 시스템 구축 가능

<br>
<br>

## 쿠버네티스 환경에 적합한 선언적인 배포 환경

- 지금까지는 cluster-admin 역할을 가진 jenkins 서비스 어카운트를 사용해서<br>쿠버네티스 오브젝트를 배포했음
- 그런데 이 방법에는 외부의 쿠버네티스 클러스터의 권한이 없음
- 외부 클러스터에 접근하려면 **kubeconfig** 파일을 이용해서<br>외부 클러스터의 API 서버로 접근한 다음 오브젝트를 배포해야 함
- 그런데 그 방법에도 kubeconfig를 바로 받아 사용할 때 보안적으로 문제가 있음
- 이 때 필요한 것이 **Kubernetes Continuous Deploy** 플러그인
- GitOps를 사용한다는 것은 대부분 여러 목적을 가지는 다수 클러스터 환경을 사용하는 경우
- GitOps의 중요한 기능 중 하나인 '변화 감지'는 젠킨스 기본 플러그인 **Poll SCM** 사용

<br>

※ kubeconfig 확인하기

- 명령어 : `kubectl config view`
- DATA+OMITTED, REDACTED는 민감한 정보를 생략했다는 뜻
  - 충분한 권한을 가진 사용자라면 `--raw` 옵션을 통해 확인 가능
- cluster
  - 어떤 쿠버네티스 클러스터에 접속할지에 대한 정보
  - 접속 대상이 되는 클러스터의 정보를 여러 개 포함할 수 있음
  - 각 클러스터 접속 정보는 API 서버의 주소와 인증 기관 정보로 이루어져 있음
- contexts
  - 클러스터 정보와 사용자 정보의 조합이 담겨 있는 부분
  - `kubectl` 명령어 사용 시 context에 설정된 user의 자격을 가지고<br>설정된 cluster에 접속하게 되는 것
- current-context
  - 현재 사용 중인 context가 무엇인지 표시
- users
  - 클러스터에 접속하는 사용자가 누구인지 정보 표시
  - client-certificate-data 및 client-key-data를 속성으로 가지고 있음

<br>

**젠킨스 관리 > Manage Credentials > (global) > Add Credentials**

- 지속적 배포 플러그인이 사용할 새로운 자격 증명 정보를 추가하기 위한 작업
- Kind
  - 자격 증명 종류 선택
  - Username with Password : 마스터 노드 접속 시 유저 이름과 비밀번호를 입력받는 형식
  - kubernetes configuration (kubeconfig) : 쿠버네티스용 지속적 배포 플러그인이 사용할 설정 파일 등록
- Scope
  - 자격 증명 적용 범위
  - Global(Jenkins, nodes, all child items, etc) : 젠킨스 전역에서 자격 증명 사용
- Username
  - 시스템에 접속하기 위한 사용자 이름 입력
  - 마스터 노드에 접속하는 기본 계정 `root` 입력
- Password
  - 시스템에 접속하기 위한 비밀번호
  - 베이그런트로 만들어진 가상 머신들의 초기 비밀번호는 `vagrant`
- ID
  - 자격 증명을 사용할 때 식별하기 위한 값
- Description
  - 자격 증명에 대한 간단한 설명 작성

<br>

**Poll SCM**

- 주기적으로 SCM의 변경을 인식하게 할 수 있음
- `*/10 * * * *` 방식으로 작성 가능
- 이 표현 방식을 **cron expression** 이라고 함
- 젠킨스는 `H/* * * *` 방식을 권장함
  - 이 방식을 사용하면 1분에 한번씩 검사하지만 부하가 없는 시점에 실행되므로 정확하지 않음
