2021 / 09 / 17

Docker는 Linux Container 기술을 기반으로 하는 오픈 소스 서비스이다.  
도커를 통해 애플리케이션 실행 환경을 코드로 작성할 수 있으며, OS를 격리화하여 관리할 수 있다.

</br>

## Linux Container

필요한 라이브러리와 애플리케이션을 모아서 마치 별도의 서버처럼 구성한 것이다.  
컨테이너를 이루는 네트워크 설정, 환경 변수 등의 시스템 자원은 각 컨테이너가 독립적으로 소유하고 있다.

</br>

### 1. 프로세스의 구획화

- 특정 컨테이너에서 작동하는 프로세스는 기본적으로 그 컨테이너 안에서만 액세스 가능
- 컨테이너 안에서 실행되는 프로세스는 다른 컨테이너의 프로세스에 영향을 줄 수 없음

</br>

### 2. 네트워크의 구획화

- 기본적으로 컨테이너 하나에 IP 주소 하나가 할당됨

</br>

### 3. 파일 시스템의 구획화

- 해당 컨테이너에서의 명령이나 파일 등의 액세스를 제한할 수 있음

</br>

## Docker가 해결해주는 문제들

### 1. 환경 표준화

운영체제(OS)에는 Linux, Windows, MacOS가 있으며, 같은 Linux라도 Ubuntu, CentOS, Debian처럼 서로 다른 환경이 존재하므로, 개발자마다 다른 환경을 가지고 있을 때, 일일이 환경을 맞춰주는 작업은 상당히 까다로울 것이다.

```bash
echo $HOME
```

또한 위 명령어를 입력하면 홈 디렉토리를 확인할 수 있는데, 이 홈 디렉토리가 일치할 확률도 결코 높지 않을 것이다.  
홈 디렉토리와 같이, 애플리케이션을 설치할 때에는 방화벽 설정, 사용자 권한 설정, Port 설정 등 다양한 작업들에 대해서도 고려해봐야 한다.

</br>

### 2. 리소스 격리성

실제로는 하나의 컴퓨터를 사용하지만, 여러 개의 컴퓨터를 이용하듯 사용하는 것이 **리소스 격리성**이다.  
리소스 격리성을 제공하는 기술로는 Virtual Machine(가상 머신), Docker 등이 있다.  
간단하게만 살펴보겠지만, 가상 머신 또한 유용한 방법이다.  
VirtualBox, VMware와 같은 가상 머신은 개발 환경이나 사용 환경을 이미지로 저장하고, **Host OS** 위에 **Guest OS**를 올리는 방식을 활용한다.

</br>

<img width="982" alt="Docker와 Virtual Machine" src="https://user-images.githubusercontent.com/75058239/133765644-3cf43654-8ede-4362-b90c-6df0b415609a.png">

</br>

Docker와 Virtual Machine은 격리성을 제공하기 때문에, 각 애플리케이션마다 다른 컴퓨터에서 실행되는 것처럼 IP나 Port 등을 다르게 설정할 수 있다.

</br>

#### ※ Docker와 Virtual Machine의 차이

- Docker는 Virtual Machine만큼 견고한 격리성을 제공하지는 않음
- Docker는 Linux Container를 이용한 기술로, OS 위에 다른 OS를 실행하지 않아서 Virtual Machine보다 좋은 성능을 가짐
- VM : 애플리케이션에 대한 환경 격리성 중심
- Docker : Container의 관점에서 개발자와 사용자 커뮤니티 중심으로 혜택을 제공

</br>

## Docker Container Lifecycle

<img width="961" alt="Docker Container Lifecycle" src="https://user-images.githubusercontent.com/75058239/133765661-a226c1fa-66f1-4b5f-8c01-7a75ba64b239.png">

</br>

## Docker 이용하기

### Docker image 받아오기

```bash
docker image pull docker/whalesay:lates
```

`docker/whalesay`이라는 image의 가장 최신 버전을 받아오는 명령어이다.

</br>

```bash
docker image ls
```

docker를 통해 받아온 image들을 확인해보는 명령어이다.

</br>

### image 다루기

#### 받아온 image 실행하기

```bash
docker container run [OPTIONS] IMAGE [COMMAND] {ARG...}
```

직접적인 예시는 다음과 같다.

```bash
docker container run --name sprint-main docker/whalesay:latest cowsay boo
```

세부 명령어들을 살펴보자.

- container run : container 실행
- [OPTIONS]
  - --name : container의 이름 할당
- [COMMAND] : container 실행 시 수행되는 명령어
  - cosway : cosway 명령어를 호출, node를 호출하듯이 사용 가능
- {ARG...}
  - boo : cosway 명령어에 넘겨질 파라미터에 해당

</br>

명령어들을 더 이해하기 위해서 다른 옵션이 붙은 실행문을 살펴보자.

```bash
docker container run -it --rm danielkraic/asciiquarium:latest
```

- `-it` : `-i`와 `-t`를 동시에 사용한 옵션으로, 사용자와의 상호작용이 필요할 때 이 옵션을 사용한다.
- `--rm` : container를 일회성으로 생성

</br>

그리고 다음은 Port를 지정해서 실행하는 방법이다.

