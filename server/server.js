const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app = express();
var cors = require('cors');
const port = 4000;
var db;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();

MongoClient.connect('mongodb://localhost:27017/myproject', (err, database) => {
  if (err) return console.log(err)
	  db = database;
});

app.use(cors({
    origin: true,
    credentials: true
}));
app.listen(port, ()=>{
	console.log('We are live on' + port);
});

app.get('/users', (req, res) => {
	db.collection('logininfo').find().toArray((err, result) => {
    if (err) return console.log(err);
	console.log("all sent");
	res.json(result);
  });
});

app.post('/users/authenticate', (req,res) =>{
	 console.log(req.body.username+"####");
  db.collection('logininfo').findOne({username : req.body.username, password: req.body.password}, (err, item) => {
	  if (err) {
        res.status(400).send("incorrect");
      }
	  if (item)
	  {	   console.log(req.body.username);
        res.status(200).send(req.body.username);
	  }
	 else
		res.status(401).send("incorrect");
      });
});

app.post('/users/register', (req,res) =>{
	db.collection('logininfo').insert({
		username : req.body.username,
		password : req.body.password,
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		phoneNumber : req.body.phoneNumber
	})
          
	res.sendStatus(200);
});
app.put('/new', (req, res) => {
	
	var updateid = req.body.upd;
  db.collection('logininfo').findOneAndUpdate({user: req.body.upd}, {
    $set: {
      user: req.body.user
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
		console.log(result);
    res.send("Value updated");
  })
})

 app.delete('/users/:username', (req, res) => {
	var nameid = req.params.username;
	console.log("yh delete hoga" + nameid);
    db.collection('logininfo').remove({ username: nameid}, (err, item) => {
      if (err) {
        res.status(400).send({'error':'An error has occurred'});
      } else {
        res.sendStatus(200);
      } 
    });
  });
