2021 / 06 / 25

# pair와 함께 Git 협업 과정 연습하기

오늘도 chapter 공부를 통해 새롭게 배운 내용은 없었고 pair programming을 길게 진행하였다.  
그렇기에 이번에도 역시 pair와 함께 진행했던 내용에 대해 간단한 리뷰 및 후기 style로 가겠다.

## git remote add (remote 이름) (Repository 주소)

이 부분에서 에러가 떠서 시간을 많이 잡아먹었다. 내가 입력한 명령어와 에러는 다음과 같았다.

```
→ github-pair git:(master) git push origin
fetal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin master
```

에러만 보고는 문제를 어떻게 해결할지 참 난감했지만 해답은 간단했다. 문제의 원인은 pair의 Repository의 주소를 git remote add 해놓고 정작 내 Repository는 clone했을 때 이미 잘 연결되어 있겠지, 하고 판단해서 git remote add를 해주지 않았던 것이 이유였다. 두 개의 remote를 연결해주니 문제를 해결할 수 있었다.

</br>

## pair의 변경사항 확인하기 (유령 폴더 사건)

이번 Sprint를 진행하던 중 프로젝트 폴더에 자꾸 빈 폴더가 남아 있어서 눈엣가시였던 적이 있었다. pair분은 해당 폴더를 삭제하고 아무 문제 없이 다른 작업을 했다. 근데 내가 push를 하면 또 그 빈 폴더가 생기는 일이 발생했고, 내 Github Repository에도 그 빈 폴더가 남아있게 되었다.  
하지만 이 문제 역시 해답은 간단했다. pull을 받고 나서 제대로 받아온 것이 확인되면 어떤 변경사항이 없어도 그냥 push를 해보면 되는 것이었다. 되게 간단한 문제다. 내 Local 환경에 pull을 받아도 Github Repository를 통해서 오는 것이 아니라 내 Local 환경에 바로 들어오는 것이기 때문에 Github에서도 이를 확인하려면 확실하게 push를 해주는 것이 좋다.  
특정 시점에서 conflict되지 않은 각기 다른 commit이 있으면 자동 merge가 된다. 이 때에도 push를 한번 더 해서 확실하게 내 Github Repository에 반영해두는 것이 좋다.
