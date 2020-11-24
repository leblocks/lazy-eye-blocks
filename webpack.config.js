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
                // check source code with eslint before
                // tranpilation with babel
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                // transpile code with babel
                // have to decide how many browsers to support
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
                // allow to include html files and ico files
                // to dist folder with 'import' statement
                // probably will switch to the HtmlWebPackPlugin in the future
                test: /\.(html|ico)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]', // we have to preseve original file name
                },
            },
            {
                // handle scss files with sass-loader
                test: /\.scss$/,
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
