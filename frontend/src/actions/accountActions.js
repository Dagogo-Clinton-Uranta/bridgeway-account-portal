import axios from 'axios'
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


export const showChatDetails = (accountId) => async(dispatch) => {
   
    try{
        dispatch({type:CHAT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/accounts/messages?id=${accountId}`)

        dispatch({type:CHAT_DETAILS_SUCCESS,
                      payload:data})
    }
    catch(error){
        dispatch({type:CHAT_DETAILS_FAILURE,
        payload:error.response && error.response.data.message?
        error.response.data.message:error.message })
    }

}

export const showNewChats = () => async(dispatch) => {
   
    try{
        dispatch({type:NEW_CHATS_REQUEST})

        const {data} = await axios.get(`/api/accounts/newmessagelist`)

        dispatch({type:NEW_CHATS_SUCCESS,
                      payload:data})
    }
    catch(error){
        dispatch({type:NEW_CHATS_FAILURE,
        payload:error.response && error.response.data.message?
        error.response.data.message:error.message })
    }

}


export const switchOffAlert = (accountId) => async(dispatch) => {
   //dispatch in the bracket of async is not being used here, whereas it would normally dispatch action types and payloads
    

    const config = {
        headers:{
          'Content-Type':'application/json'
        }
      }
    //using a request body cuz it's a POST request i guess

       await axios.post('/api/accounts/messages',{accountId},config)

 }