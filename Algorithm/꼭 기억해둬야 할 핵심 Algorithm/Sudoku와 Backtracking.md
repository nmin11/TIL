## Approach

스도쿠의 칸 들 중에서 비어있는 칸들에 값을 하나씩 할당해보면서 해결하는 방식이다.  
숫자를 할당하기 전에, 스도쿠의 규칙을 깨뜨리지 않는지 확인하는 로직이 필요하다.  
그러기 위해서 같은 행이나 같은 열, 같은 3X3 subgrid에 넣으려는 숫자와 동일한 숫자가 있는지 없는지 판별해야만 한다.  
넣으려는 숫자가 스도쿠 규칙을 깨지 않는다는 것이 확인된 이후에, 숫자를 할당하고 재귀적으로 해당 숫자가 해결책에 도달할 수 있는지 없는지 확인해야 한다.  
만약 할당된 숫자가 해결책에 도달하지 못한다면, 그 다음 숫자를 현재의 빈 칸에 대해 다시 시도해본다.  
이 작업을 1부터 9까지 다 시도해봤음에도 해결책을 찾아내지 못한다면, false 값을 리턴하고 해결책이 없음을 알린다.

</br>

## Algorithm

1. 할당하고자 하는 숫자와 동일한 숫자가 같은 행, 같은 열, 같은 3X3 subgrid에 있는지 없는지 체크하는 함수를 생성한다.  
   이 함수에서는 행, 열, 박스에 해당하는 HashMap을 유지한다.  
   그리고 HashMap에서 어떤 숫자라도 1회보다 많이 반복된다면 false를 리턴한다.  
   반복문을 통해 HashMap을 사용하지 않을 수도 있다.
2. grid를 사용하는 재귀 함수를 만든다.
3. 숫자가 채워지지 않은 빈 칸들을 확인한다.  
   빈 칸을 발견했다면 1부터 9까지의 숫자를 할당하면서 스도쿠 규칙에 대한 검증을 실시한다.  
   만약 검증까지 되었다면 0부터 9까지 모든 검증된 경우에 대해서 함수를 재귀적으로 호출한다.  
   재귀 호출이 true를 반환한다면 루프를 종료하고 true를 반환한다.  
   어떤 재귀 함수도 true를 반환하지 않는다면 false를 반환한다.
4. 숫자가 할당되지 않은 칸이 존재하지 않는다면 true를 리턴한다.

</br>

## Java 풀이

```java
class GFG {
    public static boolean isValid(int[][] board, int row, int col, int num) {
        for (int d = 0; d < board.length; d++) {
            if (board[row][d] == num) {
                return false;
            }
        }

        for (int r = 0; r < board.length; r++) {
            if (board[r][col] == num) {
                return false;
            }
        }

        int sqrt = (int)Math.sqrt(board.length);
        int boxRowStart = row - row % sqrt;
        int boxColStart = col - col % sqrt;
        for (int r = boxRowStart; r < boxRowStart + sqrt; r++) {
            for (int d = boxColStart; d < boxColStart + sqrt; d++) {
                if (board[r][d] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    public static boolean solveSudoku(int[][] board, int n) {
        int row = -1;
        int col = -1;
        boolean isEmpty = true;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 0) {
                    row = i;
                    col = j;
                    //아직 스도쿠 판이 모두 채워지지 않았다.
                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) break;
        }

        if (isEmpty) return true;

        for (int num = 1; num <= n; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (solveSudoku(board, n)) return true;
                else board[row][col] = 0;
            }
        }

        return false;
    }

    public static void print(int[][] board, int N) {
        for (int r = 0; r < N; r++) {
            for (int d = 0; d < N; d++) {
                System.out.print(board[r][d]);
                System.out.print(" ");
            }
            System.out.print("\n");

            if ((r + 1) % (int)Math.sqrt(N) == 0) {
                System.out.print("");
            }
        }
    }

    public static void main(String[] args) {
        int[][] board = new int[][] {
            { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
            { 5, 2, 0, 0, 0, 0, 0, 0, 0 },
            { 0, 8, 7, 0, 0, 0, 0, 3, 1 },
            { 0, 0, 3, 0, 1, 0, 0, 8, 0 },
            { 9, 0, 0, 8, 6, 3, 0, 0, 5 },
            { 0, 5, 0, 0, 9, 0, 6, 0, 0 },
            { 1, 3, 0, 0, 0, 0, 2, 5, 0 },
            { 0, 0, 0, 0, 0, 0, 0, 7, 4 },
            { 0, 0, 5, 2, 0, 6, 3, 0, 0 }
        };
        int N = board.length;

        if (solveSudoku(board, N)) {
            print(board, N);
        } else {
            System.out.println("No Solution");
        }
    }
}
```

### Output

```
3 1 6 5 7 8 4 9 2
5 2 9 1 3 4 7 6 8
4 8 7 6 2 9 5 3 1
2 6 3 4 1 5 9 8 7
9 7 4 8 6 3 1 2 5
8 5 1 7 9 2 6 4 3
1 3 8 9 4 7 2 5 6
6 9 2 3 5 1 8 7 4
7 4 5 2 8 6 3 1 9
```

</br>

## Complexity Analysis

### Time Complexity : O(9^(n\*n))

값이 할당되지 않은 모든 index들에 대해서, 9가지의 가능한 옵션들이 있다.  
그러므로 시간 복잡도는 O(9^(n\*n))가 된다.

</br>

### Space Complexity : O(n\*n)

2차원 배열을 다루기 위해서 필요하다.

</br>

## Reference

- [GeeksforGeeks - Sudoku | Backtracking-7](https://www.geeksforgeeks.org/sudoku-backtracking-7/)
