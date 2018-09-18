const srcFolder = `${__dirname}/src-${process.env.STEP || 'tuxi'}`

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
