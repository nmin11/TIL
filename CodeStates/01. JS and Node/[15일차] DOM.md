2021 / 07 / 05

# DOM (Document Object Model) 이해하기

DOM은 프로그래머 관점에서 바라본 HTML이다.  
HTML 요소를 Object(JavaScript Object)처럼 조작(Manipulation)할 수 있는 모델이다.  
**JavaScript를 사용할 수 있으면 DOM으로 HTML을 조작할 수 있다** 는 말이다.  
쉽게 얘기하자면, JavaScript를 이용해서 엘리먼트의 속성값을 얻어내거나 변경하는 방법이라고 이해하면 된다.  
하지만 DOM을 JavaScript라고 이해하면 안된다. 단지 JavaScript를 통해 접근하는 것 뿐이다.
</br>
이 DOM을 만들기 위해 뛰어난 웹 개발자들이 모여서 HTML을 철저히 분석했다.  
분석한 내용으로 HTML의 아주 작은 부분까지 접근할 수 있는 구조(Model / Structure)를 만들어냈다.  
이렇게 만들어진 구조를 이용해서 HTML로 구성 페이지를 동적으로 움직이게 만들 수 있게 되었다.  
이러한 DOM을 활용하면 웹 페이지를 조금 더 다이나믹하게 만들 수 있다.

</br>

## HTML에서 JavaScript가 적용되는 방식

HTML에 JavaScript를 적용하기 위해서는 script 태그를 이용한다.  
아래의 경우 파일과 같은 디렉토리에 있는 js 파일을 불러온다.

```html
<script src="mySimpleJS.js"></script>
```

웹 브라우저가 작성된 코드를 해석하는 과정에서 위와 같은 script 요소를 만나면 웹 브라우저는 HTML 해석을 잠시 멈춘다.  
그 다음 script 요소를 먼저 실행하게 된다.  
여기서 반드시 명심해야 할 점은 **script 요소는 등장과 함께 실행된다는 사실** 이다.  
</br>
script 태그를 추가하는 두 가지 대표적인 방법이 있다.  
하나는 head 태그에 추가하는 방법이고, 다른 하나는 body 태그가 끝나기 전에 추가하는 방법이다.  
그 중, body 태그가 끝나기 전에 추가하는 방법을 활용해야 모든 기능이 정상 작동한다.

</br>

## 자식 엘리먼트 찾기

브라우저에서 작동되는 JavaScript 코드에서는 어디에서나 documnet 객체를 조회할 수 있다.

</br>

