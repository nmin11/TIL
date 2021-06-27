2021 / 06 / 16

# 문자열

## +연산자 사용 가능

string 타입과 다른 타입 사이에 +연산자를 쓰면 string 형식으로 변환됨  
※ concat을 활용해서 문자열을 합칠 수도 있음

```javascript
str1.concat(str2, str3);
```

</br>

## 관련 메소드들

```javascript
str.length;
```

- 문자열의 전체 길이를 반환

```javascript
str.indexOf(searchValue);
str.lastIndexOf(searchValue);
str.includes(searchValue);
```

- searchValue가 str의 몇 번째 index에 있는지를 반환
- lastIndexOf를 통해서 마지막부터 반대로 셀 수도 있음
- includes는 index가 아닌 boolean 타입을 반환

```javascript
str.split(seperator);
var items = "Loko, Min, Apple";
console.log(items.split(", "));
// ['Loko', 'Min', 'Apple']
```

- seperator에 분리 기준이 될 문자열을 넣어서 분리된 문자열들의 배열을 반환
- split('\n')을 활용해서 줄바꿈 단위로 문자열을 분리할 수도 있다.

```javascript
str.substring(start, end);
```

- start와 end index 사이의 문자열을 반환

```javascript
str.toLowerCase();
str.toUpperCase();
```

- 각각 소문자, 대문자로 변환해서 반환
