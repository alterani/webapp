var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SchemaFiera = require('./shemamongo');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var csvController = require('./server/controller/generateCsv-Ctrl.js');
var parametri = require('./parametri.json');
var urlDb = 'mongodb://'+ parametri.dbhost+':' + parametri.dbport+ '/'+ parametri.dbname;


app.use(bodyParser.json());

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
app.use('/output', express.static(__dirname +"/output"));


app.get('/', function(req, res){
    res.sendfile('index.html');
});


app.post('/api/csv', csvController.generateCsv);

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

// Conta le mail
app.get('/api/contamail', function(req,res){
   MongoClient.connect(urlDb, function(err, db){
        if(err){
            res.error(err);
            return;
         }

         var col = db.collection(parametri.collectionname);

         col.find({mail:{$exists : true}}).count(function(err, docs){
           if(err){
                res.error(err);
            }else{
                
                res.json(docs);
            
            } 
         });

         

         db.close;
   });
});

// CONTA IL TOTALE DEI FAX
app.get('/api/contafax', function(req,res){
   MongoClient.connect(urlDb, function(err, db){
        if(err){
            res.error(err);
            return;
         }

         var col = db.collection(parametri.collectionname);

         col.find({fax:{$exists : true}}).count(function(err, docs){
           if(err){
                res.error(err);
            }else{
                
                res.json(docs);
            
            } 
         });

         

         db.close;
   });
});

// CONTA IL TOTALE DEI FAX
app.get('/api/contatel', function(req,res){
   MongoClient.connect(urlDb, function(err, db){
        if(err){
            res.error(err);
            return;
         }

         var col = db.collection(parametri.collectionname);

         col.find({telefono:{$exists : true}}).count(function(err, docs){
           if(err){
                res.error(err);
            }else{
                
                res.json(docs);
            
            } 
         });

         

         db.close;
   });
});

// CONTA IL TOTALE DEI FAX
app.get('/api/contatutto', function(req,res){
   MongoClient.connect(urlDb, function(err, db){
        if(err){
            res.error(err);
            return;
         }

         var col = db.collection(parametri.collectionname);

         col.find({}).count(function(err, docs){
           if(err){
                res.error(err);
            }else{
                
                res.json(docs);
            
            } 
         });

         

         db.close;
   });
});

app.get('/api/help', function(req, res){

    var elencoServiziApi = [
        '<p> GET /api/fiere </p>',
         '<p> GET /api/contatutto </p>',
         '<p> GET /api/contatel </p>',
         '<p> GET /api/contamail </p>',
         '<p> GET /api/contafax </p>'
    ];
    res.json(elencoServiziApi);

});


app.get('/api/fiere', function(req, res){
    MongoClient.connect(urlDb, function(err, db){
         
         if(err){
            res.error(err);
            return;
         }   


        var col = db.collection(parametri.collectionname);

        col.aggregate([
            {$match: {}},
            {$group:
                //{_id: {nomefiera: "$fiera" },
                {_id: "$fiera", 
                TotSchedeCliente: {$sum: 1}, 
                TotFax: {$sum: {$cond: { if: { $gte: [ "$fax", 0 ] }, then: 1, else: 0 }}},
                TotEmail: {$sum: {$cond: { if: { $gte: [ "$mail", 0 ] }, then: 1, else: 0 }}},
                TotTelefono: {$sum: {$cond: { if: { $gte: [ "$telefono", 0 ] }, then: 1, else: 0 }}}
                }
            }

        ]).toArray(function(err, docs){
            if(err){
                res.error(err);
            }else{
                res.json(docs);
            }
        });
        db.close;
    });
    
});




app.listen('3000', function(){
  console.log("Server online sulla porta 3000");
});