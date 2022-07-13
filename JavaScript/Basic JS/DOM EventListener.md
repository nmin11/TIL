## element에 addEventListener 함수 적용하기

특정 엘리먼트에 이벤트리스너를 추가하기 위해서는 2가지 방법이 있다.

```javascript
element.addEventListener("click", function () {
  alert("Hello Loko!");
});
```

```javascript
element.addEventListener("click", myFunction);

function myFunction() {
  alert("Hello Loko!");
}
```

click 외에도 mouseover나 mouseout 등 여러가지 이벤트리스너들을 설정해줄 수 있다.

</br>

## addEventListener에 인자 넘기기

```javascript
let num1 = 5;
let num2 = 20;

document
  .querySelector("#calculateButton")
  .addEventListener("click", function () {
    multiple(num1, num2);
  });

function multiple(a, b) {
  let result = a * b;
  document.querySelector("#resultText").textContent = result;
}
```
