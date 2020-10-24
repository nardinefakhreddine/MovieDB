const express = require('express')
const app = express()
const port = 3000
app.get('/', function (req, res) {
  res.send('ok')
})
  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.get('/test', function (req, res) {
  res.send('{status:200, message:"ok"}'  )
})
var today = new Date();
var time = today.getHours() + ":" + today.getSeconds();
app.get('/time', function (req, res) {
  res.send('{status:200, message:'+time+'}'  )
})

app.get('/hello/:id', function (req, res) {
  res.send('{status:200, message:Hello,'+req.params.id+'}'); //or use req.param('id')
})
app.get('/hello', function (req, res) {
  res.send('{status:200, message:Hello}'); //or use req.param('id')
})
app.get('/search', (req, res)=>{
  if(req.query.s) {
   res.send('{status:200, message:"ok" ,data:'+req.query.s+'}');
  }
  else {
    res.send('{status:500, error:true, message:you have to provide a search}');
  }
})