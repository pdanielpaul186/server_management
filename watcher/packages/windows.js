//var chokidar = require('chokidar');
// const mongo = require('../../mongoDb');
// const hash = require('object-hash');
const excelParser = require('simple-excel-to-json').XlsParser;
const watch = require('watch');
const pathModule = require('path');
// const dateFormat = require('dateformat');
// const txttojson = require('txt2json').txt2json;
const fs = require('fs');
const fileType = require('file-type');
// const readline = require('readline');

var parser = new excelParser();
//let txtparse = new txttojson ({hasHeader : true});
var options = {
    delimiter: ' '
}
watch.createMonitor('./Output/Windows',(monitor)=>{
    monitor.on('created',(path,stat)=>{
        console.log(path);
        console.log(stat);
        console.log("Changing the file encoding to UTF-8 !!!!");
        console.log("file converting !!!!");
        fs.readFile(path,(err,fileContent)=>{
            if(err){
                console.log("error occured while reading the file which is of different encoding !!!!");
                console.log(err)
            }
            else{
                let fileName = pathModule.basename(path);
                fs.createReadStream(path,{encoding: 'utf-8'},async (err,data)=>{
                    if(err){
                        console.log("error in reading the file !!!!");
                        console.log(err)
                    }
                    else{
                        console.log(await fileType.fromStream(data));
                    }
                })
                fs.writeFile('./Reports/Windows/'+fileName,fileContent,{encoding: 'utf-8'},(err)=>{
                    if(err){
                        console.log("error in converting the file to utf-8 !!!!")
                        console.log(err)
                    }
                    else{
                        console.log("file succesfully converted to utf-8 format");
                    }
                })
            }
        })
     })
})

console.log("WATCHING FOR FILES IN WINDOWS FOLDER !!!!!!!")