import React from 'react'
import {Helmet} from 'react-helmet'



const Meta = ({title, description,keywords}) => {

     return(

       <Helmet>
        <title>{title}</title>
         <meta name='description' content={description}/>
         <meta name='keywords' content={keywords}/>
         
       </Helmet>
     )

}
  Meta.defaultProps ={
    title:'Bridgeway-Kids',
    description:'Website for bridgeway customers to check their accounts',
    keywords:'kiddies, kids,savings, account'
  }

export default Meta
