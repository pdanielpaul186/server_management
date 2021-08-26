const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

let app = express();
let router = express.Router();
app.use(bodyParser.json());

router.post('/',(req,res)=>{

    if(req.body.username=="ADMIN" || req.body.username=="admin"){
        if(req.body.password=="123456"){

            let payLoad = {
                status:"success",
                username:req.body.username,
                access:"CAN ACCESS ALL OS "
            }

            jwt.sign(payLoad,"password",(err,token)=>{
                if(err){
                    res.send({
                        status:"FAIL",
                        message:err
                    })
                }
                else{
                    res.send({
                        status:"success",
                        message:"welcome",
                        jwt:token
                    })
                }
            })

        }
        else{
            res.send({
                status:"FAIL",
                message:"PASSWORD DOES NOT MATCH"
            })
        }
    }
    else{
        res.send({
            status:"FAIL",
            message:"USERNAME AND PASSWORDS DO NOT MATCH !!!!!"
        })
    }
})

module.exports = router;