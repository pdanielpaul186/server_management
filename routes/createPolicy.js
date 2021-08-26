const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');
const hash = require('object-hash');
const multichain = require('../multichainAPIs');
const helper = require('../helper/stingtoHex')

let app = express();
let router = express.Router();
app.use(bodyParser.json());

router.post('/',async (req,res)=>{
  let data = {
      "policy_name":req.body.policy_name,
      "conditions":req.body.conditions,
      "createdAt":new Date(),
      "updateAt":null,
      "deletedAt":null
  }  

  let findDoc = await mongo.policyDocs("Policy",data.policy_name);
    if(findDoc == undefined){
        //policy_data.hash = hash(policy_data);
        let insertPolicy = await mongo.insertData("Policy",data);
        //let newAddr = multichain.newaddress();
        let multichainJson = {
            "policy_name":data.policy_name,
            "hash":hash(data)
        }
        //let publish = await multichain.publishStream("Policy",policy_data.policy_name,helper.str2hex(JSON.stringify(multichainJson))); 
        
        let response = {
            status:"success",
            message:"successfully created a policy",
            data:data.hash
        }
        res,send(response) ;
    }
    else{
        let response2 = {
            status:"success",
            message:"Policy already exists !!!!",
            data:"To change or update use policy update feature"
        }
        res,send(response2)
    }
})

router.put('/',(req,res)=>{
    let data = {
        "policy_name":req.body.policy_name,
        "conditions":req.body.conditions,
        "updateAt":new Date()
    } 

    let response = update(data);
    res.send(response);
})

router.put('/delete',(req,res)=>{
    let data = {
        "policy_name":req.body.policy_name,
        "conditions":req.body.conditions,
        "deletedAt":new Date()
    } 

    let response = update(data);
    res.send(response);
})

async function create(policy_data){
    let findDoc = await mongo.policyDocs("Policy",policy_data.policy_name);
    if(findDoc == undefined){
        policy_data.hash = hash(policy_data);
        let insertPolicy = await mongo.insertData("Policy",policy_data);
        //let newAddr = multichain.newaddress();
        let multichainJson = {
            "policy_name":policy_data.policy_name,
            "hash":hash(policy_data)
        }
        //let publish = await multichain.publishStream("Policy",policy_data.policy_name,helper.str2hex(JSON.stringify(multichainJson))); 
        
        let response = {
            status:"success",
            message:"successfully created a policy",
            data:policy_data.hash
        }
        return response;
    }
    else{
        let response2 = {
            status:"success",
            message:"Policy already exists !!!!",
            data:"To change or update use policy update feature"
        }
        return response2
    }
}

async function update(policy_data){
    let updateDoc = await mongo.updatePolicyDocs(policy_data);
    let findDoc = await mongo.policyDocs("Policy",policy_data.policy_name);
    let multichainJson = {
            "policy_name":findDoc.policy_name,
            "hash":hash(findDoc),
            "date":new Date()
        }
    let publish = await multichain.publishStream("Policy",policy_data.policy_name,helper.str2hex(JSON.stringify(multichainJson))); 
        
    let response = {
            status:"success",
            message:"successfully updated the status of the policy",
            data:policy_data.hash
        }
    return response;
}

module.exports = router; 