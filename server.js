const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello')
})

app.listen(3000, () => {
    console.log('Your Application is running on localhost:3000')
})