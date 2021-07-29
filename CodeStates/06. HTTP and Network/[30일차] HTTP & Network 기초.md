2021 / 07 / 29

## Client Server Architecture (2 Tier Architecture)

쇼핑몰 앱이 있는데, 앱과 연결된 서버가 존재하지 않는다면 어떤 문제가 생길까?  
이런 경우에는 앱을 끊임없이 업데이트해야 할 것이다.  
신상품이 나오면 그 정보를 추가하기 위해서 앱 전체를 업데이트해야 한다.  
이렇게 되면 상품 정보를 실시간으로 전달하기 매우 어려울 것이다.  
이 외에도 '결제'라는 행동을 할 수 없게 된다.

</br>

그렇기 때문에 **리소스가 존재하는 곳**과 **리소스를 사용하는 앱**을 분리시키는 방식이 등장했으며, 이를 2 Tier Architecture 또는 Client Server Architecture라고 부른다.  
여기서 리소스를 사용하는 앱을 "클라이언트"라 부르고, 리소스를 제공하는 곳을 "서버"라고 부른다.  
리소스에 접근하는 클라이언트는 리소스를 가지고 있는 서버에게 물품을 요청해야 한다.  
요청에 따라, 서버는 리소스를 담아 응답한다.

</br>

일반적으로 서버는 리소스를 전달해주는 역할만 담당한다.  
리소스를 저장하는 공간은 **데이터베이스**라는 창고이다.  
이처럼 클라이언트-서버 아키텍쳐에 데이터베이스가 추가된 형태를 3 Tier Achitecture라고 한다.

</br>

## HTTP를 이용한 클라이언트 - 서버 통신과 API

위에서 확인해봤듯이, 클라이언트와 서버 간의 통신은 요청과 응답으로 구성된다.  
여기서 **프로토콜**이라는 개념이 등장한다.  
프로토콜은 **통신 규악**이다.  
클라이언트는 요청을 하기 위해 꼭 지켜야 하는 약속이 있다.  
여러 가지 앱 중에서 웹 애플리케이션 아키텍처에서는 클라이언트와 서버가 HTTP라는 프로토콜을 이용해서 서로 대화를 나눈다.  
HTTP를 이용해서 주고받는 메세지를 "HTTP 메시지"라고 부른다.

</br>

HTTP 이외에도 모바일 앱이나 키오스크 등 서버와 통신할 수 있는 다양한 방법, 다양한 프로토콜이 존재한다.  
그중에서도 OSI 7 Layers는 자주 등장하는 개념이니 참고로 알아두면 좋다.

|   이름    |                    설명                     |
| :-------: | :-----------------------------------------: |
|   HTTP    | 웹에서 HTML, JSON 등의 정보를 주고받는 용도 |
|   HTTPS   |           HTTP에서 보안이 강화됨            |
|    FTP    |                  파일 전송                  |
|   SMTP    |                  메일 전송                  |
|    SSH    |   CLI 환경의 원격 컴퓨터에 접속하는 용도    |
|    RDP    | Windows 계열의 원격 컴퓨터에 접속하는 용도  |
| WebSocket |      실시간 통신 용도, Push 등을 지원       |

</br>

다음으로 API에 대해서 알아보도록 하자.  
컴퓨터에게 요청할 때, 정확한 주문 방법에 따라 요청해야 한다.  
하지만 서버가 어떻게 구성되어 있는지 모른다면, 클라이언트는 어떻게 리소스를 확인할 수 있을까?  
이런 문제를 해결하기 위해 서버는 마치 식당에서 메뉴판을 제공하듯, 리소스를 잘 활용할 수 있도록 **API(Application Programming Interface)** 를 제공해줘야 한다.  
보통 인터넷에 있는 데이터를 요청할 때에는 **HTTP 프로토콜**을 사용하며, **주소(URL, URI)** 를 통해 접근할 수 있다.

</br>

