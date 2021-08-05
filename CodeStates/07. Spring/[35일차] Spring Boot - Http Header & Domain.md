2021 / 08 / 05

## HTTP Header

### RequestHeader

#### 1. 요청 헤더 전체 확인하기

스프링에서는 RestController를 통해 HTTP 헤더에 접근할 수 있다.  
@RequestHeader 어노테이션을 이용하면 원하는 헤더를 읽어올 수 있다.

```java
@RestController
@RequestMapping("/")
public class RequestController {

    @GetMapping("/test")
    public Map<String, Object> requestSth(@RequestHeader Map<String, Object> requestHeader) {
        System.out.println(requestHeader);
        return requestHeader;
    }

}
```

위와 같은 코드로, 요청의 모든 헤더를 콘솔에 출력해줄 수 있다.

</br>

#### 2. 특정 요청 헤더 확인하기

```java
@RestController
@RequestMapping("/")
public class RequestController {

    @GetMapping("/indiviTest")
    public String requestIndividual(@RequestHeader("custom-header") String custom){
        System.out.println(custom);
        return custom;
    }
}
```

Postman을 통해서 요청 헤더를 위 코드와 같은 이름으로 직접 작성한 뒤 요청을 보내면, 직접 작성한 요청 헤더와 그 값이 콘솔에 찍힌다는 것을 확인할 수 있다.

</br>

### ResponseStatus

```java
@ResponseStatus(HttpStatus.__________)
```

위와 같이 @ResponseStatus 어노테이션을 활용하면 HttpStatus에 내장된 enum 타입을 활용해서 상태 코드를 전달할 수 있게 된다.  
메소드 당 1개를 작성할 수 있고, 400번대나 500번대를 전달하는 것도 가능하다.  
사용 예시는 다음과 같다.

```java
@Controller
@ResponseBody
@NoArgsConstructor
public class LoginController {

    private LoginRepository loginRepository = new LoginRepository();
    private ArrayList<LoginDTO> fliterLoginData = new ArrayList<>();

	@GetMapping(value = "/test")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String TestForStatusCode() {
        System.out.println("Done!");
        return "It's done";
    }
		...
}
```

</br>

### ResponseHeader

각 응답마다 헤더를 작성할지, 혹은 전체 응답에 동일한 헤더를 작성할 것인지에 따라 작성 방법이 달라진다.  
하나의 응답에 대해 헤더를 설정한다면 HttpServletResponse 또는 ResponseEntity 객체를 사용해야 하지만 전체 또는 다수의 응답에 필터를 추가하는 것이라면 필터를 구성해야 한다.

</br>

#### 1. 각 응답에 대한 헤더 설정

##### HttpServletResponse

단순히 HttpServletResponse 객체를 엔드포인트에 파라미터로 추가한 다음, addHeader() 메소드를 사용하여 헤더를 설정할 수 있다.

```java
@GetMapping("/login")
public ArrayList<LoginDTO> GetLoginData(@RequestParam(required = false) String name, HttpServletResponse response){
    filterLoginData.clear();
    if(name != null){
        for (int i = 0; i < loginRepository.getLoginList().size(); i++){
            if(loginRepository.getLoginList().get(i).getUserName().equals(name)){
                filterLoginData.add(loginRepository.getLoginList().get(i));
            }
        }
        response.addHeader("Test-Example-Header", "Value-HttpServletResponse");
        System.out.println("Response with header using HttpServletResponse");
        return filterLoginData;
    }
    response.addHeader("Test-Example-Header", "Value-HttpServletResponse");
    System.out.println("Response with header using HttpServletResponse");**
    return loginRepository.getLoginList();
}
```

</br>

##### ResponseEntity

스프링에서 제공하는 클래스 중 HttpEntity가 존재한다.  
이 클래스 안에는 HTTP Request 또는 Response에 해당하는 HttpHeader와 HttpBody가 포함되어 있다.  
이러한 HttpEntity를 상속받아 구현한 클래스가 ResponseEntity, RequestEntity이다.  
따라서 ResponseEntity는 사용자의 HttpRequest에 대한 응답 데이터(HttpStatus, HttpHeaders, HttpBody)를 포함한다.  
사용 방법은 다음과 같다.

```java
@GetMapping("/")
public ResponseEntity<String> UsingResponseEntityToSettingHeaders() {
    HttpHeaders responseHeader = new HttpHeaders();
    responseHeader.set("Test-Header", "Value-ResponseHeader");

    return ResponseEntity.ok()
            .headers(responseHeader)
            .body("Response with header using ResponseEntity");
}
```

</br>

#### 2. 전체 응답에 대한 헤더 설정

전체에 대해 응답 헤더를 작성해야 할 경우 Servlet 인터페이스 중 하나인 Filter를 구현하여 사용한다.  
사용 방법은 다음과 같다.

```java
@WebFilter("/*")
public class AddResponseHeaderFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) res;
        httpServletResponse.setHeader("Example-Filter-Header", "Value-Filter");
        chain.doFilter(req, res);
    }

    @Override
    public void init(FilterConfig config) throws ServletException {}

    @Override
    public void destroy() {}

}
```

