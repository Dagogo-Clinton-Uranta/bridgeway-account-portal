import axios from 'axios'
import React ,{useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button,Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {listProductDetails, updateProduct} from '../actions/productActions.js'
import FormContainer from '../components/FormContainer.js'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants.js'

import baseUrl from '../actions/baseUrl.js'


const UpdateCabaScreen= ({match, history}) => { //he is taking location & history out of the props, normally it is props.history
    const productId = match.params.id

  const [name,setName] = useState('')
  //const [email,setEmail] = useState('')
  const [price,setPrice] = useState(0)  
  const [image,setImage] = useState('')
  const [image2,setImage2] = useState('')
  const [brand,setBrand] = useState('')
  const [category,setCategory] = useState('')
  const [countInStock,setCountInStock] = useState('')
  const [description,setDescription] = useState('')
  const [uploading,setUploading] = useState(false)
  const [uploading2,setUploading2] = useState(false)
  
  const dispatch = useDispatch() //dont forget that real dispatches only take place in action creators, you are only calling useDispatch here

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error,product} = productDetails

  const productUpdate = useSelector(state => state.productUpdate);
  const {loading:loadingUpdate, error:errorUpdate,success:successUpdate } = productUpdate

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo } = userLogin

  /*useEffect(()=> { 
    if(!userInfo){
     history.push('/login')}
    },[userInfo,history])*/

  /*useEffect( () => {
    if(successUpdate){
      dispatch({type:PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
    } 
    else{
      if(!product.name ||product.id !== productId){ //we are just checking any aspect of the user here to see if user object exists
        dispatch(listProductDetails(productId))
      }else {
        setName(product.name)
        //setEmail(product.email)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }

},[dispatch,productId,history,successUpdate,product])*/ /*i deleted user as a useEffect dependency */

const uploadFileHandler =async (e)=>{
  const file = e.target.files[0] //we get access to this as an array, because you have the ability to upload multiple files
  const formData = new FormData()
  formData.append('excel',file)
  setUploading(true)

   try{
     const config ={
     headers:{ 
       'Content-Type':'multipart/form-data'
     }
    }
     const {data} =await axios.post(`${baseUrl}/api/upload`, formData ,config)
     setImage(data)
     setUploading(false)
   }
   catch(error){
      console.log(error)
     setUploading(false)
   }
}

const uploadCallOverHandler =async (e)=>{
  const file = e.target.files[0] //we get access to this as an array, because you have the ability to upload multiple files
  const formData = new FormData()
  formData.append('excel',file)
  setUploading2(true)

   try{
     const config ={
     headers:{ 
       'Content-Type':'multipart/form-data'
     }
    }
     const {data} =await axios.post(`${baseUrl}/api/upload/callover`, formData ,config)
     setImage2(data)
     setUploading2(false)
   }
   catch(error){
      console.log(error)
     setUploading2(false)
   }
} 

    return (
        <>
    {/*<Link to='/' className='btn btn-light my-3'>Go back</Link>*/}
     
    <center >
        <Card className='containerBox'>
    <FormContainer>
    <h1> Upload your CABA file</h1>
   {loadingUpdate &&<Loader/>}
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

    {loading? <Loader/>:error?<Message variant='danger'>{error}</Message>:(
      <Form /*onSubmit={submitHandler}*/>
 

 {/*1*/}      <Form.Group controlId='image'>

        <Form.Label>  File Upload Status </Form.Label>
        <Form.Control type='text' placeholder="Do not forget to upload twice a day!" value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
        {/* You need to read about form group from react bootstrap*/}
         <Form.File className="accountInput" id="image-file" label="choose file" custom onChange={uploadFileHandler}>
           {uploading &&<Loader/>}
         </Form.File>
       </Form.Group>



        {<Link to ='/'><Button  className='buttonMargin' type='submit' variant='primary'>Go Back</Button></Link>}
      </Form>
    )}

     
    </FormContainer>
    </Card>
     </center>

     <center >
        <Card className='containerBox'>
    <FormContainer>
    <h1> Upload your CALL OVER report</h1>
   {loadingUpdate &&<Loader/>}
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

    {loading? <Loader/>:error?<Message variant='danger'>{error}</Message>:(
      <Form /*onSubmit={submitHandler}*/>
 

 {/*1*/}      <Form.Group controlId='image'>

        <Form.Label>  File Upload Status </Form.Label>
        <Form.Control type='text' placeholder="Do not forget to upload at least once a day!" value={image2} onChange={(e)=>setImage2(e.target.value)}></Form.Control>
        {/* You need to read about form group from react bootstrap*/}
         <Form.File className="accountInput" id="image2-file" label="choose file" custom onChange={uploadCallOverHandler}>
           {uploading2 &&<Loader/>}
         </Form.File>
       </Form.Group>



        <Link to ='/'><Button  className='buttonMargin' type='submit' variant='primary'>Go Back</Button></Link>
      </Form>
    )}

     
    </FormContainer>
    </Card>
     </center>

        </>
     
    )

}

export default UpdateCabaScreen
