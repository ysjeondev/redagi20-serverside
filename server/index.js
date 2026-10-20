/*
 * 20.4 데이터 로딩 실습
 * 파일: server/index.js
 *
 * 처리 순서
 * 1. 브라우저가 게시글 요청
 * 2. Express가 요청을 받음
 * 3. 외부 API에서 게시글 조회
 * 4. React SSR 함수에 데이터 전달
 * 5. 완성된 HTML을 브라우저에 응답
 */
const express = require('express');
const path = require('path');
// Webpack으로 빌드한 SSR 렌더링 함수
const { render } = require('../dist/server');
const app = express();
const PORT = 5000;

// 기존 CSS 정적 파일 제공 기능 유지
app.use(
    '/static',
    express.static(path.join(__dirname, 'public'))
);

// 게시글 상세보기 라우트
app.get('/posts/:id', async (req, res) => {
    try {
        // URL의 게시글 번호 추출
        // 예: /posts/1 → id = "1"
        const id = req.params.id;
        
        // API 호출
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        
        // API 요청 실패 여부 확인
        if (!response.ok) {
            res.status(response.status).send(
                '게시글을 가져오지 못했습니다.'
            );
            return;
        }
        // JSON 응답을 JavaScript 객체로 변환
        const post = await response.json();
        
        // 조회된 게시글이 없는 경우
        if (!post || !post.id) {
            res.status(404).send('게시글이 없습니다.');
            return;
        }
        
        // React 컴포넌트를 HTML로 변환
        const reactHtml = render(post);
        
        // 전체 HTML 문서 생성
        const html = `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, initial-scale=1">
            <title>React SSR 게시글</title>
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
        // 완성된 HTML 응답
        res.send(html);
    } catch (error) {
        // 네트워크 오류, 렌더링 오류 등을 처리
        console.error('SSR 데이터 로딩 오류:', error);
        res.status(500).send(
            '서버에서 데이터를 처리하는 중 오류가 발생했습니다.'
        );
    }
});

// 기존 기본 페이지도 유지
app.get('/', (req, res) => {
    res.redirect('/posts/1');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`SSR 서버 실행: http://localhost:${PORT}`);
});
