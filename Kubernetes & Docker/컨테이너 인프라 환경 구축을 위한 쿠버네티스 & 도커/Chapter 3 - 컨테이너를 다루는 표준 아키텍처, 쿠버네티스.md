**※ 컨테이너 인프라 환경이란?**

- 리눅스 운영 체제의 커널 하나에서 여러 개의 컨테이너가 격리된 상태로 실행되는 인프라 환경
  - 여기서 컨테이너는 하나 이상의 목적을 위해 독립적으로 작동하는 프로세스
- 개인 환경에서는 혼자서 다양한 응용프로그램을 사용하므로 각각의 프로그램을 컨테이너로 구현할 필요가 없지만,<br>기업 환경에서는 다수의 관리자가 여러 대의 서버를 함께 관리하기 때문에 일관성을 유지해야 함
- 가상화 환경에서는 각각의 가상 머신이 모두 독립적인 운영 체제 커널을 가지고 있어야 하기 때문에 그만큼 자원이 더 소모됨
- 컨테이너 인프라 환경은 처음부터 주목받지는 못했지만 구글이 **Kubernetes**를 오픈 소스로 공개하면서 주목을 받게 되었음

<br>
<br>

# 쿠버네티스 이해하기

- 앞 챕터에서 쿠버네티스를 컨테이너 관리 도구라고 했지만, 실제로는 **컨테이너 오케스트레이션**을 위한 솔루션
  - Orchestration이란 복잡한 단계를 관리하고 요소들의 유기적인 관계를 미리 정의해<br>손쉽게 사용하도록 서비스를 제공하는 것을 뜻함
  - 다수의 컨테이너를 유기적으로 연결, 실행, 종료할 뿐만 아니라 상태를 추적하고 보존하는 등<br>컨테이너를 안정적으로 사용할 수 있게 만들어주는 것

<br>
<br>

## 왜 쿠버네티스일까

- Docker Swarm
  - 간단하게 설치할 수 있고 사용하기에도 용이함
  - 그러나 기능이 다양하지 않아 대규모 환경에 적용하려면 사용자 환경을 변경해야 될 수도 있음
- Mesos
  - Apache의 오픈 소스 프로젝트로 역사와 전통이 있는 클러스터 도구
  - 트위터, 에어비앤비, 애플, 우버 등 다양한 곳에서 이미 검증된 솔루션
  - 2016년 DC/OS(Data Center OS)의 지원으로 매우 간결해짐
  - 그러나 기능을 충분히 활용하려면 분산 관리 시스템과 연동해야 함
  - 따라서 여러 가지 솔루션을 유기적으로 구성해야 하는 부담이 있음
- Nomad
  - 베이그런트를 만든 HashiCorp 사의 컨테이너 오케스트레이션
  - 베이그런트처럼 간단한 구성으로 컨테이너 오케스트레이션 환경 제공
  - 그러나 도커 스웜과 마찬가지로 기능이 부족하므로 여러 기능을 사용하는 환경에서는 힘듦
  - HashiCorp의 Consul(서비스 검색, 구성 및 분할 기능), Vault(암호화 저장소)와의 연동이 원할하므로<br>이런 도구에 대해 사용 성숙도가 높은 조직이라면 도입을 고려해볼 수 있음
- Kubernetes
  - 다른 오케스트레이션 솔루션보다는 시작하는 데 어려움이 있지만, 여러 도구들 덕에 설치가 쉬워지는 추세
  - 다양한 형태로 발전하면서, 컨테이너 오케스트레이션을 넘어<br>IT 인프라 자체를 컨테이너화하고 컨테이너화된 인프라 제품군을 쿠버네티스 위에서 동작할 수 있게 함
  - 거의 모든 벤더와 오픈 소스 진영에서 쿠버네티스를 지원하고 그에 맞게 통합 개발하고 있음

|      구분      |  도커 스웜  |   메소스    |  노매드   | 쿠버네티스  |
| :------------: | :---------: | :---------: | :-------: | :---------: |
|  설치 난이도   |    쉬움     | 매우 어려움 |   쉬움    |   어려움    |
|  사용 편의성   |  매우 좋음  |    좋음     | 매우 좋음 |    좋음     |
| 세부 설정 지원 |  거의 없음  |    있음     | 거의 없음 |   다양함    |
|     안정성     | 매우 안정적 |   안정적    |  안정적   | 매우 안정적 |
|     확장성     |   어려움    | 매우 잘 됨  |  안정적   | 매우 잘 됨  |
|     정보량     |    많음     |    적음     |   적음    |  매우 많음  |
|  에코 파트너   |    없음     |  거의 없음  |   있음    |  매우 많음  |
|   학습 곡선    |    쉬움     | 매우 어려움 |  어려움   |   어려움    |

※ k8s의 의미

- kubernetes에서 끝의 k와 s만 두고, 나머지 8자는 축약한 것
- 참고로 쿠버네티스는 그리스어로 도선사나 조타수를 의미함

<br>
<br>

## 쿠버네티스 구성 방법

### 1. 퍼블릭 클라우드 업체에서 제공하는 관리형 쿠버네티스 사용

- EKS(Amazon Elastic Kubernetes Service), AKS(Azure Kubernetes Services), GKE(Google Kubernetes Engine) 등을 사용
- 구성이 이미 다 갖춰져 있고 마스터 노드를 클라우드 업체에서 관리하기 때문에 학습용으로 부적합

<br>

### 2. 설치형 쿠버네티스 사용

- 수세의 Rancher, 레드햇의 OpenShift 사용
- 유료라 쉽게 접근하기 어려움

<br>

### 3. 구성형 쿠버네티스 사용

- 사용하는 시스템에 쿠버네티스 클러스터를 자동으로 구성해주선 솔루션을 사용하는 방법
- kubeadm, kops, KRIB, kubespray 등이 있으며, kubeadm이 가장 널리 알려져 있음
  - kubeadm은 사용자가 변경하기도 수월하고, 온프레미스와 클라우드를 모두 지원하며, 배우기도 쉬움

<br>
<br>

## 쿠버네티스 구성하기

※ Vagrantfile

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  N = 3 # max number of worker nodes
  Ver = '1.18.4' # Kubernetes Version to install

  #=============#
  # Master Node #
  #=============#

    config.vm.define "m-k8s" do |cfg|
      cfg.vm.box = "sysnet4admin/CentOS-k8s"
      cfg.vm.provider "virtualbox" do |vb|
        vb.name = "m-k8s(github_SysNet4Admin)"
        vb.cpus = 2
        vb.memory = 3072
        vb.customize ["modifyvm", :id, "--groups", "/k8s-SgMST-1.13.1(github_SysNet4Admin)"]
      end
      cfg.vm.host_name = "m-k8s"
      cfg.vm.network "private_network", ip: "192.168.1.10"
      cfg.vm.network "forwarded_port", guest: 22, host: 60010, auto_correct: true, id: "ssh"
      cfg.vm.synced_folder "../data", "/vagrant", disabled: true
      cfg.vm.provision "shell", path: "config.sh", args: N
      cfg.vm.provision "shell", path: "install_pkg.sh", args: [ Ver, "Main" ]
      cfg.vm.provision "shell", path: "master_node.sh"
    end

  #==============#
  # Worker Nodes #
  #==============#

  (1..N).each do |i|
    config.vm.define "w#{i}-k8s" do |cfg|
      cfg.vm.box = "sysnet4admin/CentOS-k8s"
      cfg.vm.provider "virtualbox" do |vb|
        vb.name = "w#{i}-k8s(github_SysNet4Admin)"
        vb.cpus = 1
        vb.memory = 2560
        vb.customize ["modifyvm", :id, "--groups", "/k8s-SgMST-1.13.1(github_SysNet4Admin)"]
      end
      cfg.vm.host_name = "w#{i}-k8s"
      cfg.vm.network "private_network", ip: "192.168.1.10#{i}"
      cfg.vm.network "forwarded_port", guest: 22, host: "6010#{i}", auto_correct: true, id: "ssh"
      cfg.vm.synced_folder "../data", "/vagrant", disabled: true
      cfg.vm.provision "shell", path: "config.sh", args: N
      cfg.vm.provision "shell", path: "install_pkg.sh", args: Ver
      cfg.vm.provision "shell", path: "work_nodes.sh"
    end
  end

