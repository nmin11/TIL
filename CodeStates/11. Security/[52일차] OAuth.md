2021 / 09 / 08

# OAuth 2.0

웹 사이트들을 돌아다니다 보면 흔하게 볼 수 있는 소셜 로그인 인증 방식은 OAuth 2 라는 기술을 바탕으로 구현된다.  
OAuth는 인증을 중개해주는 매커니즘이다.  
**보안된 리소스에 액세스하기 위해 클라이언트에게 권한 제공 프로세스를 단순화하는 프로토콜이다.**  
이미 사용자 정보를 갖고 있는 웹 서비스(Github, Google, Facebook 등)에서 사용자의 인증을 대신해주고, 접근 권한에 대한 토큰을 발급한 후, 이를 이용해서 해당 앱에서 인증이 가능하도록 한다.

</br>

하지만 OAuth가 모든 것을 해결해주는 것은 아니다.  
사용자 정보가 내 서버에 저장된다는 사실에는 변함이 없기 때문이다.  
OAuth는 Authentication(인증)을 다른 서비스에 맡길 뿐, Authorization(권한 관리)는 순전히 해당 서버의 몫이다.  
그러므로 OAuth의 작동 방식을 이해하기 위해서, 기존의 인증 방식도 꼭 알아두고 있어야만 한다.

</br>

## OAuth는 언제, 왜 쓰는가?

유저 입장에서 보면, 유저는 웹 상에서 굉장히 많은 서비스들을 이용하고 있고 각 서비스들을 이용하기 위해서 회원가입 절차가 필요한 경우가 대부분이다.  
따라서 본인이 이용하고 있는 서비스들의 모든 ID와 Password들을 다 기억하기가 번거로울 것이다.  
하지만 OAuth를 활용하면 자주 사용하는 중요한 서비스들의 ID와 Password만 기억해 놓고 해당 서비스들을 통해서 소셜 로그인을 하도록 처리해줄 수 있다.  
뿐만 아니라 OAuth는 보안 상의 이점도 있다.  
검증되지 않은 앱에서 OAuth를 사용해서 로그인한다면, 유저의 민감한 정보가 앱에 노출될 일이 없고 인가를 미리 유저에게서 구해야 하기 때문에 더 안전하게 사용할 수 있다.

</br>

## OAuth 필수 용어

- **Resource Owner** : 액세스 중인 리소스의 유저
- **Client** : `Resource Owner`를 대신하여 보안된 리소스에 액세스하는 응용 프로그램
- **Resource Server** : `Client`의 요청을 수락하고 응답할 수 있는 서버
- **Authorization Server** : `Resource Server`가 액세스 토큰을 발급받는 서버
- **Authorization Grant** : `Client`가 `Access Token`을 얻을 때 사용하는 자격 증명의 유형
- **Authorization Code** : `Access Token`을 발급받기 전에 필요한 코드, Client ID로 이 코드를 받아오고 Client Secret과 이 코드를 이용하여 `Access Token`을 받아옴
- **Access Token** : 보안된 리소스에 액세스하기 위해 사용되는 Credentials, `Resource Server`에 접근 가능하게 해줌
- **Scope** : 토큰의 권한을 정의, 주어진 `Access Token`을 사용하여 액세스할 수 있는 리소스의 범위

</br>

## 소셜 로그인 로직 플로우

![소셜 로그인 로직 플로우](https://user-images.githubusercontent.com/75058239/132483801-363584ba-e902-456a-8b6a-fec2128dc91e.jpeg)
