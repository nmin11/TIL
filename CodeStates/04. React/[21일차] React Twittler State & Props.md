2021 / 07 / 13

# React Twittler State & Props

오늘은 하루 종일 Pair Programming으로 Sprint를 진행했다.  
이번 Sprint는 기존에도 만들었던 Twittler를 React의 State와 Props를 적용해서 업그레이드해야 하는 과제였다.  
이외에는 딱히 학습한 내용이 없기 때문에 오늘은 이번 Sprint에서 맞닥뜨렸던 새로운 것들에 대해 기록해보겠다.  
과제에 대한 직접적인 스포일러를 자제할 것이기 때문에 설명이 다소 추상적일 수 있다.

</br>

## 유저 이름과 트윗 내용 작성 시 새로운 트윗을 최상단에 추가

Bare Minimum 테스트 케이스의 마지막 난관이었으며, 이 부분에서 시간을 굉장히 많이 잡아먹었다.  
힌트를 제공하자면, dummyData에서 받아온 dummyTweets는 배열 안에 객체를 담고 있으며, 이 객체들이 각각 하나의 트윗을 담고 있는 형식이다.  
따라서 배열의 앞쪽에 객체 요소를 추가하고 이를 state로 관리하면 편하다.

</br>

## Advanced Challenge 도전!

이번 Advanced Challenge는 과제가 명확히 주어져 있어서 도전할 만 했다.  
또한 과제가 딱 2개 있어서 어떻게든 파헤쳐나가고 싶었던 과제들이다.

</br>

## Advanced Challenge - 트윗 필터링 구현하기

이 과제의 해결 과정에서는 username 별로 select 태그의 option들을 만들어 내는 것까지는 간단하게 구현했으나, 한가지 에러 사항이 발견되어서 시간을 많이 잡아 먹었다.  
내가 맞닥뜨렸던 에러 사항은 바로, 동일한 이름으로 여러 번 트윗을 남겼을 때 select 태그의 option들에도 동일한 이름이 여러 번 찍히게 된다는 점이었다.  
내가 처음 작성한 코드에서는 dummyTweets 배열에 map 메소드를 활용해서 각 username들을 즉각적으로 option 태그들로 변환해주었다.  
그래서 나는 이 문제를 간단하게 해결하고자 map 메소드 안에 for문과 if문을 남발하면서 중복을 제거하려고 시도했지만 실패했다.  
그렇게 고민에 고민을 거듭하던 중 어쩌면 state를 쓰면 괜찮지 않을까 생각했다.

```javascript
const [listOfUsername, setListOfUsername] = useState(dummyTweets.map(user) => {
    return <option value={user.username} ket={user.id}>{user.username}</option>
});
```

이 때 한 가지 태만한 짓을 저질렀다.  
바로 테스트를 다방면으로 시도해보지 않았던 것이다.  
나는 단지 기존에도 있던 'parkhacker'라는 이름을 다시 사용해서 중복된 유저의 트윗을 날렸고, select의 option에 중복된 값이 추가되지 않는 것만 보고 테스트를 마친 것이다.  
하지만 이렇게 TIL을 적어가다 보니 테스트가 잘 됐나 하는 의구심이 고개를 들었고, 다시 돌아가서 새로운 임의의 이름으로 트윗을 날려보니 아예 username이 추가 되지 않고 있음을 확인할 수 있었다.  
Advanced Challenge는 기존에 내장되어 있던 테스트 케이스를 돌리는 것이 아니니, 더더욱 테스트를 게을리 하지 말자.

</br>

아무튼 이러한 이유로 구글링을 통해 새로운 방법을 찾아 나섰고, 운 좋게 색다른 해결 방법을 찾아낼 수 있었다.  
그 방법은 바로 배열의 findIndex를 활용하는 것이었다.

```javascript
dummyTweets.filter(
  (arr, index, callback) =>
    index === callback.findIndex((t) => t.username === arr.username)
);
```

findIndex 메소드는 내장 함수를 활용해서 조건에 맞는 인덱스를 반환해주는 메소드이다.  
내 수준에서 보기에 이해가 잘 되지 않았지만 추측해보자면, 배열을 한번 더 꺼내서 비교를 하기 때문에 중복이 자연스럽게 없어진 것이 아닌가 싶다.  
나중에 위 코드가 돌아가는 원리에 대해서 다시 살펴봐야겠다.  
그래도 위 코드를 적용하니 이름이 중복되는 문제가 확실히 해결되었다.  
위 코드를 각 option 태그마다 붙여주어서 코드가 꽤나 복잡해보이긴 하지만 지금 수준에서는 이 코드가 최선인 듯 싶다.

</br>

## Advanced Challenge - 삭제 버튼 구현하기

이 과제에서는 엉뚱한 부분에서 해맸다.  
바로 FontAwesome의 휴지통 아이콘이 제대로 출력되지 않았던 것이다.  
그래서 이런저런 해결방법을 찾아다니다가 npm에서 FortAwesome을 설치하였다.  
그 다음 node_modules의 @fortawesome 폴더를 꼼꼼히 확인해보니 ~~정말로 그 긴 파일 리스트들을 스크롤하면서 확인했다~~ 내가 사용하고자 하는 휴지통 이미지를 담고 있는 JS 파일을 찾아낼 수 있었고, 이를 적용해보니 아이콘이 정상적으로 출력되었다.

</br>

하지만 사실 그 이후에도 삭제 버튼을 통해 어떻게 컴포넌트 요소를 삭제할 수 있을 지 막막했다.  
그래서 역시나 구글링을 열심히 하였고, [상당히 유용한 블로그 글](https://ossam5.tistory.com/m/167?category=921604)을 발견하였고, 이를 그대로 접목시켜서 사용해보니 금새 삭제 기능을 구현해낼 수 있었다.  
Tweet.js와 Tweets.js 간에 데이터 전달을 어떻게 해야하는지에 대한 것이 고민이었는데, 위 블로그 글을 참고해보니 생각보다는 간단하게 작용한다는 것을 확인할 수 있었다.

```javascript
const Tweet = ({ tweet, onRemove }) {}
```

위와 같이 설정해주면 다른 파일에서 Tweet을 받아서 사용할 때,

```javascript
//받아온 곳에서 onRemove 함수를 지정해줘야 함
<Tweet tweet={tweet} key={tweet.id} onRemove={onRemove}>
```

위와 같이 적용하여 간단하게 사용할 수 있었다.  
이런 간단한 과정을 보고나니 역시 나는 컴포넌트의 활용이 아직 익숙하지 않다는 점을 깨닫게 되었다.  
React와 더 많이 친해지는 시간을 가져야 한다.

</br>
</br>

# Sprint Review

## 시맨틱 태그

예전에는 모든 영역 태그들이 다 div 태그들이었다.  
하지만 태그의 이름만으로도 해당 영역이 어떤 기능을 하는지 보여주기 위해서 시맨틱 태그들을 추가하게 되었다.  
기능은 div 태그와 같지만 개발자들이 화면 구성을 이해하기 쉽게 해준다.

</br>

## JSX에서는 한줄의 코드만!

중괄호 {}로 묶은 코드는 한줄의 코드만 넣을 수 있기 때문에 for문의 사용이 지양된다.

</br>

## React의 history

URL의 hisory가 아닌, 상태의 history를 저장한다.  
useState 사용 시, 기존 값을 직접 변경하기보다는 setState를 꼭 해주어야 한다.
