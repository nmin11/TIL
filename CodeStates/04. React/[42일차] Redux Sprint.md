2021 / 08 / 17

## Sprint Office Hour

1. Redux를 사용하지 않는 보통의 React 앱들은 App.js에 state들이 담겨 있다.  
   하지만 Redux를 사용하게 되면 state들을 굳이 App.js에서 관리하지 않아도 된다.
2. Reducer는 현재 가진 state와 들어오는 action을 활용해서 state를 갱신한다.  
   이 때 Action은 기존 state를 immutable하게 다뤄야 한다.  
   state는 직접 수정할 수 없다. (read-only)
3. Reducer의 순수 함수
   - 동일한 인자값을 받으면 동일한 리턴값 반환
   - 어디서 호출되어도 동일한 결과
   - 외부에 어떤 영향도 주지 않음
4. Container Component만이 Redux의 영향을 받는다.
5. Componet - State : useSelector 이용  
   Action → Reducer : useDispatch 이용
6. Reducer에서는 immutable한 작업을 위해서 Object.assign을 자주 활용한다.

</br>

## Sprint Review

1. class component vs function component
   - 원래 class만 state와 life cycle을 가지고 있었으나, 이후 function에서도 사용할 수 있게 됨
2. useState : state를 제공 / useEffect : Life cycle API를 제공
3. 모든 경우에 Redux를 사용하기보다는 state가 전역으로 사용되는 상황을 구별해서 사용해야 좋다.
4. immutable한 이유 : 객체를 직접 비교해야 O(1) 복잡도를 가질 수 있음 (속성을 비교하면 O(n))  
   기존 state가 어떤 상태였는지에 대한 트래킹을 해야 함  
   궁극적으로 데이터 핸들링을 안전하게 하기 위함
