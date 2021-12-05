const express = require("express")
const {addComment} = require("../controllers/comments");
const router = express.Router()


router.post("/", addComment)

module.exports = router

//1 - server
//2 - routers
//3 - models
//4 - controllers