end
```

- line 5 : 쿠버네티스에서 작업을 수행할 워커 노드의 수를 변수로 받음
- line 6 : 쿠버네티스 버전을 사용자가 선택할 수 있도록 변수로 저장
- line 25 : `args: [ Ver, "Main" ]` 코드를 통해 쿠버네티스 버전 정보와 Main이라는 문자를 install_pkg.sh에 전달
- line 26 / line 48 : 쿠버네티스 마스터 노드를 위한 master_node.sh와 워커 노드를 위한 work_nodes.sh 코드 추가

※ config.sh

- kubeadm으로 쿠버네티스를 설치하기 위한 사전 조건 설정 스크립트

```ruby
#!/usr/bin/env bash

# vim configuration
echo 'alias vi=vim' >> /etc/profile

# swapoff -a to disable swapping
swapoff -a
# sed to comment the swap partition in /etc/fstab
sed -i.bak -r 's/(.+ swap .+)/#\1/' /etc/fstab

# kubernetes repo
gg_pkg="packages.cloud.google.com/yum/doc" # Due to shorten addr for key
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://${gg_pkg}/yum-key.gpg https://${gg_pkg}/rpm-package-key.gpg
EOF

# Set SELinux in permissive mode (effectively disabling it)
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config

# RHEL/CentOS 7 have reported traffic issues being routed incorrectly due to iptables bypassed
cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
modprobe br_netfilter

# local small dns & vagrant cannot parse and delivery shell code.
echo "192.168.1.10 m-k8s" >> /etc/hosts
for (( i=1; i<=$1; i++  )); do echo "192.168.1.10$i w$i-k8s" >> /etc/hosts; done

# config DNS
cat <<EOF > /etc/resolv.conf
nameserver 1.1.1.1 #cloudflare DNS
nameserver 8.8.8.8 #Google DNS
EOF
```

- line 4 : vi를 호출하면 vim을 호출하도록 프로파일 입력
- line 7 : 쿠버네티스의 설치 요구 조건을 맞추기 위해 스왑되지 않도록 설정
- line 9 : 시스템이 다시 시작되더라도 스왑이 되지 않도록 설정
- line 13~21 : 쿠버네티스를 내려받을 리포지토리 설정
- line 24~25 : selinux가 제한적으로 사용되지 않도록 permissive 모드로 변경
- line 28~31 : 브리지 네트워크를 통과하는 IPv4와 IPv6의 패킷을 iptables가 관리하게 설정<br>pod의 통신을 iptables로 제어<br>필요에 따라 IPVS(IP Virtual Server) 같은 방식으로도 구성 가능
- line 32 : br_netfilter 커널 모듈을 사용해 브리지로 네트워크 구성<br>IP Masquerade를 사용해 내부 네트워크와 외부 네트워크 분리
  - IP Masquerade는 커널에서 제공하는 NAT(Network Address Translation) 기능
- line 35~36 : 쿠버네티스 안에서 노드 간 통신을 이름으로 할 수 있도록 각 노드의 호스트 이름과 IP를 /etc/hosts에 설정<br>이때 워커 노드는 Vagrantfile에서 넘겨받은 N 변수로 전달된 노드 수에 맞게 동적으로 생성
- line 39~42 : 외부와 통신할 수 있게 DNS 서버 지정

※ install_pkg.sh

- 클러스터를 구성하기 위해서 가상 머신에 설치돼야 하는 의존성 패키지를 명시
- 실습에 필요한 소스 코드를 m-k8s 가상 머신 내부에 내려받도록 설정

```ruby
#!/usr/bin/env bash

# install packages
yum install epel-release -y
yum install vim-enhanced -y
yum install git -y

# install docker
yum install docker -y && systemctl enable --now docker

# install kubernetes cluster
yum install kubectl-$1 kubelet-$1 kubeadm-$1 -y
systemctl enable --now kubelet

# git clone _Book_k8sInfra.git
if [ $2 = 'Main' ]; then
  git clone https://github.com/sysnet4admin/_Book_k8sInfra.git
  mv /home/vagrant/_Book_k8sInfra $HOME
  find $HOME/_Book_k8sInfra/ -regex ".*\.\(sh\)" -exec chmod 700 {} \;
fi
```

- line 6 : git 설치
- line 9 : 쿠버네티스를 관리하는 컨테이너를 설치하기 위해 도커 설치 및 구동
- line 12~13 : 쿠버네티스를 구성하기 위해 첫 번째 변수(1.18.4)의 버전으로 kubectl, kubelet, kubeadm 설치 및 kubelet 시작
- line 16~20 : 전체 실행 코드를 마스터 노드에만 내려받도록 Vagrantfile에서 두 번째 변수(Main)를 넘겨 받고<br>git에서 코드를 내려받아 실습 진행 루트 홈디렉토리(/root)로 옮김<br>.sh를 바로 찾아서 실행할 수 있도록 `chmod 700` 설정

※ master_node.sh

- m-k8s를 쿠버네티스 마스터 노드로 구성하는 스크립트
- 여기서 쿠버네티스 클러스터를 구성할 때 꼭 선택해야 하는 CNI(Container Network Interface)도 함께 구성함

```ruby
#!/usr/bin/env bash

# init kubernetes
kubeadm init --token 123456.1234567890123456 --token-ttl 0 \
--pod-network-cidr=172.16.0.0/16 --apiserver-advertise-address=192.168.1.10

# config for master node only
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config

# config for kubernetes's network
kubectl apply -f \
https://raw.githubusercontent.com/sysnet4admin/IaC/master/manifests/172.16_net_calico.yaml
```

- line 4~5 : kubeadm을 통해 쿠버네티스의 워커 노드를 받아들일 준비
  - 토큰 값 지정
  - ttl(time to live)을 0으로 설정해서 기본값인 24시간 후에 토큰이 계속 유지되도록 함
  - 워커 노드가 정해진 토큰으로 들어오게 함
  - 쿠버네티스가 컨테이너에 자동으로 부여하는 네트워크를 172.16.0.0/16(172.16.0.1~172.16.255.254)으로 제공
  - 워커 노드가 접속하는 API 서버의 IP를 192.168.1.10으로 지정해 워커 노드들이 자동으로 API 서버에 연결되도록 함
- line 8~10 : 마스터 노드에 현재 사용자가 쿠버네티스를 정상적으로 구동할 수 있게 설정 파일을 홈디렉토리(/root)에 복사하고<br>쿠버네티스를 이용할 사용자에게 권한 부여
- line 13~14 : CNI인 Calico의 설정을 적용해 쿠버네티스의 네트워크 구성

※ work_nodes.sh

- 3대의 가상 머신(w1-k8s, w2-k8s, w3-k8s)에 쿠버네티스 워커 노드를 구성하는 스크립트
- 마스터 노드에 구성된 클러스터에 조인이 필요한 정보가 모두 코드화되어 있어서<br>스크립트를 실행하기만 하면 편하게 워커 노드로서 쿠버네티스 클러스터에 조인

```ruby
#!/usr/bin/env bash

