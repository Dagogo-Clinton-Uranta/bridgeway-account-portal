import Message from '../models/messageModel.js' 
import asyncHandler from 'express-async-handler'




//@desc gets an individual user's chat history based on their account number
//@route GET /api/accounts/:id
//@access Private



const userSpecificMessages = asyncHandler(async (req,res) => {
   
  

const messageExist = await Message.find({Nuban:req.query.id })

   
   
if(messageExist.length !== 0){
    
    res.send(messageExist[0])

   }else{
   res.status(404) 
  throw new Error('User hasn\'t sent a message yet ')}
})

export default userSpecificMessages