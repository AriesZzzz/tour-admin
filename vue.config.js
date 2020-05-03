const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    baseUrl: './',
    assetsDir: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/travel': {
                target: 'http://120.24.186.190:8080'
            }
        }
    },
    chainWebpack: (config) => {
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('/src/components/tour_pages'))
            .set('cmn', resolve('/src/components/common'))
            .set('api', resolve('/src/api'))

    }

}