# config for work_nodes only
kubeadm join --token 123456.1234567890123456 \
             --discovery-token-unsafe-skip-ca-verification 192.168.1.10:6443
```

- line 4~5 : kubeadm을 이용해 쿠버네티스 마스터 노드에 접속
  - 연결에 필요한 토큰은 기존에 마스터 노드에서 생성한 것 사용
  - 간단하게 구성하기 위해 `--discovery-token-unsafe-skip-ca-verification`으로 인증 무시
  - API 서버 주소인 192.168.1.10으로 기본 포트 번호인 6443포트에 접속하도록 설정

※ vagrant up 이후 마스터 노드와 워커 노드 확인하는 명령어

- 마스터 노드 콘솔에서 `kubectl get nodes` 입력

<br>
<br>

## 파드 배포를 중심으로 쿠버네티스 구성 요소 살펴보기

- kubectl, kubelet, API 서버, 캘리코 등은 모두 쿠버네티스 클러스터를 이루는 구성 요소
- 그 외에도 etcd, 컨트롤러 매니저, 스케줄러, kube-proxy, 컨테이너 런타임, 파드 등이 있음
- 구성 요소 확인 명령어 : `kubectl get pods --all-namespaces`
  - `--all-namespaces`는 기본 네임스페이스인 default 외에 모든 것을 표시하겠다는 의미

※ 쿠버네티스 구성 요소의 이름 생성 규칙

- 쿠버네티스 구성 요소는 동시에 여러 개가 존재하는 경우 중복되는 이름을 피하기 위해 무작위 문자열로 된 hash 코드가 삽입됨
- 구성 요소의 이름을 직접 지정할 수도 있지만, 언제라도 문제가 발생하면 다시 생성되도록 두기 위해 자동으로 관리하는 것이 편함
- coredns 중간의 문자열은 ReplicaSet을 무작위 문자열로 변형해 추가한 것

<br>

### 관리자나 개발자가 파드를 배포할 때

**마스터 노드**

1. kubectl

- 쿠버네티스 클러스터에 명령을 내리는 역할
- 다른 구성 요소들과 다르게 바로 실행되는 명령 형태인 binary로 배포되기 때문에 마스터 노드에 있을 필요는 없음
- 하지만 통상적으로 API 서버와 통신하므로 이 책에서는 API 서버가 위치한 마스터 노드에 구성했음

2. API 서버

- 쿠버네티스 클러스터의 중심 역할을 하는 통로
- 주로 상태 값을 저장하는 etcd와 통신
- 그 밖의 요소들 또한 API 서버를 중심을 두고 통신

3. etcd

- 구성 요소들의 상태 값이 모두 저장되는 곳
- etcd 외의 다른 구성 요소는 상태 값을 관리하지 않음
- etcd의 정보만 백업돼 있다면 긴급 상황에서도 쿠버네티스 클러스터를 복구할 수 있음
- key-value 저장소이므로, 복제해서 여러 곳에 저장해두면 하나의 etcd에서 장애가 나더라도 시스템 가용성 확보 가능
- etcd는 리눅스의 구성 정보를 주로 가지고 있는 etc와 distributed(퍼뜨렸다)의 합성어

4. 컨트롤러 매니저

- 쿠버네티스 클러스터의 오브젝트 상태를 관리
- 예를 들어 워커 노드에서 통신이 되지 않는 경우, 상태 체크와 복구는 컨트롤러 매니저에 속한 노드 컨트롤러에서 이루어짐
- 다른 예로 레플리카셋 컨트롤러는 레플리카셋에 요청받은 파드 개수대로 파드를 생성함
- 이처럼 다양한 상태 값을 관리하는 주체들이 컨트롤러 매니저에 소속되어 각자의 역할을 수행함

5. 스케줄러

- 노드의 상태와 자원, 레이블, 요구 조건 등을 고려해 파드를 어떤 워커 노드에 생성할 것인지를 결정하고 할당함
- 스케줄러라는 이름에 걸맞게 파드를 조건에 맞는 워커 노드에 지정하고, 파드가 워커 노드에 해당되는 일정을 관리하는 관리자 역할 담당

**워커 노드**

1. kubelet

- 파드의 구성 내용(PodSpec)을 받아서 컨테이너 런타임으로 전달
- 파드 안의 컨테이너들이 정상적으로 작동하는지 모니터링

2. 컨테이너 런타임 (CRI, Container Runtime Interface)

- 파드를 이루는 컨테이너의 실행을 담당
- 파드 안에서 다양한 종류의 컨테이너가 문제 없이 작동하게 만드는 표준 인터페이스

3. Pod

- 1개 이상의 컨테이너로 단일 목적의 일을 하기 위해서 모인 단위
- 웹 서버 역할을 할 수도 있고 로그나 데이터를 분석할 수도 있음
- 중요한 점 : **파드는 언제나 죽을 수 있는 존재**
  - 이것이 쿠버네티스를 처음 배울 때 가장 이해하기 어려운 부분
  - 가상 머신은 언제라도 죽을 수 있다고 가정하고 디자인하지 않음
  - 파드는 언제라도 죽을 수 있다고 가정하고 설계됐기 때문에 쿠버네티스는 여러 대안을 디자인했음

**선택 가능한 구성 요소**

1. 네트워크 플러그인

- 쿠버네티스 클러스터의 통신을 위해서 네트워크 플러그인을 선택하고 구성해야 함
- 일반적으로 CNI로 구성함
- 주로 사용하는 CNI는 Calico, Flannel, Cilium, Kube-router, Romana, WeaveNet, Canal이 있음

2. CoreDNS

- 클라우드 네이티브 컴퓨팅 재단에서 보증하는 프로젝트로, 빠르고 유연한 DNS 서버
- 쿠버네티스 클러스터에서 도메인 이름을 이용해 통신하는 데 사용함
- 실무에서 쿠버네티스 클러스터를 구성하여 사용할 때는 IP보다 도메인 네임을 편하게 관리해 주는 CoreDNS를 사용하는 것이 일반적

<br>

### 사용자가 배포된 파드에 접속할 때

1. kube-proxy

- 쿠버네티스 클러스터는 파드가 위치한 노드에 kube-proxy를 통해 파드가 통신할 수 있는 네트워크 설정
- 실제 통신은 br_netfilter와 iptables로 관리

2. Pod

- 이미 배포된 파드에 접속하고 필요한 내용을 전달받음
- 이때 대부분 사용자는 파드가 어느 워커 노드에 위치하는지 신경 쓰지 않아도 됨

<br>
<br>

## 파드의 생명주기로 쿠버네티스 구성 요소 살펴보기

- 구성 요소를 개별적으로 기능만 나열해서는 이해하기 어렵고, 파드가 배포되는 과정을 자세히 살펴봐야 함
- 쿠버네티스의 가장 큰 장점 : 쿠버네티스의 구성 요소마다 하는 일이 명확하게 구분되어<br>각자의 역할만 충실하게 수행하면 클러스터 시스템이 안정적으로 운영됨

※ 파드의 생명주기

1. kubectl을 통해 API 서버에 파드 생성 요청
2. 업데이트가 있을 경우 매번 : API 서버에 전달된 내용이 있으면 API 서버는 etcd에 전달된 내용을 모두 기록해<br>클러스터의 상태 값을 최신으로 유지
3. API 서버에 파드 생성이 요청된 것을 컨트롤러 매니저가 인지하면 컨트롤러 매니저는 파드를 생성하고 이 상태를 API 서버에 전달<br>아직 어떤 워커 노드에 파드를 적용할지는 결정되지 않은 채 파드만 생성
4. API 서버에 파드가 생성됐다는 정보를 스케줄러가 인지<br>스케줄러는 생성된 파드를 어떤 워커 노드에 적용할지 조건을 고려해 결정하고 해당 워커 노드에 파드를 띄우도록 요청
5. API 서버에 전달된 정보대로 지정한 워커 노드에 파드가 속해 있는지 스케줄러가 kubelet으로 확인
6. kubelet에서 컨테이너 런타임으로 파드 생성 요청
7. 파드 생성
8. 파드가 사용 가능 상태가 됨

- 쿠버네티스는 작업을 순서대로 진행한느 workflow 구조가 아니라 declarative 시스템 구조를 가지고 있음
  - 각 요소가 desired status를 선언하면 current status와 맞는지 점검하고 그것에 맞추려고 노력하는 구조
- 따라서 추구하는 상태를 API 서버에 선언하면 다른 요소들이 API 서버에 와서 현재 상태와 비교하고 그에 맞게 상태를 변경하려고 함
- 여기서 API는 현재 상태 값을 가지고 있고, 이를 보존하기 위해 etcd가 필요함
  - API 서버와 etcd는 거의 한몸처럼 움직이도록 설계되었음
- 다만 여기서 워커 노드는 워크플로우 구조에 따라 설계되었음
  - 쿠버네티스가 kubelet과 컨테이너 런타임을 통해 파드를 새로 생성하고 제거해야 하는 구조이기 때문
  - 또한 명령이 절차적으로 전달되는 방식은 시스템의 성능을 높이는 데 효율적
  - 반면에 마스터 노드는 이미 생성된 파드들을 유기적으로 연결하므로 쿠버네티스 클러스터를 안정적으로 유지하려면 선언적인 시스템이 더 나음

<br>
<br>

# 쿠버네티스 기본 사용법 배우기

## 파드를 생성하는 방법

- 쿠버네티스를 사용한다는 것은 결국 사용자에게 효과적으로 파드를 제공한다는 뜻
- `kubectl run` 명령어를 통해 파드를 쉽게 생성할 수 있음
  - `kubectl run nginx-pod --image=nginx`
  - nginx는 파드의 이름, --image=nginx는 생성할 이미지의 이름
- `kubectl create` 명령어는 deployment를 추가해서 실행해야 함
  - `kubectl create deployment dpy-nginx --image=nginx`
- `run`으로 파드를 생성하면 단일 파드 1개만 생성되어 관리되고,<br>`create deployment`로 생성하면 Deployment라는 관리 그룹 내에 파드가 생성됨
  - 비유를 들자면, 초코파이 1개를 그냥 생성한 것과 초코파이 1개를 초코파이 상자에 생성한 것
- 최근에는 대부분 `create`로 파드를 생성하지만 단순 테스트 목적이라면 `run`을 사용해볼 수 있을 것

<br>
<br>

## 오브젝트란

- 쿠버네티스를 사용하는 관점에서 파드와 디플로이먼트는 **spec**과 **status** 등의 값을 가지고 있음
- 이러한 값을 가지는 파드와 디플로이먼트를 개별 속성을 포함해 부르는 단위인 **Object**라고 함

<br>

### 기본 오브젝트

- **Pod**
  - 쿠버네티스에서 실행되는 최소 단위, 즉 웹 서비스를 구동하는 데 필요한 최소 단위
  - 독립적인 공간과 사용 가능한 IP를 가지고 있음
  - 하나의 파드는 1개 이상의 컨테이너를 갖고 있기 때문에 여러 기능을 묶어 하나의 목적으로 사용할 수 있음
  - 그러나 범용으로 사용할 때는 대부분 1개의 파드에 1개의 컨테이너를 적용함
- **Namespaces**
  - 쿠버네티스 클러스터에 사용되는 리소스들을 구분해서 관리하는 그룹
  - 예를 들어 3장에서는 3가지 네임스페이스를 사용함
    - 특별히 지정하지 않으면 기본으로 할당되는 default
    - 쿠버네티스 시스템에서 사용되는 kube-system
    - 온프레미스에서 쿠버네티스를 사용할 경우 외부에서 쿠버네티스 클러스터 내부로 접속하게 도와주는 컨테이너들이 속해 있는 metallb-system
- **Volume**
  - 파드가 생성될 때 파드에서 사용할 수 있는 디렉토리 제공
  - 기본적으로 파드는 영속되는 개념이 아니기 때문에 제공되는 디렉토리 또한 임시로 사용하게 됨
  - 하지만 파드가 사라지더라도 저장과 보존이 가능한 디렉토리를 볼륨 오브젝트를 통해 생성하고 사용할 수 있음
- **Service**
  - 파드는 클러스터 내에서 유동적이기 떄문에 접속 정보가 고정일 수 없음
  - 따라서 파드 접속을 안정적으로 유지하도록 서비스를 통해 내/외부로 연결됨
  - 서비스는 새로 파드가 생성될 때 부여되는 새로운 IP를 기존에 제공하던 기능과 연결해줌
  - 쉽게 표현하자면, 쿠버네티스 외부에서 쿠버네티스 내부로 접속할 때 내부가 어떤 구조인지,<br>파드가 살아 있는지 신경 쓰지 않아도 이를 논리적으로 연결하는 것이 서비스
  - 기존 인프라에서 로드밸런서, 게이트웨이와 비슷한 역할을 함

<br>

### 디플로이먼트

- 기본 오브젝트만으로도 쿠버네티스를 사용할 수 있지만<br>이를 좀 더 효율적으로 작동하도록 기능들을 조합하고 추가해 구현한 것이 Deployment
- 이외에도 DaemonSet, ConfigMap, ReplicaSet, PV(PersistentVolume), PVC(PersistentVolumeClaim), StatefulSet 등이 있음
- 쿠버네티스에서 가장 많이 쓰이는 디플로이먼트 오브젝트는 파드에 기반을 두고 있으며 ReplicaSet 오브젝트를 합쳐 놓은 형태

<br>
<br>

## 레플리카셋으로 파드 수 관리하기

- 많은 사용자를 대상으로 웹 서비스를 하려면 다수의 파드가 필요한데, 이를 하나씩 생성하는 것은 매우 비효율적
- 그래서 쿠버네티스에서는 다수의 파드를 만드는 레플리카셋 오브젝트를 제공함
- 예를 들어 파드를 3개 만들겠다고 레플리카셋에 선언하면 컨트롤러 매니저와 스케줄러가 워커 노드에 파드 3개를 만들도록 선언함
- 그러나 레플리카셋은 파드 수를 보장하는 기능만 제공하기 때문에 디플로이먼트를 사용하기를 권장함

<br>
<br>

## 스펙을 지정해 오브젝트 생성하기

- `kubectl create deployment` 명령어는 디플로이먼트를 생성하면서 1개의 파드만 만들 뿐
- `create`에서는 `replicas` 옵션을 사용할 수 없으며, `scale`은 이미 만들어진 디플로이먼트에서만 사용 가능
- 디플로이먼트를 생성하면서 한꺼번에 여러 개의 파드를 만들 순 없을까?
- 이 의문점을 해결하려면 **오브젝트 스펙** 파일을 작성하면 됨
- 오브젝트 스펙은 일반적으로 YAML 문법으로 작성함
  - YAML(Yet Another Markup Language, 또 다른 마크업 언어)
  - 그러나 공식 사이트에서 YAML Ain't Markup Language라고 재정의했음

※ echo-hname.yaml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-hname
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: echo-hname
          image: sysnet4admin/echo-hname
```

