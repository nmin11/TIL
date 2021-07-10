※ 본문은 인프런에서 John Ahn 님의 [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8) 를 학습하면서 정리한 내용임을 알립니다.

</br>

## Nodemon이란?

소스를 변경할 때 그것을 감지해서 자동으로 서버를 재시작해주는 tool이다.

</br>

## Nodemon 설치 방법

```
npm install nodemon --save-dev
```

-dev를 붙여주는 것은 로컬 환경에서 활용하기 위해서이다.  
설치를 진행한 이후 package.json을 확인해보면 nodemon이 dependencies가 아닌 devDependencies에 있는 모습을 확인할 수 있다.

</br>

## Nodemon의 활용

package.json에서 scripts 부분에 실행 명령을 추가해줘야 한다.

```json
{
  "scripts": {
    "nodemon": "nodemon index.js"
  }
}
```
