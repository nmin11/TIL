# 자료형

## 수 자료형

### 지수 표현 방식

- `e` 혹은 `E` 를 활용한 지수 표현 방식 사용 가능
- `e` 다음에 오는 수는 10의 지수부를 뜻함
- 예를 들어 `1e9` 는 10의 9제곱(10억)이 됨

```py
a = 1e9
print(a)

a = 75.25e1
print(a)

a = 3954e-3
print(a)
```

```sh
1000000000.0
752.5
3.954
```

### 실수형의 정확도 문제

- IEEE754 표준에서 실수형을 저장할 때 4Byte 혹은 8Byte라는 고정된 크기의 메모리 할당
- 이로 인해 현대 컴퓨터 시스템은 대체로 실수 정보 표현 정확도에 한계를 가짐
- 이럴 때 `round()` 함수를 이용하자
  - 첫 번째 인자에 실수형 데이터를
  - 두 번째 인자에 반올림하고자 하는 위치를
- 흔히 코딩 테스트에서는 소수점 5번째 자리에서 반올림한 결과가 같으면 정답으로 인정하곤 함
  - `round(n, 4)` 를 애용하자

```py
a = 0.3 + 0.6
print(round(a, 4))
```

```sh
0.9
```

### 나누기 연산자와 몫 연산자

- 파이썬에서 나누기 연산자(`/`)는 기본적으로 실수형 처리
- 나눈 결과에서 몫만 얻고자 할 때는 몫 연산자(`//`)를 사용하자

### 거듭 제곱 연산자

- `x ** n` = `xⁿ`

## 리스트 자료형

### 1차원 리스트 초기화

- 코딩 테스트에서는 크기가 N인 1차원 리스트를 초기화할 일이 많음

```py
n = 10
a = [0] * n
```

### 리스트 슬라이싱

- `:` 키워드를 활용

```py
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(a[1 : 4])
```

```sh
[2, 3, 4]
```

### 리스트 컴프리헨션

- 리스트 안에 조건문과 반복문을 넣는 방식으로 리스트 초기화를 할 수 있음
- **2차원 리스트**를 초기화할 때 반드시 활용해야 하는 방법

```py
array = [i for i in range(20) if i % 2 == 1]
print(array)

array = [i * i for i in range(1, 10)]
print(array)

n = 3
m = 4
array = [[0] * m for _ in range(n)]
print(array)
```

```sh
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
[1, 4, 9, 16, 25, 36, 49, 64, 81]
[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
```

### 리스트의 메서드들

`append()`

- 원소 삽입
- O(1)

`sort()`

- 오름차순 정렬
- 내림차순 정렬 = `sort(reverse = True)`
- O(NlogN)

`reverse()`

- 원소들의 순서 뒤집기
- O(N)

`insert()`

- 특정 인덱스에 원소 삽입
- 첫 번째 인자 = 삽입할 인덱스
- 두 번째 인자 = 삽입할 값
- O(N)

`count()`

- 원소 중 특정 값을 갖는 데이터 개수 세기
- 인자 = 특정 값
- O(N)

`remove()`

- 원소 중 특정 값을 갖는 원소 하나만 제거

### 리스트에서 특정 값의 원소를 모두 제거하려면

- 제공되는 기본 함수가 없으므로 직접 해야 한다

```py
a = [1, 2, 3, 4, 5, 5, 5]
remove_set = {3, 5}
result = [i for i in a if i not in remove_set]
print(result)
```

```sh
[1, 2, 4]
```

## 튜플 자료형

- 리스트와 비슷하지만 약간의 차이가 있음
  - 한 번 선언된 값을 변경할 수 없음
  - 리스트는 `[]` 튜플은 `()`
- 리스트에 비해 공간 효율적
- 일반적으로 각 원소의 성질이 서로 다를 때 주로 사용
- 흔히 다익스트라 최단 경로 알고리즘에서 '비용'과 '노드 번호'라는 서로 다른 성질의 데이터를 튜플로 묶어서 관리

```py
a = (1, 2, 3, 4)
```

## 사전 자료형

