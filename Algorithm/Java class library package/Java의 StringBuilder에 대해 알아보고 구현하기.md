## StringBuilder를 사용하지 않았을 때의 문제점

```java
public String joinWords(String[] words) {
    String sentence = "";
    for (String w : words) {
        sentence += w;
    }
    return setence;
}
```

굉장히 단순해보이지만 상당히 무거운 작업이다.  
왜냐하면 두개의 문자열을 합칠 때마다 그 크기만큼의 새로운 문자열을 생성하고, 두개의 문자열에서 한 문자씩 복사해서 붙이는 작업을 하게 되기 때문이다.  
각 단어의 길이를 x라고 했을 때, x + 2x + 3x + ... + nx의 방식으로 로직이 수행된다.  
따라서 O(xn²)으로 표현할 수 있다.

</br>

## StringBuilder 활용하기

```java
public String joinWords(String[] words) {
    StringBuilder sb = new StringBuilder();
    for (String w : words) {
        sb.append(w);
    }
    return sb.toString();
}
```

StringBuilder는 클래스 안에 배열 공간을 미리 만들어두고, append() 메소드를 사용하면 만들어 둔 배열에 문자열을 바로 추가해준다.  
추가를 하다가 배열 공간이 부족해지면 공간을 늘려서 복사해주는 방식으로 작동한다.  
이렇게 복사하는 횟수가 현저히 줄어들게 되어 속도나 공간 면에서 매우 효율적이다.

</br>

## StringBuilder와 StringBuffer

StringBuilder는 동기화를 보장하지 않는다.  
반면에 StringBuffer는 동기화를 보장한다.  
StringBuffer는 비교적 느린 편이지만 멀티 쓰레드 환경에서 많이 사용된다.

</br>

## StringBuilder 직접 구현해보기

```java
class StringBuilder {
    private char[] value;
    private int size;
    private int index;

    StringBuilder() {
        size = 1;
        value = new char[size];
        index = 0;
    }

    public void append(String str) {
        if (str == null) str = "null";
        int length = str.length();
        ensureCapacity(length);
        for (int i = 0; i < str.length(); i++) {
            value[index] = str.charAt(i);
            index++;
        }
        //실제로 배열에 어떻게 추가되는지 확인하는 작업
        System.out.println(size + ", " + index);
    }

    public void ensureCapacity(int length) {
        if (index + length > size) {
            size = (size + length) * 2; //배열 공간이 부족할 경우 넉넉하게 2배로 해준다.
            char[] newValue = new char[size];
            for (int i = 0; i < value.length; i++) {
                newValue[i] = value[i];
            }
            value = newValue;
            System.out.println("*배열 확장* " + size + ", " + index);
        }
    }

    public String toString() {
        return new String(value, 0, index);
    }
}
public class Test {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append("loko");
        sb.append(" is");
        sb.append(" pretty");
        System.out.println(sb.toString());
    }
}
```

</br>

## 출처

[엔지니어대한민국 - 자바의 StringBuilder에 대해 알아보고 구현하기](https://www.youtube.com/watch?v=gc7bo5_bxdA&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
