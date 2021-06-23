import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button,Form} from 'react-bootstrap'
/*import Rating from '../components/Rating'*/
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {useDispatch, useSelector} from 'react-redux'
import showAccountDetails from '../actions/accountActions.js'
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

  const dispatch = useDispatch()
  
  /*const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails*/

  const accountDetails = useSelector(state => state.accountDetails)
  const {account,loading,error} = accountDetails
    console.log(account)

/*let personsAccount

if(account){
  personsAccount = account[0].details.filter(function(e){e['Account No'] = accountId})
} */
   



useEffect(() => {
  
  dispatch(showAccountDetails(accountId))
  
  

},[dispatch,accountId])




/*const addToCartHandler = () => {
  if(!userInfo){
    window.alert('Please sign in to purchase')
  }
  else if(userInfo && (userInfo.isAdmin||userInfo.isMerchant)){
    window.alert('Only customers may make purchases, please register as a customer')
  }
    else{history.push(`/cart/${match.params.id}?qty=${qty}`)} //there was a blank set of curly braces here, you just put quantity in 
} */
  
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
        <center> <Link to={`/`}> <Button  className='vbButton widthOfElements' variant='primary'>Go Back</Button></Link></center>
       </FormContainer>
       </Card>
       </center>
          
          </>
        )}

        </>
      )

}

export default ViewBalanceScreen