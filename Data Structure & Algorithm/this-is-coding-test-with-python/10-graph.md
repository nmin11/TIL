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
