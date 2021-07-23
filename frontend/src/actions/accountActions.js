import axios from 'axios'
import {
    ACCOUNT_DETAILS_REQUEST,
    ACCOUNT_DETAILS_SUCCESS,
    ACCOUNT_DETAILS_FAILURE,
    TRANSACTION_DETAILS_REQUEST,
    TRANSACTION_DETAILS_SUCCESS,
    TRANSACTION_DETAILS_FAILURE
   } 
   
   from '../constants/accountConstants.js'


   export const showAccountDetails = (id) => async(dispatch) => {
   
    try{
        dispatch({type:ACCOUNT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/accounts/${id}`)

        dispatch({type:ACCOUNT_DETAILS_SUCCESS,
                      payload:data})
    }
    catch(error){
        dispatch({type:ACCOUNT_DETAILS_FAILURE,
        payload:error.response && error.response.data.message?
        error.response.data.message:error.message })
    }

}


export const showTransactionDetails = (accountId='',month='',year='') => async(dispatch) => {
   
    try{
        dispatch({type:TRANSACTION_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/accounts/transactions?id=${accountId}&month=${month}&year=${year}`)

        dispatch({type:TRANSACTION_DETAILS_SUCCESS,
                      payload:data})
    }
    catch(error){
        dispatch({type:TRANSACTION_DETAILS_FAILURE,
        payload:error.response && error.response.data.message?
        error.response.data.message:error.message })
    }

}


