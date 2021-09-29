
import React from 'react'
import {MemoryRouter as Router,Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import WelcomeScreen from './screens/WelcomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import ViewBalanceScreen from './screens/ViewBalanceScreen.js'
import UpdateCabaScreen from './screens/UpdateCabaScreen.js'
import TransactionLogsScreen from './screens/TransactionLogsScreen.js'


const App = () => {

    return (
      
      
  <Router> 
      <Header/>
      <main className ='py-3'>
       <Container>
       < Route path='/' exact component={WelcomeScreen}/>
       < Route path='/viewbalance/:id' component={ViewBalanceScreen}/>
       < Route path='/login' component={LoginScreen}/>
       {/*< Route path='/updatecaba' component={UpdateCabaScreen}/>*/}
       < Route path='/transactionlogs/:id/month/:month/year/:year' component={TransactionLogsScreen}/>
      
       
       </Container>
      </main>
      <Footer/>
  </Router> 
  
    )
}

export default App