HTTP 요청 시 메소드를 지정하여 리소스와 관련된 행동(CRUD)을 지정할 수 있다.  
HTTP의 다섯 가지 메소드는 **GET, POST, PUT(or PATCH), DELETE**이다.  
각각 조회, 추가, 갱신, 삭제와 관련이 있다.  
HTTP 메소드는 리소스를 이용해서 하려는 행동에 맞게 적절하게 써야 한다.

</br>
</br>

# 브라우저의 작동 원리 (보이지 않는 곳)

## URL과 URI

### URL

URL(Uniform Resource Locator)은 네트워크 상에서 웹 페이지, 이미지 동영상 등의 파일이 위치한 정보를 나타낸다.  
URL은 scheme, hosts, url-path로 구분할 수 있다.  
가장 먼저 작성하는 **scheme**은 프로토콜을 결정한다.  
일반적인 웹 브라우저에서는 http(s)를 사용한다.  
**hosts**는 웹 서버의 이름이나 도메인, IP를 사용하며 주소를 나타낸다.  
**url-path**는 웹 서버에서 지정한 루트 디렉토리부터 시작하여 웹 페이지, 이미지, 동영상 등이 위치한 경로와 파일명을 나타낸다.

</br>

### URI

URI(Uniform Resource Identifier)는 일반적으로 URL의 기본 요소인 scheme, hosts, url-path에 더해 query, bookmark를 포함한다.  
**query**는 웹 서버에 보내는 추가적인 질문이다.  
http://www.google.com:80/search?q=JavaScript 와 같은 요청을 하면 구글에서 JavaScript를 검색한 결과가 나온다.  
브라우저의 검색창을 클릭하면 나타나는 주소가 URI다.  
URI는 URL을 포함하는 상위 개념이다.

|            부분            |   명칭   |                   설명                   |
| :------------------------: | :------: | :--------------------------------------: |
| file://, http://, https:// |  scheme  |              통신 프로토콜               |
| 127.0.0.1, www.google.com  |  hosts   |  파일이 위치한 웹 서버, 도메인 또는 IP   |
|      :80, :443, :3000      |   port   |       웹 서버에 접속하기 위한 통로       |
| /search, /Users/username/  | url-path | 루트 디렉토리로부터 해당 위치까지의 경로 |
|        q=JavaScript        |  query   |       웹 서버에 전달하는 추가 질문       |

</br>

## IP와 PORT

### IP

네트워크에 연결된 특정 PC의 주소를 나타내는 체계를 IP address(Internet Protocol address)라고 한다.  
인터넷에 연결된 모든 PC의 IP는 IP 주소체계를 따라서 점으로 구분된 4덩이의 숫자로 구분된다.  
이를 IPv4라고 한다.  
IPv4는 Internet Protocol version 4의 줄임말로, IP 주소체계의 4번째 버전이라는 뜻이다.  
IPv4는 각 덩어리마다 0부터 255까지 나타낼 수 있다.  
이 시스템을 따르면 2^32인 약 43억 개의 IP 주소를 표현할 수 있는 것이다.  
이 중에서 몇가지는 이미 용도가 정해져 있다.  
특히 다음의 IP 주소는 반드시 기억해야 한다.

- localhost, 127.0.0.1 : 현재 사용 중인 로컬 PC를 지칭
- 0.0.0.0, 255.255.255.255 : broadcast address, 로컬 네트워크에 접속된 모든 장치와 소통하는 주소,  
  서버에서 접근 가능 IP 주소를 broadcast address로 지정하면 모든 기기에서 서버에 접근할 수 있음

개인 PC의 보급으로 전 세계의 누구나 PC를 이용해 인터넷에 접속하고, 각종 서비스를 위해 서버를 생산하면서 IPv6가 등장했다.  
IPv6의 표기법은 2^128개의 주소를 표현할 수 있다.

</br>

### PORT

