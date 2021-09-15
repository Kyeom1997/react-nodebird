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
<br><br>

### 댓글 구현하기

<br>
우선 CommentForm이라는 댓글 입력 폼을 생성하여 props로 post 데이터를 넘겨 주어야 한다. 댓글을 작성할 때에 이 댓글은 post에 속하므로 그 특정 게시글에 대한 정보, 즉 게시글의 id가 필요하기 때문이다. post.Comment.length로 게시물의 댓글 수를 나오게 하고 li 태그에 댓글을 쓴 사용자의 정보와 내용이 나오게 한다.
<br><Br>

```js
{commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
```

<br>
이제 CommentForm.js를 구현해 보자. 사전에 미리 구현해두었던 커스텀 Hooks를 사용하여 CommentText의 상태와 onChange 이벤트를 연결시켜준 후, 댓글을 입력했을 때의 id와 내용을 console 창에 표기되도록 구현하였다. 이렇게 프로그래밍을 하다 보면 오타에 의한 에러가 발생하는 경우가 잦은데, 이는 console 창에 표기되는 에러의 내용을 보면 해당 에러가 어느 줄에서 발생했는지 표시해 주기 때문에 그 부분을 참고하는 편이 좋다.
<br><br>

```js
import { Form, Input, Button } from "antd";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useInput from "..//hooks/useInput";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.PropTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
```

<br>

### 이미지 구현하기

<br>
postImage를 구현해 보자. 이미지가 각각 1개, 2개, 3개 이상일 때를 조건문을 활용하여 구현한다. 이때 showImagesZoom 이라는 State를 만들어서 이미지를 클릭시 true 값이 되게 하고, onClose라는 함수를 만들어 imagesZoom 컴포넌트에 props로 넘겨 주었다. showImagesZoom이 true 값이 되면 imagesZoom 컴포넌트가 실행되게 구현한 것이다.
<br><br>

```js
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
      </>
    );
  }
  return (
    <>
      <div>
        <img
          role="presentation"
          style={{ width: "50%", display: "inline-block" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
```

<br>

### 이미지 캐루셀 구현하기(react-slick)

<br>

3개 이상의 이미지가 게시글에 있을 시, 이를 클릭하여 팝업 형식으로 띄운 뒤 슬라이드 형식으로 볼 수 있게 하는 기능을 구현해보자. 이는 react-slick이라는 것을 통해 구현할 수 있다. 우선 ImagesZoom이라는 디렉토리를 생성하고 그 안에 index.js를 생성하였다.
<br><br>

```js
import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import {
  Overlay,
  Global,
  Header,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  CloseBtn,
} from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <div>
        <Header>
          <h1>상세 이미지</h1>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        <SlickWrapper>
          <div>
            <Slick
              initialSlide={0}
              beforeChange={(slide) => setCurrentSlide(slide)}
              infinite
              arrows={false}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {images.map((v) => (
                <ImgWrapper key={v.src}>
                  <img src={v.src} alt={v.src} />
                </ImgWrapper>
              ))}
            </Slick>
            <Indicator>
              <div>
                {currentSlide + 1} / {images.length}
              </div>
            </Indicator>
          </div>
        </SlickWrapper>
      </div>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
```

<br>
그 뒤에는 간단히 currentSlide라는 State를 만들어 상태를 관리해주고, styled-components로 각각의 스타일을 구성하였다. 이때, styled-components가 너무 많아 지저분해 보일 수 있으므로, styles.js라는 파일에 빼준 뒤 이를 import하여 가져와 주었다. react-slick의 옵션들은 공식 문서를 참조하자.
<br><br>

