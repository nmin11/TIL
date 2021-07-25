## Stack의 4가지 기능

- pop() : 맨 마지막에 넣은 데이터를 가져오면서 지움
- push() : 새로운 데이터를 맨 위에 쌓아올림
- peek() : 맨 마지막 데이터를 확인
- isEmpty() : 스택에 데이터가 있는지 없는지 확인

</br>

## 코드로 구현해보기

```java
import java.util.EmptyStackException;

class Stack<T> {
    class Node<T> {
        private T data;
        private Node<T> next;

        public Node(T data) {
            this.data = data;
        }
    }

    private Node<T> top;

    public T pop() {
        if (top == null) {
            throw new EmptyStackException();
        }

        T itme = top.data;
        top = top.next;
        return item;
    }

    public void push(T item) {
        Node<T> t = new Node<T>(item);
        t.next = top;
        top = t;
    }

    public T peek() {
        if (top == null) {
            throw new EmptyStackException();
        }
        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }
}

public class Test {
    public static void main (String[] args) {
        Stack<Integer> s = new Stack<Integer>();
        s.push(1);
        s.push(2);
        s.push(3);
        s.push(4);
        System.out.println(s.pop());
        System.out.println(s.pop());
        System.out.println(s.peek());
        System.out.println(s.pop());
        System.out.println(s.isEmpty());
        System.out.println(s.pop());
        System.out.println(s.isEmpty());
    }
}
```

</br>

※ 출처 : [엔지니어대한민국 - Stack 구현하기 in Java](https://www.youtube.com/watch?v=whVUYv0Leg0&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
