var mongoConn = require('../mongoDb');

let createCollection = function(collection){
    return new Promise((resolve,reject)=>{
        mongoConn.createCollection(collection,(err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                //console.log(data)
                let stmt="Collection created with name "+ collection;
                return resolve(stmt);
            }
        })
    })
}

let insertData = function(collection,data){
    return new Promise((reject,resolve)=>{
        mongoConn.collection(collection).insertOne(data,(err,msg)=>{
            if(err){
                return reject(err);
            }
            else{
                let stmt = "Document sucessfully inserted in the collection "+collection;
                return resolve(stmt);
            }
        })
    })
}

let allDocsinCollection = function(collection){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find({}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let dateDoc = function(collection,date){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find({date:date}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data)
            }
        })
    })
}

let docCount = function(collection){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).countDocuments({},(err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let listCollections = function(){
    return new Promise((resolve,reject)=>{
        mongoConn.db.listCollections().toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let hashCompare = function(collection,hash){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find({hash:hash}).count((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let pckgDocs = function(collection,pckg){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find({package_name:pckg}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let policyDocs = function(collection,policy){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find({policy_name:policy}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let updatePolicyDocs = function (policy){
    return new Promise((resolve,reject)=>{
        mongoConn.collection("Policy").update({policy_name:policy.policy_name},{$set:policy}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let limitDocs = function(collection,limit){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find().limit(limit).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let exceptionDocsCount = function(exception){
    return new Promise((resolve,reject)=>{
        mongoConn.collection('IP_AddressesDetails').find({exception:exception}).count((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let exceptionDocs = function(exception){
    return new Promise((resolve,reject)=>{
        mongoConn.collection('IP_AddressesDetails').find({exception:exception}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let package_policy_docs = function(data){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(data.ipAddressHash).update({package_name:data.package_name},{$set:data}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let updatePckgDocs = function(ipAddressHash,data){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(ipAddressHash).update({package_name:data.package_name},{$set:data}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let findIpDocs = function (ipAddress){
    return new Promise((resolve,reject)=>{
        mongoConn.collection('IP_AddressesDetails').find({ip_address:ipAddress}).toArray((err,data)=>{
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
    createCollection:createCollection,
    insertData:insertData,
    allDocsinCollection:allDocsinCollection,
    dateDoc:dateDoc,
    docCount:docCount,
    listCollections:listCollections,
    hashCompare:hashCompare,
    pckgDocs:pckgDocs,
    policyDocs:policyDocs,
    updatePolicyDocs:updatePolicyDocs,
    limitDocs:limitDocs,
    exceptionDocsCount:exceptionDocsCount,
    exceptionDocs:exceptionDocs,
    package_policy_docs:package_policy_docs,
    updatePckgDocs:updatePckgDocs,
    findIpDocs:findIpDocs
}