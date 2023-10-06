import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from '../Utilities/Nav';
import SideNav from '../Utilities/SideNav';
import Header from '../Components/Signup/Header';
import Content from '../Components/Signup/Content';
import Footer from '../Utilities/Footer';
import List from '../Components/Signup/List';

const Signup = () => {
    const header = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem('admin_token');
      if(!token){
  header('/');
      }
  },// eslint-disable-next-line
  [])
  return (
    <>
    <div className="wrapper">
     <TopNav/>
     <SideNav/>
     <div className="content-wrapper">
        <Header/>
        <Content/>
        <List/>
     </div>
     <Footer/>
     </div>
    </>
  )
}

export default Signup
