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
