## What is Big-O?

- Algorithm의 성능을 수학적으로 표현해주는 표기법
- Algorithm의 시간과 공간 복잡도를 표현할 수 있게 해줌
- Algorithm의 실제 러닝 타임을 표기해주기 보다는 데이터나 사용자의 증가에 따른 Algorithm의 성능을 예측하는 것이 목표

</br>

## O(1) constant time

```java
F (int[] n) {
    return (n[0] == 0) ? true : false;
}
```

입력 데이터의 크기에 상관 없이 언제나 일정한 시간이 걸리는 Algorithm

</br>

(이미지 첨부 O(1) 표기법)

</br>

## O(n) linear time

```java
F (int[] n) {
    for i = 0 to n.length
        print i;
}
```

입력 데이터의 크기에 비례해서 처리 시간이 걸리는 Algorithm

</br>

(이미지 첨부 O(n))

</br>

## O(n²) quadratic time

```java
F (int[] n) {
    for i = 0 to n.length
        for j = 0 to n.length
            print i + j;
}
```

n을 루프를 돌리면서, 그 안에서 n을 루프로 또 돌릴 때 n²이 된다.

</br>

(이미지 첨부 O(n²))

</br>

## O(nm) quadratic time

```java
F (int[] n, int[] m) {
    for i = 0 to n.length
        for j = 0 to m.length
            print i + j;
}
```

n을 m만큼 돌린다.  
n 스퀘어라고 착각할 수 있으니 꼭 잘 확인해야 한다.  
그래프는 n 스퀘어와 같다.

</br>

## O(n³) polynomial / cubic time

```java
F (int[] n) {
    for i = 0 to n.length
        for j = 0 to n.length
            for key = 0 to n.length
                print i + j + key;
}
```

n 스퀘어에 비해서 데이터 처리 시간이 급격하게 늘어난다.

</br>

(이미지 첨부 O(n³))

</br>

## O(2ⁿ) exponential time

O(n²)가 있어서 헷갈리지만, 둘은 너무나도 다른 Algorithm이다.  
Fibonacci 수열이 대표적인 예시이다.

```java
F (n, r) {
    if (n <= 0) return 0;
    else if (n == 1) return r[n] = 1;
    return r[n] = F(n - 1, r) + F(n - 2, r);
}
```

매번 함수가 호출될 때마다 재귀적으로 함수를 두번씩 호출한다.  
그 작업을 Tree의 높이만큼 반복하는 것이다.

</br>

(이미지 첨부 Fibonacci 재귀 호출 방식)

</br>

(이미지 첨부 O(2ⁿ))

</br>

그 밖에 m개씩 n번 늘어난다면 **O(mⁿ)** 이렇게 표기해주면 된다.

</br>

## O(log n)

대표적인 Algorithm은 **binary search(이진 검색)** 이다.  
이진 검색은 배열에서 중간을 검색한 뒤, key 값이 그것보다 작냐 크냐에 따라서 배열을 검색해 나가는 Algorithm이다.

```java
F (key, arr, start, end) {
    if (start > end) return -1;
    m = (start + end) / 2;
    if (arr[m] == key) return m;
    else if (arr[m] > key) return F(key, arr, start, m - 1);
    else return F(key, arr, m + 1, end);
}
```

</br>

(이미지 첨부 O(log n))

</br>

## O(sqrt(n))

sqrt는 제곱근을 구한다는 뜻이다.

</br>

(이미지 첨부 O(sqrt(n)))

</br>

## Drop constants

Big-O에서 상수는 과감하게 버린다.

```java
F (int[] n) {
    for i = 0 to n.length
        print i
    for i = 0 to n.length
        print i
}
```

O(2n)이라고도 볼 수 있지만, Big-O 표기법에서는 그냥 O(n)으로 표시한다.  
이는 러닝 타임을 재기 위한 것이 아니라 장기적으로 데이터의 증가에 따른 처리 시간의 증가율을 예측하기 위해서 만든 표기법이기 때문이다.  
여기서 상수는 고정되어 있기 때문에 언제나 상수 만큼씩만 영향을 미친다.

```java
F (int[] n) {
    for i = 0 to n.length
        for j = 0 to n.length
            print i + j;
    for i = 0 to n.length
        for j = 0 to n.length
            print i + j;
}
```

위와 같은 O(2n²)도 그냥 O(n²)으로 표시한다.
