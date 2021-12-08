
const mongoose = require("mongoose")

const checkoutSchema = new mongoose.Schema({
  
    user_id : {type : mongoose.Schema.Types.ObjectId, ref : "user",require : true} ,
    section_id : {type : mongoose.Schema.Types.ObjectId, ref : "section",require : true} ,
    book_id : {type : mongoose.Schema.Types.ObjectId, ref : "book",require : true} ,
    author_id : {type : mongoose.Schema.Types.ObjectId, ref : "author",require : true} 
},{versionKey:false,timestamps:true}) 

module.exports = mongoose.model("checkout",checkoutSchema) ;