/**
 * Created by Eugene on 2017/3/24.
 */
var path = require('path');
console.log(path.resolve(__dirname, 'dist'));
// console.log(path.join(__dirname, '/src/js/webpack/ch01/index.js'))
module.exports = {
    entry: ('./src/js/webpack/ch01/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/js/webpack/ch01')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}