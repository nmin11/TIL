2021 / 06 / 28

# Array

한 번에 최소 100개 이상의 데이터를 사용할 때, 배열이나 객체를 사용한다면 단 한 번의 선언으로 해결할 수 있다. 대량의 데이터를 다루기에 적합하게 제작된 데이터 타입인 배열과 객체를 참조 타입(Reference Type) 데이터라고 한다.  
반복문 챕터에서 대량의 정도를 처리하는 법을 배웠다면 이번 챕터에서는 대량의 정보를 보관하고 관리하는 방법에 대해 배운다.

## Array 기초

- 배열은 순서가 있는 값
- 순서는 인덱스라고 부르며 0부터 번호를 매김
- 값은 인덱스를 이용해서 접근

</br>

## Array 메소드

### arr.length

배열의 길이를 리턴해준다.

### arr.push(value)

배열의 끝에 value 값을 추가해준다.

### arr.pop()

배열의 마지막 값을 삭제한다.

### Array.isArray(value)

value 값이 배열인지를 boolean 타입으로 리턴해준다.

### console.table(arr)

배열을 테이블 안에 시각화해서 출력해준다.

### arr.shift()

배열의 처음 값을 삭제한다.

### arr.unshift(value)

배열의 첫 인덱스에 value 값을 삽입한다.

### arr.indexOf(value)

배열의 인덱스 중 value 값을 갖는 인덱스를 리턴해준다. 배열에 value 값이 없을 경우 -1을 리턴한다.

### arr.includes(value)

배열이 value 값을 포함하고 있는지 여부를 리턴해준다.

### arr.join(separator)

배열의 모든 값을 합쳐서 문자열로 만든다. separator를 적지 않을 경우 자동으로 ","를 구분자로 사용하게 된다.

### arr.slice(begin, end)

배열의 인덱스 begin부터 인덱스 end의 이전까지(end 미포함)에 대한 복사본을 새로운 배열 객체로 반환한다. **이 때 원본 배열은 바뀌지 않는다.**  
slice(2)와 같이 index 하나를 지정하면 해당 인덱스부터 마지막까지 추출한다.  
slice(-2)와 같이 음수 하나를 지정하면 배열의 마지막 2개의 요소를 추출한다.  
slice(-3, 9) 혹은 slice(5, -4)의 경우 역순으로 매긴 인덱스와 순차적으로 매긴 인덱스 사이의 요소를 추출한다.

### arr.splice(start, deleteCount, item)

배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다. **이 메소드는 배열의 내용을 변경한다.**  
start는 배열의 변경을 시작할 인덱스를 지정한다. slice와 마찬가지로 음수를 지정할 경우 배열의 끝에서부터 역순으로 시작 위치를 정한다. 배열의 길이보다 큰 수를 입력하면 start는 배열의 길이로 설정된다. 만약 음수를 지정했는데 지정한 값의 절대값이 배열의 길이보다 큰 경우 0으로 설정된다.  
deleteCount는 배열에서 제거할 요소의 개수이다. 만약 삭제개수에 arr.length - start 보다 큰 수를 입력할 경우 start부터의 모든 요소를 제거하며, 0 이하의 수를 입력하면 어떤 요소도 제거되지 않는다.  
item은 배열에 추가할 요소이다. 삭제 작업 이후 start에서부터 값을 추가한다. 지정하지 않을 경우 splice()는 삭제 작업만 수행한다.  
var removedArr = arr.splice(10, 2, 'a', 'b', 'c')와 같이 반환값을 받는 객체가 있다면 해당 객체에는 삭제된 배열들이 담기게 된다.  
만약 spice(3)와 같이 인덱스 하나만을 지정한다면 해당 인덱스부터 끝까지 삭제한다.

</br>

## 피보나치 수열 문제 풀이

### 문제 : 수(num)를 입력받아 num번째까지 총 num + 1개의 수열을 리턴해야 한다.

### 확인사항

- 인자값은 number 타입의 정수 (num >= 0)
- for문을 사용해야 함
- 0부터 시작해야 함

구글링을 통해서 피보나치 수열에 대한 배열을 어떻게 얻는지 찾다보면 보통 1에서 시작하는 예시들을 많이 볼 수 있다. 하지만 이 부분에 대해서는 어렵게 생각할 필요가 없었다.

```javascript
if (num === 0) {
  return [0];
}
let result = [0, 1];
```

위와 같이 시작할 때부터 num에 0이 들어오는 조건은 따로 처리해주고 1이 들어오면 미리 선언해둔 변수를 리턴해도 되는 식으로 시작해도 되었던 것이다.  
그 다음으로 정작 중요한 피보나치 수열을 구하는 식을 적어야 되지만 문제에 대한 해답보다는 풀어가는 방식을 기록하는 것이 더 좋은 기록이기 때문에 내가 찾아낸 방식을 적겠다. ~~사실 조금만 검색해도 다 나온다.~~  
방법은 이렇다. 위 코드에서 num에 0과 1이 들어왔을 때에 대한 처리를 해주었기 때문에 i = 2부터 시작하는 반복문을 작성해서 위에 선언해둔 배열 변수에 이전 이전 값과 이전 값을 더한 값을 저장해주는 방식으로 배열을 완성해나가면 되는 것이다.

</br>
</br>

# Object

## 객체 기초

- 객체는 키와 값 쌍(key-value pair)으로 이루어져 있음

```javascript
let user = {
  firstName: "Steve",
  lastName: "Lee",
  email: "steve@codestates.com",
  city: "Seoul",
};
```

- 객체의 값을 사용하는 방법 1 : **Dot notation**

```javascript
user.name;
user.email;
```

- 객체의 값을 사용하는 방법 2 : **Bracket notation**  
  이 때 객체의 값을 key값에 지정된 문자열로 불러와야 한다.  
  이 방법은 key값이 지정되지 않았거나 변동될 때 사용하는 방법이다.

```javascript
user["name"];
user["email"];
```

```javascript
function getProperty(obj, property) {
  return obj[property];
}
```

- in 연산자를 이용해서 해당하는 key값이 있는지 확인 가능  
  for in 구문을 활용하면 객체의 모든 key에 접근하고 출력할 수 있음

```javascript
"content" in tweet;
```

```javascript
for (let key in obj) {
  console.log(key);
}
```
