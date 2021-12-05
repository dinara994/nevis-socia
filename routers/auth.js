const express = require("express")
const {signin, signup, isAuthenticate, getUserInfo} = require("../controllers/auth");
const router = express.Router()


router.get("/user/:id", getUserInfo)
router.post("/signup", signup)
router.post("/signin", signin)
router.get("/authentication", isAuthenticate)

module.exports = router
