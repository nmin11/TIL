# 테스트 환경을 자동으로 구성하는 도구

- 코드형 인프라 중 **Vagrant** 가 가장 배우기 쉽고 사용 방법도 간단함
- 베이그런트는 가상화 소프트웨어인 **VirtualBox** 와도 호환성이 좋음

<br>
<br>

## 버추얼박스 설치하기

- 버추얼박스는 InnoTek에서 개발한 가상화 소프트웨어로 오라클에서 배포함
- 버추얼박스는 현존하는 대부분의 운영 체제를 게스트 운영 체제로 사용할 수 있으며,<br>확장팩을 제외하면 모든 기능을 무료로 이용 가능

<br>
<br>

## 베이그런트 설치하기

- 베이그런트는 사용자의 요구에 맞게 시스템 자원을 할당, 배치, 배포해 두었다가<br>필요할 때 시스템을 사용할 수 있는 상태로 만들어줌
  - 이를 **provisioning** 이라고 함
- 프로비저닝을 활용하면 환경을 매우 쉽고 간단하게 구현 가능

<br>

### 자주 사용하는 베이그런트 명령

| 명령어            | 설명                                    |
| :---------------- | :-------------------------------------- |
| vagrant init      | 프로비저닝을 위한 기초 파일 생성        |
| vagrant up        | Vagrantfile을 읽어 들여 프로비저닝 진행 |
| vagrant halt      | 가상 머신 종료                          |
| vagrant destroy   | 가상 머신 삭제                          |
| vagrant ssh       | 가상 머신에 ssh로 접속                  |
| vagrant provision | 가상 머신에 변경 사항 적용              |

※ 가상 머신 삭제는 버추얼박스의 **닫기 > 전원 끄기** 를 통해서 종료 이후,<br>**삭제** 를 클릭해서 삭제할 수도 있음

<br>
<br>

# 베이그런트로 테스트 환경 구축하기

## 가상 머신에 필요한 설정 자동으로 구성하기

※ Vagrantfile 설정

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.define "m-k8s" do |cfg|
    cfg.vm.box = "sysnet4admin/CentOS-k8s"
    cfg.vm.provider "virtualbox" do |vb|
      vb.name = "m-k8s(github_SysNet4Admin)"
      vb.cpus = 2
      vb.memory = 2048
      vb.customize ["modifyvm", :id, "--groups", "/k8s-SM(github_SysNet4Admin)"]
    end
    cfg.vm.host_name = "m-k8s"
    cfg.vm.network "private_network", ip: "192.168.1.10"
    cfg.vm.network "forwarded_port", guest: 22, host: 60010, auto_correct: true, id: "ssh"
    cfg.vm.synced_folder "../data", "/vagrant", disabled: true
  end
end
```

- line 1~2 : 에디터에 현재 파일이 루비임을 인식하게 하는 호환 코드<br>ft는 file type의 약자이며, 해당 내용은 실행에 영향을 미치지 않음
- line 3 : "2"는 베이그런트에서 루비로 코드를 읽어 들여 실행할 때 작동하는 API 버전<br>`do |config|`는 베이그런트 설정의 시작을 알림
- line 4 : 버추얼박스에서 보이는 가상 머신을 "m-k8s"로 정의하고, `do |cfg|`를 통해 원하는 설정으로 변경<br>`do |이름|`으로 시작한 작업은 `end`로 종료함
- line 5 : `|cfg|`에 적용한 기본값을 받아 `cfg.vm.box`로 변경
- line 6 : 베이그런트의 프로바이더가 버추얼박스라는 것을 정의<br>프로바이더는 베이그런트를 통해 제공되는 코드가 실제로 가상 머신으로 배포되기 하는 소프트웨어<br>버추얼박스에 대한 설정을 `do |vb|`로 진행
- line 7~11 : 버추얼박스에서 생성한 가상 머신의 이름, CPU 수, 메모리 크기, 소속된 그룹 명시
- line 12 : 여기부터는 가상 머신 자체에 대한 설정(`do |cfg|`에 속한 작업)<br>호스트의 이름을 설정함
- line 13 : 호스트 전용 네트워크를 `private_network`로 설정해서<br>eh1 인터페이스를 호스트 전용으로 구성하고 IP는 192.168.1.10으로 지정
  - 호스트 전용 네트워크는 호스트 내부이 192.168.1.10대의 사설망 구성
  - 가상 머신은 NAT(Network Address Translation, 네트워크 주소 변환) 인터페이스인 eth0을 통해서 인터넷 접속
- line 14 : ssh 통신은 호스트 60010번을 게스트 22번으로 전달되도록 구성<br>혹시 모를 포트 중복에 대비해서 `auto_correct: true`를 설정해서 포트 중복 시 포트가 자동으로 변경되도록 함
  - 베이그런트에서 ssh 서비스의 기본 포트 번호인 22번을 `id: ssh` 설정을 해주지 않으면<br>2222 포트와 60010 포트의 내용을 게스트의 22번으로 포워딩됨<br>→ 기능적으로 큰 문제를 일으키지 않지만 명시적으로 지정해주는 것이 좋음
- line 15 : 호스트(PC)와 게스트(가상 머신) 사이에 디렉토리 동기화가 이뤄지지 않도록 설정
- line 16~17 : config와 cfg에 대한 설정 작업이 종료됐음을 명시
