Big-O 표기법

- O(1) : 상수 시간
- O(logN) : 로그 시간
- O(N) : 선형 시간
- O(NlogN) : 로그 선형 시간
- O(N²) : 이차 시간
- O(N³) : 삼차 시간
- O(2ⁿ) : 지수 시간

시간 제한 1초 문제를 풀 때 사용할 수 있는 시간 복잡도

- N < 500 : O(N³)
- N < 2,000 : O(N²)
- N < 100,000 : O(NlogN)
- N < 10,000,000 : O(N)

공간 복잡도 추정 방법

- `int a[1000]` : 4KB
- `int a[1000000]` : 4MB
- `int a[2000][2000]` : 16MB
- 일반적으로 메모리 제한은 128 ~ 512MB 정도이니 데이터 개수가 1,000만 단위가 넘지 않도록 주의하자

python으로 수행 시간 측정하기

```py
import time

start_time = time.time()
# source code to be measured
end_time = time.time
print("time: ", end_time - start-time)
```
