const mongo = require('../../mongoDb');
const hash = require('object-hash');
const watch = require('watch');
const dateFormat = require('dateformat');
const fs = require('fs');
const fileType = require('file-type');

watch.createMonitor('./Reports/Windows',(monitor)=>{
    monitor.on('created',(path,stat)=>{
        console.log(path);
        console.log(stat);
        
        fs.readFile(path,(err,data)=>{
            if(err){
                console.log("error in reading the file after converting to UTF-8!!!")
                console.log(err)
            }
            else{
                fs.readFile(path,async (err,data)=>{
                    if(err){
                        console.log("error in reading the file !!!!");
                        console.log(err)
                    }
                    else{
                        console.log(await fileType.fromBuffer(data));
                    }
                })
            }
        })
    })
})