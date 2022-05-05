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
- 음수값
  - `-m` `-p`와 같이 그냥 원하는 속성값 앞에 `-`를 붙이면 간단하게 음수값으로 적용할 수 있음
- aspect-square
  - 요소를 정사각형으로 만들어주는 스타일
- trainsition
  - 타이밍과 관련해서 예쁜 스타일을 적용할 수 있음
- cursor
  - 마우스를 갖다 댔을 때의 마우스 모양에 스타일을 적용할 수 있음

<br>

## Essential Modifiers

- `hover:` `active:` `focus:` 뒤에 색상 스타일을 넣어주면서 간단하게 이벤트 스타일 적용 가능
- `focus:ring` 스타일을 통해 focusing 되었을 때 ring 효과를 줄 수 있음
- 연관된 변수들을 framework 안에서 공유하고 있으므로,<br>마우스 호버를 통해 함께 사용하는 변수를 참조하고 같이 사용할 수 있음
- list
  - `odd`, `even` 값을 설정해서 list의 홀수줄과 짝수줄의 스타일을 적용할 수 있음
  - 배열 목록 중 비어 있는 값을 숨기기 위해 `empty:hidden` 같은 스타일을 적용할 수도 있음
- group
  - group 내 모든 요소들에 대해 동일한 이벤트를 적용시키고 싶을 때 사용
  - `group` 스타일로 간단하게 group을 묶어줄 수 있고,<br>이후 `group-hover` 스타일을 간단하게 지정 가능
  - list에서 했던 것처럼, 처음 값과 마지막 값, 홀수 값과 짝수 값에 따로 스타일 지정 가능
- peer
  - 사용하려면 우선 input 태그에 `peer` 속성을 넣어줄 것
  - 그리고 반드시 input 태그 밑에 `peer`를 다룰 요소들을 배치해야 함
  - 여러 개의 input 태그와, 그에 해당하는 `peer`를 세팅하려고 한다면 div 태그에 묶어서 사용<br>그렇지 않으면 하나의 input 태그에 모든 `peer`가 종속됨
  - `peer-invalid` : input이 invalid 할 때만 나타나도록 해주는 스타일
  - 반대로 `peer-valid`를 사용하면 input이 valid 할 때 나타나도록 해줌
  - `peer-hover` : input에 마우스를 호버했을 때 나타나도록 해주는 스타일
- file
  - input type file의 항상 똑같았던 'Choose File' 버튼에도 스타일을 적용할 수 있게 해줌
  - `file:hover:`와 같이 다른 modifier를 중첩해서 사용하는 것도 가능<br>다른 modifier들도 마찬가지!

<br>

## Responsive Modifiers

- 우선 모든 class name이 모바일 화면에 맞게 적용되고,<br>이후에 더 큰 화면에 대한 선택지를 갖는 방식
- 종류 : `sm` `md` `lg` `xl` `2xl` `portrait` `landscape`
- `sm:bg-red-400`, `md:hover:bg-pink-800` 같이 간단하게 적용
- `sm` 지정 후 `lg`를 지정하면 `md` 부분은 `sm`의 스타일 그대로 적용
- `lg:grid-cols-2` `xl:grid-cols-3` 같은 옵션으로 간단하게<br>row를 나눠서 화면에 맞는 column 개수만큼 보여주는 것으로 바꿀 수 있음
- 한 요소가 2개의 column을 차지하기 위해서 `lg:col-span-2` 같은 옵션을 사용할 수 있음
- `portrait`과 `landscape`는 모바일 환경에서 가로 화면과 세로 화면을 구분하기 위해 사용

<br>

## Dark mode

- 어떻게 설정할 것인지 고를 수 있는 옵션들이 있음
  - 기본값은 컴퓨터 및 디바이스의 환경 설정 값
  - tailwind.config.js 파일을 통해<br>디바이스 설정값을 따를 것인지, JS나 React가 변경하도록 할 것인지 설정 가능
    - `darkMode: "media"` : 디바이스 설정값을 따름
    - `darkMode: "class"` : `.dark` 스타일이 있는지 찾아서 적용, 토글 설정을 할 때 사용
- `dark:bg-black`과 같이 적용 방법은 무척 간단

<br>

## Just In Time Compiler

- Tailwind CSS는 거대한 하나의 CSS 파일처럼 다룰 수 있지만 실상은 그렇지 않음
- 예를 들어 `dark:sm:hover:bg-red-50` 같은 스타일을 위해<br>정말로 수많은 스타일들이 미리 명시되어 있지는 않음
- Tailwind 3.0 이전에는 우리가 build하기 전에 purging이라는 작업을 해서,<br>모든 스타일을 스캔한 뒤, 사용하지 않는 스타일들은 제거하는,<br>정말 말 그대로 하나의 거대한 CSS 파일을 사용하는 작업을 했었음
- Tailwind 3.0 이후부터는 **JIT**를 도입해서,<br>사용자가 코드를 작성할 때 실시간으로 감시하면서 필요한 클래스를 생성함
- 그리고 JIT 덕에 `text-[13579px]` 같은 별도의 사이즈를 가진 스타일도 적용할 수 있게 되었음
  - 당연히 색상을 `text-[#FF2468]` 같이 지정하는 것도 가능
  - 배경 이미지를 넣기 위해 `bg-[url('/vercel.svg')]` 같은 것도 사용 가능
