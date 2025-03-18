# Graph

- 노드와 노드 사이에 연결된 간선의 정보를 가지고 있는 자료구조
- '서로 다른 개체 혹은 객체가 연결되어 있다'면 가장 먼저 그래프 알고리즘을 떠올릴 것
- 그래프 자료구조 중에서도 트리 자료구조는 다양한 알고리즘에 사용되므로 기억해둘 것

| | 그래프 | 트리 |
| :--: | :-- | :-- |
| 방향성 | 방향 그래프 혹은 무방향 그래프 | 방향 그래프 |
| 순환성 | 순환 및 비순환 | 비순환 |
| 루트 노드 | X | O |
| 노드 간 관계 | 부모 자식 관계 X | 부모 자식 관계 O |
| 모델 종류 | 네트워크 모델 | 계층 모델 |

# Disjoint Sets

## 개념

- 서로소 집합 = 공통 원소가 없는 두 집합
- 몇몇 그래프 알고리즘에서 매우 중요하게 사용됨
- 서로소 집합 자료구조 = 서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조
- 무방향 그래프에서 사이클을 판별할 때 용이
  - 참고로 방향 그래프에서 사이클 여부는 DFS를 이용해서 판별

## 방식

- `union` `find` 2개의 연산으로 조작
  - `union` : 2개의 집합을 하나로 합치는 연산
  - `find` : 원소가 어떤 집합에 속해 있는지 탐색
  - union-find 자료구조라고 불리기도 함
- 구현 시 트리 자료구조를 이용하여 집합을 표현

서로소 집합 계산 알고리즘 순서

- union 연산 확인 후 서로 연결된 두 노드 A, B 확인
  - A, B의 루트 노드 A', B' 탐색
  - A'를 B'의 부모 노드로 설정
- 모든 union 연산을 처리할 때까지 반복

알고리즘 부연 설명

- 실제 구현 시 A'와 B' 중 더 번호가 작은 원소가 부모 노드가 되도록 구현하는 경우가 많음
- 그래프 상에서 보면 A'와 B'를 간선으로 연결하는 형태
- 서로소 집합의 루트를 찾기 위해서는 재귀적으로 부모를 거슬러 올라가야 함

서로소 집합을 활용해서 사이클 판별하기

```py
def find_parent(parent, i):
  if parent[i] != i:
    parent[i] = find_parent(parent, parent[i])
  return parent[i]

def union_parent(parent, a, b):
  a = find_parent(parent, a)
  b = find_parent(parent, b)
  if a < b:
    parent[b] = a
  else:
    parent[a] = b

v, e = map(int, input().split())
parent = [0] * (v + 1)

for i in range(1, v + 1):
  parent[i] = i

cycle = False

for _ in range(e):
  a, b = map(int, input().split())
  if find_parent(parent, a) == find_parent(parent, b):
    cycle = True
    break
  else:
    union_parent(parent, a, b)

if cycle:
  print("사이클 발생")
else:
  print("사이클 발생 안함")
```

# Spanning Tree

- **모든 노드가 연결되면서 사이클이 없는 그래프**
  - 트리의 성립 조건이기도 함 → 그래서 '신장 트리'라고 불리는 것

## Kruskal Algorithm

- 대표적인 '최소 신장 트리 알고리즘'
- 그리디 알고리즘으로 분류됨

알고리즘 순서

- 간선 데이터 오름차순 정렬
- 간선 데이터를 순회하며 간선의 사이클 발생 여부 확인
  - 사이클 발생 X ⇒ 최소 신장 트리에 포함 O
  - 사이클 발생 O ⇒ 최소 신장 트리에 포함 X

시간 복잡도

- 간선의 개수가 E일 때, O(ElogE)
  - 간선을 정렬하는 작업이 제일 큰 시간 복잡도

소스 코드

```py
def find_parent(parent, i):
  if parent[i] != i:
    parent[i] = find_parent(parent, parent[i])
  return parent[i]

def union_parent(parent, a, b):
  a = find_parent(parent, a)
  b = find_parent(parent, b)
  if a < b:
    parent[b] = a
  else:
    parent[a] = b

v, e = map(int, input().split())
parent = [0] * (v + 1)
edges = []
result = 0

for i in range(1, v + 1):
  parent[i] = i

for _ in range(e):
  a, b, cost = map(int, input().split())
  edges.append((cost, a, b))

edges.sort()

for edge in edges:
  cost, a, b = edge
  if find_parent(parent, a) != find_parent(parent, b):
    union_parent(parent, a, b)
    result += cost

print(result)
```

# Topology Sort

위상 정렬

- 정렬 알고리즘의 일종
- 순서가 정해져 있는 일련의 작업을 차례대로 수행해야 할 때 사용 가능한 알고리즘
- 방향 그래프의 모든 노드를 방향성에 거스르지 않도록 순서대로 나열하는 것
- Indegree(진입차수) : 특정 노드로 들어오는 간선의 개수

알고리즘 순서

- 진입차수가 0인 노드를 큐에 삽입
- 큐가 빌 때까지 다음 괴정 반복
  - 큐에서 원소를 꺼내 해당 노드에서 출발하는 간선을 그래프에서 제거
  - 새롭게 진입차수가 0이 된 노드를 큐에 삽입

부연 설명

- 큐에서 원소가 V번 추출되기 전에 비어버리면 사이클이 발생한 것
  - 다만, 기본적으로 위상 정렬 문제는 사이클이 발생하지 않는다고 명시하는 경우가 많음
- 시간 복잡도 O(V + E)
  - 모든 노드를 확인하면서 해당 노드에서 출발하는 간선도 차례대로 제거해야 하므로

소스 코드

```py
from collections import deque

v, e = map(int, input().split())
indegree = [0] * (v + 1)
graph = [[] for i in range(v + 1)]

for _ in range(e):
  a, b = map(int, input().split())
  graph[a].append(b)
  indegree[b] += 1

def topology_sort():
  result = []
  q = deque()
  for i in range(1, v + 1):
    if indegree[i] == 0:
      q.append(i)

  while q:
    now = q.popleft()
    result.append(now)
    for i in graph[now]:
      indegree[i] -= 1
      if indegree[i] == 0:
        q.append(i)

  for i in result:
    print(i, end=' ')

topology_sort()
```
