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

<br>
next는 리액트를 사용한 프레임워크이며, 실무를 위해 갖추어진 것이 더 많다. 대신, 프레임워크 특성상 정해진 틀 안에서 코딩을 해야 하기 때문에 코딩 자유도가 줄어드는 단점이 있다.
<br><br>
next의 가장 큰 장점 중 하나는 서버 사이드 렌더링(Server Side Rendering)이다.
<br><br>

> <br>서버 사이드 렌더링 (Server Side Rendering) <br><br>
> 서버 사이드 렌더링이란, 서버에서 페이지를 그려 클라이언트(브라우저)로 보낸 후 화면에 표시하는 기법을 의미한다. 서버 사이드 렌더링은 페이지를 이동할 때마다 새로운 페이지를 요청한다. <br><br>

<br><br>

### SSR & CSR

<br>

![image](https://user-images.githubusercontent.com/78855917/129746911-db8940f2-ce69-4a21-9b5a-9ad8fdd44743.png)
<br><br>

웹 개발자가 되려면 가장 큰 주체 3가지 (실무에서 최소 3개) 를 알아야 한다. 바로 브라우저, 프론트 서버, 백엔드 서버이다. 실무에서 브라우저가 프론트 서버로 blog 페이지를 요청하면, 프론트 서버에서는 백엔드 서버로 페이지의 게시글을 요청한다. 백엔드 서버는 데이터베이스에 실제 게시글을 요청하고, 다시 역순으로 데이터 베이스, 백엔드 서버, 프론트엔드 서버, 브라우저로 데이터가 전달되게 된다. 이것이 전통적인 방식의 SSR, 서버 사이드 렌더링이다.
<br><br>
반면 리액트같은 SPA(Single Page Application)에서는, 페이지가 넘어가는 것이 아닌 하나의 페이지에서 컴포넌트만 이동하는 것이기 때문에 구조가 바뀌게 된다. 브라우저가 프론트 서버로 blog 페이지를 요청하면, 프론트 서버는 페이지에 필요한 html, js, css, img 파일등을 전달하는 데, 여기에는 데이터가 없다. 데이터가 없기 때문에 프론트엔드 개발자는 로딩창과 같은 창을 구현하여 브라우저에 렌더 시켜놔야 하고, 브라우저는 백엔드 서버에 직접적으로 한번 더 게시글을 요청하게 된다. 백엔드 서버는 데이터베이스에 게시글을 요청하고 응답을 받아 브라우저에 전송하게 된다. 이것이 리액트, 뷰, 앵귤러와 같은 SPA이 구동하는 방식, CSR(Client Side Rendering)이다.
<br><br>

> <br> SSR & CSR의 장, 단점
> <br><br>
> SSR
> <br> <br>
> 장점 : 전체 내용이 한번에 화면에 렌더링 된다. 검색 엔진에 최적화 되어있다. <br>
> 단점 : 한번에 데이터까지 받아오기 때문에 그 과정이 길어 로딩 속도가 느리다. (방문하지도 않을 페이지의 데이터까지 받아오기 때문에 비효율적임)
> <br><br>
> CSR
> <br><br>
> 장점 : 우선적으로 화면을 표출해 주고 데이터를 받아오기 때문에 각각의 요청 응답 과정이 짧다. (사용자는 빠른 사용자 경험을 느낀다고 착각함.) <br>
> 단점 : 결국 모든 데이터를 받아오는 시간은 SSR보다 길다. 우선적으로 화면을 표출할 때 컨텐츠가 없기 때문에 검색 엔진에 최적화 되어있지 않다 (로딩창만 보고 사용자들이 나가버려 검색엔진 순위가 내려갈 수 있음).
> <br><br>

<br>
이와 같은 해결책에는 두 가지가 존재하는데, 바로 서버 사이드 렌더링(SSR)과 프리렌더(Pre-Render)이다. 코드 스플리팅이라는 기술로 처음 방문한 페이지의 코드만 보내주는 방법이 있고, 검색엔진이라는 것을 알아차리고 검색엔진일때만 
백엔드에서 프론트로 받아 html로 완성해서 전달하고 일반 유저일때는 리액트 방식으로 전달하는 해결 방안들이 있다.

<br><br>

### 설정하기

<br>

1. front와 back 폴더를 구분하여 만들어 주고, 우선 front 폴더에서 `npm init`을 실행한다.

2. `npm i next react react-dom`을 설치한다.

3. package.json 파일에서 scripts의 test를 삭제하고 `"dev": "next"`로 변경한다. `npm run dev`를 터미널에 입력하면 `npm run next`가 실행된다.

4. `next`는 `pages`라는 폴더 안에 페이지를 정의해야 하기 때문에 `pages` 폴더를 생성해 준다. 이와 같이 폴더를 생성하면 개별적인 폴더로 인식, 즉 코드 스플리팅된 컴포넌트로 만들어 주기 때문에 react-router dom이 필요없이 페이지 이름이 리소스 이름인 페이지가 생성이 된다.

<br><br>

### 레이아웃 (상속개념)

<br>
components 폴더를 생성하여 AppLayout.js를 생성한다.
<br><br>

```js
import React, { children } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>공통 메뉴</div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
```

<br>
이때 children 값이 props로 넘어가기 때문에 propTypes를 통해 검사를 진행한다. 여기서 children은 node 타입으로 지정해 주었고, node.js의 node가 아니라 리액트의 요소들을 칭한다. 즉, return 안에 들어가는 모든 것들이 node이다. 이와 같이 컴포넌트를 생성한 후, 다른 컴포넌트에서 불러오면, 감싸진 요소가 children이 된다.
<br><br>

```js
import React from "react";
import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
    <AppLayout>
      <div>Hello, Next!</div>
    </AppLayout>
  );
};

export default Home;
```

<br><br>

### Link와 Eslint

<br>

### Link

<br>

Next는 리액트 라우터를 사용하지 않고, `import Link from "next/link";`를 선언한 후, Link 태그를 사용하면 링크 기능을 사용할 수 있다.
<br><br>

```js
import React, { children } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>노드버드</a>
        </Link>
        <Link href="/profile">
          <a>프로필</a>
        </Link>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
```

<br>

### Eslint

<br>

Eslint는 코드 스타일을 가이드 해 줌으로써, 팀 프로젝트시 일관된 코드를 만들어 줄 수 있게 도와준다. `npm i -D eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks`를 통해 설치한 후에, `.eslintrc` 파일을 생성한다.

```eslintrc
{
    "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommend",
        "plugin:react/recommended"
    ],
    "plugins": [
        "import",
        "react-hooks"
    ],

}
```

<br>

### CH.1 Q&A

<br>

- CORS : 서버 사이드 렌더링시에, 백엔드 서버와 프론트엔드 서버의 도메인(포트)이 다르기 때문에 CORS가 걸린다. 그렇기 때문에 백엔드 서버에서 CORS를 설정해 주어야 한다.

> <br> CORS(Cross-Origin Resource Sharing) : 브라우저에서 Domain 주소가 다르면 요청을 막아버리는 에러 <br><br>

- 브라우저가 리액트면, 프론트 서버는 노드, 백엔드 서버에 노드가 하나 더 있는 것이다. (노드가 두개, 서버를 두개로 구축하는 것이다.) 여기서 프론트 서버란 웹팩 데브서버나 클라우드 서버를 말한다. 프론트 서버에서 백엔드 서버로 요청을 보내는 것, 즉, 서버끼리 통신을 할때에는 CORS 에러가 발생하지 않는다.
  <br><br>

---

<br>

## Chapter 2.

<br>

### antd (ant-design)

<br>
Antd는 CSS 프레임워크이다. 리액트, 뷰, 앵귤러에서 모두 사용 가능하다. 버튼, 아이콘과 같은 UI 요소들이 미리 만들어져 있기 때문에 가져와서 사용하기만 하면 된다는 장점이 있다. Antd 이전에는 Bootstrap, Material UI와 같은 프레임워크를 사용했는데 획일화된 디자인을 가져다 쓴다는 단점이 있다. 그렇기 때문에 고객이 있는 페이지를 개발할 때는 CSS 프레임워크를 사용하지 않고, 디자이너와 협업하는 경우가 많다. 
<br><br>
그 외 디자인은 styled-components를 사용한다.
<br><br>

```
npm i antd styled-components
```

<br>

### \_app.js

<br>
파일에서 공통적으로 사용하는 부분은 pages 폴더 안에 _app.js라는 파일을 생성하여 사용한다. _app.js는 모든 페이지의 공통으로 해당하는 부분이고 components 폴더 안의 AppLayout.js는 부분적으로 사용한다.
<br><br>

```js
import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

const NodeBird = ({ Component }) => {
  return <Component />;
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
```

<br>
antd의 css 파일이 모든 페이지에 해당되기 때문에 _app.js 파일에서 불러와 주었다.
<br><br>

만일 head 부분의 수정이나 변경이 필요할 경우, next에서 head 컴포넌트를 불러오면 된다. 공통된 head라면 \_app.js에서 불러오면 되고, 그렇지 않다면 index.js와 같은 특정 페이지에서 불러오면 된다.
<br><br>

```js
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />;
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
```

<br>

```js
import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>내 프로필</AppLayout>
    </>
  );
};

export default Profile;
```

<br>

### 반응형 그리드 사용하기

<br>
AppLayout.js에 Input 버튼을 추가하고, enterButton 이라는 props를 antd로 불러와 파란색 버튼이 적용되도록 하였다. 
<br><br>

```js
<Menu.Item>
  <Input.Search enterButton />
</Menu.Item>
```

<br>

![enterbutton](https://user-images.githubusercontent.com/78855917/129900102-346acf08-6e47-4c02-9144-829a4dff7bf0.jpg)
<br><br>
그러나 input 버튼의 배치가 옆의 버튼들과 다르게 위로 배치되어 있기 때문에 이를 재배치 해주어야 한다. 이때 Input.Search 컴포넌트 안에 style을 주면 기본 CSS 처럼 앤트 디자인의 CSS를 덮어 씌울 수 있다.
<br><br>

```js
<Menu.Item>
  <Input.Search enterButton style={{ verticalAlign: "middle" }} />
</Menu.Item>
```

<br>
그리고 이러한 CSS 프레임워크에는 반응형 그리드라는 것이 있다. 여기서 반응형 그리드란, 모바일 페이지, 태블릿 페이지, 웹 페이지와 같이 다른 화면의 크기에 따라 컴포넌트와 같은 것들이 재배치되는 것이다. 반응형을 디자인 할 때는 모바일 페이지를 먼저 구상해야 한다.
<br><br>

```js
<Row gutter={8}>
  <Col xs={24} md={6}>
    {isLoggedin ? <UserProfile /> : <LoginForm />}
  </Col>
  <Col xs={24} md={12}>
    {children}
  </Col>
  <Col xs={24} md={6}>
    <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made By Zerocho
  </Col>
</Row>
```

<br>

여기서 xs는 모바일, sm은 태블릿, md는 노트북, lg는 데스크탑과 같이 각각 px이 정해져 있다. 24로 나누는 이유는 나누어지는 숫자가 많기 때문이다. gutter는 각 column 사이의 padding을 지정해 준다. 각 column 끼리 너무 붙는 현상을 방지해 준다. a 태그로 새창을 열때는 `target="_blank`를 사용하는데, 이는 보안 위험이 있기 때문에 `rel="noreferrer noopener"`를 같이 지정해 주는 편이 좋다. 현재는 데이터가 없기 때문에 state를 활용해 더미 데이터를 사용해 로그인 기능을 갖추어 놓았다.
<br><br>

### 로그인 폼 만들기

<br>
components 폴더에 LoginForm.js 파일을 생성한다.
<br><br>

```js
import React, { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback(() => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback(() => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
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

<br>

Label 태그에서 for 속성을 사용하기 위해서는 아래와 같이 정의해야 한다.
<br><br>

```js
<label htmlFor="user-id">ID</label>
```

<br>

Antd Button 태그에서 type 속성을 사용하기 위해서는 아래와 같이 정의해야 한다. 여기서 type 속성은 버튼의 색상을 의미한다.
<br><br>

```js
<Button type="primary" htmlType="submit">
  Signup
</Button>
```

<br>
또한 컴포넌트에서 Props로 넘겨지는 함수는 useCallback을 써주면 최적화가 이루어지기 때문에 써주는 것이 좋다.
<br><br>

```js
const onChangeId = useCallback(() => {
  setId(e.target.value);
}, []);

const onChangePassword = useCallback(() => {
  setPassword(e.target.value);
}, []);
```

<br>

> <br> useCallback <br>
> useCallback은 함수를 캐싱 (또는 메모지에이션)할 때 사용하는 훅이다. useMemo는 특정 결과값을 재사용할때 사용하는 반면, useCallback은 특정 함수를 새로 만들지 않고 사용하고 싶을 때 사용한다. <br><Br>

<br>

### 리렌더링 이해하기

<br>
함수형 컴포넌트에서 리렌더링이 될 때는 함수안의 부분이 다시 실행되는 것은 맞지만, useCallback으로 감싸 준 함수는 캐싱이 되어서 이전 컴포넌트와 현재 컴포넌트가 같다고 인식하게 된다. return JSX 부분에서는 바뀐 부분만 다시 리렌더링이 된다. <br><br>
그렇기 때문에 태그에 style 객체를 넣게 되면, 리렌더링 될 때마다 함수가 전체 실행이 되는데, style 쪽에 객체를 새로 생성한 것이므로 객체와 객체를 비교시에 false가 나온다.
<br><br>

```
{} === {} //false
```

<br>
리액트는 매번 Virtual DOM으로 이전 버전과의 변경점을 찾기 때문에 이전 버전과 객체가 다른 것을 감지하고 리렌더링을 하게 된다. 이 부분은 styled-components로 해결할 수 있다. 
<br><br>

```js
import styled from "styled-components";
(...)

const ButtonWrapper = styled.div`
  margin-top: 10;
`;

(...)

<ButtonWrapper>
    <Button type="primary" htmlType="submit" loading={false}>
      로그인
    </Button>
    <Link href="/signup">
      <a>
        <Button>회원가입</Button>
      </a>
    </Link>
</ButtonWrapper>
```

<br>
만일 styled-components를 사용하고 싶지 않다면, useMemo를 사용하면 된다. 
<br><br>

```js
const style = useMemo(() => ({marginTop: 10}), []);

(...)

<div style={style}> </div>

(...)
```

<br>

### 더미 데이터로 로그인하기

<br>

LoginForm.js의 `<Button>` 태그에 `htmlType="submit"` 속성을 추가하고, 이를 감싸고 있는 `<Form>` 태그에 `onFinish={onSubmitForm}` 속성을 준다. 여기서 onFinish는 `e.preventDefault()`가 자동으로 내장되어 있다. 그렇기 때문에 추가적으로 쓰면 안된다.
<br><br>

AppLayout.js의 setIsLoggedIn 함수를 props로 넘겨 Loginform 파일로 전달하고
<br><br>

```js
const [isLoggedIn, setIsLoggedIn] = useState(false);

(...)

<Col xs={24} md={6}>
  {isLoggedIn ? (
    <UserProfile setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <LoginForm setIsLoggedIn={setIsLoggedIn} />
  )}
</Col>
```

<br>

LoginForm.js 에서 인자로 받게 된다.
<br><br>

```js
const LoginForm = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

(...)
 const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);
```

<br>
이렇게 하면 onSubmitForm 함수에서 버튼이 눌리게 되면, setLoggedIn 함수가 true가 되어 더미 데이터로 로그인 기능이 활성화 되게 된다.
<br><br>

UseProfile.js에서는 antd에서 Card 컴포넌트를 가져와 로그인 시 사용자의 여러 정보들을 표시할 수 있게 구현해 주었다.
<br><br>

```js
const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>HK</Avatar>} title="Kyeom" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
```

<br>
리액트에서 배열 안에 JSX를 사용하고 싶을 때는 해당 예시처럼 key 값을 지정해 주어야 한다. 마찬가지로 UserProfile.js에서 역시 로그아웃 버튼을 클릭시 setLoggedIn이 false가 되게 하여 더미 데이터로 로그아웃 기능을 활성화 시켜 주었다.
<br><br>

### 프로필 페이지 만들기

<br>

profile.js의 `<AppLayout>` 컴포넌트 사이에 `<NicknameEditForm />`, `<FollowList header="팔로잉 목록" data={followingList} />`, `<FollowList header="팔로워 목록" data={followerList}/>`와 같은 컴포넌트들을 추가해 주었다. 이 팔로잉, 팔로워 목록에 들어갈 데이터 들은 컴포넌트 상단에 더미 데이터로 구현해 두었다.
<br><br>

```js
const followerList = [
  { nickname: "김형겸" },
  { nickname: "이준희" },
  { nickname: "김은정" },
];
const followingList = [
  { nickname: "김형겸" },
  { nickname: "이준희" },
  { nickname: "김은정" },
];
```

<br>
이렇게 우선 가상의 컴포넌트를 생성하고, 더미 데이터를 생성하여 틀을 잡아둔 후, 세부 구현을 하는 편이 훨씬 효율적이고 리액트에 익숙해지는 방법이 될 수 있다. 이제 미리 추가해 둔, NicknameEditForm.js와 FollowList.js를 구현하면 된다. 실무에서는 Form을 일일히 만드는 것은 비효율적이니 React Form과 같은 것들을 사용하는 편이 좋다.
<br><br>

```js
import React, { useMemo } from "react";
import { Form, Input } from "antd";

const NicknameEditForm = () => {
  const style = useMemo(
    () => ({
      marginBottom: "20px",
      border: "1px solid #d9d9d9",
      padding: "20px",
    }),
    []
  );

  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;
```

<br>

```js
import React from "react";
import { Card, List, Button } from "antd";
import Item from "antd/lib/list/Item";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default FollowList;
```

<br>

여기서 아이콘은 antd가 아니라 `@ant-design/icons`에서 가져와 사용하면 된다. 또한 팔로워와 팔로잉 컴포넌트가 같은데, props 개수가 많지 않으면 같은 컴포넌트에서 props만 다르게 해서 구현해도 괜찮다.
