const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const {MONGOURI}=require('./keys');
const auth=require('./routes/auth');
const category=require('./routes/category');
const question=require('./routes/question');



app.use(cors());
mongoose.connect(MONGOURI,{useNewUrlParser: true,useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connection.on('connected',()=>{
   console.log("mongodb connection established successfully");
})
mongoose.connection.on('error',()=>{
    console.log("mongodb connection Failed");
})
app.use('/',auth);
app.use('/category',category);
app.use('/question',question);

app.listen(4000,()=>{console.log('server is running')})
