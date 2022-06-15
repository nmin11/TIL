## 개념

- 로딩 화면을 대체해주는 API
- 데이터의 로딩이 끝나기 전에 렌더링을 하지 않게 해줌
- 데이터를 받았다고 생각하며 코딩할 수 있게 됨

<br>

## 유의점

- Next.js의 getStaticProps, getStaticPaths, getServerSideProps와 함께 사용할 수 없음
  - 이것들을 사용하면 로딩 상태를 볼 일이 없기 때문

<br>

## 사용법

```js
import { Suspense } from "react";
```

```js
<Suspense fallback={<span>Loading...</span>}>
  <Layout />
</Suspense>
```

- fallback 속성을 통해 로딩을 대체할 수 있음
