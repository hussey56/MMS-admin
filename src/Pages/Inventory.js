import React,{useEffect,useState} from 'react'
import Header from '../Components/Inventory/Header'
import Content from '../Components/Inventory/Content'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Utilities/Nav'
import SideNav from '../Utilities/SideNav'
import Footer from '../Utilities/Footer'
import Preloader from '../Utilities/Preloader'
const Inventory = () => {
  const [loading,setLoading] = useState(true)
  const header = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('admin_token');
    if(!token){
header('/');
    }
    setTimeout(()=>{
      setLoading(false)
    },500)
},// eslint-disable-next-line
[])
  return (
    <>
        <div className="wrapper">
{loading===true?<Preloader/>:
<>
    <TopNav/>
    <SideNav/>
    <div className="content-wrapper">  
     <Header/> 
     <Content/>
    </div>
    <Footer/>
    </>}
    </div>
</>
  )
}

export default Inventory
