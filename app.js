const express = require('express')
const app = express()
const port = process.env.Port || 3000;

//endpoint, middleware(s)
app.get('/', function (req, res) {
  res.send('Hello Express')
})

app.listen(port, ()=> console.log(`sever is running on ... ${port}`)
);