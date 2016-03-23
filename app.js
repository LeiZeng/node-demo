var path = require('path')
var express = require('express')

var app = express()

app.use('/', express.static(path.join(__dirname, './public/')))
app.use('/api', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.json({
      message: `Hello World Production`
    })
  } else {
    res.json({
      message: `Hello World Others`
    })
  }
})

module.exports = app