- apiVersion : 오브젝트를 포함하는 API의 버전
  - 일반적으로 알파와 베타 버전은 안정적이지 않지만 그만큼 풍부한 기능을 가지고 있음
- kind : `apps/v1`은 여러 종류의 `kind`를 가지고 있는데, Deployment를 선택해서 레플리카셋 생성
- metadata : 디플로이먼트의 이름과 레이블 지정
- replicas : 레플리카셋이 몇 개의 파드를 생성할지 결정

※ `kubectl api-versions` : 쿠버네티스에서 사용 가능한 API 버전 확인 명령어

※ nginx-pod.yaml

```yml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: container-name
      image: nginx
```

- 파드의 스펙이며, `echo-hname.yaml`의 `template` 부분과 동일함
- metadata : 파드의 이름 지정
- spec : 파드에서 호출할 컨테이너 이미지 지정

<br>
<br>

## apply로 오브젝트 생성하고 관리하기

- 변경 사항을 다시 적용하고 싶은 경우를 위해서 쿠버네티스는 `apply`라는 명령어를 제공함
- 애초에 변경 사항이 발생할 가능성이 있는 오브젝트는 처음부터 `create` 대신 `apply`로 생성하는 것이 좋음

|    구분     |    Run    |  Create   |      Apply      |
| :---------: | :-------: | :-------: | :-------------: |
|  명령 실행  |  제한적   |   가능    |     불가능      |
|  파일 실행  |  불가능   |   가능    |      가능       |
|    변경     |  불가능   |  불가능   |      가능       |
| 실행 편의성 | 매우 좋음 | 매우 좋음 |      좋음       |
|  기능 유지  |  제한적   |  지원됨   | 다양하게 지원됨 |

