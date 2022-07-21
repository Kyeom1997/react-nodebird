# React로 NodeBird SNS 만들기

<br>

## 들어가며

해당 readme는 Zerocho 님의 인프런 강의인 [리뉴얼 React로 NodeBird SNS 만들기](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC/dashboard)를 수강하며 공부한 내용을 정리하였습니다.
<br><br>

---

<br>

# Chapter 1.

<br>

### Next.js

Next.js는 리액트를 사용한 프레임워크이며, 실무를 위해 갖추어진 것이 더 많다. 대신, 프레임워크의 특성상 정해진 틀 안에서 코딩을 해야 하기 때문에 코딩의 자유도가 줄어드는 단점이 있다.

Next.js의 가장 큰 장점 중 하나는 서버 사이드 렌더링(Server Side Rendering)이다.

### SSR (Server Side Rendering)

웹 개발자가 되려면 가장 큰 주체 3가지 (실무에서 최소 3개) 를 알아야 한다. 바로 브라우저, 프론트 서버, 백엔드 서버이다. 실무에서 브라우저가 프론트 서버로 blog 페이지를 요청하면, 프론트 서버에서는 백엔드 서버로 페이지의 게시글(/posts)을 요청한다. 백엔드 서버는 데이터베이스에 실제 게시글(data)을 요청하고, 다시 역순으로 데이터 베이스, 백엔드 서버, 프론트엔드 서버, 브라우저로 데이터가 전달되게 된다. 이것이 전통적인 방식의 SSR, 서버 사이드 렌더링이다.

#### 전통적인 방식의 SSR

![](https://velog.velcdn.com/images/hang_kem_0531/post/f4f2d795-6246-4751-a587-05b11df01d93/image.png)

### CSR (Client Side Rendering)

반면 리액트같은 SPA(Single Page Application)에서는, 페이지가 넘어가는 것이 아닌 하나의 페이지에서 컴포넌트만 이동하는 것이기 때문에 구조가 바뀌게 된다. 브라우저가 프론트 서버로 blog 페이지를 요청하면, 프론트 서버는 페이지에 필요한 html, js, css, img 파일등을 전달하는 데, 여기에는 데이터가 없다. 데이터가 없기 때문에 프론트엔드 개발자는 로딩창과 같은 창을 구현하여 브라우저에 Rendering을 해야 하고, 브라우저는 백엔드 서버에 직접적으로 한번 더 게시글을 요청하게 된다. 백엔드 서버는 데이터베이스에 게시글을 요청하고 응답을 받아 브라우저에 전송하게 된다. 이것이 리액트, 뷰, 앵귤러와 같은 SPA이 구동하는 방식, CSR(Client Side Rendering)이다.

#### Single Page Application

![](https://velog.velcdn.com/images/hang_kem_0531/post/a91ca751-40cb-4dc6-9e0c-84f258f63153/image.png)

### SSR & CSR의 장, 단점

- #### SSR

  **장점** : 전체 내용이 한번에 화면에 렌더링 된다. 검색 엔진에 최적화 되어있다. <br>
  **단점** : 한번에 데이터까지 받아오기 때문에 그 과정이 길어 로딩 속도가 느리다. (방문하지도 않을 페이지의 데이터까지 받아오기 때문에 비효율적임)

- #### CSR
  **장점** : 우선적으로 화면을 표출해 주고 데이터를 받아오기 때문에 각각의 요청 응답 과정이 짧다. (사용자는 빠른 사용자 경험을 느낀다고 착각함.) <br>
  **단점** : 결국 모든 데이터를 받아오는 시간은 SSR보다 길다. 우선적으로 화면을 표출할 때 컨텐츠가 없기 때문에 검색 엔진에 최적화 되어있지 않다 (로딩창만 보고 사용자들이 나가버려 검색엔진 순위가 내려갈 수 있음).

### CSR의 단점 해결책들

- #### Server Side Rendering

  첫 방문시에만 전통적인 SSR만 사용하고, 나머지 페이지 이동은 리액트 방식으로 (CSR) 방식으로 사용함

- #### Code Splitting
  CSR 방식으로 진행하지만, 전체 페이지에 대한 데이터를 전부 보내는 게 아니라, 방문한 페이지에 대한 데이터만 보냄.

#### Next.js를 쓸 필요가 없는 페이지?

- **admin page** - 고객들에게 반응속도가 중요한 것만큼, 관리자들에게는 크게 필요하지는 않다. 그냥 React로만 만들어도 충분함.

---

### Next.js 실행해보기

우선 `npm init`을 통해 package.json을 생성해보자. node project는 항상 package.json이 존재해야 한다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/73ccb537-99b8-4de3-aaec-461e0ce48b54/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/599b1398-b4c9-4aa7-8263-a0dd8de6087e/image.png)

그리고 강좌와 next version을 맞추기 위해 `npm i next@9`를 통해 Next.js를 설치해 준다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/e0611dc2-5288-4d79-8020-2b0260c58eea/image.png)

