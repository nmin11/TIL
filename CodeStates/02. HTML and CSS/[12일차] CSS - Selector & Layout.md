2021 / 06 / 30

# CSS Selector

## Selector를 사용할 수 있는 다양한 방법

앞서 배웠던 셀렉터는 클래스(.)와 id(#)였다.  
하지만 이외에도 다양한 방법으로 셀렉터를 사용할 수 있다.  
</br>
※ 참고 - id 및 class 셀렉터의 목적  
id : 고유(unique)한 이름을 붙일 때  
class : 반복되는 영역을 유형별로 분류할 때  

</br>

- 셀렉터
```css
h1 {}
div {}
```

- 전체 셀렉터
```css
* {}
```

- Tag 셀렉터
```css
section, h1 {}
```

- ID 셀렉터
```css
#only {}
```

- class 셀렉터
```css
.widget {}
.center {}
```

- attribute 셀렉터
```css
a[href] {}
p[id="only"] {}
p[class~="out"] {}
p[class|="out"] {}
section[id^="sect"] {}
div[class$="2"] {}
div[class*="w"] {}
```

- 후손 셀렉터
```css
header h1 {}
```

- 자식 셀렉터
```css
header > p {}
```

- 형제 셀렉터
```css
section ~ p {}
```

- 가상 클래스
```css
a:link {}
a:visited {}
a:hover {}
a:active {}
a:focus {}
```

- 요소 상태 셀렉터
```css
input:checked + span {}
input:enabled + span {}
input:disabled + span {}
```

- 구조 가상 클래스 셀렉터
```css
p:first-child {}
ul > li:last-child {}
ul > li:nth-child(2n) {}
section > p:nth-child(2n+1) {}
ul > li:first-child {}
li:last-child {}
div > div:nth-child(4) {}
div:nth-last-child(2) {}
section > p:nth-last-child(2n + 1) {}
p:first-of-type {}
div:last-of-type {}
ul:nth-of-type(2) {}
p:nth-last-of-type(1) {}
```

- 부정 셀렉터
```css
input:not([type="password"]) {}
div:not(:nth-of-type(2)) {}
```

- 정합성 확인 셀렉터
```css
input[type="text"]:valid {}
input[type="text"]:invalid {}
```

</br>
</br>

# Layout

대부분의 경우 컨텐츠의 흐름은 좌에서 우, 위에서 아래로 흐른다.  
CSS로 화면을 구분할 때에는 수직분할과 수평분할을 차례대로 적용하여 컨텐츠의 흐름에 따라 작업을 진행한다.  

- 수직분할 : 화면을 수직으로 구분하여 컨텐츠가 가로로 배치될 수 있도록 요소를 배치
- 수평분할 : 분할된 각각의 요소를 수평으로 구분하여 내부 컨텐츠가 세로로 배치될 수 있도록 요소를 배치
    - 수평으로 구분된 요소에 height 속성을 추가해서 수평분할을 보다 직관적으로 할 수 있음

</br>

## Layout 리셋

HTML 문서는 기본적인 스타일을 갖고 있다.  
때때로 HTML 문서의 기본 스타일이 레이아웃을 잡는 데 방해가 되기도 한다.

- 박스의 시작을 정확히 (0, 0)의 위치에서 시작하고 싶은데 body 태그가 가진 기본 스타일에 약간의 여백이 있다.
- width, height 계산이 여백을 포함하지 않아 계산이 어렵다.
- 브라우저마다 여백이나 글꼴과 같은 기본 스타일이 조금씩 다르다.

이와 같은 문제를 해결하기 위해서 단 몇 줄의 코드를 적용시키면, 기본 스타일링을 제거한 뒤 레이아웃을 디자인할 수 있다.

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
}
```

</br>

## Flexbox로 Layout 잡기

flexbox로 레이아웃을 구성한다는 것은 박스를 유연하게 늘리거나 줄여서 레이아웃을 잡는다는 의미다.

### display: flex;

부모 박스 요소에 display: flex; 를 적용해서 자식 박스의 방향과 크기를 결정하는 레이아웃 구성 방법이다.  
기본값 적용 시 display: flex; 가 적용된 부모 박스의 자식 요소는 왼쪽부터 차례대로 이어서 배치된다.

</br>

### flex-direction

flexbox는 박스가 수직으로 분할되는 것이 기본값이다.  
그러나 방향을 설정해주면 수평분할도 가능하다.  
flex-direction은 부모 박스 요소에 적용해주면 된다.

```css
.box {
    display: flex;
    flex-direction: column;
}

