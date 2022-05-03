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
