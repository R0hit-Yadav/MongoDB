var exp = require("express")
var app = exp()
const mg = require("mongoose")
mg.connect("mongodb//127.0.0.1:27017/login")
.then(()=>{
    console.log("connection successfull")
})
.catch((err)=>{
    console.log(err)
})


mg.pluralize(null)
const mySchema = new mg.Schema({
    uname:{type:String,required:true},
    password:{type:String,required:true}
})

const person = new mg.model("data",mySchema)

app.use(exp.static(__dirname,{index:"form.html"}))
app.get("/process_get",(req,res)=>{
    const persondata = new person({
        uname:req.query.uname,
        password: req.query.password
    })
    persondata.save()
    res.send("record inserted")
})
app.listen(4000)

