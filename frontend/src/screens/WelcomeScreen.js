import React, {useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import showAccountDetails from '../actions/accountActions.js'
import FormContainer from '../components/FormContainer.js'
import bridgeway from '../components/yes.png' 




const WelcomeScreen = ({location, history}) => { //he is taking location & history out of the props, normally it is props.location
  const [accountNumber,setAccountNumber] = useState('')  //component level state right here, not application level state
  /*const [password,setPassword] = useState('')
  const dispatch = useDispatch() 
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error,userInfo } = userLogin*/
  

  const redirect = location.search?location.search.split('=')[1]:'/'
//location .search has the url query string, study it a bit

//because we dont want to able to come into the login screen ONCE WE ARE ALREADY LOGGED IN, effect this in the useEffect below

  /*useEffect( () => {
    if(userInfo){ //cuz user info exists only when you're logged in
       history.push(redirect)
    }
  },[redirect,history,userInfo])*/



 /* const submitHandler = (e) => {
          e.preventDefault()
          //this is where we want to to call our action to dispatch login
        dispatch(showAccountDetails(accountNumber))
  }*/

    return (
       <center>
        <Card className='containerBox'>

        <div className='parentFlex'>
        
<a href='https://www.bridgewaymfb.com/'> <Button className='mfb' variant='primary'> <span className="arrowStyle">&larr; </span> To Main Page</Button></a>
     </div>



          <center><img className='bridgeLogo' src={bridgeway} alt={'the logo of bridgeway bank'} /></center>
       <FormContainer >
       <center> <h2 className='welcomeFont'>Welcome to Bridgeway's Account Portal!</h2></center>
        {/*error && <Message variant='danger'>{error}</Message>*/}
        {/*loading && <Loader/>*/}
         <center><p className='instructionSpace'>Instructions:</p>
         <p className='widthOfElements'>Please, type in your account number below, and click 'view balance' to see your current balance for the day. Please make sure to enter all digits correctly!</p> 
         <p className='widthOfElements'> If you withdraw or deposit money, please come back tomorrow to see any changes to your balance. </p></center>
        <center>
       <Form >
         <Form.Group controlId='accountNumber'>

          <Form.Label className='accountLabel' >  Account Number: </Form.Label>
          <Form.Control className='accountInput widthOfElements' type='input' autocomplete="off" placeholder="enter your account number" value={accountNumber} onChange={(e)=>{setAccountNumber(e.target.value)}}></Form.Control>
           {/*the value of form control is form control from the state. */}
         </Form.Group>
   

        <center> <Link to={accountNumber===''?`/viewbalance/0`:`/viewbalance/${accountNumber}`}> <Button  className='vbButton widthOfElements' variant='primary'>View Balance</Button></Link></center>
        </Form>         
         </center>
       </FormContainer>
       </Card>
       </center>
       
    )

}

export default WelcomeScreen
