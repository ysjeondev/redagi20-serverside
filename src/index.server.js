// ======================================================
// 20.4.4 서버에서 Redux 설정 및 PreloadContext 사용하기
// 파일: src/index.server.js
//
// 기존 기능:
// 1. Post 컴포넌트 SSR
// 2. render(post) 함수
//
// 추가 기능:
// 3. Redux Store 생성
// 4. Redux Thunk 연결
// 5. PreloadContext 연결
// 6. API 데이터 로딩 완료 후 SSR
// ======================================================


// ======================================================
// 1. React 및 서버 렌더링 라이브러리
// ======================================================

import React from 'react';
import ReactDOMServer from 'react-dom/server';

// React Router 5의 서버용 라우터
import { StaticRouter } from 'react-router-dom';

// Redux 관련 라이브러리
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// 현재 설치된 redux-thunk의 named export 방식
import { thunk } from 'redux-thunk';

// 프로젝트에서 작성한 Redux 루트 리듀서
import rootReducer from './modules';

// 서버 데이터 로딩 Context
import PreloadContext from './lib/PreloadContext';

// 기존 React 애플리케이션
import App from './App';


// ======================================================
// 2. 기존 게시글 SSR 기능 유지
// ======================================================

function Post({ post }) {
    return (
        <article>
            <h1>게시글 상세보기</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
            <small>게시글 번호: {post.id}</small>
        </article>
    );
}


// ======================================================
// 3. 기존 Express 서버에서 사용하는 render 함수
// ======================================================
//
// 기존 server/index.js에서 다음처럼 호출하고 있음.
//
// const reactHtml = render(post);
//
// 따라서 이 함수는 삭제하거나 이름을 변경하지 않는다.
// ======================================================

export function render(post) {

    // 기존 게시글 SSR 기능
    return ReactDOMServer.renderToString(
        <Post post={post} />
    );
}


// ======================================================
// 4. Redux 기반 SSR 함수 추가
// ======================================================
//
// URL 예시:
// /red
// /blue
// /users
//
// 기존 render(post)와 별도의 함수로 구현한다.
// ======================================================

export async function renderApp(url) {

    // --------------------------------------------------
    // ① 요청마다 새로운 Redux Store 생성
    // --------------------------------------------------
    // 서버에서는 여러 사용자의 요청이 동시에 발생한다.
    //
    // 요청마다 Store를 생성하면 서로 다른 요청의
    // Redux 상태가 섞이는 문제를 방지할 수 있다.
    // --------------------------------------------------

    const store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );


    // --------------------------------------------------
    // ② PreloadContext에 전달할 객체 생성
    // --------------------------------------------------
    //
    // done:
    // API 요청 수집이 완료되었는지 나타낸다.
    //
    // promises:
    // API 요청으로 반환된 Promise를 저장한다.
    // --------------------------------------------------

    const preloadContext = {
        done: false,
        promises: []
    };


    // --------------------------------------------------
    // ③ 서버에서 렌더링할 React 컴포넌트 구성
    // --------------------------------------------------

    const jsx = (
        <PreloadContext.Provider value={preloadContext}>

            <Provider store={store}>

                <StaticRouter location={url} context={{}}>

                    <App />

                </StaticRouter>

            </Provider>

        </PreloadContext.Provider>
    );


    // --------------------------------------------------
    // ④ 첫 번째 렌더링
    // --------------------------------------------------
    // 이 단계에서 UsersContainer 내부의 Preloader가
    // getUsers()를 실행한다.
    //
    // 반환된 Promise는 preloadContext.promises에
    // 저장된다.
    //
    // 첫 번째 HTML 결과는 사용하지 않는다.
    // --------------------------------------------------

    ReactDOMServer.renderToStaticMarkup(jsx);


    // --------------------------------------------------
    // ⑤ API 요청이 모두 끝날 때까지 대기
    // --------------------------------------------------
    //
    // Redux Thunk가 사용자 목록 데이터를 가져와
    // Store에 저장할 때까지 기다린다.
    // --------------------------------------------------

    await Promise.all(preloadContext.promises);


    // --------------------------------------------------
    // ⑥ 데이터 로딩 완료 표시
    // --------------------------------------------------
    //
    // 두 번째 렌더링에서 API를 다시 요청하지 않도록
    // Preloader의 실행을 막는다.
    // --------------------------------------------------

    preloadContext.done = true;


    // --------------------------------------------------
    // ⑦ 두 번째 렌더링
    // --------------------------------------------------
    //
    // Redux Store에 사용자 데이터가 들어 있는 상태에서
    // React HTML을 생성한다.
    // --------------------------------------------------

    const html = ReactDOMServer.renderToString(jsx);


    // --------------------------------------------------
    // ⑧ 최종 HTML 문자열 반환
    // --------------------------------------------------

    return html;
}