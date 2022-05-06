## 문제 요약

정수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴하라.

</br>

## 추가 사항

- arr.length <= 1000
- **삽입 정렬**을 구현해야 함
- arr.sort 사용 금지
- 입력으로 주어진 배열은 중첩되지 않은 1차원 배열

</br>

## Advanced

- 두 번째 인자로 callback 함수를 받아서, 그 함수의 리턴값을 기준으로 요소들을 정렬해 보아라.

</br>

## 풀이

```javascript
const insertionSort = function (arr, cb) {
  if (cb !== undefined) {
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      let prev = i - 1;
      while (prev >= 0 && cb(arr[prev]) > cb(temp)) {
        arr[prev + 1] = arr[prev];
        prev--;
      }
      arr[prev + 1] = temp;
    }
    return arr;
  } else {
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      let prev = i - 1;
      while (prev >= 0 && arr[prev] > temp) {
        arr[prev + 1] = arr[prev];
        prev--;
      }
      arr[prev + 1] = temp;
    }
    return arr;
  }
};
```

</br>

## 작동 과정

콜백 함수는 undefined이고, 배열 [20, -10, -11, 2, 29]이 주어졌다고 가정해보자.

```javascript
for문 첫번째 순회
let temp = -10;
let prev = 0;

arr[1] = 20;
prev = -1;

arr[0] = -10;
arr = [-10, 20, -11, 2, 29]
```

```javascript
for문 2번째 순회
let temp = -11;
let prev = 1;

arr[2] = 20;
prev = 0;

arr[1] = -10;
prev = -1;

arr[0] = -11;
arr = [-11, -10, 20, 2, 29]
```

```javascript
for문 3번째 순회
let temp = 2;
let prev = 2;

arr[3] = 20;
prev = 1;

arr[prev] > temp 조건 미충족
arr[2] = 2;
arr = [-11, -10, 2, 20, 29]
```

```javascript
for문 4번째 순회
let temp = 29;
let prev = 3;

arr[prev] > temp 조건 미충족
arr[4] = 29;
arr = [-11, -10, 2, 20, 29]
```

</br>

※ [참고한 블로그 글](https://gyoogle.dev/blog/algorithm/Insertion%20Sort.html)