이제 Next를 실행해보기 위해 Pages라는 폴더를 만들어 주고 그 안에 index.js라는 파일을 생성해 코드를 작성해준다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/fb5e9126-4b77-4c38-ba7d-652c03955413/image.png)

여기서 React와는 다르게 `import React from 'react'`라는 구문을 상단에 쓰지 않아도 정상적으로 작동하는데, Next에서 pages라는 폴더를 감지하여 그 안의 js파일들을 각각의 코드 스플리팅된 컴포넌트로 인식하기 때문이다. 이제 `npm run dev`를 통해 Next를 실행해 보자.

![](https://velog.velcdn.com/images/hang_kem_0531/post/97a95c88-97a0-493c-ae46-c7ced48d7d18/image.png)

정상적으로 작동하는 것을 확인할 수 있다!

### Page와 레이아웃

![](https://velog.velcdn.com/images/hang_kem_0531/post/a361617f-0a8b-4626-9416-e1d1d0bd4588/image.png)
![](https://velog.velcdn.com/images/hang_kem_0531/post/47f78c65-14ee-48fc-9024-f49f3e3956ed/image.png)
![](https://velog.velcdn.com/images/hang_kem_0531/post/61d62929-c6f9-4a41-a5cd-b30b64aa2d52/image.png)

이제 pages 폴더에 위와 같이 구상한 컴포넌트들을 생성해주면, Next는 url과 컴포넌트들을 자동적으로 라우팅을 해주게 된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/24244458-8c5e-4f80-89f4-4f4473c9d4d5/image.png)
![](https://velog.velcdn.com/images/hang_kem_0531/post/b44204e1-1706-4c84-abb6-6d5df9c04aea/image.png)

pages 안에 새로운 폴더를 생성하여 컴포넌트를 생성하게 되면, url은 폴더의 이름까지 추가하여 라우팅을 하게 된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/75f2a478-f563-4f3b-bcff-3a305217a670/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/96884ba4-254d-4ba7-adaf-88c71f958e54/image.png)

URL이 아닌 다른 js 파일들은 대개 components 폴더를 만들어 그 안에 생성하게 된다. 이번 프로젝트에서 공통적으로 적용하게 될 레이아웃인 `AppLayout.js`를 생성해 보자.

![](https://velog.velcdn.com/images/hang_kem_0531/post/ceb6835a-cca9-4bae-aee1-c1e8605b3343/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/c9369d60-75dc-402c-a088-9f615c385631/image.png)

propTypes로 children의 타입을 지정해 주었다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/d4662325-d98e-4aff-ae15-3a7e8bf92cbe/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/4cbc19c3-6fc3-4d19-93d4-840b14db6197/image.png)

이제 위와 같이 `div`가 아닌 `AppLayout` 컴포넌트로 내용을 감싸주게 되면, components 폴더에 위치해 있던 AppLayout 컴포넌트가 Import 되어 공통 레이아웃이 적용되게 된다!

### Link

Next.js에는 자체적인 Router가 있다. 바로 Link이다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/be1e9745-f88e-4ce6-9ede-4d1039e733ee/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/f7210c6b-1e88-407c-9b51-867bd7b52774/image.gif)

next에서 link를 import 해온 뒤, href에 pages 폴더의 url들을 넣게 되면, 클릭 시에 해당 url로 이동하게 된다.

### Antd와 styled-components

이제 프론트 화면을 구성하기 위해 ant-design과 styled-components를 사용해 css와 design을 입혀보자.

![](https://velog.velcdn.com/images/hang_kem_0531/post/bda57dce-a650-4b63-a85c-af58b40b5754/image.png)

ant-design icon과 같은 경우에는 용량이 커서 별도의 라이브러리로 분리해놓았기 때문에 이것 역시 별도로 설치해 주어야 한다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/9982f608-cc05-4aa8-809b-4b2317f55381/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/0e8d9422-3f59-41fe-95bf-2f82dbbcffe6/image.png)

이렇게 antd에서 사용할 컴포넌트들을 import 해와서 사용하면 된다. 하지만 현재 css들이 깨져있는 모습을 확인할 수 있다.

### \_app.js와 Head

![](https://velog.velcdn.com/images/hang_kem_0531/post/05325446-949f-44e2-a1a5-e88cb9616829/image.png)

antd의 공식 문서를 살펴보면, stylesheet를 사용하려면 위와 같이 css 파일을 import 해오라고 나와있다. 원래 css 파일은 import 할 수 없지만, Next는 webpack에서 css를 보는 순간 style 태그로 변환하여 html 파일에 넣어주게 된다. 위와 같은 css 파일은 전역 컴포넌트에 공통적으로 사용되기 때문에 `_app.js` 파일을 생성해 적용해 주어야 한다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/a14483ab-071d-4011-917b-096464748007/image.png)

여기서 `<Component/>`는 index.js의 return 부분에 해당한다. 즉, \_app.js 는 index.js의 부모라고 볼 수 있다. 이렇게 변경해주고 npm run dev를 해보면 아까와는 다르게 스타일이 적용되어 있는 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/23668688-fa65-4bd2-8e55-bab96bdfc464/image.gif)

크롬이나 브라우저의 탭에서 나타나는 Head를 다르게 하려면 next/head에서 Head Component를 import해와서 사용하면 된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/9a81f179-1375-49e9-999c-cac41e117357/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/572764b2-66c9-4357-8cda-161ae24a1eec/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/b6093abe-c7dd-4ea4-a8fc-ee29773cb6e2/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/0366d4d7-f7fc-4403-baa0-139f25b1be53/image.gif)

