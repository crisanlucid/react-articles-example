const path = require('path');
const OfflinePlugin = require('offline-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    plugins: [
        new OfflinePlugin({
                safeToUseOptionalCaches: true,
                externals: [
                    '/images/favicon.png',
                    '/images/OLX_Logo.jpg',
                    '/index.html',
                    '/mock/ads.json',
                    '/manifest.json',
                    '/'
                ],
                publicPath: '/',
                caches: {
                    main: [
                        '/',
                        'bundle.js'
                    ],
                    additional: [
                        ':externals:'
                    ],
                    optional: [
                        ':rest:'
                    ]
                },

                ServiceWorker: {
                    publicPath: '/sw.js',
                    events: true,
                    navigateFallbackURL: '/'
                },
                AppCache: {
                    events: true
                }
            })
    ]
};

