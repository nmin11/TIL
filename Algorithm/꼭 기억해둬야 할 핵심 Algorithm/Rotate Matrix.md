## Problem

N X N의 2차원 배열이 있다.  
이 2차원 배열을 In Place 방식으로(별도의 저장공간을 사용하지 않고) 90도 회전시켜야 한다.

</br>

## Approach

2차원 배열을 Layer 단위로 나눠서, 가장 외곽의 Layer부터 90도 회전을 시키는 방식으로 접근한다.

</br>

(이미지 첨부 rotate matrix 외곽부터)

</br>

그림에서 보이는 것처럼, 각 색깔의 요소들을 서로 swap해준다.  
swap해주는 방식은 다음과 같이 임시 변수를 활용해서 하나씩 꺼내주고 집어넣어 주는 작업을 반복한다.

</br>

(이미지 첨부 rotate matrix 임시 변수 활용)

</br>

위와 같은 작업을 모든 Layer에 적용해야 하는데, 안쪽 Layer로 들어갈수록 시작점 index는 하나씩 증가하고, 끝나는 index는 하나씩 감소하는 것을 확인할 수 있다.  
이를 그림으로 표현하면 다음과 같다.

</br>

(이미지 첨부 rotate matrix 내 바꿀 배열들의 위치)

</br>

이제, 다음 파트들을 서로 swap해주는 로직이 필요하다.

</br>

(이미지 첨부 rotate matrix 서로 바꿀 요소들)

</br>

이를 정리하면 다음과 같은 Loop를 도출해낼 수 있다.

```
LOOP : s = 0, e = 4
    s++, e--
    LOOP : i = s -> e
        j = e -> s
        tmp = [s][i]
        [s][i] = [i][e]
        [i][e] = [e][j]
        [e][j] = [j][s]
        [j][s] = tmp
```

</br>

## Java 코드 구현

```java
private static int[][] rotateImage(int[][] image) {
    int tmp;
    for (int s = 0, e = image.length - 1; s < e; s++, e--) {
        for (int i = s, j = e; i < e; i++, j--) {
            tmp = image[s][i];
            image[s][i] = image[i][e];
            image[i][e] = image[e][j];
            image[e][j] = image[j][s];
            image[j][s] = tmp;
        }
    }

    return image;
}
```

</br>

## Reference

- [엔지니어대한민국 님 - Rotate Matrix](https://www.youtube.com/watch?v=Z6QwmMQYZr8&ab_channel=%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)
