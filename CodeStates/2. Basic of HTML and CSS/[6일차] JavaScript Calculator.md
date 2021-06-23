2021 / 06 /22

# HTML, CSS, JS로 계산기 만들기

어제 오후부터 오늘 온종일 주로 JavaScript만을 수정해가며 계산기를 만들었다.  
(CSS도 꽤나 많이 수정을 했지만 어디까지나 편의성과 깔끔한 UI를 위해서만 사용했다.)  
~~사실 CSS에서 버튼 호버나 클릭 관련 CSS만 넣었는데도 시간을 꽤 잡아먹었다.~~  
아무튼 오늘은 계산기 만들기 이외에 따로 배운 내용이 없어서 계산기 만들기의 간단한 리뷰 및 후기를 작성해보고자 한다.

</br>

# 자체 코드 리뷰

## if문과 else if문의 남발

이번에 과제를 풀면서 Advanced 이상 난이도에 if문과 else if문을 몇 개나 썼는지 새봤더니 열댓개 정도 있었다. 사실 이것이 맞는지에 대한 판단이 서질 않는다. 그 if문들을 썼던 것은 previousKey 값에 따라 버튼이 눌려지는 것에 대한 반응을 달리 해야 했기 때문이다. 나중에도 이렇게 if문을 많이 쓰게 된다면 더 나은 방법이 있는지 한번씩 생각은 해봐야겠다.

</br>

## 버튼 클릭 시 색깔 입히고 다른 버튼들은 색깔 없애기

사실 이 부분에서 말도 안되게 시간을 많이 잡아먹었다.

```javascript
target.classList.toggle("isPressed");
```

어떻게 할 줄 몰라서 일단 구글링을 통해 위와 같은 코드를 얻어냈다. 저렇게 적용을 하게 되면 버튼 클릭 시 색깔을 입히고 다시 클릭하면 색깔을 없애준다. 그러나 다른 버튼들의 색깔에는 관여하지 않는다.

```javascript
function handleClick(event) {
  console.log(event.target);
  // console.log(this);
  // 콘솔창을 보면 둘다 동일한 값이 나온다

  console.log(event.target.classList);

  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < div2.length; i++) {
      div2[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}
```

그러던 중 다시 구글링을 해서 위와 같은 코드를 얻어냈다. class 명은 다르지만 어찌됐든 똑같이 적용을 해보니 정말 하나씩만 누를 수 있게 되었다. 그러나 한 가지 문제가 더 있었다. 버튼을 두 번 클릭할 경우 변수 operatorForAdvanced에 연산자의 값은 그대로 남아있지만 버튼의 색깔은 없어지는 것이다. 이렇게만 해도 사실 기능들은 문제가 없었지만 UX 쪽에 문제라고 판단해서 또 여러가지 궁리를 해봤다.

```javascript
for (var i = 0; i < operatorList.length; i++) {
  operatorList[i].classList.remove("isPressed");
}
target.classList.add("isPressed");
```

그렇게 해서 나온 코드이다. 사실 '이렇게 하면 되지 않을까?'해서 실험해봤더니 괜찮은 결과를 뽑아주었다. 이렇게 코드를 적용할 경우 이미 눌렀던 버튼을 다시 누른다고 해서 색깔은 지워지지 않는다. 사용자가 연산자를 취소할 수 없게끔 해주는 것이다. 만약 계산 취소를 하고 싶다면 AC 버튼을 누르면 되고 다른 연산자를 쓰고 싶으면 다른 연산자를 눌러서 그 연산자만 색깔이 들어오게 해주는 것이다. 나는 '이 정도면 됐다' 싶어서 이 버튼 작업을 이쯤에서 마무리 지었다.  
</br>
내가 특히 헷갈렸던 부분은 event.target.classList 부분이 이해가 되질 않았다. 버튼이 눌렀을 때의 타겟이 되는 클래스들의 리스트겠거니 하고 이런저런 코드들을 작성했는데 내 생각대로 작동되어주지를 않았다. 나중에 JavaScript의 target 부분을 조금 더 공부해봐야겠다. 사실 기존에도 JavaScript를 사용했을 때에도 function을 작동시킬 때 event니 target이니 이런 것들이 얽혀 있어서 뭔가 보기 복잡하다는 생각이 들었고 코드가 직관적으로 이해가 되질 않았는데 이번 기회에 확실히 알아두어야겠다. 이번 작업을 통해서 그래도 CSS 버튼의 호버 및 클릭 효과에 대해서도 좀 배워간 것이 있었다.

</br>

