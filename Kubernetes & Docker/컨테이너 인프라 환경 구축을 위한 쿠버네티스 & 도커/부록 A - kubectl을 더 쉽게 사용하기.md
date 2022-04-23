# kubectl 명령 자동 완성하기

- bash shell 명령 자동 완성을 해주는 **bash-completion** 패키지
- bash-completion은 bash의 Built-in 명령 중 하나인 `complete` 명령으로 자동 완성 목록 표시
- kubectl은 `kubectl completion bash` 명령을 제공해서 complete에 맞게 목록을 생성함
- 따라서 kubectl 명령에 대한 자동 완성 목록을 구현하면 tab 키를 사용해서 활용 가능

※ bash-completion.sh

```sh
#!/usr/bin/env bash
#Usage:
#1. bash <(curl -s https://raw.githubusercontent.com/sysnet4admin/IaC/master/manifests/bash-completion.sh)

# install bash-completion for kubectl
yum install bash-completion -y

# kubectl completion on bash-completion dir
kubectl completion bash >/etc/bash_completion.d/kubectl

# alias kubectl to k
echo 'alias k=kubectl' >> ~/.bashrc
echo 'complete -F __start_kubectl k' >> ~/.bashrc

#Reload rc
su -
```

- 쿠버네티스에서 제공하는 오브젝트를 외우기 힘들 때 사용하기 편함

<br>
<br>

# kubectl 별칭 사용하기

- 위의 sh 파일에서 kubectl을 k라는 별칭으로 사용하도록 설정해주었음
- `kubectl get pods`를 `kgp`로 축약해서 실행하도록 설정 가능

<br>
<br>

# kubectl 약어 사용하기

- kubectl은 자주 사용하는 구문의 약어(short name) 지원

|           이름           |  약어  |      오브젝트 이름      |
| :----------------------: | :----: | :---------------------: |
|          nodes           |   no   |          Node           |
|        namespaces        |   ns   |        Namespace        |
|       deployments        | deploy |       Deployment        |
|           pods           |   po   |           Pod           |
|         services         |  svc   |         Service         |
|       replicasets        |   rs   |       ReplicaSet        |
|        ingresses         |  ing   |         Ingress         |
|        configmaps        |   cm   |        ConfigMap        |
| horizontalpodautoscalers |  hpa   | HorizontalPodAutoscaler |
|        daemonsets        |   ds   |        DaemonSet        |
|  persistentvolumeclaims  |  pvc   |  PersistentVolumeClaim  |
|    persistentvolumes     |   pv   |    PersistentVolume     |
|       statefulsets       |  sts   |       StatefulSet       |
|  replicationcontrollers  |   rc   |  ReplicationController  |
|      resourcequotas      | quota  |      ResourceQuota      |
|     serviceaccounts      |   sa   |     ServiceAccount      |
|         cronjobs         |   cj   |         CronJob         |
|          events          |   ev   |          Event          |
|      storageclasses      |   sc   |      StorageClass       |
|        endpoints         |   ep   |        Endpoints        |
|       limitranges        | limits |       LimitRange        |

- 쿠버네티스 약어 확인 명령어 : `kubectl api-resources`
