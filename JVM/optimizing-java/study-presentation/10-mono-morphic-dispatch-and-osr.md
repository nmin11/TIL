# 단형성 디스패치와 온-스택 치환 알아보기

*Mono-Morphic Dispatch & On-Stack Replacement*

⎯ 남궁민

## 헷갈리는 개념들을 깊이 이해해보자!

10장에서 다루는 핫스팟 JIT 컴파일러의 최신 최적화 기법들

- 인라이닝
- 루프 펼치기
- 탈출 분석
- 락 생략/확장
- 단일형 디스패치
- 인트린직
- 온-스택 치환

---

- ~~인라이닝~~ - 👌
- ~~루프 펼치기~~ - 👌
- ~~탈출 분석~~ - 👌
- ~~락 생략/확장~~ - 👌
- 단일형 디스패치 - *조금 헷갈리는데...*
- ~~인트린직~~ - 👌
- 온-스택 치환 - *엥 뭐지?*

## 자바 메소드 디스패치의 흑마술

[The Black Magic of (Java) Method Dispatch](https://shipilev.net/blog/2015/black-magic-method-dispatch/)

### 메소드 디스패치 방식을 이해해야 하는 이유

- 자바는 재사용 가능한 모듈식 소프트웨어 작성을 위해 **서브타입**과 **다형성**을 지원
- 가상 호출에 대한 하드웨어 지원이 없으므로, **메소드 디스패치**에는 당연히 대가가 따름
- 대부분의 경우 메소드 디스패치에 대한 성능 오버헤드는 무시할 수 있을 정도로 작음
- 하지만 메소드 디스패치 성능이 중요한 몇몇 케이스들이 존재함

### 정적 메소드, 추상 클래스 구현체, 인터페이스 구현체

- 벤치마크를 해보면 정적 메소드 - 동적 추상 클래스 구현체 - 동적 인터페이스 구현체 순으로 성능이 빠름
- 정적 메소드는 **정적 바인딩**을 통해 메소드 디스패치를 생략할 수 있음
- 동적 추상 클래스 구현체는 가상 메소드를 호출하면서 null check 비용 발생
- 동적 인터페이스 구현체는 타입 체크 비용도 추가로 발생

### 단형성 디스패치

- 컴파일 타임에 call receiver를 정확히 알고 있고, 메소드 동작이 receiver 상태에 의존하지 않는다면 `static`을 사용하자

### 이형성 디스패치

- 하위 클래스 혹은 인터페이스 구현체들은 C2 컴파일러에서 훌륭하게 최적화된다
- 일반적이지 않은 몇몇 경우에 따라, 정적 디스패치 방식으로 약간의 오버헤드를 줄이는 성능 최적화는 가능하다

### 다형성 디스패치

- 정적 분석이 3개의 호출 가능 타겟을 확인하더라도, 컴파일러는 동적 타입 프로필을 활용한 추측성 최적화를 통해 정확한 receiver 타겟을 찾아낼 수 있다
  - C2는 단형성 및 이형성의 경우에 일반적으로 이 작업을 수행하고, 확실하게 추측할 수 있는 다형성의 경우에도 수행한다
  - C1은 다형성 디스패치 최적화를 수행하지 않는다
- `instanceof` 연산자를 사용하면, 컴파일러는 타입 체크를 수행하고, 메소드 호출을 최적화할 수 있다
  - 다형성을 단형성, 이형성으로 치환하는 셈

dynamic method dispatch

- 어떤 메소드가 호출될지 동적으로 결정하는 것

## 단일성이 뭐야?

[What's up with monomorphism?](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html)

- 다형성의 매우 약한 보장
  - "object는 A, B, C 중에 하나이다."
- 단형성은 하드웨어와 가깝다!
- 하지만 객체지향 언어에서 인터페이스를 작성하고 이에 대한 구현체를 작성하는 것은 매우 중요한 추상화 메커니즘
- 다형성에 대한 성능 걱정은 일반적인 상황에서 의미가 없다


## 온-스택 치환

https://die4taoam.tistory.com/52

- RET(Return Address) : 함수 호출 이후 복귀 지점을 스택에 만드는 것
- OSR: RET의 일반적인 흐름에서 벗어나 루프를 점프할 수 있도록 최적화하는 기법

https://thangavel-blog.medium.com/java-on-stack-replacement-osr-b527ab3fff8c

- OSR은 오래 실행된 "핫" 바이트코드를 컴파일해준다

단계

1. 런타임이 특정 메소드 (현재 변수값, 프로그램 카운터)
2. 메소드를 다시 컴파일
3. 컴파일러는 스택 활성화 프레임을 생성하고 이전 버전에서 추출된 값들로 업데이트
4. 시스템은 이전 활성화 프레임을 교체하고 새 버전에서 재실행

```bash
<nmethod compile_id='272' compile_kind='osr' compiler='c1' level='3' entry='0x000000010ce0a5c0' size='15200' address='0x000000010ce0a090' relocation_offset='336' insts_offset='1328' stub_offset='11312' scopes_data_offset='11864' scopes_pcs_offset='13552' dependencies_offset='14992' nul_chk_table_offset='15000' metadata_offset='11720' method='java.util.Properties$LineReader readLine ()I' bytes='584' count='49' backedge_count='62873' iicount='49' stamp='0.126'/>
```

- `bytes` : 메소드 크기
- `compiled_kind='osr'` : OSR 기법을 사용했음을 나타냄
- `compiler='c1'` : C1 컴파일러를 사용했음을 나타냄
- `count` : 컴파일러에 의해 메소드가 호출된 횟수
- `backedge_count` : 루프가 포함된 메소드를 감지하는 용도, 인터프리터에 의해 숫자가 증가됨
- `iicount` : 인터프리터가 메소드를 호출한 횟수
