## Insertion Sort 개념

마치 손에서 카드 놀이를 하는 듯한 간단한 정렬 Algorithm이다.  
Insertion Sort에서 배열은 정렬된 부분과 정렬되지 않은 부분으로 나누어서 본다.  
정렬되지 않은 부분에서 값을 하나씩 꺼내와서, 정렬된 부분에서 해당 값이 있을 수 있는 올바른 위치에 배치한다.  
배열의 길이가 n인 배열을 오름차순으로 정렬하기 위한 세부적인 작동은 다음과 같다.

1. arr[1]부터 arr[n]까지 반복
2. 꺼내온 값(key)과 정렬된 부분 배열의 값들을 뒤쪽부터 차례대로 비교
3. key 값이 비교 대상보다 작은 경우, 정렬된 부분에서의 보다 앞의 값들과 계속해서 비교

</br>

## Java 구현

```java
class InsertionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    static void printArray(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int arr[] = {12,11,13,5,6};

        InsertionSort ob = new InsertionSort();
        ob.sort(arr);

        printArray(arr);

        /*
        출력 결과
        5 6 11 12 13
        */
    }
}
```

</br>

## Reference

- [GeeksforGeeks - Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
- [알고리즘 도감 앱](https://play.google.com/store/apps/details?id=wiki.algorithm.algorithms&hl=ko&gl=US)
