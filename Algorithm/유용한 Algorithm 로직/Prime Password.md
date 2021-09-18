## 문제 요약

curPwd를 newPwd로 바꾸려고 하는 데, 최소 동작의 수를 리턴하라.

- 한 번에 한 개의 숫자만 변경 가능
- 4자리 소수인 비밀번호로만 변경 가능

정리하자면, 비밀번호가 계속 소수를 유지하도록 숫자 한 개씩 변경할 때 최소 몇개의 숫자를 변경해야 하는지를 리턴해야 한다.

</br>

## 추가 사항

- curPwd, newPwd는 모두 1,000 이상 9,999 이하의 네 자리 자연수
- 맨 앞에 0이 붙은 숫자로도 변경할 수 없음

</br>

## 풀이 (JavaScript)

```javascript
const primePassword = (curPwd, newPwd) => {
  if (curPwd === newPwd) return 0;

  let start = 0;
  let end = 0;
  const queue = [];
  const isEmpty = (queue) => start === end;

  const enQueue = (queue, item) => {
    queue.push(item);
    end++;
  };

  const deQueue = (queue) => {
    return queue[start++];
  };

  const isVisited = Array(10000).fill(false);
  isVisited[curPwd] = true;

  enQueue(queue, [0, curPwd]);

  while (isEmpty(queue) === false) {
    const [step, num] = deQueue(queue);

    for (let i = 0; i < 4; i++) {
      const digits = splitNum(num);
      for (let d = 0; d < 10; d++) {
        if (d !== digits[i]) {
          digits[i] = d;
          const next = joinDigits(digits);
          if (next === newPwd) return step + 1;
          if (next > 1000 && isPrime(next) && isVisited[next] === false) {
            isVisited[next] = true;
            enQueue(queue, [step + 1, next]);
          }
        }
      }
    }
  }

  return -1;
};

const isPrime = (num) => {
  if (num % 2 === 0) return false;
  let sqrt = parseInt(Math.sqrt(num));
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const splitNum = (num) => {
  const digits = num.toString().split("");
  return digits.map((el) => Number(el));
};

const joinDigits = (digits) => Number(digits.join(""));
```