터미널에서 리액트를 실행하면 얻게 되는 로컬 PC의 IP 주소는 뒤에 :3000과 같은 숫자가 표현된다.  
이 숫자는 IP 주소가 가리키는 PC에 접속할 수 있는 통로(채널)를 의미한다.  
이미 사용 중인 포트는 중복해서 사용할 수 없다.  
만약 다른 프로그램에서 3000번 포트를 사용 중이라면, 리액트는 3001번 포트를 사용하게 된다.  
포트 번호는 0 ~ 65,535 까지 사용할 수 있다.  
그 중에서 0 ~ 1024번 까지의 포트 번호는 주요 통신을 위한 규약에 따라 이미 정해져 있다.  
그 중에서 반드시 알아야 할 포트 번호는 다음과 같다.

- 22 : SSH
- 80 : HTTP
- 443 : HTTPS

이미 정해진 포트 번호라도 필요에 따라 자유롭게 사용할 수 있다.  
잘 알려진 포트의 경우 URI 등에 명시하지 않지만, 그 외의 잘 알려지지 않은 포트(:3000과 같은 임시 포트)는 반드시 명시해야 한다.

</br>

## Domain과 DNS

### Domain

웹 브라우저를 통해 특정 사이트에 진입할 때, IP 주소를 대신하여 사용하는 주소가 있다.  
만약 IP 주소가 지번 또는 도로명 주소라면, 도메인 이름은 해당 주소에 위치한 상호로 볼 수 있다.  
도메인 이름을 이용하면 한눈에 파악하기 힘든 IP 주소를 보다 분명하게 나타낼 수 있다.  
터미널에 nslookup codestates.com을 입력하면 코드스테이츠의 도메인 이름과 IP 주소가 함께 나오는 것을 확인할 수 있다.

</br>

### DNS

네트워크 상에 존재하는 모든 PC는 IP 주소가 있다.  
그러나 모든 IP 주소가 도메인 이름을 가지는 것은 아니다.  
로컬 PC를 나타내는 127.0.0.1은 localhost로 사용할 수 있지만, 그 외 모든 도메인 이름은 일정 기간 동안 대여하여 사용한다.  
그렇다면 이렇게 대여한 도메인 이름과 IP 주소는 어떻게 매칭하는 것일까?  
브라우저의 검색창에 도메인 이름을 입력하여 해당 사이트로 이동하기 위해서는, 해당 도메인 이름과 매칭된 IP 주소를 확인하는 작업이 반드시 필요하다.  
네트워크에는 이것을 위한 서버가 별도로 존재한다.  
DNS(Domain Name System)는 호스트의 도메인 이름을 IP 주소로 변환하거나 그 반대의 경우를 수행할 수 있도록 개발된 데이터베이스 시스템이다.  
브라우저의 검색창에 naver.com을 입력하면, 이 요청은 DNS에서 IP 주소 125.209.222.142를 찾아낸다.  
그리고 이 IP 주소에 해당하는 웹 서버로 요청을 전달하여 클라이언트와 서버가 통신할 수 있도록 한다.

</br>

## Chrome 브라우저 에러 읽기

크롬 브라우저를 사용하면 한 번쯤 에러 메시지를 만날 수 있다.  
이 에러 메시지는 웹 페이지를 제공하는 서버와 크롬 브라우저가 소통하는 단계, 또는 기기와 네트워크의 연결 과정에서 크롬 브라우저가 해석할 수 없는 데이터를 전송받은 경우 발생한다.

</br>

