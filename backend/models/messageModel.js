import mongoose from 'mongoose'


const Schema = mongoose.Schema
//the use of ".Schema" on it's own below is simply the use of the constant above, i later changed it to bypass this constant
const messageSchema =  mongoose.Schema({

        
        enquiry:{type: String},
        previousEnquiry:{type: String },
        adminAnswer:{type: String },
        Nuban:{type: String },
        adminMessageNotification:{type:Boolean, default:false },
        userMessageNotification:{type: Boolean, default:false }
        
        
        /* maybe an address entry for merchants ? */
        /*maybe an account number entry, so we can verify that you have an account at bridgeway */

},{timestamps:true})


const Message = mongoose.model('Message',messageSchema)




export default Message