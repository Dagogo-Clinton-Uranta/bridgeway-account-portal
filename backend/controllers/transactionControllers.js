import Transaction from '../models/transactionModel.js' 
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import accounts from '../../uploads/accounts.js'


//@desc gets an individual user's account information
//@route GET /api/accounts/:id
//@access Private



const allTransactionsForOneUser = asyncHandler(async (req,res) => {
    
   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
 ]

 const date = new Date()

const currentMonthTransaction = await Transaction.find({Nuban:req.query.id, Financialdate:{ $regex: `${monthNames[date.getMonth()]}-${date.getFullYear()}`, $options: 'i' }}).sort({Transactiondate:-1}).limit(1)

   let theAccTransactions
   

   if(req.query.month !=='' && req.query.year !== ''){
    theAccTransactions = await Transaction.find({Nuban:req.query.id , Financialdate:{ $regex: `${req.query.month}-${req.query.year}`, $options: 'i' }}).sort({Transactiondate:1})  
    }
   
   else{
      if(currentMonthTransaction === []){

         
         theAccTransactions = await Transaction.find({Nuban:req.query.id, Financialdate:{ $regex: `${currentMonthTransaction[0].Financialdate}`, $options: 'i' }}).sort({Transactiondate:-1})
      }
     else{
         const scapeGoat = await Transaction.find({Nuban:req.query.id, Financialdate:{ $regex: `${monthNames[date.getMonth()-1]}-${date.getFullYear()}`, $options: 'i' }}).sort({Transactiondate:-1}).limit(1)
        
     theAccTransactions =  await Transaction.find({Nuban:req.query.id, Financialdate:{ $regex: `${scapeGoat[0].Financialdate}`, $options: 'i' }}).sort({Transactiondate:-1})
      }
      } 

   /*i need to sort an array of objects, in order of financial date, or make your own timestamp and sort by it, and then my problem is solved */ 

    console.log(monthNames[date.getMonth()])
    console.log(currentMonthTransaction)


    res.send(theAccTransactions)
  /* { res.status(404) 
   throw new Error('Account not found, please enter your details correctly')}*/
})

export default allTransactionsForOneUser