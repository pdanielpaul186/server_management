const mongoose = require('mongoose');
const mongoDbUrl = 'mongodb://localhost:27017/server_snapshots';
let mongodb;

mongoose.connect(mongoDbUrl,{useNewUrlParser: true, useUnifiedTopology: true},(err,connection)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("MONGO DB CONNECTED!!!!!!!!!!!")
        mongodb = connection;
        mongoose.connection.createCollection("DB_details",(err,data)=>{
            if(err){
                console.log("error in creating the collection !!!!");
                console.log(err);
            }
            else{
                console.log("collection created!!!!");
                let jsonData = {
                    createdAt : new Date()
                }
                mongoose.connection.collection("DB_details").insertOne(jsonData,(err,data)=>{
                    if(err){
                        console.log("error in Insert data into the collection !!!!");
                        console.log(err);
                    }
                    else{
                        console.log("data inserted successfully");
                    }
                })
            }
        })
    }
})

const db = mongoose.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});

db.once("open", () => {
    console.log("SUCESSFULLY OPENED THE DATABASE");
});

module.exports = mongoose.connection;