### 반응형 그리드 사용하기

css 프레임워크에는 그리드 시스템이 있다. 웹에 반응형을 적용할 때에는 모바일 -> 태블릿 -> 데스크탑 순으로 구현하는 것이 좋다. 여기서 xs는 모바일, sm은 태블릿, md는 작은 데스크탑의 단위이다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/14c746d4-e975-4ebe-887c-1b9ac37aafc5/image.png)

여기서는 모바일일때는 각각의 Column이 24, 즉 전체를 다 차지해 스택처럼 3개가 쌓이게 되고, 데스크탑일때에는 첫번째 Column이 25%, 두번째 Column이 50%, 세번째 Column이 25%를 차지하게 된다. Row에 붙어있는 gutter라는 속성은, Column들이 너무 붙어있지 않도록 사이 사이에 padding 값을 넣어주는 역할이다.

세 번째 Column에 a 태그를 통해 내 velog로 이동해 줄 수 있게 하였는데, 이때 `target="_blank"`만 사용하게 되면 보안상의 위험이 발생할 수 있기 때문에, 별도로 `rel="noreferrer noopener"` 속성을 추가해 주었다.

### 로그인 폼 만들기

![](https://velog.velcdn.com/images/hang_kem_0531/post/26ff083f-288a-4d89-87bc-4fd18a258e41/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/002e825c-04a5-41df-ac94-0ff18dd794cb/image.png)

아직 백엔드 서버가 없기 때문에, 로그인을 실제로 구현할 수는 없으니 더미 데이터를 활용하여 로그인을 구현해보자. isLoggedIn이라는 state로 로그인 상황을 만들고, isLoggedIn일때는 사용자 프로필 컴포넌트를, 아닐 때에는 로그인 폼 컴포넌트를 보여주도록 하였다.

```jsx
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [input, setInput] = useState({
    id: "",
    pwd: "",
  });
  const { id, pwd } = input;
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <Form>
      <div>
        <label htmlFor="id">아이디</label>
        <br />
        <Input name="id" value={id} onChange={handleInput} required />
      </div>
      <div>
        <label htmlFor="pwd">비밀번호</label>
        <br />
        <Input
          name="pwd"
          type="password"
          value={pwd}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
```

여기서는 이전에 구현하였던 westagram 로직을 활용하여 id, pwd의 input value값을 한번에 관리하고 setter 함수 역시 handleInput이라는 함수로 한번에 state를 업데이트를 할 수 있게 구현하였다. 이전에 강의를 들을때는 뭐가 뭔지도 모르고 따라치기만 했는데 이제는 내가 사용하였던 코드들을 재활용하면서 클린 코딩을 어느정도 할 수 있게 된 것 같다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/3717259e-fc22-4484-be7b-0f0deeb52920/image.gif)

