## What is Quick Sort?

기준점을 잡고 해당 기준점보다 작으면 왼쪽으로, 크면 오른쪽으로 옮긴다.  
이 때, 기준점 양 옆으로 배열이 partition 2개로 나뉘는데, 왼쪽 따로 정렬하고, 또 오른쪽 따로 정렬하는 작업을 재귀적으로 반복하면 완전히 정렬된 배열을 얻을 수 있게 된다.

</br>

![Quick Sort 재귀 호출 방식](https://user-images.githubusercontent.com/75058239/128834719-553f007d-c379-472a-809e-5b5708e3c78b.png)

</br>

## Quick Sort의 시간 복잡도

평균적으로 O(n log n)이라고 볼 수 있다.  
최악의 경우 O(n²)의 복잡도가 나오기는 하지만 보통의 경우 O(n log n)이라고 부른다.  
O(n log n)이라고 보는 이유를 살펴보자.  
일단 파티션을 나누는 횟수는 n번이다.  
파티션의 데이터가 낱개가 될 때까지 나누게 되는 것이다.  
그런데 한번 나누면 두번째 나눌 때에는 n을 나눈 결과를 가지고 또 나누기 때문에 검색해야 하는 데이터가 절반씩 줄어든다.  
그렇기 때문에 보통 O(n log n)의 복잡도를 가진다고 말한다.

</br>

그러나 정말 만약의 경우에, 중간값을 pivot으로 잡았는데 그 값이 0이고 배열에서 가장 작은 값이라고 한다면 0 하나랑 나머지 값들 전체를 파티션으로 나누게 되기 때문에 비대칭한 파티션이 되어버린다.  
이 다음에 퀵 정렬을 다시 진행해나가고자 하는데 공교롭게도 중간값으로 찾은 pivot이 1이며, 또다시 파티션 중 가장 작은 값이 되면 다시금 비대칭적인 파티션을 만들고 비효율적인 연산을 하게 된다.  
만약 퀵 정렬이 계속 이런 식으로만 진행되게 된다면 O(n²) 시간복잡도를 갖는다.

</br>

## Java 코드로 구현하기

```java
public class Test {
    private static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
        return arr;
    }

    private static void quickSort(int[] arr, int start, int end) {
        int part2 = partition(arr, start, end);

        if (start < part2 - 1) {
            quickSort(arr, start, part2 - 1);
        }

        if (part2 < end) {
            quickSort(arr, part2, end);
        }
    }

    private static int partition(int[] arr, int start, int end) {
        int pivot = arr[(start + end) / 2];

        while (start <= end) {
            while (arr[start] < pivot) start++;
            while (arr[end] > pivot) end--;

            if (start <= end) {
                swap (arr, start, end);
                start++;
                end--;
            }
        }
        return start;
    }

    private static void swap(int[] arr, int start, int end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
    }
}
```
