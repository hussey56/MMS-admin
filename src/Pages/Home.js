import React,{useEffect, useState} from 'react'
import Header from '../Components/Home/Header'
import Statistic from '../Components/Home/Statistic'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Utilities/Nav'
import SideNav from '../Utilities/SideNav'
import Footer from '../Utilities/Footer'
import Preloader from '../Utilities/Preloader'

const Home = () => {
  const header = useNavigate();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem('admin_token');
    if(!token){
header('/');
    }
    setTimeout(()=>{
      setLoading(false)
    },2000)
},// eslint-disable-next-line
[])
  return (
    <>
     <div className="wrapper">
{loading === true? <>
<Preloader/>
</>:
      <>
      <TopNav/>
    <SideNav/>
   
      <div className="content-wrapper">
     <Header/>
     <Statistic/>
      </div>
      <Footer/>
      </>}
      </div>
    </>
  )
}

export default Home
