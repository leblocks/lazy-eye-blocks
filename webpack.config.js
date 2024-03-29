const path = require('path');

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    entry: {
        main: './src/main.js',
    },
    devServer: {
        static: [
            // so test.html will be able to access node_modules/mocha/ and node_modules/chai
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
                // transpilation with babel
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
                    name: '[name].[ext]', // we have to preserve original file name
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
            // handle template file conversion to html from hbs
            {
                test: /\.hjs$/,
                use: [
                    // put it in a dist folder
                    {
                        loader: 'file-loader',
                        options: { name: '[name].html' },
                    },
                    // execute script on a module
                    { loader: 'val-loader' },
                ],
            },
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        // include tests only in development mode
        config.entry.test = path.resolve(__dirname, 'test', 'main.js');
    }

    if (argv.mode === 'production') {
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()],
        };

        // publish to docs folder for github pages
        config.output.path = path.resolve(__dirname, 'docs');
    }
    return config;
};
