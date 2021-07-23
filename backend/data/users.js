import bcrypt from 'bcryptjs'
//const bcrypt = require('bcryptjs')
const dummyPassword = '0284'
const johnnyPassword = '123456'
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync(dummyPassword,salt)
const johash = bcrypt.hashSync(johnnyPassword,salt)

const users = [
  {
    name:'Adijat Odubanjo',
    email:'odubanjoadijat@bridgewaymfb.com',
    password: hash,
    isAdmin:true,
    isMerchant:false,
    userMessage:'hi',
    adminMessage:'hi',
    momFirstName:'Amelia',
    shoeSize:'44',
    closestFriend:'Jamil',
    childhoodStreet:'Eti-Osa Way',
    firstEmployment:'Niger Insurance'
  },

  {
    name:'John Doe',
    email:'john@yahoo.com',
    password: johash,
    isAdmin:false, 
    isMerchant:false,
    userMessage:'hi',
    adminMessage:'hi',
    momFirstName:'Amelia',
    shoeSize:'44',
    closestFriend:'Jamil',
    childhoodStreet:'Eti-Osa Way',
    firstEmployment:'Niger Insurance'
  },

  {
    name:'OKOLI LTD',
    email:'okoli@yahoo.com',
    password: hash,
    isAdmin:false,
    isMerchant:true,
    userMessage:'hi',
    adminMessage:'hi',
    momFirstName:'Amelia',
    shoeSize:'44',
    closestFriend:'Jamil',
    childhoodStreet:'Eti-Osa Way',
    firstEmployment:'Niger Insurance'
  }
]

//exports.users =users;
export default users