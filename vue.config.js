module.exports = {
  lintOnSave: false,
  devServer: {
    open: true, // 是否打开浏览器
    // proxy: {
    //   //配置代理
    //   "/v1": { // 匹配所有以 '/x'开头的请求路径
    //     target: "http://127.0.0.1:8888", // 代理目标的基础路径
    //     port: 8888,
    //     changeOrigin: true, // 支持跨域
    //     pathRewrite: {
    //       ['^' + '/api/private/v1/']: ''
    //     }
    //   }
    // }
  }
}
