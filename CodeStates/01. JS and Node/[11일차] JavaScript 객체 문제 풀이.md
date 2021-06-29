2021 / 06 / 29

# JavaScript 객체 문제 풀이

오늘은 하루 종일 자바스크립트의 객체 관련 코딩 문제들을 풀었기 때문에 이 과정에서 알게 된 메소드들이나 인상 깊었던 문제들에 대한 정리를 주로 적어볼 생각이다.

</br>

## 객체 문제를 풀면서 새롭게 알게된 메소드들

### delete 연산자

객체의 속성을 제거한다.

```javascript
const Employee = {
  firstName: "John",
  lastName: "Doe",
};

delete Employee.firstName;
```

delete 뒤의 표현식은 속성 참조여야 한다.

```javascript
delete object.property;
delete object["property"];
```

### Object.keys(obj).length;

obj라는 객체의 속성 갯수를 구한다.  
Object.keys(obj)라는 메소드로 Key 목록들을 배열로 반환받을 수 있으며 이 배열의 길이를 구함으로써 객체의 속성 갯수를 구할 수 있게 된다.

</br>

## 객체 문제풀이에서 어려웠던 문제들

초반부의 문제들은 무척 쉬웠다. 객체 관련 여러가지 메소드들의 작동 원리만 어느 정도 파악하고 있으면 쉽게 풀 수 있었다.  
하지만 가장 마지막의 두 문제가 시간을 굉장히 잡아먹었다. 한 문제는 구글링을 통해서 어떻게든 해결했지만 다른 한 문제는 구글링을 통해서 가져온 코드로도 테스트 케이스를 10개 중 9개 통과하여 최종 통과 표시를 받지 못했다.  
주말에도 프로그래머스의 레벨 1 코딩 테스트 연습 문제들을 풀면서 느꼈던 것이지만 나는 문제풀이 능력이 한참 부족하다는 것을 다시 한번 깨달을 수 있었다.

### **countAllCharacters**

#### 문제 : 문자열을 입력받아 문자열을 구성하는 각 문자(letter)를 Key로 갖고, 해당 Key 값의 문자가 등장하는 횟수를 number 타입의 값으로 갖는 객체를 반환

#### 확인사항

- 인자값은 공백이 없는 string
- 빈 문자열을 입력받은 경우 빈 객체 반환

구글링을 통해 이 문제를 풀었지만 내 수준에서는 풀이 방식이 쉽게 이해되지 않았다. 그래서 Reference의 풀이 방식을 토대로 복습하려고 하지만 나중에라도 혹시 검색해서 찾아낸 풀이가 필요할지도 모르니 링크를 남겨두겠다.  
[Stack Overflow : How to count duplicate value in an array in javascript](https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript)

</br>

Reference의 풀이 방식은 빈 객체를 먼저 선언해준 다음 for문을 문자열의 문자 개수 만큼 돌린다.  
for문 안에서는 앞서 선언한 빈 객체에 obj[str[i]]와 같이 문자열의 i번째 값 자체를 Key 값으로 설정한 뒤, 처음 만나는 문자열이라면 해당 문자열을 Key 값으로 가진 Value 값을 0으로 만들어준다.  
만약 처음 만나는 문자열이 아니라면(obj[str[i]]의 value 값에 이미 무엇인가 있다면) 해당 Key 값의 Value에 계속해서 ++해주는 것이다.  
이 작업이 끝나면 자연스럽게 객체를 반환해주면 되는 것이다.  
~~훗날 다시 공부하게 될 나 자신이 과연 이걸 이해할 수 있을지...~~

</br>
</br>

### **mostFrequentCharacter**

#### 문제 : 문자열을 입력받아 가장 많이 반복되는 문자(letter)를 반환

#### 확인사항

- 인자값은 공백이 있는 string
- 띄어쓰기는 제외
- 빈 문자열을 입력받은 경우 빈 문자열 반환
- 가장 많이 반복되는 문자가 다수일 경우 가장 먼저 해당 횟수에 도달한 문자 반환

정말 오랜 시간 많은 고민을 했던 문제다. 역시 구글링을 통해 쓸만한 코드를 용케도 찾아냈었지만 아쉽게도 해당 코드는 테스트 케이스의 10개 중 9개만 통과하여 최종 통과가 되지 않았다. [구글링을 통해 찾아낸 코드](https://www.w3resource.com/javascript-exercises/javascript-array-exercise-8.php)에서 통과하지 못하는 하나의 테스트 케이스는 바로 가장 많이 반복되는 문자가 여러 개일 경우 가장 먼저 해당 횟수에 도달한 문자를 반환하는 테스트였다. 이 코드는 어차피 이 과제에서 최종 통과에는 실패한 코드이니 자유롭게 코드를 공유해보겠다.

```javascript
function mostFrequentCharacter(str) {
  if (str === "") {
    return "";
  }
  str = str.replace(/(\s*)/g, "");

  var mf = 1;
  var m = 0;
  var item = "";
  for (var i = 0; i < str.length; i++) {
    for (var j = i; j < str.length; j++) {
      if (str[i] === str[j]) {
        m++;
      }
      if (mf < m) {
        mf = m;
        item = str[i];
      }
    }
    m = 0;
  }
  return item;
}
```

문제는 이랬다.  
이 코드는 문자 하나를 가져와서 배열 전체를 돌면서 반복되는 만큼 m 변수를 ++한 뒤, 그 ++한 값들이 현재의 most frequent인 변수 mf보다 크면 해당하는 문자값을 결과값에 넣어주는 것이다.  
검색하는 순서가 맨 앞 문자에서부터 차례차례 밟아나가는 방식이 아니다보니 반복되는 횟수가 가장 높은 숫자들이 여러 개일 경우에 대한 처리가 어렵다. ~~아니면 단순히 내가 모르는 것일지도~~  
한 가지 의혹이 더 있었다. 바로 이 문제들은 JavaScript의 '객체'에 관련한 문제들이지만 위 코드에서는 '객체'에 관련한 어떤 코드도 찾아볼 수 없었다.  
그럼에도 불구하고 나는 단 하나의 테스트 케이스에만 실패했기 때문에 if문이나 else if문을 통해서 어떻게든 예외 처리를 해볼 수 있지 않을까 생각했지만 위 코드를 어떻게 굴려봐도 원하는 답이 나오질 않았고, 시간을 많이 잡아먹게 되었다. 그래서 결국 90%의 정답률로 풀이를 제출했고, 바로 Reference 코드를 참조했다.

</br>

Reference 코드에서는 일단 객체를 선언하면서 두 개의 Key 값 mostCount와 mostFrequent에 각각 0과 ''라는 Value를 넣어준다.  
그 다음 문자열의 길이만큼 for문을 돌면서 obj[str[i]]의 값이 존재하지 않는다면 obj[str[i]]에 0을 넣어주고 ++해주는 것이다.  
이후 obj[str[i]]의 Value가 obj['mostCount']보다 큰 경우 'mostCount'라는 Key 값에 obj[str[i]]의 값을 대입해주고, obj['mostFrequent']에는 str[i]의 문자를 그대로 넣어준다.  
이러한 for문 연산이 끝난 후 마지막에는 obj['mostFrequent']를 반환하면 되는 것이다.  
이 경우 내가 사용했던 방법과는 다르게 단일 for문으로 앞에서부터 차례대로 세어나가기 때문에 나중에 mostCount가 동일한 경우가 생겨도 해당 str[i]의 값을 obj['mostFrequent']의 Value에 담아버리는 불상사가 일어나지 않게 되는 것이다.
