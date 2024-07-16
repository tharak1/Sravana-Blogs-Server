const asyncHandler = require("express-async-handler");
const client = require("../connectDB");

const getAllPosts = asyncHandler(async(req,res)=>{

    client.query("select * from blogposts",(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
});




const createBlog = asyncHandler(async(req,res)=>{
    const {userid, postcategory,postlikes,postviews,postimage,postcontent,postheading} = req.body;
    client.query("insert into blogposts(userid,postcategory,postheading,postcontent,postimage,postviews,postlikes) values ($1,$2,$3,$4,$5,$6,$7)",[userid,postcategory,postheading,postcontent,postimage,postviews,postlikes],(error,result)=>{
        if(error) throw error;
        res.status(200).json({message:"done"});
    });
})

const getBlogsByUser = asyncHandler(async(req,res)=>{
    const id = req.query.id;
    client.query("select * from blogposts where userid = $1",[id],(error,result)=>{
        res.status(200).json(result.rows);
    });
});

const getByCategory = asyncHandler(async(req,res)=>{
    const cat = req.query.category;
    client.query("select * from blogposts where postcategory = $1",[cat],(error,result)=>{
        res.status(200).json(result.rows);
    });
})

module.exports = {getAllPosts,createBlog,getBlogsByUser,getByCategory};