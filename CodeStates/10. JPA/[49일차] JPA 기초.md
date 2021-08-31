2021 / 08 / 31

# JPA 개념

## ORM (Object-Relational Mapping)

현업에서 SQL 작성에 많은 시간을 쏟게 된다.  
API 요청마다 다른 데이터를 요구하기 때문에 매번 SQL을 새로 작성해야 하기 때문이다.  
SQL 작성은 반복적이지만 조금의 실수로도 치명적인 버그가 발생할 수 있기 때문에 주의를 기울여야 한다.  
이런 위험 요소를 줄이기 위해 SQL 작성을 자동화해주는 것이 ORM이다.  
ORM을 사용하면 SQL을 직접적으로 작성하는 일을 최소화할 수 있다.  
그리고 SQL 직접 작성을 줄이게 되면 개발자는 비즈니스 로직에 집중할 수 있게 된다.

</br>

## JPA와 MyBatis

Java 환경에서 SQL을 다룰 수 있는 기술에는 JDBC와 JPA가 있다.  
JDBC 방식을 사용하는 프레임워크가 MyBatis이다.  
국내에서는 MyBatis가 현재 회사에서 가장 많이 사용되는 기술이지만 점차 JPA로 전환되고 있다.  
JDBC는 SQL을 직접 작성하기 때문에 JPA에 비해 작업량이 많지만 복잡한 쿼리의 경우 JPA에 비해 평균적으로 처리 속도가 빠르다는 장점이 있다.  
이 같은 장점 덕분에 JDBC는 아직도 금융 거래 서비스를 중점으로 많이 사용된다.  
하지만 JPA가 가진 높은 생산성과 유지보수성, 그리고 패러다임의 일치라는 특성 때문에 스타트업을 중심으로 JPA의 사용 빈도가 높아지고 있다.

</br>

## Spring Project에 MySQL 등록하기

크게 2가지 단계를 거쳐서 등록할 수 있다.

1. build.gradle에 `org.springframework.boot:spring-boot-starter-data-jpa` 추가
2. application.properties에 `spring.datasource` 설정 추가

참고로 `org.springframework.boot:spring-boot-starter-data-jpa`는 JPA와 JDBC를 모두 포함하고 있어서 둘 다 사용 가능하게 해준다.

</br>

### build.gradle

```gradle
dependencies {
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'mysql:mysql-connector-java'
... // 다른 라이브러리
}
```

</br>

### application.properties

```properties
spring.jpa.database=mysql
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect

server.address=localhost
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/{DB 이름}?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password= {DB 비밀번호}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

 spring.jpa.show-sql=true
 spring.jpa.hibernate.ddl-auto=update
```

</br>

## Repository JPA 사용하기

```java
@Repository
public class MyRepository {

    private final EntityManager em;

    @Autowired
    public TokenRepository(EntityManager em){
        this.entityManager = em;
    }

    @Transactional
    public MyUser FindById(String id){
        List<UserList> list = entityManager
                .createQuery("SELECT user FROM UserData AS user WHERE user.userId='" + id + "'", UserList.class)
                .getResultList();
        entityManager.close();
        return list.get(0);
    }
}
```

JPA를 사용하기 위해서는 EntityManager를 생성해야 한다.  
EntityManager는 JPA에서 핵심이 되는 객체로, Spring Container 객체와 동일한 위치라고 생각할 수도 있다.  
생성자 주입으로 EntityManager를 주입받을 수 있으며 이 때 EntityManager는 Spring에서 자동으로 넣어준다.  
데이터베이스와 데이터를 주고 받는 메소드 혹은 클래스에는 @Transactional 어노테이션을 사용해야 한다.  
이 어노테이션은 DB 작업에서 생성되는 트랜잭션을 자동으로 관리해준다.

```java
entityManager.createQuery()
```

