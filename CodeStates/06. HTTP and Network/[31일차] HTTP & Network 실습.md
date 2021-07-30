2021 / 07 / 30

# REST API

REST API에서 REST는 "Representational State Transfer"의 약자로, Roy Fielding의 박사학위 논문에서 웹의 장점을 활용할 수 있는 아키텍쳐로써 처음 소개되었다.  
REST API는 웹에서 사용되는 모든 자원을 HTTP URI로 표현하고, HTTP method를 통해 요청과 응답을 정의하는 방식이다.  
그리고 REST API를 사용한다는 것은 REST 아키텍쳐의 제약 조건을 준수한다는 뜻이 된다.

</br>

## Endpoint

- root-endpoint(root-URL) : API로 요청할 때, 서버가 요청을 수락하는 시작점

대표적으로 Github API의 root-endpoint는 https://api.github.com 이다.  
일반적으로 root-endpoint는 도메인 주소의 루트(/)를 가리킨다.

- path : API를 통해 서버와 통신할 때, 서버와 통신할 수 있는 key 역할을 한다.  
  서버에 정의된 문자열에 따라 path가 달라진다.  
  예를 들어, https://api.github.com/user 에서는 'user'가 path이다.

</br>

## 요청과 응답

요청은 다음과 같이 보낼 수 있다.

```
GET /{githubID}/messages

or

GET /{githubID}/messages?roomname=로비
```

응답은 다음과 같이 JSON 형태로 전달된다.

```json
[
  {
    "id": 1,
    "username": "로코",
    "text": "안녕하세요",
    "roomname": "로비",
    "date": "2021-07-30T03:54:21.134"
  }
  // ...여러 개의 메시지
]
```

</br>

## 어떻게 디자인해야 하는가?

REST API는 공식적으로 정해진 뚜렷한 규격이 없다.  
그러나 REST API 모범 사례는 여전히 논의되고 통합되고 있기 떄문에 참고할 만한 좋은 REST API 디자인은 분명히 있다.  
REST API 설계 시 핵심적인 2가지는 다음과 같다.

- URI는 정보의 자원을 표시
- 자원에 대한 상태 정의는 HTTP method로 표현

</br>

참고 자료

- [RestCase의 REST API 5가지 기본 가이드라인](https://blog.restcase.com/5-basic-rest-api-design-guidelines/)
- [구글 API 작성 가이드](https://cloud.google.com/apis/design?hl=ko)

</br>

## Open API와 API Key

### Open API

정부에서 제공하는 공공데이터가 있다.  
공공데이터 포털에 접속해서 원하는 키워드를 입력하면 관련된 API를 확인할 수 있다.  
이는 글자 그대로 누구에게나 열려있는 API이다.  
그러나 무제한으로 이용할 수 있는 것은 아니다.  
API마다 정해진 이용 수칙이 있고 이에 따라 제한사항이 있을 수 있다.

</br>

### API Key

API를 이용하기 위해서 API Key가 필요하다.  
클라이언트와 서버가 통신한다는 것은 결국 서버 운용 비용이 발생한다는 뜻이다.  
따라서 서버 입장에서 아무 조건 없이 익명의 클라이언트에게 데이터를 제공할 의무도, 이유도 없다.  
그래서 로그인된 이용자에게만 자원에 접근할 수 있는 권한을 API Key 형태로 제공한다.  
사용자는 데이터를 요청할 때 API Key를 같이 전달해야만 원하는 응답을 받을 수 있다.

</br>

**개발을 잘 하려면 API 문서를 잘 볼 줄 알아야 한다!**
