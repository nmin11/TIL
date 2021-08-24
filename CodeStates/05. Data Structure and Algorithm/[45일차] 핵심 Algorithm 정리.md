2021 / 08 / 24

# Intro to Algorithm

Algorithm은 **'문제를 어떤 식으로 푸는 것이 최선인가'** 로 정의될 수 있다.

</br>

## Time Complexity

Algorithm 문제들을 풀 때는 문제에 대한 해답을 찾는 것도 중요하지만 '더 효율적인 방법은 없을까?'에 대한 고민도 중요하다.  
효율적인 방법을 고민한다는 것은 시간 복잡도를 고민한다는 것과 같다.  
그리고 시간 복잡도를 고려한다는 것은 한 문장으로 정리하자면 다음과 같다.

> 입력값의 증가 및 감소에 따라 시간이 얼마만큼 비례하여 증가 및 감소하는가?

</br>

### Big-O 표기법

</br>

![Big-O Complexity Chart](https://user-images.githubusercontent.com/75058239/130593522-108a0a7b-6a10-4305-acb2-7f7ffd316c7c.png)

</br>

시간 복잡도를 표기하는 방법 중에는 다음과 같은 방법들이 있다.

- Big-O
- Big-Ω
- Big-θ

위 표기법들은 각각 최악, 최선, 평균의 경우 입력값의 증가에 따라 시간 복잡도가 얼마나 증가하는지 표기하는 방법들이다.  
이 중에서 가장 흔하게 사용되는 것이 최악의 경우를 산정하는 Big-O 표기법이다.  
Big-O 표기법을 활용해서 최선의 경우보다 최악의 경우를 고려하며 대비하는 것이 바람직하다.

</br>

#### O(1)

O(1)는 constant complexity라고 부르며, 입력값이 증가해도 시간은 늘어나지 않음을 의미한다.  
대표적인 예시는 다음과 같다.

```javascript
function O_1_algorithm(arr, index) {
  return arr[index];
}

let arr = [1, 2, 3, 4, 5];
let index = 1;
let result = O_1_algorithm(arr, index);
console.log(result); // 2
```

이 때 검색하는 배열의 길이가 100만이 되더라도 즉시 해당 index에 접근해서 값을 반환할 수 있다.

</br>

#### O(n)

O(n)는 linear complexity라고 부르며, 입력값이 증가함에 따라 시간도 같은 비율로 증가하는 것을 의미한다.  
대표적인 예시는 다음과 같다.

```javascript
function O_n_algorithm(n) {
  for (let i = 0; i < n; i++) {
    // do something for 1 second
  }
}

function another_O_n_algorithm(n) {
  for (let i = 0; i < 2n; i++) {
    // do something for 1 second
  }
}
```

여기서 반복문을 2n만큼 돌리는 경우, O(2n)의 시간 복잡도를 가진다고 생각할 수 있으나, 그렇지 않고 O(n)으로 표기한다.  
입력값이 커질수록 n 앞에 있는 수는 의미가 없어지기 때문에 같은 비율로 증가하고 있다면 O(n)으로 표기한다.

</br>

#### O(log n)

O(log n)는 logarithmic complexity라고 부르며 Big-O 표기법 중 O(1) 다음으로 빠른 시간 복잡도를 가진다.  
Binary Search Tree는 O(log n)의 대표적인 예시라고 할 수 있다.  
BST에서는 원하는 값을 탐색할 때, 노드를 이동할 때마다 경우의 수가 절반씩 줄어드므로 이러한 시간 복잡도를 가진다고 할 수 있다.

</br>

#### O(n²)

O(n²)는 quadratic complexity라고 부르며, 입력값이 증가함에 따라 시간이 그 제곱수의 비율로 증가하는 것을 의미한다.  
대표적인 예시는 다음과 같다.

```javascript
function O_quadratic_algorithm(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // do something for 1 second
    }
  }
}

function another_O_quadratic_algorithm(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        // do something for 1 second
      }
    }
  }
}
```

2n이나 5n을 모두 O(n)이라고 표기했던 것과 같이, n³이나 n⁵ 또한 O(n²)으로 표기한다.

</br>

#### O(2ⁿ)

O(2ⁿ)는 exponential complexity라고 부르며, Big-O 표기법 중 가장 느린 시간 복잡도를 가진다.  
종이를 42번 접으면 그 두께가 지구에서 달까지의 거리보다 커진다는 말처럼, 시간 복잡도가 상당히 늘어나게 된다.  
만약 구현한 Algorithm의 시간 복잡도가 O(2ⁿ)라면 다른 접근 방식을 고민해보는 것이 좋다.  
대표적인 예시는 다음과 같다.

```javascript
function fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

재귀로 구현한 피보나치 수열이 대표적인 O(2ⁿ) 시간 복잡도에 해당한다.

</br>

## Greedy Algorithm

Greedy Algorithm은 결정의 순간마다 당장 눈앞에 보이는 최적의 상황만을 탐욕적으로 쫓아 최종적인 해답에 도달하는 방법이다.  
Greedy Algorithm의 문제 해결법을 단계적으로 나누어보면 다음과 같다.

1. Selection Procedure (선택 절차) : 현재 상태에서 최적의 해답 선택
2. Feasibility Check (적절성 검사) : 선택된 해답이 문제의 조건을 만족하는지 검사
3. Solution Check (해답 검사) : 원래의 문제가 해결되었는지 검사하고, 그렇지 않다면 1번으로 돌아가 과정을 반복

예제를 통해서 확인해보자.

> 시장 최나무는 도시 내의 모든 동을 연결하는 새로운 도로의 건설을 계획하고 있습니다.  
> 각 동과 동을 연결하는 도로 건설 비용은 아래와 같으며, 예산의 한계 때문에 최소의 비용으로 건설하려 합니다.  
> 최나무는 어떻게 도로 설계를 해야 할까요?
> 단, 세 개 이상의 동을 순환(cycle)하는 도로는 건설하지 않습니다.

</br>

![시장 최나무의 도로 연결](https://user-images.githubusercontent.com/75058239/130593571-d2def4e0-c31e-4e1c-8d86-61cb1b5c88db.png)

</br>

이 문제에 Greedy Algorithm을 적용하면 다음과 같다.

1. 선택 절차 : 건설 비용이 저렴한 도로부터 선택.  
   최소 비용을 구해야 하니 선택 전에 비용 순으로 오름차순 목록을 만들고 시작.
2. 적절성 검사 : 순환 여부를 검사.  
   순환한다면 가장 마지막에 선택된 도로 삭제 및 1번으로 돌아가 직전 선택보다 한 단계 비싼 도로를 선택.
3. 해답 검사 : 선택된 도로들이 모든 동을 연결하는지 검사.  
   연결되지 않은 동이 있다면 1번 과정부터 다시 반복.

</br>

일련의 과정을 확인해보면 다음과 같다.

</br>

<details>
<summary>도로 건설 최적화 과정 확인하기</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/75058239/130593593-5b88c4c9-317b-4144-82d8-3da853757407.gif"/>
</details>

</br>

이 문제는 사실 Minimum Spanning Trees(최소비용 신장 트리)를 구현한 문제였고, 풀이는 Kruskal Algorithm을 이용한 것이다.  
이처럼 Greedy Algorithm은 기준에 따라 좋은 것을 선택하는 Algorithm이므로 그래프나 정렬, Dijkstra Algorithm 등 폭넓은 영역에서 사용된다.

- 최소비용 신장 트리 : 그래프 내의 모든 정점을 최소 비용으로 연결하는 트리

</br>

Greedy Algorithm은 문제를 해결하는 과정에서 그 순간순간마다 최적이라 생각되는 해답(locally optimal solution)을 찾으며, 이를 토대로 최종 문제의 해답(globally optimal solution)에 도달하는 문제 해결 방식이다.  
하지만 이는 항상 최적의 결과를 보장하지는 못한다.  
Greedy Algorithm을 사용하려면 2가지 조건을 성립하여야 잘 작동한다.

- Greedy Choice Property (탐욕적 선택 속성) : 앞의 선택이 이후의 선택에 영향을 미치지 않음
- Optimal Substructure (최적 부분 구조) : 문제에 대한 최종 해결 방법은 부분 문제에 대한 최적 문제 해결 방법으로 구성됨

항상 최적의 결과를 도출하는 것은 아니지만 어느 정도 최적 Solution에 근사한 값을 도출해낼 수 있기 때문에 근사 Algorithm으로 사용 가능하다.

</br>

## Dynamic Programming

Greedy Algorithm과 늘 함께 언급되는 Algorithm으로 Dynamic Programming(동적 계획법)이 있다.  
줄여서 DP라고 부르기도 한다.  
Greedy Algorithm이 순간의 최적을 찾는 방식이라면, Dynamic Programming은 모든 경우의 수를 따져본 후 이를 조합해 최적의 해법을 찾는 방식이다.  
원리는 간단하다.  
주어진 문제를 여러 개의 하위 문제로 나누어 풀고, 하위 문제들의 해결 방법을 결합하여 최종 문제를 해결하는 문제 해결 방식이다.  
하위 문제를 계산한 뒤 그 해결책을 저장하여, 후에 같은 하위 문제가 나왔을 때 저장된 해결책을 이용하여 계산 횟수를 줄이는 방법이다.  
즉, 하나의 문제는 한 번만 풀도록 하는 Algorithm이 바로 Dynamic Programming이다.

</br>

이 Algorithm은 다음 2가지 가정이 만족하는 조건에서 사용할 수 있다.

- Overlapping Sub-problems : 큰 문제를 작은 문제로 나눌 수 있고, 이 작은 문제들은 중복됨.
- Optimal Substructure : 작은 문제에서 구한 정답은 그것을 포함하는 큰 문제에서도 같음.  
  즉, 작은 문제에서 구한 정답을 큰 문제에서도 사용 가능.

</br>

### Overlapping Sub-problems

첫 번째 조건인 Overlapping Sub-problems는 바꿔말하면 큰 문제로부터 나누어진 작은 문제는 큰 문제를 해결할 때 여러 번 반복해서 사용될 수 있어야 한다는 뜻이다.  
이는 피보나치 수열과 함께 이해할 수 있다.

```javascript
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
```

</br>

![피보나치 수열 그림](https://user-images.githubusercontent.com/75058239/130593616-2c0a7bb1-1b73-4461-ad79-77539eb8e718.jpeg)

</br>

피보나치 수열을 구하기 위해서 작은 문제의 결과를 여러 번 반복하여 사용하는 것을 확인할 수 있다.  
여기서 주의해야 할 점은, 주어진 문제를 단순히 반복 계산하여 해결하는 것이 아니라 작은 문제의 결과가 큰 문제를 해결하는 데에 여러 번 사용될 수 있어야 한다는 점이다.

</br>

### Optimal Substructure

여기에서 말하는 '정답'은 최적의 해결 방법(Optimal solution)을 의미한다.  
두 번째 조건을 달리 표현하면 최적의 해법을 구하고자 할 때 작은 문제들의 최적의 해법을 찾은 후, 그것들을 결합하면 결국 전체 문제의 최적의 해법을 구할 수 있다는 논법이다.

</br>

### Recursion + Memorization

Memorization의 정의는 _"컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술"_ 이다.  
앞서 살펴본 피보나치 수열 재귀 함수에 이 Memorization을 적용해 볼 수 있다.

```javascript
function fibMemo(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  // 이미 해결한 하위 문제인지 찾아본다
  if (n <= 2) return 1;
  let res = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  // 없다면 재귀로 결과값을 도출하여 res 에 할당
  memo[n] = res;
  // 추후 동일한 문제를 만났을 때 사용하기 위해 리턴 전에 memo 에 저장
  return res;
}
```

피보나치 수열을 이런 식으로 도출하면 시간 복잡도는 기존의 O(2ⁿ)에서 O(n)으로 바뀌게 된다.  
이는 큰 문제를 해결하기 위해서 풀이 과정이 마치 위에서 아래로 내려가는 것과 같아, Top-down 방식이라 부르기도 한다.

</br>

### Iteration + Tabulation

재귀 함수를 이용한 방법은 큰 문제부터 시작하여 작은 문제를 호출해가며 문제를 해결했다면, 반복문을 이용한 방법은 작은 문제에서부터 시작하여 큰 문제를 해결해 나가는 방법이다.  
그 때문에 이를 Bottom-up 방식이라 부르기도 한다.

```javascript
function fibTab(n) {
  if (n <= 2) return 1;
  let fibNum = [0, 1, 1];
  // n 이 1 & 2일 때의 값을 미리 배열에 저장해 놓는다
  for (let i = 3; i <= n; i++) {
    fibNum[i] = fibNum[i - 1] + fibNum[i - 2];
    // n >= 3 부터는 앞서 배열에 저장해 놓은 값들을 이용하여
    // n번째 피보나치 수를 구한 뒤 배열에 저장 후 리턴한다
  }
  return fibNum[n];
}
```

</br>

Chrome 개발자 도구에서 위 두 가지 피보나치 수열 함수를 실험해서 실행 시간을 비교해보자.  
Chrome 개발자 도구에서 함수 실행 시간을 측정하는 방법은 다음과 같다.  
참고로 실행 환경이 저마다 다르므로 이번 학습 용도로만 사용하도록 하자.

```javascript
var t0 = performance.now();
fib(50); // 여기에서 함수 실행을 시켜주세요
var t1 = performance.now();
console.log("runtime: " + (t1 - t0) + "ms");
```

두개를 실험해 본 결과, 다음과 같은 차이가 발생했다.

```javascript
fibMemo(5000);

=> runtime: 1.7000000178813934ms
```

```javascript
fibTab(5000);

=> runtime: 0.5999999940395355ms
```

</br>

## Sprint Office Hour

- 연산 1억번 당 1초라고 생각하자.  
  시간 복잡도 1억에 도달하려면 다음과 같은 n이 필요하게 된다.
  - O(n) : 1억
  - O(n log n) 500만
  - O(n²) : 1만
  - O(n³) : 500 (1.25)
  - O(2ⁿ) : 27 (문제 특성상 25 또는 20)
  - O(2!) : 11 (문제 특성상 10)
- 공간 복잡도
  - 자료형
    - Java : 4byte(Integer), 8byte(Long)
    - JavaScript : 8byte(number)
    - 공간 복잡도 또한 억대 byte가 나오면 다른 방법을 고려해보자.
- Geeks for Geeks 참고할 자료들
  - palindrome
  - LIS, LCS
  - Knapsack
  - coin change
  - 다익스트라
  - Floyd Warshall
  - bellman ford
- 코딩 테스트 준비 시 레퍼런스를 봐도 된다.
  - 위에 보이는 Geeks for Geeks의 어려운 Algorithm들은 모르고 푼다는 것 자체가 말이 안된다.
- 문제를 푸는 방법
  - 코딩(구현)은 맨 마지막에  
    급하게 풀다보면 중간에 로직이 꼬일 수 밖에 없다.  
    그리고 꼬이게 되면 로직을 다시 엎을 때 두려움이 앞설 수 밖에 없다.
  - 문제를 순서대로 푸는 것이 굉장히 중요하다.  
    다음은 문제들을 봤을 때 보이는 순서들의 유형이다.
    1. 대부분의 쉬운 문제들은 순서가 명확
    2. 순서를 찾아야 하는 경우
    3. 순서를 뒤집어야 하는 경우
    4. 문제의 입력의 순서와 상관 없이 풀어야 하는 경우
- 직접 시행과 관찰을 통한 패턴 인식은 인간의 가장 최초의 학습 방식
