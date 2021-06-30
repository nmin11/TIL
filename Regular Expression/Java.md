2021 / 06 / 30

# 정규 표현식 - Java

Java에서 정규 표현식을 사용할 때는 java.util.regex 패키지를 사용해야 한다.  
java.util.regex 패키지 안에 있는 Pattern 클래스와 Matcher 클래스를 주로 사용한다.

</br>

## Pattern 클래스

Pattern 클래스의 matched() 메소드를 활용하면 문자열이 정규 표현식과 일치한지 검증할 수 있다.  
matches() 메소드에 첫번째 매개값에 정규표현식을, 두번째 매개값에 검증 대상 문자열을 넣어주면 된다.

```java
import java.util.regex.Pattern;

public class RegexPatternExample {
    public static void main(String[] args) {
        boolean isRegex = Pattern.matches("^[0-9]*$", "123456789");
        System.out.println(isRegex);
    }
}
```

</br>

## Matcher 클래스

Matcher 클래스는 대상 문자열의 패턴을 해석하고 주어진 패턴과 일치하는지 판별할 때 사용한다.  
Matcher 객체는 Pattern 객체의 matcher() 메소드를 호출하여 받아올 수 있다.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatcherExample {
	public static void main(String[] args)  {
        Pattern pattern = Pattern.compile("^[a-zA-Z]*$");
        String val = "abcdef";

        Matcher matcher = pattern.matcher(val);
        System.out.println(matcher.find());
	}
}
```

## 주로 사용하는 정규 표현식 문법

| 정규 표현식 | 설명 |
| :--: | :--------- |
| ^ | 문자열 시작 |
| $ | 문자열 끝 |
| . | 임의의 한 문자(\는 불가) |
| * | 앞 표현식 0회 이상 일치 |
| + | 앞 표현식 1회 이상 일치 |
| ? | 앞 표현식 0회 또는 1회 일치 |
| [] | 안의 문자 또는 문자집합을 정규 표현식으로, 문자집합은 -기호로 범위를 지정 |
| {} | 횟수 또는 범위 |
| () | 안의 문자를 하나의 문자로 인식 |
| \ | 정규표현식 \는 확장문자, \ 뒤에 특수문자가 오면 그 특수문자 자체를 의미 |
| \d | [0-9]와 동일 |
| \D | 숫자가 아닌 모든 문자와 일치 |
| \w | 알파벳이나 숫자 |
| \W | 알파벳이나 숫자를 제외한 문자 |
| \s | 공백 문자 |
| \S | 공백 문자가 아닌 나머지 문자 |
| \n | 줄바꿈과 일치 |
| \t | 탭과 일치 |
| (?i) | 앞 부분에 붙이면 대소문자를 구분하지 않음 |

</br>

## 자주 사용하는 정규 표현식

| 활용도 | 정규 표현식 |
| :----: | :----: |
| 숫자 | ^[0-9]*$ |
| 영문자 | ^[a-zA-Z]*$ |
| 한글 | ^[가-힣]*$ |
| 전화번호 | ^\d{2,3}-\d{3,4}-\d{4}$ |
| 주민등록번호 | \d{6} \- [1-4]\d{6} |

</br>

## 정규 표현식에 맞게 문자열 바꾸기

```java
str = str.replaceAll("[^a-zA-Z0-9]", "")
// 영문자와 숫자만 남긴다.
str = str.replaceAll("[.]{2,}", "")
// .이 두 번 이상 반복되면 지운다.
```
