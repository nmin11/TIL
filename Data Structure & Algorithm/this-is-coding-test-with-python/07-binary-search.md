# Sequential Search

- 리스트 안의 특정 데이터를 찾기 위해 앞에서부터 차례대로 확인하는 방법
- 보통 정렬되지 않은 리스트에서 데이터를 찾아야 할 때 사용
- 리스트 내 데이터가 아무리 많아도 시간만 충분하다면 항상 원하는 원소를 찾을 수 있다
- O(N)

# Binary Search

- 배열 내 데이터가 정렬되어 있어야만 사용 가능한 알고리즘
- 특징
  - 정렬되어 있다는 조건 하에 매우 빠르게 데이터를 찾을 수 있음
  - 탐색 범위를 절반씩 좁혀가며 데이터를 탐색
- 위치를 나타내는 변수 3개 사용
  - 시작점, 끝점, 중간점
  - 중간점 위치의 데이터를 반복적으로 비교해서 원하는 데이터 찾기
- O(logN)
  - 확인할 때마다 확인할 원소의 개수가 절반씩 줄어듦
  - 데이터를 절반씩 줄인다는 점은 퀵 정렬과도 같음

재귀 함수 방식

```py
def binary_search(array, target, start, end):
  if start > end:
    return None
  mid = (start + end) // 2
  if array[mid] == target:
    return mid
  elif array[mid] > target:
    return binary_search(array, target, start, mid - 1)
  else:
    return binary_search(array, target, mid + 1, end)


n, target = list(map(int, input().split()))
array = list(map(int, input().split()))

result = binary_search(array, target, 0, n - 1)
if result is None:
  print("Element is not found")
else:
  print(result + 1)
```

반복문 방식

```py
def binary_search(array, target, start, end):
  while start <= end:
    mid = (start + end) // 2
    if array[mid] == target:
      return mid
    elif array[mid] > target:
      end = mid - 1
    else:
      start = mid + 1
  return None

n, target = list(map(int, input().split()))
array = list(map(int, input().split()))

result = binary_search(array, target, 0, n - 1)
if result is None:
  print("Element is not found")
else:
  print(result + 1)
```

⇒ 이진 탐색은 단골 유형이니 코드를 외워두자

# Tree

- 노드와 노드의 연결로 표현되는 자료구조
- 그래프 자료구조의 일종
- 특징
  - 부모 노드와 자식 노드의 관계로 표현됨
  - 최상단 노드 = 루트 노드
  - 최하단 노드 = 단말 노드
  - 일부 구조를 떼어내 서브 트리로 분류할 수 있음
  - 계층적이고 정렬된 데이터를 다루기에 적합 (DB, 파일 시스템)

# Binary Search Tree

- 왼쪽 자식 노드 < 부모 노드 < 오른쪽 자식 노드
- 이진 탐색 트리를 직접 구현하도록 요구하는 문제는 출제 빈도가 낮다
- 문제에서 탐색할 데이터 개수가 1,000만 혹은 1,000억 단위라면 이진 탐색 알고리즘을 의심해보자
- 입력 데이터가 많으니 `input()` 대신 `sys` 라이브러리를 사용할 것
  - `rstrip()` : 엔터 입력 시 줄바꿈 기호 입력을 제거하는 용도

```py
import sys

input_data = sys.stdin.readline().rstrip()
```

# Parametric Search Problem

- 최적화 문제를 결정 문제로 바꾸어 해결하는 기법
- '원하는 조건을 만족하는 가장 알맞은 값을 찾는 문제'

## Problem Example

- Input
  - 첫째 줄: 1 <= N <= 1,000,000, 1 <= M <= 2,000,000,000
  - 둘째 줄: 자를 숫자들이 들어 있는 배열
- Output: 자르고 남은 수의 총합이 적어도 M 만큼 남을 수 있도록 하는 절단기의 최대값

```py
n, m = list(map(int, input().split(' ')))
array = list(map(int, input().split()))

start = 0
end = max(array)
result = 0

while start <= end:
  total = 0
  mid = (start + end) // 2
  for x in array:
    if x > mid:
      total += x - mid
  if total < m:
    end = mid - 1
  else:
    result = mid
    start = mid + 1

print(result)
```
