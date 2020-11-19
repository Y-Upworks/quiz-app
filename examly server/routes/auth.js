const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const {JWT_SECRET}=require('../keys')
const jwt=require('jsonwebtoken')
router.get('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return  res.status(422).json({error:"Please  add all the fields"}) 
    }
    else{
        User.findOne({email:email})
        .then(saveduser=>{
            if(!saveduser)
            {
                return  res.status(422).json({error:"Invalid Email or password"}) 
            }
            else{
                bcrypt.compare(password,saveduser.password)
                .then(doMatch=>{
                    if(doMatch){
                        const token=jwt.sign({id:saveduser._id},JWT_SECRET)
                        const {_id,name,email}=saveduser;
                        res.status(200).json({
                            message:"Successfull",
                            token:token,
                            user:{
                                _id,name,email
                            }
                     }) 
                    }
                    else{
                        return  res.status(422).json({error:"Invalid Email or password"})
                    }

                })
                .catch(err=>{console.log(err)});
            }

        })
        .catch(err=>console.log(err));
    }
})

router.post('/signup',(req,res)=>{
    const {email,password,name}=req.body;
    if(!email||!password||!name){
        return  res.status(422).json({error:"Please  add all the fields"});
    }
    else{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
            return  res.status(422).json({error:"User Already exists."})
            }
            else{
                bcrypt.hash(password,12)
                .then(hashedpassword=>{
                    const user=new User({
                        email:email,
                        password:hashedpassword,
                        name:name
                })
                user.save()
                .then(user=>{
                    res.status(200).json({message:"saved successfully"})
                })
                .catch(err=>{
                    console.log(err);
                    throw err;
                })
               })
               .catch(err=>console.log(err));
            }
        
    }).catch(err=>console.log(err));
    }   
})


module.exports=router