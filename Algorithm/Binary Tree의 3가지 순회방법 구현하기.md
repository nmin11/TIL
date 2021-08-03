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

public class Test {
    public static void main (String[] args) {

    }
}
```
