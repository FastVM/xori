const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './source/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
    resolve: {
        fallback: {
            util: false,
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
                { from: "node_modules/xterm/css/xterm.css", to: "xterm.css" },
            ],
        }),
    ],
};
