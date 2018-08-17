const srcFolder = `${__dirname}/src-${process.env.STEP || 'async-task'}`

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
