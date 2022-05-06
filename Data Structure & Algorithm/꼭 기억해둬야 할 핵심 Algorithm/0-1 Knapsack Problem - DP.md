## Problem

n개의 아이템의 무게와 가치가 주어지고, 이 아이템들을 `W` 만큼의 용량을 가진 가방에 넣을 수 있는 최대치로 넣고자 한다.  
좀 더 프로그래밍적으로 얘기하자면, 두 정수 배열 `val[0, .. , n-1]`와 `wt[0, .. , n-1]`는 각각 아이템의 가치와 무게를 나타내고, 주어진 정수 `W`는 가방의 용량을 나타낸다.  
여기에서 부분집합의 총 무게가 `W` 보다 작거나 같은, `val[]`의 최대 부분 집합을 구하라.  
아이템을 부술 수 없으며, 또한 하나의 온전한 아이템을 취하거나 취하지 않아야만 한다. **(0-1 property)**

</br>

## Example

![knapsack-problem](https://user-images.githubusercontent.com/75058239/134356295-c783b559-5d36-46e3-8e92-72ddbe04561f.png)

</br>

## Recursion OR Exhaustive Search Solution

### Approach

간단한 해결책은 아이템들의 모든 부분집합의 무게와 가치를 확인하는 것이다.  
오직 `W` 보다 작은 무게를 갖는 부분집합들만 확인한다.  
그러한 부분집합들 중, 가장 높은 가치를 가진 부분집합을 뽑아낸다.

</br>

### Optimal Sub-structure

아이템의 부분집합들을 전부 확인하기 위해서, 모든 아이템을 2가지 케이스로 나눈다.

- Case 1 : 아이템이 최적의 부분집합을 포함한다.
- Case 2 : 아이템이 최적의 부분집합을 포함하지 않는다.

그러므로, 'n' 아이템들에게서 얻을 수 있는 최대값은 다음 두 값들의 최대값이라고도 할 수 있다.

1. n-1 아이템과 W 무게로 얻은 최대값 **(n번째 아이템 제외)**
2. (n번째 아이템의 가치) + (n-1 아이템과 W 무게로 얻은 최대값) - (n번째 아이템의 무게) **(n번째 아이템 포함)**

만약 n번째 아이템이 W보다 크다면, n번째 아이템은 포함되어질 수 없으며, **Case 1**만이 유일한 선택안이 된다.

</br>

### Java 코드 구현

```java
class Kanpsack {
    static int max(int a, int b) {
        return (a > b) ? a : b;
    }

    static int knapSack(int W, int[] wt, int[] val, int n) {
        if (n == 0 || W == 0) return 0;

        if (wt[n - 1] > W) {
            return knapSack(W, wt, val, n - 1);
        } else {
            return max(val[n - 1] + knapSack(W - wt[n - 1], wt, val, n - 1),
            knapSack(W, wt, val, n - 1));
        }
    }

    public static void main(String[] args) {
        int[] val = new int[] {60, 100, 120};
        int[] wt = new int[] {10, 20, 30};
        int W = 50;
        int n = val.length;
        System.out.println(knapSack(W, wt, val, n));
    }
}
```

### Output

```
220
```

</br>

### Need to know

위에서 구현한 함수는 겹치는 하위 문제들을 반복해서 연산한다는 점을 명심해야 한다.  
이러한 문제점을 그림으로 표현하면 다음과 같다.

```java
K() refers to knapSack().
The recursion tree is for following sample inputs.
wt[] = {1, 1, 1}, W = 2, val[] = {10, 20, 30}
                       K(n, W)
                       K(3, 2)
                   /            \
                 /                \
            K(2, 2)                  K(2, 1)
          /       \                  /    \
        /           \              /        \
       K(1, 2)      K(1, 1)        K(1, 1)     K(1, 0)
       /  \         /   \              /        \
     /      \     /       \          /            \
K(0, 2)  K(0, 1)  K(0, 1)  K(0, 0)  K(0, 1)   K(0, 0)

Recursion tree for Knapsack capacity 2
units and 3 items of 1 unit weight.
```

</br>

### Complexity Analysis

- Time Complexity : O(2ⁿ)
- Auxiliary Space : O(1)

</br>

## Dynamic Programming Solution

0-1 Knapsack Problem은 DP의 2가지 특성(Overlapping Subproblems Property, Optimal Substructure Property)을 가진다.  
따라서 임시 배열을 활용해서 중복 연산 문제를 피할 수 있다.

### Approach

임시 배열을 통해, 1부터 W에 이르는 모든 가능한 무게들을 저장해둔다.  
이후 DP[i][j]의 값을 꺼내온다면 이는 1부터 i까지의 모든 가치들을 고려한 'j-weight'의 최대값을 표시하게끔 해주는 것이다.  
따라서 만약 'wi'(weight in ‘ith’ row)를 계산하면 `무게 값 > wi`인 모든 열들을 채울 수 있다.  
이제 2가지 경우의 수가 있다.

- 주어진 열에 'wi' 채우기
- 주어진 열이 'wi' 채우지 않기

이제 2가지 가능성 중 최대값을 취해야 한다.  
보통의 경우 j번째 열의 i번째 무게를 채우지 않는다면, DP[i][j]는 DP[i-1][j]와 같아질 것이다.  
하지만 그 무게를 채운다면, DP[i][j]는 `'wi' + 이전 행의 'j-wi'`와 같아진다.  
그래서 이 둘 중 최대값을 현재 상태에 저장해야만 한다.  
이를 쉽게 표현하면 다음과 같다.

```java
Let weight elements = {1, 2, 3}
Let weight values = {10, 15, 40}
Capacity=6

0   1   2   3   4   5   6

0  0   0   0   0   0   0   0

1  0  10  10  10  10  10  10

2  0  10  15  25  25  25  25

3  0

Explanation:
For filling 'weight = 2' we come
across 'j = 3' in which
we take maximum of
(10, 15 + DP[1][3-2]) = 25
  |        |
'2'       '2 filled'
not filled

0   1   2   3   4   5   6

0  0   0   0   0   0   0   0

1  0  10  10  10  10  10  10

2  0  10  15  25  25  25  25

3  0  10  15  40  50  55  65

Explanation:
For filling 'weight=3',
we come across 'j=4' in which
we take maximum of (25, 40 + DP[2][4-3])
= 50

For filling 'weight=3'
we come across 'j=5' in which
we take maximum of (25, 40 + DP[2][5-3])
= 55

For filling 'weight=3'
we come across 'j=6' in which
we take maximum of (25, 40 + DP[2][6-3])
= 65
```

</br>

### Java 코드 구현

```java
class Knapsack {
    static int max(int a, int b) {
        return (a > b) ? a : b;
    }

    static int knapSack(int W, int[] wt, int[] val, int n) {
        int i, w;
        int K[][] = new int[n + 1][W + 1];

        for (i = 0; i <= n; i++) {
            for (w = 0; w <= W; w++) {
                if (i == 0 || w == 0) {
                    K[i][w] = 0;
                } else if (wt[i - 1] <= w) {
                    K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]],
                    K[i - 1][w])
                } else {
                    K[i][w] = K[i - 1][w];
                }
            }
        }

        return K[n][W];
    }

    public static void main(String[] args) {
        int[] val = new int[] {60, 100, 120};
        int[] wt = new int[] {10, 20, 30};
        int W = 50;
        int n = val.length;
        System.out.println(knapSack(W, wt, val, n));
    }
}
```

### Output

```
220
```

</br>

### Complexity Analysis

N → 아이템 개수, W → 총 용량

- Time Comlexity : O(N \* W), 아이템의 모든 무게 w마다 1<=w<=W의 모든 용량들 탐색
- Auxiliary Space : O(N \* W), N \* W의 이중 배열 사용

</br>

## Memoization Solution

이 방법은 재귀 방식의 확장이며, 재귀 방식의 중복 연산 문제를 극복하는 방법이다.  
이중 배열에 값을 저장하여 중복되는 연산을 피하고, 복잡성을 완화한다.

```java
class GFG {
    static int max(int a, int b) {
        return (a > b) ? a : b;
    }

    static int knapSackRec(int W, int[] wt, int[] val, int n, int[][] dp) {
        if (n == 0 || W == 0) return 0;
        if (dp[n][W] != -1) return dp[n][W];

        if (wt[n - 1] > W) {
            return dp[n][W] = knapSackRec(W, wt, val, n - 1, dp);
        } else {
            return dp[n][W] =
            max((val[n - 1] + knapSackRec(W - wt[n - 1], wt, val, n - 1, dp)),
            knapSackRec(W, wt, val, n - 1, dp));
        }
    }

    static int knapSack(int W, int[] wt, int[] val, int N) {
        int dp[][] = new int[N + 1][W + 1];

        for (int i = 0; i < N + 1; i++) {
            for (int j = 0; j < W + 1; j++) {
                dp[i][j] = -1;
            }
        }

        return knapSackRec(W, wt, val, N, dp);
    }

    public static void main(String[] args) {
        int[] val = {60, 100, 120};
        int[] wt = {10, 20, 30};
        int W = 50;
        int N = val.length;

        System.out.println(knapSack(W, wt, val, N));
    }
}
```

### Output

```
220
```

### Complexity Analysis

- Time Comlexity : O(N \* W)
- Auxiliary Space : O(N \* W)

</br>

## Reference

- [GeeksforGeeks - 0-1 Knapsack Problem | DP-10](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/)
