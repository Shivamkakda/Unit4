const express = require('express');
const {body , validationResult} = require('express-validator');
const User = require("../models/user.model");
const router = express.Router();
router.post("/",
 body("first_name").notEmpty().withMessage("First name is required"),
 body("last_name").notEmpty().withMessage("Last name is required"),
 body("email").isEmail().notEmpty(),
 body("pincode").notEmpty().isLength({min:6,max:6}),
 body("age").notEmpty().custom(value => {
    if(value < 1 || value > 100 )
    {
        throw new Error("Age should between 1 to 100")
    }
    return true;
 }),
 body("gender").notEmpty().custom(value => {
    if(value != "Male" && value !="Female" && value !="others")
    {
        throw new Error("Select proper gender")
    }
    return true;
})
,async (req,res) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       let newError = errors.array().map(({msg,param,location}) =>{
           return {[param] : msg,};
       });
     return res.status(400).json({ errors: newError});
   } 

   try{
       
  const user = await User.create(req.body);
  return res.status(201).json({user});
   }
   catch(e){
       return res.status(500).json({ status: "failed", message : e.message});
   }
});

module.exports = router;

