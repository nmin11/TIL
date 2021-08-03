## 문제 요약

'하나의 집합'을 의미하는 문자열을 입력받아 각 문자를 가지고 만들 수 있는 모든 부분집합을 리턴하라.

</br>

## 추가 사항

- 인자는 string 타입의 공백이 없는 알파벳 소문자 문자열
- 배열을 리턴할 것
- arr[i]는 각 부분집합의 원소로 구성된 문자열
- arr[i]는 알파벳 순서로 정렬
- 중복된 원소를 허용하지 않음
- 빈 문자열을 포함할 것
- arr은 lexical order(사전식 순서)에 따라 정렬

</br>

## 풀이

```javascript
const powerSet = function (str) {
  let set = Array.from(new Set(str));
  let sortedStr = set.sort().join("");
  let result = [];

  function recursion(string, begin) {
    result.push(string);
    for (let i = begin; i < sortedStr.length; i++) {
      recursion(string + sortedStr[i], i + 1);
    }
  }

  recursion("", 0);
  return result;
};
```

1. **Array.from(new Set(str))** → 문자열의 중복을 제거하면서 배열로 변환
2. 변환한 배열을 정렬한 뒤, 다시 문자열로 합침
3. 재귀함수를 돌리면서 문자열의 부분집합들을 배열에 push한다.

</br>

### 재귀함수의 작동 과정

재귀함수가 아직도 익숙하지 않은지, 이해가 잘 되지 않았다.  
그래서 위 재귀함수의 작동 과정을 하나하나 쪼개 보았다.

</br>

문자열 "abc"가 주어졌을 때, 재귀함수는 다음과 같이 작동한다.

```javascript
recursion("", 0);
result = [""];
for문을 통해서 recursion("a", 1) / recursion("b", 2) / recursion("c", 3) 순차적으로 실행
```

```javascript
1. recursion("a", 1)
result = ["", "a"];
for문을 통해서 recursion("ab", 2) / recursion("ac", 3) 순차적으로 실행
```

```javascript
1-1. recursion("ab", 2)
result = ["", "a", "ab"];
for문을 통해서 recursion("abc", 3) 실행
```

```javascript
1-1-1. recursion("abc", 3)
result = ["", "a", "ab", "abc"];
for문의 조건을 만족하지 못함
```

```javascript
1-2. recursion("ac", 3)
result = ["", "a", "ab", "abc", "ac"];
for문의 조건을 만족하지 못함
```

```javascript
2. recursion("b", 2)
result = ["", "a", "ab", "abc", "ac", "b"];
for문을 통해서 recursion("bc", 3) 실행
```

```javascript
2-1. recursion("bc", 3)
result = ["", "a", "ab", "abc", "ac", "b", "bc"];
for문의 조건을 만족하지 못함
```

```javascript
2-1. recursion("c", 3)
result = ["", "a", "ab", "abc", "ac", "b", "bc", "c"];
for문의 조건을 만족하지 못함
```

</br>

## 소감

아직도 난 프로그래밍적 사고 방식에 익숙하지 않은 것 같다.  
이렇게 간단명료한 풀이조차도 이해하는 데에 시간이 걸리니 말이다.  
가장 중요한 관건은 이렇게 이해하는 데에 그치지 않고, 계속해서 연관된 문제를 풀어보는 데에 있다.  
재귀 관련 문제들을 더 많이 접해보고 더 적극적으로 풀어보자.

</br>

※ [참고한 블로그 글](https://foamless.tistory.com/724)
