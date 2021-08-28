## Depth-First Search(DFS)

- inorder, preorder, postorder 방식이 이에 해당한다.  
  child node의 끝까지 검색하고 다른 child node를 검색하게 된다.
- Stack을 활용해서 구현한다.
- 재귀 호출을 이용하면 코드가 훨씬 간결하고 세련되게 구현된다.

</br>

## Breadth-First Search(BFS)

- level 단위로 구분하여, 한 level의 child node를 검색하고 다음 level의 childe node를 검색한다.
- Queue를 활용해서 구현한다.

</br>

## Java로 직접 구현해보기

```java
import java.util.LinkedList;
import java.util.Iterator;
import java.util.Stack;
import java.util.Queue;
import java.util.NoSuchElementException;

class Graph {
    class Node {
        int data;
        LinkedList<Node> adjacent;
        boolean marked;
        Node (int data) {
            this.data = data;
            this.marked = false;
            adjacent = new LinkedList<Node>();
        }
    }

    Node[] nodes;
    Graph(int size) {
        nodes = new Node[size];
        for (int i = 0; i < size; i++) {
            nodes[i] = new Node(i);
        }
    }

    void addEdge(int i1, int i2) {
        Node n1 = nodes[i1];
        Node n2 = nodes[i2];

        if (!n1.adjacent.contains(n2)) {
            n1.adjacent.add(n2);
        }
        if (!n2.adjacent.contains(n1)) {
            n2.adjacent.add(n1);
        }
    }

    void dfs() {
        dfs(0);
    }

    void dfs(int index) {
        Node root = nodes[index];
        Stack<Node> stack = new Stack<Node>();
        stack.push(root);
        root.marked = true;

        while (!stack.isEmpty()) {
            Node r = stack.pop();
            for (Node n : r.adjacent) {
                if (n.marked = false) {
                    n.marked = true;
                    stack.push(n);
                }
            }
            visit(r);
        }
    }

    void bfs() {
        bfs(0);
    }

    void bfs(int index) {
        Node root = nodes[index];
        Queue<Node> queue = new Queue<Node>();
        queue.enqueue(root);
        root.marked = true;

        while (!queue.isEmpty()) {
            Node r = queue.dequeue();
            for (Node n : r.adjacent) {
                if (n.marked == false) {
                    n.marked = true;
                    queue.enqueue(n);
                }
            }
            visit(r);
        }
    }

    void dfsR(Node r) {
        if (r == null) return;
        r.marked = true;
        visit(r);

        for (Node n : r.adjacent) {
            if (n.marked == false) {
                dfsR(n);
            }
        }
    }

    void dfsR() {
        dfsR(0);
    }

    void dfsR(int index) {
        Node r = nodes[index];
        dfsR(r);
    }

    void visit(Node n) {System.out.print(n.data + " ");}
}

public class Test {
    public static void main (String[] args) {
        Graph g = new Graph(9);
        g.addEdge(0, 1);
        g.addEdge(1, 2);
        g.addEdge(1, 3);
        g.addEdge(2, 4);
        g.addEdge(2, 3);
        g.addEdge(3, 4);
        g.addEdge(3, 5);
        g.addEdge(5, 6);
        g.addEdge(6, 7);
        g.addEdge(6, 8);
        g.dfs();
        g.bfs();
        g.dfsR();
    }
}
```

</br>

※ 출처 : [Graph 검색 DFS, BFS 구현 in Java](https://www.youtube.com/watch?v=_hxFgg7TLZQ&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