![console dir](https://user-images.githubusercontent.com/75058239/124461701-ee3ce580-ddcb-11eb-8a3c-0b991e8c6a8b.png)

</br>

DOM 구조를 조회할 때에는 console.dir이 유용하다.  
왜냐하면 cosole.log와 달리 console.dir은 DOM을 객체의 모습으로 출력하기 때문이다.  
console.dir(document.body)와 같이 사용할 수 있다.  
여기서 document는 DOM을 대표하는 객체이다.

</br>

## 부모 엘리먼트 찾기

부모 엘리먼트를 조회하려면 자식 엘리먼트의 첫 번째 엘리먼트를 조회하면 된다.

```javascript
console.dir(documnet.body.children[1]);
```

따로 변수 선언을 해서 정보를 저장해두면 주소를 참조하기 때문에 언제든지 접근할 수 있다.

```javascript
let newContents = document.body.children[1];
```

</br>

## console.dir 객체의 속성들

console.dir을 통해서 객체 형식으로 출력하면 객체의 속성들이 상당히 많은 것을 확인할 수 있다.  
아래의 표를 통해서 특별히 기억해두면 좋을 속성들을 정리하였다.

|                                        속성 이름                                        |          속성          |
| :-------------------------------------------------------------------------------------: | :--------------------: |
|                                         tagName                                         |       태그 이름        |
|                                           id                                            |           id           |
|                                        classList                                        |       class 목록       |
|                                        className                                        |      class 문자열      |
|                                       attributes                                        |       속성 객체        |
|                                          style                                          |      스타일 객체       |
|                            innerHTML, innrText, innerContent                            |  엘리먼트에 담긴 내용  |
|                                          value                                          |      form 입력 값      |
|                                        children                                         |     자식 엘리먼트      |
|                                      parentElement                                      |     부모 엘리먼트      |
|                                       childNodes                                        |       자식 노드        |
|                                         dataset                                         | data-\* 속성에 담긴 값 |
|                            onclick, onmouseover, onkeyup 등                             |         이벤트         |
|       offsetTop, offsetLeft,</br>scrollTop, scrollLeft,</br>clientTop, clientLeft       |   좌표 정보 (기준점)   |
| offsetWidth, offsetHeight,</br>scrollWidth, scrollHeight,</br>clientWidth, clientHeight |   크기 정보 (기준점)   |

</br>

- attributes는 id와 class 등 태그 안의 속성들을 배열 형태로 보여준다.
- innerHTML은 태그를 포함해서 보여주고, textContent는 태그 안의 문자열만 보여주며, 이 둘은 안의 내용을 바꿀 수 있다.
- value를 통해 입력값을 받는 양식에서 편하게 입력값을 확인할 수 있다.
- children은 자식의 태그들만을 볼 수 있지만, childNodes는 안에 포함된 태그 이외의 요소들도 같이 보여준다.
- dataset은 화면에는 보이지 않는 데이터를 담아두고 싶을 때 사용할 수 있다.

```HTML
<div data-user="steve" data-role="moderator" data-user-id="1">
    Steve Lee
</div>
```

</br>

## Quiz - DOM 파트를 통해 알게된 추가적인 DOM의 개념들

1. Node는 Element의 상위 개념이다. DOM 관련 객체는 대부분 Node에서 파생되었다고 봐도 과언이 아니다. Node의 기능을 적용(implemets)한 객체는 여러 타입이 있는데, 그 중 가장 많이 사용되는 타입이 Element이다.
2. DOM은 document 객체를 통해 HTML에 접근하며, BOM(Browser Object Model)는 window 객체를 통해 브라우저에 접근한다.
3. 다른 언어도 DOM을 가지고 있지만 JavaScript의 DOM이 전통적으로 오래 쓰여왔으며 안정적이다.

</br>
</br>

# DOM으로 HTML 조작하기

## DOM으로 엘리먼트 선택하기

- 태그를 이용 : getElementsByTagName
- id를 이용 : getElementById
- class를 이용 : getElementsByClassName
- selector를 이용 : **querySelector** / **querySelectorAll**

=> selector를 이용해서 찾는 방법을 많이 사용하게 될 것이지만, 다른 사람의 코드를 이해하기 위해서 다른 방법들도 알아두어야 한다.  
</br>
※ querySelectorAll과 같은 방법으로 조회한 엘리먼트들은 배열과 유사하지만 배열이 아니다. 정식 명칭은 Array-like Object이다.

</br>

## DOM으로 생성하기

```html
<div id="target">변경 전</div>
```

```javascript
let target = document.querySelector("#target");
let newSpan = document.createElement("SPAN");
newSpan.className = "test";
// newSpan.classList.add("test"); 의 방법도 이용 가능
newSpan.innerHTML = "변경 후";
target.appendChild(newSpan);
```

```html
<div id="target">
  변경 전
  <span class="test">변경 후</span>
</div>
```

</br>

## DOM으로 덮어쓰기

### innerHTML

```html
<div id="target">변경 전</div>
```

```javascript
let target = document.querySelector("#target");
target.innerHTML = `
  <span>변경 후</span>
`;
```

```html
<div id="target">
  <span>변경 후</span>
</div>
```

가장 쓰기 쉬운 속성이지만 느리고 보안 위험이 있다. textContent가 더 안전하다.

</br>

## DOM으로 삭제하기

### innerHTML

```javascript
let target = document.querySelector("#target");
target.innerHTML = "";
```

</br>

### 메소드를 이용한 엘리먼트 삭제

```javascript
let target = document.querySelector("#target");
target.remove();
```

</br>

### 동일한 클래스 이름이면 삭제

```javascript
const tweets = document.querySelectorAll(".tweet");
tweets.forEach(function (tweet) {
  tweet.remove();
});
```

</br>

## 추가적인 메소드

### setAttribute()

```javascript
let aElement = document.createElement("a");
aElement.setAttibute("id", "javascipt");
aElement.textContent = "awesome";
```

위와 같이 setAttribute 메소드를 사용하면 aElement의 id 속성에 'javascript'라는 값을 넣어줄 수 있다.

</br>

### removeChild()

```javascript
document.querySelector("#world").remove();
document.querySelector("#world").remove(aElement);
```

위의 2개의 코드는 괄호 안의 값과 상관 없이 world라는 id를 가진 엘리먼트 전부를 지우게 된다.

```javascript
document.querySelector("#world").removeChild(aElement);
```

이렇게 하면 world의 나머지 값들은 보존하고 자식 중에서 aElement만 지울 수 있게 된다.

</br>

### 버튼 클릭

```javascript
function displayAlert() {
  alert("코드스테이츠에 오신 것을 환영합니다");
}
document.querySelector("#apply").onclick = displayAlert;
```

```javascript
document.querySelector("#apply").addEventListener("click", function () {
  alert("코드스테이츠에 오신 것을 환영합니다");
});
```

이벤트 발생 시 작동하는 함수를 할당하는 방법은 두 가지가 있다.  
DOM 객체에 onclick을 직접 지정하는 방법과 addEventListener라는 메소드를 사용해서 할당하는 방법이다.  
주의해야 할 점은 함수를 할당할 시에 함수의 실행값을 할당하면 안되고 함수 그 자체를 할당해야 한다는 점이다.

```javascript
function displayAlert() {
  alert("코드스테이츠에 오신 것을 환영합니다");
}
document.querySelector("#apply").onclick = displayAlert();
```

이렇게 사용하면 정상적으로 작동하지 않는다.
