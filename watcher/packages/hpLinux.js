//var chokidar = require('chokidar');
const mongo = require('../../mongoDb');
const hash = require('object-hash');
const excelParser = require('simple-excel-to-json').XlsParser;
const watch = require('watch');
const dateFormat = require('dateformat');

var parser = new excelParser();
//var watcherUbuntu = chokidar.watch('./Output/Ubuntu', {ignored: /^\./, persistent: true});
watch.createMonitor('./Output/hpLinux',(monitor)=>{
    monitor.on('created',(path,stat)=>{
        console.log(path);
        console.log(stat);
        var doc = parser.parseXls2Json('./'+path);
        //console.log(doc)
        let arr = doc[0];//sheet 1
        console.log(arr)
        for(var i=0;i<=arr.length-1;i++){
            let json = arr[i];
            let preHash = hash(arr[i]);
            mongo.collection('hpLinux').find({hash:preHash}).count((err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if(data==0){
                        json.hash = hash(json);
                        let now = new Date();
                        json.date = dateFormat(now,'yyyy-mm-dd');
                        mongo.collection('hpLinux').insertOne(json,(err,data)=>{
                            if(err){
                                console.log("error in inserting data into mongoDB");
                                console.log(err)
                            }
                            else{
                                console.log("data entered succesfully");
                            }
                        })
                    }
                    else{
                        console.log("Version for package "+json.package_name+" is same");
                    }
                }
            })
        }
    })
})

console.log("WATCHING FOR FILES IN HPLINUX FOLDER !!!!!!!")

// watcherUbuntu.on('add',(path)=>{
//     //console.log('files added at path ',path)
//     //console.log(path)
//     var doc = parser.parseXls2Json('./'+path);
//     //console.log(doc)
//     let arr = doc[0];//sheet 1
//     console.log(arr)
// })

//module.exports = watcherUbuntu;