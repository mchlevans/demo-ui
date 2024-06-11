/**
 * If you're having trouble, navigating to the 
 * /webpack-dev-server route will show where files are served. 
 * For example, http://localhost:8085/webpack-dev-server
 * 
 * For local development, style-loader is faster than extracting the styles each time
 * In productiion, extract style into seperate files to avoid errors where styles
 * load after the HTML
 *
 */

import { resolve, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath} from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dotenv from 'dotenv';

dotenv.config();

const mode = process.env.mode;
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const isDevelopment = mode === 'production' ? false : true;

// regex patterns used for determining which
// loaders are needed
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const cssRule = ({ exclude, modules, sourceMap, test }) => ({
    test,
    exclude,
    use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: sourceMap || isDevelopment,
                modules: !!modules,
                modules: !modules ? false : {
                    localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64]'
                }
            },
        },
        'sass-loader',
    ],
});

export default {
    mode,
    entry: {
        Analytics: './src/index.tsx',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: resolve(__dirname, 'build')
    },
    devServer: {
        hot: true,
        port: 8085,
        open: true
    },
    resolve: {
        // leave off extensions on import
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            path: require.resolve("path-browserify")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.png|.jpg|.jpeg/,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            cssRule({ test: cssRegex, exclude: cssModuleRegex }),
            cssRule({ test: cssModuleRegex, modules: true }),
            cssRule({ test: sassRegex, exclude: sassModuleRegex }),
            cssRule({ test: sassModuleRegex, modules: true })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['Analytics']
        }),
        new MiniCssExtractPlugin()
    ]
}
