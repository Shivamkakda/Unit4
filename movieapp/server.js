const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () =>{
    return mongoose.connect("mongodb://localhost:27017/movies",{
        useNewUrlParser : true,
        useUnifiedTopology : true

    })
}


const userSchema = new mongoose.Schema({
    id : Number,
    movie_name : String,
    movie_genre : String,
    production_year : Number,
    budget : Number
},{
    versionKey : false,
    timestamps : true
})

const User = mongoose.model("user",userSchema);

app.get('/users',async (req,res) => {
    const user = await User.find().lean().exec();
    return res.status(201).json({data: user});
});



app.post('/users',async (req,res) => {
    const user = await User.create(req.body);

    return res.status(201).send(user);
});
app.get('/users/:id',async (req,res) => {
    const user = await User.findById(req.params.id).lean().exec();
     return res.send({user});
});
app.patch('/users/:id',async (req,res) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
     return res.status(201).send(user);
});
app.delete('/users/:id',async (req,res) => {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user);
});


const start = async () => {
    await connect();
    app.listen(2333,()=>{
        console.log("Stat");
    });
}
start();

