//var chokidar = require('chokidar');
const mongo = require('../../mongoDb');
//const hash = require('object-hash');
const hash = require('../../helper/hash').hash;
const excelParser = require('simple-excel-to-json').XlsParser;
const watch = require('watch');
const dateFormat = require('dateformat');
const txttojson = require('txt-file-to-json');
const fs = require('fs');
const textToArray = require('text-to-array');
const plaintxttojson = require('plain-text-data-to-json');
const multichain = require('../../multichainAPIs');
const multichainConn = require('../../multichainConn');
const stringToHex = require('../../helper/stingtoHex');
const lodash = require('lodash');
const helper = require('../../helper/hex2str');

var parser = new excelParser();
let adminMulAdd;
//let txtparse = new txttojson ({hasHeader : true});
watch.createMonitor('./Output/IP_addresses',(monitor)=>{
    monitor.on('created',(path,stat)=>{
        console.log(path);
        console.log(stat);
    
        var doc = fs.readFileSync(path,'utf-8');
        var txt2JSON = plaintxttojson(doc);
        let obj = txt2JSON.ip_address;
        let ipHash = hash(obj);
        // console.log(obj);
        //console.log(ipHash)
        mongo.collection("IP_AddressesDetails").find({ip_address:txt2JSON.ip_address}).count((err,data)=>{
            if(err){
                console.log("error occured !!!!")
                console.log(err)
            }
            else{
                if(data==0){
                    // mongo.collection("IP_AddressesDetails").insertOne(txt2JSON,(err,data)=>{
                    //     if(err){
                    //         console.log("error in inserting the data into MongoDB");
                    //         console.log(err)
                    //     }
                    //     else{
                    //         console.log("data entered successfully");
                    //     }
                    // })    

                    multichainAPIS(txt2JSON,ipHash);
                    
                }
                else{
                    console.log("IP_ADDRESS ALREADY EXISTS DONT WORRY!!!!!")
                }
            }
        })

        fs.unlinkSync(path,(err)=>{
            if(err){
                console.log('cant remove the file as path is incorrect')
                console.log(err)
            }
            else{
                console.log("IP address file removed for security reasons !!")
            }
        })

      })
})

async function multichainAPIS(txtJSON,HashedIP){
    try{
        let ipHash = HashedIP;
        //console.log(ipHash);
        console.log("Asset not found !!! creating the asset now !!!!");
        let newAddr = await multichain.address();
        console.log("Asset address generated !!!!");
        let permissionAddr = await multichain.grant(newAddr);
        console.log("Permissions given for the asset !!!!");
        let ipObject=txtJSON;
        ipObject.multichainAddress = newAddr;
        ipObject.hash = ipHash;
        ipObject.projectAssigned = 'No Project Assigned';
        ipObject.projectTeamLead = 'No Team Lead Assigned';
        ipObject.serverIncharge = 'No Server Incharge Assigned';
        ipObject.projectsInInstance = 0;
        ipObject.eventID = 100;
        ipObject.eventMessage = "New Server";
        ipObject.introducedDate = new Date();
        ipObject.decomissionedDate = null;
        ipObject.exception = "Identified For Patching";
        // let adminInfo = await multichain.fetchData("ADMIN","IP_ADDRESSES_AND_DETAILS");
        // console.log(adminInfo[0].data);
        // let arr = [];
        // for(var a=0;a<=adminInfo.length;a++){
        //     console.log(adminInfo[a]);
        //     arr.push(JSON.parse(helper.hex2str(adminInfo[a].data)));
        // }
        // let JSON1 = JSON.parse(helper.hex2str(adminInfo[0].data));
        
        // console.log(JSON1)
        //let adminJSON = lodash.filter(res, x => x.name === 'ADMIN');
        //let publishDets = await multichain.publishStream("ADMIN","IP_ADDRESSES_AND_DETAILS",stringToHex.stringToHex(JSON.stringify(ipObject)));
        
        mongo.collection("ADMIN").findOne({name:"ADMIN"},async (err,data)=>{
            if(err){
                console.log("error in getting the admin data")
                console.log(err)
            }
            else{
               try{
                // console.log('IP HASH--->',ipHash);
                // console.log('ADMIN ADDR--->',data.multichainAddress);
                // console.log('Multichain ADDR--->',newAddr);
                let asset = await multichain.issueAssetAddr(data.multichainAddress,newAddr,ipHash,1,1000);
                console.log("asset created with name "+ipHash+" ");        
                let assetSubscribe = await multichain.asset_subscribe(ipHash); 
                console.log("asset is introduced into the chain !!!!")
                let streamName = 'ipAddress_'+ipHash;
                console.log(streamName);
                let streamNameHash = hash(streamName);
                let stream = await multichain.create(streamNameHash);
                console.log("Stream created with name "+streamNameHash+" ");
                let subscribe = await multichain.subscribe(streamNameHash);
                console.log("Stream introduced into the chain !!!!");
               }
               catch(error){
                console.log(error)
               }
            }
        })
         
        mongo.collection("IP_AddressesDetails").insertOne(ipObject,(err,data)=>{
            if(err){
                console.log("error in updating the ip document in IP address details collection!!!!")
                console.log(err)
            }
            else{
                console.log("data entered successfully!!!!");
            }
        })

        let dir = 'Reports/'+ipHash;
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,(err,data)=>{
                if(err){
                    console.log("error in creating the folder !!!!");
                    console.log(err);
                }
                else{
                    console.log("Folder created for the reports !!!!");
                }
            })
        }
        else{
            console.log("error occured while creating the ipAddress folder for reports");
        }

    }
    catch(err){
        console.log("!!!!")
        console.log(err)
    }
}