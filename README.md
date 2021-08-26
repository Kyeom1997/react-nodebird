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

# Chapter 2.

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
<br><br>

### 회원가입 페이지 만들기 (커스텀 훅)

<br>

```js
import React, { useCallback, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원 가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
```

<br>
회원가입 페이지인 signup.js를 구현했다. antd의 Form, Input, Checkbox, Button을 활용했으며, 중복되는 useState 구문들은 별도의 커스텀 Hooks를 생성하여 불러왔다. 
<br><br>

```js
import { useState, useCallback } from "react";

export default (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};
```

<br>

대부분의 아이디, 닉네임, 비밀번호 Form에서 중복되는 State들을 이렇게 커스텀 Hooks로 만들어 사용하면 번거롭게 여러 번 useState를 통해 입력하지 않아도 단순히 `const [id, onChangeId] = useInput("");` 과 같이 간단한 문장으로 구현할 수 있다. 다만, 해당 컴포넌트에서 비밀번호 체크와 약관 동의 기능은 중복되지 않는 문장이므로 커스텀 Hooks를 사용하지 않고 별도로 입력하였다.
<br><br>

```js
const [passwordCheck, setPasswordCheck] = useState("");
const [passwordError, setPasswordError] = useState(false);
const onChangePasswordCheck = useCallback(
  (e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  },
  [password]
);
const [term, setTerm] = useState("");
const [termError, setTermError] = useState(false);
const onChangeTerm = useCallback((e) => {
  setTerm(e.target.checked);
  setTermError(false);
}, []);
```

<br>

해당 구문에서 발생되는 에러들은 `{termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}`, `{passwordError && ( <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage> )}` 와 같이 활용할 수 있다. `<ErrorMessage>` 태그는 styled-componenets를 활용한 태그이다.
<br><br>

