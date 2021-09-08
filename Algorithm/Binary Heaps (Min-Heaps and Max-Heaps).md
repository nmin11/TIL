## What is Heap?

최대값이나 최소값을 찾아내는 연산을 빠르게 찾아내기 위해 고안된, 완전이진트리를 기본으로 한 자료구조이다.  
Heap에는 Min-Heap과 Max-Heap이 있다.  
Min-Heap은 부모 노드에 자신보다 작은 값을 둬서 트리의 루트에는 가장 작은 값이 오게 한다.  
반대로 Max-Heap은 부모 노드에 자신보다 큰 값을 둬서 트리의 루트에는 가장 큰 값이 오게 한다.  
Min-Heap에 대해서 알면 Max-Heap의 구현도 간단해지니 Min-Heap을 위주로 살펴볼 것이다.

</br>

## Min-Heap에 노드 삽입하기

우선 완전이진트리의 맨 끝에 추가한다.  
추가한 이후에, 자신의 부모 노드와 비교해서 자신의 값이 더 작으면 부모와 자리를 바꾼다.  
이 작업을 삽입한 값이 부모의 값보다 크거나, 아니면 루트에 도달하게 될 때까지 반복한다.  
이러한 작업은 트리에서 한 레벨씩 올라가면서 경우의 수가 절반씩 떨어지게 되니 O(log n)의 시간복잡도를 가진다.

</br>

## Min-Heap에서 노드 꺼내오기

Min-Heap은 가장 작은 값을 루트에 두기 때문에 최소값을 빼내는 것은 간편하다.  
그런데 루트의 값을 뺀 다음에는 추가적인 연산이 필요하다.  
우선, 완전이진트리의 조건을 해치지 않기 위해, 맨 마지막 노드를 가져와서 루트에 넣어준다.  
이후, 새로 들어온 루트의 노드와 자식들을 비교하면서, 더 작은 값과 새 값의 위치를 바꿔준다.  
이러한 작업을 자식 노드의 값 두개가 둘 다 자신의 값보다 크거나, 트리의 leaf에 도달하게 될 때까지 반복한다.  
이 작업은 삽입 과정과 마찬가지로 O(log n)의 시간복잡도를 가진다.  
한 번 위치를 변경해줄 때마다 가야 할 길이 절반씩 줄어들기 때문이다.

</br>

## Reference

- [엔지니어대한민국 - Binary Heaps (Min-Heaps and Max-Heaps)](https://www.youtube.com/watch?v=jfwjyJvbbBI&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)