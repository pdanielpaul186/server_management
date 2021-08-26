const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../helper/mongoQueries');

let app = express();
app.use(bodyParser.json());
let router = express.Router();

let dbResponse =[];

router.post('/',async (req,res)=>{
    let exception = req.body.exception;
    dbResponse = await mongo.exceptionDocs(exception);
    res.send({
        status:"success",
        data:await mongo.exceptionDocs(exception),
        message:"IP Address Details retrieved succesfully"
    })
})

module.exports = router;