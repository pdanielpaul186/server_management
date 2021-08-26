const express = require('express');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const fs = require('fs');
const mongo = require('../../helper/mongoQueries');
//const jsonDiff = require('json-diff');
//const jsonDiff = require('diff-json');
const jsonDiff = require('deep-diff');
const hash = require('object-hash');

let app = express();
app.use(bodyParser.json());
let router = express.Router();

router.get('/',(req,res)=>{
    mongoData();
    async function mongoData(){
        try{
            let result = await mongo.allDocsinCollection('RedHatLinux');
            res.send({
                status:'success',
                data:result
            })
        }
        catch(error){
            console.log(error)
            res.send({
                status:"fail",
                data:error
            })
        }
   }
})

router.get('/date',(req,res)=>{
    mongoData();
    
    async function mongoData(){
        try{
            let now = new Date();
            let date = dateFormat(now,'yyyy-mm-dd');
            console.log(date)
            let result = await mongo.dateDoc('RedHatLinux',date);
            //let count = await mongo.docCount('ubuntu');
            res.send({
                status:"success",
                data:result
                //count:count 
            })
        }
        catch(error){
            console.log(error)
            res.send({
                status:"fail",
                data:error
            })
        }
    }
})

router.post('/',(req,res)=>{
    let pckgName = req.body.pckgName;
    
    mongoData();
    async function mongoData(){
        try{
            let arr =[];
            let docs = await mongo.pckgDocs('RedHatLinux',pckgName);
            //let docs = await mongo.pckgDocs('ubuntu',"accountsservice/bionic,now");
            //console.log(docs)
            //console.log(jsonDiff.diff(docs[0],docs[1]))
            //console.log(arr)
            res.send({
                status:"success",
                data:docs
            })
        }
        catch(error){
            console.log(error)
            res.send({
                status:"fail",
                data:error
            })
        }
    }
})

module.exports = router;