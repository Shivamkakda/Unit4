const Section = require("../models/section.model")
const express = require("express") 
const router = express.Router()

router.get("",async (req,res)=>{ 
    try {
        const sections = await Section.find() ;
        return res.status(201).send(sections)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
router.get("/:id",async (req,res)=>{ 
    try {
        const section = await Section.findById(req.params.id).lean().exec() ;
        return res.status(201).send(section)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 
router.post("",async (req,res)=>{ 
    try {
        const section = await Section.create(req.body);
        return res.status(201).send(section)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

router.patch("/:id",async (req,res)=>{ 
    try {
        const section = await Section.findByIdAndUpdate(req.params.id,req.body,{new : true}) ;
        return res.status(201).send(section)
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

router.delete("/:id",async (req,res)=>{ 
    try {
        const section = await Section.findByIdAndDelete(req.params.id) ;
        return res.status(201).send("Deleted")
        
    } catch (e) {
        return res.send({"message" : e.message})
    }
   
}) 

module.exports = router;