위 메소드는 SQL을 직접 작성할 수 있게 해주는 메소드이다.  
첫 번째 인자로 SQL문이 작성되고 두 번째 인자로 리턴되는 Entity 객체 타입을 작성한다.  
주의할 점은 SQL문은 표준 SQL문이 아니라 JPQL이라는 점이다.  
이 차이점을 꼭 숙지하고 있어야 한다.

</br>
</br>

# Entity

Entity 클래스는 DB의 실제 테이블과 매핑되는 객체를 의미한다.  
Entity는 DB의 테이블과 1:1로 대응되며, 이를 기준으로 생성된다.  
또한 Entity는 다른 클래스를 상속받을 수 없고, 인터페이스의 구현체일 수도 없다.

```java
@Entity
public class Post {
    private String title;
    private String content;
    private String author;
}
```

Entity 클래스는 @Entity 어노테이션을 붙여서 Entity임을 명시해줘야 하며, 필드에는 @Column, @Id 등의 어노테이션을 사용해줘야 한다.  
그리고 Setter의 사용에 대해서 각별히 주의해야 한다.  
Setter는 Entity의 일관성을 해칠 수 있다.  
Setter를 무분별하게 사용하면 Entity의 인스턴스 값들이 언제 어디서 변하는지 명확히 알 수 없다.  
생성자를 활용하는 방법도 있지만 생성자에 현재 넣는 값이 어떤 필드인지 명확히 알 수 없고, 매개변수끼리의 순서가 바뀌더라도 코드가 모두 실행되기 전까지 문제를 알 수 없다는 단점이 있다.  
따라서 `Builder` 패턴을 사용하는 것이 좋다.  
Builder를 활용하면 어떤 값을 어떤 필드에 넣는지 코드를 통해 확인할 수 있고, 필요한 값만 집어넣을 수 있게 된다.

```java
@Getter
@Entity
@NoArgsConstructor
public class Membmer member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userID;

    @Column(nullable = false)
    private String userPW;

    @Builder
    public Member(long id, String name, String email, String phoneNumber) {
        this.id = id;
        this.userName = userName;
        this.userID = userID;
        this.userPW = userPW;
    }
}
```

```java
//Builder 사용하기
Member member = new member.builder()
        .userName("홍길동")
        .userID("test@gmail.com")
        .userPW("tobeamember2021")
        .build();
```

</br>

## Entity 어노테이션

### @Entity

@Entity 어노테이션이 붙어있으면 해당 객체는 JPA에서 관리해준다.  
기본값은 클래스 이름이며, name 속성을 통해 수정할 수 있다.  
그리고 @Entity의 객체는 몇 가지 제약 사항을 가진다.

- JPA를 쓰는 라이브러리들이 동적으로 다양한 기술을 써서 객체를 사용하는 경우가 있으므로 기본 생성자 필수
- 필드에 final 키워드 사용 불가
- final, enum, interface, inner 클래스 사용 불가

</br>

### @Column

@Column 어노테이션이 붙은 필드는 테이블의 컬럼과 1:1 매핑된다.  
@Column 어노테이션은 또한, 속성값을 통해서 다양하게 사용할 수 있다.

```java
@Column(name = "username")
private String name;
```

name 속성을 통해 객체의 필드명과 테이블의 필드명을 다르게 해줄 수 있다.

```java
@Column(nullable = false)
private String email;
```

null 값 허용 여부를 결정한다.

```java
@Column(length = 512)
private String description;
```

String 값의 length를 설정해줄 수 있다.

```java
@Column(insertable = false, updatable = false)
private String authenticate;
```

등록이나 업데이트를 허용할지를 설정할 수 있다.

```java
@Column(unique = true)
private String nickname;
```

```java
@Column(columnDefinition= "varchar(255)")
private String introduce;
```

컬럼 정의를 직접 할 수 있도록 해준다.  
이 속성은 문구 그대로 DDL 문에 들어간다.

</br>

#### @Id

