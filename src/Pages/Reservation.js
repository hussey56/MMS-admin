import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from '../Utilities/Nav'
import SideNav from '../Utilities/SideNav'
import Header from '../Components/Reservations/Header';
import Content from '../Components/Reservations/Content';
const Reservation = () => {
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
       <TopNav/>
    <SideNav/>
    <div className="wrapper">
    <div className="content-wrapper">
     <Header/>
<Content/>
      </div>
      </div>
    </>
  )
}

export default Reservation
