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


const TransactionLogsScreen = ({history,match}) => {
  /*const redirect = location.search?location.search.split('=')[1]:'/'  */
  const accountId = match.params.id
  const month = match.params.month
  const year = match.params.year

   console.log(accountId)
  /*const [qty ,setQty] = useState(1)
   const [rating ,setRating] = useState(0)
   const [comment ,setComment] = useState('')*/

  const dispatch = useDispatch()
  
  /*const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails*/

  const accountDetails = useSelector(state => state.accountDetails)
  const {account,loading,error} = accountDetails
    

    const transactionDetails = useSelector(state => state.transactionDetails)
  const {transaction,loading:transactionloading,error:transactionerror} = transactionDetails
  console.log(transaction)


/*let personsAccount

if(account){
  personsAccount = account[0].details.filter(function(e){e['Account No'] = accountId})
} */
   



useEffect(() => {
  
  dispatch(showAccountDetails(accountId))
  dispatch(showTransactionDetails(accountId,month,year))
  

},[dispatch,accountId])





  

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
          
          
           {/* <center>
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
        <center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>
       </FormContainer>
       </Card>
       </center> */}
          
       <center className="mt-4">
          <Card className='containerBox'>
          {<center className='mt-4'><h3></h3></center>}
       <FormContainer >
       {transaction && transaction.length>0 && <center> <h2 className='welcomeFont '>Transactions for {month}-{year}</h2></center>}
      
 { transaction && transaction.length>0 ?
        
      <div className ='tablelayout'>
        <center>
     <Table striped border hover responsive className ='table-xs '>
     <thead>
      <tr>
      <th>S/N</th>
       <th>DATE</th>
       <th>TIME</th>
       <th>TYPE</th>
       <th>AMOUNT(₦)</th> 
       <th>DESCRIPTION</th>
       
     </tr>
     </thead>
     <tbody>

        {transaction.map((customer,index) => {
        return(
        
          
       <tr>
            <td>{index + 1}</td>
            <td>{transaction && customer.Transactiondate.substring(0,11)}</td>
            <td>{transaction && customer.Transactiondate.substring(12,17)}</td>
            <td> {transaction && customer.Credit === ''?'DEBIT':(transaction && customer.Debit === ''?'CREDIT':'') }</td>
            <td> {transaction && customer.Credit !== ''?transaction && customer.Credit:transaction && customer.Debit} </td> 
            <td>{transaction && customer.Narration}</td>
         </tr>
      
         )
        })}
       </tbody>
   </Table>
       </center>
        </div>
 
        :(transaction && transaction.length<=0?
          
            <center>
            {/*<Card className='containerBox'>*/}
            {<center> <h2 className='welcomeFont '>Transactions for {month}-{year}</h2></center>}
         <FormContainer >
         <center> <h2 className='welcomeFont'>{'Nothing Recorded'}</h2></center>
          
          {/*<center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>*/}
         </FormContainer>
         {/*</Card>*/}
         </center>
         :(
            <center>
            {/*<Card className='containerBox'>*/}
         {/* <center><img className='bridgeLogo' src={bridgeway} alt={'the logo of bridgeway bank'} /></center> */}         
          <FormContainer >
         <center> <h2 className='welcomeFont'>{'Please refresh the screen.'}</h2></center>
          
          {/*<center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>*/}
         </FormContainer>
         {/*</Card>*/}
         </center>
        )

        )
          
          }


        <center> <Link to={`/viewbalance/${accountId}`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>
        <center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Home Screen</Button></Link></center>
       </FormContainer>
       </Card>
       </center>
          </>
        )}

        </>
      )

}

export default TransactionLogsScreen