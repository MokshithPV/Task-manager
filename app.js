require('./mongodb/connect.js');
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const router = require('./routers/route.js');
const path = require('path');
const mongodb = require('./mongodb/connect.js')
const errorhandler = require("./middlewares/errorhandler.js");
const axios = require('axios').default;
require("dotenv").config();
app.use(express.static(path.resolve(__dirname,"./templates")))
app.use('/api/v1/tasks',router);
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./templates/index.html"));
})
app.get('/:id', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./templates/edit.html"));
})
app.all('*',(req,res)=>{
    res.status(404).sendFile(path.resolve(__dirname,"./templates/err.html"));
})
app.use(errorhandler);
const port = 3000;
const start = () => {
    mongodb(process.env.Mongop).then(()=>app.listen(port, console.log(`server is listening at ${port}...`))).catch((err)=>console.log(err));
}
start();
//show();