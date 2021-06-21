import path from 'path'
//const path =require('path')

import express from 'express'
//const express = require('express')

import multer from 'multer'
//const multer =require('multer')

import Account from '../models/accountModel.js' 
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

import accounts2 from '../../uploads/accounts2.js'




function showTime(){
  let time = new Date()
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm="AM"
 //12pm is not accounted for in this logic
  if(hour>12){
    hour -= 12;
    am_pm="PM"
  }

  if(hour==0){
    hour = 12;
    am_pm="AM"
  }
   hour = hour < 10 ? "0" + hour :hour;
   min = min < 10 ? "0" + min :min;
   sec = sec < 10 ? "0" + sec :sec;

   let currentTime = hour +":" + "00" + " " + am_pm
   return currentTime
}





const router = express.Router()



const storage = multer.diskStorage({
  destination:function(req,file,cb){
     cb(null,'./uploads')
  },
  filename:function(req,file,cb){
     cb(null,`${'CABA'}${path.extname(file.originalname)}`)
  },
})  
function checkFileType(file,cb){
  const filetypes =/xlsx|xls/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())  //path.extname the extname is a method of path function, while in const extname, thats just a variable we're declaring
  const mimetype = filetypes.test(file.mimetype) // what is a mimetype ?

if(extname){  //i removed mimetype (&&mimetype) checking cuz  xlsx doesnt have xlsx in it's mimetype
   return cb(null,true)
}else{
  cb('Excel files only!')
}

}

const upload = multer({
  storage,
  fileFilter:function(req,file,cb){
    checkFileType(file,cb)
  }
})

router.post('/',upload.single('excel'),asyncHandler(async (req,res)=>{
  
  console.log(req.file.path)
  await Account.deleteMany()
  await Account.create({details:[]})
  await Account.findOneAndUpdate({details:[]},{details:accounts2,time:showTime()})
  const successfulUpdate = await Account.find({})
   console.log('Accounts Updated!'.green.inverse)
   
   if(successfulUpdate){res.send(`the file has been updloaded successfully!`)}
   else{res.send(`Please try to upload the file again`)}

})) //upload.single is the middleware, yes

//exports.router =router
export default router

