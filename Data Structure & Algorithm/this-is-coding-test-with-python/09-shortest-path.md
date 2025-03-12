# Shortest Path

- 가장 짧은 경로를 찾는 알고리즘
- '길 찾기' 문제라고도 불림
- 보통 그래프를 이용해 표현
- 컴퓨터공학과 학부 수준에서 사용하는 최단 거리 알고리즘은 3가지
  - 다익스트라 최단 경로 알고리즘
  - 플로이드 워셜 알고리즘
  - 벨만 포드 알고리즘
  - 3개 중 다익스트라, 플로이드 워셜 2개가 코딩 테스트 단골
- 그리디와 다이나믹 프로그래밍이 최단 경로 알고리즘에 그대로 적용됨

# Dijkstra

- 그래프에 여러 노드가 있을 때, 특정 노드에서 출발해 다른 노드로 가는 각각의 최단 경로를 구하는 알고리즘
- 0 보다 작은 값을 가지는 '음의 간선'이 없어야 함
- GPS 소프트웨어의 기본 알고리즘으로 채택되곤 함
- 기본적으로 그리디 알고리즘으로 분류됨
  - 매번 '가장 비용이 적은 노드'를 선택해서 임의의 과정을 반복하기 때문

원리

1. 출발 노드 설정
2. 최단 거리 테이블 초기화
3. 방문하지 않은 노드 중 최단 거리가 가장 짧은 노드 선택
4. 선택한 노드를 거쳐 다른 노드로 가는 비용을 계산하여 최단 거리 테이블 갱신
5. 3~4번 반복

특징

- '각 노드에 대한 현재까지의 최단 거리' 정보를 항상 1차원 리스트에 저장하며 갱신함
  - 이 1차원 리스트를 '최단 거리 테이블'이라고도 불림
- 구현 방법이 2가지
  - 구현이 쉽지만 동작이 느린 코드 O(N²)
  - 구현이 까다롭지만 동작이 빠른 코드 O(NlogN)
  - 구현이 까다롭지만 동작이 빠른 코드를 정확히 이해하고, 구현할 수 있을 때까지 연습하자!

구현이 쉽지만 동작이 느린 버전

```py
import sys

input = sys.stdin.readline
INF = int(1e9)
n, m = map(int, input().split())
start = int(input())
graph = [[] for _ in range(n + 1)]
visited = [False] * (n + 1)
distance = [INF] * (n + 1)

for _ in range(m):
  a, b, c = map(int, input().split())
  graph[a].append((b, c))

def get_smallest_node():
  min_value = INF
  index = 0
  for i in range(1, n + 1):
    if distance[i] < min_value and not visited[i]:
      min_value = distance[i]
      index = i
  return index

def dijkstra(start):
  distance[start] = 0
  visited[start] = True
  for j in graph[start]:
    distance[j[0]] = j[1]
  for i in range(n - 1):
    now = get_smallest_node()
    visited[now] = True
    for j in graph[now]:
      cost = distance[now] + j[1]
      if cost < distance[j[0]]:
        distance[j[0]] = cost

dijkstra(start)

for i in range(1, n + 1):
  if distance[i] == INF:
    print("INFINITY")
  else:
    print(distance[i])
```
