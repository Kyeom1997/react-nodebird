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