![Hnet com-image](https://user-images.githubusercontent.com/78855917/130360875-cd268bf3-7fa2-463f-97ad-b467fb6e918b.gif)
<br>

![gdrd](https://user-images.githubusercontent.com/78855917/130360912-b8c83a19-56bd-491e-846e-431269d0a9cd.jpg)

회원가입 기능이 잘 되는것을 알 수 있다.
<br><Br>

---

<br>

# Chapter.3

<br>

## Redux 연동하기

<br>

### 리덕스(Redux)란?

<br>
여러 컴포넌트들에서 쓰이는 공통적인 데이터들, 예를 들어 로그인 폼이나 회원가입 페이지, 프로필 페이지의 로그인한 사람 정보, 로그인 여부 등등은 컴포넌트가 분리되어 있으면 따로 따로 있어야 한다. 그러한 데이터들을 흩어지지 않게 하고 싶으면 부모 컴포넌트를 두고 부모 컴포넌트에서 데이터를 받아 자식 컴포넌트로 각각 보내줘야 하는데, 그런 과정들을 매번 수동으로 하는 것은 매우 번거롭다.
<br><br>
그래서 중앙에서 하나로 관리하여 컴포넌트로 뿌려 주는 <b>중앙 데이터 저장소 역할</b>을 하는 것이 react의 context api, <b>redux</b>, mobx, 만일 graphql을 사용한다면 apollo 등이 있다. redux는 원리가 간단하기 때문에 에러가 나면 추적이 잘 되어 앱이 안정적이게 되지만 코드량이 매우 많아지게 된다.
<br><br>

next에 리덕스를 붙이려면 `npm i next-redux-wrapper`를 사용해야 한다.
<br><br>

> <br> Context API로 redux나 Mobx가 대체될까?
> <br><br>
> 서버에서 데이터를 받아 오는 것은 항상 비동기이기 때문에 실패에 대비해야 한다. 비동기는 요청, 성공, 실패의 3단계로 나뉜다. context api에서 구현을 하게 되면, 직접 다 구현을 해주어야 하는데 컴포넌트 안에서 fetch나 axios로 데이터를 요청하게 된다.
> <br><br>
> 컴포넌트에서는 화면을 그리는데 집중을 하고, 데이터 요청은 별도의 모듈이나 라이브러리가 하는 것이 좋으므로 컴포넌트 안에서 데이터를 따로 분리하려고 하면 결국 redux나 mobx 모두 비슷한 구조로 나오기 때문에 처음부터 redux나 mobx를 사용하는 편이 좋다.
> <br><br>

<br>

### Redux의 원리

<br>

![image](https://user-images.githubusercontent.com/78855917/130620814-5752a29d-2044-4b2b-8092-9cf7b39a720a.png)
<br>

상태에 어떠한 변화가 필요하면 액션(action)이라는 것이 발생한다. 이는 하나의 객체로 표현되고, 반드시 type 필드를 가지고 있어야 한다. 이 값은 액션의 이름이라고 생각하면 된다.
<br><br>

```js
{
  type: 'CHANGE_NICKNAME',
  data: 'hang_kem'
}
```

<br>

이 액션은 dispatch라는 스토어의 내장 함수로 발생되는데, 이 함수는 `dispatch(action)`과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다. 이렇게 액션을 만들어 발생시키면 리듀서(reducer)라는 함수가 현재 상태와 전달받은 액션 객체를 파라미터로 받아오는데, 그 후에 두 값을 참고하여 새로운 상태를 만들어 반환해 준다.
<br><br>

```js
switch(action.type) {
  case 'CHANGE_NICKNAME' :
    return {
      ...state,
      name: action.data,
    }
}
  case 'CHANGE_AGE' :
    return {
      ...state,
      age: action.data,
    }
}
```

<br>

여기서 `...state`를 해주는 이유는 리액트의 불변성(Immutability) 때문인데, 유지해야 되는 것들은 <b>참조 관계</b>로 해두고, <b>변경해야 할 데이터들은 바꾸는 것</b>으로 리덕스를 쓰는 목적이다.
<br><br>

```js
{} === {} //객체끼리 비교하면 false가 나옴.
// 그렇기 때문에 아래의 경우에도 prev, next의 name이 전부 남아있다.
const prev = { name: 'kyeom' }
const next = { name: 'hang_kem' }

const a = {}
const b = a;
a === b;
// 참조관계가 있으면 true로 나옴.
// 그렇기 때문에 참조를 할 경우에는 next의 name값을 바꾸면 prev의 name값도 바뀌어 history가 사라짐.

const next = prev
next.name = 'hang_kem'
prev.name // 'hang_kem'
```

<br>

### 리덕스 실제 구현하기

<br>

프로젝트 폴더에 store 폴더를 만들고 `configureStore.js` 파일을 생성한다.
<br><br>

```js
import { createWrapper } from "next-redux-wrapper";

const configrueStore = () => {};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
```

<br>

createWrapper의 두 번째 인자는 옵션 객체이며, debug 부분이 true일 경우에는 리덕스에 관한 자세한 설명이 나오므로 개발시에는 true로 설정하는 편이 좋다. configureStore.js 생성 후에는 page의 \_app.js의 마지막 줄을 `export default wrapper.withRedux(App)`으로 변경해준다.
<br><br>

이제 configureStore.js에서 store 설정을 해준다. store는, reducer와 state를 포함한 것을 뜻한다. 이때 `npm i redux`로 redux 설치를 해주어야 한다.
<br><br>

```js
import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";

const configrueStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
```

<br>
이제 액션 상태를 만들어주기 위해 reducers 폴더에 index.js를 생성한다.
<br><br>

```js
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

// (이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
```

<br>
이렇게 초기 앱에 대한 데이터 구조를 설정하였다. 여기서 initialState는 기존의 데이터를 뜻하고 action creator 함수를 통해 액션을 설정하면, rootReducer의 switch 문을 통해 이전상태와 액션으로 다음 상태를 업데이트 해줄 수 있게 된다. 즉, 로그인 액션을 만들어서 dispatch를 하면 isLoggedIn이 true가 되고 user에 동적으로 받아온 데이터가 들어가는 기능이 여기서 실행되는 것이다. 
<br><br>

> <br> action creator 함수
> <br><br>
> 데이터를 변경하고 싶으며 액션을 만들어 주어야 하는데, 액션의 type은 같지만 data만 달라지는 경우에는 매번 액션을 만들어 주는 것이 비효율적이다. 이럴때는 함수를 통해 액션을 만들어 주는데, 이를 동적 액션, 또는 액션 생성기 함수라고 한다.
> <br><br>

```js
const changeNickname = {
  type: "CHANGE_NICKNAME",
  data: "hang_kem1",
};

const changeNickname = {
  type: "CHANGE_NICKNAME",
  data: "hang_kem2",
};

const changeNickname = {
  type: "CHANGE_NICKNAME",
  data: "hang_kem3",
};
// 이렇게 만드는 것은 비효율적이다.

const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};
// 액션 생성 함수를 이용하면 간단하게 구현할 수 있다.
```

<br>

이제 첫 액션에 대한 dispatch를 할 차례이다. redux에서 중앙 데이터 관리소 역할을 해주기 때문에 AppLayout.js의 isLoggedIn이라는 useState는 더 이상 필요가 없어졌다. react-redux를 import 한 후, isLoggedIn을 react-redux의 useSelector를 이용하여 state.user.isLoggedIn을 받아온다. 이렇게 하면 isLoggedIn이 바뀔 시 알아서 AppLayout 함수가 리렌더링 된다.
<br><br>

```js
//AppLayout.js
import { useSelector } from "react-redux";
(...)

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
(...)
```

<br>
이제 부모 컴포넌트에서 자식 컴포넌트들에게로 주었던 props를 지운 뒤 자식 컴포넌트로 가서 setIsLoggedIn(true)를 dispatch(loginAction(id, password))로 변경해 준다. 로그아웃 액션도 마찬가지의 방법으로 진행해 주면 된다.
<br><br>

```js
//LoginForm.js
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers";
(...)
const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);
```

<br>

### 미들웨어와 리덕스 데브툴즈

<br>

브라우저의 개발자 도구에서 redux tools를 사용하려면 `npm i redux-devtools-extension`을 통해 설치를 한 후, configureStore.js에 배포용과 개발용일때의 조건문을 설정한 후 개발용에만 composeWithDevTools를 넣어주면 된다. 히스토리가 많이 쌓이게 되면 메모리도 많이 차지하고, 중앙 데이터들의 변경 값이 모두 나오기 때문에 개발용일때만 사용한다. 이렇게 만든 enhancer 함수를 store 변수의 createStore 두번째 인자값으로 넣어준다.
<br><br>

```js
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";

const configureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.dispatch({
    type: "CHANGE_NICKNAME",
    data: "hang_kem",
  });
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
```

<br>
이때 middlewares라는 변수를 만들고 applyMiddleware에 ...middlewares를 넣어줘야 한다. 이렇게 하면 불변성이 지켜지기 때문에 개발자 도구 redux의 history 값을 정상적으로 확인할 수 있다.
<br><br>

![12345](https://user-images.githubusercontent.com/78855917/130797134-667a4bed-5fd4-4fc0-a3e9-27f7f976ac54.jpg)

<br>

### 리듀서 쪼개기

<br>
지금까지는 index.js에 단순히 user의 loginAction과 logoutAction만 구현해 그리 복잡하지 않았지만, 이러한 상태 변경들이 많아질 수록 case 부분이 엄청나게 많아져 복잡해질 수 있다. 그렇기 때문에 리듀서를 쪼갤 필요가 있다.
<br><br>
우선, index의 데이터 안에 user와 post가 있으니 이를 기준으로 reducers 폴더에 user.js, post.js 파일을 생성해 준다. 그 후에 index.js에 있는 initialState 객체의 부분들을 해당 폴더로 복사해주고 action과 reducer 역시 각 폴더들로 이동시켜 준다. 여기서 reducer를 옮길때 주의해야 하는것이 있는데, initialState를 분리할 때 이미 Depth가 낮아졌으므로 reducer 쪽에서 Depth가 들어가 있는 부분들을 빼주어야 한다.
<br><Br>

```js
//user.js
export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
```

<br>

```js
//post.js
export const initialState = {
  mainPosts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
```

<br>
이제 index.js에 user.js와 post.js를 합쳐야 하는데, 먼저 각 파일들을 import 해준 뒤에 combineReducer라는 리듀서를 합쳐주는 메서드를 통해 합쳐 준다. 다만 index.js에는 서버사이드 렌더링을 위해 HYDRATE라는 액션이 있으니 index 리듀서를 하나 더 추가해 주어야 한다. 그 후에는 LoginForm.js와 UserProfile.js의 action 경로를 수정해 준다.
<br><br>

```js
import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

//initialState는 필요없어 졌으니 삭제한다.

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
```

<br>

### 더미데이터와 포스트폼 만들기

<br>

```js
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "행갬",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "안녕하세요~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "반갑습니다~",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};
```

<br>
post.js에 더미 데이터를 만들었다. 여기서 mainPost 안에 id, content는 시작이 소문자인데, User, Image, Comment는 대문자로 시작하는 이유는 DB에서 사용하는 시퀄라이즈와 관계가 있다. 시퀄라이즈에서 어떤 정보와 다른 정보 사이의 관계가 있으면 그것들을 합쳐주게 되는데 그 과정에서 대문자로 출력된다. 그렇기 때문에 만약 자신이 프론트엔드 개발자라면 서버 개발자와 사전에 합의를 해서 서버 쪽에서 데이터를 어떤 식으로 보낼건지 미리 정해두는 편이 좋다.
<br><br>

```js
const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미 데이터 입니다.",
  User: {
    id: 1,
    nickname: "행갬",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        // 불변성을 지키며 dummyPost를 앞에 추가해야 게시글 위로 올라간다.
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
```

<br>
그 다음에는 post의 action을 만들었는데, 액션의 이름을 상수로 빼주는 편이 재활용도 가능하고 오타를 방지하기 때문에 좋다. 지금은 서버가 없기 때문에 가짜 게시물 데이터를 만들어서 리듀서에 추가해 주었다. 여기서 mainPosts에 dummyPost를 앞에 두어야 게시글 위로 올라간다.
<br><br>

```js
import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
```

<br>
pages 폴더의 index.js 파일이다. isLoggedIn과 mainPosts를 useSelector를 통해 비구조화 할당으로 들고 왔으며, 로그인 상태일때만 PostForm이 보이게 하고 mainPosts의 데이터를 이용해 map 함수로 이를 반복되게 만들었다. map을 사용할때는 key 값이 필요한데 게시물은 변할 수 있는 데이터이기 때문에 index를 key 값으로 사용하지 않고 post의 id를 key값으로 사용하였다. 
<br><br>

```js
import { Form, Input, Button } from "antd";
import React, { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
```

<br>
PostForm.js 파일이다. 짹짹 버튼을 클릭시 onSubmit이 되어 addPost 액션이 실행된다. 여기서 이미지 업로드 버튼을 구현하기 위해서는 useRef를 활용해야 하는데, 이는 DOM에 직접적으로 접근할때 사용한다.
<br><br>

### 게시글 구현하기

<br>

postCard 컴포넌트를 통해 게시글 기능을 구현하였다.
<br><br>

```js
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Card, Popover, ButtonGroup, Button } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import PostImages from "./PostImages";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const id = useSelector((state) => state.user.me?.id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {commentFormOpened && <div>댓글 부분</div>}
      {/*<CommentForm />*/}
      {/*<Comments />*/}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
```

<br>

게시글의 각종 Form이나 Icon들은 antd를 이용해 불러왔다. 여기서 reducers의 user.js에서 user 값을 me로 바꾸었는데, 이렇게 로그인 한 id를 useSelector를 통해 불러오게 된다. 만일 `id && post.User.id === id`, 즉 로그인한 id값과 게시글의 id가 같다면 수정, 삭제 버튼 기능이 활성화되고, 그렇지 않다면 신고 기능만 활성화되게 하는 switch문을 구현하였다. 이는 마우스 커서를 가져다 대면 나오는 PopOver를 통해 확인할 수 있다. 또한, 원래는 서버 통신을 통해 진행해야 하지만 일시적으로 State를 활용해 onClick 이벤트로 heart 버튼이 onClick시 HeartTwoTone이 되게, commentForm이 Open 되게 구현하였다. 여기서 기억해야 할 점은, Toggle, 즉 false를 true로, true를 false로 되게 하는 기능은 `setLiked((prev) => !prev);`를 통해 진행된다는 점이다.

![ezgif-2-001e57abcc80](https://user-images.githubusercontent.com/78855917/131004522-460891ce-2c2e-4b85-bbb3-9c038d7239f5.gif)