|        Error Message         | Description                                                |
| :--------------------------: | :--------------------------------------------------------- |
|         "Aw, Snap!"          | 크롬 브라우저에서 페이지를 로드하는 중 문제 발생           |
|    ERR_NAME_NOT_RESOLVED     | 호스트 이름이 존재하지 않음                                |
|  ERR_INTERNET_DISCONNECTED   | 사용 중인 기기가 인터넷 연결이 안 되어 있음                |
|   ERR_CONNECTION_TIMED_OUT   | 페이지 연결에 시간이 너무 오래 걸림                        |
|     ERR_CONNECTION_RESET     | 페이지 연결을 방해하는 요소가 어딘가에서 발생              |
|     ERR_NETWORK_CHANGED      | 페이지 로드 중 네트워크 연결에 변동이 생김                 |
|    ERR_CONNECTION_REFUSED    | 페이지에서 크롬 브라우저의 연결을 거부                     |
|        ERR_CACHE_MISS        | 페이지로부터 이전에 입력한 정보를 다시 제출하도록 요청받음 |
|      ERR_EMPTY_RESPONSE      | 페이지에서 데이터를 전송하지 않았음                        |
|    ERR_SSL_PROTOCOL_ERROR    | 페이지에서 전송된 데이터를 크롬 브라우저가 해석하지 못함   |
| ERR_BAD_SSL_CLIENT_AUTH_CERT | 클라이언트 인증서에 오류 발생                              |

</br>
</br>

# HTTP

## HTTP Message

HTTP(HyperText Transfer Protocol)는 HTML과 같은 문서를 전송하기 위한 Application Layer 프로토콜이다.  
HTTP는 웹 브라우저와 웹 서버의 소통을 위해 디자인되었다.  
전통적인 클라이언트 - 서버 모델에서 클라이언트가 HTTP messages 양식에 맞춰서 요청을 보내면 서버도 HTTP messages 양식에 맞춰서 응답한다.  
HTTP는 특정 상태를 유지하지 않는 특징이 있다.  
이런 특징을 **Stateless**라고 한다.

</br>

HTTP messages는 클라이언트와 서버 사이에서 데이터가 교환되는 방식이다.  
HTTP messages에는 Requests(요청)와 Response(응답)가 있다.
HTTP messages는 몇 줄의 텍스트 정보로 구성된다.  
개발자는 이런 메시지를 직접 작성할 필요가 거의 없다.  
구성 파일, API, 기타 인터페이스에서 HTTP messages를 자동으로 완성한다.

</br>

요청과 응답은 다음과 같은 유사한 구조를 가진다.

1. start line : 요청이나 응답의 상태를 나타낸다.  
   항상 첫 번째 줄에 위치하며, 응답에서는 status line이라고 부른다.
2. HTTP headers : 요청을 지정하거나, 메시지에 포함된 본문을 설명하는 헤더의 집합이다.
3. empty line : 헤더와 본문을 구분하는 빈 줄이다.
4. body : 요청과 관련된 데이터나 응답과 관련된 데이터 또는 문서를 포함한다.

이 중에서 start line과 HTTP headers를 묶어 head라고 하고, payload는 body라고 이야기한다.

</br>

### Requests

#### Start line

Start line에는 3가지 요소가 있다.

1. 수행할 작업(GET, PUT, POST 등)이나 방식(HEAD or OPTIONS)을 설명하는 HTTP method를 나타냄
2. 요청 대상(일반적으로 URL이나 URI) 또는 프로토콜, 포트, 도메인의 절대 경로를 요청 컨텍스트에 작성  
   이 요청 형식은 HTTP method마다 다름
   - origin 형식 : ?와 쿼리 문자열이 붙는 절대 경로이다.  
     POST, GET, HEAD, OPTIONS 등의 method와 함께 사용한다.  
     POST / HTTP 1.1  
     GET /background.png HTTP/1.1  
     HEAD /test.html?query=alibaba HTTP/1.1  
     OPTIONS /anypage.html HTTP/1.0
   - absolute 형식 : 완전한 URL 형식으로, 프록시에 연결하는 경우 대부분 GET method와 함께 사용한다.  
     GET http://developer.mozilla.org/en-US/docs/Web/HTTP/Messages HTTP/1.1
   - authority 형식 : 도메인 이름과 포트 번호로 이루어진 URL의 authority component이다.  
     HTTP 터널을 구축하는 경우 CONNECT와 함께 사용할 수 있다.  
     CONNECT developer.mozilla.org:80 HTTP/1.1
   - asterisk 형식 : OPTIONS 와 함께 별표(\*) 하나로 서버 전체를 표현한다.  
     OPTIONS \_ HTTP/1.1
