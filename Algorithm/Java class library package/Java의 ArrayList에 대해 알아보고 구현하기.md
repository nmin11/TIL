## Java의 고정된 배열 사이즈

다른 언어에서는 배열에 데이터가 추가되면 자동으로 사이즈가 늘어나는 방식으로 설계가 되어있다.  
하지만 Java에서는 배열을 선언할 때 사이즈를 입력해주어야만 한다.

</br>

## ArrayList에 대해서

다른 언어와 마찬가지로 Java에서도 배열의 size를 유동적으로 활용할 수 있게 해준다.  
그럼에도 불구하고 ArrayList의 검색 시간은 똑같이 O(1)의 복잡도를 가진다.  
ArrayList은 공간이 다 차면 공간을 두배로 늘려서 검색할 때는 여전히 고정된 배열에서 검색을 진행한다.  
이 때, 사이즈를 두배로 늘린 뒤 기존의 값들을 복사하는 작업을 Doubling이라고 한다.  
Doubling 작업의 소요 시간은 기존의 데이터를 n이라고 할 때 O(n)의 시간이 소요된다.  
이러한 번거로운 작업에도 불구하고 ArrayList의 입력 시간은 O(1)이다.  
왜냐하면 Doubling을 할 때 그 이전 데이터는 절반이니 새로운 배열에 복사해야할 데이터의 양은 현재 배열 방 크기의 절반이다.  
새로운 방의 크기를 n이라고 했을 때, n/2 만큼 시간이 걸리게 되는 것이다.  
그 이전의 작업들을 모두 확인해보면 n/2 + n/4 + n/8 + ... 의 방식으로 시간이 소요되었을텐데, 이를 다 합쳐도 n보다 작다.  
따라서 n개의 데이터를 넣을 때는 n만큼 시간이 걸려서 O(n)의 시간복잡도를 가지며, 1개의 데이터를 넣을 때는 O(1)의 시간복잡도를 가진다.

</br>

## ArrayList 직접 구현해보기

```java
class ArrayList {
    private Object[] data;
    private int size;
    private int index;

    public ArrayList() {
        this.size = 1;
        this.data = new Object[this.size];
        this.index = 0;
    }

    public void add(Object obj) {
        if (this.index == this.size - 1) {
            doubling();
        }
        data[this.index] = obj;
        this.index++;
    }

    private void doubling() {
        this.size = this.size * 2;
        Object[] newData = new Object[this.size];
        for (int i = 0; i < data.length; i++) {
            newData[i] = data[i];
        }
        this.data = newData;
    }

    public Object get(int i) throws Exception {
        if (i > this.index - 1) {
            throw new Exception("ArrayIndexOutOfBound");
        } else if (i < 0) {
            throw new Exception("Negative Value");
        }
        return this.data[i];
    }

    public void remove(int i) throws Exception {
        if (i > this.index - 1) {
            throw new Exception("ArrayIndexOutOfBound");
        } else if (i < 0) {
            throw new Exception("Negative Value");
        }
        for (int x = i; x < this.data.length - 1; x++) {
            data[x] = data[x + 1];
        }
        this.index--;
    }
}
```

</br>

## 출처

[엔지니어대한민국 - 자바의 ArrayList에 대해 알아보고 구현하기](https://www.youtube.com/watch?v=I4_uFyjWZn4&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
