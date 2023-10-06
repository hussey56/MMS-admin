import React from 'react'
import Logo from '../Images/logo1.gif'
import '../Css/loader.css'
const Preloader = () => {
  return (
    <>
      
    <div className='center mt-5'>
  
    <img className='text-center' src={Logo} alt="Preloader" height="300" width="300"/>

    </div>
    </>
  )
}

export default Preloader
