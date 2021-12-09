const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
// mongo connection
const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/studentEvaluation");
};

// user ka schema timestamp create and update time k liye
const userSchema = new mongoose.Schema({
    first_name : { type: String, required: true},
    last_name : { type: String, required: true},
    gender : { type: String, required: true},
    date_of_birth : { type: String, required: true},
},{
    versionKey : false,
    timestamps : true
});
const User = mongoose.model("user",userSchema);
// same student ka schema yha user ka user id require h uska refrence user se aaega
const studentSchema = new mongoose.Schema({
    roll_id : { type: Number, required: true},
    current_batch : { type: String, required: true},
    marks: {type:Number,required:true},
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
// student collection bnane k liye
const Student = mongoose.model("student",studentSchema);
//same type se evaluation ka schema
const evaluationtSchema = new mongoose.Schema({
    date_of_evaluation : { type: String, required: true},
    instructor : { type: String, required: true},
    topic_name : { type: String, required: true},
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    student_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "student",
        required : true
    }
},{
    versionKey : false,
    timestamps : true
});
const Evaluation = mongoose.model("evaluation",evaluationtSchema);

// user k CRUD operation 
app.post('/user',async (req,res) => {
    const user = await User.create(req.body);
    return res.status(201).send(user);
});
// student ke liye
app.post('/student',async (req,res) => {
    const user = await Student.create(req.body);
    return res.status(201).send(user);
});

app.get('/highmarks',async (req,res) => {
    const user = await Student.find({}).sort({marks: -1});
    return res.status(201).send(user[0]);
});

// evalution ka CRUD
app.post('/evaluation',async (req,res) => {
    const user = await Evaluation.create(req.body);
    return res.status(201).send(user);
});

app.get('/evaluation/student/:topic_name',async (req,res)=>{
    const user = await Student.find({topic_name : req.params.topic_name});
    return res.status(201).send(user);
});
// YE SERVER k liye kon se port pe chal rha h
app.listen(2229, async () => {
    await connect();
    console.log("Port 2229");
});