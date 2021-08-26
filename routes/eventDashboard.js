const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');

let app = express();
app.use(bodyParser.json());
let router = express.Router();

router.post('/',async (req,res)=>{
    let exceptions= req.body.exceptions;
    let response =[];
    for(var i=0;i<=exceptions.length;i++){
        response.push(await exceptionDetails(exceptions[i]));
    }
    res.send({
        status:"success",
        data:response,
        message:"count retrieved succesfully"
    })
})

async function exceptionDetails(exception){
    let exceptionCount = await mongo.exceptionDocsCount(exception);
    let jsonType = {
        exception : exception,
        exceptionCount :exceptionCount
    }
    return jsonType;
}

module.exports = router;