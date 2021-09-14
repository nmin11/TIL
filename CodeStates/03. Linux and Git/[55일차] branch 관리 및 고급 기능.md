2021 / 09 / 14

# Git Branch

## What is Branch?

브랜치는 어떤 작업을 독립적으로 진행하기 위한 개념이다.  
개발을 하다 보면 한 페이지 안에 여러 개의 기능을 따로 구현하기 위해서 코드를 여러 개로 복사해야 하는 일이 자주 발생한다.  
코드를 복사하면서, 원본 코드가 변경될 우려 없이 독립적으로 개발할 수 있는 방법은 바로 브랜치 기능을 활용하는 것이다.  
각각의 브랜치는 다른 브랜치의 영향을 받지 않으며 여러 작업을 동시에 진행할 수 있다.

</br>

브랜치의 장점은 다음과 같다.

- 한 소스 코드에서 동시에 다양한 작업 가능
- 소스 코드의 특정 시점과 동일한 상태를 만들어 놓고 이동해 가면서 작업 가능
- 각각의 브랜치에서의 변화는 서로에게 영향을 주지 않고 독립적으로 진행

</br>

![git graph](https://user-images.githubusercontent.com/75058239/133204339-69e016c2-80f0-4d52-b5f0-a6a1f6ff8e2a.png)

</br>

나누어진 브랜치는 각자 독립적인 작업 영역에서 마음대로 소스 코드를 변경할 수 있으며, 분리된 작업 영역에서 변경된 내용들을 다시 다른 브랜치와 Merge해서 새로운 하나의 브랜치로 모을 수도 있다.

</br>

## Kinds of Branch

### Integration Branch (통합 브랜치)

배포될 소스 코드가 기록되는 브랜치이다.  
Github Repository를 생성하면 기본적으로 main(혹은 master) 브랜치가 생긴다.  
해당 프로젝트의 모든 기능이 정상적으로 작동하는 상태의 소스 코드는 이 main 브랜치에 담는다.

</br>

### Feature Branch

기능 추가 및 버그 수정과 같은 단위 작업을 위한 브랜치이다.  
통합 브랜치로부터 파생시킨 브랜치이며, 피처 브랜치에서 하나의 작업이 완료되면 다시 통합 브랜치에 병합하는 방식으로 진행된다.  
토픽 브랜치라고도 불린다.

</br>

## Commands of Branch

### 새 브랜치 생성

```bash
git branch 새 브랜치 이름
```

</br>

### 새 브랜치 생성 및 해당 브랜치로 전환

```bash
git switch -c 새 브랜치 이름
git checkout -b 새 브랜치 이름
```

</br>

### 브랜치 목록 확인

```bash
git branch
```

</br>

### 브랜치 목록과 각 브랜치의 최근 커밋 확인

```bash
git branch -v
```

</br>

### 브랜치 삭제

```bash
git branch -d 삭제할 브랜치 이름
git branch -D #병합하지 않은 브랜치 강제 삭제
```

</br>

### 브랜치 전환

```bash
git switch 브랜치 이름
git checkout 브랜치 이름
```

</br>

### 브랜치 병합

```bash
git checkout master #Integration Branch로 이동
git merge dev #Feature Branch를 Merge
```

</br>

### 로그에 모든 브랜치를 그래프로 표현

```bash
git log --branches --graph --decorate
```

</br>

### 아직 커밋하지 않은 작업을 스택에 임시 저장

```bash
git stash
```

</br>

### Remote Repository에 push

```bash
git push origin 업로드할 브랜치 이름
```

</br>

## Merge와 Rebase의 차이

Merge의 경우, 변경 내용의 이력이 모두 그대로 남아 있기 때문에 이력이 복잡해진다.  
반면에 Rebase는 말 그대로 branch base를 이동시켜서, Merge와 같이 브랜치 통합을 목적으로 하지만, 특정 시점으로 브랜치가 가리키는 곳을 변경하는 기능을 한다.  
Rebase는 주로 소스 트리 관리를 조금 더 깔끔하게 표현하고 싶을 때 사용한다.

</br>

![merge와 rebase](https://user-images.githubusercontent.com/75058239/133204368-2e0766d8-8fdc-476e-9b1a-80f2823b355c.png)

</br>

## Github - Pull Request

브랜치의 변경 사항을 적용하기 위해 팀원들에게 변경 사항을 공유하고 Integration Branch와의 통합을 요구할 수 있다.

</br>

## 그 밖에 더 알아둬야 할 명령어들

- squash : 여러 개의 커밋 로그를 하나로 묶어줌
- revert : 여러 개의 커밋을 취소
- --amend : 최근 커밋 메시지 수정
