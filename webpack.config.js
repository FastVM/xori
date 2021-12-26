const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './source/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
    resolve: {
        fallback: {
            fs: false,
            util: false,
            crypto: false,
            path: require.resolve('path-browserify'),
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
                { from: "paka/bins/boot.bc", to: "boot.bc" },
                { from: "paka/minivm/minivm.wasm", to: "minivm.wasm" },
                { from: "node_modules/codemirror/lib/codemirror.css", to: "codemirror.css" },
                { from: "node_modules/codemirror/theme", to: "theme" },
                { from: "node_modules/xterm/css/xterm.css", to: "xterm.css" },
            ],
        }),
    ],
};
