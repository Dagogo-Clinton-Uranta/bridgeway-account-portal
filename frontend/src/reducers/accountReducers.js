import {
 ACCOUNT_DETAILS_REQUEST,
 ACCOUNT_DETAILS_SUCCESS,
 ACCOUNT_DETAILS_FAILURE,
 CHAT_DETAILS_REQUEST,
 CHAT_DETAILS_SUCCESS,
 CHAT_DETAILS_FAILURE,
 TRANSACTION_DETAILS_REQUEST,
 TRANSACTION_DETAILS_SUCCESS,
 TRANSACTION_DETAILS_FAILURE

} 

from '../constants/accountConstants.js'

export const accountDetailsReducer = (state={},action) => {
  switch(action.type){
    case ACCOUNT_DETAILS_REQUEST:return {loading:true} 
    case ACCOUNT_DETAILS_SUCCESS:return {loading:false, account:action.payload}
    case ACCOUNT_DETAILS_FAILURE:return {loading:false, error:action.payload}
    default: return state
  }

} 


export const transactionDetailsReducer = (state={},action) => {
  switch(action.type){
    case TRANSACTION_DETAILS_REQUEST:return {loading:true} 
    case TRANSACTION_DETAILS_SUCCESS:return {loading:false, transaction:action.payload}
    case TRANSACTION_DETAILS_FAILURE:return {loading:false, error:action.payload}
    default: return state
  }

} 

export const chatDetailsReducer = (state={},action) => {
  switch(action.type){
    case CHAT_DETAILS_REQUEST:return {loading:true} 
    case CHAT_DETAILS_SUCCESS:return {loading:false, chat:action.payload}
    case CHAT_DETAILS_FAILURE:return {loading:false, error:action.payload}
    default: return state
  }

} 