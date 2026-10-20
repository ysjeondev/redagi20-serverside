
/*
 * 20.3.5 정적 파일 제공하기
 * 파일 위치: server/index.js
 *
 * 역할:
 * 1. Express 웹서버 실행
 * 2. 정적 파일(CSS 등) 제공
 * 3. React SSR로 HTML 생성
 * 4. 생성된 HTML을 브라우저에 전송
 */

// Express 라이브러리
const express = require('express');

// Node.js 경로 처리 모듈
const path = require('path');

// Webpack으로 빌드한 서버 렌더링 함수
const { render } = require('../dist/server');

// Express 애플리케이션 생성
const app = express();

// 서버 포트 설정
const PORT = 5000;

// ==========================================
// 1. 정적 파일 제공 설정
// ==========================================

// /static 경로로 요청이 들어오면
// server/public 폴더에서 파일을 찾습니다.
//
// 예:
// 브라우저 요청: /static/style.css
// 실제 파일: server/public/style.css
app.use(
    '/static',
    express.static(
        path.join(__dirname, 'public')
    )
);

// ==========================================
// 2. SSR 페이지 요청 처리
// ==========================================

app.get('/', (req, res) => {

    // React 컴포넌트를 HTML 문자열로 변환
    const reactHtml = render();

    // HTML 문서 생성
    const html = `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">

            <meta name="viewport"
                  content="width=device-width, initial-scale=1">

            <title>React SSR 실습</title>

            <!-- Express가 제공하는 CSS 파일 -->
            <link rel="stylesheet"
                  href="/static/style.css">
        </head>

        <body>
            <div id="root">
                ${reactHtml}
            </div>
        </body>
        </html>
    `;

    // 생성된 HTML을 브라우저에 전송
    res.send(html);
});

// ==========================================
// 3. Express 서버 실행
// ==========================================

app.listen(PORT, () => {
    console.log(
        `SSR 서버 실행: http://localhost:${PORT}`
    );
});
