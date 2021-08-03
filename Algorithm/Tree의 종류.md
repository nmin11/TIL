## What is Tree

Array, LinkedList, Stack, Queue는 일직선 데이터 구조이다.  
반면에 Tree는 부모 - 자식 관계를 갖는 데이터 구조이다.  
따라서 Tree에는 계층과 그룹이 있다.  
그리고 Tree의 맨 끝, 더이상 자식이 없는 Node를 leaf라고 부른다.

</br>

## Binary Tree (이진 트리)

Child Node가 최대 2개까지만 붙는 Tree가 Binary Tree이다.  
Child Node가 3개씩 붙게 되면 Ternary Tree라고 부른다.  
우리가 특히 관심을 갖고 공부하기 되는 Tree는 Binary Tree이다.

</br>

## Binary Search Tree (이진 검색 트리)

Binary Tree는 Child Node가 최대 2개라는 조건 외에 다른 조건은 필요 없다.  
하지만 Binary Search Tree에서는 왼쪽 Node와 그 이하의 Node들은 현재 Node보다 작아야 하며, 오른쪽 Node와 그 이하 Node들은 현재 Node보다 커야한다는 추가적인 조건을 갖는다.  
따라서 Binary Search Tree에서는 현재 값보다 작은 값을 찾고자 한다면 왼쪽으로, 큰 값을 찾고자 한다면 오른쪽으로 가기만 하면 원하는 값을 찾을 수 있게 된다.

</br>

## Balance

Tree에서 balance가 맞다는 것은 왼쪽과 오른쪽의 Node 수가 정확하게 일치해야 한다는 뜻은 아니다.  
너무 지나치게 치우쳐져 있지만 않다면 balance가 맞다고 표현한다.  
Balanced Tree의 대표적인 예는 다음과 같다.

- Red-Black Tree
- AVL Tree

</br>

## Complete Binary Tree (완전 이진 트리)

모든 Node들이 Level 별로 왼쪽부터 채워져 있으면 Comlete Binary Tree이다.  
그렇게 되기 위해서 마지막 Level을 제외한 모든 서브 트리의 Level이 같아야 하며, 마지막 Level 또한 왼쪽부터 채워져 있어야 한다.

</br>

(이미지 첨부 완전 이진 트리 예시)

</br>

## Full Binary Tree

단 하나의 Child Node를 가진 Node가 하나도 없는 것이 Full Binary Tree이다.  
따라서 Childe Node를 가지려면 둘을 가져야 하고, 안 가지려면 아예 갖지 말아야 한다.

</br>

(이미지 첨부 Full Binary Tree 예시)

</br>

## Perfect Binary Tree

양쪽으로 빈 공간 없이 모든 Node가 2개의 Childe Node을 가지며, Level도 딱 떨어지는, 완벽한 피라미드 구조를 가지는 Tree가 Perfect Binary Tree이다.  
한국에서는 이를 포화 이진 트리라고 부르기도 한다.  
하지만 포화 이진 트리를 다시 영어로 하면 Full Binary Tree가 되기 때문에 헷갈리게 된다.  
이럴 때는 차라리 원래 영어로 구분하는 편을 선택하도록 하자.
