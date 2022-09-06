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
