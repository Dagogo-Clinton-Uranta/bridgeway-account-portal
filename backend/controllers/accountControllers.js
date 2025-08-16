import Account from '../models/accountModel.js' 
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import accounts from '../../uploads/accounts.js'


//@desc gets an individual user's account information
//@route GET ${baseUrl}/api/accounts/:id
//@access Private

const getAccountByAccountNumber = asyncHandler(async (req,res) => {
    
   const account = await Account.findOne({},{details:{$elemMatch:{Nubanno:req.params.accountId}},createdAt:1,time:1}/*,{createdAt:1}*/,{ useFindAndModify: false}) /*get elematch to match phone number as well */
    
   console.log(account)
 
 /*console.log(req.params.accountId)*/

    /*const allAccounts = await Account.findOne({})*/
  
   /* let dog = allAccounts.details[]
    let baby = []
    const allAccounts2 = baby.concat(dog)

   console.log(typeof(allAccounts2[0].Name))
   
   let account = []
   let i 

     for( i = 0; i < allAccounts2.length ;i++){
        if(allAccounts2[i]['NUBAN No'][''] === req.params.accountId){
          account.push(allAccounts2[i])
          
        }
     }

     console.log(account)*/

    
    res.json(account)
   /*{ res.status(404) 
   throw new Error('Account not found, please enter your details correctly')}*/
})

export default getAccountByAccountNumber