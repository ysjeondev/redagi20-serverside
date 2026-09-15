const path = require('path');

module.exports = {
    mode: 'production',

    entry: './src/index.server.js',

    target: 'node',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    }
};