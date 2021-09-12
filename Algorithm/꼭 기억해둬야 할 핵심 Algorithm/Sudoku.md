## 문제 요약

일부 칸이 0인 스도쿠 보드를 입력받아, 0이 있는 부분에 알맞는 숫자를 채워넣은 다음 완성된 보드를 리턴하라.

</br>

## 추가 사항

- 인자는 9X9의 2차원 배열
- board를 직접 수정해도 상관 없음
- board를 가지고 완성시킬 수 있는 보드는 유일(unique)함

</br>

```javascript
const sudoku = function (board) {
  const boxes = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
  ];
  const getBoxNum = (row, col) => boxes[row][col];

  const blanks = [];
  const rowUsed = [];
  const colUsed = [];
  const boxUsed = [];
  for (let row = 0; row < 9; row++) {
    rowUsed.push(Array(10).fill(false));
    colUsed.push(Array(10).fill(false));
    boxUsed.push(Array(10).fill(false));
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        blanks.push([row, col]);
      } else {
        const num = board[row][col];
        const box = getBoxNum(row, col);
        rowUsed[row][num] = true;
        colUsed[col][num] = true;
        boxUsed[box][num] = true;
      }
    }
  }

  const isValid = (row, col, num) => {
    const box = getBoxNum(row, col);
    return (
      rowUsed[row][num] === false &&
      colUsed[col][num] === false &&
      boxUsed[box][num] === false
    );
  };

  const toggleNum = (row, col, num) => {
    const box = getBoxNum(row, col);
    board[row][col] = num;
    rowUsed[row][num] = !rowUsed[row][num];
    colUsed[col][num] = !colUsed[col][num];
    boxUsed[box][num] = !boxUsed[box][num];
  };

  const aux = (idx, blanks, board) => {
    if (idx === blanks.length) {
      return true;
    }

    const [row, col] = blanks[idx];
    for (let num = 1; num <= 9; num++) {
      if (isValid(row, col, num) === true) {
        toggleNum(row, col, num);
        if (aux(idx + 1, blanks, board) === true) {
          return true;
        }
        toggleNum(row, col, num);
      }
    }
    return false;
  };

  aux(0, blanks, board);
  return board;
};
```

CodeStates에서 제공해주는 Algorithm 문제이지만, 풀이를 봐도봐도 모르겠다는 생각이 들어서 이렇게 복사해왔다.  
[LeetCode의 Sudoku 문제](https://github.com/nmin11/Programming_Exercise/blob/main/Backtracking/LeetCode%20-%20Sudoku%20Solver.md) 를 참조해서 풀어보려고도 했으나 테스트를 통과할 수 없었다.  
지금은 이러한 복잡한 연산 과정이 눈에 들어오지 않지만 나중에라도 꼭 이 풀이를 이해해보고 싶다.
