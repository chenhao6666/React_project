//跨域配置

const proxy_table = {
    'mz': 'https://m.maizuo.com'
}

    const proxy = {}

    for (const key in proxy_table) {
        if (proxy_table.hasOwnProperty(key)) {
            proxy['/' + key ] = {
                target: proxy_table[key],
                changeOrigin: true,
                pathRewrite: {
                    ['^/' + key ] : '' 
                }
            }    

        }
    }

module.exports = proxy