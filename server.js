var express = require('express');
var bodyParser =  require("body-parser");

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/sample';

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/' + 'index.html');
});

findNotes = function(db, callback) {
    var data = [];
    var cursor =db.collection('notes').find();
    cursor.each(function(err, doc) {
       if (doc != null) {
           data.push(doc);
       } else {
          callback(data);
       }
    });
 };

 findUser = function(db, query,callback) {
    var data = [];
    var cursor =db.collection('users').find(query);
    cursor.each(function(err, doc) {
       if (doc != null) {
           data.push({"email":doc.email,"username":doc.username});
       } else {
          callback(data);
       }
    });
 };

connectDB = function(exec,query,callback){
    mongoClient.connect(url, function(err, db) {
        console.log("Connected to the server.");
        if(query!=undefined && query!=null){
            exec(db,query,callback);
        }
        else
        {
            exec(db,callback);
        }
        
    });
};


 app.get('/getNotes',function(req,res){
    connectDB(findNotes,undefined,function(x){
       res.send(x);
    });
 });

app.get('/verifyUser',function(req,res){
    var query = {"email":req.query.username,"password":req.query.password};
    connectDB(findUser,query,function(x){
      res.send(x);
   });
});
app.listen(port, function() {
    console.log('Server listening on port '+port);
});