> [React-slick](https://react-slick.neostack.com/)

<br>

### 게시글 해시태그 링크로 만들기

<br>
게시글의 해시태그를 링크로 넘어가게 하는 기능을 구현해 보자. 우선 PostCard.js의 Card.meta 부분의 description을 컴포넌트로 변경한다. 
<br><br>

```js
description={<PostCardContent postData={post.content} />}
```

<br>

이제 PostCardContent.js를 만들고 틀을 구성하는데, 여기서 해시태그를 구분하는 부분은 split을 사용해 정규 표현식으로 구분하게 된다. 정규 표현식은 [Regexr](https://regexr.com/) 페이지에서 테스트할 수 있다.
<br><br>

```js
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
```

<br>

---

<br>

# Chapter 3.

<br>

## Redux-Saga 연동하기

<br>

### redux-thunk 이해하기

<br>

### redux-middleware

<br>
리덕스에 없던 기능들을 추가해주는 역할이다. 기존의 컴포넌트에 생기는 사이드 이펙트 (데이터 요청(fetch)등의 비동기 작업, 브라우저 캐시 같은 순수하지 않은 것들)들을 최소화 시킨다. 
<br><br>

### redux-thunk

<br>
리덕스가 비동기 액션을 dispatch 할 수 있도록 도와주는 역할이다. 하나의 action에서 dispatch를 여러 번 할 수있게 해주는 역할인데, 이 정도가 redux-thunk의 기능의 끝이다.
<br><br>

```js
export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    axios
      .post("./api/login")
      .then((res) => {
        dispatch(loginSuccessAction(res.json));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      });
  };
};
```

<br>

### saga 설치하고 generator 이해하기

<br>

리덕스 사가란, 리액트의 사이드 이펙트만 담당하는 미들웨어 중 하나로, App에서 action을 받아 처리하고, 멈추고, 취소할 수 있게 만들어 주며 리덕스 상태에 접근하여 Action을 dispatch 할 수 있게 해준다. 또한 비동기 흐름을 쉽게 읽고, 쓰며, 테스트할 수 있는 ES6 문법인 generator를 사용할 수 있다.
<br><br>

```
npm i redux-saga
npm i next-redux-saga
```

<br>
넥스트에서 리덕스 사가를 사용하려면 별도로 next-redux-saga 역시 설치해 주어야 한다. 이제 configureStore.js와 sagas 폴더를 생성한 후 이 안에 index.js 역시 만들어 주자. 여기서 sagas 폴더를 생성해주는 이유는 rootSaga를 이용하기 때문이다.
<br><br>

```js
//configureStore.js
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
```

<br>

```js
//sagas/index.js
export default function* rootSaga() {}
```

<Br>

configureStore.js에서 createSagaMiddleware로 선언을 해준 뒤 `const middlewares = [sagaMiddleware];`로 연결해 준다. 사가는 `function*()` 제네레이터를 사용하는데, 제네레이터는 gen()으로 실행하는 것이 아니라, gen().next()를 해야 실행된다. 제네레이터 함수는 yield를 이용하여 멈출 수 있고, 이벤트 리스너처럼 사용이 가능하다. 이와 같이 yield를 이용한 이 성질을 이용한 것이 바로 redux-saga라고 할 수 있다.
<br><br>

### saga 이펙트 알아보기

<br>
이제 saga 이펙트를 알아보자. 이전에 만들었던 sagas/index.js를 다음과 같이 수정하자.
<br><br>

```js
import { all, fork } from "redux-saga/effects";

function* watchLogIn() {
  yield take("LOG_IN");
}

function* watchLogOut() {
  yield take("LOG_OUT");
}

function* watchAddPost() {
  yield take("ADD_POST");
}

export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
```

<br>

위 그림의 all, fork와 같은 것들을 바로 리덕스 사가 이펙트라고 부른다. 여기서 `all`은 배열을 받아서 그 안에 있는 것을 한번에 실행하는 역할을 한다. 이렇게 실행을 하면 `fork`는 위에 명시된 함수를 실행하게 된다. 이 `fork`가 `watchLogIn` 함수를 실행하면 `watchLogIn`함수는 `yield take('LOG_IN')`, 즉 `LOG_IN`이라는 함수가 실행될 때까지 대기하게 된다. 그럼 logIn 함수를 구현해 보자.
<br><br>

```js
import { all, call, fork, put, take } from "redux-saga/effects";
import axios from "axios";

function loginAPI() {
  return axios.post("/api/login");
}

function* login() {
  try {
    const result = yield call(loginAPI);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield take("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield take("LOG_OUT_REQUEST");
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST");
}

export default function* rootSaga() {
  yield all([
    fork(watchLogIn), //call
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
```

<br>
LOG_IN 함수가 실행되면 logIn 제네레이터가 실행되고, 이 제네레이터 함수는 loginAPI라는 함수를 받아와 axios에서 서버로 로그인 요청을 보내게 된다. 여기서 주의해야 할 점은, loginAPI는 제네레이터 함수가 아니기 때문에 *을 붙이면 안된다. 그 결과값을 받아와 result.data를 받아오게 되는데, 요청이 실패할 때를 대비해 try, catch 문으로 error 값도 받아올 수 있게 한다. 
<br><br>

이렇게 redux-saga가 redux-thunk와 다른 점은, thunk에서는 비동기 액션 크리에이터를 직접 실행했지만 saga에서는 event-listner와 같은 역할을 한다는 점이다. 여기서 `put`은 액션 객체를 실행하는 `dispatch`와 같은 역할을 한다.
<br><br>

여기서 `LOG_IN` 액션을 `LOG_IN_REQUEST`로 변경한 이유는, 어차피 로그인을 하나 로그인 요청을 한 순간에 이벤트 리스너를 실행하나 마찬가지이기 때문에 액션을 늘리지 않기 위한 이유이다. 리덕스는 액션이 많다는 단점이 있기 때문에, 액션을 줄이는 편이 좋다.
<br><br>

`call`과 `fork`의 차이는, `call`은 동기 함수 호출이고, `fork`는 비동기 함수 호출이라는 점이다. 즉, logIn 함수에서 `call`을 하면 loginAPI가 return 할 때까지 기다리지만, `fork`를 하면 비동기 함수 호출이기 때문에 요청을 보낸 후 대기를 하지 않고 바로 다음 것을 실행한다 (none-blocking).
<br><br>

> <br> fork => return axios.post('api/login') <br><br>
> call => axios.post('api/lgoin').then()
> <br><br>

<br>

### take, take 시리즈, throttle 알아보기

<br>

`yield take` 문의 치명적인 단점은, 바로 일회용이라는 것이다. 그렇기 때문에 단순히 yield take만 사용하면 로그인이나 로그아웃, 게시글을 한 번 밖에 할 수 없는 일이 발생한다. 이것은 `while(true)` 로 해당 구문을 감싸면 해결이 되지만, 이는 직관적이지 않고, 동기적으로 사용된다는 단점이 있다. 그렇기 때문에 여기서 사용되는 것이 바로 `takeEvery`이다.
<br><br>

```js
function* watchLogIn() {
  yield takeEvery("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeEvery("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}
```

<br>

`takeLatest`라는 것도 있다. 이는 마지막 클릭만을 실행하는 문법이다. 사용자가 실수로 두 번 클릭하거나, 마우스의 고장 문제등으로 여러 번 클릭되는 경우가 있기 때문에 100번을 클릭해도 99번의 클릭은 무시되고, 마지막 클릭만 실행되는 것이다. 첫번째 클릭만 실행하고 싶으면 `takeLeading`을 사용하면 된다. 다만 takeLatest라고 해서 이미 완료된 것을 취소하는 것이 아니라, 동시에 진행될시에 로딩중인 완료되지 않은 것을 취소하는 것이다. 또한 `takeLatest`는 백엔드 서버에서 오는 응답을 취소하는 것이지, 프론트 서버에서 보내는 요청을 취소하는 개념이 아니기 때문에 백엔드 서버에 데이터가 2번 저장될 수 있다는 단점이 있다. 그렇기 때문에, 백엔드 서버를 설정할 시에 데이터가 2번 저장되지 않도록 검사를 해주어야 한다.
<br><br>

saga effect에는 `throttle` 이라는 것도 있다. 이는, `function* watchAddPost() { yield throttle('ADD_POST_REQUEST', addPost, 2000) };` 와 같이 작성하였을때, 2초 동안 'ADD_POST_REQUEST'가 한번만 실행될 수 있게 한다. 여기서 debounce와 throttle의 차이는 <b>throttle은 마지막 호출된 함수를 실행한 후에 일정 시간이 지나기 전에 다시 호출되지 않게 하는 것이고, debounce는 연이어 호출되는 함수 중에 마지막 함수만 호출되게 하는 것이다. </b>
<br><br>

현재는 서버가 구축되어 있지 않기 때문에, API를 받아오면 무조건 오류가 발생할 것이다. 그렇기 때문에 `delay`라는 setTimeout 효과를 가지고 있는 effect로 더미 데이터를 받아오도록 하자.
<br><br>

```js
function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    //const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}
```

<br>

### saga 쪼개고 reducer와 연결하기

<br>

saga 역시 reducer와 마찬가지로 하나의 파일에 작성하면 엄청나게 길어지기 때문에, 기능에 따라서 분리해 줄 필요가 있다. sagas 폴더에 post.js와 user.js 파일을 생성해 주자. post.js에는 post와 관련된 기능을, user.js에는 로그인, 로그아웃, 회원가입과 같은 user와 관련된 기능을 작성해 준다.
<br><br>

```js
// sagas/post.js

import { delay, put, takeLatest, all, fork } from "@redux-saga/core/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    //const result = yield call(addPostAPI, action);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    //const result = yield call(addCommentAPI, action);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
```

<br>

```js
//sagas/user.js
import { delay, put, takeLatest, all, fork } from "@redux-saga/core/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
} from "../reducers/user";

function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    //const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    //const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post("/api/signup");
}

function* signUp() {
  try {
    //const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUP);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
```

<br>
이렇게 쪼갠 saga들은 다시 index.js에 연결해 준다.
<br><br>

```js
import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
```

<br>
이제 다시 reducer와 연결해 주어야 하는데, useSelector를 통해 각 컴포넌트 별 관련된 상태를 조회해서 가져오게 된다. 여기서 reducer의 액션명들을 문자열들로 했을 시에는, 오타에 취약하다는 단점이 있기 때문에 별도의 변수로 빼서 하는 편이 좋다. 
<br><br>

```js
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";
```

<br>

### 게시글, 댓글 saga 작성하기

<br>

우선, 게시글을 작성할 때의 데이터 흐름이 어떻게 진행되는지 알아두어야 한다. PostForm.js에서 `dispatch(addPost(text))`를 하게 되면, reducer의 post.js에서 addPost로 데이터를 받고, saga의 post.js에서 ADD_POST_SUCCESS로 이 데이터를 처리하게 된다. 그러면 reducer의 post.js에서 ADD_POST_SUCCESS가 실행되고, mainPosts 부분이 변경되면서 글이 작성되는 방식이다.
<br><br>

```js
//PostForm.js
const onSubmit = useCallback(() => {
  dispatch(addPost(text));
}, [text]);
```

<br>

```js
//sagas/post.js
function* addPost(action) {
  try {
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
  };
};
```

<br>

```js
//reducers/post.js
case ADD_POST_SUCCESS:
  return {
    ...state,
    mainPosts: [dummyPost(action.data), ...state.mainPosts],
    addPostLoading: false,
    addPostDone: true,
  };
```

<br>
게시글의 id값, 즉 dummyPost의 id를 2로 고정시켜 둘 경우, 모든 게시글의 id가 2로 나오기 때문에 key값이 겹쳐서 반복문이 인식을 못하게 된다. 이럴 때 사용하는 것이 바로 shortId이다. shortId를 사용하면 랜덤하게 Id값을 만들어 주기 때문에 유용하다.
<br><br>

```
npm i shortid
```

<br>

```js
import shortId from 'shortid';

(...)

id: shortId.generate(),

(...)
```

<br>

리덕스는 액션을 통해서만 값을 변경해 줄 수 있기 때문에, user.js에 액션을 만들어 주고 saga의 post.js에서 ADD_POST_TO_ME를 실행하게 한 후, user 리듀서에서 id 데이터를 이어받아 게시글이 작성되면 me.Posts.length로 게시글이 추가되는 코드를 작성할 수 있다. 이는 게시글이 작성되면 작성 게시글 수가 올라가는 기능이다.
<br><br>

```js
//reducers/user.js
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
```

<br>

```js
//sagas/post.js
function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}
```

<br>

```js
//reducers/user.js/ADD_POST_TO_ME
case ADD_POST_TO_ME:
  return {
    ...state,
    me: {
      ...state.me,
      Posts: [{ id: action.data }, ...state.me.Posts],
    },
  };
```

<br>

```js
//components/UserProfile.js
<Card
  actions={[
    <div key="twit">짹짹<br />{me.Posts.length}</div>,
  ]}>
```

<br>
