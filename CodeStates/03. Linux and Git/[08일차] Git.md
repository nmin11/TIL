2021 / 06/ 24

# Git

여러 사람이 같은 파일로 동시에 작업하거나, 이전 상태로 다시 되돌려야 할 경우가 생긴다면 어디부터 손을 대야 할지 감을 잡기 힘들 것이다. 이 때 버전 관리 시스템을 활용하면 손쉽게 이전 상태로 돌아갈 수 있다. 버전 관리 시스템에서는 변경 사항을 저장할 때 어떤 사항이 변경되었는지 코멘트를 꼭 작성해야 한다. 그렇기에 누가 어떤 파일을 추가, 수정, 삭제했는지도 확인이 가능하다.  
Git이라는 버전 관리 시스템을 사용할 경우 파일을 Github, GitLab, Bitbucket 등 여러 가지 원격 저장소를 이용해서 백업과 협업을 할 수 있다. Git은 개발자의 코드를 효율적으로 관리하기 위해서 개발된 '분산형 버전 관리 시스템'이다. 이러한 버전 관리 시스템에서 어떤 파일이 어떻게 바뀌었는지 확인 가능하다 특정 시점에 생성된 백업 복사본을 스냅샷이라고 하는데, 스냅샷을 하나씩 만들어 주는 작업을 commit이라고 한다.

</br>

## Github

Git을 통해서 버전 관리를 할 수 있는 건 맞는데, 그렇다면 Github은 무엇일까? Git은 소스 코드 기록을 관리하고 추적할 수 있는 버전 관리 시스템이다. Github은 Git Repository를 관리할 수 있는 클라우드 기반 서비스이다. 즉, Git으로 버전을 관리하는 폴더에 대해서 Github을 통해 여러 사람들이 공유하고 접근할 수 있는 것이다. 한마디로 개발자들의 SNS라고 볼 수 있다. Github에서 Code Review 등을 통해 협업이 가능하고 수많은 오픈 소스 프로젝트들이 Github로부터 호스팅되고 있어서 누구든 자유롭게 기여할 수 있다.

</br>

## Git Repository

내가 작업하는 소스 코드 폴더가 버전 관리를 받게 하기 위해서는 내 폴더를 Git의 관리 아래에 두어야 한다. 이렇게 Git으로 관리되는 폴더를 Git Repository라고 한다. Git Repository는 Remote Repository와 Local Repository 두 종류의 저장소를 제공한다. 작업할 때는 Local Repository에서 할 수 있고 내가 작업한 코드를 공유하려면 Remote Repository에 업로드해 여러 사람이 함께 공유할 수 있다. 다른 사람이 Remote Repository에 올려 놓은 소스 코드를 내 Local Repository로 가지고 올 수도 있다.

### Fork

다른 Remote Repository에 contribute하기 위해서는 먼저 Fork를 해야 한다. Fork를 하고나면 해당 소스 코드를 내 Remote Repository에 옮겨온 상태가 된다.

### Clone

이 코드를 수정하고 싶다면 내 컴퓨터로 가져오는 작업이 또 필요한데, 이를 Clone이라고 한다.

### Push

내 컴퓨터에서 소스 코드 변경 작업을 완료하고 commit을 통해 저장한 뒤, Remote Repository에 올려주는 작업을 할 수 있다. 이 과정을 Push라고 한다.

### Pull request

Push를 완료하고 나면 내가 제안한 코드 변경사항에 대해 반영 여부를 요청할 수 있다.

### Pull

Local Repository에서 변경된 사항을 Remote Repository에 업로드하기 위해 Push를 사용했듯이, 반대로 Remote Repository에서 변경 사항이 있을 때 Local Repository로 가져오는 Pull 작업도 가능하다.

</br>

## 혼자 작업 workflow

### Staging Area

내 컴퓨터의 작업 공간(work space)에서 작업에 들어간 파일들을 git의 관리 하에 있는 상태로 올려줄 수 있다. 이 영역을 staging area라고 말한다. 그 외 파일은 unstaged 혹은 untracked file이라고 말하며 staging area에 있는 파일들은 staged된 파일이라고 말할 수 있다.  
staging area에 들어온 파일들은 commit이 가능하다. commit을 하고 나면 내 Remote Repository에 push해서 commit 기록을 remote에도 남겨줄 수 있다.

### git status

git status 명령어를 통해 staging area와 untracked files 목록에 어떤 것들이 있는지 확인할 수 있다. 이 명령어를 통해 modified 상태의 파일을 발견할 경우, 터미널에서는 선택할 수 있는 두 가지 행동을 안내한다.

- add : 파일을 commit할 수 있는 상태로 만든다.
- restore : 변경사항을 폐기한다.

### git add

