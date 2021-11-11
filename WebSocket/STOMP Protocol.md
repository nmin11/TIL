## 정의

- Simple Text Oriented Messaging Protocol (간단한 텍스트 기반 메시지 프로토콜)
- 메시지 브로커를 활용하여 메시지를 쉽게 주고받을 수 있도록 해주는 프로토콜
  - Pub / Sub (발행 / 구독) : 발신자가 메시지를 발행하면 수신자가 그것을 수신하는 메시징 패러다임
  - 메시지 브로커 : 발신자의 메시지를 받아와서 수신자들에게 메시지를 전달해주는 중간 요소
- WebSocket 위에 얹어 함께 사용할 수 있는 하위(서브) 프로토콜

<br>

## 프레임 단위의 프로토콜

- 커맨드, 헤더, 바디로 나누어 메시지를 관리해줌

<br>

## Spring에서 WebSocketMessageBroker를 활용한 샘플 코드

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/queue", "/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chatting")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

}
```

- enableSimpleBroker()
  - 내장 브로커 사용
  - prefix가 붙은 메시지를 발행 시 브로커가 처리하게 됨
    - "/queue" prefix는 메시지가 1:1로 송신될 때, "/topic" prefix는 1:N으로 메시지가 송신될 때 사용됨
- setApplicationDestinationPrefixes()
  - 메시지 핸들러로 라우팅되는 prefix
  - 메시지에 대한 추가 가공이 필요한 경우
- addEndpoint()
  - WebSocket 연결 주소
  - 이전처럼 Handler 하나하나 추가할 필요가 없음 → STOMP를 활용하면 연결 주소마다 설정할 필요 없이 Controller에서 처리하면 됨

<br>

## Spring Message Handler 예시

```java
@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greeting")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000);
        return new Greeting(
            "Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!"
        );
    }

}
```

- RequestMapping과 비슷함
- "/app/hello"의 destination을 가진 메시지들은 여기로 들어와서 가공 과정을 거친 후, "/topic/greeting"으로 다시 메시지를 보냄

<br>

## STMP의 장점

- 하위 프로토콜 혹은 컨벤션을 따로 정의할 필요 없음
- 연결 주소마다 새로 핸들러를 구현하고 설정할 필요 없음
- 외부 Messaging Queue 사용 가능 (RabbitMQ, 카프카 등)
- Spring Security 사용 가능