3. HTTP 버전도 메시지의 구조에 맞게 입력해주어야 한다.

</br>

#### Headers

요청의 헤더는 기본 구조를 따른다.  
대소문자 구분 없는 문자열과 콜론(:), 값을 입력한다.  
값은 헤더에 따라 다르다.  
여러 종류의 헤더가 있으며, 다음과 같이 그룹을 나눌 수 있다.

- General headers : 메시지 전체에 적용된다.
- Request headers : User-Agent, Accept-Type, Accept-Language와 같은 헤더는 요청을 보다 구체화한다.  
  Referer처럼 컨텍스트를 제공하거나 If-None과 같이 조건에 따라 제약을 추가할 수 있다.
- Entity headers : Content-Length와 같은 헤더는 body에 적용된다.  
  body가 비어있는 경우 entity headers는 전송되지 않는다.

</br>

![Request headers 예시](https://user-images.githubusercontent.com/75058239/127469436-5a379db7-b208-4dd2-808c-e4d5297672ef.png)

</br>

#### Body

요청의 본문은 HTTP messages 구조의 마지막에 위치한다.  
모든 요청에 body가 필요하지는 않다.  
GET, HEAD, DELETE, OPTIONS처럼 서버에 리소스를 요청하는 경우에 본문이 필요하지 않다.  
POST나 PUT과 같은 일부 요청은 데이터를 업데이트하기 위해 사용된다.  
body는 다음과 같이 두 종류로 나눌 수 있다.

- Single-resource bodies(단일-리소스 본문) : 헤더 두 개(Content-Type과 Content-Length)로 정의된 단일 파일로 구성된다.
- Multiple-resource bodies(다중-리소스 본문) : 여러 파트로 구성된 본문에서는 각 파트마다 다른 정보를 지닌다.  
  보통 HTML form과 관련이 있다.

</br>

### Response

#### Status line

1. 현재 프로토콜의 버전 (HTTP/1.1)
2. 상태 코드 - 요청의 결과 (200, 302, 404 등)
3. 상태 텍스트 - 상태 코드에 대한 설명

예시 : HTTP/1.1 404 Not Found.

</br>

#### Headers

응답에 들어가는 HTTP headers는 요청 헤더와 동일한 구조를 가지고 있다.

</br>

![Response headers 예시](https://user-images.githubusercontent.com/75058239/127469457-8d685fa6-5ea6-47e9-a1a8-b78013892717.png)

</br>

#### Body

모든 응답에 body가 필요하지는 않다.  
201, 204와 같은 상태 코드라면 본문이 필요하지 않다.  
응답의 body 또한 두 종류로 나눌 수 있다.

- Single-resource bodies(단일-리소스 본문)
  - 길이가 알려진 단일-리소스 본문은 두 개의 헤더(Content-Type, Content-Length)로 정의한다.
  - 길이를 모르는 단일 파일로 구성된 단일-리소스 본문은 Transfer-Encoding이 chunked 로 설정되어 있으며, 파일은 chunk로 나뉘어 인코딩되어 있다.
- Multiple-resource bodies(다중-리소스 본문) : 서로 다른 정보를 담고 있는 body이다.

</br>

## Stateless

말 그대로 상태를 가지지 않는다는 뜻이다.  
HTTP로 클라이언트와 서버가 통신을 주고 받는 과정에서, HTTP가 클라이언트나 서버의 상태를 확인하지 않는다.  
클라이언트가 웹 페이지에서 실행한 모든 상태를 HTTP 통신이 추적하지 않는다.  
또한 이전 요청이나 이후 요청을 기억하지 않는다.  
따라서 필요에 따라 다른 방법(쿠키-세션, API 등)을 통해 상태를 확인해야 한다.

</br>

## HTTP method

### GET

특정 리소스의 표시를 요청한다.  
이 요청은 데이터를 받기만 한다.

</br>

### HEAD

GET 메소드의 요청과 동일한 응답을 요구하지만 응답 본문을 포함하지 않는다.

</br>

### POST

특정 리소스에 Entity를 제출할 때 쓰인다.  
이는 종종 서버 상태의 변화와 같은 부작용을 일으킨다.

</br>

### PUT

목적 리소스의 모든 것을 요청 payload로 바꾼다.

</br>

### DELETE

특정 리소스를 삭제한다.

</br>

### CONNECT

목적 리소스로 식별되는 서버로의 터널을 맺는다.

</br>

### OPTIONS

목적 리소스의 통신을 설정한다.

</br>

### TRACE

목적 리소스의 경로를 따라 메시지 loop-back 테스트를 진행한다.

</br>

### PATCH

리소스의 일부분만 수정한다.

</br>

## HTTP/2

HTTP/1.X 메시지는 성능상 몇 가지 결함을 가지고 있다.

- 본문은 압축이 되지만 헤더는 압축이 되지 않는다.
- 연속된 메시지들은 비슷한 헤더 구조를 띄기 마련인데, 그럼에도 불구하고 메시지마다 반복되어 전송한다.
- 다중 전송(multiplexing)이 불가능하다.  
  서버 하나에 연결을 여러 개 열어야 한다.

이를 보완하기 위해 HTTP/2에서는 추가적인 단계가 도입되었다.  
HTTP/1.X 메시지를 프레임으로 나누어 스트림에 끼워 넣는 것이다.  
이렇게 하면 데이터와 헤더 프레임이 분리되었기 때문에 헤더를 압축할 수 있다.  
또한 스트림 여러 개를 하나로 묶을 수 있어서 TCP 연결이 좀 더 효율적이게 된다.

</br>

## HTTP 상태 코드

모르는 상태 코드를 만났다면 [MDN : HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)를 참고하도록 하자!

</br>

## Advanced

[MDN : MIME Type](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)과 [브라우저의 작동 방식](https://d2.naver.com/helloworld/59361)을 추가로 공부해보도록 하자.

</br>

# 브라우저의 작동 원리 (보이는 곳)

## SPA를 만드는 기술 : AJAX

예전에는 form 태그에서 submit을 할 때마다 페이지 전체가 렌더되는 경우가 많았다.  
이를 극복하기 위해서, 서버와 자유롭게 통신하며 페이지 깜빡임 없이 seamless하게 작동하는 dynamic web page가 등장했다.  
JavaScript와 DOM을 이용하게 되었으며, XMLHttpRequest(XHR)이 등장했다.  
이들을 합쳐서 AJAX(Asynchronous JavaScript and XML)라고 부른다.  
AJAX는 초기에는 XMLHttpRequest를 이용해서 다소 난잡한 코드를 사용했지만, 이후 jQuery를 활용하여 간소화하였고, 이후 fetch API를 활용해서 JavaScript에서 더욱 간편하게 사용할 수 있게 되었다.  
하지만 fetch가 전부 좋은 것은 아니며 XMLHttpRequest 또한 많이 쓰이므로 차이점과, 각자의 사용법을 알아두어야 한다.

</br>

## SSR과 CSR

### SSR (Server Side Rendering)

SSR은 웹 페이지를 브라우저에서 렌더링하는 대신에 서버에서 렌더링한다.  
브라우저가 서버의 URI로 GET 요청을 보내면 서버는 정해진 웹 페이지 파일을 브라우저로 전송한다.  
서버에서 웹 페이지를 완전히 렌더링하고 브라우저로 보냈기 때문에 SSR이라고 부른다.  
웹 페이지의 내용에 데이터베이스의 데이터가 필요한 경우, 서버는 데이터베이스의 데이터를 불러온 다음 웹 페이지를 완전히 렌더링 된 페이지로 변환한 후에 브라우저에 응답을 보낸다.  
사용자가 브라우저의 다른 경로로 이동할 때마다 서버는 이 작업을 다시 수행한다.

</br>

### CSR (Client Side Rendering)

일반적으로 CSR은 SSR의 반대로 여겨진다.  
CSR은 클라이언트에서 페이지를 렌더링한다.  
웹 개벌에서 사용하는 대표적인 클라이언트는 웹 브라우저이다.  
브라우저의 요청을 서버로 보내면 서버는 웹 페이지를 렌더링하는 대신, 웹 페이지의 골격이 될 단일 페이지를 클라이언트에 보낸다.  
또한 서버는 웹 페이지와 함께 JavaScript 파일을 보낸다.  
클라이언트는 이들을 받아서 완전히 렌더링 된 페이지로 바꾼다.  
데이터베이스의 데이터를 사용하기 위해서는 API를 사용한다.  
그리고 브라우저가 다른 경로로 이동할 때, CSR 방식에서는 서버가 웹 페이지를 다시 보내지 않는다.  
브라우저는 브라우저가 요청한 경로에 따라 페이지를 다시 렌더링한다.  
이 때 보이게 되는 웹 페이지의 파일은 맨 처음 서버로부터 전달받은 웹 페이지 파일과 동일하다.

</br>

### Use SSR

- SEO(Search Engine Optimization)가 우선순위인 경우, 일반적으로 SSR 사용
- 웹 페이지의 첫 화면 렌더링이 빠르게 필요한 경우, 단일 파일 용량이 작은 SSR이 적합
- 웹 페이지와 사용자의 상호작용이 적은 경우

</br>

### Use CSR

- SEO가 우선순위가 아닌 경우
- 사이트에 풍부한 상호작용이 있는 경우
- 더 나은 사용자 경험(빠른 동적 렌더링 등)을 원할 경우

</br>

## CORS (Cross-Origin Resource Sharing)

처음 전송되는 리소스의 도메인과는 다른 도메인으로부터 리소스가 요청될 경우 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다.  
예를 들어, HTML 페이지 중 img 태그의 src 속성을 통해서 다른 도메인에 접속하는 경우가 이에 해당한다.  
또한 프로토콜이 다르거나 포트 번호가 다른 경우에도 origin이 다르다고 판단되어 CORS가 작동한다.  
CORS는 특정 요청을 거절하는 기능이 아니라, 애플리케이션을 사용하는 유저들을 보호하는 브라우저의 자발적인 보안 조치이다.  
대표적으로 XMLHttpRequest와 fetch API는 이 CORS를 사용한다.

</br>

### Simple requests

몇몇 요청은 CORS prefilght을 작동시키지 않는다.  
다음은 simple requests이기 위한 조건이다.

- HTTP method : GET, HEAD, POST 중 하나일 것
- 자동으로 작성되는 헤더일 것
- Content-Type : 다음 3가지 중 하나일 것
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

</br>

### Preflighted requests

OPTIONS 메소드를 통해 다른 도메인의 리소스로 HTTP 요청을 보내서 요청이 전송하기에 안전한지 확인한다.  
Cross-site 요청은 유저 데이터에 영향을 줄 수 있기 때문에 이와 같이 미리 전송(preflight)한다.  
조건은 다음과 같다.

- HTTP method : PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH 중 하나라도 사용할 경우 실행됨

Or

- 요청에 다른 헤더들이 추가되는 경우

Or

- Content-Type : 다음 3가지와는 별개의 Content-Type이 왔을 때 실행됨
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

</br>

### Requests with credentails

서버에 요청할 때 쿠키에 있는 정보를 같이 보낼 수 있는지에 대한 검증
