const mongoose = require("mongoose")

const Section = require("./section.model")
const Author = require("./author.model") 

const bookSchema = new mongoose.Schema({
    "name" : {type : String , required : true},
    
    section_id : {type : mongoose.Schema.Types.ObjectId, ref : "section",require : true} ,
    author_id : {type : mongoose.Schema.Types.ObjectId, ref : "author",require : true} 
},{versionKey:false,timestamps:true}) 

module.exports = mongoose.model("book",bookSchema) ;