```py
data = dict()
data['a'] = 'alpha'
data['g'] = 'gamma'
data['o'] = 'omega'

if 'a' in data:
  print(data['a'])

key_list = data.keys()
value_list = data.values()
print(key_list)
print(value_list)
```

```sh
alpha
dict_keys(['a', 'g', 'o'])
dict_values(['alpha', 'gamma', 'omega'])
```

## 집합 자료형

```py
a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}

print(a | b)
print(a & b)
print(a - b)

a.add(6)
print(a)

a.update(b)
print(a)

a.remove(3)
print(a)
```

```sh
{1, 2, 3, 4, 5, 6, 7}
{3, 4, 5}
{1, 2}
{1, 2, 3, 4, 5, 6}
{1, 2, 3, 4, 5, 6, 7}
{1, 2, 4, 5, 6, 7}
```

# 조건문

```py
socre = 85

if score >= 90:
  print("A")
elif score >= 80:
  print("B")
elif score >= 70:
  print("C")
else
  print("F")
```

## 논리 연산자

- `X and Y`
- `X or Y`
- `not X`
- `X in Y`
- `X not in Y`

## `pass`

- `pass` 키워드를 활용하면 조건문이 참이어도 아무 처리를 하지 않게 할 수 있음

# 반복문

## for문

- `range()` 키워드를 자주 사용
  - `range(시작값, 끝값+1)` 의 형태
  - 인자를 하나만 넣으면 시작 값은 자동으로 0이 됨

# 함수

```py
def add(a, b):
  return a + b
```

## Lambda Express

```py
lambda a, b: a + b
```

# 입출력

- 알고리즘 문제 풀이의 첫 번째 단계는 데이터를 입력받는 것
- 파이썬에서 데이터를 입력 받을 때 `input()` 사용
- 여러 개의 데이터를 입력받을 때는 보통 공백으로 구분되는 경우가 많음
- **꿀팁 키워드: `list(map(int, input().split()))`**
  - 정말 많이 사용되므로 외우고 있자

```py
n = int(input())
data = list(map(int, input().split()))
```

- 데이터가 적을 경우 꿀팁

```py
n, m, k = map(int, input().split())
```

- 1,000만 개가 넘는 라인이 입력되는 경우에는 입력을 더 빠르게 받아야 함
  - 언어별로 입력을 더 빠르게 받는 방법을 숙지할 것
  - 파이썬의 경우 `sys.stdin.readline().rstrip()` 함수 사용
    - `rstrip()`은 공백 문자 제거

```py
import sys
data = sys.stdin.readline().rstrip()
```

## f-string 문법

- 파이썬 3.6부터 사용 가능한 문자열 템플릿 기능

```py
answer = 7
print(f"answer is {answer}")
```

# 주요 라이브러리의 문법과 유의점

- 파이썬의 일부 라이브러리는 잘못 사용하면 수행 시간이 비효율적으로 증가하므로 유의해야 함

## 표준 라이브러리

- https://docs.python.org/ko/3.13/library/index.html
- 반드시 알아야 하는 라이브러리는 6가지 정도
  - **내장 함수**
  - `itertools`
  - `heapq`
  - `bisect`
  - `collections`
  - `math`

### 내장 함수

- 기본 입출력, 정렬 기능 등을 포함
- 파이썬 프로그램 작성에 있어서 필수적
- 별도의 `import` 문 없이 바로 사용 가능
- 대표적으로 `input()` `print()`
- `sum()` `min()` `max()` `eval()` `sorted()` `sort()` 등

```py
result = sorted([('English', 88), ('Science', 90), ('Maths', 97),],
                key=lambda x: x[1],
                reverse=True)
```

### itertools

- 반복되는 데이터 처리
- 가장 유용한 클래스는 `permutations` `combinations`
  - 순열 계산에 용이한 `permutations`
  - 조합 계산에 용이한 `combinations`

```py
from itertools import permutations

data = ['A', 'B', 'C']
result = list(permutations(data, 3))
print(result)
```

