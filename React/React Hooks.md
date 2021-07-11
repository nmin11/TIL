※ 본문은 인프런에서 John Ahn 님의 [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8) 를 학습하면서 정리한 내용임을 알립니다.

</br>

## Class Component

```javascript
import React, { Component } from "react";

export default class Hello extends Component {
  render() {
    return <div>Hello my friends!</div>;
  }
}
```

더 많은 기능들을 사용할 수 있지만 코드가 복잡해지며 성능적으로 느려진다.

</br>

## Functional Component

```javascript
import React from "react";

export default function Hello() {
  return <div>Hello my friends!</div>;
}
```

제공하는 기능들은 한정적이지만 코드가 단순해지고 성능이 좀 더 나아진다.  
한정된 기능들도 Hooks가 등장하면서, 기존에 사용하지 못하던 기능들도 구현할 수 있게 되었다.

</br>

## React Hooks

```javascript
//Class Component의 방식
constructor(props) {
    super(props);
    this.state = { name: "" };
}

//React Hooks를 활용한 Functional Component 방식
const [Name, setName] = useState("")
```
