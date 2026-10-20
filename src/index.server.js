// ====================================================
// 20.4 SSR 데이터 로딩
// 파일: src/index.server.js
//
// Express 서버에서 전달받은 게시글 데이터를
// React 컴포넌트에 넣어 HTML 문자열로 변환합니다.
// ====================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// 게시글을 출력하는 React 컴포넌트
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
// Express 서버가 호출하는 SSR 함수
export function render(post) {
// 전달받은 post 데이터를 React 컴포넌트에 전달
    return ReactDOMServer.renderToString(
        <Post post={post} />
    );
}
