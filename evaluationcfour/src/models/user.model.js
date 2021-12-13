const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({

    name: {type: String, required:true},
    email : {type: String, required:true},
    password : {type: String, required:true},
    profile_photo_url : {type: String, required:true},
    roles :{type: String, required:true},

},{
    versionKey : false,
    timestamps : true,
});

const User = mongoose.model("user",userSchema);

const movieSchema  =  new mongoose.Schema({

    name: {type: String, required:true},
    actors : [{type: String, required:true}],
    language : [{type: String, required:true}],
    directors : [{type: String, required:true}],
    poster_url :{type: String, required:true},

},{
    versionKey : false,
    timestamps : true,
});

const Movie = mongoose.model("movie",movieSchema);

const theatreSchema  =  new mongoose.Schema({

    name: {type: String, required:true},
    location : {type: String, required:true},
},{
    versionKey : false,
    timestamps : true,
});

const Theatre = mongoose.model("theatres",theatreSchema);

const screenSchema  =  new mongoose.Schema({

    name: {type: String, required:true},
    theatre_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "theaters",
        required : true
    }
},{
    versionKey : false,
    timestamps : true,
});

const Screen = mongoose.model("screen",screenSchema);

const showSchema  =  new mongoose.Schema({

    timing: {type: String, required:true},
    movie_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "movie",
        required : true
    },
    total_seats : { type: Number, required: true},
    screen_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "screen",
        required : true
    }
},{
    versionKey : false,
    timestamps : true,
});

const Show = mongoose.model("show",showSchema);

const seatSchema  =  new mongoose.Schema({

    show_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "show",
        required : true
    }
},{
    versionKey : false,
    timestamps : true,
});

const Seat = mongoose.model("seat",seatSchema);

module.exports = {User,Movie,Theatre,Screen,Show,Seat};

