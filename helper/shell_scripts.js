var exec = require('child_process').exec;
var shell = require('shelljs').exec;

let packagesList = function(osName){
    return new Promise((resolve,reject)=>{
        exec('sh ../shell_scripts/'+osName+'.sh ',(err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
} 

module.exports={
    packagesList:packagesList
}