### 리렌더링 이해하기

비밀번호와 로그인, 회원가입 버튼이 너무 붙어있어서 버튼 상단에 margin 값을 주고자 한다. 하지만 주의해야 할 점이 있다.

```js
<div style={{ marginTop: 10 }}>
```

이런 식으로 style 안에다 객체를 넣으면 안된다. LoginForm이 리렌더링 될 때마다, 아래 LoginForm 함수는 전체적으로 재 실행이 되는데, 이때 객체와 객체를 비교하게 되면 false가 나오게 된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/b85be907-e993-4edf-baf9-29e8d1c94235/image.png)

그렇기 때문에 React의 Virtual DOM에서 div 태그의 inline-style에서 객체를 리렌더링시에 다르다고 인식하게 되어 div 태그 전체가 리렌더링 되게 된다. 이는 매우 비효율적이므로, styled-components를 사용해야 한다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/ea5590dd-c41f-44a2-abc1-10454bf000fa/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/c428f157-03c6-418c-bf2a-215fbd0c0145/image.png)

만일, styled-components를 사용하고 싶지 않다면 useMemo Hooks를 사용하면 된다. useMemo는 memoization 된 값을 반환해주는 함수이다. 그렇기 때문에 다음과 같이 작성하면 리렌더링이 되어도 같은 객체를 사용할 수 있다.

```jsx
const style = useMemo(() => ({ marginTop: 10}), []);

<ButtonWrapper style={style}>
```

### 더미 데이터로 로그인하기

LoginForm을 감싸고 있는 FormWrapper에 onFinish 속성을 주어, onSubmitForm 함수를 실행하도록 하였다. 여기서, onFinish는 자동으로 e.preventDefault()가 적용이 되어있기 때문에 antd에서는 e.preventDefault()를 쓰면 안된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/e5438db5-dd74-4317-89d2-9692d1b43f7e/image.png)

그리고 AppLayout 컴포넌트에서 각각 UserProfile, LoginForm 컴포넌트로 setLoggedIn 함수를 props로 전달해 주었다. 그리고, UserProfile에서는 로그아웃 버튼을 클릭할 시에 onClick 함수로 `setLoggedIn(false)`를, LoginForm에서는 로그인 버튼을 클릭할 시에 `setLoggedIn(true)`를 실행하게 하였다. 이렇게 하면 더미 데이터로 로그인 기능을 구현할 수 있다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/4b277bac-c3bb-4691-afbe-8b5264f473b8/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/ee108084-bd70-4431-9377-94a9b87cb654/image.png)

### 리덕스 설치와 필요성 소개

#### 리덕스란?

리덕스를 사용하기 전까지는, 여러 컴포넌트들에서 쓰이는 공통적인 데이터들을 전달하려면 하나의 부모 컴포넌트에서 자식 컴포넌트들에게 일일히 전달해주는 방식을 사용해야 했다. 그러나 컴포넌트들의 양이 너무 많아지고, 매번 수동적으로 부모 컴포넌트들을 만들어준 뒤에 자식 컴포넌트들에게 보내주는 방식이 매우 비효율적이었기 때문에, 하나의 중앙 스토어에서 데이터를 관리해주는 방식이 필요해졌다. 그 역할을 해주는 것이 바로 리덕스(Redux)이다.

Next에 리덕스를 붙이려면 과정이 매우 복잡한데, 이를 쉽게 하기 위해서는 next-redux-wrapper 라이브러리를 사용하면 된다. next-redux-wrapper에서는 store 폴더를 별도로 생성하여 그 안에 `configureStore.js` 파일을 생성하여 사용하면 된다.

```jsx
import { createStore } from "redux";
const { createWrapper } = require("next-redux-wrapper");

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
```

configureStore.js 파일을 생성했으면 \_app.js 파일의 마지막 export 구문을 `wrapper.withRedux`로 감싸주면 된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/eec852f9-8000-4cf8-938e-73d80bf3f713/image.png)

리액트를 사용할때는 중앙 저장소 역할을 하는 것을 하나 정도는 두는 것이 좋다. (Context API, Redux, MobX, Apollo..) 데이터 관리가 용이한데 컴포넌트 별로 데이터를 들고 있게되면 서로 컴포넌트간에 데이터가 불일치해서 다른 화면을 렌더링 할 수도 있다. 그러므로 데이터는 중앙에서 한번에 관리하는 것이 좋다.

