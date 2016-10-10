var fs = require('fs-extra');
var path = require('path');
var json2csv = require('json2csv');
var MongoClient = require('mongodb').MongoClient;
var parametri = require('./../../parametri.json');
var urlDb = 'mongodb://'+ parametri.dbhost+':' + parametri.dbport+ '/'+ parametri.dbname;


module.exports.generateCsv = function(req, res){

  console.log("Inizio Esportazione csv..");
  
  var TipoDato = req.body.tipoDato;
  var NomeFiera = req.body.nomeFiera;
  var nomefilecreato = "file.csv"
  var fields = [];
 //{fiera: NomeFiera, fax:{$exists:true}}
  
  // Query per mongo
  var queryDb = {
    fiera: NomeFiera,
    [TipoDato]: { $exists:true}
  };

  //Elenfo campi per mongo
  var listaCampi = {
      [TipoDato]: 1
  };
  
  //elenco campi per file csv
  fields.push(TipoDato);

  MongoClient.connect(urlDb, function(err, db){
        if(err){
            res.error(err);
            return;
         }

         

         var col = db.collection(parametri.collectionname);

         col.find(queryDb, listaCampi ).toArray(function(err, docs){
           if(err){
                res.error(err);
            }else{
                
                //Creazione file
                var csv = json2csv({ data: docs, fields: fields });
                var nomefile = TipoDato + '-' + generaNomeData() + '-' + nomefilecreato;
                fs.writeFile(__dirname + '/../../output/'+ nomefile , csv, function(err) {
                if (err) throw err;
                console.log('Creato file ' + nomefile);
                res.json(nomefile);

                });
                
            
            } 
         });

         

         db.close;
   });



  /*var csv = json2csv({ data: myCars, fields: fields });

  fs.writeFile(nomefilecreato, csv, function(err) {
  if (err) throw err;
  console.log('Craato file ' + nomefilecreato);
  
  res.json(nomefilecreato);

  });
*/
   


}; // fine module.exports.updateUsername

function generaNomeData(){

var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
var ore = date.getHours();
var minuti = date.getMinutes();
var secondi = date.getSeconds();

return monthIndex.toString() + day.toString() + ore.toString() + minuti.toString() + secondi.toString();

}



