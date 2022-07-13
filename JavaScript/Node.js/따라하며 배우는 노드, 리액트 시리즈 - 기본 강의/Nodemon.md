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