@Id는 데이터베이스 테이블의 PK 컬럼을 표현할 수 있게 도와준다.  
@Id 어노테이션이 붙은 필드는 테이블의 PK 컬럼과 매핑되고, 해당 필드가 PK 속성을 가질 수 있게 도와준다.

```java
@Id
private Long id;
```

</br>

#### @GeneratedValue

@GeneratedValue는 PK 값을 위해 순차적으로 다음 고유값을 자동으로 생성해준다.  
strategy 속성을 통해 생성 전략을 표기해야 하며, 기본값 AUTO 옵션은 데이터베이스에 맞게 자동 생성하는 전략이다.

```java
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
```

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

IDENTITY 옵션은 데이터베이스에서 INDENTITY라는 컬럼을 이용해서 고유값을 생성하는 전략이다.

```java
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
private Long id;
```

마찬가지로 데이터베이스의 시퀀스를 이용해서 고유값을 생성한다.

</br>

#### @Enumerated

Java에는 존재하고, 데이터베이스에는 존재하지 않는 enum 타입을 사용할 수 있게 해준다.  
enum 타입에는 크게 2가지가 있다.

```java
@Enumerated(EnumType.ORDINAL)
private Role role;
```

```java
@Enumerated(EnumType.STRING)
private Role role;
```

ORDINAL은 enum의 순서를 저장하고, STRING은 enum의 이름을 저장한다.  
ORDINAL 타입은 enum을 수정했을 때 충돌이 일어나서 적절한 방법이 아니다.  
STRING 옵션 사용이 권장된다.

</br>

#### @Temporal

날짜를 컬럼으로 갖게 해준다.  
타입으로 TIME, DATE, TIMESTAMP 중에서 선택할 수 있다.

```java
@Temporal(TemporalType.TIME)
private Date createAt;
```

```java
@Temporal(TemporalType.DATE)
private Date createAt;
```

```java
@Temporal(TemporalType.TIMESTAMP)
private Date createAt;
```

3가지 타입이 존재하는 이유는 Java의 Date는 날짜와 시간을 모두 포함하는 반면, 데이터베이스는 날짜, 시간, 날짜+시간 으로 총 3가지 타입을 갖고 있기 때문이다.  
Java 8을 사용하면 LocalDate와 LocalDateTime이 추가되었기 때문에 편리하게 이를 다룰 수 있다.  
LocalDate는 데이터베이스의 DATE 타입으로 저장되고, LocalDateTime은 데이터베이스의 TIMESTAMP 타입으로 저장된다.

</br>

#### @Lob

데이터베이스의 varchar 용량을 넘어가는 큰 데이터를 넣을 수 있게 해준다.  
지정할 수 있는 속성은 따로 없으며, 매핑하는 타입이 String이면 CLOB, 나머지는 BLOB로 매핑한다.

</br>

#### @Transient

필드 매핑을 하지 않는 어노테이션이다.  
데이터베이스에 저장하거나 조회할 수 없다.  
주로 메모리 상에서만 값을 보관하고 싶을 때 사용한다.

</br>
</br>

# 연관관계 매핑

Java의 객체와 데이터베이스의 테이블이 서로 연관관계를 맺는 방법이 다르기에, JPA에서는 다음과 같은 방법을 제공해준다.

```java
@Getter
@Entity
@NoArgsConstructor
public class User {
	@Id @GeneratedValue
	private Long id;

	@Column
	private String name;

	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;

    @Builder
    public User(Long id, String name, Team team) {
        this.id = id;
        this.name = name;
        this.team = team;
  }
}
```

```java
@Getter
@Entity
@NoArgsConstructor
public class Team {
	@Id @GeneratedValue
	private Long id;

	@Column
	private String name;

    @Builder
    public Team(Long id, String name) {
        this.id = id;
        this.name = name;
  }
}
```

team_id 필드를 통해 Team 객체의 정보를 가져올 수 있도록 team 객체 자체를 참조값으로 하였다.  
JPA는 이처럼 간단하게 연관관계를 가진 객체를 참조할 수 있게 해준다.  
이러한 Entity 코드를 Repository에서 활용하는 예시는 다음과 같다.

