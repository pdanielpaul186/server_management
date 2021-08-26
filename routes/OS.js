const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const osConfig = require('getos');
const mongo = require('../helper/mongoQueries');

let app = express();
app.use(bodyParser.json());
let router = express.Router();

router.get('/',(req,res)=>{
    let token = req.query.token;

    jwt.verify(token,"password",(err,data)=>{
        if(err){
            res.send({
                status:"FAIL",
                message:"You are not allowed to access this web page"
            })
        }
        else{
            osConfig((err,data)=>{
                if(err){
                    res.send({
                        status:"FAIL",
                        message:"OS Details cant be fetched",
                        data:err
                    })
                }
                else{
                    osfunction(data);
                    res.send({
                        status:"success",
                        message:"OS Details fetched and collection is added in the mongoDB",
                        data:data
                    })
                }
            })
        }
    })
})

async function osfunction(data){
    let collectionName = ''+data.dist+''+'-'+data.release;
    await mongo.createCollection(collectionName);
    console.log("collection created with name ",collectionName);
}

module.exports = router;