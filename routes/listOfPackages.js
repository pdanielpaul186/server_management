const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');
const hash = require('../helper/hash').hash;

let app = express();
app.use(bodyParser.json());
let router = express.Router();

router.post('/',async (req,res)=>{
    let ipAddress = req.body.ipAddress;
    let ipHash = hash(ipAddress);

    let allDocs = await mongo.allDocsinCollection(ipHash);

    res.send({
        status:"success",
        message:"data retrieved successfully",
        data:allDocs
    })
})

module.exports = router;