응답 헤더를 설정하는 doFilter 부분에 setHeader() 메소드를 사용하여 추가하고자 하는 응답 헤더의 키와 값을 적어주었다.  
그리고 이러한 설정 정보를 스프링 부트가 프로그램을 실행할 때 사용할 수 있도록 main 클래스에도 @ServletComponentScan 어노테이션을 추가해야 한다.

```java
@ServletComponentScan
@SpringBootApplication
public class MiniCrudServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiniCrudServerApplication.class, args);
	}
}
```

</br>

### CORS 설정

Controller 단에서 개별적으로 설정할 수도 있고, 전체 프로그램 설정으로 작성할 수 있다.

</br>

#### 1. Controller에서 CORS 설정

@CrossOrigin 어노테이션을 작성하면 된다.

```java
@CrossOrigin
@GetMapping("/pictures")
public ArrayList<Picture> GetPictureData(@ReqeustParam String name) {}
```

이런 식으로 작성하면 모든 Origin을 허용하게 되며, @GetMapping 메소드 상단에 작성하였기 때문에 HTTP GET 메소드만 허용되고, preflight 유지 시간은 30분으로 설정된다.  
메소드 단위가 아닌 전체 컨트롤러 단위에서도 작성 가능하다.

```java
@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@ResponseBody
public class BoardController {
    ...
}
```

모든 출처를 허용하며, 해당 Controller 내 모든 메소드를 허용한다.  
preflight 유지 시간은 3600초로 설정한다.  
이외에도 allowCredentials, methods, allowedHeaders, exposedHeaders 를 선택하여 설정할 수 있다.

</br>

#### 2. 전역적으로 CORS 설정

보통 Config와 같은 설정 전용 패키지를 만들어주고 CORS 설정을 담을 클래스를 생성해주는 방식으로 전용 클래스를 만들어준다.

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .maxAge(3600)
    }
}
```

- addMapping : CORS를 적용할 URL 패턴을 정의한다.  
  "/\*\*"은 와일드 카드로 사용된다. 모든 Origin과 헤더를 허용하고 simple request에 해당하는 GET, POST 메소드가 사용 가능해진다. preflight 유지 시간은 1800초이다.
- allowedOrigins : 허용할 출처를 지정할 수 있다.
- allowedMethods : 허용할 메소드를 선택할 수 있다.
- maxAge : preflight 유지 시간을 작성할 수 있다.

※ maxAge 속성은 preflight 결과의 캐시를 일정 기간 동안 저장한다.  
이 캐시 정보가 살아있는 시간 동안에는 cross-origin 요청에 대해서 preflight를 생략하고 바로 요청 전송이 가능하다.

</br>

## Domain

### DTO (Data Transfer Object)

계층 간 데이터를 교환해주는 역할을 담당한다.  
DB에서 꺼낸 데이터를 저장하는 Entity를 가지고 만드는 일종의 바구니로 볼 수 있다.  
Entity를 직접 전달하는 대신 DTO를 사용하여 데이터를 교환하게끔 해준다.

</br>

![DTO 개념](https://user-images.githubusercontent.com/75058239/128289499-a4791ae1-8b44-4430-942d-5a91c74c2b74.png)

</br>

DTO는 그저 계층 간 데이터 교환이 이루어질 수 있도록 하는 객체이기 때문에 Getter와 Setter를 제외한 특별한 로직을 가지지 않는 순수한 데이터 객체여야만 한다.  
DTO의 데이터는 유연하게 변경될 수 있으며, DB의 데이터가 다른 계층으로 넘어갈 때 DTO의 형태로 넘어가게 된다.

</br>

### VO (Value Object)

원어 그대로 '값 객체'이다.  
여기서의 값은 특정한 비즈니스의 값을 뜻한다.  
DTO가 계층 간 전달을 위해서 쓰는 바구니와 같은 역할이라면, VO는 실제 값을 의미한다.  
DTO와 다르게 Getter 메소드와 비즈니스 로직은 가질 수 있지만, Setter가 없어서 수정이 불가능한 불변 객체이다.  
값을 비교하기 위해서는 equals 메소드와 hashCode 메소드를 Override해서 사용해야 한다.  
만약 서로 다른 이름을 갖는 VO 객체라 하더라도 모든 속성값이 같다면 같은 객체라고 할 수 있다.

```java
@Getter
@AllArgsConstuctor
public class LoginVO {
    private String userName;
    private String userID;
    private String userPW;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginVO data = (LoginVO) o;
        return userID == data.userID && Objects.equals(userName, data.userName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, userPW);
    }
}
```

</br>

### DTO, VO의 차이점

|          특징           |             DTO              |       VO       |
| :---------------------: | :--------------------------: | :------------: |
|          정의           | 레이어 간 데이터 전송용 객체 | 값 표현용 객체 |
|     상태 변경 여부      |     가변 또는 불변 객체      |   불변 객체    |
| 비즈니스 로직 포함 여부 |         포함 불가능          |   포함 가능    |
