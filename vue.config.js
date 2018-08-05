const srcFolder = `${__dirname}/src-${process.env.STEP}`

module.exports = {
  lintOnSave: false,

  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.coinmarketcap.com/v2/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': srcFolder
      }
    },
    entry: {
      app: `${srcFolder}/main.js`
    }
  }
}
