const express  = require('express')
const path = require('path')
const fs = require('fs')

const app = express()   
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        console.log(files)
        res.render("index",{files:files});
    })
}) 
app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,filedata)=>{
        res.render('show',{filename:req.params.filename, filedata:filedata});
    })
}) 

app.post("/create",(req, res)=>{
    var title = req.body.title
   fs.writeFile(`./files/${title.split(' ').join('')}.txt`,req.body.details,(err)=>{
    res.redirect("/")
   })
})



const PORT = 8000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})