# Stream

자바 8부터 추가된 컬렉션의 저장 요소를 하나씩 참조해서 람다식으로 처리할 수 있도록 해주는 반복자이다.

</br>

## 반복자 Stream

※ Stream 이전의 Iterator 반복자 코드

```java
List<String> list = Arrays.asList("김코딩", "이자바", "김인기");
Iterator<String> iterator = list.iterator();
while(iterator.hasNext()){
   String name = iterator.next();
   System.out.println(name);
}
```

※ Stream으로 변경한 코드

```java
List<String> list = Arrays.asList("김코딩", "이자바", "김인기");
Stream<String> stream = list.stream();
stream.forEach(name -> System.out.println(name));
```

Collection의 stream() 메소드로 Stream 객체를 얻고 나서 Stream의 forEach 메소드를 통해 Collection의 요소를 하나씩 출력한다. forEach() 메소드는 다음과 같이 Consumer 함수적 인터페이스 타입의 매개값을 가지므로 Collection의 요소를 소비할 코드를 람다식으로 기술할 수 있다.

```java
void forEach(Consumer<T> action)
```

</br>

## Stream의 특징

Stream은 Iterator와 비슷한 역할을 하는 반복자이지만, 람다식으로 요소 처리 코드를 제공하는 점, 내부 반복자를 사용한다는 점, 그리고 중간 처리와 최종 처리 작업을 수행한다는 점에서 많은 차이를 가지고 있다. 이 특징들에 대해서 더 알아보자.

</br>

### 람다식으로 요소 처리 코드 제공

Stream이 제공하는 대부분의 요소 처리 메소드는 함수적 인터페이스 매개타입을 가지기 때문에 람다식 또는 메소드 참조를 이용해서 요소 처리 내용을 매개값으로 전달할 수 있다.

</br>

### 내부 반복자를 사용하므로 병렬 처리가 쉬움

외부 반복자(External Iterator)는 개발자가 코드로 직접 Collection의 요소를 반복해서 가져오는 코드의 패턴이다. index를 사용하는 for문, Iterator를 사용하는 while문은 모두 외부 반복자를 이용하는 형태이다. 반면에 내부 반복자(Internal Iterator)는 Collection 내부에서 요소들을 반복시키고 개발자는 요소 당 처리해야 할 코드만 제공하는 코드 패턴을 이야기한다.  
내부 반복자를 사용해서 얻는 이점은 Collection 내부에서 어떻게 요소를 반복시킬 것인지는 Collection에 맡겨두고 개발자는 요소 처리 코드에 집중할 수 있다는 점이다. 내부 반복자는 요소들의 반복순서를 변경하거나 멀티 코어 CPU를 최대한 활용하기 위해 요소들을 분배시켜 병렬 작업을 할 수 있게 도와주기에 효율적으로 요소를 반복시킬 수 있다.  
Iterator는 Collection의 요소를 가져오는 것에서부터 처리하는 것까지 모두 개발자가 작성해야 하지만 Stream은 람다식으로 요소 처리 내용만 전달할 뿐, 반복은 Collection 내부에서 일어난다.

</br>

### 중간 처리와 최종 처리

Stream은 중간 처리에서는 매핑, 필터링, 정렬을 수행하고 최종 처리에서는 반복, 카운팅, 평균, 총합 등의 집계처리를 수행한다.

</br>

## Stream의 종류

자바 8부터 새로 추가된 java.util.stream 패키지에는 Stream API들이 포진하고 있다. 패키지 내용을 보면 BaseStream 인터페이스를 부모로 해서 자식 인터페이스인 Stream, IntStream, LongStream, DoubleStream이 상속관계를 이루고 있다.  
BaseStream 인터페이스에는 모든 스트림에서 사용할 수 있는 공통 메소드들이 정의되어 있을 뿐 코드에서 직접적으로 사용되지는 않는다. 하위 스트림들이 직접적으로 이용되는 스트림인데, Stream은 객체 요소를 처리하는 스트림이고, IntStream, LongStream, DoubleStream은 기본 타입 요소를 처리하는 스트림이다. 이 스트림 인터페이스의 구현 객체는 다양한 소스로부터 얻을 수 있다. 주로 Collection에서 배열에서 얻지만, 다음과 같은 소스로부터 스트림 구현 객체를 얻을 수도 있다.

