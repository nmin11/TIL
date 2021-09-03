## Hash Table의 간단한 활용 사례

만약 어떤 사람이 유튜브 영상을 불법 복제하여 자기 계정으로 업로드를 시도하게 되면, 유튜브는 '중복되는 동영상'이라며 거절하게 된다.  
전 세계 유튜브 동영상이 얼마나 많은데 이런 작업이 가능한걸까?  
바로 Hash Table이 이와 같은 문제를 해결해주는 것이다.

</br>

## Hash Table의 작동 원리

```
F(key) → Hash Code → Index → Value
```

우선 검색하고자 하는 key 값을 입력받아서, 해쉬 함수를 돌려 Hash Code를 얻어낸다.  
이 Hash Code를 배열의 Index로 환산해서 데이터에 접근하는 방식의 자료구조이다.  
여기서 key 값은 숫자나 문자열, 혹은 File이 될 수도 있다.  
그리고 해쉬 함수는, 특정한 규칙을 이용해서 입력받은 key 값으로 동일한 Hash 코드를 만들어낸다.

</br>

## Hash Table의 특징

Hash Table의 가장 큰 장점은 검색 속도가 빠르다는 점이다.  
그 이유를 살펴보자면 이렇다.  
일단 해쉬 함수를 이용해서 만든 Hash Code는 정수가 된다.  
그리고 배열 공간을 고정된 크기만큼 만들어놓고, Hash Code를 배열 갯수만큼 나머지 연산을 해서 배열에 나눠 담는다.  
그 말은 즉, Hash Code 자체가 index로 활용되기 때문에 배열 내에서 검색을 할 필요가 없게 되고, Hash Code로 배열의 위치를 바로 찾아낼 수 있게 된다.

</br>

그런데 Hash Table도 특수한 경우에는 속도가 느려질 수 있다.  
간단한 사례로, 주인이 손님을 이름 별로 빨리 찾기 위해서 '김 씨', '이 씨', '박 씨', 이렇게 성씨에 따라서 손님에게 방을 배정해주었다고 가정해보자.  
그런데 불행하게도, '김 씨' 손님만 자꾸 들어오게 되면 '김 씨'의 방에만 손님이 꽉 차게 되고 다른 방은 텅 비게 되어버린다.  
이런 경우 때문에 방을 만들 때 규칙을 만드는게 매우 중요하다.  
그리고 이런 규칙을 만들어주는 과정이 바로 해쉬 함수의 Algorithm이다.  
'김 씨' 방만 꽉차게 된 사례에서처럼, 한 방에만 데이터가 여러 개 들어가게 되면 **'충돌 현상이 생긴다'** 는 의미에서 **'collison이 일어난다'** 고 말한다.  
Hash Table의 최대 장점은 검색 시간이 O(1)의 복잡도를 가진다는 점이다.  
하지만 collison이 많은 경우, 최대 검색 시간이 O(n)의 복잡도를 갖게 될 수 있다. **(O(1) ~ O(n))**  
따라서 해쉬 함수의 Algorithm은 입력 받은 key를 가지고 얼마나 골고루 잘 분배를 하느냐에 따라 좋은 Algorithm인지 결정된다.

</br>

## Hash Algorithm & Collison

Hash 함수는 때로 서로 다른 key 값으로 동일한 Hash Code를 만들어내기도 한다.  
그 이유는, key 값은 문자열이고 가짓수가 무한한 데 반해서, Hash Code는 정수 범위에서 제공해야 하기 때문에 Algorithm이 아무리 좋아도 어떤 key들은 중복되는 Hash Code를 가질 수 밖에 없다.  
그리고 때로는, Hash Algorithm이 서로 다른 Hash Code들을 만들었는데, 배열이 한정되어 있으므로 같은 방에 배정 받는 경우도 있을 것이다.  
이처럼 서로 다른 key를 넣었는데 동일한 Hash Code가 만들어져서 한 방에 들어왔든, Hash Code는 다른데 index를 환산할 때 같은 방을 배정받았든 하나의 배열에 겹쳐서 저장되어야 하는 경우를 모두 **Collison** 이라고 한다.  
이 Collison을 최소화하기 위해서 좋은 Hash Algorithm을 만드는 일은 Hash Table에서 매우 중요한 이슈이다.

</br>

## Java로 구현하기

```java
import java.util.LinkedList;

class HashTable {
    class Node {
        //node에는 검색할 key가 있고, 검색값을 보여줄 value가 있다.
        String key;
        String value;
        //node 생성 시 key와 value를 받아서 할당
        public Node(String key, String value) {
            this.key = key;
            this.value = value;
        }
        //get
        String value() {
            return value;
        }
        //set
        void value(String value) {
            this.value = value;
        }
    }

    //데이터를 저장할 LinkedList 배열, node들이 들어가게 될 것
    LinkedList<Node>[] data;

    //HashTable 선언 시 size를 미리 지정
    HashTable(int size) {
        this.data = new LinkedList[size];
    }

    //가장 핵심이 되는 함수
    //이번 예제에서는 문자열의 ASCII 값을 다 더해서 Hash Code를 만든다.
    int getHashCode(String key) {
        int hashcode = 0;
        for (char c : key.toCharArray()) {
            hashcode += c;
        }
        return hashcode;
    }

    //이번 예제에서는 Hash Code를 배열의 길이로 나눈 나머지를 인덱스로 갖는 규칙을 세운다.
    int convertToIndex(int hashcode) {
        return hashcode % data.length;
    }

    //index로 배열 방을 찾은 이후,
    //배열 방의 node가 여러 개 존재하는 경우
    //key를 가지고 해당 node를 찾아오는 함수
    Node searchKey(LinkedList<Node> list, String key) {
        if (list == null) return null;
        for (Node node : list) {
            if (node.key.equals(key)) {
                return node;
            }
        }
        return null;
    }

    //데이터를 저장하는 함수
    void put(String key, String value) {
        int hashcode = getHashCode(key);
        int index = convertToIndex(hashcode);
        LinkedList<Node> list = data[index];
        if (list == null) {
            list = new LinkedList<Node>();
            data[index] = list;
        }
        //혹시 넣으려는 key를 이미 가지고 있는지 확인
        Node node = searchKey(list, key);
        if (node == null) {
            //이미 갖고 있지 않은 경우 새로운 node를 배열에 넣어준다.
            list.addLast(new Node(key, value));
        } else {
            //이미 갖고 있는 경우 해당 node의 값을 대체해준다.
            node.value(value);
        }
    }

    String get(String key) {
        int hashcode = getHashCode(key);
        int index = convertToIndex(hashcode);
        LinkedList<Node> list = data[index];
        Node node = searchKey(list, key);
        return node == null ? "Not found" : node.value();
    }
}

public class Test {
    public static void main (String[] args) {
        HashTable h = new HashTable(3);
        h.put("loko", "He is pretty");
        h.put("jin", "She is a model");
        h.put("hee", "She is an angel");
        h.put("min", "He is cute");
        h.put("loko", "He is beautiful");

        System.out.println(h.get("loko"));
        System.out.println(h.get("jin"));
        System.out.println(h.get("hee"));
        System.out.println(h.get("min"));
        System.out.println(h.get("jae"));

        /*
        출력 :
        He is beautiful
        She is a model
        She is an angel
        He is cute
        Not found
        */
    }
}
```

</br>

## Reference

- [엔지니어대한민국 - HashTable에 대해 알아보고 구현하기](https://www.youtube.com/watch?v=Vi0hauJemxA&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
