# React로 NodeBird SNS 만들기

<br>

## 들어가며

해당 readme는 Zerocho 님의 인프런 강의인 [리뉴얼 React로 NodeBird SNS 만들기](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC/dashboard)를 수강하며 공부한 내용을 정리하였습니다.
<br><br>

---

<br>

# Chapter 1.

<br>

## 1-1 Next.js 역할 소개 및 간단한 설정

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
