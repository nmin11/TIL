※ 본문은 노마드코더의 [당근마켓 클론코딩](https://nomadcoders.co/carrot-market) 을 학습하면서 챕터 7 - React Hook Form 을<br>정리한 내용임을 알립니다.

<br>

## 설치

```bash
npm i react-hook-form
```

<br>

## 개요

- HTML에서 좋은 form을 만들고자 한다면 굉장히 많은 요소들에 대한 작업을 해야 함
  - email 형식이나 닉네임의 최소 길이, 혹은 로딩 중일 때 form을 다시 제출하는 작업,<br>백엔드에서 보내온 에러 문구 출력 등
- 이런 작업들을 편하게 해주는 것이 React Hook Form

<br>

## 기본 사용 방법

- 모든 것은 useForm Hook으로부터 나옴
- 설정 예시 : `const { register } = useForm();`
- register 함수는 input과 state를 연결해주는 역할
  - 모든 input들을 알아서 객체화
- 사용 예시 : input 태그 안에 `{...register("username")}` 삽입
  - 이렇게만 사용하면 name과 onChange 등을 알아서 잡아줌

<br>

## Validation

- HTML의 input 태그에 있는 required는 개발자 도구를 통해 지워버릴 수 있음
- React Hook Form을 활용하면 이를 JavaScript의 작업을 통해 지울 수 없게 할 수 있음
- 사용 예시 : input 태그 안에 `{...register("username", {required: true})}` 설정
- register의 2번째 인자가 바로 required 등의 설정에 관한 것
- register의 2번째 인자에 required, minLength, validate 등의 조건을 넣을 때,<br>메세지도 같이 넣어서 원하는 에러 메시지를 띄울 수도 있음
- 이를 사용하기 위해서는 HTML form의 onSubmit을 설정해야 함

※ handleSubmit 설정

```js
const { register, handleSubmit } = useForm();
const onValid = () => {
  console.log("I'm Valid!")
}

...

<form onSubmit={handleSubmit(onValid)}>

...

</form>
```

- handleSubmit은 event.preventDefault와도 같지만 더욱 강력함
  - 2개의 인자 값으로 onValid와 onInvalid 함수를 넣을 수 있으며, 1개는 반드시 넣어야 함
  - form의 유효성에 맞는 처리를 함수에 따라 진행함

<br>

## Errors

※ form의 에러를 바로 출력하는 예시

```js
const { register, handleSubmit, formState: {errors} } = useForm<LoginForm>({
  mode: "onChange"
});

...

<input
  {...register("email", {
    required: "Email is required",
    validate: {
      notGmail: (value) =>
        !value.includes("gmail.com") || "Gmail is not allowed"
    }
  })}
  type="email"
  placeholder="Email"
/>
{errors.username?.message}
```

- mode에는 onSubmit, onBlur, onChange, onAll이 있으며,<br>여기서 지정한 것에 맞는 타이밍에 유효성을 검증함

<br>

### ※ API 문서에서 더 많은 기능 찾아보기

https://react-hook-form.com/api

- setError : 에러 수동 설정
- reset : form state reset
- resetField : 개별 field state reset
