var express = require('express');
var app = express();


app.use('/vendors', express.static(__dirname + "/vendors"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/css', express.static(__dirname + "/css"));
app.use('/data', express.static(__dirname + "/data"));
app.use('/fonts', express.static(__dirname + "/fonts"));
app.use('/img', express.static(__dirname + "/img"));
app.use('/jQuery', express.static(__dirname + "/jQuery"));
app.use('/js', express.static(__dirname +"/js"));
app.use('/less', express.static(__dirname +"/less"));
app.use('/media', express.static(__dirname +"/media"));
app.use('/template', express.static(__dirname +"/template"));
app.use('/views', express.static(__dirname +"/views"));


app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/index.html', function(req, res){
    res.sendfile('index.html');
});

app.get('/404.html', function(req, res){
    res.sendfile('404.html');
});

app.get('/lockscreen.html', function(req, res){
    res.sendfile('lockscreen.html');
});

app.get('/lockscreen.html', function(req, res){
    res.sendfile('lockscreen.html');
});

app.get('/login.html', function(req, res){
    res.sendfile('login.html');
});





app.listen('3000', function(){
  console.log("Server online sulla porta 3000");
});