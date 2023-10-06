import React , {useEffect,useState} from 'react'
import TopNav from '../Utilities/Nav'
import SideNav from '../Utilities/SideNav'
import Footer from '../Utilities/Footer'
import Preloader from '../Utilities/Preloader'
import { useNavigate } from 'react-router-dom'
import Profile from '../Components/Account/Profile'
const Account = () => {
    const [loading,setLoading] = useState(true);
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
    <div className="wrapper">
    {loading===true?<Preloader/>:
<>
<TopNav/>
<SideNav/>
<div className="content-wrapper">
 <Profile/>
</div>
<Footer/>
</>}
</div>
  )
}

export default Account
