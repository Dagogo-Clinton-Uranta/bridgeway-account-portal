import {
 ACCOUNT_DETAILS_REQUEST,
 ACCOUNT_DETAILS_SUCCESS,
 ACCOUNT_DETAILS_FAILURE
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