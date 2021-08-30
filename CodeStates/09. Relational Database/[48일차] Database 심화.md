2021 / 08 / 30

## Database Normalization (데이터베이스 정규화)

데이터베이스 정규화는 데이터베이스 설계와 연관되어 있다.  
데이터베이스 설계가 결론적으로 데이터가 어떻게 저장될 지 구조를 정해주기 때문이다.  
이를 위해서 다음의 요소들을 중요하게 다뤄야 한다.

- Data Redundancy
- Data Integrity
- Anomaly

</br>

### Data Redundancy (데이터 중복)

Data redundancy는 실제 데이터의 동일한 복사본이나 부분적인 복사본을 뜻한다.  
이러한 중복성은 데이터를 복구할 때 더 수월할 수도 있지만 데이터베이스 내에서는 몇 가지 문제점들을 지니게 된다.

- 일관된 자료 처리의 어려움
- 저장 공간 낭비
- 데이터 효율성 감소

</br>

### Data Integrity (데이터 무결성)

Data Integrity는 데이터의 수명 주기 동안 정확성과 일관성을 유지하는 것을 뜻한다.  
입력된 데이터가 오염되지 않고 입력된 그대로 데이터를 사용할 수 있게 해주는 요소이다.

</br>

### Anomaly (데이터 이상 현상)

- Update Anomaly (갱신 이상)
- Insertion Anomaly (삽입 이상)
- Deletion Anomaly (삭제 이상)

</br>

#### Update Anomaly

동일한 데이터가 여러 행(레코드)에 걸쳐 있을 때 어느 데이터를 갱신하는지에 대한 논리적 일관성이 없어서 발생하게 된다.  
이를 방지하기 위해 ID를 고유값으로 정해주는 것이 중요하다.

</br>

#### Insertion Anomaly

데이터 삽입을 못하는 경우이다.  
삽입하려는 데이터가 테이블에서 요구하는 Column들을 모두 갖고 있지 않을 때, Null 값을 입력하지 않는 이상 삽입할 수 없게 되는 경우가 이에 해당한다.

</br>

#### Deletion Anomaly

데이터의 특정 부분을 지울 때, 의도치 않게 다른 부분들도 함께 지워지는 이상 현상이다.

</br>

## SQL 종류

일반적으로 SQL 문법은 다음과 같이 분류된다.

- Data Definition Language
- Data Manipulation Language
- Data Control Language
- Data Query Language
- Transaction Control Language

</br>

### Data Definition Language (DDL)

데이터를 정의할 때 사용하는 언어이다.  
테이블을 만들 때 사용하는 `CREATE`이나 테이블을 제거할 때 사용하는 `DROP` 등이 DDL에 해당한다.  
데이터베이스의 테이블과 같은 오브젝트를 정의할 때 사용한다.

</br>

### Data Manipulation Language (DML)

데이터베이스에 데이터를 저장할 때 사용하는 언어이다.  
데이터를 다루는 `INSERT`, `DELETE`, `UPDATE`가 DML에 해당한다.

</br>

### Data Control Language (DCL)

데이터베이스 접근 권한과 관련된 문법이다.  
권한을 주는 `GRANT` 혹은 권한을 가져가는 `REVOKE` 등이 DCL에 포함된다.

</br>

### Data Query Language (DQL)

정해진 스키마 내에서 쿼리할 수 있는 언어이다.  
`SELECT`가 DQL에 해당한다.  
DQL은 DML의 일부로 취급되기도 한다.

</br>

### Transaction Control Language (TCL)

DML을 거친 데이터의 변경사항을 적용할 수 있게 해준다.  
`COMMIT`을 통해 DML의 작업을 데이터베이스에 커밋하거나 `ROLLBACK`을 통해 이전 커밋으로 돌아갈 수 있다.

</br>

## SQL Advanced

### CASE

SQL에서도 프로그래밍 언어의 if문과 같은 기능을 사용할 수 있다.

```sql
SELECT CASE
    WHEN CustomerId <= 25 THEN 'GROUP 1'
    WHEN CustomerId <= 50 THEN 'GROUP 2'
    ELSE 'GROUP 3'
END
FROM customers
```

</br>

### SUBQUERY

쿼리문을 작성할 때 다른 쿼리문을 포함할 수 있다.  
이 때 포함되는 다른 쿼리문이 소괄호로 감싼 서브쿼리다.  
서브쿼리는 실행되는 쿼리에 중첩으로 위치해서 정보를 전달한다.  
서브쿼리의 결과는 개별 값이나 레코드 리스트이며, 이를 하나의 컬럼으로 사용할 수 있다.

```sql
SELECT CustomerId, CustomerId = (SELECT CustomerId FROM customers WHERE CustomerId = 2)
FROM customers
WHERE CustomerId < 6
```

다음은 서브쿼리와 함께 자주 사용되는 키워드들이다.

</br>

#### IN, NOT IN

특정 값이 서브쿼리에 있는지 확인할 수 있다.

```sql
SELECT *
FROM customers
WHERE CustomerId IN (SELECT CustomerId FROM customers WHERE CustomerId < 10)
```

</br>

#### EXISTS, NOT EXISTS

서브쿼리에 존재하는 레코드를 확인한다.  
WHERE 조건문에 적어주면 일치하는 레코드들을 가져온다.

```sql
SELECT EmployeeId
FROM employees e
WHERE EXISTS (
	SELECT 1
	FROM customers c
	WHERE c.SupportRepId = e.EmployeeId
)
ORDER BY EmployeeId
```

</br>

#### FROM

FROM 절에서도 서브쿼리 사용이 가능하다.

```sql
SELECT *
FROM (
	SELECT CustomerId
	FROM customers
	WHERE CustomerId < 10
)
```

</br>

## Sprint Office Hour

- FULL OUTER JOIN : 두 테이블의 모든 데이터를 가져온다.
- 교집합을 빼고 싶은 경우 : OUTER JOIN 이후 한쪽 key가 null인 부분을 조건으로 찾는다.