<br>
<br>

## 파드의 컨테이너 자동 복구 방법

- 쿠버네티스는 거의 모든 부분이 자동 복구되도록 설계되었음
- 특히 파드의 자동 복구 기술을 **Self-Healing**이라 하며,<br>제대로 작동하지 않는 컨테이너를 다시 시작하거나 교체해 파드가 정상 작동하게 함

※ `kubectl exec -it nginx-pod -- /bin/bash`

- `exec` : execute(실행)를 뜻함
- `-it` : stdin(standard input)의 i와 tty(teletypewriter)의 t를 합쳐서 it가 되었으며, 표준 명령을 인터페이스로 작성한다는 의미
- `--` : exec에서 인자값을 나누고 싶을 때 사용

<br>
<br>

## 파드의 동작 보증 기능

- 쿠버네티스는 파드 자체에 문제가 발생하면 파드를 자동 복구해서 파드가 항상 동작하도록 보장하는 기능도 있음
- 디플로이먼트에 속해 있지 않는 파드라면 삭제 시 바로 삭제가 되지만<br>디플로이먼트에 속해 있는 파드이면 삭제해도 `replicas`에서 지정한 파드 개수를 유지하기 위해 삭제 후 재생성함
- 디플로이먼트에 속한 파드는 디플로이먼트를 삭제해야 파드가 삭제됨

※ 파드 조회 시 유용한 명령어 :  
`kubectl get pods -o=custom-columns=NAME:.metadata.name,IP:.status.podIP,STATUS:.status.phase,NODE:.spec.nodeName`

<br>
<br>

## 노드 자원 보호하기

- 노드는 쿠버네티스 스케줄러에서 파드를 할당받고 처리하는 역할을 수행함
- 쿠버네티스는 모든 노드에 균등하게 파드를 할당하려고 하는데, 노드에 문제가 생기더라도 파드의 문제를 최소화해야 함<br>쿠버네티스는 이를 해결하기 위해 **cordon** 기능을 사용함
- `kubectl cordon` 혹은 `kubectl uncordon` 명령어를 통해 노드에 간단하게 적용할 수 있음

<br>
<br>

## 노드 유지보수하기

- 쿠버네티스를 사용하다 보면 유지보수를 위해 노드를 꺼야 하는 상황이 발생하는데, 이를 위해 쿠버네티스는 **drain** 기능을 제공함
- drain은 지정된 노드의 파드를 전부 다른 곳으로 이동시켜서 해당 노드를 유지보수할 수 있게 함
- drain은 실제로 파드를 옮기는 것이 아니라 노드에서 파드를 삭제하고 다른 곳에서 다시 생성함
  - 파드는 언제라도 삭제될 수 있기 때문에 쿠버네티스에서의 대부분의 이동은 파드를 지우고 다시 만드는 것을 뜻함
- 각 노드에 1개만 존재하는 파드 DaemonSet 관련 에러가 발생한다면 `ignore-daemonsets` 옵션을 함께 사용할 것
- 꺼두었던 노드는 `kubectl uncordon` 명령어로 복구할 수 있음

<br>
<br>

## 파드 업데이트하고 복구하기

- 파드를 운영하다 보면 컨테이너에 새로운 기능을 추가하거나 치명적인 버그가 발생해 버전을 업데이트해야 할 때가 있음
- 또는 업데이트 도중 문제가 발생해서 다시 기존 버전으로 복구해야할 때도 있음

<br>
<br>

### 파드 업데이트하기

- 오브젝트 생성 시 `--record` 옵션을 붙이면 배포한 정보의 히스토리를 기록함
  - 기록된 히스토리는 `kubectl rollout history` 명령을 실행해서 확인할 수 있음
- `--record` 옵션은 업데이트를 할 경우에도 적용할 수 있음
  - 예시 : `kubectl set image deployment rollout-nginx nginx=nginx:1.16.0 --record`
- 파드 업데이트 시, 파드는 언제라도 지우고 다시 만들 수 있기 때문에 하나씩 순차적으로 지우고 재생성함
- 업데이트를 확인하고 싶다면 `kubectl rollout status`와 `kubectl rollout history` 명령어를 사용할 것

<br>

### 업데이트 실패 시 파드 복구하기

- 만약 잘못된 컨테이너 버전이 입력된 `kubectl set image` 명령어를 실행하면 Pending 상태에서 넘어가지 못함
  - `kubectl describe` 명령어를 통해 디플로이먼트를 확인해보면 replicas가 새로 생성되는 과정에서 멈춰 있음
  - replicas가 생성을 시도했지만 컨테이너 이미지를 찾을 수 없었던 것
- `kubectl rollout undo` 명령어를 통해 마지막 업데이트를 취소하고 그 이전 업데이트로 상태를 되돌릴 수 있음

<br>

### 특정 시점으로 파드 복구하기

- `kubectl undo <Object> --to-revision=<원하는 버전>`

<br>
<br>

# 쿠버네티스 연결을 담당하는 서비스

- 쿠버네티스 클러스터 내부에서만 파드를 이용하려고 쿠버네티스를 배우는 건 당연히 아님
- 외부 사용자가 파드를 이용하는 방법을 알아야 함
- 쿠버네티스에서는 외부에서 쿠버네티스 클러스터에 접속하는 방법을 **서비스**라고 함

