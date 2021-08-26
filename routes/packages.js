const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');
const hash = require('../helper/hash').hash;

let app = express();
app.use(bodyParser.json());
let router = express.Router();

router.post('/',async (req,res)=>{
    let reqData = {
        ipAddress : hash(req.body.ipAddress),
        package_name : req.body.package_name
    }

    console.log(reqData)

    let response = await mongo.pckgDocs(reqData.ipAddress,reqData.package_name);

    res.send({
        status:"success",
        message:"package details fetched succesfully",
        data:response
    })
})

router.put('/',async (req,res)=>{
    let reqData = {
        status : req.body.status,
        condition : req.body.condition
    }


})

module.exports = router;