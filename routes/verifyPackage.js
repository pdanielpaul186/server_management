const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');
const hash = require('../helper/hash').hash;
const multichain = require('../multichainAPIs');

let app = express();
app.use(bodyParser.json());
let router = express.Router();

router.post('/package',async (req,res)=>{
    let ipHash = hash(req.body.ipAddress);
    let ipAddrhash = hash('ipAddress_'+ipHash);
    try{
        let packageInfo = await mongo.pckgDocs(ipHash,req.body,package_name);
        let packageMul = await multichain.fetchData(ipAddrhash,req.body.package_name);
        if(packageInfo[0].hash == packageMul[0].package_hash){
            res.send({
                status:"success",
                message:"Package verification done",
                data:"Package Verified and data is same in BlockChain and in Database"
            })
        }
        else{
            res.send({
                status:"success",
                message:"Package verification done",
                data:"Package Verified and data is not same in BlockChain and in Database"
            })
        }
    }
    catch(err){
        console.log(err)
        res.send({
            status:"Fail",
            message:"Package verification cant be done",
            data:"No data Available"
        })
    }

})

router.post('/ipAddress',async (req,res)=>{
    let ipHash = hash(req.body.ipAddress);
    let ipAddrhash = hash('ipAddress_'+ipHash);
    try{
        let packageInfo = await mongo.findIpDocs(req.body.ipAddress);
        let packageMul = await multichain.fetchData(ipAddrhash,req.body.package_name);
        if(packageInfo[0].hash == packageMul[0].package_hash){
            res.send({
                status:"success",
                message:"Package verification done",
                data:"Package Verified and data is same in BlockChain and in Database"
            })
        }
        else{
            res.send({
                status:"success",
                message:"Package verification done",
                data:"Package Verified and data is not same in BlockChain and in Database"
            })
        }
    }
    catch(err){
        console.log(err)
        res.send({
            status:"Fail",
            message:"Package verification cant be done",
            data:"No data Available"
        })
    }

})

module.exports = router;