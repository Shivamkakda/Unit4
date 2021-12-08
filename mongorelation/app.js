const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json())


// ---------- connecting mongoose ---//

const connect = require("./configs/db")

//---- creating SCHEMA and Model ----//

const User = require("./models/user.model")
const Section = require("./models/section.model")
const Author = require("./models/author.model")
const Book = require("./models/books.model") 
const Chekout = require("./models/chekout.model")

//--- REST API ---
const userController = require("./controllers/user") 

const sectionController = require("./controllers/section")

const bookController = require("./controllers/books")

const authorController = require("./controllers/authors")

const chekoutController = require("./controllers/checkout")

//---- 
app.use("/users",userController)
app.use("/sections",sectionController)
app.use("/books",bookController)
app.use("/authors",authorController)
app.use("/checkout",chekoutController)

app.listen(2209,async()=>{
    await connect();
    console.log("start")

})