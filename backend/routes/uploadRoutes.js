import path from 'path'
//const path =require('path')

import fs from 'fs'

import express from 'express'
//const express = require('express')

import multer from 'multer'
//const multer =require('multer')

import transactions from '../../uploads/transactions.js'

import Account from '../models/accountModel.js' 
import Transaction from '../models/transactionModel.js' 
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

import accounts from '../../uploads/accounts.js'




function showTime(){
  let time = new Date()
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm="AM"
 //12pm is not accounted for in this logic, but i just accounted for it
  if(hour>12){
    hour -= 12;
    am_pm="PM"
  }

 if(hour==12){
  am_pm="PM"
 }


  if(hour==0){
    am_pm="AM"
  }
   hour = hour < 10 ? "0" + hour :hour;
   min = min < 10 ? "0" + min :min;
   sec = sec < 10 ? "0" + sec :sec;

   let currentTime = hour +":" + "00" + " " + am_pm
   return currentTime
}


const deleteCaba = (req,res,next) => {
  try {fs.unlinkSync('./uploads/CABA.xlsx')
  console.log("file deleted!")
  next()
}    
  catch(err){
    console.log('error while deleting file' + err)
 }
}

const deleteCallOver = (req,res,next) => {
  try {fs.unlinkSync('./uploads/CallOver_Report.xlsx')
  console.log("file deleted!")
  next()
}    
  catch(err){
    console.log('error while deleting file' + err)
 }
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


const storage2 = multer.diskStorage({
  destination:function(req,file,cb){
     cb(null,'./uploads')
  },
  filename:function(req,file,cb){
     cb(null,`${'CallOver_Report'}${path.extname(file.originalname)}`)
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

const upload2 = multer({
  storage:storage2,
  fileFilter:function(req,file,cb){
    checkFileType(file,cb)
  }
})



router.post('/',deleteCaba,upload.single('excel'),asyncHandler(async (req,res)=>{
  
  console.log(req.file.path)
  await Account.deleteMany()
  await Account.create({details:[]})
  await Account.findOneAndUpdate({details:[]},{details:accounts(),time:showTime()})
  const successfulUpdate = await Account.find({time:showTime()})
  /*make a better condition than time checking, cuz it might take longer than a minute to upload and then the showTimes wont correspond */
   
   if(successfulUpdate){res.send(`the file has been updloaded successfully!`)
   console.log('Accounts Updated!'.green.inverse)}
   else{res.send(`Please try to upload the file again`)
   console.log('wahala dey o!'.red.inverse)}

})) //upload.single is the middleware, yes, but it doesn't call next() why? 



router.post('/callover',deleteCallOver,upload2.single('excel'),asyncHandler(async (req,res)=>{
  
  console.log(transactions())
  /*await Transaction.remove() I PLAN TO REMOVE ALL TRANSACTIONS THAT ARE OLDER THAN A YEAR*/
  /*CONSIDER FIRST DELETING THE ENTRIES THAT HAVE FINANCIAL DATES AS WHAT IS ABOUT TO BE UPLOADED, TO AVOID DUPLICATION, WHICH I DID BELOW*/
   await Transaction.remove({Financialdate:transactions()[0].Financialdate})
  await Transaction.insertMany(transactions())
 
  
  const successfulUpdate = await Transaction.findOne({Financialdate:transactions()[0].Financialdate})
  /*this condition finds one entry with the financial date being the same as the file that was uploaded*/
    console.log(successfulUpdate)
  
   if(successfulUpdate){res.send(`the file has been updloaded successfully!`)
   console.log('Accounts Updated!'.green.inverse)}
   else{res.send(`Please try to upload the file again`)
   console.log('wahala dey o!'.red.inverse)}

})) //upload.single is the middleware, yes, but it doesn't call next() why? 




export default router

