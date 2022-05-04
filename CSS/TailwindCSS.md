## Setup

- 설치 : `npm install -D tailwindcss postcss autoprefixer`
- init : `npx tailwindcss init -p`

※ tailwind.config.js

```js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- 위 파일을 통해 우리는 어느 컴포넌트, 어느 페이지에서 TailwindCSS를 사용할 것인지 알려야 함
- pages와 components 하위의 모든 타입에 대해 허용하려면 content 안에<br>`"./pages/**/*.{js,jsx,ts,tsx}"`와 `"./components/**/*.{js,jsx,ts,tsx}"` 넣기

※ global.css 수정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Introduction

- **utility-first CSS framework**
  - 아주 많은 class name을 가지고 있다는 뜻
  - 아주 heavy한 하나의 CSS 파일이라고도 볼 수 있음
  - 사용하는 class name에 맞는 스타일들을 가지고 있는 형태
- Bootstrap은 모두 똑같은 형식이지만 TailwindCSS는 정해진 스타일이 없음
- 화면의 사이즈에 맞게 **반응형 디자인**을 설정할 수 있는 class name들도 지원
- Dark mode 지원
- **World-class IDE integration**
  - class name들이 너무 많아서 다 외우는 것은 힘들테니, 자동 완성으로 해결하게 해주는 방법
  - 활성화하기 위해 VS Code에서 _Tailwind CSS IntelliSense_ 설치

<br>

## 간단 사용법

- Background Color : bg만 입력한 뒤, 자동 완성되는 것 중 원하는 색상 선택
- padding
  - `p-10` : 사방으로 padding 10
  - `pl` : 왼쪽 padding
  - `pr` : 오른쪽 padding
  - `pt` : 위 padding
  - `pb` : 아래 padding
  - `px` : 왼쪽 / 오른쪽 padding
  - `py` : 위 / 아래 padding
  - 단위는 **rem**이며, 10으로 줄 경우 2.5rem이 됨
    - 브라우저의 폰트 사이즈에 맞는 크기를 갖도록 해주는 단위
- space
  - 요소 사이사이에 margin을 만들어줌
  - 아니면 grid 스타일에 gap으로 줘도 똑같이 margin을 만들어줌
- border
  - 위치에 맞춰서 크기를 지정하고 선을 그어줄 수 있음
- font
  - `font-` 까지 입력하면 자동 완성으로 찾아낼 수 있음
