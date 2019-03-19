module.exports = {
    // 开发node服务器端口
    devServer:{
        port:80
    },
    chainWebpack:config=>{
        config.module
            .rule('rawloader')
            .test(/\.(vert|frag|geom)$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
    }
};
