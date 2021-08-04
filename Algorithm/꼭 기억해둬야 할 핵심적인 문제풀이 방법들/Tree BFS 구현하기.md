## 문제 요약

임의의 tree를 구성하는 노드 중 하나의 Node 객체를 입력받아, 해당 노드를 시작으로 BFS를 진행한다.  
탐색되는 순서대로 노드의 값이 저장된 배열을 리턴하라.

</br>

## 추가 사항

- 인자는 'value', 'children' 속성을 갖는 객체
- 'node.value'는 number 타입
- 'node.children'은 Node를 요소로 갖는 배열
- 이미 주어져 있는 생성자 함수(Node)와 메소드(addChild)는 변경하지 말것

</br>

## 풀이

```javascript
let bfs = function (node) {
  // TODO: 여기에 코드를 작성합니다.
  let currentNode = node;
  let queue = [];
  let result = [];
  queue.push(currentNode);

  while (queue.length > 0) {
    currentNode = queue.shift();
    result.push(currentNode.value);

    for (let i = 0; i < currentNode.children.length; i++) {
      queue.push(currentNode.children[i]);
    }
  }

  return result;
};

// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
  this.value = value;
  this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
  this.children.push(child);
  return child;
};
```

BFS 방식을 활용하기 위해서는 Queue를 사용해야 한다는 점을 꼭 기억하도록 하자!

</br>

※ [참고한 블로그 글](https://foamless.tistory.com/725?category=819432)