/* flex-direction의 속성들 */
.just_sample {
    flex-direction: row;
    flex-direction: row-reverse;
    flex-direction: column;
    flex-direction: column-reverse;
}
```

</br>

### 자식 요소의 flex 속성

자식 박스에 어떤 속성도 주지 않으면 왼쪽에서부터 오른쪽으로 컨텐츠의 크기만큼 배치된다.  
자식 요소의 flex 속성이 없다면 다음과 같은 기본값이 적용된다.

```css
#contents {
    flex: 0 1 auto;
}
```

flex 속성의 3가지 영역에는 기본 크기를 바탕으로 필요에 따라 늘리거나 줄일 수 있는 값이 적용된다.

```css
#contents {
    flex: <grow> <shrink> <basis>;
}
```

margin이나 padding에서 상하좌우 각 방향을 따로 지정할 수 있었듯이, flex에 적용되는 3가지 영역도 각 값을 따로 지정할 수 있다.

```css
#contents {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
}
```

grow, shrink 속성은 단위가 없으며, 비율에 따라 결과가 달라진다.  
부모 박스 안에 n개의 자식 박스가 있다고 가정한다.  
각 자식 박스가 갖는 grow 값의 총 합이 n이라면 grow 속성의 값을 1로 설정하는 것은 1/n 가로 또는 세로 길이를 적용한다는 의미다.  
마찬가지로 grow 속성의 값을 2로 지정하면 2/n의 길이를 의미한다.

</br>

### grow(팽창 지수)

```html
<div id="outer">    
    <div class="box target">.box.target</div>
    <div class="box">.box</div>
    <div class="box">.box</div>
</div>
```

```css
#outer {
    display: flex;
    border: 1px dotted red;
    padding: 10px;
}

.box {
    border: 1px solid green;
    padding: 10px;
    flex: 1 1 auto;
}

.target {
    flex: 2 1 auto;
}
```

위와 같이 grow 속성을 적용할 경우 총 영역은 2+1+1 = 4 가 되어서 target이 2만큼 나머지 2개는 1만큼의 영역을 갖는다.  
적용 화면은 [codepen](https://codepen.io/igotoweb/pen/PozaZeM) 에서 확인할 수 있다.  

</br>

### shrink(수축 지수)

shrink는 grow와 반대로 설정한 비율만큼 박스 크기가 작아진다.  
flex-grow 속성과 flex-shrink 속성을 함께 사용하는 일은 추천되지 않는다.  
비율로 레이아웃을 지정할 경우 flex-grow 속성 또는 flex: grow값 1 auto; 와 같이 grow 속성에 변화를 주는 방식이 권장된다.  
flex-shrink는 실제 크기를 예측하기 어렵기 때문이다.  
그래서 flex-shrink 속성은 기본값인 1을 주로 사용한다.

</br>

### basis(기본 크기)

자식 박스가 flex-grow나 flex-shrink에 의해 늘어나거나 줄어들기 전에 가지는 기본 크기이다.  
flex-grow가 0인 경우에만 기본 크기가 유지된다.  
width와 flex-basis를 동시에 적용할 경우 flex-basis가 우선된다.  
그리고 컨텐츠가 많아서 자식 박스가 넘치는 경우 width가 정확한 크기를 보장하지 않는다.  
flex-basis를 사용하지 않는다면 자식 박스가 넘칠 때를 대비해서 max-width를 사용할 수 있다.

</br>

### 컨텐츠 정렬 방법

flexbox를 원하는대로 제어하기 위해서 axis(축)의 개념에 대한 이해가 필요하다.  
axis는 main axis와 cross axis로 구분한다.  
main axis는 flex-direction 속성에 의해서 결정된다. fire-direction이 기본값인 row 상태일 때 main axis는 가로축이 된다.  
cross axis는 여러 개의 main axis와 수직을 이루는 방향이다. main axis가 가로일 때 cross axis는 세로가 된다.  
</br>
axis들을 기준으로 정렬할 수 있는 속성들에는 justify-content와 align-items가 있다.  
justify-content 속성은 main axis를 기준으로 정렬하며, align-items 속성은 cross axis를 기준으로 정렬한다.

</br>

### 컨텐츠 수평 정렬 (justify-content)

- flex-start
- flex-end
- center
- space-between
- space-around
- space-evenly

적용 예시는 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) 에서 확인할 수 있다.

</br>

### 컨텐츠 수직 정렬 (align-items)

- flex-start
- flex-end
- center
- stretch

적용 예시는 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) 에서 확인할 수 있다.

</br>
</br>

## Wireframe

웹 또는 앱을 개발할 때 레이아웃의 뼈대를 그리는 단계를 와이어프레임이라고 한다. 와이어프레임은 말 그대로 "와이어로 설계된 모양"을 뜻하며 단순한 선이나 도형으로 웹이나 앱의 인터페이스를 시각적으로 묘사한다. 와이어프레임은 레이아웃과 제품의 구조를 보여준다. 전환 효과나 애니메이션, 사용자 테스트 같은 스타일링 요소나 UX를 판단하는 것이 아니다.

</br>

(이미지 첨부 : 와이어프레임 예시)
