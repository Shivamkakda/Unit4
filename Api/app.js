const express = require("express")
const app = express();
const data = require("./MOCK_DATA.json")


app.get("/",(req, res) => {
    res.send("Welcome To Home Page")
});

app.get("/user",(req, res) => {
    res.send(data)
});


app.listen(2000,() =>{
     console.log("Start")
})