git add 파일명을 통해 파일 하나만 staging area로 추가할 수도 있지만 git add . 명령어를 활용해서 modified 상태의 모든 파일을 한번에 추가할 수 있다. 하지만 올리지 말아야 할 파일까지 add될 수 있으므로 주의해야 한다.  
그리고 만약에 git add 명령어로 파일을 staging area에 올려 놓은 상태인데 파일을 또 수정하면 파일이 staged이면서 modified인 상태가 된다. 이 시점에서 터미널은 선택할 수 있는 행동을 안내한다. git add 명령을 실행하면 파일을 바로 staged 상태로 만들어준다. commit을 하면 기존에 staged되어 있는 파일만 commit이 된다. 따라서 git add 후에 파일을 수정했다면 git add 명령어를 다시 실행해서 최신 버전을 staged 상태로 만들어주는 것이 좋다.

### git reset

아직 Remote Repository에 업로드되지 않고 Local Repository에만 commit해 놓은 기록이라면 reset 명령어를 통해 commit을 취소할 수 있다. git reset HEAD^ 명령어로 가장 최신의 commit을 취소할 수 있다.

### git push

commit 기록 남기기를 완료했다면 이 파일들을 contribute하기 위해서 Pull Request를 해야 한다. 그러기 위해서는 Local Repository에 저장되어 있는 commit 기록들을 내 Remote Repository에 업로드해야 한다. 내 Local Repository의 commit 기록들을 내 Remote Repository로 업로드하기 위해서는 git push origin branch 명령어를 사용할 수 있다. git push origin main, git push pair dev 등 git push 뒤에 따라오는 명령어는 상황에 따라 변경할 수 있다.

### git log

남긴 commit들이 잘 기록되어 있는지 확인해 보고 싶다면 git log 명령어를 통해 확인할 수 있다. 로그를 보는 터미널 창을 종료하고 싶다면 q를 입력하면 된다.

### Pull Request

내 Remote Repository에 Push까지 완료했다면 기존의 Remote Repository에 Pull Request(줄여서 PR)를 할 수 있게 된다. 현업에서는 PR을 통해 내가 코드를 어떻게 작성했는지 동료들이 쉽게 볼 수 있도록 하며, 동료들의 리뷰도 받을 수 있다. 또한 기존 코드에 병합할 수도 있다.

</br>

## 함께 작업 workflow

### git init

내 컴퓨터에서 생성한 디렉토리를 Git의 관리 하에 들어가게 만들어주려면 git init 명령어를 사용해주면 된다. 내 폴더를 Git Repository로 간단하게 변경해준다.

### git remote add origin < Repository 주소 >

Github에서 원격으로 관리할 수 있도록 Local Repository를 Remote Repository와 연결하는 작업이다. git remote add origin 명령어를 통해 간단하게 연결할 수 있으며, 명령어 입력 시 터미널 창에 나타나는 변화는 없다.

### git remote add pair < Repository 주소 >

협업을 위해서 다른 사람의 Repository와 연결할 수 있다. Remote Repository를 연결함으로서 Github Repository를 함께 공유할 수 있다. 위에서 pair는 편의상으로 지은 Repository 이름이다. origin을 추가할 때와 마찬가지로 터미널 창에 나타나는 변화는 없다.

### git remote -v

Repository들이 제대로 연결되어 있는지 모르겠을 때 활용할 수 있다. git remove -v 명령어는 현재의 Local Repository와 연결된 모든 Remote Repository 목록을 확인할 수 있다.

### git pull < shortname > < branch >

페어가 서버 작업을 완료해서 함께 쓰는 Repository의 master 브랜치에 작업한 코드를 올려 놓았을 때, git pull pair master와 같은 명령어를 통해 페어의 Remote Repository에 있는 작업 내용을 받아올 수 있다. 이렇게 받아오는 내용은 자동으로 병합된다.

### 충돌 해결하기

git pull 명령어를 사용했을 때, Automatic merge 과정에서 충돌하는 경우가 종종 발생한다. 페어가 수정한 라인이 있는데 내가 동일한 라인을 수정한 경우 이런 충돌이 발생할 수 있다. 이런 경우 git status 명령어를 통해 어떤 파일이 충돌하고 있는지 확인할 수 있다. 이를 해결하려면 직접 확인 후 수정해야 한다.  
Accept Current Change를 클릭해서 내가 수정한 내용으로 파일에 반영할 수 있다.  
Accept Incoming Change를 클릭해서 Remote Repository의 내용으로 파일에 반영할 수 있다.  
Accept Both Changes는 변경사항 모두를 반영한다.  
아니면 직접 파일을 수정해서 반영하는 방법도 있다.  
수정을 마치면 merge commit을 생성해주기 위해 파일을 staging area로 추가해야 한다.
git add 명령어를 통해 다시 staging area에 파일을 추가하고 git commit을 통해 merge commit을 진행한다. merge commit은 자동으로 commit message를 만들어준다.(물론 직접 작성할 수도 있다.) 자동 메시지를 남기기 위해 git commit 명령어에 메시지를 넣지 않고 Push를 진행하면 Merge branch ‘master’ of 라는 commit 메시지가 기록된다.
