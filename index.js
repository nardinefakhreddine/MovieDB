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
const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
//step 5
app.get('/movies/create', function (req, res) {
  res.send('{status:200, message:create}'); //or use req.param('id')
})
app.get('/movies/read/',(req,res) => {
  res.send({status:200, data:movies})
})
app.get('/movies/update', function (req, res) {
  res.send('{status:200, message:update}'); //or use req.param('id')
})
app.get('/movies/delete', function (req, res) {
  res.send('{status:200, message:delete}'); //or use req.param('id')
})
app.get('movies/add', function (req, res) {
  res.send('{status:200, message:add}'); //or use req.param('id')
})
app.get('movies/get', function (req, res) {
  res.send('{status:200, message:get}'); //or use req.param('id')
})
app.get('/movies/edit', function (req, res) {
  res.send('{status:200, message:edit}'); //or use req.param('id')
})