process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const paths = require('./paths');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',

    entry: paths.ssrIndex,

    target: 'node',

    output: {
        path: paths.ssrBuild,
        filename: 'server.js',
    },

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx)$/,
                include: paths.appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [
                        require.resolve('babel-preset-react-app'),
                    ],
                },
            },
        ],
    },

    resolve: {
        modules: ['node_modules'],
    },
};