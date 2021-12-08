const User = require("../models/user.model")
const express = require("express") 
const router = express.Router()

router.get("",async (req,res)=>{ 
    try {
        const users = await User.find() ;
        return res.status(201).send(users)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
router.get("/:id",async (req,res)=>{ 
    try {
        const user = await User.findById().lean().exec() ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
router.post("",async (req,res)=>{ 
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

router.patch("/:id",async (req,res)=>{ 
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

router.delete("/:id",async (req,res)=>{ 
    try {
        const user = await User.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

module.exports = router;