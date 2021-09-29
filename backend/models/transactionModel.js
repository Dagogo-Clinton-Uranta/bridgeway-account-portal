import mongoose from 'mongoose'
import bcrypt from  'bcryptjs'
//const mongoose= require('mongoose')
//const bcrypt= require('bcryptjs')

const Schema = mongoose.Schema
//the use of "Schema" on it's own below is simply the use of the constant above, i later changed it to bypass this constant
const transactionSchema =  mongoose.Schema({

        Financialdate:{type: String , required:true},
        Teller:{type: String},
        Referencenumber:{type: String },
        Accountname:{type: String },
        Accountnumber:{type: String },
        Nuban:{type: String },
        Branch:{type: String },
        Debit:{type: String },
        Credit:{type: String },
        Entrycode:{type: String },
        Clientipaddress:{type: String },
        Instrumentnumber:{type: String },
        Narration:{type: String },
        Transactiondate:{type: String, required:true, unique:false }
        
        /* maybe an address entry for merchants ? */
        /*maybe an account number entry, so we can verify that you have an account at bridgeway */

},{timestamps:true /*you want a createdAt? you add timestamps:true*/})

/*userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}*/  //  N . B    YOU CAN CONSIDER BCRYPTING TRANSACTION DETAILS FOR EACH ENTRY

/*userSchema.pre('save', async function(next){
   if(!this.isModified('password')){
     next()  //.isModified is part of mongoose ? what do they traditionally use it for ? this pre is mongooses middleware though
   }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})*/

const Transaction = mongoose.model('Transaction',transactionSchema)




export default Transaction