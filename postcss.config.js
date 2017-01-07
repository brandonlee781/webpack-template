module.exports = {
  plugins: {
    stylelint: {
      rules: {
        'color-hex-case': 'lower'
      },
      ignoreFiles: 'node_modules/**/*.css'
    }
  }
}
