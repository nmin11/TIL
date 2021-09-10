## Bubble Sort 개념

앞에서부터 2개씩, 인접한 요소들끼리 비교해서 작은 값을 앞으로, 큰 값을 뒤로 배치한다.  
(맨 뒤에서부터 시작하는 것도 가능하다.)  
이 작업을 배열의 끝까지 도달하면서 정렬하는 방법이다.  
그렇게 한번 배열의 끝까지 도달하는 과정을 거쳤다면 해당 배열의 맨 마지막 요소는 해당 배열에서 가장 큰 값이 된다.  
한번 loop를 돌 때마다 끝 쪽에 요소 하나씩은 정해지니, 하나씩 비교하는 loop 자체를 배열의 길이만큼 돌려야 한다.  
배열 내 요소의 갯수만큼 반복하는 작업을 다시 배열 내 요소의 갯수만큼 순회하게 되니 이 작업은 **O(n²)** 의 시간복잡도를 가진다.  
물론 인접 요소끼리 비교하는 loop를 한번 돌 때마다 비교해야 하는 요소가 하나씩 빠지기는 하지만, 결국 square에서 절반의 면적이 나오기 때문에 O(n²)으로 표시한다.

</br>

## 대한민국엔지니어 님의 코드 구현

```java
public class Test {
    private static void bubbleSort(int[] arr) {
        //재귀함수 호출
        //처음에는 모든 요소가 정렬이 안되어있으니 배열의 끝까지 인접한 요소 비교 및 정렬
        bubbleSort(arr, arr.length - 1);
    }

    private static void bubbleSort(int[] arr, int last) {
        if (last > 0) {
            for (int i = 1; i <= last; i++) {
                if (arr[i - 1] > arr[i]) {
                    swap(arr, i - 1, i);
                }
            }
            //맨 마지막 1개는 정렬 완료
            //그러므로 맨 마지막만 빼고 다시 인접한 요소 비교 및 정렬
            bubbleSort(arr, last - 1);
        }
    }

    public static void swap(int[] arr, int source, int target) {
        int tmp = arr[source];
        arr[source] = arr[target];
        arr[target] = tmp;
    }

    public static void printArray(int[] arr) {
        for (int data : arr) {
            System.out.print(data + ", ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {3,5,4,2,1};
        printArray(arr);
        bubbleSort(arr);
        printArray(arr);

        /*
        출력 결과
        3, 5, 4, 2, 1
        1, 2, 3, 4, 5
        */
    }
}
```

</br>

## GeeksforGeeks 최적화 코드

위 방법은 배열이 어떤지에 상관 없이 항상 O(n²) 시간복잡도를 가진다.  
심지어 배열이 이미 정렬되어 있는 경우에도 말이다.  
boolean 타입을 하나 선언해서, 내부의 loop가 도는 동안 swap 과정이 일어났는지 체크해주고, 내부 loop동안 한 번도 swap이 발생하지 않았다면 전체 loop를 break함으로써, 조금이라도 더 나은 Algorithm을 구현할 수 있다.

```java
class GFG {
    static void bubbleSort(int arr[], int n) {
        int i, j, tmp;
        boolean swapped;
        for (i = 0; i < n - 1; i++) {
            swapped = false;
            for (j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                    swapped = true;
                }
            }

            if (swapped == false) break;
        }
    }

    static void printArray(int arr[], int size) {
        for (int i = 0; i < size; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String args[]) {
        int arr[] = {64,34,25,12,22,11,90};
        int n = arr.length;
        bubbleSort(arr, n);
        System.out.println("Sorted array: ");
        printArray(arr, n);

        /*
        출력 결과
        Sorted array:
        11 12 22 25 34 64 90
        */
    }
}
```

- **최악의 시간복잡도 and 평균 시간복잡도** : O(n²).  
  최악의 경우는 배열이 반대로 정렬되어 있는 경우이다.
- **최선의 시간복잡도** : O(n).  
  배열이 이미 정렬되어 있는 경우가 이에 해당한다.

</br>

## Reference

- [엔지니어대한민국 님 - Bubble Sort Java로 구현하기](https://www.youtube.com/watch?v=YbsQiiubO74&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
- [GeeksforGeeks - Bubble Sort](https://www.geeksforgeeks.org/bubble-sort/)
- [알고리즘 도감 앱](https://play.google.com/store/apps/details?id=wiki.algorithm.algorithms&hl=ko&gl=US)
