const user = require('./data.json');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/',(req, res) =>{
    res.send(user);
});

app.post('/user', (req,res) =>{
    user.push(req.body);
    res.send(user);
});

app.get('/user/:id',(req,res) =>{
    var arr = user.filter((e) =>{
        return e.id == req.params.id;
    })
    res.send(arr);
});

app.patch('/user/:id',(req,res) =>{
    var arr = user.filter((e) =>{
        return e.id == req.params.id;
    });
    var newData = req.body;

    arr[0] ={
        ...arr[0],
        ...newData
    }
    res.send(arr[0])
});

app.delete('/user/:id',(req,res) =>{
    var arr = user.filter((e) =>{
        return e.id != req.params.id;
    })
    res.send(arr);
});

app.listen(2324,() =>{
    console.log("Start")
})