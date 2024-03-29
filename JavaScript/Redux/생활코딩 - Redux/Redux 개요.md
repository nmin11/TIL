## What is Redux?

- A predictable state container for JavaScript app.
  - JS로 만든 애플리케이션을 위한 예측 가능한 상태들의 연속
- 애플리케이션의 복잡성을 획기적으로 낮춰서, 우리의 코드가 어떤 결과를 가져올지 예측 가능하게 해줌

## How?

- Single Source of Truth
  - 하나의 상태
  - 상태는 그냥 객체
  - Redux는 하나의 객체에 애플리케이션의 모든 데이터를 중앙집중적으로 관리
  - 단 하나의 state를 유지하는 것을 통해서 애플리케이션의 복잡성을 낮추는 것이 첫번째 컨셉
- 데이터 읽고 쓰는 것은 기본적으로 차단되어 있음
  - 인가된 담당 함수만이 데이터 처리 가능
  - `dispatcher`와 `reducer`를 통해서만 데이터를 수정할 수 있음
  - `getState`를 통해서만 데이터를 조회할 수 있음
  - 데이터 변경시 이를 알려주는 요소도 있음
- 각 부품은 자기 할 일만 하면 됨
  - 개발자 또한 각 부품들에만 신경쓰면 됨
  - 우리의 애플리케이션을 예측 가능하게!

<br>

## undo / redo

- 굉장히 쉽게 할 수 있음
  - 각각의 state 값들을 관리할 때 철저하게 통제
  - 데이터를 만들 때 원본을 만드는 것이 아닌 복제를 하고, 수정해서 그것을 원본으로 만듦
  - 각각의 상태의 변화가 서로에게 영향을 주지 않음!
  - 이러한 특성을 이용하면 undo와 redo는 easy
- 현재 상태 뿐만 아니라 이전의 상태도 꼼꼼하게 레코딩
  - 과거 시점의 애플리케이션의 문제를 파악하기에 용이함

<br>

## module reloading

- 개발자가 코드를 작성하면 자동으로 애플리케이션에 반영되는 것
- hot module reloading
  - 애플리케이션은 refresh 되지만 데이터는 그대로 남아있음
