```java
F (n, r) {
    if (n <= 0) return 0;
    else if (n == 1) return r[n] = 1;
    return r[n] = F(n - 1, r) + F(n - 2, r);
}
```

이전의 'Big-O' 표기법 문서에서도 확인했던 코드이지만 사실 위의 코드는 비효율적이다.  
왜냐하면 동일한 호출을 반복해서 하는 경우가 발생하기 때문이다.

```java
F (n, r) {
    if (n <= 0) return 0;
    else if (n == 1) return r[n] = 1;
    else if (r[n] > 0) return r[n];
    return r[n] = F(n - 1, r) + F(n - 2, r);
}
```

추가한 else if문의 코드는 결과를 반환할 배열 방에 기존에 계산해 온 결과가 있는지를 확인한다.  
만약에 이미 계산한 이력이 있다면 재귀를 호출하지 않고 그 값을 반환하게 된다.

</br>

![Fibonacci 최적화](https://user-images.githubusercontent.com/75058239/126898093-595eb120-b50a-4ce9-9739-46fc140c28f8.png)

</br>

※ 출처 : [엔지니어대한민국 - Fibonacci 수열의 시간 복잡도](https://www.youtube.com/watch?v=VcCkPrGaKrs&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
