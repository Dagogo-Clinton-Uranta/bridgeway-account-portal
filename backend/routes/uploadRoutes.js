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
  await Account.findOneAndUpdate({details:[]},{details:accounts2})
  const successfulUpdate = await Account.find({})
   console.log('Accounts Updated!'.green.inverse)
   
   if(successfulUpdate){res.send(`the file has been updloaded successfully!`)}
   else{res.send(`Please try to upload the file again`)}

})) //upload.single is the middleware, yes

//exports.router =router
export default router

