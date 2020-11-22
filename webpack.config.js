const path = require('path');

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        test: './test/main.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: [
            // so test.html will be able to access node_moduels/mocha/ and node_modules/chai
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'dist'),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: 'js/[name].js',
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
