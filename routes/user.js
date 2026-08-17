const express=require("express");
const router=express.Router();
const User = require("../models/user"); 
const WrapAsync=require("../utils/wrapAsync");
const passport = require("passport");
const{saveRedirectUrl}=require("../middleware");
const userController=require("../controllers/users.js");
const authLimiter = require("../middleware");

router.route("/signup")
.get(userController.renderSignupForm)
.post(authLimiter,WrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post
  (
    saveRedirectUrl,
      authLimiter,
    passport.authenticate("local",
        {failureRedirect:"/login",
        failureFlash:true}),
        userController.login);


router.get("/logout",userController.logout);

module.exports =router;