## 되는대로 갖다 쓴 코드들

코드를 작성하면서 분명 알맞게 작성했는데 작동하지 않았던 적이 꽤 있었다. 원인을 찾아나가며 문제들을 해결해보니 결국 다 내 문제라는 것을 깨달을 수 있었다. 예를 들면 이런 식이었다. if문에 특정 조건을 달성했을 때의 실행문을 작성해놓고, if문의 바깥쪽 밑줄에 조건이 필요없는 범용적인 실행문을 또 적어둔 것이다. 그 결과 if문 안에 조건이 알맞게 들어와서 실행을 한다 한들, if문 바깥의 범용적인 실행문에 덮어씌워져 버리는 것이다. 이 밖에도 이틀 간 내가 코드를 작성해 나간 방법들을 돌이켜 생각해보면, 내가 쓰는 방식은 어떻게든 되게 만들고 넘어가는 방식이었다. 위의 버튼 클릭 시 색깔을 변경하는 문제도 마찬가지였다. 생각대로 안되니 바로 구글링을 열심히 해서 코드를 찾아낸 다음 그대로 내 코드에 접목시켜보고, 되면 넘어가고 안되면 다른 방법을 찾아보고 하는 식이었다. 시간이 남을 때 오늘과 같이 내가 쓴 코드들을 한번 찬찬히 뜯어보는 시간을 가져야겠다.

</br>

# Sprint Review

줌 회의에서 Sprint 문제 해설을 들어보고 Reference 코드를 보면서 인상 깊은 부분들이 있었다.

</br>

## for문을 통해 문자열을 검색하지 말고 includes() 메소드를 사용하자.

계산기의 기능 중, 소수점을 찍는 부분에서 소수점을 여러 번 찍을 수 없도록 하기 위해서 이미 소수점이 있을 경우 소수점을 찍을 수 없게 하는 부분이 있었다. 내 코드는 이랬다.

```javascript
for (i = 0; i < String(firstNum).length; i++) {
  var firstNumAlreadyHasDecimal = false;
  if (String(firstNum)[i] === ".") {
    firstNumAlreadyHasDecimal = true;
  }
}

for (i = 0; i < String(secondNum).length; i++) {
  var secondNumAlreadyHasDecimal = false;
  if (String(secondNum)[i] === ".") {
    secondNumAlreadyHasDecimal = true;
  }
}
```

for문을 한번도 아니고 두번 썼다. 첫번째 숫자값에서도 소수점을 검사하고 두번째 숫자값에서도 소수점을 검사하는 것이다. 이는 적어도 for문 하나로 줄여볼 법도 했지만 다음 기능을 구현하기 위해서 딱히 더 깊이 생각하지는 않았다.

```javascript
if (!display.textContent.includes(".") && previousKey !== "operator") {
  display.textContent = display.textContent + ".";
} else if (previousKey === "operator") {
  display.textContent = "0.";
}
```

Reference의 코드는 if문과 else if문으로 해결했다. 확실히 이렇게 하면 프로그램이 돌아가는 구조는 확실하게 모르겠지만 for문으로 하나씩 꺼내보는 것보다는 확실히 효율적이지 않을까 싶은 생각이 든다.

</br>

## 내 코드는 조건문에 '&&' 조건을 너무 남발했다. 겹치는 것은 '||' 조건을 활용하자.

```javascript
if (action === "number") {
  if (display.textContent === "0" && previousKey === "none") {
    display.textContent = buttonContent;
    firstNum = display.textContent;
  } else if (display.textContent !== "0" && previousKey === "none") {
    display.textContent = display.textContent.concat(buttonContent);
    firstNum = display.textContent;
    console.log("현재 첫번째 숫자 : " + firstNum);
  }

  if (previousKey === "operator") {
    display.textContent = buttonContent;
    secondNum = display.textContent;
    previousKey = "secondNum";
    for (var i = 0; i < operatorList.length; i++) {
      operatorList[i].classList.remove("isPressed");
    }
  } else if (previousKey === "secondNum" && String(secondNum) !== "0") {
    display.textContent = display.textContent.concat(buttonContent);
    secondNum = display.textContent;
    console.log("현재 두번째 숫자 : " + secondNum);
  }

  if (previousKey === "calculate") {
    display.textContent = buttonContent;
    firstNum = display.textContent;
    previousKey = "none";
  }
}
```

숫자 버튼을 눌렀을 때의 반응을 각 조건 별로 일일이 분해했다.

