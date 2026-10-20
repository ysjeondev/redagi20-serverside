const paths = require('./paths');

module.exports = {
    mode: 'production',

    entry: './src/index.server.js',

    target: 'node',

    output: {
        // 서버 빌드 결과물이 저장될 폴더
        path: paths.ssrBuild,

        // 빌드 결과 파일 이름
        filename: 'server.js',

        // Node.js의 require()에서
        // render 함수를 가져올 수 있도록 설정
        library: {
            type: 'commonjs2'
        }
    },
};