<br>
<br>

## 가장 간단하게 연결하는 노드포트

- 노드포트 서비스를 설정하면 모든 워커 노드의 특정 포트(노드 포트)를 열고 여기로 오는 모든 요청을 노드포트 서비스로 전달함
- 그리고 노드포트 서비스는 해당 업무를 처리할 수 있는 파드로 요청을 전달함

<br>

### 노드포드 서비스로 외부에서 접속하기

※ nodeport.yaml

```yml
apiVersion: v1
kind: Service
metadata:
  name: np-svc
spec:
  selector:
    app: np-pods
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30000
  type: NodePort
```

- 기존 파드 구조에서 `kind`가 `Service`로 바뀌었고, `spec`에 컨테이너에 대한 정보가 없음
- 그리고 접속에 필요한 네트워크 관련 정보를 설정하고, 서비스의 `type`을 `NodePort`로 지정함
- 생성 후 `kubectl get services`로 확인해보면 위 명세대로 만들어진 서비스 외에도 `CLUSTER-IP`가 있는데,<br>이는 쿠버네티스 클러스터 내부에서 사용하는 IP이며 자동으로 지정됨

<br>

### 부하 분산 테스트하기

※ 테스트 방법

```sh
$i=0; while($true)
{
  % { $i++; write-host -NoNewline "$i $_" }
  (Invoke-RestMethod "http://192.168.1.101:30000")-replace '\n', " "
}
```

- 레플리카셋을 늘려주는 만큼 존재하는 파드에 자동으로 분산되어 명령이 실행되는 것을 확인할 수 있음
- 이는 노드포트의 오브젝트 스펙에 적힌 `np-pods`와 디플로이먼트의 이름을 확인해서 동일하면 같은 파드라고 간주하기 때문

<br>

### expose로 노드포트 서비스 실행하기

- 노드포트 서비스는 오브젝트 스펙 파일 말고도 `expose` 명령어를 써서 생성할 수 있음
- 예시 : `kubectl expose deployment np-pods --type=NodePort --name=np-svc-v2 --port=80`
- 이 경우 오브젝트 스펙과는 달리 포트 번호가 30000 ~ 32767 에서 임의로 지정됨

<br>
<br>

## 사용 목적별로 연결하는 인그레스

- 노드포트 서비스는 포트를 중복 사용할 수 없어서 1개의 노드포트에 1개의 디플로이먼트만 적용됨
- 쿠버네티스에서 여러 개의 디플로이먼트가 있을 때는 **Ingress**를 사용함
- 인그레스는 고유한 주소를 제공해 사용 목적에 따라 다른 응답을 제공할 수 있고,<br>트래픽에 대한 L4/L7 로드밸런서와 보안 인증서를 처리하는 기능을 제공함
- 인그레스를 사용하려면 인그레스 컨트롤러가 필요
  - 다양한 인그레스 컨트롤러가 있는데 여기서는 쿠버네티스에서 프로젝트로 지원하는 NGINX 인그레스 컨트롤러로 구성해볼 것
- 인그레스 컨트롤러는 파드와 직접 통신 불가
  - 노드포트 또는 로드밸런서 서비스와 연동되어야 함
  - 여기서는 노드포트로 이를 연동했음
- NGINX 인그레스 컨트롤러 작동 단계
  1. 사용자는 노드마다 설정된 노드포트를 통해 노드포트 서비스로 접속<br>이때 노드포트 서비스를 NGINX 인그레스 컨트롤러로 구성
  2. NGINX 인그레스 컨트롤러는 사용자의 접속 경로에 따라 적합한 클러스터 IP 서비스로 경로 제공
  3. 클러스터 IP 서비스는 사용자를 해당 파드로 연결해줌
- 인그레스 컨트롤러의 궁극적인 목적 : 사용자가 접속하려는 경로에 따라 다른 결과값을 제공하는 것
- NGINX 인그레스 컨트롤러는 default 네임스페이스가 아닌 ingress-nginx 네임스페이스에 속하므로<br>조회 시 `-n ingress-nginx` 옵션을 추가해야 함
  - `-n`은 namespace의 약어로, default 외의 네임스페이스를 확인할 때 사용하는 옵션

※ ingress-config.yaml

```yml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  # Ingress의 이름이며, 이를 통해 통신할 ingress 컨트롤러 확인
  name: ingress-nginx
  # 메타데이터의 기록 및 변경으로, 여기선 rewrite-target을 기본 주소로 지정함
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  # 규칙 지정
  rules:
    - http:
        paths:
          # 기본 경로 규칙
          - path:
            backend:
              serviceName: hname-svc-default
              servicePort: 80
          # /ip 경로 추가
          - path: /ip
            backend:
              serviceName: ip-svc
              servicePort: 80
          # /your-directory 경로 추가
          - path: /your-directory
            backend:
              serviceName: your-svc
              servicePort: 80
```

- 설정 파일 등록 후 `kubectl get ingress`로 확인 가능
  - `kubectl get ingress -o yaml`로 요청한 내용이 확실하게 적용되었는지 확인 가능

※ ingress.yaml

```yml
apiVersion: v1
kind: Service
metadata:
  # 서비스 이름
  name: nginx-ingress-controller
  # 네임스페이스 이름
  namespace: ingress-nginx
spec:
  # 사용할 프로토콜과 포트들을 지정
  ports:
    # http에 대한 프로토콜 및 포트 지정
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30100
    # https에 대한 프로토콜 및 포트 지정
    - name: https
      protocol: TCP
      port: 443
      targetPort: 443
      nodePort: 30101
  # 셀렉터의 레이블 지정
  selector:
    app.kubernetes.io/name: ingress-nginx
  # 서비스 타입을 설정
  type: NodePort
```

- http를 처리하기 위해 30100번 포트로 들어온 요청을 80번 포트로 넘기고,<br>https를 처리하기 위해 30101번 포트로 들어온 요청을 443번 포트로 넘김
- NGINX 인그레스 컨트롤러가 위치하는 네임스페이스를 ingress-nginx로 지정
- NGINX 인그레스 컨트롤러의 요구 사항에 따라 셀렉터를 ingress-nginx로 지정
- 이렇게 생성된 NGINX 인그레스 컨트롤러를 확인할 때 : `kubectl get services -n ingress-nginx`

<br>
<br>

## 클라우드에서 쉽게 구성 가능한 로드밸런서

- 앞의 연결 방식은 들어오는 요청을 모두 워커 노드의 노드포트를 통해 노드포트 서비스로 이동하고<br>이를 다시 쿠버네티스의 파드로 보내는 구조
- 앞의 방식들은 너무 비효율적이기 때문에 쿠버네티스에서는 **LoadBalancer**라는 서비스 타입을 제공해서<br>간단한 구조로 파드를 외부에 노출하고 부하를 분산할 수 있도록 해줌
- 로드밸런서를 사용하려면 로드밸런서를 이미 구현해 둔 서비스업체의 도움을 받아 쿠버네티스 클러스터 외부에 구현해야 함
- 사용 예시 : `kubectl expose deployment ex-lb --type=LoadBalancer --name=ex-svc`
  - 이 실습은 클라우드 사(EKS, GKE, AKS)에서만 가능
- 이 다음부터 우리가 만든 테스트 가상 환경(온프레미스)에서 로드밸런서를 사용하기 위한 대안을 찾아볼 것

<br>
<br>

## 온프레미스에서 로드밸런서를 제공하는 MetalLB

