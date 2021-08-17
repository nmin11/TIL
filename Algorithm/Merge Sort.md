## 기본 원리

우선 2개의 정렬된 배열이 있다고 가정해보자.  
이 2개의 배열을 하나의 정렬된 배열로 만들고 싶다면, 두 배열의 첫번째 인덱스를 비교해가면서 더 작은 값을 빼내어 새로 만들 배열에 추가해주면 된다.

</br>

Merge Sort는 배열을 쪼개는 과정부터 시작한다.  
우선 각 배열의 길이가 2가 될 때까지 배열을 계속해서 둘로 나눈다.  
다 쪼개졌으면 위에서 살펴본 방식대로 배열 안의 값들을 서로 비교하면서 작은 값을 먼저 삽입한다.  
이렇게 각 배열의 길이가 2이고, 그 안에서 정렬된 배열들을 똑같은 방법으로 길이가 4이며, 그 안에서 정렬된 배열로 합쳐준다.  
이런 식으로 다시 원본 배열의 전체 길이가 될 때까지 합치면서 돌아온다.  
이렇듯 함수가 호출될 때마다 절반씩 잘라서 재귀적으로 함수를 호출하고, 작은 조각부터 2개씩 병합해서 정렬된 배열을 merge 해나가는 과정을 Merge Sort라고 한다.

</br>

## 시간 복잡도

n개 만큼 log n 번 돌기 때문에 O(n log n)의 시간 복잡도를 가진다.  
Binart Search에서 한번 검색할 때마다 검색할 양이 절반씩 떨어지는 것과 같은 이치이다.  
Quick Sort의 경우에도 최악의 조건이 아니면 O(n log n)의 시간 복잡도를 가진다.  
반면에 Merge Sort는 일정하게 O(n log n)의 시간 복잡도를 가진다.  
하지만 Merger Sort는 실행 시 별도의 저장 공간이 필요하기 때문에 만약 새로운 저장 공간을 가질 수 없다면 Quick Sort로 구현해야만 한다.

</br>

## Java로 구현하기

```java
public class Test {
    private static void mergeSort(int[] arr) {
        //Merge Sort는 임시 저장 공간이 필요 -> tmp는 임시 저장 공간
        int[] tmp = new int[arr.length];
        mergeSort(arr, tmp, 0, arr.length - 1);
    }

    public static void mergeSort(int[] arr, int[] tmp, int start, int end) {
        if (start < end) {
            int mid = (start + end) / 2;
            mergeSort(arr, tmp, start, mid);
            mergeSort(arr, tmp, mid + 1, end);
            merge(arr, tmp, start, mid, end);
        }
    }

    public static void merge(int[] arr, int[] tmp, int start, int mid, int end) {
        for (int i = start; i <= end; i++) {
            tmp[i] = arr[i];
        }
        //포인터들 설정
        int part1 = start;
        int part2 = mid + 1;
        int index = start;

        while (part1 <= mid && part2 <= end) {
            if (tmp[part1] <= tmp[part2]) {
                arr[index] = tmp[part1];
                part1++;
            } else {
                arr[index] = tmp[part2];
                part2++;
            }
            index++;
        }
        /*
        둘 중 한 배열이 먼저 끝나면 while문이 종료됨
        앞쪽 포인터의 남은 만큼을 다시 돌면서
        남은 값들을 붙여줌

        뒤쪽 데이터는 이미 최종 배열에 자리 잡고 있기 때문에
        신경 쓸 필요가 없음
        */
        for (int i = 0; i <= mid - part1; i++) {
            arr[index + i] = tmp[part1 + i];
        }
    }
}
```

</br>

## JavaScript로 구현하기

```javascript
const mergeSort = function (arr) {
  if (arr.length === 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = function (left, right) {
  let result = [];

  while (left.length !== 0 && right.length !== 0) {
    left[0] <= right[0]
      ? result.push(left.shift())
      : result.push(right.shift());
  }

  return [...result, ...left, ...right];
};
```

</br>

## 출처

- [엔지니어대한민국 님 - Merge Sort 구현하기](https://www.youtube.com/watch?v=QAyl79dCO_k&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
- [춤추는 개발자 님 - JavaScript로 Merge Sort 구현하기](https://jun-choi-4928.medium.com/javascript%EB%A1%9C-merge-sort-%EB%B3%91%ED%95%A9%EC%A0%95%EB%A0%AC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-c13c3eee6570)
