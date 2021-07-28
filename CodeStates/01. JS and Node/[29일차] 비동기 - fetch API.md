2021 / 07 / 28

## fetch를 이용한 네트워크 요청

비동기 요청의 가장 대표적인 사례는 단연 **네트워크 요청** 이다.  
네트워크를 통해 이뤄지는 요청은 그 형태가 다양하다.  
그중에서 URL로 요청하는 경우가 가장 흔하다.  
URL로 요청하는 걸 가능하게 해주는 API가 바로 fetch API이다.  
fetch API는 특정 URL로부터 정보를 받아오는 역할을 한다.  
그렇게 해서 받아온 정보를 활용해서 특정 DOM 엘리먼트를 업데이트하는 작업이 가능한 것이다.  
그리고 이러한 과정이 비동기로 이루어지기 때문에, 경우에 따라 다소 시간이 걸릴 수 있다.  
그럴 경우에는 blocking이 발생하면 안되므로 특정 DOM에 정보가 표시될 때까지 로딩창을 대신 띄우기도 한다.

</br>

활용 예시는 다음과 같다.

```javascript
let url =
  "https://v1.nocodeapi.com/codestates/google_sheets/YbFMAAgOPgIwEXUU?tabId=최신뉴스";
fetch(url)
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));
```

위 코드를 보면, fetch API는 Promise 형식으로 이루어져 있음을 알 수 있다.

</br>

## Sprint Review - 추가적으로 알게 된 사실들

- Promise.all 중 하나라도 rejected가 되면 다음 .then()으로 넘어가지 못하고 .catch()를 반환한다.
- fetch는 그 자체가 Promise를 리턴한다.
- fetch의 .json()은 응답이 JSON으로 들어왔을 때 활용 가능하며, 만약 Text로 들어왔다면 .text()로 사용 가능하다.
