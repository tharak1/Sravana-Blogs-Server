const express = require("express");
const { getAllPosts, createBlog, getBlogsByUser, getByCategory } = require("../controllers/blogsController");
const validateToken = require("../middleware");

const router = express.Router();

router.route("/").get(getAllPosts);
router.route("/").post(createBlog);
router.route("/getForEachUser").get(getBlogsByUser);
router.route("/getByCategory").get(getByCategory);



module.exports = router;