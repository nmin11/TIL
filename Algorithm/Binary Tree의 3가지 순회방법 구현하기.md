## Binary Tree Traversal

Binary Tree를 횡단하면서 Tree의 모든 데이터를 가져오는 방법에는 3가지 방법이 있다.

- Inorder (Left, Root, Right)
- Preorder (Root, Left, Right)
- Postorder (Left, Right, Root)

</br>

### Inorder

우선 왼쪽 자식을 따라서 끝까지 탐색한다.  
왼쪽 끝 leaf에 도달하면 해당 leaf를 출력하고, 해당 leaf의 Root인 부모 Node를 출력한다.  
그 다음에는 해당 부모 Node의 오른쪽을 탐색하기 시작하며, 끝에 도달하면 똑같이 출력 이후에 Root로 돌아온다.

</br>

### Preorder

자기 자신을 먼저 출력하고 그 다음에 왼쪽 - 오른쪽 순서로 탐색을 하는데, 역시나 자기 자신을 먼저 출력하고 왼쪽과 오른쪽을 탐색하는 방식으로 이어진다.

</br>

### Postorder

Preorder와 반대로, 자기 자신을 가장 나중에 출력한다.  
가장 깊은 곳에서부터 출력하게 된다.

</br>

## Java 코드로 구현하기

```java
class Node {
    int data;
    Node left;
    Node right;
}

class Tree {
    public Node root;

    public void setRoot(Node node) {
        this.root = node;
    }
    public Node getRoot() {
        return root;
    }
    public Node makeNode(Node left, int data, Node right) {
        Node node = new Node();
        node.data = data;
        node.left = left;
        node.right = right;
        return node;
    }
    public void inorder(Node node) {
        if (node != null) {
            inorder(node.left);
            System.out.println(node.data);
            inorder(node.right);
        }
    }
    public void preorder(Node node) {
        if (node != null) {
            System.out.println(node.data);
            preorder(node.left);
            preorder(node.right);
        }
    }
    public void postorder(Node node) {
        if (node != null) {
            postorder(node.left);
            postorder(node.right);
            System.out.println(node.data);
        }
    }
}


/*
        (1)
    (2)     (3)
  (4) (5)
*/

public class Test {
    public static void main (String[] args) {
        Tree t = new Tree();
        //마지막 Node부터 생성
        Node n4 = t.makeNode(null, 4, null);
        Node n5 = t.makeNode(null, 5, null);
        Node n2 = t.makeNode(n4, 2, n5);
        Node n3 = t.makeNode(null, 3, null);
        Node n1 = t.makeNode(n2, 1, n3);
        t.setRoot(n1);
        t.inorder(t.getRoot());
        t.preorder(t.getRoot());
        t.postorder(t.getRoot());
    }
}

/*
4 2 5 1 3
1 2 4 5 3
4 5 2 3 1
*/
```

</br>

※ 출처 : [엔지니어대한민국 님의 Binary Tree의 3가지 순회방법 구현하기](https://www.youtube.com/watch?v=QN1rZYX6QaA&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
