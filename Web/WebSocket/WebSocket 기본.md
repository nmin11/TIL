## 기본 개념

기존의 단방향 HTTP 프로토콜과 호환되는 양방향 통신을 제공하기 위해 개발된 프로토콜이다.  
일반 Socket 통신과 달리 HTTP 80 Port를 사용하기 때문에 방화벽에 제약이 없으며, 통상적으로 **WebSocket**이라 불린다.  
접속 과정까지는 HTTP 프로토콜을 이용하고, 그 이후부터의 통신은 자체적은 WebSocket 프로토콜을 통해서 통신하게 된다.

<br>

## 배경

웹 소켓은 HTTP를 사용하는 네트워크 데이터 통신의 단점을 보완하기 위한 목적으로 탄생했다.  
모든 HTTP를 사용하는 통신은 클라이언트가 먼저 요청을 보내고, 그 요청에 따라 웹 서버가 응답하는 형태이며 웹 서버는 응답을 보낸 후 웹 브라우저와의 연결을 끊는다.  
양쪽이 데이터를 동시에 보내는 것이 아니기 때문에 이러한 통신 방식을 Half Duplex(반이중 통신)이라고 한다.  
사실 이러한 HTTP만으로도 원하는 정보를 송수신할 수 있지만 인터넷의 발전에 따라 원하는 것이 더욱 다양해졌다.  
예를 들어 클라이언트가 먼저 요청하지 않아도 서버가 먼저 데이터를 보내거나, 표준 TCP/IP 통신을 사용해서 특정 서버와 통신을 원하는 경우가 생겼다.  
이러한 요구사항에 충족하기 위해서 많은 플러그인 및 웹 기술이 개발되었다.  
이에 따라 Polling, Long Polling, Streaming 등 다양한 기법이 활용되다가 마침내 WebSocket이 등장하게 된다.

<br>

## 특징

웹 소켓은 클라이언트가 접속 요청을 하고 웹 서버가 응답한 후 연결을 끊는 것이 아니라, Connection을 유지하면서 클라이언트의 요청 없이도 데이터를 전송할 수 있게 해주는 프로토콜이다.  
웹 소켓의 프로토콜 요청은 [ws://~]로 시작한다.  
웹 소켓은 HTTP 환경에서 Full Duplex(2-way communication, 전이중 통신)를 지원하기 위한 프로토콜이다.  
HTTP 프로토콜에서 HandShaking을 완료한 후 HTTP로 동작하지만 HTTP와는 다른 방식으로 통신한다.

<br>

웹 소켓이 기존 TCP Socket과 다른 점은 최초 접속이 일반 HTTP Request를 활용한 HandShaking을 통해 이뤄진다는 점이다.  
HTTP Request를 그대로 사용하기 때문에 기존의 80, 443 포트로 접속을 하게 되고, 이에 따라 추가 방화벽을 열지 않고도 양방향 통신이 가능하게 된다.  
HTTP 규격은 CORS 적용이나 인증 과정 등을 기존과 동일하게 가져갈 수 있는 것이다.

<br>

때로는 Ajax, Streaming, Long Polling 기법이 더 효과적일 수 있다.  
예를 들어 변경 빈도가 낮으며 데이터의 크기도 작은 경우 위의 기술들을 선택하게 될 수 있다.  
즉, 실시간성을 보장해야 하고, 변경 사항의 빈도가 잦다면, 또 짧은 대기 시간, 고주파수, 대용량의 조합인 경우 WebSocket이 좋은 해결책이 되어준다.

<br>

## WebSocket 접속 과정

![웹소켓 접속 과정](https://user-images.githubusercontent.com/75058239/139177164-713502b1-ce9f-434f-8c08-5a3e2c2ff35a.png)

웹 소켓 접속 과정은 크게 2가지로 나눌 수 있다.

- TCP/IP 접속
- 웹 소켓 열기 HandShake

웹 소켓도 TCP/IP 위에서 동작하므로 서버와 클라이언트는 웹 소켓을 사용하기 전에 서로 TCP/IP 접속이 되어있어야만 한다.  
TCP/IP 접속 이후에는 서버와 클라이언트의 웹 소켓 열기 HandShake 과정을 진행한다.

<br>

### 웹 소켓 열기 HandShake

클라이언트가 먼저 HandShake 요청을 보내고 이에 대한 응답을 서버가 클라이언트로 보내는 구조이다.  
서버와 클라이언트는 HTTP 1.1 프로토콜을 사용하여 요청과 응답을 보낸다.  
다음은 Request와 Response의 예시이다.

![HandShake Request](https://user-images.githubusercontent.com/75058239/139177172-cae5208f-16a7-4104-bde7-9365fd198aaa.png)

<br>

![HandShake Response](https://user-images.githubusercontent.com/75058239/139177184-e9fdcb9d-3c11-46a9-8deb-ea7b9be1c792.png)

<br>

## Reference

[개발하는 고라니 님 - WebSocket과 채팅](https://dev-gorany.tistory.com/212?category=901854)
