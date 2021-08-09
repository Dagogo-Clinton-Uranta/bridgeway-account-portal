import User from '../models/userModel.js'
//const User = require('../models/userModel.js')

import Message from '../models/messageModel.js'
//I have to make an exception here because the messages are going to this message model in my database and i didn't want to create a new file and route etc.

import Account from '../models/accountModel.js'
//I have to make an exception here because for the messages, I need the corresponding names from the NUBAN and i didn't want to create a new file and route etc.

import asyncHandler from 'express-async-handler'
//const asyncHandler = require('express-async-handler')

import generateToken from '../utils/generateToken.js'
//const generateToken = require('../utils/generateToken.js')

/*import xoauth2 from 'xoauth2'*/

import {google} from 'googleapis';

import nodemailer from 'nodemailer'
//const nodemailer = require('nodemailer')

import dotenv from 'dotenv'

import mongoose from 'mongoose'
//import Message from '../../frontend/src/components/Message.js';

//I'm using this bit of code to  convert my strings to object Id


dotenv.config()

//@desc  Auth user & get a token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const { email, password } = req.body
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own

  const user = await User.findOne({ email: email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userMessage: user.userMessage,
      adminMessage: user.adminMessage,
      isAdmin: user.isAdmin,
      isMerchant: user.isMerchant,
      token: generateToken(user._id)


    })
  } else {
    res.status(401) //this means unauthorized
    throw new Error('invalid email or password')
  }


})

//@desc Set the message that the user wants to convey to the admin
//@route PATCH /api/users/clientMessage
//@access Public
const presentClientMessage = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const {clientMessage, accountId} =  await req.body
  console.log(req.body)
  
  // i need to reset a particular users message so i have to delete by the id i just recieved, HENCE I NEED ID
  //await User.findByIdAndUpdate({_id:objectId}, { userMessage: clientMessage , adminMessageNotification:true , userMessageNotification:false}, { useFindAndModify: false })
  /*clientMessage has been changed to string before being passed into the database cuz of app.use(express.json)*/
  const cabaEntry = await Account.findOne({},{details:{$elemMatch:{Nubanno:accountId}},createdAt:1,time:1})
  
  
  const freshMessage = await Message.find({Nuban:accountId})
   
  
   if(freshMessage.length === 0){

     await Message.create({
      enquiry:clientMessage,
        previousEnquiry:'',
        adminAnswer:'',
        senderName:cabaEntry.details[0].Name,
        Nuban:accountId,
        adminMessageNotification:true,
        userMessageNotification:false,
        userAlert:false
     })

  }
  else {
    if(freshMessage[0].adminMessageNotification === false){ console.log('theres no admin notif so we can update the previous enquiry and enquiry fields')
   const messagePosition = await Message.findOne({Nuban:accountId})
    await Message.findOneAndUpdate({Nuban:accountId}, { enquiry: clientMessage , previousEnquiry:messagePosition.enquiry, adminMessageNotification:true , userMessageNotification:false,userAlert:false}, { useFindAndModify: false })
  }
  else{
    console.log('theres an admin notifso we can only modify our most recent enquiry')
    await Message.findOneAndUpdate({Nuban:accountId}, { enquiry: clientMessage , adminMessageNotification:true , userMessageNotification:false,userAlert:false}, { useFindAndModify: false })
   }
}
   

  
  
  res.status(200)
})


//@desc Set the message that the user wants to convey to the admin
//@route PATCH /api/users/adminMessage
//@access Private Admin
const presentAdminMessage = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const { adminMessage, accountId } = req.body
  console.log(req.body)
 

  const freshMessage = await Message.find({Nuban:accountId})

  
   
   if( freshMessage[0].adminMessageNotification === true){
    
    if(freshMessage[0].adminAnswer.length < 1){
      await Message.findOneAndUpdate({Nuban:accountId}, { adminAnswer: adminMessage , adminMessageNotification:false , userMessageNotification:true, userAlert:true}, { useFindAndModify: false })}

    else {await Message.findOneAndUpdate({Nuban:accountId}, { adminAnswer: adminMessage ,previousAdminAnswer:freshMessage[0].adminAnswer, adminMessageNotification:false , userMessageNotification:true,userAlert:true}, { useFindAndModify: false })}
   
  
  }else{
    await Message.findOneAndUpdate({Nuban:accountId}, { adminAnswer: adminMessage}, { useFindAndModify: false })
  }

  res.status(200)
})

 //@desc  Verify a user before payment
//@route POST /api/users/verify
//@access Public


const verifyUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const {clientId ,personalIdQuery, personalIdAnswer } = req.body
  const objectId = new mongoose.Types.ObjectId(clientId)
  const user = await User.findById(objectId)  
   
  /*console.log(user)*/
    
  switch(personalIdQuery){
  case 'momFirstName': 
  if(user && user.momFirstName === personalIdAnswer){
    return res.send({confirmedState:'true'})
  }
   else{
    return res.send({confirmedState:'false'})
   }

  case 'shoeSize':
  if(user && user.shoeSize === personalIdAnswer){
    return res.send({confirmedState:'true'})
  }
   else{
    return res.send({confirmedState:'false'})
   }

  case 'closestFriend':
   if(user && user.closestFriend === personalIdAnswer){
    return res.send({confirmedState:'true'})
    
   }
    else{
      return res.send({confirmedState:'false'})
    
   }
    
  case 'childhoodStreet':
  if(user && user.childhoodStreet === personalIdAnswer){
    return res.send({confirmedState:'true'})
    
  }
   else{
    return res.send({confirmedState:'false'})
    
   }
  case  'firstEmployment':
  if(user && user.firstEmployment === personalIdAnswer){
    return res.send({confirmedState:'true'})
    
  }
   else{
    return res.send({confirmedState:'false'})
    
   }
      
  default: return res.send({confirmedState:'false'})
  
}
  
})



//@desc Register a new user
// route GET api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const { name, email, password ,momFirstName,shoeSize,closestFriend,childhoodStreet, firstEmployment,isMerchant,pickupAddress } = req.body
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  /* res.send({email,  this res,send was just done for example btw
     password}) */ //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own

  const userExists = await User.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('user already exists!')
  }

  const user = User.create({ //apparently create is syntactic sugar for the save mehod, since creating entails saving i guess
    name: name,
    email: email,
    password: password,
    momFirstName:momFirstName,
    shoeSize:shoeSize,
    isMerchant:isMerchant,
    isAdmin:false,
    pickupAddress:pickupAddress,
    closestFriend:closestFriend,
    childhoodStreet:childhoodStreet,
    firstEmployment:firstEmployment,
    userMessageNotification:false,
    adminMessageNotification:false,
  })

  console.log(user)

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userMessage: user.userMessage,
      adminMessage: user.adminMessage,
      isAdmin: user.isAdmin,
      userMessageNotification:user.userMessageNotification,
      adminMessageNotification:user.adminMessageNotification,
      isMerchant: user.isMerchant,
      token: generateToken(user._id),
      pickupAddress:user.pickupAddress,
      momFirstName:user.momFirstName,
      shoeSize:user.shoeSize,
      closestFriend:user.closestFriend,
      childhoodStreet:user.childhoodStreet,
      firstEmployment:user.firstEmployment
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
//@desc  GET user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  /* res.send({email,  this res,send was just done for example btw
     password}) */ //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own
     console.log(req.user._id)
     const objectId = new mongoose.Types.ObjectId(req.user._id)
  const user = await User.findById(objectId)
  
  /*I am using function scope to  name all my return objects user, and it works, cuz of scope*/
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userMessage: user.userMessage,
      adminMessage: user.adminMessage,
      isAdmin: user.isAdmin,
      isMerchant: user.isMerchant
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc  update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  
       //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own
     const objectId = new mongoose.Types.ObjectId(req.user._id)
  
     const user = await User.findById(objectId)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userMessage: updatedUser.userMessage,
      adminMessage: updatedUser.adminMessage,
      isAdmin: updatedUser.isAdmin,
      isMerchant: updatedUser.isMerchant,
      token: generateToken(updatedUser._id)
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})



//@desc  GET all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const users = await User.find({})
  
  res.json(users)
})

//@desc  delete a user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params._id)
  const user = await User.findById(objectId)
  
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404) //404 is not found
    throw new Error('User not found')
  }

})

//@desc  GET user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  /*console.log(req.params)*/
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const user = await User.findById(objectId).select('-password') //gotta research select
  if (user) {
    res.json(user)
  } else {
    res.status(404) //404 is not found
    throw new Error('User not found')
  }

})


//@desc  update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  
  const user = await User.findById(objectId)
  /*the way he names every variable user, he is aware of function scope and he uses it well*/
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userMessage: updatedUser.userMessage,
      adminMessage: updatedUser.adminMessage,
      isAdmin: updatedUser.isAdmin,
      isMerchant: updatedUser.isMerchant

    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})


export {
  authUser, presentClientMessage, presentAdminMessage, getUserProfile, registerUser,
  updateUserProfile, getUsers, deleteUser, getUserById, updateUser,verifyUser
}

//exports.authUser =authUser
//exports.getUserProfile =getUserProfile
//exports.registerUser = registerUser
//exports.updateUserProfile = updateUserProfile
//exports.getUsers = getUsers
//exports.deleteUser = deleteUser
//exports.getUserById = getUserById
//exports.updateUser = updateUser
