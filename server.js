var express = require('express');
var bodyParser =  require("body-parser");

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/' + 'index.html');
});

app.listen(port, function() {
    console.log('Server listening on port '+port);
});
