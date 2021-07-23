import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button,Form,Table} from 'react-bootstrap'
/*import Rating from '../components/Rating'*/
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {useDispatch, useSelector} from 'react-redux'
import {showAccountDetails,showTransactionDetails} from '../actions/accountActions.js'

import FormContainer from '../components/FormContainer.js'
import bridgeway from '../components/yes.png'
/*import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants.js'*/


const ViewBalanceScreen = ({history,match}) => {
  /*const redirect = location.search?location.search.split('=')[1]:'/'  */
  const accountId = match.params.id
   console.log(accountId)
  /*const [qty ,setQty] = useState(1)
   const [rating ,setRating] = useState(0)
   const [comment ,setComment] = useState('')*/

   
   const [selectMonth,setSelectMonth] = useState(false)

  const dispatch = useDispatch()
  
  /*const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails*/

  const accountDetails = useSelector(state => state.accountDetails)
  const {account,loading,error} = accountDetails
    

    const transactionDetails = useSelector(state => state.transactionDetails)
  const {transaction,loading:transactionloading,error:transactionerror} = transactionDetails
  console.log(transaction)
 console.log(account)

/*let personsAccount

if(account){
  personsAccount = account[0].details.filter(function(e){e['Account No'] = accountId})
} */
   



useEffect(() => {
  
  dispatch(showAccountDetails(accountId))
  dispatch(showTransactionDetails(accountId))
  

},[dispatch,accountId])


//SPECIFYING VARIABLES TO USE FOR MY DROPDOWN LIST
const date = new Date()

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const selectionHandler = (chosenMonth) => {
  const month = chosenMonth.substring(0,3)
  const year = chosenMonth.substring(4,8)
  
    history.push(`/transactionlogs/${accountId}/month/${month}/year/${year}`) //there was a blank set of curly braces here, you just put quantity in 
} 
  
/*const previousPageHandler = () => {
  
  window.history.back()
}*/

 

  /*console.log(productDetails)*/



/*const submitHandler =(e) =>{
  e.preventDefault() //since submit handler is being called inside a form
  dispatch(createProductReview(match.params.id,{
    rating,
    comment //both rating and comment are coming from local/comment state
  }))
}*/

  

      return(
        <>
       
        {loading ? <Loader/>:account && account.details.length < 1 ?<>
          <center>
          <Card className='containerBox'>
          <center><img className='bridgeLogo' src={bridgeway} alt={'the logo of bridgeway bank'} /></center>
       <FormContainer >
       <center> <h2 className='welcomeFont'>{'The account you are looking for does not exist,please make sure to type in your account details correctly.'}</h2></center>
        
        <center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>
       </FormContainer>
       </Card>
       </center>
        
        
        
        </>:(
          <>
          <Meta title={'Bridgeway Future Leaders'}/>
          
          
            <center>
          <Card className='containerBox'>
          <center><img className='bridgeLogo' src={bridgeway} alt={'the logo of bridgeway bank'} /></center>
       <FormContainer >
       <center> <h2 className='welcomeFont'>{account && account.details[0].Name}</h2></center>
       <center> <p className='instructionSpace'>Your balance on {account && account.createdAt.substring(0,10)} at {account && account.time} is:</p></center>
          <hr className='dottedLine'/>
         <center><p className='instructionSpace'>Current Balance:</p>
         <h2 className='welcomeFont'>₦{account && account.details[0].Availablebalance}</h2>
         
         <p className='instructionSpace'>Withdrawable Balance:</p>
         <h2 className='welcomeFont widthofElements'>₦{account && account.details[0].Withdrawablebalance}</h2></center>
         <hr className='dottedLine2'/>

         <center> <h2 className='welcomeFont'>Latest Transactions</h2></center>
         {!transaction?<center>  <hr className='dottedLine2'/><h4 className='welcomeFont'>Please Refresh the Screen</h4></center>:
         
         (
         transaction.length === 0 ? <center> <h4 className='welcomeFont'>No Recent transactions.</h4></center>:
         <>
         <center> <p className='instructionSpace'>Your(Latest) Transaction at {transaction && transaction[0].Transactiondate.substring(12,17)}{transaction && transaction[0].Transactiondate.substring(12,17)>='12'?' PM':' AM'} </p><p> on  {transaction && transaction[0].Transactiondate.substring(0,11)} is as follows:</p></center>
          
          <div className ='tablelayout'>
            <center>
         <Table striped border hover responsive className ='table-xs '>
         <thead>
          <tr>
           <th>DATE</th>
           <th>TIME</th>
           <th>TYPE</th>
           {<th>AMOUNT(₦)</th> }{/*AS PER TOTAL PRICE*/}
           <th>DESCRIPTION</th>
           
         </tr>
         </thead>
         <tbody>
         <tr>
              <td>{transaction && transaction[0].Transactiondate.substring(0,11)}</td>
              <td>{transaction && transaction[0].Transactiondate.substring(12,17)}</td>
              <td> {transaction && transaction[0].Credit === ''?'DEBIT':(transaction && transaction[0].Debit === ''?'CREDIT':'') }</td>
              <td> {transaction && transaction[0].Credit !== ''?transaction && transaction[0].Credit:transaction && transaction[0].Debit} </td> 
              
              <td>{transaction && transaction[0].Narration}</td>
           </tr>
           </tbody>
         </Table>
         </center>
          </div>

          <div>
        
        <center> {/*<Link to={`/transactionlogs/${accountId}`}>*/} <Button onClick ={()=>{setSelectMonth(!selectMonth)}}  className='vbButton widthOfElements' variant='primary'>{!selectMonth?'Show Earlier Transactions':'Hide Menu'}</Button>{/*</Link>*/}</center>
        </div>

        {selectMonth && 
        <>
        <center>From the menu below, please select the month you would like to view transactions for.</center>
         
         <div className='optionCentralize'>
        <Form.Control as='select'  value={monthNames[date.getMonth()]} onChange ={(e)=>{selectionHandler(e.target.value)}}>
         { 
          <> 
          <option  value = {`${monthNames[date.getMonth()]}-${date.getFullYear()}`} >  {'click here'} </option>
        <option  value = {`${monthNames[date.getMonth()]}-${date.getFullYear()}`} >  {monthNames[date.getMonth()]} {date.getFullYear()} </option>
        <option  value={`${((date.getMonth()-1)<0)?monthNames[date.getMonth()-0 +11]:monthNames[date.getMonth()-1]}-${((date.getMonth()-1)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-1)<0)?monthNames[date.getMonth()-0 +11]:monthNames[date.getMonth()-1]}  {((date.getMonth()-1)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-2)<0)?monthNames[date.getMonth()-1 +11]:monthNames[date.getMonth()-2]}-${((date.getMonth()-2)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-2)<0)?monthNames[date.getMonth()-1 +11]:monthNames[date.getMonth()-2]}  {((date.getMonth()-2)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-3)<0)?monthNames[date.getMonth()-2 +11]:monthNames[date.getMonth()-3]}-${((date.getMonth()-3)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-3)<0)?monthNames[date.getMonth()-2 +11]:monthNames[date.getMonth()-3]}  {((date.getMonth()-3)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-4)<0)?monthNames[date.getMonth()-3 +11]:monthNames[date.getMonth()-4]}-${((date.getMonth()-4)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-4)<0)?monthNames[date.getMonth()-3 +11]:monthNames[date.getMonth()-4]}  {((date.getMonth()-4)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-5)<0)?monthNames[date.getMonth()-4 +11]:monthNames[date.getMonth()-5]}-${((date.getMonth()-5)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-5)<0)?monthNames[date.getMonth()-4 +11]:monthNames[date.getMonth()-5]}  {((date.getMonth()-5)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-6)<0)?monthNames[date.getMonth()-5 +11]:monthNames[date.getMonth()-6]}-${((date.getMonth()-6)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-6)<0)?monthNames[date.getMonth()-5 +11]:monthNames[date.getMonth()-6]}  {((date.getMonth()-6)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-7)<0)?monthNames[date.getMonth()-6 +11]:monthNames[date.getMonth()-7]}-${((date.getMonth()-7)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-7)<0)?monthNames[date.getMonth()-6 +11]:monthNames[date.getMonth()-7]}  {((date.getMonth()-7)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-8)<0)?monthNames[date.getMonth()-7 +11]:monthNames[date.getMonth()-8]}-${((date.getMonth()-8)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-8)<0)?monthNames[date.getMonth()-7 +11]:monthNames[date.getMonth()-8]}  {((date.getMonth()-8)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-9)<0)?monthNames[date.getMonth()-8 +11]:monthNames[date.getMonth()-9]}-${((date.getMonth()-9)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-9)<0)?monthNames[date.getMonth()-8 +11]:monthNames[date.getMonth()-9]}  {((date.getMonth()-9)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-10)<0)?monthNames[date.getMonth()-9 +11]:monthNames[date.getMonth()-10]}-${((date.getMonth()-10)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-10)<0)?monthNames[date.getMonth()-9 +11]:monthNames[date.getMonth()-10]}  {((date.getMonth()-10)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        <option  value={`${((date.getMonth()-11)<0)?monthNames[date.getMonth()-10 +11]:monthNames[date.getMonth()-11]}-${((date.getMonth()-11)<0)?date.getFullYear()-1:date.getFullYear()}`} >  {((date.getMonth()-11)<0)?monthNames[date.getMonth()-10 +11]:monthNames[date.getMonth()-11]}  {((date.getMonth()-11)<0)?date.getFullYear()-1:date.getFullYear()}</option>
        
          </>
          }
        </Form.Control>
        </div>
          </>
         }

        <center> <Link to={`/`}> <Button  className='vbButton mt-4 widthOfElements' variant='primary'>Go Back</Button></Link></center>
        
        
           </>)
         
        }</FormContainer>
        
         </Card>
         </center>    


           
         
         

       
          
      {/* <center className="mt-4">
          <Card className='containerBox'>
          {<center className='mt-4'><h3></h3></center>}
       <FormContainer >
       <center> <h2 className='welcomeFont'>Latest Transaction</h2></center>
       {transaction && transaction.length > 0 ? 
         <div>
       <center> <p className='instructionSpace'>Your(Latest) Transaction at {transaction && transaction[0].Transactiondate.substring(12,17)}{transaction && transaction[0].Transactiondate.substring(12,17)>='12'?' PM':' AM'} </p><p> on  {transaction && transaction[0].Transactiondate.substring(0,11)} is as follows:</p></center>
          <hr className='dottedLine'/>
  
          {transaction && transaction[0].Credit !== '' &&  <>
           <center>
         <p className='instructionSpace'>Credit:</p>
         <h2 className='welcomeFont widthofElements'>₦{ transaction[0].Credit}</h2></center>
         <p className='instructionSpace transactionSpace'>Details: {transaction[0].Narration}</p>
          </>}

         {transaction && transaction[0].Debit !== '' &&  <>
           <center>
         <p className='instructionSpace transactionSpace'>Debit:</p>
         <h2 className='welcomeFont widthofElements'>₦{ transaction[0].Debit}</h2></center>
         <p className='instructionSpace transactionSpace'>Details: {transaction[0].Narration}</p>
          </>}
          </div>:
          <center> <hr className='dottedLine'/> <h2 className='welcomeFont'>{'No Recent Transactions.'}</h2></center>
        }
         <hr className='dottedLine2'/>
        { transaction && transaction.length > 0 &&
         <div>
        
         <center> <Link to={`/transactionlogs/${accountId}`}> <Button  className='vbButton widthOfElements' variant='primary'>Show Earlier Transactions</Button></Link></center>
         </div>
         
         }

        <center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>
       </FormContainer>
       </Card>
       </center>*/}
          </>
        )}

        </>
      )

}

export default ViewBalanceScreen