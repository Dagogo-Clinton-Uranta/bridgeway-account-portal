import Transaction from '../models/transactionModel.js' 
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import accounts from '../../uploads/accounts.js'


//@desc gets an individual user's account information
//@route GET /api/accounts/:id
//@access Private

const allTransactionsForOneUser = asyncHandler(async (req,res) => {
    
   let theAccTransactions
   console.log(theAccTransactions)

   if(req.query.month !=='' && req.query.year !== ''){
    theAccTransactions = await Transaction.find({Nuban:req.query.id , Financialdate:{ $regex: `${req.query.month}-${req.query.year}`, $options: 'i' }}).sort({Transactiondate:-1})  
    }else{
       theAccTransactions = await Transaction.find({Nuban:req.query.id}).sort({Transactiondate:-1}).limit(1)
    }
   /*i need to sort an array of objects, in order of financial date, or make your own timestamp and sort by it, and then my problem is solved */ 

    console.log(theAccTransactions)
    
    res.send(theAccTransactions)
  /* { res.status(404) 
   throw new Error('Account not found, please enter your details correctly')}*/
})

export default allTransactionsForOneUser