
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');
const hash = require('object-hash');
const multichain = require('../multichainAPIs');
const helper = require('../helper/stingtoHex');
const hash = require('../helper/hash').hash;

let app = express();
let router = express.Router();
app.use(bodyParser.json());

router.put('/',async (req,res)=>{
    let pckgDoc = await mongo.pckgDocs(hash(req.body.ipAddress),req.body.package_name);
    let requestData = {
        "ipAddress":req.body.ipAddress,
        "ipAddressHash":hash(req.body.ipAddress),
        "policy_name":req.body.policy_name,
        "package_name":req.body.package_name,
        "Event_ID":200,
        "updatedDate":pckgDoc.updatedDate.push({
            date:new Date(),
            reason:"Policy Added to the Package"
        })
    }
    updatePckgPolicy(requestData);
})

async function updatePckgPolicy(data){
    let streamName = 'ipAddress_'+data.ipAddressHash;
    let streamNameHash = hash(streamName);
    let updateDoc = await mongo.package_policy_docs(data);
    let findDoc = await mongo.pckgDocs(data.ipAddressHash,data.package_name);
    let multichainJson = {
            "package_name":findDoc.package_name,
            "hash":hash(findDoc),
            "date":new Date()
        }
    let publish = await multichain.publishStream(streamNameHash,data.package_name,helper.str2hex(JSON.stringify(multichainJson))); 
        
    res.send({
            status:"success",
            message:"successfully updated the status of the policy",
            data:data.ipAddressHash
        })
}

module.exports = router;