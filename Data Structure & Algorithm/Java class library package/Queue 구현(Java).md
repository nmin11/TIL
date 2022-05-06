## Queue의 4가지 기능

- add() : 맨 마지막에 데이터를 삽입
- remove() : 맨 앞에서 데이터를 꺼냄
- peek() : 맨 앞 데이터를 확인
- isEmpty() : 큐에 데이터가 있는지 없는지 확인

</br>

## 코드로 구현해보기

```java
import java.util.NoSuchElementException;

class Queue<T> {
    class Node<T> {
        private T data;
        private Node<T> next;

        public Node(T data) {
            this.data = data;
        }
    }

    private Node<T> first;
    private Node<T> last;

    public void add(T item) {
        Node<T> t = new Node<T>(item);

        if (last != null) {
            last.next = t;
        }
        last = t;
        if (first == null) {
            first = last;
        }
    }

    public T remove() {
        if (first == null) {
            throw new NoSuchElementException();
        }

        T data = first.data;
        first = first.next;

        if (first == null) {
            last = null;
        }
        return data;
    }

    public T peek() {
        if (first == null) {
            throw new NoSuchElementException();
        }
        return first.data;
    }

    public boolean isEmpty() {
        return first == null
    }
}

public class Test {
    public static void main (String[] args) {
        Queue<Integer> s = new Queue<Integer>();
        q.add(1);
        q.add(2);
        q.add(3);
        q.add(4);
        System.out.println(q.remove());
        System.out.println(q.remove());
        System.out.println(s.peek());
        System.out.println(q.remove());
        System.out.println(s.isEmpty());
        System.out.println(q.remove());
        System.out.println(s.isEmpty());
    }
}

/*
1
2
3
3
false
4
true
*/
```

</br>

※ 출처 : [엔지니어대한민국 - Queue 구현하기 in Java](https://www.youtube.com/watch?v=W3jNbNGyjMs&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
