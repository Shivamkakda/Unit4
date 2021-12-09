// express ko call kar rhe h
const express = require('express');
const mongoose = require('mongoose');
const app = express();
// json ki form me data k liye json()
app.use(express.json());
//mongo se conectivity 
const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/library");
};

// main  schema (parent schema ) timestamp = kis time create hua or update hua
const sectionSchema = new mongoose.Schema({
    name: {type:String, required:true},
},{
    versionKey : false,
    timestamps : true
});
// collection bnega database me
const section = mongoose.model("section",sectionSchema);
// same schema define krna h (child schema) 
const bookSchema = new mongoose.Schema({
    book_name : { type: String, required: true},
    body : { type: String, required: true},
    section_id : { //mongo id collection k liye, ref = refrence ye section se refrence lega section id k liye 
        type : mongoose.Schema.Types.ObjectId,
        ref : "section",
        required : true
    },
    author_id : { // same process as above
        type : mongoose.Schema.Types.ObjectId,
        ref : "author",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const book = mongoose.model("book",bookSchema);
const authorSchema = new mongoose.Schema({
    first_name : { type: String, required: true},
    last_name : { type: String, required: true},
},{
    versionKey : false,
    timestamps : true
});
const author = mongoose.model("author",authorSchema);
//section CRUD --- 
app.post('/section',async (req,res) => {
    const user = await section.create(req.body);
    return res.status(201).send(user);
});
app.get('/section/:id',async (req,res) => { // find by id and show the result
    const user = await section.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/section/:id',async (req,res) => { // new true chaange krke updated value k liye
    const user = await section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/section/:id',async (req,res) => {
    const user = await section.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});
//book
app.post('/book',async (req,res) => {
    const user = await book.create(req.body);
    return res.status(201).send(user);
});
app.get('/book/:id',async (req,res) => {
    const user = await book.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/book/:id',async (req,res) => {
    const user = await book.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/book/:id',async (req,res) => {
    const user = await book.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});
//author
app.post('/author',async (req,res) => {
    const user = await author.create(req.body);
    return res.status(201).send(user);
});
app.get('/author/:id',async (req,res) => {
    const user = await author.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/author/:id',async (req,res) => {
    const user = await author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/author/:id',async (req,res) => {
    const user = await author.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});
//other api's
app.get('/book/author/:id',async (req,res) => {
    const user = await book.find({author_id : req.params.id}).lean().exec();
     return res.send({user});
});
app.get('/book/section/:id',async (req,res) => {
    const user = await book.find({section_id : req.params.id}).lean().exec();
     return res.send({user});
});
app.get('/book/section/author/:author_id/:section_id',async (req,res) => {
    const user = await book.find({section_id : req.params.section_id,author_id: req.params.author_id}).lean().exec();
     return res.send({user});
});
app.listen(2233,async ()=>{
    await connect();
    console.log("Start");
});