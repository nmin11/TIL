# 1. 파운데이션 모델을 활용한 AI 애플리케이션 입문

## 1.1 AI 엔지니어링의 부상

### 언어 모델 (Language Model)

- 하나 이상의 언어에 대한 통계 정보를 인코딩
- 주어진 컨텍스트에서 어떤 단어가 나타날 것 같은지를 알려줌
- 언어 모델의 기본 단위는 토큰
  - [OpenAI Tokenizer](https://platform.openai.com/tokenizer)  
  - 토큰은 모델에 따라 문자, 단어, 또는 단어의 일부가 될 수 있음
- 토큰화: 원문을 모델이 정한 길이로 나누는 과정
- 어휘(vocabulary): 모델이 다룰 수 있는 모든 토큰의 집합
  - 소수의 토큰만 사용해 많은 고유 단어 생성 가능
- 언어 모델의 2가지 유형
  - **마스크 언어 모델(masked language model)**
    - 누락된 토큰 전후 컨텍스트를 사용해 시퀀스의 어느 위치에서든 누락된 토큰을 예측하도록 학습
    - 기본적으로 빈칸을 채울 수 있도록 학습됨
    - 감정 분석, 텍스트 분류 등 새로운 텍스트를 만들지 않는 작업에 주로 사용됨
    - 코드 디버깅처럼 앞뒤 코드를 모두 이해해서 오류를 찾아야 하는 전체 컨텍스트 이해가 필요한 작업에도 유용
  - **자기회귀 언어 모델(autoregressive language model)**
    - 이전 토큰들만 보고 시퀀스의 다음 토큰을 예측하도록 학습됨
    - 토큰을 하나씩 순차적으로 생성할 수 있음
    - 텍스트 생성 분야의 대세로 자리 잡아 마스크 언어 모델보다 훨씬 큰 인기
  - 둘의 가장 큰 차이점
    - 자기회귀 언어 모델: 이전 토큰만 사용해서 예측
    - 마스크 언어 모델: 주변 토큰을 사용해서 예측

### 자기 지도 학습 (Self-supervised Learning)

- 다른 모델은 지도 학습이 필요하지만 언어 모델은 자기 지도 학습이 가능
- 지도 학습: 레이블이 있는 데이터를 사용해 ML 알고리즘을 학습하는 과정
  - 비용 및 시간이 많이 듦
- 자기 지도 학습은 데이터 레이블링 병목 현상을 극복해 모델이 학습할 대규모 데이터셋을 만들 수 있게 해줌
- 자기 지도 학습에는 명시적인 레이블이 필요하지 않고, 모델이 입력 데이터로부터 레이블 추론 가능

**⇒ 자기 지도 학습을 통해 언어 모델을 LLM으로 확장할 수 있다.**

### 파운데이션 모델 (Foundation Model)

- 언어 모델은 놀라운 작업을 수행할 수 있지만, 글자에만 국한되어 있음
- 사람은 언어뿐만 아니라 다양한 감각들을 통해서 세상을 인식하므로, AI 또한 글자 이상의 데이터를 처리하는 능력이 꼭 필요함
- 이에 따라 언어 모델은 더 많은 모달리티를 포함하도록 확장되고 있음
- 파운데이션이라는 단어의 의미: 모델들이 AI 애플리케이션에서 갖는 중요성 및 다양성에 맞게 발전시킬 수 있다는 것
- 생성형 멀티모달 모델을 **대규모 멀티모달 모델(Large Multimodal Model, LMM)** 이라고도 부름
- 파운데이션 모델은 한가지 작업에만 국한도지 않고 다양한 작업을 수행할 수 있음
  - 만약 특정 작업에 대한 성능을 올리고 싶다면 파인튜닝(fine-tuning)을 통해 모델을 조정할 수 있음
- 모델이 원하는 결과물을 내놓도록 유도하는 기법들
  - **프롬프트 엔지니어링(prompt engineering)** : 상세한 지시를 모델에 입력하는 방법
  - **검색 증강 생성(Retrieval-Augmented Generation, RAG)** : 외부 지식을 활용해 모델의 답변을 보강하는 방법
  - **파인튜닝(fine-tuning)** : 모델에게 고품질 데이터셋을 제공해 특정 작업에 대한 성능을 올리는 방법

### AI 엔지니어링 (AI Engineering)

- AI 엔지니어링: 파운데이션 모델을 기반으로 애플리케이션을 만드는 과정
- 전통적인 ML 엔지니어링이 모델 자체를 개발하는 것이라면, AI 엔지니어링은 이미 존재하는 모델을 활용함

## 1.2 파운데이션 모델 활용 사례

- [There's An AI For That](https://theresanaiforthat.com/) 사이트에서, 다양한 파운데이션 모델 활용 사례를 찾아볼 수 있음
- [칩 후옌의 오픈 소스 AI 애플리케이션 목록](https://goodailist.com/)

### 코딩

- 가장 인기 있는 AI 활용 사례
- 코딩 작업 특화 도구들의 예시
  - 웹 페이지 및 PDF에서 구조화된 데이터 추출기
    - [AgentGPT](https://github.com/reworkd/AgentGPT)
  - 자연어를 코드로 변환
    - [DB-GPT](https://github.com/eosphoros-ai/DB-GPT)
    - [SQL chat](https://github.com/sqlchat/sqlchat)
    - [PandasAI](https://github.com/Sinaptik-AI/pandas-ai)
  - 디자인 및 스크린샷을 웹사이트로 변환하는 코드 생성기
    - screenshot-to-code
    - [draw-a-ui](https://github.com/sawyerhood/draw-a-ui)
  - 프로그래밍 언어 및 프레임워크 변환기
    - [GPT-Migrate](https://github.com/joshpxyne/gpt-migrate)
    - [AI Code Translater](https://github.com/mckaywrigley/ai-code-translator)
  - 문서 작성
    - [Autodoc](https://github.com/context-labs/autodoc)
  - 테스트 생성
    - [PentestGPT](https://github.com/GreyDGL/PentestGPT)
  - 커밋 메시지 생성
    - [AI Commits](https://github.com/Nutlope/aicommits)

### 그밖의 영역들

- 이미지 및 동영상 제작
- 글쓰기
  - SEO에 강한 면모
  - 다만 양산형 웹사이트들을 주의해야 할 것
- 교육
- 대화형 봇
  - 기업에게 가장 인기 있는 봇은 고객 지원 봇
  - 게임 속 3D 대화형 봇
- 정보 집계
  - '문서와 대화하기(talk-to-your-docs)'
  - 잠재 고객의 중요 정보 및 경쟁사 분석
- 데이터 체계화
  - 비정형 또는 반정형 데이터로부터 정형 데이터 추출
  - 이는 데이터 체계화 및 검색에 도움이 됨
- 워크플로 자동화
  - AI 에이전트 활용 (6장에서 알아볼 내용)
