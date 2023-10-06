import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const header = useNavigate();
    const onClick = async()=>{
        localStorage.removeItem('admin_token');
        header('/');

    }
  return (
    <>
        <footer className="main-footer">
    <div className="float-right d-none d-sm-block">
     <button onClick={onClick} className='btn btn-block btn-outline-danger'>Logout</button>
    </div>
    <strong>©KRS Wedding Palace 2023</strong> All rights reserved.
  </footer>
    </>
  )
}

export default Footer