여기서 MobX와 Redux의 차이는 Redux는 코드의 양이 많아지는 대신, 원리가 매우 간단하기 때문에 에러가 발생하여도 해결이 용이하고, MobX는 코드의 양이 훨씬 줄어드는 대신 에러가 발생하였을때 tracking 하기가 힘들어진다.

만일 라이브러리를 사용하고 싶지 않다면, Context API를 사용하면 되는데 라이브러리에 비해 비동기를 지원하기에 어렵다는 단점이 있다. 중앙 저장소가 존재할 경우, 서버에서 데이터를 많이 받게 되는데 이는 비동기이다. 비동기를 다룰 때에는 서버의 고장이나 네트워크 에러와 같은 실패에 대비해야 하는데 (데이터 요청 - 성공 - 실패), 이를 Context API에서 구현하려면 사용자가 일일히 구현을 해줘야 한다.

```jsx
// UserProfile.js에 있는 코드

useEffect(() => {
  axios
    .get("/data")
    .then(() => {
      setState(data);
    })
    .catch(() => {
      setError(error);
    });
});

// LoginForm.js에 있는 중복된 코드

useEffect(() => {
  axios
    .get("/data")
    .then(() => {
      setState(data);
    })
    .catch(() => {
      setError(error);
    });
});
```

컴포넌트는 화면을 그리는데에만 집중하는 것이 좋은데, 데이터까지 다루게 될 경우 의도치 않은 코드 중복이 발생하게 된다. 하지만 Redux와 MobX와 같은 라이브러리를 사용하게 되면 위와 같은 비동기 동작을 맡길 수 있다. 그렇기 때문에 데이터를 관리할때에는 처음부터 Redux와 MobX와 같은 라이브러리를 사용하는 편이 좋다.

### 리덕스의 원리와 불변성

Redux는 Reduce에서 이름을 따온 것이다. Redux에서는 데이터를 변경하려면 action을 필수적으로 만들어야 한다. 중앙 저장소에 있는 데이터를 수정할 일이 생기면 action을 생성하고 이 action을 dispatch 하면 중앙 저장소에 있는 data가 수정되게 된다. 이때 이 중앙 저장소에 있는 data들을 가져다 쓰는 컴포넌트들의 데이터도 모두 수정된다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/cddc4f7b-40da-4393-b5c4-ab8c9c97e312/image.png)

하지만 자바스크립트에서는 dispatch만 해준다고 해서 해당 action이 뭘 의미하는지 모르기 때문에, reducer를 사용해서 데이터를 어떻게 바꿀 것인지 사용자가 명시해주어야 한다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/b51459d2-cfa1-48ce-b829-4b0e8f77ddbf/image.png)

이렇게 reducer와 action을 사용하게 되면 어떤 action과 reducer가 무슨 일을 하고 있는지 한눈에 확인할 수 있기 때문에, 에러가 발생했을 시에 tracking 하기에 몹시 용이하다.

또한 히스토리처럼 Reducer와 action이 나열되어 있기 때문에, devTools를 사용하면 데이터를 뒤로 돌렸다가 다시 앞으로 감는 등의 테스트를 하기에 용이하다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/75bb423f-36b9-4431-8a5b-49677b6f9c32/image.png)

그리고 reducer 구문 안에서 위 그림과 같이 return을 적어 주는 이유는 불변성(Immutability) 때문이다. JavaScript에서 `{} === {}`는 `false`이고, `const a = {}; const b = a; a === b // true`이기 때문에 객체를 새로 만들면 false이고 객체의 참조관계가 있으면 true라는 사실을 알 수 있다. 그러므로 위 구문에서는 return 안에 새로운 객체를 만들어 주었기 때문에 계속 다른 객체를 return 하는 것이다. 여기서 객체를 새로 만드는 이유는 변경된 내용들을 추적하기 위함이다.

아래 코드를 보면 prev에는 이전 기록이 있고 next에는 다음 기록이 있는데 이전기록도 남아있고 다음 기록도 남아있다. 즉, 이전 기록과 다음 기록이 남아있기 때문에 새롭게 객체를 만들어 주는 것이다.

```js
const prev = { name: "zerocho" };

const next = { name: "boogicho" };
```

만일

```js
const prev = { name: "zerocho" };

const next = prev;

next.name = "boogicho";
```

라고 직접 바꿔버리면

```js
prev.name; // boogicho
```

참조관계이기 때문에 위와 같이 나오게 된다. 즉, 히스토리가 사라진다. 그리고 스프레드 연산자를 통해 참조관계를 유지하는 것은 메모리를 아끼기 위해서이다.

