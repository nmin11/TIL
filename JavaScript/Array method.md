## arr.sort

배열의 요소를 정렬한 후 그 배열을 반환한다.  
이 때, **원 배열이 정렬되며, 복사본이 만들어지지는 것은 아니다.**  
배열 안의 요소들이 string 타입이면 알파벳 순으로 정렬하기 때문에 대부분의 경우 원하는 결과를 얻을 수 있다.  
하지만 배열 안의 요소들이 number 타입일 경우 sort 메소드는 요소들을 문자열의 유니코드에 따라 정렬한다.  
따라서 배열의 요소들이 숫자이며, 자릿수가 2자리 이상이라면 아래와 같은 방법으로 따로 처리해주어야만 한다.

```javascript
arr.sort(function (a, b) {
  return a - b;
});
```

위와 같이 숫자들로 이루어진 배열에 sort 메소드를 사용할 때 간단한 함수를 지정해주면 숫자들이 오름차순으로 정렬되는 것을 확인할 수 있다.  
이처럼 sort 메소드 안에 지정된 함수를 **compareFunction**이라 부른다.  
compareFunction(a, b)은 함수의 반환값이 0보다 작은 경우 a를 b보다 낮은 색인으로 정렬한다.  
반대로 0보다 큰 경우에는 b를 a보다 낮은 인덱스로 sort한다.  
그리고 0을 반환하면 서로에 대한 변경이 일어나지 않는다.

</br>

배열 안의 요소들이 객체일 때에도 sort 메소드 안에 함수를 지정해주는 방식으로 정렬해줄 수 있다.

```javascript
var items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

// value 기준으로 정렬
items.sort(function (a, b) {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

// name 기준으로 정렬
items.sort(function (a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // 이름이 같을 경우
  return 0;
});
```

</br>

### 비 ASCII 문자 정렬

악센트 부호가 있는 문자(e, é, è, a, ä 등)가 있는 문자열을 정렬하려면 String.localeCompare를 사용해야 한다.

```javascript
var items = ["réservé", "premier", "cliché", "communiqué", "café", "adieu"];
items.sort(function (a, b) {
  return a.localeCompare(b);
});

// items is ['adieu', 'café', 'cliché', 'communiqué', 'premier', 'réservé']
```