```bash
docker container run --name 컨테이너_이름 -p 818:80 httpd
```

- `-p` : localhost의 port와 container의 port를 연결한다.

</br>

#### image 삭제

```bash
docker image ls
```

위 명령어를 통해 docker에 있는 image들을 확인하고,

```bash
docker image rm docker/whalesay
```

이렇게 입력하여 삭제하고 싶은 image를 선택해서 삭제할 수 있다.

</br>

### container 다루기

#### 모든 container의 list 출력

```bash
docker container ps -a
```

- -a : 원래 기본값은 실행되고 있는 container만을 출력하지만, -a는 모든 container를 출력

</br>

#### container 삭제

```bash
docker container rm 컨테이너_이름
```

- ps 명령을 통해 확인되는 NAMES 혹은 CONTAINER ID를 사용해서 삭제

</br>

### local에 있는 파일을 container에 전달하기

우선 복사해서 전달하고 싶은 파일들의 위치로 cmd 경로를 이동한다.  
이후에 다음 커맨드를 입력한다.

```bash
docker container cp ./ 컨테이너_이름:/usr/local/apache2/htdocs/
```

- `./`로 경로를 지정하면 cmd 창의 현재 위치에 있는 모든 파일을 복사한다.
- 뒤쪽의 주소는 복사 파일을 받는 container의 경로이다.

</br>

### Docker image 만들기

```bash
docker container commit 컨테이너_이름 my_pacman:1.0
```

이렇게 생성하여 다음과 같이 실행할 수 있다.

```bash
docker run --name my_web2 -p 900:80 my_pacman:1.0
```

</br>

### Docker image build를 위해서 Dockerfile 만들기

```bash
FROM httpd:2.4 # 베이스 이미지를 httpd:2.4 로 사용
COPY ./ /usr/local/apache2/htdocs/ # 호스트의 현재 경로에 있는 파일을 생성할 이미지 /usr/local/apache2/htdocs/ 에 복사
```

이후 docker build 명령어를 통해, Dockerfile로 Docker image file 생성

```bash
 # --tag 는 name:tag 형식으로 이미지를 생성
 # 지정한 경로에 있는 Dockerfile을 찾아서 빌드
 docker build --tag my_pacman:2.0 . # "."을 명령어에 꼭 포함해야 함
```

다음 명령어로 생성된 image를 이용해서 901 port에 웹 서버를 구동한다.

```bash
docker run --name my_web3 -p 901:80 my_pacman:2.0
```

</br>

### container 안에 파일들 확인하기

```bash
docker exec -it 컨테이너_이름 bash
```

</br>

### docker-compose

Docker image들을 다룰 때, 클라이언트와 서버, 데이터베이스를 각각 나누어서 container를 생성한 뒤, docker-compose를 통해서 한번에 실행할 수 있다.  
docker-compose를 사용하기 위한 예제 순서는 다음과 같다.

#### 1. docker-compose.yml 작성

로컬 환경에서 docker-compose.yml 파일을 작성한다.  
파일 작성 예시는 다음과 같다.  
mysql 부분은 참고로, M1 칩 탑재 Mac을 위해 `amd64/mysql`을 설치했다.

```yml
version: "3.8"

services:
  nginx:
    image: sebcontents/client
    restart: "always"
    ports:
      - "8080:80"
    container_name: client

  spring:
    image: 0xnsky/server-spring
    restart: "always"
    ports:
      - "5000:3000"
    container_name: server-spring
    volumes:
      - "./volumefolder:/data"

  mysql:
    image: amd64/mysql
    restart: "always"
    ports:
      - "3307:3306"
    container_name: database
    environment:
      MYSQL_ROOT_PASSWORD: root_계정_비밀번호
      MYSQL_DATABASE: 초기_생성_데이터베이스
      MYSQL_USER: 유저_이름
      MYSQL_PASSWORD: 유저_패스워드
```

</br>

#### 2. docker-compose.yml container에 복사

이 파일을 `docker container cp` 명령어를 사용해서 특정 container에 복사해준다.  
예제에서는 `/usr/local/apache2` 경로에 yml 파일을 복사해주었다.

</br>

#### 3. docker-compose up

위의 명령어를 사용해서 docker-compose.yml에 적혀있는 대로 통합해서 image들을 받아오고 실행한다.  
로컬에서 docker-compose.yml을 작성했던 디렉토리로 이동해보면 `volumefolder`라는 폴더가 새로 생겨 있음을 확인할 수 있다.

</br>

#### 4. docker-compose down

한번에 실행했던 container들을 다시 한번에 종료시킬 수 있는 명령어이다.

</br>

## Docker를 활용한 배포 무중단 전략

이미 배포 중인 서비스가 있고, 해당 서비스의 어떤 container를 갈아끼워야 하는 소요가 있다고 가정했을 때, Docker를 활용하면 편리하다.  
Docker와 같은 서비스를 이용하지 않는다면, 배포 중인 서비스를 잠시 중단했다가 코드를 변경하고 다시 배포해야 하겠지만, Docker는 container가 2개 이상일 경우, 배포를 중단하지 않으면서 container를 간편하게 갈아끼울 수 있게 해준다.