```jsx
{
	...state,
    name: action.data,
}

// vs

{
	name: action.data,
    age: 27,
    password: 'babo'

}
```

### 리덕스 실제 구현하기

우선, reducer를 모아놓을 폴더일 reducers 폴더를 생성한 후, index.js 파일을 생성한다. rootReducer에는 이전 상태와 action을 parameter로 받아, switch 문으로 다음 상태를 업데이트 해준다. 지금은, 로그인, 로그아웃 기능을 구현하기 위해 상단에 initialState를 선언해 준 뒤, 로그인, 로그아웃 case를 구현해 놓았다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/cc526574-0933-433c-b256-62ab484ee237/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/dd7f3a08-1314-4fc4-a80d-93e821e874ce/image.png)

그런 다음, 앞서 useState로 구현해놓았던 AppLayout, LoginForm, UserProfile 컴포넌트들의 state를 변경해 주었다. 여기서, useSelector와 useDispatch는 react-redux 라이브러리의 Hooks들로, 각각 스토어의 상태값 반환과 action 발생을 해준다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/d4adc980-cdc0-40d8-a8ad-14434d05a72c/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/631ac780-8755-4d8e-b4a2-45539cf2e02f/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/1aba2591-5455-4b0d-96bf-279c4c689292/image.png)

### 리듀서 쪼개기

지금은 리듀서의 양이 작지면, 프로젝트의 규모가 커지게 되면 사용하게 될 리듀서의 양이 늘어나게 된다. 그렇기 때문에, 컴포넌트처럼 리듀서도 공통적인 파일로 쪼개서 사용하는 것이 좋다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/3c51a447-b1be-4dfb-9f4e-7a8be644a378/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/0553e6a8-becd-4c6b-a049-7e69ce9d6f85/image.png)

![](https://velog.velcdn.com/images/hang_kem_0531/post/85d905c9-9599-4d9c-bb88-e5e31852810a/image.png)

reducer 폴더 안에 분리시킬 post, user.js 파일을 생성하고, index.js에 있던 initialState와 action, reducer들을 각각의 파일로 옮겨 주었다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/fa904ba7-1971-4ae9-93bd-b11a15d1d41c/image.png)

그리고 index.js에서 해당 reducer들을 import 해오면 되는데, 리덕스에서는 분리한 reducer들을 합쳐서 사용하기 위해 combineReducers를 사용한다. 이때, 추후 SSR 때문에 HYDRATE를 위해 index 항목을 추가해 준다.

### 더미 데이터와 포스트폼 만들기

![](https://velog.velcdn.com/images/hang_kem_0531/post/46ecd5ca-8d95-4370-950a-275ae9e47637/image.png)

더미 데이터로 게시글을 구현하기 위해, 기존 게시글과 추가될 게시글을 더미 데이터로 만들어 놓았다. 그리고 action type을 상수로 분리해 놓았는데, 이렇게 해놓는 이유는 자동완성이 되어서 오타가 줄고, 재활용하기 편리하기 때문이다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/cef3a5ac-4934-44ed-99e8-e3ebbeade730/image.png)

ADD_POST action이 dispatch 되면, postAdded가 true가 되고, mainPosts에 dummyPost가 추가되게 된다. 이때 ...state.mainPosts 앞에 dummyPost를 쓴 이유는, 새 게시글이 추가되면 기존 게시글의 위로 나타나게 해야 하기 때문이다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/319fceff-7285-4ffb-b4a4-010f12b11c4b/image.png)

기존의 index.js를 위와 같이 수정하였다. 로그인이 되었을 시에만 postForm, 즉 게시글 입력창을 보여주고, 아래에는 mainPosts를 map으로 돌려 게시글들을 나타내게 하였다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/06da5de2-bfdd-44c9-8c5a-df3d9289fcd4/image.png)

PostForm의 형태이다. 여기서 이미지 업로드 버튼을 눌렀을 때, 파일 선택기가 나오게 하기 위해서 useRef를 활용해 버튼을 클릭했을 때, `imageInput.current.click()` 함수가 실행되게 하였다.

![](https://velog.velcdn.com/images/hang_kem_0531/post/b2e9b301-7f5a-43c4-8357-dc251cd4b3b8/image.gif)![](https://velog.velcdn.com/images/hang_kem_0531/post/bc14f107-33f5-4db0-abda-f0aac95fc47b/image.png)
