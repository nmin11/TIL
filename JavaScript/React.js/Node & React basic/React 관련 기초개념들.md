## Components

module과 비슷하게 재사용성이 뛰어나다.  
각종 기능들을 개별 파일에 컴포넌트화해서 가지고 있으면 편리하게 가져다 쓸 수 있다.

</br>

## Virtual DOM

Real DOM과 Virtual DOM이라는 것이 있다.  
이 둘은 가지고 있는 properties들은 같다.  
간단하게 얘기해서, Real DOM을 copy한 것이 Virtual DOM이라고 볼 수 있다.  
만약 10개의 리스트가 있다고 가정할 때, Real DOM은 리스트에서 한가지 아이템만 변경되었을 경우 전체 리스트를 다시 reload해야된다.  
하지만 Virtual DOM은 변경된 한가지 아이템만 DOM에서 바꿔주도록 할 수 있다.

</br>

### Virtual DOM의 작동 과정

1. JSX 렌더링 → Virtual DOM Update
2. Virtual DOM이 이전 Snapshot과 비교하면서 바뀐 부분을 찾는다. (diffing)
3. 바뀐 부분이 있을 경우 해당 부분만 Real DOM에서 바꿔준다.

</br>

## Babel

최신 JavaScript 문법을 지원하지 않는 구형 브라우저에서도 최신 JavaScript 문법을 사용할 수 있도록 변환시켜준다.

</br>

## Webpack

웹 사이트의 규모가 커졌기 때문에 라이브러리와 프레임워크 등 많은 모듈들을 복잡하게 사용하게 되었는데, Webpack은 이러한 모듈들을 bundle해준다.

</br>

추가적으로, React를 설치하면 public과 src라는 폴더를 볼 수 있는데, src에 있는 폴더만 Webpack에서 관리해준다.  
따라서 이미지 등을 관리하고 싶다면 src 안에 넣어주어야 한다.

</br>

## npm과 npx

npm은 크게 보자면 레지스트리 저장소이다.  
그리고 npm의 두번째 역할은 npm run start, npm run build와 같이 빌드하는 용도로 사용 가능하게 해준다.  
또한, npm을 통해 설치할 때 -g라는 플래그를 주면 global로 컴퓨터에 저장하게 된다.  
하지만 npx가 있어서 global로 설치할 필요가 없다.  
그저 npm registry에서 찾아서 다운로드할 수 있게 되었다.
