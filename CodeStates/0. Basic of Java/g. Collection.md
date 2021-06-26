# Collection

어떤 데이터를 저장할 때, 가장 간단한 방법은 배열을 이용하는 것이다. 배열은 쉽게 생성하고 사용 가능하지만 저장할 수 있는 배열의 객체 수가 배열을 생성할 때 결정되기 때문에 불특정 다수의 객체를 저장하기에는 문제가 있다.  
이런 문제점을 해결하기 위해서 자바는 데이터를 저장하기 위해 널리 알려져 있는 자료구조를 바탕으로 객체들을 효율적으로 추가, 삭제, 검색할 수 있도록 그런 역할을 하는 컬렉션을 만들고, 관련된 인터페이스와 클래스를 포함시켜 두었다. 그리고 이들을 총칭해서 컬렉션 프레임워크라고 부르고 있다. 또한 몇 가지 인터페이스를 통해서, 다양한 컬렉션 클래스를 이용할 수 있도록 하고 있다.

</br>

![리스트](https://user-images.githubusercontent.com/75058239/123512184-01abca80-d6c1-11eb-99ef-0a1b2d95e0e5.png)

</br>

컬렉션 프레임워크의 주요 인터페이스로는 List, Set, Map이 있고, List와 Set은 객체를 추가, 삭제, 검색하는 방법에 많은 공통점이 있기 때문에 이 인터페이스들의 공통된 메소드만 모아 컬렉션 인터페이스로 정의해두고 있다. Map은 키와 값을 하나의 쌍으로 묶어서 관리하는 구조로 되어 있어, List와 Set과는 사용 방법이 완전히 다르다.

| 분류 |                     특징                     |             구현 클래스              |
| :--: | :------------------------------------------: | :----------------------------------: |
| List |      순서 유지 및 저장, 중복 저장 가능       | ArrayList, Vector, Stack, LinkedList |
| Set  |     순서 유지 및 저장, 중복 저장 불가능      |           HashSet, TreeSet           |
| Map  | 키와 값의 쌍으로 저장, 키는 중복 저장 불가능 |     HashMap, Hashtable, TreeMap      |

</br>

## List Collection

List 컬렉션은 객체를 일렬로 늘어놓은 구조를 가지고 있다. 객체를 인덱스로 관리하기 때문에 객체를 저장하면 자동 인덱스가 부여되고, 인덱스로 객체를 검색, 삭제할 수 있는 기능을 제공한다.  
List 컬렉션에서 공통적으로 사용 가능한 List 메소드는 다음과 같다.

|   기능    | 메소드                    | 설명                                      |       반환값       |
| :-------: | :------------------------ | :---------------------------------------- | :----------------: |
| 객체 추가 | add(E element)            | 주어진 객체를 배열 끝에 추가              |      boolean       |
|     ·     | add(int index, E element) | 주어진 인덱스에 객체 추가                 |        void        |
|     ·     | set(int index, E element) | 주어진 인덱스의 객체를 주어진 객체로 변경 |     기존 객체      |
| 객체 검색 | contains(Object o)        | 주어진 객체가 저장되어 있는지 여부        |      boolean       |
|     ·     | get(int index)            | 주어진 인덱스에 저장된 객체를 반환        | 해당 인덱스의 객체 |
|     ·     | isEmpty()                 | 컬렉션이 비어있는지 조사                  |      boolean       |
|     ·     | int size()                | 저장되어 있는 전체 객체 수를 반환         |        int         |
| 객체 삭제 | clear()                   | 저장된 모든 객체를 삭제                   |        void        |
|     ·     | remove(int index)         | 주어진 인덱스에 저장된 객체를 삭제        |    삭제된 객체     |
|     ·     | remove(Object o)          | 주어진 객체를 삭제                        |      boolean       |

</br>

## Iterator

자바의 컬렉션 프레임워크는 컬렉션에 저장된 요소를 읽어오는 방법을 Iterator 인터페이스로 표준화하고 있다. Collection 인터페이스에서는 Iterator 인터페이스를 구현한 클래스의 인스턴스를 반환하는 iterator() 메소드를 정의하여 각 요소에 접근하도록 하고 있다. 따라서 Collection 인터페이스를 상속받는 List와 Set 인터페이스에서도 iterator() 메소드를 사용할 수 있다.  
다음은 iterator 인터페이스에 선언된 메소드들이다.
| 메소드 | 설명 |
| :--: | :---- |
| hasNext() | 가져올 객체가 있으면 true를 반환하고 없으면 false를 반환 |
| next() | 컬렉션에서 하나의 객체를 가져옴 |
| remove() | 컬렉션에서 객체를 제거 |

※ Iterator의 예제들

```java
List<String> list = {"a", "b", "c"};
Iterator<String> iterator = list.iterator();
while(iterator.hasNext()) {
   String str = iterator.next();
   //객체가 존재하는 한 객체를 계속해서 가져옴
}

while(iterator.hasNext()){
	String str = iterator.next();
	if(str.equals("str과 같은 단어")){
		iterator.remove();
      //list의 객체들을 가져오면서 똑같은 문자열을 찾으면 해당 객체 제거
	}
}
```

</br>

## ArrayList

ArrayList는 List 인터페이스를 구현한 클래스이다. ArrayList에 객체를 추가하면, 객체가 인덱스로 관리된다는 점에서는 배열과 유사하다. 그러나 배열은 생성될 때 크기가 고정되고 사용 중 크기를 변경할 수 없는 반면에, ArrayList는 저장 용량을 초과한 객체들이 들어오면 자동으로 저장용량이 늘어난다.

```java
List<타입파라미터> 객체명 = new ArrayList<타입 파라미터>(초기 저장용량);

List<String> container1 = new ArrayList<String>();
//String타입의 객체를 저장하는 ArrayList, 이때 초기 용량은 10개 객체 저장가능

List<String> container2 = new ArrayList<String>(30);
//용량의 크기를 매개값으로 받아 ArrayList 객체 생성
```

ArrayList에 객체를 추가하면 인덱스 0부터 차례대로 저장된다. 그리고 특정 인덱스의 객체를 제거하면 바로 뒤 인덱스부터 마지막 인덱스까지 모두 앞으로 1씩 당겨진다. 따라서 빈번한 객체 삭제와 삽입이 일어나는 경우에는 LinkedList를 사용하는 것이 좋다.

</br>

## Stack

**LIFO와 FLFO 컬렉션**
</br>
LIFO(Last In First Out)는 나중에 넣은 객체가 먼저 빠져나가는 자료구조다. 반대로 FIFO(First In First Out)는 먼저 넣은 객체가 먼저 빠져나가는 구조를 말한다.  
컬렉션 프레임워크에는 LIFO 자료구조를 제공하는 Stack 클래스와 FIFO 자료구조를 제공하는 Queue 인터페이스를 제공한다.

</br>

![Stack, Queue](https://user-images.githubusercontent.com/75058239/123512212-1f792f80-d6c1-11eb-8501-699187835c54.png)

</br>

Queue 인터페이스를 구현한 대표적인 클래스는 LinkedList이다. LinkedList는 List 인터페이스를 구현했기 때문에 List 컬렉션이기도 하다.  
Stack 클래스는 LIFO 자료구조를 구현한 클래스이며, Stack 객체 생성 방법은 List 생성 방식과 유사하다.

```java
Stack<E> stack = new Stack<E>();
```

|   기능    |      메소드      |               설명               |
| :-------: | :--------------: | :------------------------------: |
| 객체 추가 | push(E element)  |   주어진 객체를 배열 끝에 추가   |
| 객체 삭제 |      pop()       |  가장 마지막에 추가된 객체 삭제  |
| 객체 조회 |     empty()      |      스택이 비어있는지 확인      |
| 객체 조회 |      peek()      |  가장 마지막에 추가된 객체 조회  |
| 객체 조회 | search(Object o) | 인자값으로 받은 데이터 위치 반환 |

</br>

## Map Collection

Map 컬렉션은 Key와 Value로 구성된 Entry 객체를 저장하는 구조를 가지고 있다. 여기서 Key와 Value 또한 모두 객체이다. 키는 중복 저장될 수 없지만 값은 중복 저장이 가능하다. 만약 기존에 저장된 Key와 동일한 Key로 값을 저장하면, 기존의 값은 없어지고 새로운 값으로 대체된다.  
Map 컬렉션에는 HashMap, Hashtable, TreeMap, SortedMap 등이 있다.  
다음은 Map 컬렉션에서 공통적으로 사용 가능한 Map 인터페이스의 메소드들이다.

| 기능 |           메소드            | 설명                                                            |
| :--: | :-------------------------: | :-------------------------------------------------------------- |
| 추가 |     put(K key, V value)     | 주어진 키로 값을 저장                                           |
| 검색 |   containsKey(Object key)   | 주어진 키가 있는지 여부 반환                                    |
| 검색 | containsValue(Object value) | 주어진 값이 있는지 여부 반환                                    |
| 검색 |       Set entrySet()        | 키와 값의 쌍으로 구성된 모든 Map.Entry 객체를 Set에 담아서 반환 |
| 검색 |       get(Object key)       | 주어진 키가 있는 값을 반환                                      |
| 검색 |           isEmpty           | 컬렉션이 비어있는지 확인                                        |
| 검색 |        Set keySet()         | 모든 키를 Set 객체에 담아서 반환                                |
| 검색 |           size()            | 저장된 키의 숫자를 반환                                         |
| 검색 |     Collection values()     | 저장된 모든 값을 Collection에 담아서 반환                       |
| 삭제 |           clear()           | 모든 Map.Entry 삭제                                             |
| 삭제 |     remove(Object key)      | 주어진 키와 일치하는 Map.Entry 삭제하고 값을 반환               |

Map 컬렉션에서 추가는 put() 메소드를 사용하고, 키로 객체를 찾아올 때는 get(), 삭제는 remove() 메소드를 사용한다.

</br>

## HashMap

HashMap은 Hash 함수를 통해 Key와 Value가 저장되는 위치를 결정하므로 사용자는 그 위치를 알 수 없고 삽입되는 순서와 들어 있는 위치 또한 관계가 없다.  
HashMap의 키로 사용할 객체는 hashCode()와 equals() 메소드를 재정의해서 동등 객체가 될 조건을 정해야 한다. 동등 객체, 즉 동일한 키가 될 조건은 HashSet과 동일하다. hashCode()의 반환값이 같아야 하고, equals() 메소드가 true를 반환해야 한다. 이렇듯 HashMap은 이름 그대로 Hashing을 사용하기 때문에 많은 양의 데이터를 검색하는 데 있어서 뛰어난 성능을 보인다.  
주로 Key 타입은 String을 많이 사용하는데, String은 문자열이 같을 경우 동등 객체가 될 수 있도록 hashCode()와 equals() 메소드가 재정의되어 있다. HashMap을 생성하기 위해서는 Key 타입과 Value 타입을 파라미터로 주고 기본 생성자를 호출하면 된다.

```java
Map<Key, Value> map = new HashMap<Key, Value>();
Map<Key, Value> map = new HashMap<Key, Value>(capacity, loadFactor);
```

Key와 Value의 타입은 기본 타입(byte, short, int, float, double, boolean, char)을 사용할 수 없고 클래스 및 인터페이스 타입만 가능하다. 더불어 HashMap은 Key와 Value에 null을 허용하지만 Hashtable은 그렇지 않다.

</br>

## Hashtable

Hashtable은 HashMap과 동일한 내부 구조를 가지고 있다. Hashtable도 키로 사용할 객체는 hashCode()와 equals() 메소드를 재정의해서 동등 객체가 될 조건을 정해야 한다.  
HashMap과는 달리 Key와 Value에 null을 허용하지 않는다. 두 번째 차이점은 Hashtable은 synchronized 메소드로 구성되어 있기 때문에 멀티 쓰레드가 동시에 이 메소드들을 실행할 수는 없고 하나의 쓰레드가 실행을 완료해야만 다른 쓰레드를 실행할 수 있다. 그래서 멀티 쓰레드 환경에서 안전하게 객체를 추가, 삭제할 수 있다. 이것을 '쓰레드가 안전하다'라고 말한다.

```java
Map<K, V> map = new Hashtable<K, V>();
Map<String, Integer> map = new Hashtable<String, Integer>();
