const srcFolder = `${__dirname}/src-${process.env.STEP}`

module.exports = {
  lintOnSave: false,

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
