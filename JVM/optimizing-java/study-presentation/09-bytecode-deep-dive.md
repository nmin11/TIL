# 자바 바이트코드 이해하기

⎯ 남궁민

## 목차

1. 레지스터 머신 VS 스택 머신
  - 레지스터 머신의 작동 방식
  - 스택 머신의 작동 방식
  - 비교
  - JVM 스택 머신
2. 바이트코드란?
3. 자바 어셈블리를 통해 바이트코드 작동 방식 이해하기
  - 2 ~ 1,000 사이의 소수를 출력하는 예제
  - Hello World 10번 출력하는 예제

## 레지스터 머신 VS 스택 머신

- 스택이나 레지스터나 똑같이 연산 수행을 목표로 함

### 레지스터 머신의 작동 방식

2 + 3

```java
LOADI R1, 2 ; 레지스터 1에 숫자 2를 로드
LOADI R2, 3 ; 레지스터 2에 숫자 3을 로드
ADD R1, R2  ; 레지스터 1과 2를 더한 결과를 레지스터 1에 저장
```

### 스택 머신의 작동 방식

2 + 3

```java
PUSHI #2 ; 스택에 숫자 2를 푸시
PUSHI #3 ; 스택에 숫자 3을 푸시
ADD      ; 스택에서 2개의 값을 꺼내 더하고 스택 최상단에 결과를 푸시
```

- 계산 결과를 따로 저장하지 않는다
- 작업할 값을 모두 *평가 스택* 에 놓고 스택 머신 명령어로 스택 최상단에 위치한 값을 변환하는 방식

### 비교

- 레지스터 기반 VM
  - 실제 하드웨어와 유사하기 때문에 실제 머신에 최적화하기에 좋음
  - 더 적은 명령어를 사용하지만 명령어에 피연산자의 메모리 주소를 명시하므로 사이즈가 큼
- 스택 기반 VM
  - 하드웨어에 대한 의존성이 낮아서 VM을 쉽게 구현할 수 있음
  - 명령어 개수는 많지만 명령어 사이즈가 적음

### JVM 스택 머신

JVM이 데이터를 담아 놓는 공간들

- 평가 스택: 메소트별로 하나씩 생성되며 연산을 위해 사용됨
- 로컬 변수: 메소드 내부에서 사용되는 변수를 담는 공간, 결과를 임시로 저장하는 용도
- 객체 힙: 객체를 저장하는 공간, 메소드 혹은 스레드끼리 공유됨

## 바이트코드란?

= JVM 스택 머신의 opcode

- 1byte 크기의 연산 코드
  - 0부터 256까지 지정 가능한데, 현재 200개 정도 사용 중
  - 자바 코드를 배포하는 가장 작은 단위
- 기본형과 참조형을 사용할 수 있게 '패밀리 단위'로 구성됨
- 자바 바이트코드 명령어는 opcode와 operand(피연산자)로 구성됨

❖ 바이트코드 예시

```java
aload_0 = 0x2a
getfield = 0xb4
invokevirtual = 0xb6
```

## 자바 어셈블리를 통해 바이트코드 작동 방식 이해하기

- 클래스 파일은 바이너리 파일이므로 사람이 이해하기 어려움
- 이를 위해 벤더들은 `javap` 라는 역어셈블러를 제공
  - 자바 어셈블리를 통해 바이트코드를 이해할 수 있음

### 2 ~ 1,000 사이의 소수를 출력하는 예제

```java
outer:
for (int i = 2; i < 1000; i++) {
    for (int j = 2; j < i; j++) {
        if (i % j == 0)
            continue outer;
    }
    System.out.println (i);
}
```

```java
0:   iconst_2
1:   istore_1
2:   iload_1
3:   sipush  1000
6:   if_icmpge       44
9:   iconst_2
10:  istore_2
11:  iload_2
12:  iload_1
13:  if_icmpge       31
16:  iload_1
17:  iload_2
18:  irem
19:  ifne    25
22:  goto    38
25:  iinc    2, 1
28:  goto    11
31:  getstatic       #84; // Field java/lang/System.out:Ljava/io/PrintStream;
34:  iload_1
35:  invokevirtual   #85; // Method java/io/PrintStream.println:(I)V
38:  iinc    1, 1
41:  goto    2
44:  return
```

- `getstatic` : 정적 필드값을 스택에 로드
- `invokevirtual` : 인스턴스 메소드 호출

### Hello World 10번 출력하는 예제

```java
public class HelloWorld {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("Hello, World!");
        }
    }
}
```

```java
public class com.livid.javaoptimizing.HelloWorld {
  public com.livid.javaoptimizing.HelloWorld();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: iconst_0
       1: istore_1
       2: iload_1
       3: bipush        10
       5: if_icmpge     22
       8: getstatic     #7                  // Field java/lang/System.out:Ljava/io/PrintStream;
      11: ldc           #13                 // String Hello World
      13: invokevirtual #15                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      16: iinc          1, 1
      19: goto          2
      22: return
}

```

- `aload_0` : this를 스택에 로드
- `invokespecial` : private 메소드, 생성자 호출
- `ldc` : 상수 풀에서 상수를 스택에 로드

## References

- [Naver D2 - JVM Internal](https://d2.naver.com/helloworld/1230)
- [스택 기반 VM과 레지스터 기반 VM](https://www.korecmblog.com/blog/jvm-stack-and-register)
- [Quora - What is difference between register machines & stack machines?](https://www.quora.com/What-is-difference-between-register-machines-stack-machines)
- [위키백과 - 자바 바이트코드](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%EB%B0%94%EC%9D%B4%ED%8A%B8%EC%BD%94%EB%93%9C)