```sh
[('A', 'B', 'C'), ('A', 'C', 'B'), ('B', 'A', 'C'), ('B', 'C', 'A'), ('C', 'A', 'B'), ('C', 'B', 'A')]
```

```py
from itertools import combinations

data = ['A', 'B', 'C']
result = list(combinations(data, 2))
print(result)
```

```sh
[('A', 'B'), ('A', 'C'), ('B', 'C')]
```

- 중복 허용 순열 `product`

```py
from itertools import product

data = ['A', 'B', 'C']
result = list(product(data, repeat=2))
print(result)
```

```sh
[('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'B'), ('B', 'C'), ('C', 'A'), ('C', 'B'), ('C', 'C')]
```

- 중복 허용 조합 `combinations_with_replacement`

```py
from itertools import combinations_with_replacement

data = ['A', 'B', 'C']
result = list(combinations_with_replacement(data, 2))
print(result)
```

```sh
[('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'B'), ('B', 'C'), ('C', 'C')]
```

### heapq

- Heap 기능 제공
- 우선순위 큐 기능을 구현하기 위해 사용됨
  - `PriorityQueue` 라이브러리도 있지만 코딩 테스트 환경에서는 `heapq`가 더 빠르다
- 파이썬의 Heap은 Min Heap
  - 시간 복잡도 O(NlogN)으로 오름차순 정렬
- 원소 삽입: `heapq.heappush()`
- 원소 꺼내기: `heapq.heappop()`
- 파이썬에서 Max Heap은 제공되지 않으니 직접 구현해야 함

```py
import heapq

def heapsort(iterable):
  h = []
  result = []
  for value in iterable:
    heapq.heappush(h, -value)
  for _ in range(len(h)):
    result.append(-heapq.heappop(h))
  return result
```

### bisect

- 이진 탐색을 쉽게 구현할 수 있도록 해줌
- 정렬된 배열에서 특정 원소를 찾을 때 매우 효과적
- 주요 함수 `bisect_left()` `bisect_right()`
  - 두 함수는 시간 복잡도 O(logN)
  - `bisect_left(a, x)` 정렬 순서를 유지하며 리스트 a에 데이터 x를 삽입할 가장 왼쪽 인덱스 찾기
  - `bisect_right(a, x)` 정렬 순서를 유지하며 리스트 a에 데이터 x를 삽입할 가장 오른쪽 인덱스 찾기

```py
from bisect import bisect_left, bisect_right

a = [1, 2, 4, 4, 8]
x = 4

print(bisect_left(a, x))
print(bisect_right(a, x))
```

```sh
2
4
```

- 정렬된 리스트에서 값이 특정 범위에 속하는 원소의 개수를 효과적으로 구할 수 있음

```py
from bisect import bisect_left, bisect_right

def count_by_range(a, left_value, right_value):
  right_index = bisect_right(a, right_value)
  left_index = bisect_left(a, left_value)
  return right_index - left_index

a = [1, 2, 3, 3, 3, 3, 4, 4, 8, 9]
print(count_by_range(a, 4, 4))
print(count_by_range(a, -1, 3))
```

```sh
2
6
```

### collections

- 유용한 자료구조 제공
- `deque` `Counter` 가 특히 유용
  - `Queue` 라이브러리가 있지만 일반적인 큐 자료구조는 아니므로 `deque`를 이용해 큐를 구현하자

```py
from collections import deque

data = deque([2, 3, 4])
data.appendleft(1)
data.append(5)
```

```py
from collections import Counter

counter = Counter(['red', 'blue', 'red', 'green', 'blue', 'blue'])

print(counter['blue'])
print(counter['green'])
print(dict(counter))
```

```sh
3
1
{'red': 2, 'blue': 3, 'green': 1}
```

### math

- 자주 사용되는 수학적 기능들
  - 팩토리얼, 제곱근, 최대공약수 등

```py
import math

print(math.factorial(5))
print(math.sqrt(7))
print(math.gcd(21, 14))
print(math.pow(2, 3))
print(math.pi)
print(math.e)
```

```sh
120
2.6457513110645907
7
8.0
3.141592653589793
2.718281828459045
```
