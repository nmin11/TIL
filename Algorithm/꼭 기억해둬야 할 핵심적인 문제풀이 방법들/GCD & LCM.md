## 구현 방법

최대공약수는 유클리드 호제법을 이용해서 구할 수 있으며, 최소공배수는 두 수의 곱을 최대공약수로 나누어서 구할 수 있다.

</br>

## 유클리드 호제법

1. a, b를 서로 나눈다.  
   만약 나누어진다면 b가 최대 공약수이다. (a > b)
2. 만약 나누어지지 않는다면 b와 a % b로 다시 나눈다.
3. 서로가 나누어진다면 a % b가 최대공약수이다.
4. 만약 나누어지지 않는다면 위 방법들을 반복한다.

</br>

## GCD, LCM 구현

```javascript
const greatestCommonDivisor = (a, b) => {
  if (b === 0) return a;
  return greatestCommonDivisor;
};
const leastCommonMultiple = (a, b) => (a * b) / greatestCommonDivisor(a, b);
```
