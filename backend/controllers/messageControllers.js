import Message from '../models/messageModel.js' 
import asyncHandler from 'express-async-handler'




//@desc gets an individual user's chat history based on their account number
//@route GET ${baseUrl}/api/accounts/:id
//@access Private



export const userSpecificMessages = asyncHandler(async (req,res) => {
   
  

const messageExist = await Message.find({Nuban:req.query.id })

   
   
if(messageExist.length !== 0){
    
    res.send(messageExist[0])

   }else{
   res.status(404) 
  throw new Error('User hasn\'t sent a message yet ')}
})

//@desc gets all the chats that havent been seen by the admin
//@route GET ${baseUrl}/api/accounts/newmessagelist
//@access Private



export  const allUnseenMessages = asyncHandler(async (req,res) => {
   
  

  const unseenMessages = await Message.find({adminMessageNotification:true}).sort({updatedAt:1})
  
     
     
  if(unseenMessages.length !== 0){
      
      res.send(unseenMessages)
  
     }else{
     res.status(404) 
    throw new Error('Users haven\'t sent  messages yet ')}
  })


  //@desc turns the user alert property of a specific user to false
//@route POST ${baseUrl}/api/accounts/messages
//@access Public



export  const messageAlertOff = asyncHandler(async (req,res) => {
   
  

  const user = await Message.find({Nuban:req.body.accountId })

   
   
if(user.length !== 0){
    
  await Message.findOneAndUpdate({Nuban:req.body.accountId}, { userAlert:false}, { useFindAndModify: false })

   }else{
   res.status(404) 
  throw new Error('User does not exist')}


  })