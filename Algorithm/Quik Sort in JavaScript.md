## Not In Place

정렬할 때 가장 간단한 배열은 요소가 없거나 하나만 있는 배열이다.  
따라서 모든 배열이 기본 배열이 될 때까지 큰 배열을 나눠야 한다.  
이 때 Quick Sort에서는 요소 하나를 기준 원소인 pivot으로 설정한다.  
pivot의 왼쪽에는 pivot보다 작은 값의 배열을 놓고 pivot의 오른쪽에는 pivot보다 큰 값을 놓는다.  
이후, pivot 왼쪽에 놓여진 배열에서 다시 pivot을 설정하고 배열을 pivot을 기준으로 나눈다.  
이 작업을 반복하면 결국 배열의 기본 단계인 원소가 하나만 있는 배열이 남게 된다.

```javascript
function quickSort(array) {
  if (array.length < 2) {
    return array;
  }

  const pivot = [array[0]];
  const left = [];
  const right = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else if (array[i] > pivot) {
      right.push(array[i]);
    } else {
      pivot.push(array[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}
```

Not In Place 방법은 **별도의 메모리 공간**이 필요하므로 데이터의 양이 많으면 공간적인 낭비가 심해져서 실제로는 잘 쓰이지 않는다.  
하지만 이 방법을 활용하면 중복되는 데이터는 순차적으로 pivot에 넣으면 되기 때문에, 정렬하기 전 중복 데이터의 순서가 바뀌지 않는 **stable**한 정렬을 구현할 수 있다.

</br>

## In Place

가운데 원소를 pivot으로 설정하고 가장 왼쪽 요소와 가장 오른쪽 요소를 시작점으로 잡는다.  
가장 왼쪽부터 값을 pivot 값과 비교하여 pivot보다 큰 값이 나타날 때까지 오른쪽으로 이동한다.  
그리고 가장 오른쪽부터 마찬가지로 값을 pivot 값과 비교하여 pivot보다 작은 값이 나타날 때까지 왼쪽으로 이동한다.  
각자 해당하는 값을 발견했다면, pivot보다 큰 왼쪽 값과 pivot보다 큰 오른쪽 값을 서로 교환한다.  
이 작업을 반복한다.  
반복하던 중, 왼쪽 인덱스가 오른쪽 인덱스보다 커지면 이동을 멈추고 그 자리에서 배열을 둘로 나눈다.  
이후 각 배열에서 똑같은 작업을 재귀 호출하여 정렬한다.

```javascript
function quickSort(array, left = 0, right = array.length - 1) {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  const pivot = array[mid];
  const partition = divide(array, left, right, pivot);

  quickSort(array, left, partition - 1);
  quickSort(array, partition, right);

  function divide(array, left, right, pivot) {
    while (left <= right) {
      while (array[left] < pivot) {
        left++;
      }

      while (array[right] > pivot) {
        right--;
      }

      if (left <= right) {
        let swap = array[left];
        array[left] = array[right];
        array[right] = swap;
        left++;
        right--;
      }
    }
    return left;
  }
  return array;
}
```

이 방법은 추가적인 공간을 필요로 하지 않기 때문에 **메모리 공간이 절약**된다는 장점이 있다.  
하지만 중복값의 위치가 바뀔 수 있으므로 **unstable**한 정렬 방법이다.

</br>

## Big O

- Worst Case : O(n²)
- Best Case : O(nlog₂n)
