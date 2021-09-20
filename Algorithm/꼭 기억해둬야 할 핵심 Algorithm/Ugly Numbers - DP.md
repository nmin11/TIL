## Problem

Ugly Numbers는 2, 3, 5로만 나누어 떨어지는 수이다.  
11개 정도만 나열해보자면 `1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15`가 된다.  
참고로 맨 처음의 1은 편의상 들어가 있는 숫자이다.  
Ugly Numbers 문제에서는 숫자 n이 주어지며, n번째 Ugly Number를 리턴해야 한다.

</br>

## Example

```java
Input  : n = 7
Output : 8

Input  : n = 10
Output : 12

Input  : n = 15
Output : 24

Input  : n = 150
Output : 5832
```

</br>

## Dynamic Programming Solution

Ugly Number에서 1을 제외한 모든 수는 2, 3, 5로 나누어지기 때문에 다음과 같이 그룹을 3개로 나눌 수 있다.

1. 1×2, 2×2, 3×2, 4×2, 5×2, …
2. 1×3, 2×3, 3×3, 4×3, 5×3, …
3. 1×5, 2×5, 3×5, 4×5, 5×5, …

이로써 모든 subsequence가 `Ugly Numbers의 값 X 2,3,5`라는 사실을 알 수 있다.  
그렇기 때문에 **Merge Sort**와도 유사한 방식을 통해 3가지 subsequence에서 모든 Ugly Number를 찾아낼 수 있다.  
이를 위해 모든 단계마다 가장 작은 값을 구하고, 다음 단계로 넘어가는 절차를 밟는다.

</br>

### Approach

```java
1. Ugly Numbers를 위한 배열 선언 :  ugly[n]
2. 정해져있는 첫번째 Ugly Number에 대한 값 할당 :  ugly[0] = 1
3. 다음 Ugly Number를 찾아내기 위한 3가지 선택안들에 대해 변수 선언 :
        i2 = i3 = i5 =0;
4. 다음 Ugly Number를 찾기 위해 3가지 선택안들에 대한 initialize :
        next_mulitple_of_2 = ugly[i2]*2;
        next_mulitple_of_3 = ugly[i3]*3
        next_mulitple_of_5 = ugly[i5]*5;
5. 150개의 Ugly Numbers에 대한 배열을 채우기 위한 로직 :
For (i = 1; i < 150; i++ )
{
    next_ugly_no  = Min(next_mulitple_of_2,
                        next_mulitple_of_3,
                        next_mulitple_of_5);

    ugly[i] =  next_ugly_no

    if (next_ugly_no  == next_mulitple_of_2)
    {
        i2 = i2 + 1;
        next_mulitple_of_2 = ugly[i2]*2;
    }
    if (next_ugly_no  == next_mulitple_of_3)
    {
        i3 = i3 + 1;
        next_mulitple_of_3 = ugly[i3]*3;
     }
     if (next_ugly_no  == next_mulitple_of_5)
     {
        i5 = i5 + 1;
        next_mulitple_of_5 = ugly[i5]*5;
     }
}
6. 다음 Ugly Number 반환
```

</br>

### 로직의 작동 과정

```java
initialize
   ugly[] =  | 1 |
   i2 =  i3 = i5 = 0;

First iteration
   ugly[1] = Min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5)
            = Min(2, 3, 5)
            = 2
   ugly[] =  | 1 | 2 |
   i2 = 1,  i3 = i5 = 0  (i2 got incremented )

Second iteration
    ugly[2] = Min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5)
             = Min(4, 3, 5)
             = 3
    ugly[] =  | 1 | 2 | 3 |
    i2 = 1,  i3 =  1, i5 = 0  (i3 got incremented )

Third iteration
    ugly[3] = Min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5)
             = Min(4, 6, 5)
             = 4
    ugly[] =  | 1 | 2 | 3 |  4 |
    i2 = 2,  i3 =  1, i5 = 0  (i2 got incremented )

Fourth iteration
    ugly[4] = Min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5)
              = Min(6, 6, 5)
              = 5
    ugly[] =  | 1 | 2 | 3 |  4 | 5 |
    i2 = 2,  i3 =  1, i5 = 1  (i5 got incremented )

Fifth iteration
    ugly[4] = Min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5)
              = Min(6, 6, 10)
              = 6
    ugly[] =  | 1 | 2 | 3 |  4 | 5 | 6 |
    i2 = 3,  i3 =  2, i5 = 1  (i2 and i3 got incremented )

Will continue same way till I < 150
```

</br>

### Java 코드 구현

```java
import java.lang.Math;

class UglyNumber {
    int getNthUglyNo(int n) {
        int ugly[] = new int[n];
        int i2 = 0, i3 = 0, i5 = 0;
        int next_multiple_of_2 = 2;
        int next_multiple_of_3 = 3;
        int next_multiple_of_5 = 5;
        int next_ugly_no = 1;

        ugly[0] = 1;

        for (int i = 1; i < n; i++) {
            next_ugly_no = Math.min(next_multiple_of_2,
                                    Math.min(next_multiple_of_3,
                                            next_multiple_of_5));

            ugly[i] = next_ugly_no;
            if (next_ugly_no == next_multiple_of_2) {
                i2 += 1;
                next_multiple_of_2 = ugly[i2] * 2;
            }
            if (next_ugly_no == next_multiple_of_3) {
                i3 += 1;
                next_multiple_of_3 = ugly[i3] * 3;
            }
            if (next_ugly_no == next_multiple_of_5) {
                i5 += 1;
                next_multiple_of_5 = ugly[i5] * 5;
            }
        }

        return next_ugly_no;
    }

    public static void main(String[] args) {
        int n = 150;

        UglyNumber obj = new UglyNumber();
        System.out.println(obj.getNthUglyNo(n));
    }
}
```

### Complexity Analysis

- Time Complexity : O(N)
- Auxiliary Space : O(N)

</br>

## Using TreeSet in JAVA Solution

C++의 SET이나, Java의 TreeSet 활용하면 시간복잡도를 최적화할 수 있다.  
필자는 C++ 언어에 대해서는 일자무식이라 Java 언어의 방식에 대해서 정리해보겠다.

</br>

SET 자료구조는 모든 요소를 오름차순으로 정렬해주기 때문에 위에서 확인한 3가지 선택안들에 대해서 더 최적화해서 저장할 수 있다.

```java
import java.io.*;
import java.util.*;

class GFG {
    static long nthUglyNumber(int n) {
        TreeSet<Long> t = new TreeSet<>();
        t.add(1L);
        int i = 1;
        while (i < n) {
            long temp = t.pollFirst();
            t.add(temp * 2);
            t.add(temp * 3);
            t.add(temp * 5);
            i++;
        }

        return t.pollFirst();
    }

    public static void main(String[] args) {
        int n = 150;
        System.out.println(nthUglyNumber(n));
    }
}
```

### Complexity Analysis

- Time Complexity : O(N log N)
- Auxiliary Space : O(N)

</br>

## Reference

- [GeeksforGeeks - Ugly Numbers](https://www.geeksforgeeks.org/ugly-numbers/)
