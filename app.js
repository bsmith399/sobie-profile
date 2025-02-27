const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI
const { ObjectId } = require('mongodb')

//consle.log(uri)

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));


function initProfileData() {

  MongoDBCollectionNamespace.inserOne(
    {
      title: req.body.title,
      post: req.body.post
    });

}


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const mongoCollection = client.db("guitar-app-database").collection("guitar-app-songs");

function initializeData (){
  mongoCollection.insertOne({
    name: "Brandon Smith",
    taglien: "Hire Me",
    blurb: "aaa"
  });
}

app.get('/', async function (req, res) {

  // initializeData()
  let results = await mongoCollection.find({}).toArray();
  // console.log(results);
  res.render('profile',
    { profileData: results });

})


//endpoint, middleware(s)
app.get('/helloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back to home</a>')
})

app.post('/delete', async function (req, res) {
  
  let result = await mongoCollection.findOneAndDelete( 
  {
    "_id": new ObjectId(req.body.deleteId)
  }
).then(result => {
  
  res.redirect('/');
})

}); 


app.listen(
  port,
  () => console.log(
    `server is running on ... ${port}`
  )
);