- 온프레미스에서 로드밸런서를 사용하려면 내부에 로드밸런서 서비스를 받아주는 구성이 필요함
- **MetalLB**는 bare metal(운영 체제가 설치되지 않은 하드웨어)로 구성된 쿠버네티스에서도<br>로드밸런서를 사용할 수 있게 고안된 프로젝트
- 특별한 네트워크 설정이나 구성이 있는 것이 아니라 기존의 L2 네트워크(ARP/NDP)와 L3 네트워크(BGP)로 로드밸런서를 구현함
- MetalLB 컨트롤러는 작동 방식(protocol)을 정의하고 EXTERNAL-IP를 부여해 관리함
- MetalLB Speaker는 정해진 작동 방식(L2/L3)에 따라 경로를 만들 수 있도록<br>네트워크 정보를 광고하고 수집해 각 파드의 경로를 제공함

※ metallb-l2config.yaml

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  # ConfigMap 이름
  name: config
data:
  # 설정 내용
  config: |
    address-pools:
    - name: nginx-ip-range
      protocol: layer2
      addresses:
      - 192.168.1.11-192.168.1.13
```

- ConfigMap이라는 설정이 정의된 포맷을 사용
- protocol : metallb에서 제공하는 로드밸런서의 동작 방식
- addresses : metallb에서 제공하는 로드밸런서의 Ext 주소
- 생성된 ConfigMap은 `kubectl get configmap` 명령어로 확인 가능

<br>
<br>

## 부하에 따라 자동으로 파드 수를 조절하는 HPA

- 쿠버네티스는 갑자기 사용자가 늘어나서 파드가 감당할 수 없게 될 경우에 대비해서<br>부하량에 따라 디플로이먼트의 파드 수를 유동적으로 관리하는 HPA(Horizontal Pod Autoscaler) 제공
- 파드의 자원 사용 정도를 파악하는 명령어 : `kubectl top pods`
  - 리눅스의 top(table of processes)과 비슷함
- HPA는 자원을 요청할 때 Metrics-Server를 통해 계측값을 전달받음
  - 따라서 파드의 자원이 어느 정도 사용되는지 파악하기 위해서는 메트릭 서버를 설정해야 함
  - 메트릭 서버는 git clone 할 수 있는 원본 소스가 있음 (https://github.com/kubernetes-sigs/metrics-server)
  - 이 책에서는 소스 파일을 sysnet4admin 계정으로 가져와서 실습에 필요한 추가 설정을 추가했음

※ metrics-server.yaml 변경된 부분

```yml
containers:
  - name: metrics-server
    image: k8s.gcr.io/metrics-server-amd64:v0.3.6
    args:
      # Manually Add for lab env(Sysnet4admin/k8s)
      # skip tls internal usage purpose
      - --kubelet-insecure-tls
      # kubelet could use internalIP communication
      - --kubelet-preferred-address-types=InternalIP
      - --cert-dir=/tmp
      - --secure-port=4443
```

- `- --kubelet-insecure-tls` : TLS(Transport Layer Security) 인증을 무시하도록 함
- 마지막 3줄 : kubelet이 내부 주소를 우선 사용하게 함

<br>

- 실습에서 scale 기준 값이 설정되어 있지 않아서 파드 증설 시점을 알 수 없기에,<br>파드에 부하가 걸리기 전에 scale이 실행되도록 디플로이먼트를 새로 생성하기 보다는 edit 명령어로 수정
  - 수정 명령어 : `KUBE_EDITOR="vim" kubectl edit deployment hpa-hname-pods`

※ 수정 내용

```yml
spec:
  containers:
    - image: sysnet4admin/echo-hname
      imagePullPolicy: Always
      name: echo-hname
      resources:
        requests:
          cpu: "10m"
        limits:
          cpu: "50m"
```

- resources 부분에서 requests와 limits 추가
  - 이 값은 파드마다 주어진 부하량을 결정하는 기준이 됨
  - 단위 m은 milliunits의 약어로 1000m은 1개의 CPU가 됨

<br>

- 실습에서 사용한 autoscale 명령어 : `kubectl autoscale deployment hpa-hname-pods --min=1 --max=30 --cpu-percent=50`
  - min은 최소 파드 수, max는 최대 파드 수, cpu-percent는 CPU 사용량이 50%가 넘으면 autoscale한다는 의미
- HPA 현재 상태를 요약해서 보여주는 명령어 : `kubectl get hpa`
- 부하량 테스트 시 사용하는 명령어 : `watch kubectl top pods` `watch kubectl get pods`
  - watch는 2초에 한번씩 자동으로 상태를 확인할 수 있도록 해줌

<br>

=> 지금까지 쿠버네티스에서 파드 생성 후<br>실제 쿠버네티스 외부의 사용자들이 쿠버네티스 내부의 파드에 접속할 수 있도록 경로를 만들어주는 여러 서비스들을 살펴봤음<br>다음 절부터 디플로이먼트 외 다른 오브젝트를 사용해보게 될 것

<br>
<br>

# 알아두면 쓸모 있는 쿠버네티스 오브젝트

- 지금까지 파드를 관리하는 여러 기능이 포함된 Deployment 오브젝트를 사용해봤는데,<br>이외에도 용도에 따라 사용할 수 있는 다양한 오브젝트들이 있음
- 데몬셋, 컨피그맵, PV, PVC, 스테이트풀셋 등
- 앞으로도 사용되는 오브젝트는 계속 변하겠지만 현존하는 오브젝트들을 알아두면 새로운 오브젝트에도 쉽게 적응할 수 있음

<br>
<br>

## DaemonSet

- 디플로이먼트의 replicas가 노드 수 만큼 정해져 있는 형태라고 볼 수 있으며, 노드 하나당 파드 한 개만을 생성함
- 사실 데몬셋은 이미 kube-proxy와 MetalLB Speaker에서 사용했었음
  - 이들의 공통점은 노드의 단일 접속 지점으로 노드 외부와 통신하는 것
- 노드를 관리하는 파드라면 데몬셋으로 만드는 게 가장 효율적

<br>
<br>

## ConfigMap

- 이름 그대로 설정을 목적으로 사용하는 오브젝트
- 이전에 인그레스 설정을 위해서 오브젝트를 인그레스로 선언했고 MetalLB에서는 컨피그맵을 사용했는데,<br>이는 인그레스는 오브젝트가 인그레스로 지정되어 있지만 MetalLB는 프로젝트 타입으로 정해진 오브젝트가 없기 때문

<br>
<br>

## PV와 PVC

- 파드는 언제라도 생성되고 지워지는 것
- 그런데 때때로 파드에서 생성한 내용을 기록하고 보관하거나 모든 파드가 동일한 설정 값을 유지하고 관리하기 위해<br>공유된 볼륨으로부터 공통된 설정을 갖도록 설계해야 할 때도 있음
- 쿠버네티스는 이런 경우를 위해 다양한 형태의 볼륨을 제공함
  - 임시 : emptyDir
  - 로컬 : host Path, local
  - 원격 : persistentVolumeClaim, cephfs, cinder, csi, fc, flexVolume, flocker, glusterfs, iscsi, nfs,<br>portworxVolume, quobyte, rbd, scaleIO, storageos, vsphereVolume
  - 특수 목적 : downwardAPI, configMap, secret, azureFile, projected
  - 클라우드 : awsElasticBlockStore, azureDisk, gcePersistentDisk
- 다양한 볼륨 스토리지 중에 PV와 PVC를 이해하면 다른 볼륨 스토리지도 쉽게 이해할 수 있음
- PVC(PersistentVolumeClaim) : 지속적으로 사용 가능한 볼륨 요청
- PV(PersistentVolume) : 지속적으로 사용 가능한 볼륨
- PVC를 사용하려면 PV로 볼륨을 선언해야 함
- 간단하게 PV는 볼륨을 사용할 수 있게 준비하는 단계이고, PVC는 준비된 볼륨에서 일정 공간을 할당받는 것
- 가장 구현하기 쉬운 NFS 볼륨 타입으로 PV와 PVC를 생성하고 파드에 마운해보게 될 것

<br>

### NFS 볼륨에 PV/PVC를 만들고 파드에 연결하기

- PV로 선언할 볼륨을 만들기 위해 NFS 서버를 마스터 노드에 구성

```sh
[root@m-k8s] mkdir /nfs_shared
[root@m-k8s] echo '/nfs_shared 192.168.1.0/24(rw,sync,no_root,squash)' >> /etc/exports
```

- /nfs_shared를 NFS로 받아들일 IP 영역을 192.168.1.0/24로 설정
- 옵션을 적용해서 /etc/exports에 기록

```sh
[root@m-k8s] systemctl enable --now nfs
```

- NFS 서버를 활성화하고 다음 시작 시에도 자동 적용되도록 설정
- 그 이후 PV를 생성하는 yaml 파일 실행

※ nfs-pv.yaml

```yml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 100Mi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  nfs:
    server: 192.168.1.10
    path: /nfs_shared
