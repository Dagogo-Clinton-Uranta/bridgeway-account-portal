import Transaction from '../models/transactionModel.js' 
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import accounts from '../../uploads/accounts.js'


//@desc gets an individual user's account information
//@route GET /api/accounts/:id
//@access Private



const allTransactionsForOneUser = asyncHandler(async (req,res) => {
   
   const date = new Date()


   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
 ]

 console.log(monthNames)

let rollingMonths = []
let leftoverMonths = []

 for(let i= date.getMonth();i>-1;i--){
     rollingMonths.push(`${monthNames[i]}-${date.getFullYear()}`)

 }

 

 for(let i =11;i>12-rollingMonths.length ;i--){
    leftoverMonths.push(`${monthNames[i]}-${date.getFullYear()-1}`)
 }

rollingMonths = [...rollingMonths,...leftoverMonths]

 console.log(rollingMonths)

 


const allTransactions = await Transaction.find({Nuban:req.query.id })

   let theAccTransactions 
   
if(allTransactions.length !== 0){
   
   if(req.query.month !=='' && req.query.year !== ''){
    theAccTransactions = await Transaction.find({Nuban:req.query.id , Financialdate:{ $regex: `${req.query.month}-${req.query.year}`, $options: 'i' }}).sort({Transactiondate:1})  
   
   }
   
   else{
        
    
   const closestMonth0 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[0] )
   const closestMonth1 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[1] ) 
   const closestMonth2 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[2] )
   const closestMonth3 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[3] )
   const closestMonth4 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[4] )
   const closestMonth5 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[5] )
   const closestMonth6 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[6] )
   const closestMonth7 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[7] )
   const closestMonth8 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[8] )
   const closestMonth9 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[9] )
   const closestMonth10 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[10] )
   const closestMonth11 = allTransactions.filter(item => item.Financialdate.substring(3,11) === rollingMonths[11] )
   
   
      const organizedTransactions = [...closestMonth0,...closestMonth1,...closestMonth2,...closestMonth3,...closestMonth4,...closestMonth5,...closestMonth6,...closestMonth7,...closestMonth8,...closestMonth9,...closestMonth10,...closestMonth11]

     const mostRecentMonth = organizedTransactions[0].Financialdate.substring(3,11)

   

    const latestEntry  = await Transaction.find({Nuban:req.query.id, Financialdate:{ $regex: `${mostRecentMonth}`, $options: 'i' }}).sort({Transactiondate:-1}).limit(1)

      theAccTransactions = await Transaction.find({Nuban:req.query.id, Financialdate:{ $regex: `${latestEntry[0].Financialdate}`, $options: 'i' }}).sort({Transactiondate:-1})


  
          
            }
  

    
    res.send(theAccTransactions)
   }else{
   res.status(404) 
  throw new Error('No Recent Transactions')}
})

export default allTransactionsForOneUser