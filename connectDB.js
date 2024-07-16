const {Client} = require("pg");

const client = new Client({
    user:"postgres",
    host:"localhost",
    database:"blogs",
    password:"postgres",
    port:5432,
});

client.connect().then(() => console.log("database connected")).catch((err)=> console.log(err));



module.exports = client;