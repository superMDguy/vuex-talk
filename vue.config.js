module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.coinmarketcap.com/v2/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
