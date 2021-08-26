const jsonQuery = require('json-query');
const lodash = require('lodash');
const stringToHex = require('./helper/stingtoHex');
const mongoDB = require('./mongoDb');
const multichain = require('multichain-node')({

    port: 4782,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "CDMj7v5eECagmkRQHR6y6W94mjFuVF7xJ5ZaU1Xm5RAq"

})

multichain.getInfo((err,res)=>{
    if(err){
        console.log('error occured in connnecting multichain!!!!!!!!');
        console.log(err)
    }
    else{
        console.log("MULTICHAIN CONNECTED!!!!!!!!!");
    }
})

multichain.listStreams((err,res)=>{
    if(err){
        console.log('error in listing out the streams in multichain !!!!');
        console.log(err)
    }
    else{
        console.log("STREAMS LISTED AND CHECKING FOR THE ADMIN STREAM");
        let streamName = lodash.filter(res, x => x.name === 'ADMIN');
        if(streamName.length == 0){
            streamName.push({
                name:"not Admin"
            })
        }
        if(streamName[0].name == 'ADMIN'){
            console.log("ADMIN STREAM ALREADY EXISTS !!!!");
        }
        else{
            multichain.create({type: "stream", name: "ADMIN", open: true},(err,tx)=>{
                if(err){
                    console.log("error in creating the admin stream !!!!")
                    console.log(err)
                }
                else{
                    console.log("ADMIN stream created !!!!");
                }
            })
            multichain.subscribe({stream: "ADMIN"},(err,tx)=>{
                if(err){
                    console.log("error ocuured in subscribing the stream ADMIN !!!!")
                    console.log(err)
                }
                else{
                    console.log("ADMIN stream successfully subscribed and introduced into multichain!!!!");
                }
            })
            multichain.create({type: "stream", name: "Policy", open: true},(err,tx)=>{
                if(err){
                    console.log("error in creating the policy stream !!!!")
                    console.log(err)
                }
                else{
                    console.log("Policy stream created !!!!");
                }
            })
            multichain.subscribe({stream:"Policy"},(err,tx)=>{
                if(err){
                    console.log("error ocuured in subscribing the stream Policy !!!!")
                    console.log(err)
                }
                else{
                    console.log("Policy stream successfully subscribed and introduced into multichain!!!!");
                }
            })
            mongoDB.createCollection("Policy",(err,data)=>{
                if(err){
                    console.log("error in creating Policy collection in Database");
                    console.log(err)
                }
                else{
                    console.log("Policy collection created in Database!!!!")
                }
            })
            multichain.getNewAddress((err,data)=>{
                if(err){
                    console.log("error occured in creating new address!!!!");
                    console.log(err)
                }
                else{
                    let adminObj = {
                        name:"ADMIN",
                        multichainAddress:data
                    }
                    multichain.grant({addresses: data, permissions:  "issue,send,receive,activate,admin" }, (err, tx) => {
                        if(err){
                            console.log("error in granting the permissions for the admin address");
                            console.log(err)
                        } 
                        else{
                            console.log("Admin address has been given all permissions to handle");
                        }
                    });
                    let adminMongo = {
                        name:"ADMIN",
                        password:"123456",
                        multichainAddress:data
                    }
                    mongoDB.collection("ADMIN").insertOne(adminMongo,(err,data)=>{
                        if(err){
                            console.log("error occured in inserting admin data in mongo db")
                            console.log(err)
                        }
                        else{
                            console.log("admin profile completed in mongo db");
                        }
                    })
                    multichain.publish({stream: "ADMIN", key: "IP_ADDRESSES_AND_DETAILS", data:stringToHex.stringToHex(JSON.stringify(adminObj))},(err,tx)=>{
                        if(err){
                            console.log("error occured in publishing the data in the multichain ");
                            console.log(err)
                        }
                        else{
                            console.log("Admin profile completed in multichain !!!!");
                        }
                    })
                }
            })
        }
    }
})

module.exports = multichain;
