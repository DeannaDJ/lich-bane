const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        lichBane: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'lichBane.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': 'style-loader!css-loader!sass-loader'
                }
            }
        }, {
            test: /\.js?$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss?$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.less?$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        new UglifyJsPlugin({
            test: /bundle\.js$/
        })
    ],
    resolve: {
        modules: ['./node_modules', './src/*'],
        extensions: ['*', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.esm.js'
        }
    }
}