```javascript
if (action === "number") {
  if (
    display.textContent === "0" ||
    previousKey === "operator" ||
    previousKey === "calculate"
  ) {
    display.textContent = buttonContent;
  } else {
    display.textContent = display.textContent + buttonContent;
  }
  previousKey = "number";
}
```

경이로울 정도로 코드가 많이 줄었다. 내 코드가 각 경우의 수에 대해 명시적이지만 코드를 비효율적으로 쓴 것이 아닐까 하는 생각이 들긴 한다.

</br>

## 버튼 클릭 시 색 변경의 경우 아예 모든 버튼 클릭마다 초기화되는 방식

```javascript
if (target.matches('button')) {
    for (let i = 0; i < buttonContainerArray.length; i++) {
        const childrenArray = buttonContainerArray[i].children;
        for (let j = 0; j < childrenArray.length; j++) {
            childrenArray[j].classList.remove('isPressed');
        }
    }
    .
    .
    .
}
```

어떤 버튼이든 클릭하자마자 이중 포문을 돌리면서 'isPressed'클래스를 지워버린다.

```javascript
if (action === "operator") {
  for (var i = 0; i < operatorList.length; i++) {
    operatorList[i].classList.remove("isPressed");
  }
  target.classList.add("isPressed");
}
```

내 방식은 이렇듯 연산자 클래스의 버튼을 누를 때마다 연산자 버튼의 'isPressed' 클래스들을 다 지우고 누른 연산자 버튼에 'isPressed' 클래스를 대입한다.  
그리고 연산자를 누르고 다음 숫자를 눌렀을 때는 다음과 같이 처리한다.

```javascript
for (var i = 0; i < operatorList.length; i++) {
  operatorList[i].classList.remove("isPressed");
}
```

그리고 연산자를 누르고 다음 숫자를 눌렀을 때, 혹은 AC 버튼을 눌렀을 때 위 코드와 같이 'isPressed' 클래스를 다 지워주는 것이다. 내 방식은 확실히 코드 내에 중복되는 코드가 생긴다. 하지만 꼭 필요한 때에만 for문을 돌린다는 점에서 그렇게 나쁘지는 않은 것 같다.

</br>

# 느낀점

## 처음 해보는 Sprint 과제

우선 Sprint란 어떤 것이고 어떻게 해나가야 좋은지에 대해 대략적으로 깨닫게 되었다. 충분히 심사숙고해서 문제를 요리조리 뜯어볼 수 있는 시간이 할당되었고 그래서 그런지 마음껏 첫 Sprint를 즐길 수 있었다. 정말 은근히 재미가 있었다. 주어진 문제 하나하나를 풀어나가는 재미가 있었고, 조금씩 기능들이 추가되는 느낌이 좋았다. 물론 아직은 HTML, CSS, JS만을 활용하기 때문에 내게 익숙해서 그런 것인지도 모르겠다. 하지만 이렇게 풀어나가는 재미가 있다면 앞으로도 잘 해낼 수 있으리라는 생각이 들었다.

</br>

## 이것이 pair programming인가 하는 의문

저번주에 JavaScript 관련 문제들을 풀 때는 그래도 문제 하나하나를 풀고 어떤 풀이 방식 같은 것을 공유해야 되는 느낌이었다면, 이번엔 개별 과제를 굳이 나눠서 한다는 느낌이 더러 있었다. 아무래도 UR CLASS에 있는 내용들을 하나하니씩 차근차근 밟아나가듯이 기능을 개선시켜 나가다 보니 개인과제의 느낌이 너무 강했다. 이 부분에 대해서는 나중에 더 보완을 해야 할 것이다. 앞으로도 이런 기나긴 시간을 하나의 과제에 몰두하는 시간이 많다면 어떻게든 시간을 의미 있게 채워나갈 수 있도록 해야겠다. 그러기 위해서 조금 더 의사소통을 많이 하는 연습이라도 하는 것이 어떨지 싶다.

</br>

## 맥북과 친해지는 시간

이번 Sprint의 코드들은 전부 맥북의 VSCode 환경에서 작성했다. 아직도 맥북에서 코드를 치는 것이 많이 서툴지만 어느 정도 친해지긴 한 것 같다. 이제부터는 VSCode에서 제공하는 단축키를 계속해서 써보면서 손에 익혀나가는 과정이 필요하다. 그리고 안 그래도 비어있는 지갑에 출혈이 좀 있었지만 무선 마우스 MX Anywhere 2S를 구입했다. 돈도 없는 마당에 산 마우스인 만큼 맥북 개발 환경에 하루 빨리 익숙해지도록 하자.
