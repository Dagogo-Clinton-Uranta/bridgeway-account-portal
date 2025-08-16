import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button,Form,Table} from 'react-bootstrap'
/*import Rating from '../components/Rating'*/
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {useDispatch, useSelector} from 'react-redux'
import {showAccountDetails,showTransactionDetails,showChatDetails,switchOffAlert} from '../actions/accountActions.js'
import {clientSaid} from '../actions/userActions.js'
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

   /*LOCAL STATES WHICH I USED BELOW */
   const [selectMonth,setSelectMonth] = useState(false)
   const [clientMessage,setClientMessage] = useState('')

  const dispatch = useDispatch()
  
  /*const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails*/

  const accountDetails = useSelector(state => state.accountDetails)
  const {account,loading,error} = accountDetails
    console.log(account)

  const chatDetails = useSelector(state => state.chatDetails)
  const {chat,loading:chatloading,error:chaterror} = chatDetails

    const transactionDetails = useSelector(state => state.transactionDetails)
  const {transaction,loading:transactionloading,error:transactionerror} = transactionDetails
  
  console.log(chat)
  console.log(transactionerror)
 console.log(account)

/*let personsAccount

if(account){
  personsAccount = account[0].details.filter(function(e){e['Account No'] = accountId})
} */
   



useEffect(() => {
  
  dispatch(showAccountDetails(accountId))
  dispatch(showTransactionDetails(accountId))
  dispatch(showChatDetails(accountId))

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



  const submitHandler = (e) => {
    
    if(clientMessage===''){
      window.alert('You just tried to send an empty message, please ensure you have typed something in before sending')
    }else{
    setClientMessage('')
   dispatch(clientSaid(clientMessage, accountId))
   window.alert('Message Sent!, Please check back within 24 hours for a reply')}
}

 const alertOffHandler =  (e) => {
  dispatch(switchOffAlert(accountId))

 } 

      return(
        <>
       
        {loading ? <Loader/>:account  && account.details.length < 1 ?<>
          <center>
          <Card className='containerBox'>
          <center><img className='bridgeLogo' src={bridgeway} alt={'the logo of bridgeway bank'} /></center>
       <FormContainer >
       <center> <h2 className='welcomeFont'>{'System Error, Please bear with us. In the mean time, please check your details are entered correctly.'}</h2></center>
        
        <center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>
       </FormContainer>
       </Card>
       </center>
        
        
        
        </>:(
          <>
          <Meta title={'Bridgeway Portal'}/>
          
          
            <center>
          <Card className='containerBox'>
          <center><img className='bridgeLogo' src={bridgeway} alt={'the logo of bridgeway bank'} /></center>
       <FormContainer >
       {chat && chat.userAlert && <h4 className='alertFont'>New Message From Bridgeway!(see below)</h4>}
       <center> <h2 className='welcomeFont'>{account && account.details[0].Name}</h2></center>
       <center> <p className='instructionSpace'>Your balance on {account && account.createdAt.substring(0,10)} at {account && account.time} is:</p></center>
          <hr className='dottedLine'/>
         <center><p className='instructionSpace'>Current Balance:</p>
         <h2 className='welcomeFont'>₦{account && account.details[0].Availablebalance}</h2>
         
         <p className='instructionSpace'>Withdrawable Balance:</p>
         <h2 className='welcomeFont widthofElements'>₦{account && account.details[0].Withdrawablebalance}</h2></center>
         <hr className='dottedLine2'/>

         <center> <h2 className='welcomeFont'>Latest Transactions</h2></center>
         { transactionloading ? <Loader/>
         /*!transaction?<center>  <hr className='dottedLine2'/><h4 className='welcomeFont'>No Recent transactions.</h4></center>*/:
             
         (
         transaction && transaction.length === 0 ? <center> <h4 className='welcomeFont'>No Recent transactions.</h4></center>:
         <>
         <center> <p className='instructionSpace'>Your Latest Transactions  </p><p>( on {transaction && transaction[0].Transactiondate.substring(0,11)}) are as follows:</p></center>
          
          <div className ='tablelayout'>
            <center>
         <Table striped border hover responsive className ='table-sm '>
         <thead>
          <tr>
          <th>S/N</th>
           <th>DATE</th>
           <th>TIME</th>
           <th>TYPE</th>
           {<th>AMOUNT(₦)</th> }
           <th>DESCRIPTION</th>
           
         </tr>
         </thead>
         <tbody>

{transaction && transaction.map((customer,index) => {
return(

  
<tr>
    <td>{index + 1}</td>
    <td >{transaction && customer.Transactiondate.substring(0,1)==='0'?customer.Transactiondate.substring(1,2):transaction && customer.Transactiondate.substring(0,2)}{customer.Transactiondate.substring(0,2)==='01'||customer.Transactiondate.substring(0,2)==='21'||customer.Transactiondate.substring(0,2)==='31'?'st':(customer.Transactiondate.substring(0,2)==='02'||customer.Transactiondate.substring(0,2)==='22'?'nd':(customer.Transactiondate.substring(0,2)==='03'||customer.Transactiondate.substring(0,2)==='23'?'rd':'th'))}</td>
    <td >{transaction && customer.Transactiondate.substring(12,17)}</td>
    <td > {transaction && customer.Credit === ''?'DEBIT':(transaction && customer.Debit === ''?'CREDIT':'') }</td>
    <td > {transaction && customer.Credit !== ''?transaction && customer.Credit:transaction && customer.Debit} </td> 
    <td className='singleLine'>{transaction && customer.Narration}</td>
 </tr>

 )
})}
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


           
         
         

       
          
      { <center className="mt-4">
          <Card className='containerBox' onMouseEnter={alertOffHandler}>
          {<center className='mt-4'><h3></h3></center>}
       <FormContainer >
       <center> <h2 className='welcomeFont'>Get in touch with us!</h2></center>
       <center> <p className='instructionSpace'>Have an enquiry? Please send it below, and we will reply you within 24 hours time. You can also view replies to past messages here. </p></center>
       
       <hr className='startOfChat'/>
       
       { chat &&
         <div>
       
          
  
          { chat && chat.previousEnquiry && <>
            <p className='instructionSpace clientIndent'>Your Previous Message:</p>
          
           <p className='instructionSpace clientIndent clientMessage mb-4'>{chat.previousEnquiry}</p>
        
         
          </>}

          {chat && chat.previousAdminAnswer && chat.userMessageNotification ? <>
           
           <p className='instructionSpace adminIndent '>Previous Reply:</p>
           
           <p className='instructionSpace adminIndent adminMessage'> {chat.previousAdminAnswer}</p>
          </>:(
            chat && chat.adminAnswer &&!chat.userMessageNotification  &&
            <>
            <p className='instructionSpace adminIndent '>{chat && chat.adminMessageNotification? 'Previous Reply:':'Reply from Admin'}</p>
           
            <p className='instructionSpace adminIndent adminMessage'> {chat.adminAnswer}</p>
            </>

          )
          }



          { chat && chat.enquiry && <>
            <p className='instructionSpace clientIndent mt-4'>Your Most Recent Message:</p>
          
           <p className='instructionSpace clientIndent clientMessage'>{chat.enquiry}</p>
        
         
          </>}


          {chat && chat.adminAnswer && chat.userMessageNotification && <>
           
           <p className='instructionSpace adminIndent '> New Reply:</p>
           
           <p className='instructionSpace adminIndent adminMessage'> {chat.adminAnswer}</p>
            </>}

           



          <hr className='endOfChat'/>

          </div>
          
        }
         
        
  <Form onSubmit={submitHandler}>
         <Form.Group controlId='reply-message'>

<Form.Label>  Send Your Message Below: </Form.Label>
<Form.Control className='messageBox' as ="textarea" rows={4} placeholder='type message here' value={clientMessage} onChange={(e)=>{setClientMessage(e.target.value)}}></Form.Control>

</Form.Group>


<Button type='submit' className='vbButton mt-4 widthOfElements' variant='primary'>Send</Button>
</Form>
 
       </FormContainer>
       </Card>
       </center>}
          </>
        )}

        </>
      )

}

export default ViewBalanceScreen