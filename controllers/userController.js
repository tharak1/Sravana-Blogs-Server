const asyncHandler = require("express-async-handler");
const client = require("../connectDB");
const jwt = require("jsonwebtoken");


const getUsers = asyncHandler(async(req,res)=>{
    client.query("select * from users ",(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

const getUser = asyncHandler(async(req,res)=>{
    id = req.user.id;
    client.query("select * from users where id = $1",[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});


const updateUser =asyncHandler(async(req,res)=>{
    id = req.user.id;
    client.query("UPDATE users SET iscreator = $1 WHERE id = $2",["true",id],(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
})

const createUser = asyncHandler(async(req,res)=>{
    const {name , email , password} = req.body;
    client.query("SELECT * FROM users WHERE email = $1",[email],(error,result)=>{
        if (error) {
            console.log(err);
          }
        if(result.rows.length > 0 ){
            res.send("error");
        }
        else{
            client.query("insert into users (name , email , password) values($1,$2,$3) RETURNING id, password",[name,email,password],(error,results)=>{
                if (error) {
                    throw error;
                  }
                res.status(200).json({message:"created succefully "});
            });
        }
    });
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    client.query("select * from users  where email = $1",[email],(error,result)=>{
        if(result.rows.length = 0){
            res.status(204).json({message : "user does not exists"});
        }
        else{
            client.query("select * from users where email = $1",[email],(error,result)=>{
                const originalPassword = result.rows[0].password;

                if(originalPassword === password){
                    const accessToken = jwt.sign(
                        {
                            user : {
                                username : result.rows[0].name,
                                email : result.rows[0].email,
                                id : result.rows[0].id,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECERT,
                    );

                    resuser = {
                        name:result.rows[0].name,
                        email : result.rows[0].email,
                        iscreator:result.rows[0].iscreator,
                        token:accessToken,
                        id:result.rows[0].id
                    }
                    res.status(200).json(resuser);
                }
                else{
                    res.status(200).json({message:"wrong password"});
                }
                
            })
        }
    })
});












module.exports = {getUsers,getUser,createUser,loginUser,updateUser}; 