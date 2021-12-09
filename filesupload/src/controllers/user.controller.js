const express = require('express');
const upload = require('../middleware/upload.js')
const {User, Gallery} = require('../models/user.model.js')
const router = express.Router();
router.post('/', upload.single("profile_pic") ,async (req,res) => {
    try {
        const user = await User.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path,
        });
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});
router.patch('/', upload.single("profile_pic") ,async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id,{
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path,
        },{new:true});
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});
router.delete('/',async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});
router.post('/multiple', upload.any("pictures") ,async (req,res) => {
    const filePaths = req.files.map(file => file.path)
    try {
        const user = await Gallery.create({
            pictures : filePaths,
            user_id: req.body.user_id,
        });
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});
router.delete('/',async (req,res) => {
    try {
        const user = await Gallery.findByIdAndDelete(req.body.id);
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message});
    }
});
module.exports = router;