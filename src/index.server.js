// =====================================================
// 서버 사이드 렌더링 엔트리
// 파일 위치: src/index.server.js
// =====================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// 1. 서버에서 렌더링할 React 컴포넌트
const HelloSSR = () => {
    return (
        <div>
            <h1>Hello Server Side Rendering!</h1>
            <p>React가 서버에서 HTML을 생성했습니다.</p>
        </div>
    );
};

// 2. 서버에서 호출할 렌더링 함수
export function render() {
    // React 컴포넌트를 HTML 문자열로 변환
    const html = ReactDOMServer.renderToString(
        <HelloSSR />
    );
    // 생성된 HTML 반환
    return html;
}
