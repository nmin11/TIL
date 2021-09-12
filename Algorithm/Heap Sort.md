## What is Heap?

최대값이나 최소값을 찾아내는 연산을 빠르게 찾아내기 위해 고안된, **완전이진트리** 를 기본으로 한 자료구조이다.  
완전이진트리는 노드의 맨 마지막 리프 부분을 제외하고는 모든 level이 완전하게 채워져 있으며, 가능하면 왼쪽부터 채워진 구조이다.  
그리고 Heap에는 **Min-Heap**과 **Max-Heap**이 있다.  
Min-Heap은 부모 노드에 자신보다 작은 값을 둬서 트리의 루트에는 가장 작은 값이 오게 한다.  
반대로 Max-Heap은 부모 노드에 자신보다 큰 값을 둬서 트리의 루트에는 가장 큰 값이 오게 한다.  
Min-Heap에 대해서 알면 Max-Heap의 구현도 간단해지니 Min-Heap을 한 번 살펴보자.

</br>

## Min-Heap에 노드 삽입하기

우선 완전이진트리의 맨 끝에 추가한다.  
추가한 이후에, 자신의 부모 노드와 비교해서 자신의 값이 더 작으면 부모와 자리를 바꾼다.  
이 작업을 삽입한 값이 부모의 값보다 크거나, 아니면 루트에 도달하게 될 때까지 반복한다.  
이러한 작업은 트리에서 한 레벨씩 올라가면서 경우의 수가 절반씩 떨어지게 되니 O(log n)의 시간복잡도를 가진다.

</br>

## Min-Heap에서 노드 꺼내오기

Min-Heap은 가장 작은 값을 루트에 두기 때문에 최소값을 빼내는 것은 간편하다.  
그런데 루트의 값을 뺀 다음에는 추가적인 연산이 필요하다.  
우선, 완전이진트리의 조건을 해치지 않기 위해, 맨 마지막 노드를 가져와서 루트에 넣어준다.  
이후, 새로 들어온 루트의 노드와 자식들을 비교하면서, 더 작은 값과 새 값의 위치를 바꿔준다.  
이러한 작업을 자식 노드의 값 두개가 둘 다 자신의 값보다 크거나, 트리의 leaf에 도달하게 될 때까지 반복한다.  
이 작업은 삽입 과정과 마찬가지로 O(log n)의 시간복잡도를 가진다.  
한 번 위치를 변경해줄 때마다 가야 할 길이 절반씩 줄어들기 때문이다.

</br>

## Heap Sort에 Binary Heap이 필요한 이유

Binary Heap은 배열로 쉽게 표현이 가능하며, 공간 활용에도 효율적이다.  
부모 노드가 인덱스 i에 저장되어 있다면 왼쪽 자식의 인덱스는 `2 * i + 1`로 계산할 수 있고, 오른쪽 자식은 `2 * i + 2`로 계산할 수 있다.

</br>

## 오름차순 정렬을 위한 Heap Sort Algorithm

1. 입력받은 데이터를 통해서 Max-Heap을 만든다.
2. Heap에서 가장 큰 값이 루트에 있게 된다.  
   루트의 값을 마지막 값과 교체하고 Heap의 사이즈를 1씩 줄인다.  
   마지막으로 Heapify, 즉, 변경된 루트 값을 위해 다시 Max-Heap으로 만들어주는 작업을 한다.
3. Heap의 사이즈가 1보다 클 때까지 위의 작업을 반복한다.

</br>

## Max Heap으로 오름차순 정렬하기 (Java)

```java
public class HeapSort {
    public void sort(int arr[]) {
        int n = arr.length;

        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            heapify(arr, i, 0);
        }
    }

    void heapify(int arr[], int n, int i) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && arr[l] < arr[largest]) {
            largest = l;
        }
        if (r < n && arr[r] < arr[largest]) {
            largest = r;
        }

        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            heapify(arr, n, largest);
        }

        static void printArray(int arr[]) {
            int n = arr.length;
            for (int i = 0; i < n; i++) {
                System.out.print(arr[i] + " ");
            }
            System.out.println();
        }

        public static void main(String[] args) {
            int arr[] = {12,11,13,5,6,7};
            int n = arr.length;

            HeapSort ob = new HeapSort();
            ob.sort(arr);

            System.out.println("Sorted array is");
            printArray(arr);

            /*
            출력 결과
            Sorted array is
            5 6 7 11 12 13
            */
        }
    }
}
```

</br>

## Reference

- [엔지니어대한민국 - Binary Heaps (Min-Heaps and Max-Heaps)](https://www.youtube.com/watch?v=jfwjyJvbbBI&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
- [GeeksforGeeks - Heap Sort](https://www.geeksforgeeks.org/heap-sort/)
