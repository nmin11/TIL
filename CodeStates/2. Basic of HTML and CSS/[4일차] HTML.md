# 웹 개발 이해하기

- **HTML** : 웹 페이지의 구조를 담당하는 마크업 언어
- **CSS** : 디자인 요소를 시각화하는 스타일시트 언어
- **JS** : 단순한 웹 페이지를 프로그램으로 만들어 유저와 상호작용할 수 있게 해주는 프로그래밍 언어

</br>

# HTML 기초

HTML은 HyperText Markup Language의 약자로 웹 페이지를 구성하는 마크업 언어이다. HTML은 프로그래밍 언어가 아니다. 그러나 HTML은 웹 페이지를 구성하는 뼈대가 되는 언어이다. HTML은 구조를 표현하는 언어이기 때문에 HTML의 구조를 잘 짜놓으면 자바스크립트로 개발을 할 때 더욱 직관적인 코드를 작성할 수 있다. 내가 작성한 HTML 문서를 다른 사람이 읽을 때, 의미 있는 태그를 적절하게 사용한다면 다른 사람이 HTML 문서를 쉽게 이해하고 개발할 수 있다.

</br>

## Most Used Tags In HTML

```html
<!DOCTYPE html> : 이 문서가 HTML 문서임을 명시
<html> : 문서 전체의 틀을 구성
<title> : 문서의 제목, 브라우저의 탭에 보여짐
<body> : 문서의 내용을 담는 곳
<h1> : heading을 의미하며 크기에 따라 h1부터 h6까지 있음
<div> : content division을 의미하며 자동으로 줄바꿈됨 (한 줄을 차지함)
<span> : 줄바꿈이 없는 content 컨테이너
<img> : 이미지 삽입, src 속성으로 이미지를 불러옴, 닫는 태그가 없어도 됨
<a> : href 속성으로 링크를 연결, target 속성으로 어떤 창에 링크를 띄울지 선택
<ul> : 순서가 없는 리스트를 만들어줌
<ol> : 순서가 있는 리스트를 만들어줌
<li> : 리스트의 항목들을 입력
<input> : text, radiobutton, checkbox 등 다양한 값을 입력하는 태그
<textarea> : text를 입력 가능하며 줄바꿈하며 입력할 수 있음
<button> : 누를 수 있는 button 생성
<section> : 웹 페이지에서 하나의 구역을 구분하는 데 사용
```

## Self-Closing

```html
<tag></tag> => </tag>

<img src = "cats.png"/>
```

태그 내부에 내용이 없다면 위와 같은 방법으로 표현 가능

</br>

## HTML attribute

HTML 속성(attribute)은 attribute name과 attribute value로 구성된다.

```html
<p class="paragraph">This is a paragraph.</p>
```

위 코드에서 속성의 이름은 class이고 속성의 값은 "paragraph"이다.
