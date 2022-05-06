## Problem

주어진 `N`이라는 값이 있다.  
우리의 목적은 N cents에 대한 잔돈을 만드는 것이며, 우리는 각각 `S={S1, S2, .. , Sm}` 만큼의 가치를 가지는 동전들을 무한대로 공급할 수 있다.  
**잔돈을 만들기 위한 경우의 수는 몇인가?**  
여기서 동전들의 순서는 따지지 않기로 한다.

</br>

## Example

### 1) N = 4 and S = {1, 2, 3}

이 경우 4가지 해결책이 있다.

```java
{1,1,1,1}, {1,1,2}, {2,2}, {1,3}
```

### 2) N = 10 and S = {2, 5, 3, 6}

이 경우 5가지 해결책이 있다.

```java
{2,2,2,2,2}, {2,2,3,3}, {2,2,6}, {2,3,5}, {5,5}
```

</br>

## Recursive Solution

```javascript
function count(S, m, n) {
  if (n == 0) return 1;
  if (n < 0) return 0;
  if (m <= 0 && n >= 1) return 0;

  return count(S, m - 1, n) + count(S, m, n - S[m - 1]);
}

let arr = [1, 2, 3];
let m = arr.length;
console.log(count(arr, m, 4));
```

### Optimal Substructure Property

경우의 수를 구하기 위해, 문제를 2가지 set로 나눠서 생각해볼 수 있다.

1. m번째 코인(Sm)이 포함되지 않은 해결책
2. m번째 코인(Sm)을 반드시 포함하는 해결책

`count(S[], m, n)`이라는 함수를 통해서 경우의 수를 구한다고 했을 때, `count(S[], m-1, n)`와 `count(S[], m, n-Sm)`로 문제를 나눠서 해결하겠다는 전략이다.  
그러므로 이 해결책은 Dynamic Programming에서, 하나의 문제를 하위 문제들로 나누어서 각각 풀어나가는 **Optimal Substructure Property** 특성을 따른다고 할 수 있다.

</br>

### Overlapping Subproblems Property

`S = {1,2,3}` 및 `n = 5`인 다음의 경우를 살펴보자.

```java
C() --> count()
                             C({1,2,3}, 5)
                           /             \
                         /                 \
             C({1,2,3}, 2)                 C({1,2}, 5)
            /       \                      /      \
           /         \                    /         \
C({1,2,3}, -1)  C({1,2}, 2)        C({1,2}, 3)    C({1}, 5)
               /    \             /     \           /     \
             /       \           /       \         /        \
    C({1,2},0)  C({1},2)   C({1,2},1) C({1},3)    C({1}, 4)  C({}, 5)
                   / \     / \        /\         /     \
                  /   \   /   \     /   \       /       \
                .      .  .     .   .     .   C({1}, 3) C({}, 4)
                                               / \
                                              /   \
                                             .      .
```

`C({1},3)`는 2번 호출 되었음을 확인할 수 있다.  
위 모식도에서는 생략된 전체 트리를 그려본다면 2번 이상 호출되는 하위 문제들이 더 많을 것이다.  
따라서 이 풀이 방식은 Dynamic Programming에서, **Overlapping Subproblems Property** 특성을 따른다고 할 수 있다.

</br>

## Dynamic Programming Solution

일반적인 DP 문제들과 마찬가지로, 이 문제 또한 임시 배열을 활용해서 하위 문제의 재계산 문제를 피할 수 있다.

```javascript
function count(S, m, n) {
  let table = Array(n + 1).fill(0);
  table[0] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = S[i]; j <= n; j++) {
      table[j] += table[j - S[i]];
    }
  }

  return table[n];
}

let arr = [1, 2, 3];
let m = arr.length;
let n = 4;
console.log(count(arr, m, n));
```

### Big-O

- Time Complexity : O(mn)
- Space Complexity : O(n)

</br>

## Java 코드

```java
public static int count(int S[], int m, int n) {
    int[] table = new int[n+1];
    table[0] = 1;

    for (int i = 0; i < m; i++) {
        for (int j = S[i]; j <= n; j++) {
            table[j] += table[j - S[i]];
        }
    }

    return table[n];
}
```

</br>

## Reference

- [GeeksforGeeks - Coin Change | DP-7](https://www.geeksforgeeks.org/coin-change-dp-7/)
