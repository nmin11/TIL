## Selection Sort 개념

배열을 돌면서 가장 작은 값을 찾아내면서 맨 앞으로 옮기는 정렬 방식이다.  
초기의 가장 작은 값은 시작값으로 지정하고, 배열을 loop하면서 보다 작은 값이 있으면 가장 작은 값으로 지정한다.  
그리고 찾아낸 가장 작은 값을 배열의 맨 앞 요소와 교체해준다.  
이런 식으로 배열의 길이만큼 반복하며 정렬해준다.

</br>

가장 작은 값을 찾아내기 위한 배열 내 loop를 다시 배열의 길이만큼 찾아내야 하기 때문에 **O(n²)** 의 시간복잡도를 가진다.  
한 번 배열을 돌 때마다 정렬해야 하는 요소도 하나씩 줄어들지만, 그래도 square의 절반의 면적이 나오기 때문에 O(n²) 시간복잡도를 가진다고 말한다.

</br>

## Java로 구현하기

```java
public class Test {
    public static void selectionSort(int[] arr) {
        selectionSort(arr, 0);
    }

    public static void selectionSort(int[] arr, int start) {
        if (start < arr.length - 1) {
            int min_index = start;
            for (int i = start; i < arr.length; i++) {
                if (arr[i] < arr[min_index]) min_index = i;
            }
            swap(arr, start, min_index);
            selectionSort(arr, start + 1);
        }
    }

    private static void swap(int[] arr, int i1, int i2) {
        int tmp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp;
    }

    private static void printArray(int[] arr) {
        for (int data : arr) {
            System.out.print(data + ", ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {3,6,1,8,2,4};
        printArray(arr);
        selectionSort(arr);
        printArray(arr);

        /*
        출력 결과
        3, 6, 1, 8, 2, 4
        1, 2, 3, 4, 6, 8
        */
    }
}
```

## Reference

- [엔지니어대한민국 님 - Selection Sort Java로 구현하기](https://www.youtube.com/watch?v=uCUu3fF5Dws&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