</br>

![스트림 생성](https://user-images.githubusercontent.com/75058239/123512357-e8efe480-d6c1-11eb-8ff3-5f93c8efa2a5.png)

</br>

Collection 인터페이스에는 stream()이 정의되어 있기 때문에 Collection 인터페이스를 구현할 객체들은 모두 이 메소드를 이용해 Stream을 생성할 수 있다. stream() 사용 시 해당 Collection의 객체를 소스로 하는 Stream을 반환한다. IntStream의 경우 range() 함수를 사용해서 기존의 for문을 대체할 수 있다.

```java
IntStream stream = IntStream.range(4, 10);
// 4 이상 10 이하의 숫자를 갖는 IntStream
```

</br>

## Stream 파이프라인

대량의 데이터를 가공해서 축소하는 것을 일반적으로 Reduction이라고 하는데, 데이터의 합계, 평균값, 카운팅, 최대값, 최소값 등이 대표적인 Reduction의 결과물이라고 볼 수 있다. 그러나 Collection의 요소를 Reduction의 결과물로 바로 집계할 수 없을 때에는 집계하기 좋도록 필터링, 매핑, 정렬, 그루핑 등의 중간 처리가 필요하다.

</br>

### 중간 처리와 최종 처리

Stream은 데이터의 필터링, 매핑, 정렬, 그루핑 등의 중간 처리와 합계, 평균, 카운팅, 최대값, 최소값 등의 최종 처리를 파이프라인으로 해결한다. 파이프라인은 여러 개의 Stream이 연결되어 있는 구조를 의미한다. 파이프라인에서 최종처리를 제외하고는 모두 중간 처리 Stream이다.  
중간 Stream이 생성될 때 요소들이 바로 중간 처리되는 것이 아니라 최종 처리가 시작되기 전까지 중간 처리는 지연된다. 최종처리가 시작되면 비로소 Collection의 요소가 하나씩 중간 Stream에서 처리되고 최종 처리까지 오게 된다.  
Stream 인터페이스에는 많은 중간 처리 메소드가 있는데, 이 메소드들은 중간 처리된 Stream을 리턴한다. 그리고 이 Stream에서 다시 중간 처리 메소드를 호출해서 파이프라인을 형성하게 된다.

```java
Stream<Member> maleFemaleStream = list.stream(); //Original Stream
Stream<Member> maleStream = maleFemaleSTream.filter( m -> m.getGender() == Member.MALE);
IntStream ageStream = maleStream.mapToInt(Member::getAge); //중간 처리 Stream
OptionalDouble opd = ageStream.average(); //최종 처리
double ageAve = opd.getAsDouble();
```

</br>

## 중간 처리 메소드

</br>

### 필터링 (filter, distinct)

- distinct() : Stream의 요소들에 중복된 데이터가 존재하는 경우, 중복을 제거하기 위해 distinct를 사용한다.
- filter() : filter는 Stream에서 조건에 맞는 데이터만을 정제하여 더 작은 Collection을 만들어내는 연산입니다. filter() 메소드에는 매개값으로 Predicate가 주어지고, 주어진 Predicate가 true를 리턴하는 요소만 필터링한다.

```java
public class FilteringExample {
   public static void main(String[] args) throws Exception {
      List<String> names = Arrays.asList("김코딩", "이자바", "김인기", "최민철", "김코딩");

      names.stream()
         .distinct() //중복제거
         .forEach(n -> System.out.println(n));
      System.out.println();

      names.stream()
         .filter(n -> n.startsWith("김")) //필터링
         .forEach(n -> System.out.println(n));
      System.out.println();

      names.stream()
         .distinct() //중복제거
         .filter(n -> n.startsWith("김")) //필터링
         .forEach(n -> System.out.println(n));
   }
}

/*
김코딩
이자바
김인기
최민철

김코딩
김인기
김코딩

김코딩
김인기
*/
```

</br>

### 매핑 (map)

- flatMapOOO() : 요소를 대체하는 복수 개의 요소들로 구성된 새로운 Stream을 리턴한다. 종류는 다음과 같다.

|  리턴 타입   | 메소드(매개변수)                             |   요소 → 대체 요소    |
| :----------: | :------------------------------------------- | :-------------------: |
|    Stream    | flatMap(Function< T >)                       |      T → Stream       |
| DoubleStream | flatMap(DoubleFunction< DoubleStream >)      | double → DoubleStream |
|  IntStream   | flatMap(IntFunction< IntStream >)            |    int → IntStream    |
|  LongStream  | flatMap(LongFunction< LongStream >)          |   long → LongStream   |
| DoubleStream | flatMapToDouble(Function< T, DoubleStream >) |   T → DoubleStream    |
|  IntStream   | flatMapToInt(Function< T, IntStream >)       |     T → IntStream     |
|  LongStream  | flatMapToLong(Function<ㅠ T, LongStream >)   |    T → LongStream     |

</br>

- mapOOO() : 기존의 Stream 요소들을 대체하는 요소로 구성된 새로운 Stream을 형성하는 연산이다. 예를 들어 String 요소들로 갖는 Stream을 모두 대문자 String의 요소들로 변환하고자 할 때 사용할 수 있다.

```java
List<String> names = Arrays.asList("kimcoding", "javalee", "ingikim", "kimcoding");
   names.stream()
      .map(s -> s.toUpperCase())
      .forEach(n->System.out.println(n));

/*
KIMCODING
JAVALEE
INGIKIM
KIMCODING
*/
```

mapOOO() 메소드는 일반적인 Stream 객체를 원시 Stream으로 바꾸거나 그 반대로 하는 작업이 필요한 경우에 쓰인다. 아래와 같은 다양한 메소드들로 Mapping 연산을 지원한다.

|  리턴 타입   | 메소드(매개변수)                  | 요소 → 대체 요소 |
| :----------: | :-------------------------------- | :--------------: |
| DoubleStream | mapToDouble(ToDoubleFunction)     |    T → double    |
|  IntStream   | mapToInt(ToIntFunction)           |     T → int      |
|  LongStream  | mapToLong(ToLongFunction)         |     T → long     |
| DoubleStream | map(DoubleUnaryOperator)          | double → double  |
|  IntStream   | mapToInt(DoubleToIntFunction)     |   double → int   |
|  LongStream  | mapToLong(DoubleToLongFunction)   |  double → long   |
|    Stream    | mapToObj(DoubleFunction)          |    double → U    |
|  IntStream   | map(IntUnaryOperator)             |    int → int     |
| DoubleStream | mapToDouble(IntToDoubleFunction)  |   int → double   |
|  LongStream  | mapToLong(IntToLongFunction)      |    int → long    |
|    Stream    | mapToObj(IntFunction)             |     int → U      |
|  LongStream  | map(LongUnaryOperator)            |   long → long    |
| DoubleStream | mapToDouble(LongToDoubleFunction) |  long → double   |
|  IntStream   | mapToInt(LongToIntFunction)       |    long → int    |
|    Stream    | mapToObj(LongFunction)            |     long → U     |

</br>

### 정렬 (sorted)

Stream의 요소들을 정렬하기 위해 사용한다. 파라미터로 Comparator를 넘길 수도 있다. Comparator 인자 없이 호출할 경우에는 오름차순으로 정렬되며 내림차순으로 정렬하기 위해서는 Comparator의 reverseOrder를 이용한다.

```java
List<String> list = Arrays.asList("Java", "Scala", "Groovy", "Python", "Go", "Swift");

   list.stream()
      .sorted()
      .forEach(n -> System.out.println(n));
   System.out.println();

/*
Go, Groovy, Java, Python, Scala, Swift
*/
   list.stream()
      .sorted(Comparator.reverseOrder())
      .forEach(n -> System.out.println(n));

/*
Swift, Scala, Python, Java, Groovy, Go
*/
```

</br>

### 루핑 (peek, forEach)

루핑은 요소 전체를 반복하는 것을 의미한다. 메소드에는 peek, forEach가 있고 두 메소드는 루핑한다는 기능에서 동일하지만 동작 방식은 다르다. peek은 중간 처리 메소드이고, forEach는 최종 처리 메소드이다.

```java
intStream
	.filter(a -> a % 2 ==0)
	.peek(n -> System.out.println(n))
	.sum();
```

peek은 중간 처리 단계에서 전체 요소를 루핑하면서 추가적인 작업을 하기 위해서 사용한다. 이 때 최종 처리 메소드가 실행되지 않으면 지연되기 때문에 반드시 최종 처리 메소드와 함께 호출되어야 동작한다.

```java
intStream
	.filter(a -> a % 2 ==0)
	.forEach(n -> System.out.println(n));
```

반면에 forEach는 최종 처리 메소드이기 때문에 파이프 라인 마지막에 루핑하면서 요소를 하나씩 처리한다.

</br>

## 최종 처리 메소드

</br>

### 매칭 (match)

Stream의 요소들이 특정한 조건을 충족하는지 검사하고 싶은 경우에는 match 함수를 이용할 수 있다. match 함수는 함수형 인터페이스 Predicate을 받아서 해당 조건을 만족하는지 검사하고 검사 결과를 boolean으로 반환한다. match 함수에는 크게 3가지가 있다.

- allMatch() : 모든 요소들이 주어진 Predicate의 조건을 만족하는지 조사
- anyMatch() : 최소 한 개의 요소가 주어진 Predicate의 조건을 만족하는지 조사
- noneMatch() : 모든 요소들이 주어진 Predicate의 조건을 만족하지 않는지 조사

```java
public class MatchesExample {
   public static void main(String[] args) throws Exception {
      int[] intArr = {2, 4, 6};
      boolean result = Arrays.stream(intArr).allMatch(a -> a % 2 == 0);
      System.out.println("모두 2의 배수인가? " + result);

      result = Arrays.stream(intArr).anyMatch(a -> a % 3 == 0);
      System.out.println("하나라도 3의 배수가 있는가? " + result);

      result = Arrays.stream(intArr).noneMatch(a -> a % 3 == 0);
      System.out.println("3의 배수가 없는가? " + result);
   }
}

/*
모두 2의 배수인가? true
하나라도 3의 배수가 있는가? true
3의 배수가 없는가? false
*/
```

</br>

### 기본 집계 (sum, count, average, max, min)

집계는 최종 처리 기능으로 요소들을 처리해서 하나의 값으로 산출하는 것을 의미한다. 이는 대량의 데이터를 가공, 축소하는 Reduction이라고 볼 수 있다.

|         리턴 타입          |      메소드(매개변수)       |    설명     |
| :------------------------: | :-------------------------: | :---------: |
|            long            |           count()           |  요소 개수  |
|        OptionalOOO         |         findFirst()         | 첫번째 요소 |
| Optional< T >, OptionalOOO | max(), max(Comparator< T >) |   최대값    |
| Optional< T >, OptionalOOO | min(), min(Comparator< T >) |   최소값    |
|       OptionalDouble       |          average()          |   평균값    |
|     int, long, double      |            sum()            | 요소의 총합 |

```java
public class AggregateExample {
   public static void main(String[] args) throws Exception {
      int[] intArr = {1,2,3,4,5};

      long count = Arrays.stream(intArr).count();
      System.out.println("intArr의 전체 요소 개수 " + count);

      long sum = Arrays.stream(intArr).sum();
      System.out.println("intArr의 전체 요소 합 " + sum);

      double avg = Arrays.stream(intArr).average().getAsDouble();
      System.out.println("전체 요소의 평균값 " + avg);

      int max = Arrays.stream(intArr).max().getAsInt();
      System.out.println("최대값 " + max);

      int min = Arrays.stream(intArr).min().getAsInt();
      System.out.println("최소값 " + min);

      int first = Arrays.stream(intArr).findFirst().getAsInt();
      System.out.println("배열의 첫번째 요소 " + first);

   }
}

/*
intArr의 전체 요소 개수 5
intArr의 전체 요소 합 15
전체 요소의 평균값 3.0
최대값 5
최소값 1
배열의 첫번째 요소 1
*/
```

</br>

### Reduce

reduce는 다양한 집계 결과물을 만들 수 있게 해준다. reduce 메소드는 최대 3가지의 매개변수를 받을 수 있다.

- Accumulator : 각 요소를 계산한 중간 결과를 생성하기 위해 사용
- Identity : 계산을 처리하기 위한 초기값
- Combiner : Parlallel Stream에서 나누어 계산된 결과를 하나로 합치기 위한 로직

```java
public class ReduceExample {
   public static void main(String[] args) throws Exception {
      int[] intArr = {1,2,3,4,5};

      long sum = Arrays.stream(intArr).sum();
      System.out.println("intArr의 전체 요소 합 " + sum);

      int sum1 = Arrays.stream(intArr)
         .map(el -> el * 2)
         .reduce((a, b) -> a + b)
         .getAsInt();
      System.out.println("초기값 없는 reduce " + sum1);

      int sum2= Arrays.stream(intArr)
         .map(el -> el * 2)
         .reduce(0, (a, b) -> a + b);
      System.out.println("초기값 존재하는 reduce " + sum2)
   }
}

/*
intArr의 전체 요소 합 15
초기값 없는 reduce 30
초기값 존재하는 reduce 30
*/
```

</br>

### Collect

Stream의 요소들을 List나 Set, Map 등 다른 종류의 결과로 수집하고 싶은 경우에는 collect 함수를 이용할 수 있다. collect 함수는 어떻게 Stream의 요소들을 수집할 것인가를 정의한 Collector 타입을 인자로 받아서 처리한다.  
일반적으로 List로 Stream의 요소들을 수집하는 경우가 많은데, 이렇듯 자주 사용하는 작업은 Collectors 객체에서 static 메소드로 제공하고 있고, 원하는 것이 없는 경우에는 Collector 인터페이스를 직접 구현하여 사용할 수도 있다.

```java
//Student.java
public class Student {
    public enum Gender {Male, Female};
    private String name;
    private int score;
    private Gender gender;

    public Student(String name, int score, Gender gender) {
        this.name = name;
        this.score = score;
        this.gender = gender;
    }

    public Gender getGender(){
        return gender;
    }

    public String getName(){
        return name;
    }

    public int getScore(){
        return score;
    }
}

//CollectionToList.java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CollectExample {
   public static void main(String[] args) throws Exception {
      List<Student> totalList = Arrays.asList(
         new Student("김코딩", 10, Student.Gender.Male),
         new Student("김인기", 8, Student.Gender.Male),
         new Student("이자바", 9, Student.Gender.Female),
         new Student("최민선", 10, Student.Gender.Female)
      );

      List<Student> maleList = totalList.stream()
         .filter(s -> s.getGender() == Student.Gender.Male)
         .collect(Collectors.toList());

      maleList.stream().forEach(n -> System.out.println(n.getName()));

      Set<Student> femaleSet = totalList.stream()
         .filter(s -> s.getGender() == Student.Gender.Female)
         .collect(Collectors.toCollection(HashSet :: new));

      femaleSet.stream().forEach(n -> System.out.println(n.getName()));
   }
}
```
