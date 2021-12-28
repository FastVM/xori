const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './source/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
    },
    resolve: {
        fallback: {
            fs: false,
            util: false,
            crypto: false,
            // path: require.resolve('path-browserify'),
            path: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "source/index.html", to: "index.html" },
                { from: "source/style.css", to: "style.css" },
                { from: "paka/minivm/minivm.wasm", to: "minivm.wasm" },
                { from: "node_modules/codemirror/lib/codemirror.css", to: "codemirror.css" },
                { from: "node_modules/codemirror/theme", to: "theme" },
            ],
        }),
    ],
};