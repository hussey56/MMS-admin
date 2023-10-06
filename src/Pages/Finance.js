import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from '../Utilities/Nav';
import SideNav from '../Utilities/SideNav';
import Footer from '../Utilities/Footer';
import Header from '../Components/Finance/Header';
import Orders from '../Components/Finance/Orders';
import Stat from '../Components/Finance/Stat';
import Preloader from '../Utilities/Preloader';
import Expense from '../Components/Finance/Expense';

const Finance = () => {
    const header = useNavigate();
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
      const token = localStorage.getItem('admin_token');
      if(!token){
  header('/');

      }
      setTimeout(()=>{
        setLoading(false)
      },700)
  },// eslint-disable-next-line
  [])
  return (
    <>
                    <div className="wrapper">
                      {loading===true?<Preloader/>:
                <>    <TopNav/>
                        <SideNav/>
                        <div className="content-wrapper">
                            <div className="content">
<Header/>
<Stat/>
<Expense/>

<Orders/>
                            </div>
                        </div>
                        <Footer/>
                        </>    }
</div>
    </>
  )
}

export default Finance