```

- capacity : storage는 실제로 사용하는 용량을 제한하는 것이 아닌 쓸 수 있는 양을 레이블로 붙이는 것과 같음<br>이는 현재 스토리지가 단순히 NFS로 설정되어서 그런 것
- accessModes : PV를 어떤 방식으로 사용할지 정의한 부분
  - ReadWriteMany : 여러 개의 노드가 읽고 쓸 수 있도록 마운트하는 옵션
  - 옵션에는 ReadWriteOnce, ReadOnlyMany 가 있음
- persistentVolumeReclaimPolicy : PV가 제거됐을 때 작동 방법을 정의
  - 옵션에는 Retain(유지), Delete(삭제), Recycle(재활용, Deprecated) 이 있음
- nfs : NFS 서버의 연결 위치에 대한 설정
- yaml 파일 실행해서 생성한 이후에는 `kubectl get pv` 명령어를 통해 Available 상태를 확인할 수 있음
- 그 이후 PVC를 생성하는 yaml 파일도 실행

※ nfs-pvc.yaml

```yml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Mi
```

- PV와 구성이 거의 동일함
  - PV는 사용자가 요청할 볼륨 공간을 관리자가 만듦
  - PVC는 사용자 간 볼륨을 요청하는 데에 사용됨
- 마찬가지로 실행 이후에 `kubectl get pvc`로 상태 확인 가능
  - STATUS가 Bound이면 PV와 PVC가 연결됐음을 뜻함
- 이후 PVC를 볼륨으로 사용하는 디플로이먼트 오브젝트 스펙을 배포

※ nfs-pvc-deploy.yaml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-pvc-deploy
spec:
  replicas: 4
  selector:
    matchLabels:
      app: nfs-pvc-deploy
  template:
    metadata:
      labels:
        app: nfs-pvc-deploy
    spec:
      containers:
        - name: audit-trail
          image: sysnet4admin/audit-trail
          volumeMounts:
            - name: nfs-vol
              mountPath: /audit
      volumes:
        - name: nfs-vol
          persistentVolumeClaim:
            claimName: nfs-pvc
```

- audit-trail 이미지 : 요청을 처리할 때마다 접속 정보를 로그로 기록해주는 역할 수행
- volumeMounts : 볼륨이 마운트될 위치 지정
- volumes : PVC로 생성된 볼륨을 마운트하기 위해서 nfs-pvc라는 이름 사용

<br>

**audit 로그 테스트**

1. 배포 이후 `kubectl exec -it <pod name> -- /bin/bash` 명령어로 생성된 파드 중 하나로 접속
2. 로드밸런서 실행 : `kubectl expose deployment nfs-pvc-deploy --type=LoadBalancer --name=nfs-pvc-deploy-svc --port=80`
3. 실행된 서비스의 IP로 접속 (192.168.1.21)
4. exec로 접속한 파드에서 `ls /audit` 명령어로 생성된 로그 파일을 확인하고 `cat` 명령어로 해당 파일 열람

<br>

### NFS 볼륨을 파드에 직접 마운트하기

- 사용자가 관리자와 동일한 단일 시스템이라면 PV와 PVC를 사용할 필요가 없음
- 여기서는 단순히 볼륨을 마운트하는지 확인하고 넘어갈 것

※ nfs-ip.yaml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-ip
spec:
  replicas: 4
  selector:
    matchLabels:
      app: nfs-ip
  template:
    metadata:
      labels:
        app: nfs-ip
    spec:
      containers:
        - name: audit-trail
          image: sysnet4admin/audit-trail
          volumeMounts:
            - name: nfs-vol
              mountPath: /audit
      volumes:
        - name: nfs-vol
          nfs:
            server: 192.168.1.10
            path: /nfs_shared
```

<br>
<br>

## StatefulSet

- 지금까지는 파드가 replicas에 선언된 만큼 무작위로 생성되었음
- 하지만 파드가 만들어지는 이름과 순서를 예측해야 할 때가 있음
  - 주로 레디스, 주키퍼, 카산드라, 몽고DB 등 마스터-슬레이브 구조 시스템에서 필요
- StatefulSet은 volumeClaimTemplates 기능을 사용해 PVC를 자동 생성할 수 있고<br>각 파드가 순서대로 생성되기 때문에 고정된 이름, 볼륨, 설정 등을 가질 수 있음
- 그래서 이름 그대로 '이전 상태를 기억하는 세트'라는 의미를 가짐
- 다만 효율성 측면에서 좋은 구조가 아니므로 요구 사항에 맞게 적절히 사용해야 함
- expose 명령어는 StatefulSet에서 지원되지 않기 때문에 로드밸런서 서비스를 작성 및 실행해야 함
  - expose 명령어로 서비스를 생성할 수 있는 오브젝트는 디플로이먼트, 파드, 레플리카셋, 레플리케이션 컨트롤러
- IP를 가지지 않는 Headless 서비스로 노출 가능
  - 노출된 IP가 없어도 내부적으로 각 파드의 이름과 노출된 서비스 이름 등을 조합한 도메인 이름으로<br>쿠버네티스 클러스터 내에서 통신할 수 있는 상태가 됨
- `kubectl delete statefulset <이름>` 명령어로 삭제 가능
- 일반적으로 StatefulSet은 volumeClaimTemplates를 이용해 자동으로 각 파드에 독립적인 스토리지를 할당해 구성할 수 있음
  - 그러나 이 책에서는 NFS 환경에서 동적으로 할당받을 수 없기에 과제로 남겨둠 (203p 참고)

<br>

※ 마무리

- 지금까지 쿠버네티스의 전반적인 개념을 배우고 직접 실습했지만 알아야 할 것이 많기에 반복 실습을 권장함
- 다음 장에서는 도커를 알아보고, 직접 애플리케이션을 빌드하여 이를 도커 이미지로 만들어 볼 것
- 도커 이미지를 레지스트리에 넣고 쿠버네티스에 저장된 이미지를 직접 불러오는 방법을 실습하며 쿠버네티스와의 관계도 정립하게 될 것
