const path = require('path');

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(html|ico)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]', // we have to preseve original file name
                },
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'css/[name].css' }, // copy to dist folder with file-loader
                    },
                    { loader: 'sass-loader' }, // transpile with sass first
                ],
            },
        ],
    },
};