```java
// 팀 저장
Team team = new team.builder()
		.id(0)
		.name("codestates")
		.build();
em.persist(team);

// 유저 저장
User user = new user.builder()
        .id(0)
        .name("kimcoding")
        .team(team);
        .build();
em.persist(user);

// 유저 객체를 이용해서 팀 객체 가져오기
User findUser = em.find(User.class, user.getId());
Team findTeam = findUser.getTeam();
```

</br>

## 단방향 연관관계 매핑

객체와 테이블은 연관관계를 맺는 방법에서 간극이 있다.  
바로 테이블은 한쪽에서 참조를 하면 양쪽 다 서로를 참조할 수 있게 되지만 객체에서는 단방향으로 참조된다는 점이다.  
JPA에서 이런 구조를 **단방향 연관관계**라고 부른다.

</br>

### @ManyToOne

@ManyToOne은 N:1 연관관계를 표현하는 어노테이션이다.  
외래키가 들어가는 부분에 참조를 보관하는 필드로 매핑하는 방식이다.  
들어갈 수 있는 속성들은 다음과 같다.

- cascade : 영속성 전이 (ALL, PERSISIT, MERGE, REMOVE, REFRESH, DETACH)
- fetch : global fetch 전략 (즉시 로딩, 지연 로딩)
- optional : 기본값 true이며, false 설정 시 연관된 객체가 반드시 있어야 함

</br>

### @JoinColumn

외래 키를 매핑할 때 사용한다.  
생략할 경우 필드명에 따라 자동으로 매핑한다.

```java
@JoinColumn(name = "매핑할 외래 키 이름")
```

</br>

## 양방향 연관관계 매핑

Java의 객체에서 양방향 연관관계를 구현하기 위해서 다른 쪽에도 참조값을 보관하는 필드를 추가해야 한다.  
또한 이번에는 1:N 관계를 명시해야 한다.  
이 때 **@OneToMany** 어노테이션이 사용된다.

```java
@Getter
@Entity
@NoArgsConstructor
public class User {
	@Id @GeneratedValue
	private Long id;

	@Column
	private String name;

	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;
}
```

```java
@Getter
@Entity
@NoArgsConstructor
public class Team {
	@Id @GeneratedValue
	private Long id;

	@Column
	private String name;

	@OneToMany(mappedBy = "team")
    private List<Member> users = new ArrayList<User>();
}
```

Java에서의 양방향 연관관계는 엄밀히 말하자면 단방향 연관관계의 조합이다.  
다만 실제로 외래 키 역할을 하는 필드를 하나로 정하게 되며, JPA에서는 이 객체를 **'연관관계의 주인'** 이라고 표현한다.  
연관관계의 주인만이 외래 키를 관리할 수 있으며, 반대쪽은 읽기만 가능하다.  
@OneToMany의 mappedBy 속성을 통해서 주인 객체를 지정한다.

</br>

## @OneToOne

1:1 연관관계를 표현하는 어노테이션이다.  
N:1 연관관계와 유사하지만 1:1의 경우에는 테이블의 외래 키에 유니크 옵션을 필수로 지정해줘야 한다.  
마찬가지로 외래 키가 있는 테이블 객체가 연관관계의 주인이며, 해당 필드에만 어노테이션을 사용할 경우 단방향 연관관계가 되고, 반대쪽에서도 mappedBy 속성을 사용해주면 양방향 연관관계가 된다.

```java
// people
@Getter
@Entity
@NoArgsConstructor
public class People {
	@OneToOne
	@JoinColumn(name = "gender_id")
	private Gender gender
}
```

```java
// gender
@Getter
@Entity
@NoArgsConstructor
public class Gender {
	@OneToOne(mappedBy = "gender")
	@JoinColumn(name = "people_id")
    private People people
}
```
