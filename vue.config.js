module.exports = {
  // publicPath: '././',
  // outputDir: 'dist',
  // lintOnSave: true,
  // runtimeCompiler: true,
  // productionSourceMap: false,

  devServer: {
    port: 8080,
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://219.83.161.11:8030',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
