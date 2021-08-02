import mongoose from 'mongoose'
//const mongoose = require('mongoose')

import dotenv from 'dotenv'
//const dotenv = require('dotenv')
 
import colors from 'colors'


import users from './data/users.js'
//const users =require('./data/users.js')

import products from './data/products.js'
//const products =require('./data/products.js')

import accounts from '../uploads/accounts.js'

import transactions from '../uploads/transactions.js'

import User from './models/userModel.js'
//onst User =require('./models/userModel.js')

import Account from './models/accountModel.js'

import Product from './models/productModel.js'
//const Product =require('./models/productModel.js')

import Order from './models/orderModel.js'
//const Order =require('./models/orderModel.js')

import connectDB from './config/db.js'
import Transaction from './models/transactionModel.js'
//const connectDB =require('./config/db.js')

 dotenv.config()

connectDB()

/*YOU'RE DEALING WITH A DATABASE, SO EVERYTHING RETURNS A PROMISE*/
/*YOURE DEALING WITH A DATABASE, SO EVERYTHING RETURNS A PROMISE*/

function showTime(){
  let time = new Date()
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm="AM"

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



const importData = async()=> {

  try{
      /*await User.deleteMany()  this is adijat and john doe them
      await User.insertMany(users)*/
      /*await Account.deleteMany() you cant be deleting entries anyhow now,it was only for test purposes, until you confirm with downstairs
      await Account.create({details:[]})
      await Account.findOneAndUpdate({details:[]},{details:accounts(),time:showTime()})*/
     
        // WARNING:IF YOU RUN DELETE, YOU'LL CLEAR THE WHOLE DATABASE OF TRANSACTIONS  AND THEN ONLY INSERT ONE DAY'S WORTH OF TRANSACTIONS, SO BE CAREFUL
      /*await Transaction.deleteMany()*/
   
    await Transaction.insertMany(transactions())

   /*   for(let i = 0;i < transactions().length + 1;i++){
     if(transactions()[i].Nuban){ await Transaction.create(transactions()[i])}  
    }*/
      
      /*this was a pivotal clue to how i solved the problem the first time const allAccounts = await Account.find({}) <---- 
        THIS IS HOW YOU'LL BE CALLING THEM IN THE ACCOUNT ROUTES
      console.log(allAccounts[0].details[9]) <----*/

    
      
       console.log('Data Imported'.green.inverse)
       process.exit() /*what is this process.exit?*/
  }

  catch(error){
    console.error(`Error:${error}`.red.inverse)
    process.exit(1)
  }

}


const destroyData = async()=> {

  try{
      /*await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()*/

 
       console.log('Data Destroyed!'.red.inverse)
       process.exit() /*what is this process.exit?*/
  }

  catch(err){
    console.error(`Error:${err}`.red.inverse)
    process.exit(1)
  }

}
if (process.argv[2]==2){
   destroyData()
}
else{importData()}

/*to call this seeder file we go node backend/seeder(-d).
 d flag to call delete. First of all, wtf is seeder and why
 are they using it */
