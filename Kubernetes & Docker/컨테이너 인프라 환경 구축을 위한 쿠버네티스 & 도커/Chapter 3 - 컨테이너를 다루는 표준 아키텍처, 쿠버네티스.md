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
