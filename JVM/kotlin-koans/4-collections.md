## Partitions

- 조건에 따라 컬렉션을 나눌 수 있음
- 구조 분해 할당으로 조건에 맞는 것과 안 맞는 것을 나눠서 담을 수 있음

```java
fun Shop.getCustomersWithMoreUndeliveredOrders(): Set<Customer> = customers.filter { customer ->
  val (delivered, undelivered) = customer.orders.partition { it.isDelivered }
  undelivered.size > delivered.size
}.toSet()
```

<br>

## Fold and reduce

- 둘 다 컬렉션의 요소들을 누적해서 연산하는 함수
- `fold` : 초기값을 정한 뒤 누적
- `reduce` : 초기값은 컬렉션의 첫번째 요소
- 누적되는 변수와 요소 변수를 전달받아서 연산

```java
fun Shop.getProductsOrderByAll(): Set<Product> =
  customers.map(Customer::getOrderedProducts).reduce { orderByAll, customer ->
    orderByAll.intersect(customer)
  }

fun Customer.getOrderedProducts(): Set<Product> =
  orders.flatMap { it.products }.toSet()
```

※ `intersect` : 두 컬렉션에서 공통으로 존재하는 요소들을 모아 Set으로 만듦

<br>

## Sequence

- 컬렉션에 대해 `map`이나 `filter` 함수들을 체이닝하는 방식은 매번 체이닝을 이어갈 때마다 임시 컬렉션을 만듦
- `Sequence`를 사용하면 임시 컬렉션을 만들지 않음
- 연산을 차례대로 적용하다가 결과를 얻게 되면 그 이후 연산을 하지 않게 됨
- `asSequence` : 어떤 컬렉션이든 sequence로 변경
- `generateSequence` : 계산식을 설정해두고, 횟수를 입력해서 sequence를 만들 수 있음

```java
fun findMostExpensiveProductBy(customer: Customer): Product? {
  return customer
    .orders
    .asSequence()
    .filter { it.isDelivered }
    .flatMap { it.products }
    .maxByOrNull { it.price }
}

fun Shop.getNumberOfTimesProductWasOrdered(product: Product): Int {
  return customers
    .asSequence()
    .flatMap { it.getOrderedProducts() }
    .count { it == product }
}

fun Customer.getOrderedProducts(): Sequence<Product> =
  orders.asSequence().flatMap(Order::products)
```

※ 임시 컬렉션은 안 만들지만 별도 객체를 만듦 → 크기가 작은 컬렉션이라면 오히려 일반 컬렉션 연산 성능이 더 낫다!
