2021 / 07 / 23

# Tree traversal

특정 목적을 위해 트리의 모든 노드를 한 번씩 방문하는 것을 **트리 순회** 라고 한다.  
1에서 10까지의 정수로 구성된 트리에서 3이라는 숫자를 찾기 위해 모든 노드를 방문하는 경우는 트리 순회의 한 예시이다.  
트리 구조는 계층적 구조라는 특별한 특징을 가지기 때문에, 모든 노드를 순회하는 방법엔 크게 세 가지가 있다.  
바로 전위 순회, 중위 순회, 후위 순회이다.  
이 순회 방식과는 논외로, 트리 구조에서 노드를 순차적으로 조회할 때의 순서는 항상 왼쪽부터 오른쪽이다.

</br>

## 전위 순회 (Preorder)

루트에서 시작해 왼쪽의 노드들을 순차적으로 둘러본 뒤, 왼쪽의 노드 탐색이 끝나면 오른쪽 노드를 탐색한다.

<details>
<summary>그림으로 확인하기</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/75058239/126772881-131b5ac9-4ebb-4dfd-bd26-b49e794ebcb0.gif"/>
</div>
</details>

</br>

## 중위 순회 (Inorder)

제일 왼쪽 끝에 있는 노드부터 순회하기 시작하여, 루트를 기준으로 왼쪽에 있는 노드의 순회가 끝나면 루트를 거쳐 오른쪽에 있는 노드로 이동하여 마저 탐색한다.

<details>
<summary>그림으로 확인하기</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/75058239/126772574-5e4f4050-e5da-4158-901a-340357b1fd7d.gif"/>
</div>
</details>

</br>

## 후위 순회 (Postorder)

루트를 가장 마지막에 순회한다.  
제일 왼쪽 끝에 있는 노드부터 순회하기 시작하여, 루트를 거치지 않고 오른쪽으로 이동해 순회한 뒤, 제일 마지막에 루트를 방문한다.

<details>
<summary>그림으로 확인하기</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/75058239/126772579-3fe05e1f-63ad-423e-ac10-15df876f4b0c.gif"/>
</div>
</details>

</br>
</br>

# BFS / DFS

그래프의 탐색은 하나의 정점에서 시작하여 그래프의 **모든 정점들을 한 번씩 방문(탐색)하는 것이 목적** 이다.  
그래프의 데이터는 배열처럼 정렬이 되어 있지 않다.  
그래서 원하는 자료를 찾으려면 하나씩 모두 방문해서 찾아야 한다.  
그래프의 모든 정점 탐색 방법에는 여러 가지가 있다.  
그중에서 가장 대표적인 두 가지 방법이 바로 DFS와 BFS이다.

</br>

## BFS (Breadth-First Search)

BFS는 가장 **가까운 정점부터 탐색** 한다.  
그리고 더는 탐색할 정점이 없을 때, 그 다음 떨어져 있는 정점을 순서대로 방문한다.  
BFS는 이처럼 너비를 우선적으로 탐색하기 때문에 Breadth-First Search, **너비 우선 탐색** 이라고 한다.  
주로 두 정점 사이의 최단 경로를 찾을 때 사용한다.

<details>
<summary>그림으로 확인하기</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/75058239/126773168-ea4d25dd-1934-4e54-8bad-9ab1d9ed6ab6.gif"/>
</div>
</details>

</br>

## DFS (Depth-First Search)

DFS는 **하나의 경로를 끝까지 탐색한 후, 원하는 정점이 아니라면 다음 경로로 넘어가 탐색** 한다.  
하나의 노선을 끝까지 들어가서 확인하고 다음으로 넘어가기 때문에, 운이 좋다면 단 몇 번만에 경로를 찾을 수 있다.  
이렇게 깊이를 우선적으로 탐색하는 방법을 Depth-First Search, **깊이 우선 탐색** 이라고 한다.  
한 정점에서 시작해서 다음 경로로 넘어가기 전에 해당 경로를 완벽하게 탐색할 때 사용한다.  
BFS보다 탐색 시간은 조금 오래 걸릴지라도 모든 노드를 완전히 탐색할 수 있다.

<details>
<summary>그림으로 확인하기</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/75058239/126772603-59ac48a5-eaa4-4d17-bba1-6052d7452f9f.gif"/>
</div>
</details>

</br>

BFS와 DFS는 모든 정점을 한 번만 방문한다는 공통점을 가지고 있지만, 사용할 때의 장단점은 분명하기 때문에 해당 상황에 맞는 탐색 기법을 사용해야 한다.
