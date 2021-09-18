## 사용 의도

하나의 집합을 의미하는 문자열을 입력받아 각 문자를 가지고 만들 수 있는 모든 부분집합을 만들 때 사용한다.

</br>

## 입출력 예시

```javascript
let output1 = powerSet("abc");
console.log(output1);
// ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']
```

</br>

## JavaScript 구현

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

</br>

## CodeStates의 Reference

```javascript
const powerSet = function (str) {
  // 정렬
  const sorted = str.split("").sort();

  // 중복 제거
  const deduplicated = sorted.reduce((acc, item) => {
    if (acc[acc.length - 1] === item) {
      return acc;
    } else {
      return acc.concat(item);
    }
  });

  let subSets = [];
  const pickOrNot = (idx, subset) => {
    // base case
    if (idx === deduplicated.length) {
      // 마지막 문자까지 검토한 경우
      subSets.push(subset);
      return;
    }

    // recursive case
    // idx번째 문자가 포함되지 않는 경우
    pickOrNot(idx + 1, subset);

    // idx번째 문자가 포함되는 경우
    pickOrNot(idx + 1, subset + deduplicated[idx]);
  };

  pickOrNot(0, "");

  return subSets.sort();
};
```
