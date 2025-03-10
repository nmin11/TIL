# Sorting

- 이진 탐색(Binary Search)의 전처리 과정이기도 함
- 굉장히 다양한 정렬 알고리즘들
  - 여기서는 선택 정렬, 삽입 정렬, 퀵 정렬, 계수 정렬만 다룸
- 현대의 정렬 알고리즘은 정립되어 있기에 큰 개선이 이루어지기는 어려움
  - 즉, 정렬 알고리즘 문제는 잘 외워두면 쉽게 풀 수 있는 문제
- 참고로 파이썬 기본 내장 정렬 라이브러리는 내부적으로 C 언어 기반이며 다양한 최적화 테크닉이 포함되어 있음
- 정렬 알고리즘의 3가지 문제 유형
  - 정렬 라이브러리로 풀 수 있는 문제
    - 기본 정렬 라이브러리 사용법만 숙지하면 충분
  - 정렬 알고리즘의 원리에 대해 물어보는 문제
    - 선택 정렬, 삽입 정렬, 퀵 정렬 등의 원리를 알아야만 풀 수 있는 문제
  - 더 빠른 정렬이 필요한 문제
    - 퀵 정렬 기반의 정렬 기법으로도 풀 수 없음
    - 계수 정렬 같은 특별한 정렬 알고리즘을 사용해야 하거나
    - 기존에 알려진 알고리즘의 구조적 개선을 거쳐야 풀이가 가능

# Selection Sort

- 가장 원시적인 방법
- 가장 작은 데이터를 '선택'해서 처리되지 않은 데이터들 중 맨 앞에 있는 데이터와 바꾸는 방식
- O(N²)
- 매우 비효율적이지만, 코딩 테스트에서는 리스트에서 가장 작은 데이터를 찾을 일이 많으므로 선택 정렬 소스코드에 익숙해지자

```py
array = [7, 5, 2, 4, 3, 9]

for i in range(len(array)):
  min_index = i
  for j in range(i + 1, len(array)):
    if array[min_index] > array[j]:
      min_index = j

  # swap
  array[i], array[min_index] = array[min_index], array[i]

print(array)
```

# Insertion Sort

- 데이터를 적절한 위치에 '삽입'하는 방식
- 특정 데이터를 삽입하기 이전에, 그 앞까지의 데이터는 이미 정렬되어 있다고 가정
  - 그렇기 때문에 첫 번째 데이터는 정렬되어 있다고 가정하고 두 번째 데이터부터 정렬 시작
- O(N²)
- 리스트가 거의 정렬되어 있는 상태라면 매우 빠르게 동작한다는 점이 특징
  - 최선의 경우 O(N)

```py
array = [7, 5, 2, 4, 3, 9]

for i in range(1, len(array)):
  for j in range(i, 0, -1):
    if array[j] < array[j - 1]:
      array[j], array[j - 1] = array[j - 1], array[j]
    else:
      break

print(array)
```

# Quick Sort

- Merge Sort와 함께 가장 많이 사용되는 정렬 알고리즘
- pivot을 설정하고 리스트를 분할
  - 어떻게 pivot을 설정하고 리스트를 분할할지에 따라 방식이 나뉨
- 분할 정복의 방식이기 때문에 재귀함수 활용
- O(NlogN)
  - 하지만 이미 데이터가 정렬되어 있는 경우 O(N²)
  - 데이터가 거의 정렬되어 있는 경우에 더 빠르게 동작하는 '삽입 정렬'과 반대되는 특징
  - 더불어 pivot 값을 적절하게 설정하는 방법이 특히 중요

널리 사용되고 있는 기본적인 형태

```py
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array, start, end):
  if start >= end:
    return

  pivot = start
  left = start + 1
  right = end

  while left <= right:
    while left <= end and array[left] <= array[pivot]:
      left += 1
    while right > start and array[right] >= array[pivot]:
      right -= 1

    if left > right:
      array[right], array[pivot] = array[pivot], array[right]
    else:
      array[left], array[right] = array[right], array[left]

  quick_sort(array, start, right - 1)
  quick_sort(array, right + 1, end)

quick_sort(array, 0, len(array) - 1)
print(array)
```

데이터 비교 연산 횟수는 증가하지만 파이썬의 특징을 살린 직관적인 형태

```py
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array):
  if len(array) <= 1:
    return array

  pivot = array[0]
  tail = array[1:]

  left_side = [x for x in tail if x <= pivot]
  right_side = [x for x in tail if x > pivot]

  return quick_sort(left_side) + [pivot] + quick_sort(right_side)

print(quick_sort(array))
```

# Count Sort

- 특정 조건이 부합할 때만 사용 가능
  - 데이터 크기가 제한적이며, 정수형일 때
  - 모든 범위를 담을 수 있는 크기의 리스트를 선언해야 하기 때문
- 매우 빠르게 동작하며 원리도 간단
- 데이터 개수 N, 데이터 중 최대값 K 일 때, O(N + K) 보장
- 일반적인 비교 기반의 정렬 알고리즘이 아님
- 별도의 리스트를 선언하고 그 안에 정렬에 대한 정보를 담는 방식
- 동일한 데이터가 여러 번 등장할 때 적합

⇒ 만약 데이터의 특성을 파악하기 어렵다면 퀵 정렬을 쓰는 게 유리

```py
array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2]
count = [0] * (max(array) + 1)

for i in range(len(array)):
  count[array[i]] += 1

for i in range(len(count)):
  for j in range(count[i]):
    print(i, end=' ')
```
