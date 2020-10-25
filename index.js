var express = require('express')

const app = express();
const port = 3000;

app.get('/', function (req, res) {
 res.send('ok')
})

  app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
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
//create part
app.post('/movies/create', function (req, res) {
  res.send('{status:200, message:create}'); //or use req.param('id')
})
app.get('/movies/read/',(req,res) => {
  res.send({status:200, data:movies})
})
// start Read part
app.get('/movies/read/:order',(req,res) => {
 var order=req.params.order;
 if(order=="by-date"){
  keysSorted = movies.sort((a, b) => a.year - b.year)
   res.send({data:keysSorted}); 
 }
 if(order=="by-rating"){
  keysSorted = movies.sort((a, b) => a.rating - b.rating)
  res.send({data:keysSorted}); 
 }
 if(order=="by-title"){
  keysSorted = movies.sort((a, b) =>{
    var a = a.title.toLowerCase();
    var b = b.title.toLowerCase();
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
  })
  res.send({data:keysSorted}); 

 }
})
app.get('/movies/read/id/:ID',(req,res) => {
  let id = req.params.ID
  if(id > 0 && id< movies.length ) {
      res.send({status:200, message:movies[id-1]})
  }
  else {
      res.send({status:404, error:true, message:'the movie ID :['+id+'] does not exist'})
  }
})


app.put('/movies/update/:ID',(req,res) => {
  let id= req.params.ID
  let title = req.query.title
  let year = req.query.year
  let rating = req.query.rating

  if(id > 0 && id < movies.length ) {
    if(title != undefined || title == "") {
      movies[id-1]['title'] = title;
  }
  if(year != undefined || year == "") {
    year=movies[id-1]['year'] ;
    movies[id-1]['year'] = year;
}
if(rating != undefined ||rating == "") {
  movies[id-1]['rating'] = rating;
}
res.send({status:200, message: movies})
}
  else {
    res.send({status:404, error:true, message:'the movie ID :['+id+'] does not exist'})
  }

})
 

app.delete('/movies/delete/:ID',(req,res) => {
  var id = req.params.ID
  if (id> 0 && id < movies.length ) {
      movies.splice(id-1, 1)
      res.send({status:200, message: movies})
  }
  else {
      res.send({status:404, error:true, message:'the movie ID: ['+id+'] does not exist'})
  }
  }) 
app.post('/movies/add',(req,res) => {
  var title = req.query.title
  var year= req.query.year
  var rating = req.query.rating
  if( year == undefined || year.length > 4 || isNaN(year) || title == undefined) {
      res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
  }
  if (rating == "" || rating== undefined) {
      rating = 4
  }
  movies.push({title: title, year: year, rating: rating})
      res.send({status:200, data:movies})
  })
app.get('movies/get', function (req, res) {
  res.send('{status:200, message:get}'); //or use req.param('id')
})
app.put('/movies/edit', function (req, res) {
  res.send('{status:200, message:edit}'); //or use req.param('id')
});
