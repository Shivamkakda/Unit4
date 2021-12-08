const Chekout = require("../models/chekout.model")
const User = require("../models/user.model")
const Section = require("../models/section.model")
const Author = require("../models/author.model")
const Book = require("../models/books.model")
const express = require("express") 
const router = express.Router()

router.get("",async (req,res)=>{ 
    try {
        const users = await Chekout.find().populate("user_id").populate("author_id").populate("section_id").populate("book_id") ;
        return res.status(201).send(users)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
router.get("/:id",async (req,res)=>{ 
    try {
        const user = await Chekout.findById().populate("user_id").populate("author_id").populate("section_id").populate("book_id").lean().exec() ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
router.post("",async (req,res)=>{ 
    try {
        const user = await Chekout.create(req.body)
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

router.patch("/:id",async (req,res)=>{ 
    try {
        const user = await Chekout.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(user)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

router.delete("/:id",async (req,res)=>{ 
    try {
        const user = await Chekout.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

module.exports = router;