//var chokidar = require('chokidar');
const mongo = require('../../mongoDb');
//const hash = require('object-hash');
const hash = require('../../helper/hash').hash;
const excelParser = require('simple-excel-to-json').XlsParser;
const watch = require('watch');
const dateFormat = require('dateformat');
const fileNamePath = require('path');
const fs = require('fs');
const exceljs = require('exceljs');
const multichain = require('../../multichainAPIs');
const helper = require('../../helper/hex2str');

var parser = new excelParser();
//var workbook = new exceljs.Workbook();
let arr;
let count = 0;
//var watcherUbuntu = chokidar.watch('./Output/Ubuntu', {ignored: /^\./, persistent: true});
watch.createMonitor('./Output/Ubuntu',(monitor)=>{
    monitor.on('created',(path,stat)=>{
        console.log(path);
        //let fileName = fileNamePath.basename(path);
        let fileName = fileNamePath.parse(path).name;
        console.log(fileName)
        let ipHash = hash(fileName);
        console.log(ipHash);
        console.log(stat);
        let streamName = 'ipAddress_'+ipHash;
        //console.log(streamName);
        let streamNameHash = hash(streamName); 
        console.log(streamNameHash);
        var doc = parser.parseXls2Json('./'+path);
        //console.log(doc)
        let arr = doc[0];//sheet 1
        //console.log(arr)
        for(var i=0;i<=arr.length-1;i++){
            //console.log(arr[i])
            let json = arr[i];
            let preHash = hash(arr[i]);
            //console.log(preHash);
            mongo.collection(ipHash).find({hash:preHash}).count((err,data)=>{
                if(err){
                    console.log(err);
                    mongo.collection('IP_AddressesDetails').updateOne({hash:ipHash},{$set:{"exception":"Patching Failed"}},(err,data)=>{
                        if(err){
                            console.log("error occured in updating the server details !!!!");
                        }
                        else{
                            console.log("Server identified as Patching Failed !!!!");
                        }
                    })
                }
                else{
                    if(data==0){
                        json.hash = hash(json);
                        let now = new Date();
                        if(json.Event_ID == 100){
                            json.Event_ID = json.Event_ID+100;
                            json.updatedDate = now;
                            json.previousVersion = json.previousVersion.push({
                                date:new Date(),
                                version:json.version
                            });
                            mongo.collection(ipHash).updateOne({hash:preHash},{$set:{"hash":hash(json),"Event_ID":200,"updatedDate":now}},async (err,data)=>{
                                if(err){
                                    console.log("error in updating the new version of the package and the details of it!!!!");
                                    console.log(err);
                                    json.hash = hash(json);
                                }
                                else{
                                    mongo.collection('IP_AddressesDetails').updateOne({hash:ipHash},{$set:{"exception":"Non Complaint With Exception Approvals"}},(err,data)=>{
                                        if(err){
                                            console.log("error occured in updating the server details !!!!");
                                        }
                                        else{
                                            console.log("Server identified as Non Complaint With Exception Approvals !!!!");
                                        }
                                    })
                                    console.log("package details updated succesfully and the event id changed");
                                    try{
                                        let multichainJSON={"hash":hash(json),"Event_ID":200,"updatedDate":now};
                                        let publish = multichain.publishStream(streamNameHash,json.package_name,helper.str2hex(JSON.stringify(multichainJSON)));
                                        console.log("succesfully entered the event in Blockchain ")
                                    }
                                    catch(error){
                                        console.log("error in inserting the event in Blockchain!!!!");
                                        console.log(error);
                                    }
        
                                }
                            })    
                        }
                        else{
                            json.Event_ID = 100;
                            json.Policy = 'No Policy Added';
                            json.status = 'version allowed/not allowed';
                            json.introducedDate = now;
                            json.updatedDate = 'No update recieved';
                            json.condition = 'version Vulnerable or not vulnerable';
                            json.previousVersion = [{
                                date:new Date(),
                                version:'No previous versions available'}];
                        console.log(json)
                        mongo.collection(ipHash).insertOne(json,(err,data)=>{
                            if(err){
                                console.log("error in inserting data into mongoDB");
                                console.log(err)
                            }
                            else{
                                mongo.collection('IP_AddressesDetails').updateOne({hash:ipHash},{$set:{"exception":"Non Complaint Without Exception Approvals"}},(err,data)=>{
                                    if(err){
                                        console.log("error occured in updating the server details !!!!");
                                    }
                                    else{
                                        console.log("Server identified as Non Complaint Without Exception Approvals !!!!");
                                    }
                                })
                                console.log("data entered succesfully");
                            }
                        })
                        
                        count = count + i;

                        let multichainJSON = {
                            "Event_ID":json.Event_ID,
                            "package_hash":json.hash
                        }
                        multichain123();
                        async function multichain123(){
                            try{
                                let publish = await multichain.publishStream(streamNameHash,json.package_name,helper.str2hex(JSON.stringify(multichainJSON))); 
                                console.log("package inserted into multichain !!!!"); 
                            }
                            catch(err){
                                console.log(err)
                            }
                        }   
                        }
                        
                }
                    else{
                        //console.log(json)
                        console.log("Version for package "+json.package_name+" is same");
                    }
                }
            })
        }

        // let new_pckg = {
        //     "count":count,
        //     "date":new Date()
        // }
        // mongo.collection("new_packages").insertOne(new_pckg,(err,data)=>{
        //     if(err){
        //         console.log("error in inserting the count in packages");
        //         console.log(err)
        //     }
        //     else{
        //         console.log("succesfully entered the count");
        //     }
        // })

        // mongo.collection("IP_AddressesDetails").find({ip_address:fileName}).toArray((err,data)=>{
        //     if(err){
        //         console.log("error occured in retriving the server details !!")
        //         console.log(err)
        //     }
        //     else{
        //         console.log("server details retrieved successfully !!")
        //         console.log(data)
        //         workbook.xlsx.readFile(path).then(()=>{
        //             var worksheet = workbook.addWorksheet('Server_Details');
        //             worksheet.addRow(data[0]);
        //             worksheet.commit();
        //             return workbook.xlsx.writeFile(path);
        //         })
        //         console.log("server details also attached to the excel file!!")
        //     }
        //  })

        let now = new Date();
        let date  = dateFormat(now,'yyyy-mm-dd');
        let newPath = '../Reports/'+ipHash+'/aptPackagesList_'+date+'.xlsx';
        fs.rename(newPath,path,(err,data)=>{
            if(err){
                console.log('cant rename the file !!')
                console.log(err)
            }
            else{
                console.log("file name changed !!!");
                console.log("File can be generated for offline checks");
                //console.log(data)
            }
        })
        fs.unlinkSync(path,(err,data)=>{
            if(err){
                console.log("cant unlink the file !!");
                console.log(err)
            }
            else{
                console.log("file removed as it contains crucial information")
            }
        })

    })
})

console.log("WATCHING FOR FILES IN UBUNTU FOLDER !!!!!!!")