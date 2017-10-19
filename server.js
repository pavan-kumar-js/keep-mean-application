var express = require('express');
var bodyParser =  require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/' + 'index.html');
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});
